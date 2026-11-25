// Pure normalization: no network, storage, analytics or browser state.
export type Raw = Record<string, unknown>;
export type Source = 'Manual' | 'PM5' | 'GPS estimate';
export type Measure = { value: number; source: Source };
export type Split = {
  index: number; phase: number; station: number; round: number | null; name: string;
  label: string; seconds: number; elapsed: number; start: number | null;
  hr: number | null; maxHr: number | null; target: number | null; unit: number;
  weight: number | null; runMetres: number | null; metres: Measure | null;
  count: Measure | null; watts: number | null; ergPace: number | null;
  gpsPace: number | null; targetPace: number | null;
};
export type StationSummary = {
  name: string; station: number; laps: number; seconds: number; hr: number | null;
  metres: { value: number; coverage: number; sources: Source[] };
  count: { value: number; coverage: number; sources: Source[] };
  countUnit: string; weights: number[]; weightedLaps: number;
  watts: number[]; ergPaces: number[]; distanceVolume: number; repVolume: number;
  distanceVolumeCoverage: number; repVolumeCoverage: number;
};
export type Analysis = {
  title: string; date: string | null; recognized: boolean; warnings: string[];
  totalSeconds: number; workoutSeconds: number; elapsedSeconds: number;
  nativeMetres: number | null; nativeHr: number | null; calories: number | null;
  phases: { phase: number; name: string; seconds: number; hr: number | null; laps: number }[];
  splits: Split[]; stations: StationSummary[];
  pace: { seconds: number; source: 'GPS' | 'Target'; coverage: number; total: number; drift: number | null } | null;
  records: { time: number; hr: number | null; phase: number | null }[];
};

