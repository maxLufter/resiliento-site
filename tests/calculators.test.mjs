import test from 'node:test';
import assert from 'node:assert/strict';
import { runningResult, parseMinutesSeconds, formatDuration, estimateBikeSpeed, heartRateZones, buildHybridWeek, estimateStress, METERS_PER_MILE } from '../src/lib/calculators.ts';
import { planFuel, fuelTotals, servingTimes } from '../src/lib/nutrition.ts';
import { parseChecklistState } from '../src/lib/checklist.ts';
import { validateWaitlist, deliverWaitlist } from '../src/lib/waitlist.ts';

test('running calculations round-trip distance, pace and time in SI and miles', () => {
  assert.equal(runningResult('pace', 10000, 3000, 0), 300);
  assert.equal(runningResult('time', 10000, 0, 300), 3000);
  assert.equal(runningResult('distance', 0, 3000, 300), 10000);
  assert.equal(runningResult('time', METERS_PER_MILE, 0, 300), 482.8032);
  for (const bad of [0, -1, NaN, Infinity]) assert.equal(runningResult('pace', bad, 3000, 300), null);
  assert.equal(formatDuration(3599.7, true), '1:00:00');
  assert.equal(formatDuration(299.9), '5:00');
  assert.equal(formatDuration(Infinity), '—');
});

test('triathlon rejects malformed times and mass affects the bike power balance', () => {
  assert.equal(parseMinutesSeconds('25:00'), 1500);
  for (const invalid of ['1:99', '1:', ':30', '1.5:30', 'Infinity:00', '0:00', '1:-1']) assert.equal(parseMinutesSeconds(invalid), null);
  const speed = estimateBikeSpeed(200, 75);
  assert.ok(speed > 35 && speed < 40);
  const v = speed / 3.6;
  const recoveredPower = (0.5 * 1.225 * 0.25 * v ** 3 + 0.004 * 84 * 9.80665 * v) / 0.97;
  assert.ok(Math.abs(recoveredPower - 200) < 0.00001);
  assert.ok(estimateBikeSpeed(200, 100) < speed);
  assert.ok(estimateBikeSpeed(250, 75) > speed);
  assert.equal(estimateBikeSpeed(Infinity, 75), 0);
});

test('LTHR zones have sport-specific known results and no overlaps or gaps', () => {
  assert.deepEqual([heartRateZones(165, 'running')[1].min, heartRateZones(165, 'running')[1].max], [141, 148]);
  assert.equal(heartRateZones(165, 'cycling')[1].min, 134);
  for (const sport of ['running', 'cycling']) for (let lthr = 60; lthr <= 230; lthr++) {
    const zones = heartRateZones(lthr, sport);
    for (let i = 1; i < zones.length; i++) assert.equal(zones[i].min, zones[i - 1].max + 1);
  }
  for (const bad of [0, -1, NaN, 231, 165.5]) assert.deepEqual(heartRateZones(bad, 'running'), []);
});

test('all 25 hybrid combinations preserve requested counts and hard-session spacing', () => {
  for (let runs = 1; runs <= 5; runs++) for (let lifts = 1; lifts <= 5; lifts++) {
    const days = buildHybridWeek(runs, lifts);
    const blocks = days.flatMap(d => d.blocks);
    assert.equal(blocks.filter(b => b.type === 'run').length, runs);
    assert.equal(blocks.filter(b => b.type === 'lift').length, lifts);
    assert.equal(days[1].blocks.find(b => b.type === 'lift').label, 'Lower Body Strength');
    if (runs >= 3) assert.equal(days[4].blocks.find(b => b.type === 'run').label, 'Quality Run');
    assert.ok(days[5].blocks.every(b => !/Quality|Lower Body/.test(b.label)));
    assert.ok(days.every(d => d.blocks.length >= 1 && d.blocks.length <= 2));
  }
});

test('stress estimate handles boundaries and does not generate negative load', () => {
  assert.deepEqual(estimateStress(60, 4, 0.75), { proxy: 56, sessionRpe: 240 });
  assert.equal(estimateStress(60, 8, 1).proxy, 100);
  for (const bad of [0, -60, Infinity, 1441]) assert.equal(estimateStress(bad, 4, 0.75), null);
});

