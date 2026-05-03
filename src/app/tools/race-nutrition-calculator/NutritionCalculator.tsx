'use client';

import { useState, useMemo } from 'react';

// ─── Types ───────────────────────────────────────────────────────────────────
type RaceType = 'tri_sprint' | 'tri_olympic' | 'tri_703' | 'tri_ironman' | 'bike' | 'run';
type HeatLevel = 'cool' | 'moderate' | 'hot';
type GutLevel = 'beginner' | 'moderate' | 'advanced';

interface LegPlan {
  name: string;
  durationMin: number;
  carbGPerH: number;
  carbTotal: number;
  fluidMlPerH: number;
  fluidTotal: number;
  sodiumMgPerH: number;
  sodiumTotal: number;
  caffeineNote: string;
  caffeineMg: number;
  canFuel: boolean;
}

// ─── Constants (evidence-based) ──────────────────────────────────────────────
const RACE_PRESETS: Record<RaceType, { label: string; legs: { name: string; defaultMin: number; canFuel: boolean }[] }> = {
  tri_sprint:  { label: 'Sprint Triathlon',  legs: [{ name: 'Swim', defaultMin: 15, canFuel: false }, { name: 'Bike', defaultMin: 35, canFuel: true }, { name: 'Run', defaultMin: 22, canFuel: true }] },
  tri_olympic: { label: 'Olympic Triathlon', legs: [{ name: 'Swim', defaultMin: 25, canFuel: false }, { name: 'Bike', defaultMin: 70, canFuel: true }, { name: 'Run', defaultMin: 50, canFuel: true }] },
  tri_703:     { label: 'Half Ironman (70.3)', legs: [{ name: 'Swim', defaultMin: 38, canFuel: false }, { name: 'Bike', defaultMin: 165, canFuel: true }, { name: 'Run', defaultMin: 120, canFuel: true }] },
  tri_ironman: { label: 'Ironman',           legs: [{ name: 'Swim', defaultMin: 75, canFuel: false }, { name: 'Bike', defaultMin: 360, canFuel: true }, { name: 'Run', defaultMin: 270, canFuel: true }] },
  bike:        { label: 'Cycling Event',     legs: [{ name: 'Bike', defaultMin: 180, canFuel: true }] },
  run:         { label: 'Running Event',     legs: [{ name: 'Run', defaultMin: 120, canFuel: true }] },
};

const GUT_CARB_CEILING: Record<GutLevel, number> = { beginner: 60, moderate: 80, advanced: 120 };
const GUT_LABELS: Record<GutLevel, string> = {
  beginner: 'Beginner — haven\'t practiced race fueling much (cap ~60 g/h)',
  moderate: 'Moderate — regular gel/drink training (cap ~80 g/h)',
  advanced: 'Advanced — trained gut, dual-transport carbs (cap ~120 g/h)',
};

const FLUID_RANGE: Record<HeatLevel, [number, number]> = { cool: [350, 500], moderate: [500, 700], hot: [700, 1000] };
const SODIUM_RANGE: Record<HeatLevel, [number, number]> = { cool: [300, 500], moderate: [500, 700], hot: [700, 1000] };

function carbRateForDuration(totalRaceMin: number, gutCeiling: number): number {
  if (totalRaceMin < 60) return 0;
  if (totalRaceMin < 120) return Math.min(45, gutCeiling);
  if (totalRaceMin < 180) return Math.min(60, gutCeiling);
  return Math.min(90, gutCeiling);
}

function avg(range: [number, number]): number { return Math.round((range[0] + range[1]) / 2); }

