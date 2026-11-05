/** Pure calculations shared by the tools and their regression checks. */
export const METERS_PER_MILE = 1609.344;

export function nonNegative(value: number, max = 1_000_000): number {
  return Number.isFinite(value) ? Math.min(max, Math.max(0, value)) : 0;
}

export function parseMinutesSeconds(value: string): number | null {
  if (!/^\d{1,4}:[0-5]\d$/.test(value.trim())) return null;
  const [minutes, seconds] = value.trim().split(':').map(Number);
  const total = minutes * 60 + seconds;
  return total > 0 ? total : null;
}

export function formatDuration(seconds: number, hours = false): string {
  if (!Number.isFinite(seconds) || seconds < 0) return '—';
  const rounded = Math.round(seconds);
  const s = String(rounded % 60).padStart(2, '0');
  const m = Math.floor(rounded / 60);
  if (hours && rounded >= 3600) return `${Math.floor(rounded / 3600)}:${String(m % 60).padStart(2, '0')}:${s}`;
  return `${m}:${s}`;
}

export function runningResult(mode: 'pace' | 'time' | 'distance', distanceMeters: number, timeSeconds: number, paceSecondsPerKm: number): number | null {
  const inputs = mode === 'pace' ? [distanceMeters, timeSeconds] : mode === 'time' ? [distanceMeters, paceSecondsPerKm] : [timeSeconds, paceSecondsPerKm];
  if (!inputs.every(n => Number.isFinite(n) && n > 0)) return null;
  const result = mode === 'pace' ? timeSeconds / (distanceMeters / 1000) : mode === 'time' ? paceSecondsPerKm * distanceMeters / 1000 : timeSeconds / paceSecondsPerKm * 1000;
  return Number.isFinite(result) ? result : null;
}

/** Flat, still-air TT estimate: drag + rolling resistance, 9 kg bike/kit. */
export function estimateBikeSpeed(watts: number, riderKg: number): number {
  if (![watts, riderKg].every(v => Number.isFinite(v) && v > 0)) return 0;
  let low = 0, high = 50; // metres per second
  for (let i = 0; i < 60; i++) {
    const speed = (low + high) / 2;
    const required = (0.5 * 1.225 * 0.25 * speed ** 3 + 0.004 * (riderKg + 9) * 9.80665 * speed) / 0.97;
    if (required < watts) low = speed; else high = speed;
  }
  return (low + high) / 2 * 3.6;
}

export function heartRateZones(lthr: number, sport: 'running' | 'cycling') {
  if (!Number.isFinite(lthr) || !Number.isInteger(lthr) || lthr < 60 || lthr > 230) return [];
  // Joe Friel: whole-bpm intervals use ceil at each lower boundary, no gaps.
  const boundaries = sport === 'running' ? [0.85, 0.90, 0.95, 1, 1.03, 1.07] : [0.81, 0.90, 0.94, 1, 1.03, 1.07];
  const names = ['Recovery', 'Aerobic Base', 'Tempo', 'Subthreshold', 'Superthreshold', 'Aerobic Capacity', 'Anaerobic Capacity'];
  const labels = ['1', '2', '3', '4', '5a', '5b', '5c'];
  return names.map((name, i) => ({ zone: `Zone ${labels[i]}`, name,
    min: i === 0 ? null : Math.ceil(lthr * boundaries[i - 1]),
    max: i === boundaries.length ? null : Math.ceil(lthr * boundaries[i]) - 1,
    desc: i < 2 ? 'Easy, conversational effort.' : i < 4 ? 'Steady to hard effort; match your planned session.' : 'High intensity; use sparingly within your plan.' }));
}

export type DayPlan = { day: string; blocks: { type: 'run' | 'lift' | 'rest'; label: string; desc: string; time: string }[] };
export function buildHybridWeek(runs: number, lifts: number): DayPlan[] {
  const days: DayPlan[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(day => ({ day, blocks: [] }));
  const add = (day: number, type: 'run' | 'lift', label: string, desc: string, time: string) => days[day].blocks.push({ type, label, desc, time });
  const runSlots = [6, 0, 4, 3, 5];
  for (let i = 0; i < Math.min(5, nonNegative(Math.floor(runs))); i++) {
    add(runSlots[i], 'run', i === 0 ? 'Long Easy Run' : i === 2 ? 'Quality Run' : 'Easy Run', i === 2 ? 'Controlled intervals; scale volume to your experience.' : 'Conversational effort; adjust duration to your base.', 'AM');
  }
  const liftSlots = [1, 3, 2, 0, 5];
  const liftLabels = ['Lower Body Strength', 'Upper Body Strength', 'Upper Body / Core', 'Upper Body Accessory', 'Light Technique / Mobility'];
  for (let i = 0; i < Math.min(5, nonNegative(Math.floor(lifts))); i++) {
    add(liftSlots[i], 'lift', liftLabels[i], i === 0 ? 'Main lower-body session, separated from Friday quality running.' : 'Keep accessory work submaximal; avoid adding another hard leg day.', 'PM');
  }
  for (const day of days) {
    day.blocks.sort((a, b) => a.time.localeCompare(b.time));
    if (!day.blocks.length) day.blocks.push({ type: 'rest', label: 'Rest / Mobility', desc: 'Rest or gentle movement, based on how you feel.', time: 'ALL DAY' });
  }
  return days;
}

export function estimateStress(durationMin: number, rpe: number, intensityFactor: number) {
  if (!Number.isFinite(durationMin) || durationMin <= 0 || durationMin > 1440 || !Number.isFinite(rpe) || rpe < 1 || rpe > 10 || !Number.isFinite(intensityFactor) || intensityFactor < 0) return null;
  return { proxy: Math.round(durationMin / 60 * intensityFactor ** 2 * 100), sessionRpe: Math.round(durationMin * rpe) };
}
