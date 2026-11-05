'use client';

import { useState } from 'react';
import { formatDuration, nonNegative, runningResult } from '@/lib/calculators';

type CalcMode = 'pace' | 'time' | 'distance';
type DistUnit = 'km' | 'mi';

const PREDEFINED_DISTANCES = [
  { label: 'Custom', meters: 0 },
  { label: '5K', meters: 5000 },
  { label: '10K', meters: 10000 },
  { label: 'Half Marathon', meters: 21097.5 },
  { label: 'Marathon', meters: 42195 },
];

export default function CalculatorContainer() {
  const [activeTab, setActiveTab] = useState<'calculator' | 'converter'>('calculator');

  return (
    <div className="max-w-3xl mx-auto font-inter">
      {/* Tools Switcher */}
      <div className="flex space-x-4 mb-8 border-b border-neutral-800 pb-px justify-center md:justify-start">
        <button
          onClick={() => setActiveTab('calculator')}
          className={`pb-3 px-2 text-xs font-bold uppercase tracking-widest transition-all ${activeTab === 'calculator' ? 'text-brand border-b-2 border-brand' : 'text-neutral-500 hover:text-neutral-300'}`}
        >
          Race Calculator
        </button>
        <button
          onClick={() => setActiveTab('converter')}
          className={`pb-3 px-2 text-xs font-bold uppercase tracking-widest transition-all ${activeTab === 'converter' ? 'text-brand border-b-2 border-brand' : 'text-neutral-500 hover:text-neutral-300'}`}
        >
          Pace / Speed Converter
        </button>
      </div>

      {activeTab === 'calculator' ? <PaceCalculator /> : <PaceConverter />}
    </div>
  );
}

