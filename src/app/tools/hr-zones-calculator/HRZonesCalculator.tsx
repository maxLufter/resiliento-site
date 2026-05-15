'use client';

import { useState } from 'react';

export default function HRZonesCalculator() {
  const [lthr, setLthr] = useState<number>(165);

  const calculateZones = () => {
    const l = lthr > 0 ? lthr : 1;
    return [
      { zone: 'Zone 1', name: 'Recovery', min: null, max: Math.floor(l * 0.74) - 1, desc: 'Easy, conversational pace.' },
      { zone: 'Zone 2', name: 'Aerobic Base', min: Math.floor(l * 0.74), max: Math.floor(l * 0.88) - 1, desc: 'All-day pace, builds aerobic base.' },
      { zone: 'Zone 3', name: 'Tempo', min: Math.floor(l * 0.88), max: Math.floor(l * 0.94) - 1, desc: 'Comfortably hard, sustainable but requires focus.' },
      { zone: 'Zone 4', name: 'Threshold', min: Math.floor(l * 0.94), max: Math.floor(l * 1.01) - 1, desc: 'Just below lactate threshold, burn is noticeable.' },
      { zone: 'Zone 5', name: 'VO2 / Anaerobic', min: Math.floor(l * 1.01), max: null, desc: 'Maximal oxygen uptake, very hard effort.' },
    ];
  };

  const zones = calculateZones();

  return (
    <div className="max-w-3xl mx-auto font-inter">
      {/* Input Section */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 shadow-2xl mb-8">
        <h2 className="text-xl font-bold text-white mb-6 tracking-tight">Heart Rate Profile</h2>

        <div className="p-6 bg-black/40 rounded-xl border border-neutral-800/50">
          <label className="block text-[10px] font-bold uppercase tracking-widest text-brand mb-2">Lactate Threshold HR (LTHR)</label>
          <div className="relative max-w-sm">
            <input 
              type="number" 
              value={lthr || ''} 
              onChange={(e) => setLthr(Math.max(1, parseInt(e.target.value) || 0))} 
              className="w-full bg-black border border-neutral-800 rounded-lg h-14 text-white font-mono text-2xl px-4 focus:border-brand outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none transition-all focus:shadow-[0_0_20px_rgba(var(--brand-rgb),0.1)]" 
            />
            <span className="absolute right-4 top-4 text-sm text-neutral-500 font-mono">bpm</span>
          </div>
          <div className="mt-4 space-y-2">
            <p className="text-xs text-neutral-400 leading-relaxed">
              <strong className="text-white">How to find your LTHR:</strong> Modern fitness watches (Garmin, Coros, Apple Watch) often estimate this automatically after hard runs.
            </p>
            <p className="text-xs text-neutral-500 leading-relaxed">
              <strong>Field Test:</strong> Run a 30-minute all-out time trial by yourself. Your LTHR is your average heart rate for the <em>last 20 minutes</em> of the effort. (Alternatively, take 95% of the average HR from a 20-minute all-out test).
            </p>
          </div>
        </div>
      </div>

      {/* Output Zones Section */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden shadow-2xl">
        <div className="px-6 py-4 bg-black/40 border-b border-neutral-800 flex justify-between items-center">
          <h3 className="text-sm font-bold text-white uppercase tracking-widest">Calculated Training Zones</h3>
          <span className="text-xs text-brand font-mono font-bold">RESILIENTO (LTHR)</span>
        </div>
        
        <div className="divide-y divide-neutral-800/30">
          {zones.map((z, idx) => {
            const isHighIntensity = idx >= zones.length - 2;
            const isMidIntensity = idx > 1 && idx < zones.length - 2;
            
            let badgeColor = 'bg-blue-500/20 text-blue-400 border-blue-500/30';
            let barColor = 'bg-blue-500';
            
            if (isMidIntensity) {
              badgeColor = 'bg-orange-500/20 text-orange-400 border-orange-500/30';
              barColor = 'bg-orange-500';
            } else if (isHighIntensity) {
              badgeColor = 'bg-red-500/20 text-red-400 border-red-500/30';
              barColor = 'bg-red-500';
            }

            return (
              <div key={z.zone} className="p-4 sm:p-6 hover:bg-white/[0.02] transition-colors flex flex-col sm:flex-row items-start sm:items-center gap-4 relative overflow-hidden group">
                {/* Left Colored Indicator Bar */}
                <div className={`absolute left-0 top-0 bottom-0 w-1 ${barColor} opacity-50 group-hover:opacity-100 transition-opacity`}></div>
                
                {/* Zone Name & Badge */}
                <div className="w-full sm:w-1/3 flex flex-col gap-1 pl-2">
                  <span className={`self-start text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-sm border ${badgeColor}`}>
                    {z.zone}
                  </span>
                  <span className="text-sm font-bold text-white tracking-tight">{z.name}</span>
                </div>
                
                {/* BPM Range */}
                <div className="w-full sm:w-1/3 flex items-center gap-3">
                  {z.min === null ? (
                    <div className="flex-1 text-center bg-black/60 rounded border border-neutral-800 py-2 col-span-2">
                      <span className="text-xl font-mono text-white font-bold">&le; {z.max}</span>
                      <span className="text-xs text-neutral-500 font-mono ml-1">bpm</span>
                    </div>
                  ) : z.max === null ? (
                    <div className="flex-1 text-center bg-black/60 rounded border border-neutral-800 py-2 col-span-2">
                      <span className="text-xl font-mono text-white font-bold">&ge; {z.min}</span>
                      <span className="text-xs text-neutral-500 font-mono ml-1">bpm</span>
                    </div>
                  ) : (
                    <>
                      <div className="flex-1 text-center bg-black/60 rounded border border-neutral-800 py-2">
                        <span className="text-xl font-mono text-white font-bold">{z.min}</span>
                        <span className="text-xs text-neutral-500 font-mono ml-1">bpm</span>
                      </div>
                      <span className="text-neutral-600 font-bold">-</span>
                      <div className="flex-1 text-center bg-black/60 rounded border border-neutral-800 py-2">
                        <span className="text-xl font-mono text-white font-bold">{z.max}</span>
                        <span className="text-xs text-neutral-500 font-mono ml-1">bpm</span>
                      </div>
                    </>
                  )}
                </div>

                {/* Description */}
                <div className="w-full sm:w-1/3 text-xs text-neutral-400 leading-relaxed sm:pl-4">
                  {z.desc}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