const STATIONS = ['', 'SkiErg', 'Sled Push', 'Sled Pull', 'Burpee Broad Jump', 'RowErg', 'Farmers Carry', 'Sandbag Lunges', 'Wall Balls', 'Custom station'];
export const PHASES = ['Activity', 'Run', 'Station', 'Roxzone', 'Rest', 'Warmup'];
export const PHASE_COLORS = ['#94a3b8', '#16edb9', '#a78bfa', '#fbbf24', '#94a3b8', '#38bdf8'];
const IDENTITIES = ['5d680cdcea104211b25568aa60065d6e', '9a829a1003e94e8ebf293998e96ae04e'];
const FIELD_NAMES: Record<number, string> = {
  0:'rh_segment_type', 1:'rh_segment_index', 2:'rh_station_id', 3:'rh_round_index',
  4:'rh_target_value', 5:'rh_target_unit', 6:'rh_run_distance_m', 7:'rh_distance_source',
  10:'rh_target_weight_kg', 15:'rh_station_source', 16:'rh_station_distance_m',
  17:'rh_station_count', 18:'rh_station_power_w', 19:'rh_station_pace_500_s',
  20:'rh_station_count_source', 27:'rh_stage_label', 28:'rh_workout_name', 29:'rh_division',
};
const SOURCES: Record<number, Source> = {1:'Manual', 2:'PM5', 4:'GPS estimate'};
function object(value: unknown): Raw { return value && typeof value === 'object' ? value as Raw : {}; }
function array(value: unknown): Raw[] { return Array.isArray(value) ? value.map(object) : []; }
function num(value: unknown, max = Number.MAX_SAFE_INTEGER): number | null {
  return typeof value === 'number' && Number.isFinite(value) && value >= 0 && value < max ? value : null;
}
function text(value: unknown): string { return typeof value === 'string' ? value.replace(/[\u0000 ]+$/g, '').slice(0, 500) : ''; }
function epoch(value: unknown): number | null {
  if (value instanceof Date && Number.isFinite(value.getTime())) return value.getTime() / 1000;
  return null;
}
function id(value: unknown): string {
  return (Array.isArray(value) || ArrayBuffer.isView(value)) ? Array.from(value as number[]).map(n => n.toString(16).padStart(2, '0')).join('') : '';
}
export function brandedTitle(name: string): string {
  const clean = name.replace(/^Resiliento(?:\s*[-·:]\s*|\s+Hybrid\s*)/i, '').trim();
  return `Resiliento - ${clean || 'Hybrid workout'}`;
}
export function duration(seconds: number): string {
  const s = Math.max(0, Math.round(seconds));
  return s >= 3600 ? `${Math.floor(s/3600)}:${String(Math.floor(s/60)%60).padStart(2,'0')}:${String(s%60).padStart(2,'0')}` : `${Math.floor(s/60)}:${String(s%60).padStart(2,'0')}`;
}
export function paceFor(seconds: number, metres: number | null): number | null {
  if (seconds < 10 || metres === null || metres < 30) return null;
  const pace = seconds * 1000 / metres;
  return pace >= 90 && pace <= 1800 ? pace : null;
}
export function countUnit(station: number): string { return [1,5].includes(station) ? 'strokes' : station === 6 ? 'steps' : 'reps'; }
function weightedHr(splits: Split[]): number | null {
  const valid = splits.filter(s => s.hr !== null && s.seconds > 0);
  const time = valid.reduce((t,s) => t+s.seconds,0);
  return time ? Math.round(valid.reduce((t,s) => t+s.seconds*s.hr!,0)/time) : null;
}
function aggregate(splits: Split[]): StationSummary[] {
  const groups = new Map<string, Split[]>();
  for (const s of splits.filter(s => s.phase === 2)) {
    const key = s.station === 9 ? `${s.station}:${s.name}:${s.unit}` : String(s.station);
    groups.set(key, [...(groups.get(key) || []), s]);
  }
  return [...groups.values()].map(laps => {
    const totals = (key: 'metres'|'count') => ({value:laps.reduce((t,s) => t+(s[key]?.value ?? 0),0), coverage:laps.filter(s=>s[key]!==null).length, sources:[...new Set(laps.flatMap(s=>s[key] ? [s[key]!.source] : []))]});
    const dist = laps.filter(s => s.metres !== null && s.weight !== null);
    const reps = laps.filter(s => s.count !== null && s.weight !== null && ![1,5,6].includes(s.station));
    return {name:laps[0].name,station:laps[0].station,laps:laps.length,seconds:laps.reduce((t,s)=>t+s.seconds,0),hr:weightedHr(laps),
      metres:totals('metres'),count:totals('count'),countUnit:countUnit(laps[0].station),
      weights:[...new Set(laps.flatMap(s=>s.weight===null?[]:[s.weight]))].sort((a,b)=>a-b),weightedLaps:laps.filter(s=>s.weight!==null).length,
      watts:laps.flatMap(s=>s.watts===null?[]:[s.watts]),ergPaces:laps.flatMap(s=>s.ergPace===null?[]:[s.ergPace]),
      distanceVolume:dist.reduce((t,s)=>t+s.metres!.value*s.weight!*(s.station===6?2:1),0), repVolume:reps.reduce((t,s)=>t+s.count!.value*s.weight!,0),
      distanceVolumeCoverage:dist.length,repVolumeCoverage:reps.length};
  });
}