const gel = { carbs: 25, sodium: 50, caffeine: 0 };
const cafGel = { carbs: 40, sodium: 100, caffeine: 30 };
test('mixed gels meet carbs and reconcile sodium/caffeine using actual labels', () => {
  const servings = planFuel(136, gel, cafGel, 'alternate', 65);
  const total = fuelTotals(servings);
  assert.equal(servings.filter(s => s.caffeinated).length, 2);
  assert.deepEqual(total, { carbs: 155, sodium: 350, caffeine: 60 });
  assert.ok(total.carbs >= 136);
  assert.ok(total.caffeine <= 65);
});

test('caffeine budget never rounds up a serving and includes regular-product caffeine', () => {
  assert.equal(fuelTotals(planFuel(100, gel, cafGel, 'all', 29)).caffeine, 0);
  const regular = { ...gel, caffeine: 10 };
  const result = planFuel(100, regular, cafGel, 'alternate', 50);
  assert.ok(fuelTotals(result).caffeine <= 50);
  assert.equal(fuelTotals(planFuel(100, regular)).caffeine, 40);
  assert.equal(fuelTotals(planFuel(120, { carbs: 30, sodium: 300, caffeine: 20 })).caffeine, 80);
});

test('nutrition invalid inputs are bounded and timeline never loses packed units', () => {
  for (const carbs of [0, -1, NaN, Infinity]) assert.deepEqual(planFuel(100, { ...gel, carbs }), []);
  assert.deepEqual(planFuel(-10, gel), []);
  for (const duration of [1, 5, 22, 120, 1440]) for (const count of [1, 5, 20, 100]) {
    const times = servingTimes(duration, count);
    assert.equal(times.length, count);
    assert.ok(times.every(t => t > 0 && t < duration));
    assert.equal(new Set(times).size, count);
  }
  assert.deepEqual(servingTimes(0, 5), []);
  assert.deepEqual(servingTimes(100, 100000), []);
});

test('checklist handles no-wetsuit shares, malformed storage and hidden items', () => {
  assert.deepEqual(parseChecklistState({ eventType: 'sprint', conditions: [], checked: ['a', 'a', 'invalid'], hiddenItems: ['b'] }, ['a', 'b']), { eventType: 'sprint', conditions: [], checked: ['a'], hiddenItems: ['b'] });
  assert.deepEqual(parseChecklistState({ eventType: 'invalid', conditions: ['hot', 'invalid'], checked: 'wrong' }, []), { eventType: 'olympic', conditions: ['hot'], checked: [], hiddenItems: [] });
});

test('waitlist validates raw email, trims values and accepts email-only signup', () => {
  const form = new FormData(); form.set('email', " o'connor@example.com ");
  assert.equal(validateWaitlist(form).lead.email, "o'connor@example.com");
  form.set('name', 'x'.repeat(101)); assert.ok(validateWaitlist(form).error);
  form.set('name', ''); form.set('email', new Blob(['bad'])); assert.ok(validateWaitlist(form).error);
  form.set('email', 'a@example.com\nBcc:x@example.com'); assert.ok(validateWaitlist(form).error);
});

const lead = { email: 'athlete@example.com', name: '<script>bad</script>', sport: '', frustration: '', source: 'hybrid-split-builder' };
test('waitlist provider errors cannot become successful signups', async () => {
  let calls = 0;
  const result = await deliverWaitlist(lead, async () => { calls++; return { error: { message: 'rejected' } }; }, 'test');
  assert.equal(result.success, false); assert.equal(calls, 1);
  assert.equal((await deliverWaitlist(lead, async () => { throw new Error('offline'); }, 'test')).success, false);
});

test('confirmation failure preserves accepted lead; payload is escaped and retry keys stable', async () => {
  const sent = [];
  const result = await deliverWaitlist(lead, async (mail, options) => { sent.push({ mail, options }); return sent.length === 1 ? { data: { id: 'accepted' }, error: null } : { error: { message: 'failed confirmation' } }; }, 'stable');
  assert.deepEqual(result, { success: true, confirmationSent: false });
  assert.ok(sent[0].mail.html.includes('&lt;script&gt;'));
  assert.ok(!sent[0].mail.html.includes('<script>'));
  assert.equal(sent[0].options.idempotencyKey, 'lead/stable');
  assert.equal(sent[1].options.idempotencyKey, 'confirmation/stable');
  assert.ok(sent.every(s => s.mail.from.includes('support@resiliento.app')));
});
