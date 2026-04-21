'use client';

import { useState } from 'react';

type DayPlan = { day: string; blocks: { type: 'run' | 'lift' | 'rest'; label: string; desc: string; time: string }[] };

export default function Builder() {
  const [runs, setRuns] = useState(3);
  const [lifts, setLifts] = useState(3);

  const generateSchedule = (): DayPlan[] => {
    const days: DayPlan[] = [
      { day: 'Monday', blocks: [] },
      { day: 'Tuesday', blocks: [] },
      { day: 'Wednesday', blocks: [] },
      { day: 'Thursday', blocks: [] },
      { day: 'Friday', blocks: [] },
      { day: 'Saturday', blocks: [] },
      { day: 'Sunday', blocks: [] },
    ];

    let rCount = runs;
    let lCount = lifts;

    const addSession = (dayIdx: number, type: 'run' | 'lift', label: string, desc: string, time: string) => {
      days[dayIdx].blocks.push({ type, label, desc, time });
    };

    // Sunday logic (Long Run)
    if (rCount > 0) { addSession(6, 'run', 'Long Endurance', 'Zone 2 aerobic base building.', 'AM'); rCount--; }
    
    // Lifting Logic
    if (lCount > 0) { addSession(0, 'lift', 'Heavy Lower Body', 'Squats & deadlifts (high systemic fatigue).', 'PM'); lCount--; }
    if (lCount > 0) { addSession(3, 'lift', 'Heavy Upper Body', 'Push/Pull routines.', 'PM'); lCount--; }
    if (lCount > 0) { addSession(5, 'lift', 'Full Body / Accessory', 'Functional or explosive focus.', 'AM'); lCount--; }
    if (lCount > 0) { addSession(2, 'lift', 'Upper Body Accessory', 'Hypertrophy secondary.', 'PM'); lCount--; }
    if (lCount > 0) { addSession(4, 'lift', 'Hyrox / Metcon', 'Heavy conditioning.', 'PM'); lCount--; }

    // Run Logic
    if (rCount > 0) { addSession(1, 'run', 'Speed / Intervals', 'Threshold or VO2 Max efforts.', 'AM'); rCount--; }
    if (rCount > 0) { addSession(3, 'run', 'Easy Aerobic Walk/Run', 'Recovery pace flush.', 'AM'); rCount--; }
    if (rCount > 0) { addSession(5, 'run', 'Tempo / Sweetspot', 'Moderate sustained intensity.', 'PM'); rCount--; }
    if (rCount > 0) { addSession(0, 'run', 'Shakeout Run', 'Very easy mechanical warmup.', 'AM'); rCount--; }
    
    // Sort and fill Rests
    days.forEach(d => {
      if (d.blocks.length === 0) {
        d.blocks.push({ type: 'rest', label: 'Active Recovery', desc: 'Mobility, gentle flow, or complete rest.', time: 'ALL DAY' });
      } else {
        // Sort so AM is before PM
        d.blocks.sort((a, b) => {
          if (a.time === 'AM' && b.time === 'PM') return -1;
          if (a.time === 'PM' && b.time === 'AM') return 1;
          return 0;
        });
      }
    });

    return days;
  };

  const schedule = generateSchedule();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      {/* Inputs Sidebar */}
      <div className="lg:col-span-4 bg-neutral-900 border border-neutral-800 rounded-2xl p-6 md:p-8 shadow-2xl relative self-start">
        <h2 className="text-xl font-bold text-white mb-8 font-montserrat tracking-wide">Macro Targets</h2>
        
        <div className="space-y-10">
          <div>
            <label className="flex justify-between items-end mb-4">
              <span className="text-xs font-semibold uppercase tracking-widest text-neutral-400">Run Frequency</span>
              <span className="text-blue-400 font-mono text-lg font-bold">{runs}x / wk</span>
            </label>
            <input 
              type="range" 
              min="1" 
              max="5" 
              step="1"
              value={runs}
              onChange={(e) => setRuns(Number(e.target.value))}
              className="w-full h-2 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
            />
          </div>

          <div>
            <label className="flex justify-between items-end mb-4">
              <span className="text-xs font-semibold uppercase tracking-widest text-neutral-400">Strength Frequency</span>
              <span className="text-orange-400 font-mono text-lg font-bold">{lifts}x / wk</span>
            </label>
            <input 
              type="range" 
              min="1" 
              max="5" 
              step="1"
              value={lifts}
              onChange={(e) => setLifts(Number(e.target.value))}
              className="w-full h-2 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-orange-500"
            />
          </div>
        </div>

        {/* Dynamic Summary Block */}
        <div className="mt-10 bg-black/50 border border-neutral-800 rounded-xl p-5">
          <div className="text-[10px] text-neutral-500 uppercase tracking-widest mb-3">Volume Analysis</div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-neutral-300">Total Sessions</span>
            <span className="text-white font-mono font-bold">{runs + lifts}</span>
          </div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-neutral-300">2-A-Day Required?</span>
            <span className={`font-mono text-xs font-bold px-2 py-0.5 rounded ${runs + lifts > 6 ? 'bg-red-500/20 text-red-400' : 'bg-green-500/20 text-green-400'}`}>
              {runs + lifts > 6 ? 'YES' : 'NO'}
            </span>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-neutral-800">
          <h3 className="text-xs font-bold uppercase tracking-widest text-neutral-500 mb-4">Interference Rules</h3>
          <ul className="text-[11px] text-neutral-400 space-y-3 list-none pl-0">
            <li className="flex items-start">
              <span className="text-brand mr-2">›</span>
              Endurance placed AM, Strength PM during doubles to maximize mTOR lifting adaptations.
            </li>
            <li className="flex items-start">
              <span className="text-brand mr-2">›</span>
              Hard run intervals buffered 24h away from heavy lower body lifts to avoid "dead legs".
            </li>
            <li className="flex items-start">
              <span className="text-brand mr-2">›</span>
              Long runs anchored to Sunday; Saturday acts as prep (or light volume).
            </li>
          </ul>
        </div>
      </div>

      {/* Output Schedule */}
      <div className="lg:col-span-8 bg-neutral-950 border border-neutral-800 rounded-2xl p-6 md:p-8 relative">
        <div className="absolute right-0 top-0 w-[400px] h-[400px] bg-brand/5 blur-[120px] rounded-full pointer-events-none"></div>

        <h2 className="text-sm font-bold text-neutral-500 mb-6 font-mono uppercase tracking-widest">Procedural Baseline</h2>
        
        <div className="space-y-4">
          {schedule.map((day) => (
            <div key={day.day} className="flex flex-col md:flex-row bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden shadow">
              <div className="md:w-32bg-neutral-950 md:border-r border-neutral-800 p-4 flex items-center bg-black/20">
                <span className="font-bold text-white font-montserrat uppercase tracking-wider text-sm">{day.day}</span>
              </div>
              <div className="flex-1 p-4 grid grid-cols-1 gap-3 relative z-10">
                {day.blocks.map((b, i) => (
                  <div key={i} className="flex flex-col sm:flex-row sm:items-center justify-between group pt-1 pb-1">
                    <div className="flex items-center">
                      <div className={`w-1 h-6 rounded-full mr-4 flex-shrink-0 ${b.type === 'run' ? 'bg-blue-500' : b.type === 'lift' ? 'bg-orange-500' : 'bg-neutral-600'}`}></div>
                      <div>
                        <div className="text-sm font-bold text-neutral-200">{b.label}</div>
                        <div className="text-xs text-neutral-500 mt-0.5 max-w-[280px] truncate">{b.desc}</div>
                      </div>
                    </div>
                    <div className="mt-2 sm:mt-0 pl-5 sm:pl-0">
                      <span className={`text-[10px] uppercase font-mono tracking-widest px-2 py-1 rounded ${b.type === 'run' ? 'bg-blue-900/30 text-blue-400' : b.type === 'lift' ? 'bg-orange-900/30 text-orange-400' : 'bg-neutral-800 text-neutral-400'}`}>
                        {b.time}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        
        <p className="text-[10px] text-neutral-600 mt-8 text-center px-4 leading-relaxed">
          *Disclaimer: This is a static macro-template minimizing interference. Proper concurrent training execution relies strictly on managing precise intensity zones and dynamic fatigue.
        </p>
      </div>
    </div>
  );
}
