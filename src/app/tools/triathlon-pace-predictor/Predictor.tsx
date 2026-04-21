'use client';

import { useState } from 'react';

type DistanceMode = 'sprint' | 'olympic' | 'half' | 'full';

const DISTANCES = {
  sprint: { swim: 750, bike: 20, run: 5, label: 'Sprint' },
  olympic: { swim: 1500, bike: 40, run: 10, label: 'Olympic' },
  half: { swim: 1900, bike: 90, run: 21.1, label: '70.3 (Half)' },
  full: { swim: 3800, bike: 180, run: 42.2, label: '140.6 (Full)' },
};

function parseTimeToSec(str: string): number {
  if (!str) return 0;
  const parts = str.split(':').map(Number);
  if (parts.length === 2 && !isNaN(parts[0]) && !isNaN(parts[1])) {
    return parts[0] * 60 + parts[1];
  }
  return 0;
}

function formatSecToTime(totalSec: number): string {
  if (totalSec <= 0) return '--:--';
  const h = Math.floor(totalSec / 3600);
  const m = Math.floor((totalSec % 3600) / 60);
  const s = Math.floor(totalSec % 60);
  if (h > 0) {
    return `${h}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  }
  return `${m}:${s.toString().padStart(2, '0')}`;
}

export default function Predictor() {
  const [distance, setDistance] = useState<DistanceMode>('olympic');
  const [swimCSS, setSwimCSS] = useState('01:40');
  const [bikeFtp, setBikeFtp] = useState('220'); 
  const [weight, setWeight] = useState('75');
  const [run5k, setRun5k] = useState('25:00');

  const calculate = () => {
    const cssSec = parseTimeToSec(swimCSS);
    const ftp = parseFloat(bikeFtp) || 200;
    const kg = parseFloat(weight) || 75;
    const wkg = ftp / kg;
    const r5kSec = parseTimeToSec(run5k);
    const dist = DISTANCES[distance];

    const factors = {
      // swim: pace degradation factor
      // bike: Intensity Factor (IF) % of FTP
      // run: fatigue multiplier over standalone Riegel prediction
      sprint: { swim: 1.02, bike: 0.95, run: 1.02, t1: 150, t2: 90 },
      olympic: { swim: 1.05, bike: 0.85, run: 1.05, t1: 210, t2: 120 },
      half: { swim: 1.08, bike: 0.80, run: 1.08, t1: 240, t2: 180 },
      full: { swim: 1.15, bike: 0.70, run: 1.12, t1: 360, t2: 240 },
    };
    
    const f = factors[distance];

    // Swim prediction: CSS pace degraded by distance factor
    const swimPaceSec = (cssSec * f.swim);
    const swimTime = (swimPaceSec / 100) * dist.swim;

    // Bike prediction: Non-linear watts to speed approximation
    // Uses cubic root relation for aerodynamic drag on a flat TT setup
    const targetWatts = ftp * f.bike;
    // Base speed on TT block: roughly 40km/h at 296W. Math.cbrt(296) * 6.012 ~= 40
    const actualBikeSpeed = Math.cbrt(targetWatts) * 6.1; 
    const bikeTime = (dist.bike / actualBikeSpeed) * 3600;

    // Run prediction: Riegel formula for distance scaling, then tri-fatigue factor
    // Riegel: T2 = T1 * (D2/D1)^1.06
    const standaloneRunTime = r5kSec * Math.pow(dist.run / 5, 1.06);
    const runTime = standaloneRunTime * f.run;
    const rPacePerKmSec = runTime / dist.run;
    
    // Total
    const totalTime = swimTime + bikeTime + runTime + f.t1 + f.t2;

    return {
      swimTime: formatSecToTime(swimTime),
      swimPace: formatSecToTime(swimPaceSec) + " /100m",
      t1Time: formatSecToTime(f.t1),
      bikeTime: formatSecToTime(bikeTime),
      bikePace: actualBikeSpeed.toFixed(1) + " km/h",
      t2Time: formatSecToTime(f.t2),
      runTime: formatSecToTime(runTime),
      runPace: formatSecToTime(rPacePerKmSec) + " /km",
      total: formatSecToTime(totalTime)
    };
  };

  const results = calculate();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      {/* Inputs Configuration */}
      <div className="lg:col-span-5 bg-neutral-900 border border-neutral-800 rounded-2xl p-6 md:p-8 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand/50 to-transparent"></div>
        <h2 className="text-xl font-bold text-white mb-6 font-montserrat tracking-wide">Athletic Baselines</h2>
        
        <div className="space-y-6">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-widest text-neutral-400 mb-3">Event Distance</label>
            <div className="grid grid-cols-2 gap-2">
              {Object.entries(DISTANCES).map(([key, val]) => (
                <button
                  key={key}
                  onClick={() => setDistance(key as DistanceMode)}
                  className={`py-3 px-3 text-sm rounded-lg border font-medium transition-all ${
                    distance === key
                      ? 'bg-brand/10 text-brand border-brand/50 shadow-[0_0_15px_rgba(235,255,5,0.1)]'
                      : 'bg-neutral-950 text-neutral-400 border-neutral-800/80 hover:border-neutral-600'
                  }`}
                >
                  {val.label}
                </button>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-neutral-800/50">
            <label className="block text-xs font-semibold uppercase tracking-widest text-neutral-400 mb-2">Swim CSS (MM:SS per 100m)</label>
            <input 
              type="text" 
              value={swimCSS}
              onChange={(e) => setSwimCSS(e.target.value)}
              placeholder="01:40"
              className="w-full bg-black border border-neutral-800 rounded-lg px-4 py-3 text-white font-mono placeholder:text-neutral-600 focus:border-brand focus:ring-1 focus:ring-brand focus:outline-none transition-shadow"
            />
            <p className="text-[10px] text-neutral-500 mt-2">Critical Swim Speed (Threshold Pace).</p>
          </div>

          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-xs font-semibold uppercase tracking-widest text-neutral-400 mb-2">Bike FTP (Watts)</label>
              <input 
                type="number" 
                value={bikeFtp}
                onChange={(e) => setBikeFtp(e.target.value)}
                placeholder="220"
                className="w-full bg-black border border-neutral-800 rounded-lg px-4 py-3 text-white font-mono placeholder:text-neutral-600 focus:border-brand focus:ring-1 focus:ring-brand focus:outline-none transition-shadow"
              />
            </div>
            <div className="flex-1">
              <label className="block text-xs font-semibold uppercase tracking-widest text-neutral-400 mb-2">Weight (kg)</label>
              <input 
                type="number" 
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                placeholder="75"
                className="w-full bg-black border border-neutral-800 rounded-lg px-4 py-3 text-white font-mono placeholder:text-neutral-600 focus:border-brand focus:ring-1 focus:ring-brand focus:outline-none transition-shadow"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-widest text-neutral-400 mb-2">Run 5k Base (MM:SS)</label>
            <input 
              type="text" 
              value={run5k}
              onChange={(e) => setRun5k(e.target.value)}
              placeholder="25:00"
              className="w-full bg-black border border-neutral-800 rounded-lg px-4 py-3 text-white font-mono placeholder:text-neutral-600 focus:border-brand focus:ring-1 focus:ring-brand focus:outline-none transition-shadow"
            />
          </div>
        </div>
      </div>

      {/* Output Configuration */}
      <div className="lg:col-span-7 bg-neutral-950 border border-neutral-800 rounded-2xl p-6 md:p-10 flex flex-col justify-center relative overflow-hidden shadow-2xl">
        <div className="absolute right-0 bottom-0 w-64 h-64 bg-brand/5 blur-[120px] rounded-full pointer-events-none"></div>
        
        <h2 className="text-sm font-bold text-brand mb-2 font-mono uppercase tracking-widest">Calculated Projection</h2>
        <div className="text-5xl md:text-7xl font-bold text-white font-mono tracking-tight mb-8 drop-shadow-lg">
          {results.total}
        </div>

        <div className="bg-black/50 border border-neutral-800 rounded-xl p-4 md:p-6 space-y-5 flex-grow">
          {/* Output Row */}
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
            <span className="text-neutral-400 font-medium">Swim <span className="text-neutral-600 text-sm">({DISTANCES[distance].swim}m)</span></span>
            <div className="flex flex-col sm:items-end mt-1 sm:mt-0">
              <span className="text-white font-mono text-xl">{results.swimTime}</span>
              <span className="text-brand/80 font-mono text-xs mt-0.5">{results.swimPace}</span>
            </div>
          </div>
          
          <div className="flex justify-between items-center sm:pl-8 text-neutral-500 font-mono text-xs">
            <span>T1 Transition</span>
            <span>{results.t1Time}</span>
          </div>

          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center pt-2 border-t border-neutral-800">
            <span className="text-neutral-400 font-medium">Bike <span className="text-neutral-600 text-sm">({DISTANCES[distance].bike}km)</span></span>
            <div className="flex flex-col sm:items-end mt-1 sm:mt-0">
              <span className="text-white font-mono text-xl">{results.bikeTime}</span>
              <span className="text-brand/80 font-mono text-xs mt-0.5">{results.bikePace}</span>
            </div>
          </div>

          <div className="flex justify-between items-center sm:pl-8 text-neutral-500 font-mono text-xs">
            <span>T2 Transition</span>
            <span>{results.t2Time}</span>
          </div>

          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center pt-2 border-t border-neutral-800">
            <span className="text-neutral-400 font-medium">Run <span className="text-neutral-600 text-sm">({DISTANCES[distance].run}km)</span></span>
            <div className="flex flex-col sm:items-end mt-1 sm:mt-0">
              <span className="text-white font-mono text-xl">{results.runTime}</span>
              <span className="text-brand/80 font-mono text-xs mt-0.5">{results.runPace}</span>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-neutral-800/50">
          <p className="text-xs text-neutral-500 leading-relaxed max-w-lg">
            Calculations apply dynamic fatigue degradation to your baseline assuming optimal pacing and nutrition. Actual results can vary wildly due to elevation, weather, and training execution.
          </p>
        </div>
      </div>
    </div>
  );
}
