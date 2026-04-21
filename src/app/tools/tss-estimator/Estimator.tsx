'use client';

import { useState } from 'react';

export default function Estimator() {
  const [durationMin, setDurationMin] = useState<number>(60);
  const [rpe, setRpe] = useState<number>(4);

  const getIFData = (r: number) => {
    if (r <= 2) return { IF: 0.65, label: "Very Easy (Recovery)", color: "text-blue-400", bg: "bg-blue-400" };
    if (r <= 4) return { IF: 0.75, label: "Easy (Endurance Base)", color: "text-emerald-400", bg: "bg-emerald-400" };
    if (r <= 6) return { IF: 0.85, label: "Moderate (Tempo)", color: "text-yellow-400", bg: "bg-yellow-400" };
    if (r <= 8) return { IF: 0.95, label: "Hard (Threshold / Intervals)", color: "text-orange-400", bg: "bg-orange-400" };
    const maxIF = 1.05 + ((rpe - 8) * 0.05);
    return { IF: maxIF, label: "Maximal Effort (VO2 / Sprinting)", color: "text-red-500", bg: "bg-red-500" };
  };

  const calculateTSS = () => {
    const { IF } = getIFData(rpe);
    const hours = durationMin / 60;
    const tss = hours * (IF * IF) * 100;
    return Math.round(tss);
  };

  const getReadinessImpact = (tss: number) => {
    if (tss < 20) return { label: "Active Recovery", hours: "0h", color: "text-slate-400", gauge: 10 };
    if (tss < 45) return { label: "Low Impact", hours: "12h", color: "text-blue-400", gauge: 25 };
    if (tss < 80) return { label: "Moderate Impact", hours: "24-36h", color: "text-brand", gauge: 50 };
    if (tss < 130) return { label: "High Impact", hours: "36-48h", color: "text-orange-400", gauge: 75 };
    return { label: "Severe Impact", hours: "48-72h+", color: "text-red-500", gauge: 100 };
  };

  const tss = calculateTSS();
  const impact = getReadinessImpact(tss);
  const rpeData = getIFData(rpe);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Inputs Configuration */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 md:p-8 shadow-2xl relative overflow-hidden">
        <h2 className="text-xl font-bold text-white mb-8 font-montserrat tracking-wide">Session Parameters</h2>
        <div className="space-y-10">
          <div>
            <label className="flex justify-between items-end mb-4">
              <span className="text-xs font-semibold uppercase tracking-widest text-neutral-400">Duration</span>
              <div className="flex items-center gap-2">
                <input 
                  type="number"
                  value={durationMin}
                  onChange={(e) => setDurationMin(Number(e.target.value))}
                  className="bg-black border border-neutral-800 rounded text-center w-16 py-1 text-white font-mono text-sm focus:border-brand outline-none"
                />
                <span className="text-brand font-mono text-sm">min</span>
              </div>
            </label>
            <input 
              type="range" 
              min="15" 
              max="300" 
              step="5"
              value={durationMin}
              onChange={(e) => setDurationMin(Number(e.target.value))}
              className="w-full h-2 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-brand"
            />
          </div>

          <div>
            <label className="flex justify-between items-end mb-4">
              <span className="text-xs font-semibold uppercase tracking-widest text-neutral-400">RPE (1 to 10 scale)</span>
              <span className={`font-mono text-sm font-bold ${rpeData.color}`}>Score: {rpe}</span>
            </label>
            <input 
              type="range" 
              min="1" 
              max="10" 
              step="1"
              value={rpe}
              onChange={(e) => setRpe(Number(e.target.value))}
              className="w-full h-2 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-brand"
            />
            <div className="mt-4 flex justify-between items-center bg-black/40 rounded p-3 pt-2">
              <div>
                <div className="text-[10px] text-neutral-500 uppercase tracking-wider mb-1">Effort Zone</div>
                <div className={`text-sm font-semibold ${rpeData.color}`}>{rpeData.label}</div>
              </div>
              <div className="text-right">
                <div className="text-[10px] text-neutral-500 uppercase tracking-wider mb-1">Estimated IF</div>
                <div className="text-white font-mono">{(rpeData.IF).toFixed(2)}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Output Configuration */}
      <div className="bg-neutral-950 border border-neutral-800 rounded-xl p-6 md:p-8 flex flex-col justify-center relative overflow-hidden shadow-2xl">
        {/* Dynamic Background Glow based on impact */}
        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 blur-[100px] rounded-full pointer-events-none opacity-20 ${impact.gauge > 50 ? (impact.gauge > 75 ? 'bg-red-500' : 'bg-orange-500') : 'bg-brand'}`}></div>
        
        <h2 className="text-sm font-bold text-neutral-500 mb-6 font-mono uppercase tracking-widest text-center">Estimated Stress Load</h2>
        
        <div className="text-6xl md:text-8xl font-bold font-mono text-center mb-8 bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-500 drop-shadow-md">
          {tss} <span className="text-2xl text-neutral-600 block sm:inline mt-2 sm:mt-0">rTSS</span>
        </div>
        
        <div className="border border-neutral-800/80 bg-black/60 rounded-xl p-5 w-full backdrop-blur-sm z-10 relative">
          <div className="flex justify-between items-end mb-3">
            <span className="text-xs text-neutral-400 uppercase tracking-widest">Recovery Runway</span>
            <span className={`text-xl font-bold ${impact.color}`}>{impact.hours}</span>
          </div>
          
          {/* Gauge Bar */}
          <div className="w-full h-1.5 bg-neutral-900 rounded-full overflow-hidden flex">
            <div 
              className={`h-full transition-all duration-500 ease-out ${
                impact.gauge <= 25 ? 'bg-slate-400' : impact.gauge <= 50 ? 'bg-brand' : impact.gauge <= 75 ? 'bg-orange-400' : 'bg-red-500'
              }`}
              style={{ width: `${impact.gauge}%` }}
            ></div>
          </div>
          <div className="text-[10px] text-neutral-500 uppercase tracking-widest mt-2">{impact.label}</div>
        </div>

        <div className="mt-8 z-10 relative flex justify-center">
          <p className="text-[10px] text-neutral-600 leading-relaxed max-w-sm text-center">
            *Disclaimer: This is an rTSS (Rate of Perceived Exertion) proxy. True physiological stress (hrTSS or TSS) requires absolute heart rate curve mapping or normalized power (NP).
          </p>
        </div>
      </div>
    </div>
  );
}