/** Descriptor keys are decoder indices, not FIT field numbers. */
export function analyzeMessages(messages: Raw): Analysis {
  const sessions = array(messages.sessionMesgs);
  if (sessions.length !== 1) throw new Error('Choose a FIT file containing one saved activity. Multisport files are not supported yet.');
  const session = sessions[0];
  const nativeLaps = array(messages.lapMesgs);
  const declared = num(session.numLaps,65535);
  if (declared !== null && declared !== nativeLaps.length) throw new Error('The FIT file has an incomplete lap list. Export the original activity again.');
  const devs = array(messages.developerDataIdMesgs);
  const trusted = new Set<number>(); const simulator = new Set<number>();
  for (const dev of devs) {
    const appId = id(dev.applicationId); const index = num(dev.developerDataIndex,255);
    if (index !== null && IDENTITIES.includes(appId)) trusted.add(index);
    if (index !== null && /^0{32}$/.test(appId)) simulator.add(index);
  }
  const descriptions = array(messages.fieldDescriptionMesgs);
  // Zero-ID sideload/simulator files are accepted only with the core Resiliento schema.
  for (const index of simulator) {
    if ([0,2,5].every(field => descriptions.some(d=>d.developerDataIndex===index && d.nativeMesgNum===19 && d.fieldDefinitionNumber===field && text(d.fieldName)===FIELD_NAMES[field]))) trusted.add(index);
  }
  const maps = new Map<number, Map<number,string>>();
  for (const d of descriptions) {
    const field = num(d.fieldDefinitionNumber,256); const native = num(d.nativeMesgNum,65535);
    if (field===null || native===null || !trusted.has(d.developerDataIndex as number) || text(d.fieldName)!==FIELD_NAMES[field] || d.key===undefined) continue;
    const map = maps.get(native) || new Map<number,string>();
    map.set(field,String(d.key)); maps.set(native,map);
  }
  const get = (msg: Raw, native: number, field: number): unknown => {
    const key = maps.get(native)?.get(field); return key===undefined ? undefined : object(msg.developerFields)[key];
  };
  const recognized = nativeLaps.some(l => (num(get(l,19,0),6)??0)>0);
  const warnings: string[] = [];
  if (!recognized) warnings.push('No verified Resiliento stage fields found. This report shows native FIT laps; station targets and exercise results cannot be inferred.');
  if (recognized && [...simulator].some(i=>trusted.has(i))) warnings.push('This file uses a sideload/simulator app ID. Resiliento fields were matched by their schema.');
  let offset = 0;
  let excludedWristCounts = 0;
  const splits: Split[] = nativeLaps.map((l,index) => {
    const n = (field: number, max=65535) => num(get(l,19,field),max);
    const phase = recognized ? n(0,6) ?? 0 : 0;
    const station = phase===2 ? n(2,10) ?? 0 : 0;
    const unit = n(5,4) ?? 0;
    const label = text(get(l,19,27));
    const name = phase===2 ? station===9 ? label.split(' · ')[0] || STATIONS[9] : STATIONS[station] || 'Station' : PHASES[phase];
    const seconds = num(l.totalTimerTime) ?? num(l.totalElapsedTime) ?? 0;
    const elapsed = num(l.totalElapsedTime) ?? seconds;
    const runMetres = phase===1 ? recognized ? n(7,2)===1 ? n(6,4294967295) : null : num(l.totalDistance) : null;
    const source = n(15,5) ?? 0; const countSource = n(20,4) ?? source;
    const erg = [1,5].includes(station);
    const supportsMetres = [1,2,3,4,5,6,7].includes(station) || (station===9 && unit===1);
    const supportsCount = [1,4,5,6,7,8].includes(station) || (station===9 && unit===2);
    const metresValue = n(16); const countValue = n(17);
    const metres = phase===2 && supportsMetres && metresValue!==null && (source===1 || (source===2 && erg) || (source===4 && [2,3,4,6,7].includes(station))) ? {value:metresValue,source:SOURCES[source]} : null;
    const count = phase===2 && supportsCount && countValue!==null && (countSource===1 || (countSource===2 && erg)) ? {value:countValue,source:SOURCES[countSource]} : null;
    if(phase===2 && countSource===3 && countValue!==null) excludedWristCounts++;
    const weightValue = n(10,301); const hr = num(l.avgHeartRate,255); const targetValue=n(4);
    const split: Split = {index:index+1,phase,station,round:n(3,255),name,label,seconds,elapsed,start:epoch(l.startTime),
      hr:hr && hr>=30 ? hr : null,maxHr:num(l.maxHeartRate,255),target:targetValue && unit ? targetValue : null,unit,
      weight:phase===2 && weightValue ? weightValue : null,runMetres,metres,count,watts:erg?n(18):null,ergPace:erg && (n(19)??0)>0?n(19):null,
      gpsPace:phase===1?paceFor(seconds,runMetres):null,targetPace:phase===1 && unit===1?paceFor(seconds,targetValue):null};
    offset += seconds;
    return split;
  });
  if(excludedWristCounts) warnings.push('Automatic wrist counts from this older recording were excluded because they are unreliable. Time, heart rate and other recorded measurements are retained.');
  const runs=splits.filter(s=>s.phase===1); const gps=runs.filter(s=>s.gpsPace!==null); const targets=runs.filter(s=>s.targetPace!==null);
  const eligible=gps.length?gps:targets; const source=gps.length?'GPS' as const:'Target' as const;
  const metres=eligible.reduce((t,s)=>t+(source==='GPS'?s.runMetres!:s.target!),0);
  const pace=metres?{seconds:eligible.reduce((t,s)=>t+s.seconds,0)*1000/metres,source,coverage:eligible.length,total:runs.length,
    drift:eligible.length>=2 ? (source==='GPS'?eligible.at(-1)!.gpsPace!:eligible.at(-1)!.targetPace!)-(source==='GPS'?eligible[0].gpsPace!:eligible[0].targetPace!) : null}:null;
  const phases=[0,1,2,3,4,5].flatMap(phase=>{
    const laps=splits.filter(s=>s.phase===phase);
    return laps.length?[{phase,name:PHASES[phase],seconds:laps.reduce((t,s)=>t+s.seconds,0),hr:weightedHr(laps),laps:laps.length}]:[];
  });
  const origin=epoch(session.startTime) ?? splits[0]?.start;
  const records=array(messages.recordMesgs).flatMap(r=>{
    const time=epoch(r.timestamp); const hr=num(r.heartRate,255);
    if(time===null || origin===null || origin===undefined || !hr || hr<30) return [];
    const split=splits.find(s=>s.start!==null && time>=s.start && time<s.start+s.elapsed);
    return [{time:time-origin,hr,phase:split?.phase??null}];
  });
  const context=text(get(session,18,28)) || text(session.sportProfileName);
  const fallback=recognized ? [...new Set(splits.filter(s=>![3,4,5].includes(s.phase)).map(s=>s.name))].join(' · ') : 'Workout';
  const nativeSeconds=num(session.totalTimerTime) ?? offset;
  if (recognized && splits.some(s=>s.phase===0)) warnings.push('Some laps have no stage classification. Their time remains visible as Activity.');
  return {title:brandedTitle(context||fallback),date:origin?new Date(origin*1000).toISOString():null,recognized,warnings,
    totalSeconds:nativeSeconds,workoutSeconds:recognized?splits.filter(s=>s.phase!==5).reduce((t,s)=>t+s.seconds,0):nativeSeconds,
    elapsedSeconds:num(session.totalElapsedTime)??nativeSeconds,nativeMetres:num(session.totalDistance),nativeHr:(num(session.avgHeartRate,255)??0)>=30?num(session.avgHeartRate,255):null,calories:num(session.totalCalories,65535),
    phases,splits,stations:aggregate(splits),pace,records};
}

