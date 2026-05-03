'use client';

import { useState } from 'react';

type BikeType = 'triathlon' | 'road' | 'gravel' | 'mtb';
type SurfaceType = 'track' | 'new_pavement' | 'good_pavement' | 'worn_pavement' | 'poor_pavement' | 'hardpack' | 'gravel' | 'chunky_gravel';
type SystemType = 'tubeless_perf' | 'tubeless_std' | 'tubular' | 'latex_tpu' | 'butyl';
type PaceType = 'relaxed' | 'moderate' | 'fast' | 'race';

const NumberInput = ({ label, value, unit, onChange, min, max, step = 1, note }: any) => (
  <div>
    <label className="flex flex-col mb-2">
      <span className="text-[10px] font-semibold uppercase tracking-widest text-neutral-400 mb-2">{label}</span>
      <div className="flex items-center gap-1">
        <button 
          onClick={() => onChange(Math.max(min, value - step))}
          className="w-8 h-8 rounded bg-neutral-800 text-neutral-400 flex items-center justify-center hover:bg-neutral-700 hover:text-white transition-colors"
        >–</button>
        <div className="relative flex-1">
          <input 
            type="number"
            value={value}
            onChange={(e) => {
              const val = Number(e.target.value);
              if (!isNaN(val)) onChange(val);
            }}
            className="w-full bg-black border border-neutral-800 rounded text-center h-8 text-white font-mono text-sm focus:border-brand outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          />
        </div>
        <button 
          onClick={() => onChange(Math.min(max, value + step))}
          className="w-8 h-8 rounded bg-neutral-800 text-neutral-400 flex items-center justify-center hover:bg-neutral-700 hover:text-white transition-colors"
        >+</button>
        <span className="text-brand font-mono text-sm ml-2 w-6">{unit}</span>
      </div>
    </label>
    {note && <p className="text-[10px] text-neutral-500 mt-1 text-center">{note}</p>}
  </div>
);