function PaceCalculator() {
  const [mode, setMode] = useState<CalcMode>('pace');
  
  const [distanceMeters, setDistanceMeters] = useState<number>(10000);
  const [timeSeconds, setTimeSeconds] = useState<number>(3000); // 50 mins
  const [paceSecondsPerKm, setPaceSecondsPerKm] = useState<number>(300); // 5:00/km
  
  const [distanceUnit, setDistanceUnit] = useState<DistUnit>('km');
  const [paceUnit, setPaceUnit] = useState<DistUnit>('km');
  const [selectedEvent, setSelectedEvent] = useState<number>(10000);

  // Formatting helpers
  const displayDistance = distanceUnit === 'km' ? distanceMeters / 1000 : distanceMeters / 1609.344;
  
  const handleDistanceChange = (val: number) => {
    setSelectedEvent(0);
    setDistanceMeters(nonNegative(distanceUnit === 'km' ? val * 1000 : val * 1609.344, 1000000));
  };

  const handleEventChange = (meters: number) => {
    setSelectedEvent(meters);
    if (meters > 0) {
      setDistanceMeters(meters);
      setDistanceUnit('km');
    }
  };

  const timeH = Math.floor(timeSeconds / 3600);
  const timeM = Math.floor((timeSeconds % 3600) / 60);
  const timeS = Math.floor(timeSeconds % 60);

  const handleTimeChange = (newH: number, newM: number, newS: number) => {
    setTimeSeconds(nonNegative(Math.floor(newH), 168) * 3600 + nonNegative(Math.floor(newM), 59) * 60 + nonNegative(Math.floor(newS), 59));
  };

  const currentPaceForUnit = paceUnit === 'km' ? paceSecondsPerKm : paceSecondsPerKm * 1.609344;
  const pm = Math.floor(currentPaceForUnit / 60);
  const ps = Math.floor(currentPaceForUnit % 60);

  const handlePaceChange = (newM: number, newS: number) => {
    const totalS = nonNegative(Math.floor(newM), 120) * 60 + nonNegative(Math.floor(newS), 59);
    setPaceSecondsPerKm(paceUnit === 'km' ? totalS : totalS / 1.609344);
  };

  const result = runningResult(mode, distanceMeters, timeSeconds, paceSecondsPerKm);
  const outPaceS = mode === 'pace' ? result : null;
  const outTimeS = mode === 'time' ? result : null;
  const outDistM = mode === 'distance' ? result : null;
  const formatPaceStr = (seconds: number | null) => seconds === null ? '—' : formatDuration(seconds);
  const formatTimeStr = (seconds: number | null) => seconds === null ? '—' : formatDuration(seconds, true);

  // Render Inputs
  const renderDistanceInput = () => (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-2">
        <label className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">Total Distance</label>
        <select 
          value={selectedEvent} 
          onChange={(e) => handleEventChange(Number(e.target.value))}
          className="bg-neutral-900 border border-neutral-800 rounded px-2 py-1 text-[10px] text-brand outline-none focus:border-brand cursor-pointer"
        >
          {PREDEFINED_DISTANCES.map(d => <option key={d.meters} value={d.meters}>{d.label}</option>)}
        </select>
      </div>
      <div className="flex items-center gap-2">
        <input 
          type="number" min="0" aria-label="Distance"
          value={displayDistance === 0 ? '' : Number(parseFloat(displayDistance.toFixed(4)))}
          onChange={(e) => handleDistanceChange(Number(e.target.value))}
          placeholder="0.00"
          className="flex-1 bg-black border border-neutral-800 rounded-lg px-4 h-12 text-white font-mono text-lg focus:border-brand outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
        />
        <select 
          value={distanceUnit} 
          onChange={(e) => setDistanceUnit(e.target.value as DistUnit)}
          className="w-20 bg-black border border-neutral-800 rounded-lg h-12 text-center text-neutral-400 font-mono text-sm outline-none focus:border-brand cursor-pointer"
        >
          <option value="km">km</option>
          <option value="mi">mi</option>
        </select>
      </div>
    </div>
  );

  const renderTimeInput = () => (
    <div className="mb-6">
      <label className="block text-[10px] font-bold uppercase tracking-widest mb-2 text-neutral-400">Finish Time</label>
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <input type="number" min="0" aria-label="Time hours" value={timeH === 0 ? '' : timeH} placeholder="0" onChange={e => handleTimeChange(Number(e.target.value), timeM, timeS)} className="w-full bg-black border border-neutral-800 rounded-lg text-center h-12 text-white font-mono text-lg focus:border-brand outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" />
          <span className="absolute right-3 top-3.5 text-xs text-neutral-500 font-mono">h</span>
        </div>
        <span className="text-neutral-600 font-bold">:</span>
        <div className="relative flex-1">
          <input type="number" min="0" aria-label="Time minutes" value={timeM === 0 ? '' : timeM} placeholder="0" onChange={e => handleTimeChange(timeH, Number(e.target.value), timeS)} className="w-full bg-black border border-neutral-800 rounded-lg text-center h-12 text-white font-mono text-lg focus:border-brand outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" />
          <span className="absolute right-3 top-3.5 text-xs text-neutral-500 font-mono">m</span>
        </div>
        <span className="text-neutral-600 font-bold">:</span>
        <div className="relative flex-1">
          <input type="number" min="0" aria-label="Time seconds" value={timeS === 0 ? '' : timeS} placeholder="0" onChange={e => handleTimeChange(timeH, timeM, Number(e.target.value))} className="w-full bg-black border border-neutral-800 rounded-lg text-center h-12 text-white font-mono text-lg focus:border-brand outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" />
          <span className="absolute right-3 top-3.5 text-xs text-neutral-500 font-mono">s</span>
        </div>
      </div>
    </div>
  );

  const renderPaceInput = () => (
    <div className="mb-6">
      <label className="block text-[10px] font-bold uppercase tracking-widest mb-2 text-neutral-400">Average Pace</label>
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <input type="number" min="0" aria-label="Pace minutes" value={pm === 0 ? '' : pm} placeholder="0" onChange={e => handlePaceChange(Number(e.target.value), ps)} className="w-full bg-black border border-neutral-800 rounded-lg text-center h-12 text-white font-mono text-lg focus:border-brand outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" />
          <span className="absolute right-3 top-3.5 text-xs text-neutral-500 font-mono">m</span>
        </div>
        <span className="text-neutral-600 font-bold">:</span>
        <div className="relative flex-1">
          <input type="number" min="0" aria-label="Pace seconds" value={ps === 0 ? '' : ps} placeholder="0" onChange={e => handlePaceChange(pm, Number(e.target.value))} className="w-full bg-black border border-neutral-800 rounded-lg text-center h-12 text-white font-mono text-lg focus:border-brand outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" />
          <span className="absolute right-3 top-3.5 text-xs text-neutral-500 font-mono">s</span>
        </div>
        <span className="text-neutral-600 px-1 font-mono">/</span>
        <select 
          value={paceUnit} 
          onChange={(e) => setPaceUnit(e.target.value as DistUnit)}
          className="w-20 bg-black border border-neutral-800 rounded-lg h-12 text-center text-neutral-400 font-mono text-sm outline-none focus:border-brand cursor-pointer"
        >
          <option value="km">km</option>
          <option value="mi">mi</option>
        </select>
      </div>
    </div>
  );

  return (
    <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 shadow-2xl relative overflow-hidden">
      {result === null && <p role="status" className="text-sm text-amber-300 mb-4">Enter positive values for both inputs to calculate a result.</p>}
      {/* Mode Selector */}
      <div className="mb-8 bg-black/40 p-1.5 rounded-xl border border-neutral-800 flex">
        {(['pace', 'time', 'distance'] as CalcMode[]).map(m => (
          <button
            key={m}
            onClick={() => setMode(m)}
            className={`flex-1 py-2 text-[10px] font-bold uppercase tracking-widest rounded-lg transition-all ${mode === m ? 'bg-brand text-black shadow-[0_0_15px_rgba(var(--brand-rgb),0.4)]' : 'text-neutral-500 hover:text-neutral-300'}`}
          >
            Calculate {m}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Input Section */}
        <div className="flex flex-col justify-center">
          {mode !== 'distance' && renderDistanceInput()}
          {mode !== 'time' && renderTimeInput()}
          {mode !== 'pace' && renderPaceInput()}
        </div>

        {/* Output Section */}
        <div className="flex flex-col justify-center bg-black/60 border border-brand/30 rounded-xl p-8 relative overflow-hidden group min-h-[200px]">
          <div className="absolute top-0 left-0 w-1 h-full bg-brand"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-brand/10 blur-[50px] rounded-full pointer-events-none group-hover:bg-brand/20 transition-all"></div>
          
          <div className="relative z-10 text-center md:text-left">
            {mode === 'pace' && (
              <>
                <span className="text-[10px] font-bold uppercase tracking-widest text-brand mb-2 block">Required Pace</span>
                <div className="text-5xl font-bold font-mono text-white mb-2 tracking-tighter">
                  {formatPaceStr(outPaceS)} <span className="text-lg text-neutral-500">/km</span>
                </div>
                <div className="text-xl font-mono text-neutral-400">
                  {formatPaceStr(outPaceS === null ? null : outPaceS * 1.609344)} <span className="text-sm text-neutral-600">/mi</span>
                </div>
              </>
            )}

            {mode === 'time' && (
              <>
                <span className="text-[10px] font-bold uppercase tracking-widest text-brand mb-2 block">Estimated Finish Time</span>
                <div className="text-5xl font-bold font-mono text-white tracking-tighter">
                  {formatTimeStr(outTimeS)}
                </div>
              </>
            )}

            {mode === 'distance' && (
              <>
                <span className="text-[10px] font-bold uppercase tracking-widest text-brand mb-2 block">Total Distance</span>
                <div className="text-5xl font-bold font-mono text-white mb-2 tracking-tighter">
                  {outDistM === null ? '—' : (outDistM / 1000).toFixed(2)} <span className="text-lg text-neutral-500">km</span>
                </div>
                <div className="text-xl font-mono text-neutral-400">
                  {outDistM === null ? '—' : (outDistM / 1609.344).toFixed(2)} <span className="text-sm text-neutral-600">mi</span>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function PaceConverter() {
  const [paceM, setPaceM] = useState<number>(5);
  const [paceS, setPaceS] = useState<number>(0);
  const [paceUnit, setPaceUnit] = useState<DistUnit>('km');

  const totalSec = (paceM * 60) + paceS;
  const secPerKm = paceUnit === 'km' ? totalSec : totalSec / 1.609344;
  const secPerMi = paceUnit === 'mi' ? totalSec : totalSec * 1.609344;
  
  const kmh = secPerKm > 0 ? 3600 / secPerKm : 0;
  const mph = secPerMi > 0 ? 3600 / secPerMi : 0;

  const formatPace = (seconds: number) => seconds > 0 ? formatDuration(seconds) : '—';

  return (
    <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 md:p-10 shadow-2xl">
      <div className="max-w-md mx-auto mb-10">
        <label className="block text-[10px] font-bold uppercase tracking-widest mb-3 text-brand text-center">
          Input Pace
        </label>
        <div className="flex items-center gap-3">
          <div className="relative flex-1">
            <input type="number" min="0" aria-label="Converter pace minutes" value={paceM === 0 ? '' : paceM} placeholder="0" onChange={e => setPaceM(nonNegative(Math.floor(Number(e.target.value)), 120))} className="w-full bg-black border border-neutral-800 rounded-xl text-center h-16 text-white font-mono text-2xl focus:border-brand outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none transition-all focus:shadow-[0_0_20px_rgba(var(--brand-rgb),0.1)]" />
            <span className="absolute right-4 top-5 text-sm text-neutral-500 font-mono">m</span>
          </div>
          <span className="text-neutral-600 font-bold text-2xl">:</span>
          <div className="relative flex-1">
            <input type="number" min="0" aria-label="Converter pace seconds" value={paceS === 0 ? '' : paceS} placeholder="0" onChange={e => setPaceS(nonNegative(Math.floor(Number(e.target.value)), 59))} className="w-full bg-black border border-neutral-800 rounded-xl text-center h-16 text-white font-mono text-2xl focus:border-brand outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none transition-all focus:shadow-[0_0_20px_rgba(var(--brand-rgb),0.1)]" />
            <span className="absolute right-4 top-5 text-sm text-neutral-500 font-mono">s</span>
          </div>
          <span className="text-neutral-600 px-2 font-mono text-xl">/</span>
          <select 
            value={paceUnit} 
            onChange={(e) => setPaceUnit(e.target.value as DistUnit)}
            className="w-28 bg-black border border-neutral-800 rounded-xl h-16 text-center text-brand font-mono text-xl outline-none focus:border-brand cursor-pointer"
          >
            <option value="km">km</option>
            <option value="mi">mi</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 border-t border-neutral-800 pt-8">
        <div className="flex flex-col items-center justify-center p-6 bg-black/40 rounded-xl border border-neutral-800/50">
           <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-500 mb-2 text-center">Pace / km</span>
           <div className="text-2xl font-bold font-mono text-white">{formatPace(secPerKm)}</div>
        </div>
        <div className="flex flex-col items-center justify-center p-6 bg-black/40 rounded-xl border border-neutral-800/50">
           <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-500 mb-2 text-center">Pace / mi</span>
           <div className="text-2xl font-bold font-mono text-white">{formatPace(secPerMi)}</div>
        </div>
        <div className="flex flex-col items-center justify-center p-6 bg-black/40 rounded-xl border border-neutral-800/50">
           <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-500 mb-2 text-center">km/h</span>
           <div className="text-2xl font-bold font-mono text-white">{totalSec > 0 ? kmh.toFixed(2) : '—'}</div>
        </div>
        <div className="flex flex-col items-center justify-center p-6 bg-black/40 rounded-xl border border-neutral-800/50">
           <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-500 mb-2 text-center">mph</span>
           <div className="text-2xl font-bold font-mono text-white">{totalSec > 0 ? mph.toFixed(2) : '—'}</div>
        </div>
      </div>
    </div>
  );
}
