'use client';

import { useState } from 'react';
import { parseMinutesSeconds, formatDuration, estimateBikeSpeed } from '@/lib/calculators';

type DistanceMode = 'sprint' | 'olympic' | 'half' | 'full';

const DISTANCES = {
  sprint: { swim: 750, bike: 20, run: 5, label: 'Sprint' },
  olympic: { swim: 1500, bike: 40, run: 10, label: 'Olympic' },
  half: { swim: 1900, bike: 90, run: 21.1, label: '70.3 (Half)' },
  full: { swim: 3800, bike: 180, run: 42.2, label: '140.6 (Full)' },
};

const parseTimeToSec = (value: string) => parseMinutesSeconds(value) ?? 0;
const isValidTime = (value: string) => parseMinutesSeconds(value) !== null;
const formatSecToTime = (seconds: number) => seconds > 0 ? formatDuration(seconds, true) : '--:--';

export default function Predictor() {
  const [distance, setDistance] = useState<DistanceMode>('olympic');
  const [swimCSS, setSwimCSS] = useState('01:40');
  const [bikeFtp, setBikeFtp] = useState('220'); 
  const [weight, setWeight] = useState('75');
  const [run5k, setRun5k] = useState('25:00');

  const swimValid = isValidTime(swimCSS);
  const run5kValid = isValidTime(run5k);
  const ftpValid = Number.isFinite(Number(bikeFtp)) && Number(bikeFtp) >= 50 && Number(bikeFtp) <= 600;
  const weightValid = Number.isFinite(Number(weight)) && Number(weight) >= 30 && Number(weight) <= 200;

  const calculate = () => {
    const cssSec = parseTimeToSec(swimCSS);
    const ftp = Number(bikeFtp);
    const kg = Number(weight);
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

    // Guard: prevent NaN/Infinity from bad inputs
    if (!swimValid || !run5kValid || !ftpValid || !weightValid) {
      return { swimTime: '--:--', swimPace: '--:-- /100m', t1Time: formatSecToTime(0), bikeTime: '--:--', bikePace: '-- km/h', t2Time: formatSecToTime(0), runTime: '--:--', runPace: '--:-- /km', total: '--:--:--' };
    }

    // Swim prediction: CSS pace degraded by distance factor
    const swimPaceSec = (cssSec * f.swim);
    const swimTime = (swimPaceSec / 100) * dist.swim;

    // Bike prediction: flat-course power balance with rolling resistance.
    const targetWatts = ftp * f.bike;
    const actualBikeSpeed = estimateBikeSpeed(targetWatts, kg);
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
              aria-label="Swim CSS minutes and seconds per 100 metres" value={swimCSS}
              onChange={(e) => setSwimCSS(e.target.value)}
              placeholder="01:40"
              className={`w-full bg-black border rounded-lg px-4 py-3 text-white font-mono placeholder:text-neutral-600 focus:ring-1 focus:outline-none transition-shadow ${swimValid ? 'border-neutral-800 focus:border-brand focus:ring-brand' : 'border-red-500/50 focus:border-red-500 focus:ring-red-500/30'}`}
            />
            <p className="text-[10px] text-neutral-500 mt-2">Critical Swim Speed (Threshold Pace).</p>
          </div>

          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-xs font-semibold uppercase tracking-widest text-neutral-400 mb-2">Bike FTP (Watts)</label>
              <input 
                type="number" 
                min={50} max={600} aria-label="Bike FTP in watts" value={bikeFtp}
                onChange={(e) => setBikeFtp(e.target.value)}
                placeholder="220"
                className={`w-full bg-black border rounded-lg px-4 py-3 text-white font-mono placeholder:text-neutral-600 focus:ring-1 focus:outline-none transition-shadow ${ftpValid ? 'border-neutral-800 focus:border-brand focus:ring-brand' : 'border-red-500/50 focus:border-red-500 focus:ring-red-500/30'}`}
              />
            </div>
            <div className="flex-1">
              <label className="block text-xs font-semibold uppercase tracking-widest text-neutral-400 mb-2">Weight (kg)</label>
              <input 
                type="number" 
                min={30} max={200} aria-label="Rider weight in kilograms" value={weight}
                onChange={(e) => setWeight(e.target.value)}
                placeholder="75"
                className={`w-full bg-black border rounded-lg px-4 py-3 text-white font-mono placeholder:text-neutral-600 focus:ring-1 focus:outline-none transition-shadow ${weightValid ? 'border-neutral-800 focus:border-brand focus:ring-brand' : 'border-red-500/50 focus:border-red-500 focus:ring-red-500/30'}`}
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-widest text-neutral-400 mb-2">Run 5k Base (MM:SS)</label>
            <input 
              type="text" 
              aria-label="5 km run time in minutes and seconds" value={run5k}
              onChange={(e) => setRun5k(e.target.value)}
              placeholder="25:00"
              className={`w-full bg-black border rounded-lg px-4 py-3 text-white font-mono placeholder:text-neutral-600 focus:ring-1 focus:outline-none transition-shadow ${run5kValid ? 'border-neutral-800 focus:border-brand focus:ring-brand' : 'border-red-500/50 focus:border-red-500 focus:ring-red-500/30'}`}
            />
          </div>
        </div>
      </div>

      {/* Output Configuration */}
      <div className="lg:col-span-7 bg-neutral-950 border border-neutral-800 rounded-2xl p-6 md:p-10 flex flex-col justify-center relative overflow-hidden shadow-2xl">
        <div className="absolute right-0 bottom-0 w-64 h-64 bg-brand/5 blur-[120px] rounded-full pointer-events-none"></div>
        
        {(!swimValid || !run5kValid || !ftpValid || !weightValid) && <p role="status" className="text-sm text-amber-300 mb-4">Enter times as MM:SS, FTP from 50–600 W and weight from 30–200 kg.</p>}
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
            Planning estimate, not a race prediction guarantee. Bike assumptions: flat road, no wind, TT position (CdA 0.25 m²), rolling coefficient 0.004, 9 kg bike/kit and 97% drivetrain efficiency. Swim/run fatigue factors are heuristics. Hills, position, weather and endurance preparation can materially change your time.
          </p>
        </div>
      </div>
    </div>
  );
}