export function stravaDescription(a: Analysis): string {
  const lines=[a.title,`Workout ${duration(a.workoutSeconds)}${a.phases.some(p=>p.phase===5)?' (warmup excluded)':''}`];
  for(const phase of a.phases) lines.push(`${phase.name}: ${duration(phase.seconds)}${phase.hr?` · ${phase.hr} bpm`:''}`);
  if(a.pace) lines.push(`Run pace: ${duration(a.pace.seconds)}/km · ${a.pace.source} · ${a.pace.coverage}/${a.pace.total} eligible runs`);
  for(const s of a.stations) {
    const actual=[];
    if(s.metres.coverage) actual.push(`${s.metres.value} m (${s.metres.coverage}/${s.laps}; ${s.metres.sources.join(', ')})`);
    if(s.count.coverage) actual.push(`${s.count.value} ${s.countUnit} (${s.count.coverage}/${s.laps}; ${s.count.sources.join(', ')})`);
    if(!s.metres.coverage&&!s.count.coverage) actual.push('actual result not recorded');
    if(s.weights.length) actual.push(`prescribed load ${s.station===6?'2 × ':''}${s.weights.join(' / ')} kg`);
    lines.push(`${s.name}: ${duration(s.seconds)} · ${actual.join(' · ')}`);
  }
  lines.push('Analyzed locally with Resiliento · resiliento.app/tools/fit-analyzer');
  return lines.join('\n');
}
