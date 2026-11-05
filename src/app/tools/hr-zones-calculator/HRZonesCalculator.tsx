'use client';

import { useState } from 'react';
import { heartRateZones } from '@/lib/calculators';

export default function HRZonesCalculator() {
  const [lthr, setLthr] = useState<number>(165);

  const [sport, setSport] = useState<'running' | 'cycling'>('running');
  const zones = heartRateZones(lthr, sport);

  return (
    <div className="max-w-3xl mx-auto font-inter">
      {/* Input Section */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 shadow-2xl mb-8">
        <h2 className="text-xl font-bold text-white mb-6 tracking-tight">Heart Rate Profile</h2>

        <label className="block text-sm text-neutral-300 mb-4">Sport
          <select aria-label="Heart rate zone sport" value={sport} onChange={e => setSport(e.target.value as 'running' | 'cycling')} className="ml-4 bg-black border border-neutral-700 p-2 rounded">
            <option value="running">Running</option><option value="cycling">Cycling</option>
          </select>
        </label>
        <div className="p-6 bg-black/40 rounded-xl border border-neutral-800/50">
          <label className="block text-[10px] font-bold uppercase tracking-widest text-brand mb-2">Lactate Threshold HR (LTHR)</label>
          <div className="relative max-w-sm">
            <input 
              type="number" min={60} max={230} step={1} aria-label="Lactate threshold heart rate in bpm"
              value={lthr || ''} 
              onChange={(e) => setLthr(Number(e.target.value))}
              className="w-full bg-black border border-neutral-800 rounded-lg h-14 text-white font-mono text-2xl px-4 focus:border-brand outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none transition-all focus:shadow-[0_0_20px_rgba(var(--brand-rgb),0.1)]" 
            />
            <span className="absolute right-4 top-4 text-sm text-neutral-500 font-mono">bpm</span>
          </div>
          <div className="mt-4 space-y-2">
            <p className="text-xs text-neutral-400 leading-relaxed">
              <strong className="text-white">How to find your LTHR:</strong> Use a sport-specific lab result, a suitable field test, or a threshold estimate from a compatible watch. Running and cycling thresholds may differ.
            </p>
            <p className="text-xs text-neutral-500 leading-relaxed">
              <strong>Field Test:</strong> Joe Friel’s field protocol uses the average heart rate for the <em>last 20 minutes</em> of a 30-minute solo time trial in your chosen sport. It is a hard test, intended for athletes prepared for that effort; use a coach or lab if unsure.
            </p>
          </div>
        </div>
      </div>

      {/* Output Zones Section */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden shadow-2xl">
        <div className="px-6 py-4 bg-black/40 border-b border-neutral-800 flex justify-between items-center">
          <h3 className="text-sm font-bold text-white uppercase tracking-widest">Calculated Training Zones</h3>
          <span className="text-xs text-brand font-mono font-bold">FRIEL / {sport.toUpperCase()}</span>
        </div>
        
        <div className="divide-y divide-neutral-800/30">
          {zones.length === 0 && <p role="status" className="p-6 text-amber-300">Enter a whole-number LTHR between 60 and 230 bpm.</p>}
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