// ─── Component ───────────────────────────────────────────────────────────────
export default function NutritionCalculator() {
  const [raceType, setRaceType] = useState<RaceType>('tri_703');
  const [bodyMass, setBodyMass] = useState<number>(75);
  const [gutLevel, setGutLevel] = useState<GutLevel>('moderate');
  const [heat, setHeat] = useState<HeatLevel>('moderate');
  const [useCaffeine, setUseCaffeine] = useState<boolean>(true);
  const [legDurations, setLegDurations] = useState<number[]>([]);

  const preset = RACE_PRESETS[raceType];
  const durations = preset.legs.map((leg, i) => legDurations[i] ?? leg.defaultMin);
  const totalRaceMin = durations.reduce((a, b) => a + b, 0);

  const handleRaceChange = (r: RaceType) => {
    setRaceType(r);
    setLegDurations([]);
  };

  const setLegDuration = (idx: number, val: number) => {
    setLegDurations(prev => {
      const next = [...preset.legs.map((l, i) => prev[i] ?? l.defaultMin)];
      next[idx] = val;
      return next;
    });
  };

  // Compute plan
  const plan = useMemo((): LegPlan[] => {
    const gutCeiling = GUT_CARB_CEILING[gutLevel];
    const baseCarb = carbRateForDuration(totalRaceMin, gutCeiling);
    const fluidPerH = avg(FLUID_RANGE[heat]);
    const sodiumPerH = avg(SODIUM_RANGE[heat]);
    const caffeineDose = useCaffeine ? Math.round(bodyMass * 3) : 0; // 3mg/kg conservative
    let caffeineUsed = false;

    return preset.legs.map((leg, i) => {
      const dur = durations[i];
      if (!leg.canFuel) {
        return { name: leg.name, durationMin: dur, carbGPerH: 0, carbTotal: 0, fluidMlPerH: 0, fluidTotal: 0, sodiumMgPerH: 0, sodiumTotal: 0, caffeineNote: 'No fueling during swim', caffeineMg: 0, canFuel: false };
      }
      // Bike gets slightly higher carb rate than run (easier to digest)
      const isRun = leg.name === 'Run';
      const carbRate = isRun ? Math.min(baseCarb, Math.round(baseCarb * 0.85)) : baseCarb;
      const fluid = isRun ? Math.round(fluidPerH * 0.85) : fluidPerH;
      const sodium = isRun ? Math.round(sodiumPerH * 0.9) : sodiumPerH;

      let cafNote = '';
      let cafMg = 0;
      if (useCaffeine && !caffeineUsed) {
        cafMg = caffeineDose;
        cafNote = leg.name === 'Bike' ? `${cafMg} mg — take in first 30 min of bike` : `${cafMg} mg — take 15 min before start`;
        caffeineUsed = true;
      } else if (useCaffeine && isRun && totalRaceMin > 180) {
        cafMg = Math.round(caffeineDose * 0.5);
        cafNote = `${cafMg} mg top-up — early in run leg`;
      }

      return {
        name: leg.name, durationMin: dur, canFuel: true,
        carbGPerH: carbRate, carbTotal: Math.round(carbRate * (dur / 60)),
        fluidMlPerH: fluid, fluidTotal: Math.round(fluid * (dur / 60)),
        sodiumMgPerH: sodium, sodiumTotal: Math.round(sodium * (dur / 60)),
        caffeineNote: cafNote, caffeineMg: cafMg,
      };
    });
  }, [preset, durations, totalRaceMin, gutLevel, heat, bodyMass, useCaffeine]);

  const totals = useMemo(() => ({
    carbs: plan.reduce((a, l) => a + l.carbTotal, 0),
    fluid: plan.reduce((a, l) => a + l.fluidTotal, 0),
    sodium: plan.reduce((a, l) => a + l.sodiumTotal, 0),
    caffeine: plan.reduce((a, l) => a + l.caffeineMg, 0),
  }), [plan]);

  const gelCount = Math.ceil(totals.carbs / 25); // ~25g per gel
  const barCount = Math.floor(totals.carbs / 40); // ~40g per bar alternative

  return (
    <div className="font-inter space-y-6">
      {/* ── Inputs Panel ────────────────────────────────────────────────── */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 shadow-2xl">
        {/* Race Type */}
        <div className="mb-6">
          <label className="block text-[10px] font-bold uppercase tracking-widest text-neutral-400 mb-3">Race Type</label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {(Object.entries(RACE_PRESETS) as [RaceType, typeof RACE_PRESETS[RaceType]][]).map(([key, val]) => (
              <button key={key} onClick={() => handleRaceChange(key)}
                className={`py-2.5 text-xs font-bold uppercase tracking-widest rounded-lg transition-all border ${raceType === key ? 'bg-brand/20 border-brand/50 text-brand shadow-[0_0_15px_rgba(var(--brand-rgb),0.2)]' : 'bg-black/40 border-neutral-800 text-neutral-500 hover:border-neutral-600 hover:text-neutral-300'}`}>
                {val.label}
              </button>
            ))}
          </div>
        </div>

        {/* Leg Durations */}
        <div className="mb-6">
          <label className="block text-[10px] font-bold uppercase tracking-widest text-neutral-400 mb-3">Expected Leg Durations (minutes)</label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {preset.legs.map((leg, i) => (
              <div key={leg.name}>
                <span className="text-xs text-neutral-500 mb-1 block">{leg.name}</span>
                <input type="number" value={durations[i]} onChange={e => setLegDuration(i, Number(e.target.value) || 0)}
                  className="w-full bg-black border border-neutral-800 rounded-lg px-3 h-10 text-white font-mono text-sm text-center focus:border-brand outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" />
              </div>
            ))}
          </div>
          <p className="text-[10px] text-neutral-600 mt-2">Total race: <span className="text-neutral-400 font-mono">{Math.floor(totalRaceMin / 60)}h {totalRaceMin % 60}m</span></p>
        </div>

        {/* Athlete & Conditions Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-widest text-neutral-400 mb-2">Body Mass</label>
            <div className="relative">
              <input type="number" value={bodyMass} onChange={e => setBodyMass(Number(e.target.value) || 60)}
                className="w-full bg-black border border-neutral-800 rounded-lg px-3 h-10 text-white font-mono text-sm text-center focus:border-brand outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" />
              <span className="absolute right-3 top-2.5 text-xs text-neutral-500 font-mono">kg</span>
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-bold uppercase tracking-widest text-neutral-400 mb-2">Gut Training</label>
            <select value={gutLevel} onChange={e => setGutLevel(e.target.value as GutLevel)}
              className="w-full bg-black border border-neutral-800 rounded-lg px-3 h-10 text-neutral-300 text-xs focus:border-brand outline-none cursor-pointer">
              {(Object.entries(GUT_LABELS) as [GutLevel, string][]).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
            </select>
          </div>

          <div>
            <label className="block text-[10px] font-bold uppercase tracking-widest text-neutral-400 mb-2">Conditions</label>
            <div className="flex gap-1">
              {(['cool', 'moderate', 'hot'] as HeatLevel[]).map(h => (
                <button key={h} onClick={() => setHeat(h)}
                  className={`flex-1 py-2 text-[10px] font-bold uppercase tracking-widest rounded-lg transition-all border ${heat === h ? (h === 'hot' ? 'bg-orange-500/20 border-orange-500/50 text-orange-400' : h === 'cool' ? 'bg-cyan-500/20 border-cyan-500/50 text-cyan-400' : 'bg-brand/20 border-brand/50 text-brand') : 'bg-black/40 border-neutral-800 text-neutral-500 hover:border-neutral-600'}`}>
                  {h}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-bold uppercase tracking-widest text-neutral-400 mb-2">Caffeine</label>
            <button onClick={() => setUseCaffeine(!useCaffeine)}
              className={`w-full py-2 text-[10px] font-bold uppercase tracking-widest rounded-lg transition-all border ${useCaffeine ? 'bg-green-500/20 border-green-500/50 text-green-400' : 'bg-black/40 border-neutral-800 text-neutral-500 hover:border-neutral-600'}`}>
              {useCaffeine ? 'Yes — Using Caffeine' : 'No Caffeine'}
            </button>
          </div>
        </div>
      </div>

      {/* ── Results: Totals Summary ─────────────────────────────────────── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <ResultCard label="Total Carbs" value={`${totals.carbs} g`} sub={`≈ ${gelCount} gels or ${barCount} bars`} color="text-amber-400" />
        <ResultCard label="Total Fluid" value={`${(totals.fluid / 1000).toFixed(1)} L`} sub={`${totals.fluid} mL`} color="text-blue-400" />
        <ResultCard label="Total Sodium" value={`${totals.sodium} mg`} sub={`${Math.round(totals.sodium / 215)} salt caps`} color="text-rose-400" />
        <ResultCard label="Caffeine" value={`${totals.caffeine} mg`} sub={useCaffeine ? `${(totals.caffeine / bodyMass).toFixed(1)} mg/kg` : 'disabled'} color="text-green-400" />
      </div>

      {/* ── Per-Leg Breakdown ───────────────────────────────────────────── */}
      <div className="space-y-4">
        {plan.map(leg => (
          <div key={leg.name} className={`bg-neutral-900 border rounded-2xl overflow-hidden shadow-2xl ${!leg.canFuel ? 'border-neutral-800/50 opacity-60' : 'border-neutral-800'}`}>
            <div className="px-6 py-4 border-b border-neutral-800/50 flex justify-between items-center">
              <h3 className="text-sm font-bold text-white uppercase tracking-widest font-montserrat">{leg.name}</h3>
              <span className="text-xs font-mono text-neutral-500">{leg.durationMin} min</span>
            </div>
            {leg.canFuel ? (
              <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-neutral-800/30">
                <LegStat label="Carbs" rate={`${leg.carbGPerH} g/h`} total={`${leg.carbTotal} g total`} color="text-amber-400" />
                <LegStat label="Fluid" rate={`${leg.fluidMlPerH} mL/h`} total={`${leg.fluidTotal} mL total`} color="text-blue-400" />
                <LegStat label="Sodium" rate={`${leg.sodiumMgPerH} mg/h`} total={`${leg.sodiumTotal} mg total`} color="text-rose-400" />
                <LegStat label="Caffeine" rate={leg.caffeineNote || '—'} total="" color="text-green-400" />
              </div>
            ) : (
              <div className="px-6 py-4 text-xs text-neutral-500 italic">No fueling during swim — focus on pacing and positioning.</div>
            )}
          </div>
        ))}
      </div>

      {/* ── Race Execution Timeline ─────────────────────────────────────── */}
      <FuelingTimeline plan={plan} totalRaceMin={totalRaceMin} useCaffeine={useCaffeine} bodyMass={bodyMass} totals={totals} />

      {/* ── Practical Guide ─────────────────────────────────────────────── */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 shadow-2xl">
        <h3 className="text-sm font-bold text-white uppercase tracking-widest font-montserrat mb-4">Practical Fueling Guide</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-neutral-400">
          <div className="bg-black/30 rounded-xl p-4 border border-neutral-800/50">
            <span className="text-amber-400 font-bold uppercase tracking-widest text-[10px] block mb-2">Carbohydrate Products</span>
            <ul className="space-y-1.5">
              <li>• <span className="text-neutral-300">{gelCount} energy gels</span> (~25g carbs each)</li>
              <li>• Or <span className="text-neutral-300">{barCount} energy bars</span> (~40g each) + {Math.max(0, gelCount - barCount * 2)} gels</li>
              <li>• Or {Math.ceil(totals.carbs / 30)} scoops drink mix (~30g each)</li>
              <li className="text-neutral-600 pt-1 italic">Use glucose:fructose 2:1 ratio for {'>'} 60g/h</li>
            </ul>
          </div>
          <div className="bg-black/30 rounded-xl p-4 border border-neutral-800/50">
            <span className="text-blue-400 font-bold uppercase tracking-widest text-[10px] block mb-2">Hydration Strategy</span>
            <ul className="space-y-1.5">
              <li>• <span className="text-neutral-300">{Math.ceil(totals.fluid / 500)} × 500mL bottles</span></li>
              <li>• Drink every <span className="text-neutral-300">15-20 minutes</span>, not in large gulps</li>
              <li>• {heat === 'hot' ? 'Hot conditions: Pre-load 500mL in final 2h before start' : 'Start hydrating 2-3h before race'}</li>
              <li>• Add {Math.round(totals.sodium / Math.ceil(totals.fluid / 500))} mg sodium per bottle</li>
            </ul>
          </div>
          <div className="bg-black/30 rounded-xl p-4 border border-neutral-800/50">
            <span className="text-rose-400 font-bold uppercase tracking-widest text-[10px] block mb-2">Sodium / Electrolytes</span>
            <ul className="space-y-1.5">
              <li>• <span className="text-neutral-300">{Math.round(totals.sodium / 215)} electrolyte / salt capsules</span> (~215mg each)</li>
              <li>• Take every <span className="text-neutral-300">30-45 minutes</span> during bike and run</li>
              <li>• {heat === 'hot' ? 'Critical in heat — prevents cramping and hyponatremia' : 'Prevents late-race cramping'}</li>
            </ul>
          </div>
          <div className="bg-black/30 rounded-xl p-4 border border-neutral-800/50">
            <span className="text-green-400 font-bold uppercase tracking-widest text-[10px] block mb-2">Caffeine Timing</span>
            {useCaffeine ? (
              <ul className="space-y-1.5">
                <li>• Total dose: <span className="text-neutral-300">{totals.caffeine} mg</span> ({(totals.caffeine / bodyMass).toFixed(1)} mg/kg)</li>
                <li>• Primary dose: <span className="text-neutral-300">30-45 min before bike leg</span></li>
                {totalRaceMin > 180 && <li>• Top-up: <span className="text-neutral-300">Early in run leg</span> (half dose)</li>}
                <li className="text-neutral-600 pt-1 italic">Practice in training — never try new dosing on race day</li>
              </ul>
            ) : (
              <p className="text-neutral-500 italic">Caffeine disabled. Consider 3mg/kg dose for races {'>'} 2h.</p>
            )}
          </div>
        </div>
      </div>

      {/* ── Evidence disclaimer ─────────────────────────────────────────── */}
      <p className="text-[10px] text-neutral-600 text-center px-8">
        Targets derived from Jeukendrup (2014), ACSM Position Stand, Precision Hydration, and Burke (2008) caffeine meta-analysis. Individual needs vary — always practice your race nutrition in training.
      </p>
    </div>
  );
}

// ─── Sub-components ──────────────────────────────────────────────────────────
function ResultCard({ label, value, sub, color }: { label: string; value: string; sub: string; color: string }) {
  return (
    <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-5 text-center shadow-2xl relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-0.5 bg-current opacity-30" style={{ color: 'inherit' }}></div>
      <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-500 block mb-1">{label}</span>
      <div className={`text-2xl font-bold font-mono ${color}`}>{value}</div>
      <span className="text-[10px] text-neutral-600 block mt-1">{sub}</span>
    </div>
  );
}

function LegStat({ label, rate, total, color }: { label: string; rate: string; total: string; color: string }) {
  return (
    <div className="px-4 py-4 text-center">
      <span className={`text-[10px] font-bold uppercase tracking-widest ${color} block mb-1`}>{label}</span>
      <div className="text-sm font-mono text-white">{rate}</div>
      {total && <span className="text-[10px] text-neutral-600">{total}</span>}
    </div>
  );
}

// ─── Fueling Timeline Component ──────────────────────────────────────────────
function FuelingTimeline({ plan, totalRaceMin, useCaffeine, bodyMass, totals }: { plan: LegPlan[], totalRaceMin: number, useCaffeine: boolean, bodyMass: number, totals: any }) {
  let cumTime = 0;
  
  return (
    <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 shadow-2xl mt-8">
      <h3 className="text-sm font-bold text-white uppercase tracking-widest font-montserrat mb-6 flex items-center gap-2">
        <svg className="w-5 h-5 text-brand" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
        Race Execution Timeline
      </h3>

      {/* Proportional Bar */}
      <div className="relative h-4 w-full rounded-full overflow-hidden mb-10 flex bg-black/50 border border-neutral-800">
        {plan.map(leg => {
          const pct = (leg.durationMin / totalRaceMin) * 100;
          const color = leg.name === 'Swim' ? 'bg-cyan-500/80' : leg.name === 'Bike' ? 'bg-brand/80' : 'bg-orange-500/80';
          if (pct === 0) return null;
          return (
            <div key={leg.name} style={{ width: `${pct}%` }} className={`${color} h-full border-r border-black/50 flex items-center justify-center`}>
              {pct > 10 && <span className="text-[9px] font-bold text-black/80 uppercase tracking-widest">{leg.name}</span>}
            </div>
          );
        })}
      </div>

      {/* Vertical Timeline */}
      <div className="relative border-l-2 border-neutral-800 ml-3 md:ml-6 space-y-8 pb-4">
        
        {/* T-15 */}
        <TimelineNode time="T -0:15" title="Pre-Race Prep" color="bg-neutral-500" textColor="text-neutral-400">
          <p className="text-xs text-neutral-400">
            Drink <strong className="text-blue-400">300ml fluid</strong>. 
            {useCaffeine && <span> Take <strong className="text-green-400">{Math.round(bodyMass * 3)}mg caffeine</strong>.</span>}
            <br />Eat 1 energy gel 5 mins before start (if gut trained).
          </p>
        </TimelineNode>

        {plan.map(leg => {
          const startTime = cumTime;
          cumTime += leg.durationMin;
          const isSwim = !leg.canFuel;
          
          if (leg.durationMin === 0) return null;

          const dotColor = leg.name === 'Swim' ? 'bg-cyan-500' : leg.name === 'Bike' ? 'bg-brand' : 'bg-orange-500';
          const txtColor = leg.name === 'Swim' ? 'text-cyan-500' : leg.name === 'Bike' ? 'text-brand' : 'text-orange-500';

          return (
            <TimelineNode 
              key={leg.name}
              time={`T +${formatTime(startTime)}`} 
              title={`${leg.name} Start`} 
              color={dotColor}
              textColor={txtColor}
            >
              {isSwim ? (
                <p className="text-xs text-neutral-500 italic">No fueling. Focus on pacing and sighting.</p>
              ) : (
                <div className="space-y-3 mt-2">
                  <div className="flex flex-wrap gap-2">
                    <span className="px-2 py-1 bg-amber-500/10 border border-amber-500/20 rounded text-[10px] text-amber-400 font-mono tracking-wide">Target: {leg.carbGPerH}g Carbs/h</span>
                    <span className="px-2 py-1 bg-blue-500/10 border border-blue-500/20 rounded text-[10px] text-blue-400 font-mono tracking-wide">Target: {leg.fluidMlPerH}ml Fluid/h</span>
                  </div>
                  
                  <div className="bg-black/30 rounded-lg p-3 border border-neutral-800 text-xs text-neutral-400 space-y-2.5">
                    <div className="flex gap-3">
                      <span className="text-neutral-500 w-16 flex-shrink-0 font-mono text-[10px] uppercase pt-0.5">Every 20m</span>
                      <span>Drink <strong className="text-blue-400">~{Math.round(leg.fluidMlPerH / 3)}ml</strong> fluid + <strong className="text-amber-400">~{Math.round(leg.carbGPerH / 3)}g</strong> carbs <span className="text-neutral-500">(approx {Math.round(leg.carbGPerH/3/25 * 10)/10} gels)</span></span>
                    </div>
                    <div className="flex gap-3">
                      <span className="text-neutral-500 w-16 flex-shrink-0 font-mono text-[10px] uppercase pt-0.5">Every 45m</span>
                      <span>Take 1 salt capsule (<strong className="text-rose-400">{Math.round(leg.sodiumMgPerH * 0.75)}mg sodium</strong>)</span>
                    </div>
                    {useCaffeine && leg.name === 'Run' && totalRaceMin > 180 && (
                      <div className="flex gap-3 mt-2 pt-2 border-t border-neutral-800/50">
                        <span className="text-green-500/70 w-16 flex-shrink-0 font-mono text-[10px] uppercase pt-0.5">T2/Early</span>
                        <span className="text-green-400 font-semibold">Take {Math.round(bodyMass * 1.5)}mg caffeine top-up</span>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </TimelineNode>
          );
        })}

        <TimelineNode time={`T +${formatTime(totalRaceMin)}`} title="Finish Line" color="bg-green-500" textColor="text-green-400">
          <p className="text-xs text-neutral-400">Great job! Start recovery hydration and <strong className="text-white">{Math.round(bodyMass * 0.3)}g of protein</strong> within 30 minutes.</p>
        </TimelineNode>

      </div>
    </div>
  );
}

function TimelineNode({ time, title, color, textColor, children }: { time: string, title: string, color: string, textColor: string, children: React.ReactNode }) {
  return (
    <div className="relative pl-6 md:pl-8">
      {/* Node Dot */}
      <div className={`absolute -left-[5px] top-1 w-2.5 h-2.5 rounded-full ${color} shadow-[0_0_8px_currentColor]`} />
      
      {/* Content */}
      <div className="mb-1 flex items-center gap-3">
        <span className={`text-[10px] font-bold font-mono tracking-widest ${textColor}`}>{time}</span>
        <h4 className="text-sm font-bold text-white uppercase tracking-widest font-montserrat">{title}</h4>
      </div>
      <div>{children}</div>
    </div>
  );
}

function formatTime(mins: number) {
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  return `${h}:${m.toString().padStart(2, '0')}`;
}