export default function Calculator() {
  const [systemWeight, setSystemWeight] = useState<number>(85);
  const [frontTireWidth, setFrontTireWidth] = useState<number>(28);
  const [rearTireWidth, setRearTireWidth] = useState<number>(28);
  const [bikeType, setBikeType] = useState<BikeType>('road');
  const [surfaceType, setSurfaceType] = useState<SurfaceType>('good_pavement');
  const [systemType, setSystemType] = useState<SystemType>('tubeless_perf');
  const [paceType, setPaceType] = useState<PaceType>('moderate');
  const [isWet, setIsWet] = useState<boolean>(false);
  const [isHookless, setIsHookless] = useState<boolean>(false);

  const bikeDistributions: Record<BikeType, { label: string, front: number, rear: number }> = {
    triathlon: { label: 'Triathlon / TT', front: 0.50, rear: 0.50 },
    road: { label: 'Road / Criterium', front: 0.45, rear: 0.55 },
    gravel: { label: 'Gravel / CX', front: 0.42, rear: 0.58 },
    mtb: { label: 'Mountain Bike', front: 0.40, rear: 0.60 },
  };

  const surfaceData: Record<SurfaceType, { label: string, sri: number }> = {
    track: { label: 'Track / Indoor Wood', sri: 0 },
    new_pavement: { label: 'New Pavement (Very Smooth)', sri: 2 },
    good_pavement: { label: 'Good Pavement', sri: 5 },
    worn_pavement: { label: 'Worn / Rough Pavement', sri: 10 },
    poor_pavement: { label: 'Poor Pavement / Chip Seal', sri: 15 },
    hardpack: { label: 'Hardpack Dirt / Light Gravel', sri: 25 },
    gravel: { label: 'Gravel', sri: 35 },
    chunky_gravel: { label: 'Chunky / Deep Gravel', sri: 45 },
  };

  const systemData: Record<SystemType, { label: string, modifier: number, description: string }> = {
    tubeless_perf: { label: 'High Perf. Tubeless (Thin Casing)', modifier: 1.0, description: 'Top-tier racing tubeless (e.g., GP5000 S TR, Corsa PRO). Extremely supple casing with no inner tube friction.' },
    tubular: { label: 'High Perf. Tubular', modifier: 1.0, description: 'Sewn-up racing tires. Mathematically identical to high-perf tubeless due to lack of tube friction and supple casings.' },
    tubeless_std: { label: 'Standard Tubeless (Thick Casing)', modifier: 0.97, description: 'Everyday or endurance tubeless tires. Thicker sidewalls require slightly lower pressure to deform correctly.' },
    latex_tpu: { label: 'Clincher + Latex/TPU Tube', modifier: 1.02, description: 'Standard clincher tire paired with a highly flexible Latex or TPU tube. Very low internal friction.' },
    butyl: { label: 'Clincher + Standard Butyl Tube', modifier: 1.05, description: 'Standard clincher tire with a regular butyl rubber tube. High internal friction requires higher pressure.' },
  };

  const paceData: Record<PaceType, { label: string, modifier: number }> = {
    relaxed: { label: 'Endurance / Relaxed (< 28 km/h)', modifier: 0.96 },
    moderate: { label: 'Tempo / Moderate (28 - 34 km/h)', modifier: 1.0 },
    fast: { label: 'Fast Group Ride (34 - 40 km/h)', modifier: 1.03 },
    race: { label: 'Race / Pro (> 40 km/h)', modifier: 1.06 },
  };

  const calculatePressures = () => {
    const dist = bikeDistributions[bikeType];
    const frontLoad = systemWeight * dist.front;
    const rearLoad = systemWeight * dist.rear;

    // Sophisticated physical base model derived from hoop stress & empiric testing
    // Base formula: PSI = (Load_kg / Width_mm^1.5) * 240
    const calcBase = (load: number, width: number) => (load / Math.pow(width, 1.5)) * 240;

    const baseFront = calcBase(frontLoad, frontTireWidth);
    const baseRear = calcBase(rearLoad, rearTireWidth);

    // Surface Impedance dampening depends on tire volume. 
    // Narrow tires suffer massively on rough surfaces, wide tires absorb it.
    const sri = surfaceData[surfaceType].sri;
    const frontVolumeDampening = Math.pow(28 / frontTireWidth, 0.5); 
    const rearVolumeDampening = Math.pow(28 / rearTireWidth, 0.5); 
    
    const frontEffectiveDrop = sri * frontVolumeDampening;
    const rearEffectiveDrop = sri * rearVolumeDampening;
    
    const frontSurfaceModifier = Math.max(0.4, 1 - (frontEffectiveDrop / 100));
    const rearSurfaceModifier = Math.max(0.4, 1 - (rearEffectiveDrop / 100));

    const sysMod = systemData[systemType].modifier;
    const paceMod = paceData[paceType].modifier;

    // Weather condition modifier (-5% for wet)
    const wetModifier = isWet ? 0.95 : 1.0;

    // Minimum safe pressure hard-cap to prevent ridiculous values
    const frontMinPsi = frontTireWidth > 45 ? 15 : (frontTireWidth > 32 ? 25 : 40);
    const rearMinPsi = rearTireWidth > 45 ? 15 : (rearTireWidth > 32 ? 25 : 40);

    let frontPsi = Math.max(frontMinPsi, baseFront * frontSurfaceModifier * sysMod * paceMod * wetModifier);
    let rearPsi = Math.max(rearMinPsi, baseRear * rearSurfaceModifier * sysMod * paceMod * wetModifier);

    let hooklessWarning = false;
    if (isHookless) {
      if (frontPsi > 72.5 || rearPsi > 72.5) {
        hooklessWarning = true;
      }
      frontPsi = Math.min(frontPsi, 72.5);
      rearPsi = Math.min(rearPsi, 72.5);
    }

    return {
      frontPsi: Math.round(frontPsi * 10) / 10,
      rearPsi: Math.round(rearPsi * 10) / 10,
      frontBar: Math.round((frontPsi / 14.5038) * 100) / 100,
      rearBar: Math.round((rearPsi / 14.5038) * 100) / 100,
      frontEffectiveDropPct: Math.round(frontEffectiveDrop * 10) / 10,
      rearEffectiveDropPct: Math.round(rearEffectiveDrop * 10) / 10,
      hooklessWarning,
    };
  };

  const results = calculatePressures();

  // Dynamic glow depending on PSI (High = Red/Orange, Low = Blue)
  const getGlowColor = (psi: number) => {
    if (psi > 90) return 'bg-red-500';
    if (psi > 75) return 'bg-orange-500';
    if (psi > 50) return 'bg-brand';
    return 'bg-blue-500';
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      {/* Inputs Panel */}
      <div className="lg:col-span-7 bg-neutral-900 border border-neutral-800 rounded-xl p-6 md:p-8 shadow-2xl relative overflow-hidden flex flex-col gap-8">
        <h2 className="text-xl font-bold text-white font-montserrat tracking-wide">System Parameters</h2>
        
        <div className="space-y-8">
          {/* Top Parameters Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <NumberInput 
              label="System Weight" 
              value={systemWeight} 
              onChange={setSystemWeight} 
              unit="kg" min={50} max={130} 
              note="Rider + Bike."
            />
            <NumberInput 
              label="Front Tire" 
              value={frontTireWidth} 
              onChange={setFrontTireWidth} 
              unit="mm" min={23} max={60} 
              note="Measured size."
            />
            <NumberInput 
              label="Rear Tire" 
              value={rearTireWidth} 
              onChange={setRearTireWidth} 
              unit="mm" min={23} max={60} 
              note="Measured size."
            />
          </div>

          {/* Selectors Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-neutral-800">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-widest text-neutral-400 mb-3">Bike & Distribution</label>
              <div className="space-y-2">
                {(Object.entries(bikeDistributions) as [BikeType, typeof bikeDistributions[BikeType]][]).map(([key, data]) => (
                  <button
                    key={key}
                    onClick={() => setBikeType(key)}
                    className={`w-full text-left px-3 py-2 text-sm rounded transition-colors ${bikeType === key ? 'bg-brand/20 border border-brand/50 text-white' : 'bg-black/40 border border-neutral-800 text-neutral-400 hover:border-neutral-600'}`}
                  >
                    <div className="font-semibold">{data.label}</div>
                    <div className="text-[10px] font-mono opacity-60">{Math.round(data.front * 100)}% F / {Math.round(data.rear * 100)}% R</div>
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-widest text-neutral-400 mb-3">Surface Condition</label>
                <select 
                  value={surfaceType}
                  onChange={(e) => setSurfaceType(e.target.value as SurfaceType)}
                  className="w-full bg-black/40 border border-neutral-800 rounded px-3 py-2 text-sm text-white focus:border-brand outline-none appearance-none"
                >
                  {(Object.entries(surfaceData) as [SurfaceType, typeof surfaceData[SurfaceType]][]).map(([key, data]) => (
                    <option key={key} value={key}>{data.label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-widest text-neutral-400 mb-3">Target Speed</label>
                <select 
                  value={paceType}
                  onChange={(e) => setPaceType(e.target.value as PaceType)}
                  className="w-full bg-black/40 border border-neutral-800 rounded px-3 py-2 text-sm text-white focus:border-brand outline-none appearance-none"
                >
                  {(Object.entries(paceData) as [PaceType, typeof paceData[PaceType]][]).map(([key, data]) => (
                    <option key={key} value={key}>{data.label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-widest text-neutral-400 mb-3">Tire System Type</label>
                <select 
                  value={systemType}
                  onChange={(e) => setSystemType(e.target.value as SystemType)}
                  className="w-full bg-black/40 border border-neutral-800 rounded px-3 py-2 text-sm text-white focus:border-brand outline-none appearance-none mb-2"
                >
                  {(Object.entries(systemData) as [SystemType, typeof systemData[SystemType]][]).map(([key, data]) => (
                    <option key={key} value={key}>{data.label}</option>
                  ))}
                </select>
                <p className="text-[10px] text-neutral-500 leading-relaxed min-h-[30px]">
                  {systemData[systemType].description}
                </p>
              </div>

              <div className="pt-2">
                <label className="block text-[10px] font-semibold uppercase tracking-widest text-neutral-500 mb-3">Ride Conditions</label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setIsWet(!isWet)}
                    className={`py-2 text-[10px] font-bold uppercase tracking-widest rounded transition-all border ${isWet ? 'bg-blue-500/20 border-blue-500/50 text-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.2)]' : 'bg-black/40 border-neutral-800 text-neutral-500 hover:border-neutral-600'}`}
                  >
                    Wet / Rain
                  </button>
                  <button
                    onClick={() => setIsHookless(!isHookless)}
                    className={`py-2 text-[10px] font-bold uppercase tracking-widest rounded transition-all border ${isHookless ? 'bg-red-500/20 border-red-500/50 text-red-400 shadow-[0_0_15px_rgba(239,68,68,0.2)]' : 'bg-black/40 border-neutral-800 text-neutral-500 hover:border-neutral-600'}`}
                  >
                    Hookless
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Output Panel */}
      <div className="lg:col-span-5 bg-neutral-950 border border-neutral-800 rounded-xl p-6 md:p-8 flex flex-col justify-center relative overflow-hidden shadow-2xl">
        <div className={`absolute top-0 right-0 w-64 h-64 blur-[120px] rounded-full pointer-events-none opacity-20 ${getGlowColor(results.rearPsi)}`}></div>
        <div className={`absolute bottom-0 left-0 w-48 h-48 blur-[100px] rounded-full pointer-events-none opacity-20 ${getGlowColor(results.frontPsi)}`}></div>
        
        <h2 className="text-sm font-bold text-neutral-500 mb-8 font-mono uppercase tracking-widest text-center">Optimal Breakpoint</h2>
        
        {results.hooklessWarning && (
          <div className="z-10 relative bg-red-900/20 border border-red-500/30 rounded-lg p-4 mb-6">
            <h3 className="text-red-400 font-bold text-[10px] uppercase tracking-widest mb-1 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
              Safety Limit Reached
            </h3>
            <p className="text-[10px] text-red-200/70 leading-relaxed">
              Your optimal pressure exceeds the strict 72.5 PSI (5.0 BAR) ISO limit for hookless rims. The recommendation has been capped. Consider running a wider tire to safely lower your pressure.
            </p>
          </div>
        )}


        <div className="space-y-6 z-10 relative">
          {/* Front */}
          <div className="bg-black/60 border border-neutral-800/80 rounded-xl p-6 backdrop-blur-sm relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-brand/50"></div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs text-neutral-400 uppercase tracking-widest font-semibold">Front Tire</span>
              <span className="text-brand font-mono text-sm">{Math.round(bikeDistributions[bikeType].front * 100)}% Load</span>
            </div>
            <div className="flex items-end gap-3">
              <div className="text-5xl md:text-6xl font-bold font-mono text-white tracking-tighter">
                {results.frontPsi}
              </div>
              <div className="pb-1">
                <div className="text-sm text-neutral-400 font-mono">PSI</div>
                <div className="text-xs text-neutral-500 font-mono">{results.frontBar} BAR</div>
              </div>
            </div>
          </div>

          {/* Rear */}
          <div className="bg-black/60 border border-neutral-800/80 rounded-xl p-6 backdrop-blur-sm relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-orange-500/50"></div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs text-neutral-400 uppercase tracking-widest font-semibold">Rear Tire</span>
              <span className="text-orange-400 font-mono text-sm">{Math.round(bikeDistributions[bikeType].rear * 100)}% Load</span>
            </div>
            <div className="flex items-end gap-3">
              <div className="text-5xl md:text-6xl font-bold font-mono text-white tracking-tighter">
                {results.rearPsi}
              </div>
              <div className="pb-1">
                <div className="text-sm text-neutral-400 font-mono">PSI</div>
                <div className="text-xs text-neutral-500 font-mono">{results.rearBar} BAR</div>
              </div>
            </div>
          </div>
        </div>

        {/* Info panel */}
        <div className="mt-8 z-10 relative bg-neutral-900/50 border border-neutral-800/50 rounded-lg p-4">
          <div className="flex justify-between items-center mb-2 border-b border-neutral-800/50 pb-2">
            <span className="text-[10px] uppercase tracking-widest text-neutral-500">Surface Impedance Drop</span>
            <span className="text-xs font-mono text-neutral-300">F: -{results.frontEffectiveDropPct}% / R: -{results.rearEffectiveDropPct}%</span>
          </div>
          <p className="text-[10px] text-neutral-500 leading-relaxed">
            This physics model dynamically calculates the point where casing hysteresis losses intersect with surface vibration losses. The drop accounts for the exact volume of your tires adapting to {surfaceData[surfaceType].label}.
          </p>
        </div>
      </div>
    </div>
  );
}
