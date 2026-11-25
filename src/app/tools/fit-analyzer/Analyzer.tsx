'use client';

import { useEffect, useRef, useState } from 'react';
import { Upload, ShieldCheck, Activity, Check, X, Heart, Timer, Layers, Image as ImageIcon } from 'lucide-react';
import { brandedTitle, duration, PHASE_COLORS, stravaDescription, type Analysis, type Split, type StationSummary } from '@/lib/fit-analysis';
import { workoutCard } from '@/lib/fit-card';
import ShareWorkout from './ShareWorkout';
import { StationIcon } from '@/components/StationIcon';

const panel='rounded-2xl border border-white/10 bg-[#080c0b]';
const button='inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-white/20 px-5 py-3 text-sm font-semibold text-white transition hover:border-brand hover:text-brand focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand disabled:opacity-50';
type Tab='Overview'|'Stations'|'Splits'|'Share';

function save(blob:Blob,name:string) {
  const url=URL.createObjectURL(blob); const link=document.createElement('a');link.href=url;link.download=name;link.click();setTimeout(()=>URL.revokeObjectURL(url),10000);
}
const fileName=(title:string)=>title.replace(/[<>:"/\\|?*\u0000-\u001f]/g,'').slice(0,120)||'Resiliento-workout';
function Metric({label,value,detail}:{label:string;value:string;detail?:string}) {
  return <div className={`${panel} p-5 sm:p-6`}><p className="mb-3 text-sm text-slate-400">{label}</p><p className="text-3xl font-semibold tracking-tight tabular-nums sm:text-4xl">{value}</p>{detail&&<p className="mt-3 text-sm leading-relaxed text-slate-400">{detail}</p>}</div>;
}
function Result({s}:{s:Split}) {
  const lines=[];
  if(s.runMetres!==null) lines.push(`~${s.runMetres} m GPS`);
  if(s.metres) lines.push(`${s.metres.source.includes('estimate')?'~':''}${s.metres.value} m · ${s.metres.source}`);
  if(s.count) lines.push(`${s.count.source.includes('estimate')?'~':''}${s.count.value} ${[1,5].includes(s.station)?'strokes':s.station===6?'steps':'reps'} · ${s.count.source}`);
  if(s.watts!==null) lines.push(`${s.watts} W · PM5`);
  if(s.ergPace!==null) lines.push(`${duration(s.ergPace)}/500m · PM5`);
  return lines.length?<span>{lines.join(' · ')}</span>:<span className="text-slate-500">{s.phase===1||s.phase===2?'No actual result recorded':'Time and heart rate'}</span>;
}
function Station({s}:{s:StationSummary}) {
  const range=(values:number[],format=(n:number)=>String(n))=>{const lo=Math.min(...values),hi=Math.max(...values);return lo===hi?format(lo):`${format(lo)}–${format(hi)}`;};
  const coverage=(n:number)=>`${n}/${s.laps} laps`;
  return <article className={`${panel} p-6`}>
    <header className="mb-6 flex items-start justify-between gap-4"><div><p className="mb-2 text-sm text-slate-400">{s.laps} {s.laps===1?'appearance':'appearances'}</p><h3 className="flex items-center gap-3 text-xl font-semibold"><StationIcon station={s.station} className="shrink-0 text-brand"/>{s.name}</h3></div><p className="text-2xl font-semibold tabular-nums text-brand">{duration(s.seconds)}</p></header>
    <dl className="grid grid-cols-2 gap-x-5 gap-y-6 text-sm">
      {s.metres.coverage>0&&<div><dt className="text-slate-400">Actual distance</dt><dd className="mt-1 text-2xl font-semibold">{s.metres.sources.some(v=>v.includes('estimate'))?'~':''}{s.metres.value} <span className="text-base font-normal">m</span></dd><dd className="mt-2 text-slate-400">{coverage(s.metres.coverage)} · {s.metres.sources.join(', ')}</dd></div>}
      {s.count.coverage>0&&<div><dt className="text-slate-400">Actual {s.countUnit}</dt><dd className="mt-1 text-2xl font-semibold">{s.count.sources.some(v=>v.includes('estimate'))?'~':''}{s.count.value}</dd><dd className="mt-2 text-slate-400">{coverage(s.count.coverage)} · {s.count.sources.join(', ')}</dd></div>}
      {s.weights.length>0&&<div><dt className="text-slate-400">Prescribed load {s.station===6?'per kettlebell':s.station===2||s.station===3?'including sled':''}</dt><dd className="mt-1 text-xl font-semibold">{s.station===6?'2 × ':''}{range(s.weights)} kg</dd><dd className="mt-2 text-slate-400">{coverage(s.weightedLaps)}</dd></div>}
      {s.hr!==null&&<div><dt className="text-slate-400">Average heart rate</dt><dd className="mt-1 text-xl font-semibold">{s.hr} bpm</dd></div>}
      {s.watts.length>0&&<div><dt className="text-slate-400">PM5 lap power range</dt><dd className="mt-1 text-xl font-semibold">{range(s.watts)} W</dd><dd className="mt-2 text-slate-400">{coverage(s.watts.length)}</dd></div>}
      {s.ergPaces.length>0&&<div><dt className="text-slate-400">PM5 lap pace range</dt><dd className="mt-1 text-xl font-semibold">{range(s.ergPaces,duration)}/500m</dd><dd className="mt-2 text-slate-400">{coverage(s.ergPaces.length)}</dd></div>}
      {s.distanceVolumeCoverage>0&&<div><dt className="text-slate-400">Measured load-distance</dt><dd className="mt-1 text-xl font-semibold">{s.distanceVolume.toLocaleString()} kg·m</dd><dd className="mt-2 text-slate-400">{coverage(s.distanceVolumeCoverage)} · actual metres × prescribed load</dd></div>}
      {s.repVolumeCoverage>0&&<div><dt className="text-slate-400">Measured rep volume</dt><dd className="mt-1 text-xl font-semibold">{s.repVolume.toLocaleString()} kg·reps</dd><dd className="mt-2 text-slate-400">{coverage(s.repVolumeCoverage)} · actual reps × prescribed load</dd></div>}
    </dl>
    {!s.metres.coverage&&!s.count.coverage&&<p className="mt-5 border-t border-white/10 pt-4 text-sm leading-relaxed text-slate-400">No actual distance or count recorded. Prescribed targets are visible in the split details.</p>}
  </article>;
}
function HeartChart({a}:{a:Analysis}) {
  const [hover,setHover]=useState<number|null>(null);
  const records=a.records.filter(r=>r.hr!==null && r.time>=0);
  if(records.length<2)return <div className={`${panel} p-6`}><h3 className="mb-3 text-lg font-semibold">Heart rate</h3><p className="text-slate-400">No continuous heart-rate samples in this file. Available lap averages are shown in the splits.</p></div>;
  const stride=Math.max(1,Math.ceil(records.length/1000));
  const points=records.filter((_,i)=>i%stride===0 || i===records.length-1);
  const maxTime=Math.max(1,points.at(-1)!.time);const low=Math.max(0,Math.floor((Math.min(...points.map(r=>r.hr!))-10)/10)*10);const high=Math.ceil((Math.max(...points.map(r=>r.hr!))+10)/10)*10;
  const x=(time:number)=>48+time/maxTime*900; const y=(hr:number)=>210-(hr-low)/(high-low)*170;
  // Separate paths at sample gaps instead of inventing a continuous trace.
  let path='';let previous=-Infinity;
  for(const p of points){path+=`${p.time-previous>Math.max(15,stride*5)?'M':'L'}${x(p.time).toFixed(2)},${y(p.hr!).toFixed(2)} `;previous=p.time;}
  const selected=hover===null?null:points.reduce((best,p)=>Math.abs(p.time-hover)<Math.abs(best.time-hover)?p:best,points[0]);
  return <div className={`${panel} p-5 sm:p-7`}>
    <div className="mb-6 flex items-center justify-between gap-4"><h3 className="flex items-center gap-2 text-lg font-semibold"><Heart size={19} className="text-rose-400"/>Heart rate</h3><p className="text-sm tabular-nums text-slate-400" aria-live="off">{selected?`${duration(selected.time)} · ${selected.hr} bpm`:'Move or tap to inspect'}</p></div>
    <svg viewBox="0 0 980 260" role="img" aria-label={`Heart-rate samples range from ${records.reduce((v,r)=>Math.min(v,r.hr!),Infinity)} to ${records.reduce((v,r)=>Math.max(v,r.hr!),0)} bpm.`} className="w-full touch-pan-y" onPointerMove={e=>{const rect=e.currentTarget.getBoundingClientRect();setHover(Math.max(0,Math.min(maxTime,((e.clientX-rect.left)/rect.width*980-48)/900*maxTime)));}} onPointerLeave={()=>setHover(null)}>
      {[low,Math.round((low+high)/2),high].map(v=><g key={v}><line x1="48" x2="948" y1={y(v)} y2={y(v)} stroke="#24312c" strokeDasharray="4 5"/><text x="0" y={y(v)+5} fill="#94a3b8" fontSize="17">{v}</text></g>)}
      <path d={path} fill="none" stroke="#fb7185" strokeWidth="2.5"/>
      {[0,.25,.5,.75,1].map(v=><text key={v} x={x(maxTime*v)} y="250" textAnchor={v===0?'start':v===1?'end':'middle'} fontSize="17" fill="#94a3b8">{duration(maxTime*v)}</text>)}
      {selected&&<><line x1={x(selected.time)} x2={x(selected.time)} y1="30" y2="215" stroke="#94a3b8"/><circle cx={x(selected.time)} cy={y(selected.hr!)} r="5" fill="#fff"/></>}
    </svg><p className="mt-3 text-sm text-slate-400">Elapsed time · gaps in the recording remain gaps.</p>
  </div>;
}

export default function Analyzer() {
  const [analysis,setAnalysis]=useState<Analysis|null>(null);const [file,setFile]=useState<File|null>(null);
  const [busy,setBusy]=useState(false);const [error,setError]=useState('');const [drag,setDrag]=useState(false);
  const [tab,setTab]=useState<Tab>('Overview');const [filter,setFilter]=useState(0);const [title,setTitle]=useState('');const [notice,setNotice]=useState('');const [exporting,setExporting]=useState(false);
  const input=useRef<HTMLInputElement>(null);const report=useRef<HTMLDivElement>(null);const sectionNav=useRef<HTMLElement>(null);const worker=useRef<Worker|null>(null);const timer=useRef<ReturnType<typeof setTimeout>|null>(null);const request=useRef(0);
  function stop(){worker.current?.terminate();worker.current=null;if(timer.current)clearTimeout(timer.current);}
  useEffect(()=>()=>{worker.current?.terminate();if(timer.current)clearTimeout(timer.current);},[]);
  useEffect(()=>{if(analysis)report.current?.scrollIntoView({block:'start'});},[analysis]);
  useEffect(()=>{sectionNav.current?.scrollIntoView({block:'start'});},[tab]);
  function clear(){request.current++;stop();setAnalysis(null);setFile(null);setError('');setBusy(false);setNotice('');setTab('Overview');if(input.current)input.current.value='';}
  async function openFile(selected:File|undefined) {
    if(!selected)return;
    clear();const ticket=request.current;setBusy(true);
    if(!/\.fit$/i.test(selected.name)||selected.size>25*1024*1024){setError('Select one unzipped .fit activity, up to 25 MB.');setBusy(false);return;}
    try{
      const buffer=await selected.arrayBuffer();if(ticket!==request.current)return;
      const active=new Worker(new URL('./fit.worker.ts',import.meta.url));worker.current=active;
      const fail=(message:string)=>{stop();setBusy(false);setError(message);};
      timer.current=setTimeout(()=>fail('This file took too long to decode. Try exporting the original activity again.'),30000);
      active.onmessage=(e:MessageEvent<{analysis?:Analysis;error?:string}>)=>{
        if(ticket!==request.current)return;stop();setBusy(false);
        if(e.data.error){setError(e.data.error);return;}
        if(e.data.analysis){setAnalysis(e.data.analysis);setTitle(e.data.analysis.title);setFile(selected);setFilter(0);}
      };
      active.onerror=()=>fail('The FIT reader could not start. Reload the page and try again.');
      active.postMessage(buffer,[buffer]);
    }catch{if(ticket===request.current){stop();setBusy(false);setError('This file could not be opened. Try selecting it again.');}}
  }
  async function copy(value:string,label:string){try{await navigator.clipboard.writeText(value);setNotice(`${label} copied.`);}catch{setNotice('Copy is unavailable. Select and copy the text below.');}}
  async function image(){if(!analysis)return;setExporting(true);try{save(await workoutCard(analysis,brandedTitle(title)),`${fileName(brandedTitle(title))}.png`);setNotice('Card downloaded. Attach it to your activity in Strava.');}catch(e){setNotice(e instanceof Error?e.message:'Image export failed.');}finally{setExporting(false);}}
  const a=analysis;
  return <div>
    <input ref={input} type="file" accept=".fit" className="sr-only" aria-label="Choose a FIT activity" onChange={e=>void openFile(e.target.files?.[0])}/>
    {!a&&<section className={`${panel} overflow-hidden ${drag?'!border-brand':''}`} onDragOver={e=>{e.preventDefault();setDrag(true);}} onDragLeave={()=>setDrag(false)} onDrop={e=>{e.preventDefault();setDrag(false);if(e.dataTransfer.files.length!==1){setError('Choose one FIT activity at a time.');return;}void openFile(e.dataTransfer.files[0]);}}>
      <div className="grid items-center gap-10 p-7 sm:p-12 lg:grid-cols-[1.2fr_1fr]">
        <div><div className="mb-7 inline-flex rounded-xl border border-brand/30 bg-brand/10 p-4 text-brand"><Upload size={27}/></div><h2 className="mb-3 text-2xl font-semibold">{busy?'Reading your activity…':'Bring your workout into focus.'}</h2><p className="mb-7 max-w-md text-base leading-relaxed text-slate-400">Drop your original Garmin FIT file here, or choose it from your device. Up to 25 MB.</p><button className={`${button} !border-brand !bg-brand !text-black`} onClick={()=>input.current?.click()}><Upload size={18}/>{busy?'Choose another file':'Choose FIT file'}</button>{busy&&<button className={`${button} ml-3 mt-3 sm:mt-0`} onClick={clear}>Cancel</button>}<p className="mt-6 flex items-center gap-2 text-sm text-slate-400"><ShieldCheck size={17} className="shrink-0 text-brand"/>Processed on your device. Your FIT stays here.</p></div>
        <div className="hidden border-l border-white/10 pl-10 lg:block" aria-hidden="true"><p className="mb-7 text-sm uppercase tracking-widest text-slate-500">From raw file to clear story</p><div className="space-y-5">{[[Timer,'Time that adds up','Run · Station · Roxzone · Recovery'],[Activity,'Results with context','Targets, actuals and sources'],[ImageIcon,'Ready to share','A card, a title and your original FIT']].map(([Icon,heading,detail])=>{const I=Icon as typeof Timer;return <div key={heading as string} className="flex gap-4"><I size={23} className="shrink-0 text-brand"/><div><p className="font-semibold">{heading as string}</p><p className="mt-1 text-sm text-slate-400">{detail as string}</p></div></div>;})}</div></div>
      </div>
    </section>}
    {error&&<p role="alert" className="mt-5 rounded-xl border border-rose-400/30 bg-rose-400/10 p-5 text-rose-200">{error}</p>}
    {busy&&<p role="status" className="mt-5 text-sm text-brand">Validating FIT integrity and calculating your report…</p>}
    {a&&<>
      <div ref={report} className="mb-7 scroll-mt-40 flex flex-wrap items-start justify-between gap-5"><div className="min-w-0"><p className="mb-2 flex items-center gap-2 text-sm text-brand"><Check size={16}/>Activity ready · {a.splits.length} laps{a.date?` · ${new Date(a.date).toLocaleDateString(undefined,{day:'numeric',month:'short',year:'numeric'})}`:''}</p><h2 className="break-words text-2xl font-semibold sm:text-3xl">{brandedTitle(title)}</h2><p className="mt-2 text-sm text-slate-400">{a.recognized?'Resiliento stage data':'Native FIT data'} · {file?`${(file.size/1024).toFixed(0)} KB`:''} · local report</p></div><button className={button} onClick={clear}><X size={17}/>Clear report</button></div>
      {a.warnings.map(w=><p key={w} className="mb-5 rounded-xl border border-amber-300/20 bg-amber-300/5 p-4 text-sm leading-relaxed text-amber-100">{w}</p>)}
      <nav ref={sectionNav} aria-label="Report sections" className="scroll-mt-40 mb-8 flex gap-1 overflow-x-auto border-b border-white/10">{(['Overview','Stations','Splits','Share'] as Tab[]).map(t=><button key={t} onClick={()=>setTab(t)} aria-pressed={tab===t} className={`shrink-0 border-b-2 px-5 py-4 text-sm font-semibold transition ${tab===t?'border-brand text-brand':'border-transparent text-slate-400 hover:text-white'}`}>{t}{t==='Stations'?` (${a.stations.length})`:''}</button>)}</nav>
      {tab==='Overview'&&<div className="space-y-7">
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4"><Metric label="Workout time" value={duration(a.workoutSeconds)} detail="Active time · warmup excluded"/><Metric label="Run pace" value={a.pace?`${duration(a.pace.seconds)}/km`:'—'} detail={a.pace?`${a.pace.source} · ${a.pace.coverage}/${a.pace.total} eligible runs`:'No run meets the pace checks'}/><Metric label="Average heart rate" value={a.nativeHr?`${a.nativeHr}`:'—'} detail="bpm · native activity average"/><Metric label="Run pace drift" value={a.pace?.drift!==null&&a.pace?.drift!==undefined?`${a.pace.drift>=0?'+':'−'}${duration(Math.abs(a.pace.drift))}`:'—'} detail="per km · last eligible run − first"/></div>
        <section className={`${panel} p-6 sm:p-8`}><div className="mb-7 flex flex-wrap justify-between gap-3"><h3 className="flex items-center gap-2 text-lg font-semibold"><Layers size={20} className="text-brand"/>Where the time went</h3><p className="text-sm text-slate-400">{duration(a.totalSeconds)} recorded · {duration(a.elapsedSeconds)} elapsed</p></div><div className="mb-7 flex h-5 overflow-hidden rounded-full bg-white/5" role="img" aria-label={a.phases.map(p=>`${p.name} ${duration(p.seconds)}`).join(', ')}>{a.phases.map(p=><div key={p.phase} title={`${p.name}: ${duration(p.seconds)}`} style={{width:`${a.totalSeconds?p.seconds/a.totalSeconds*100:0}%`,background:PHASE_COLORS[p.phase]}}/>)}</div><div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-5">{a.phases.map(p=><div key={p.phase}><p className="mb-2 flex items-center gap-2 text-sm text-slate-400"><span className="h-2 w-2 rounded-sm" style={{background:PHASE_COLORS[p.phase]}}/>{p.name}</p><p className="text-2xl font-semibold tabular-nums">{duration(p.seconds)}</p><p className="mt-2 text-sm text-slate-400">{p.laps} laps{p.hr?` · ${p.hr} bpm`:''}</p></div>)}</div></section>
        <HeartChart a={a}/>
        {a.splits.some(s=>s.phase===1)&&<section className={`${panel} p-6 sm:p-8`}><h3 className="mb-6 text-lg font-semibold">Run splits, in order</h3><div className="space-y-4">{a.splits.filter(s=>s.phase===1).map((s,i)=><div key={s.index} className="grid grid-cols-[2rem_1fr_auto] items-center gap-4"><span className="text-sm text-slate-400">{i+1}</span><div><div className="h-3 overflow-hidden rounded bg-white/5"><div className="h-full rounded bg-brand/70" style={{width:`${s.seconds/Math.max(...a.splits.filter(v=>v.phase===1).map(v=>v.seconds),1)*100}%`}}/></div><p className="mt-2 text-sm text-slate-400">{s.gpsPace!==null?`${duration(s.gpsPace)}/km · GPS`:s.targetPace!==null?`${duration(s.targetPace)}/km · Target`:'Pace excluded by validity checks'}</p></div><span className="text-base font-semibold tabular-nums">{duration(s.seconds)}</span></div>)}</div></section>}
        {a.stations.length>0&&<section><div className="mb-5 flex justify-between gap-3"><h3 className="text-xl font-semibold">Every station has its own story.</h3><button className="shrink-0 text-sm text-brand underline underline-offset-4" onClick={()=>setTab('Stations')}>All station details</button></div><div className="grid gap-5 lg:grid-cols-2">{a.stations.slice(0,4).map((s,i)=><Station key={i} s={s}/>)}</div>{a.stations.length>4&&<p className="mt-5 text-sm text-slate-400">{a.stations.length-4} more station groups in Stations.</p>}</section>}
        <p className="text-sm text-slate-400">{a.nativeMetres!==null?`Native activity distance: ${(a.nativeMetres/1000).toFixed(2)} km. `:''}{a.calories!==null?`${a.calories} kcal. `:''}Native distance covers the whole activity; station results use exercise-specific fields.</p>
      </div>}
      {tab==='Stations'&&<section><p className="mb-6 max-w-3xl text-base leading-relaxed text-slate-400">Only performed stations appear. Repeated stations are grouped; custom names and units stay separate. Coverage shows how many laps have an actual measurement.</p><div className="grid gap-5 lg:grid-cols-2">{a.stations.map((s,i)=><Station key={i} s={s}/>)}</div>{!a.stations.length&&<p className={`${panel} p-8 text-slate-400`}>No classified station laps found in this file.</p>}</section>}
      {tab==='Splits'&&<section><div className="mb-6 flex flex-wrap gap-2" aria-label="Filter splits">{[{phase:0,name:'All stages'},...a.phases.filter(p=>p.phase!==0)].map(p=><button key={p.phase} aria-pressed={filter===p.phase} className={`rounded-full border px-4 py-2 text-sm ${filter===p.phase?'border-brand text-brand':'border-white/15 text-slate-400'}`} onClick={()=>setFilter(p.phase)}>{p.name}</button>)}</div><div className="space-y-3">{a.splits.filter(s=>!filter||s.phase===filter).map(s=><details key={s.index} className={`${panel} group p-5`}><summary className="flex cursor-pointer list-none flex-wrap items-center justify-between gap-4"><div className="flex items-center gap-4"><span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-sm font-semibold" style={{background:PHASE_COLORS[s.phase]+'20',color:PHASE_COLORS[s.phase]}}>{s.index}</span><div><h3 className="font-semibold">{s.name}</h3><p className="mt-1 text-sm text-slate-400">{s.round!==null?`Round ${s.round+1} · `:''}{s.hr?`${s.hr} bpm`:'No lap HR'} · expand details</p></div></div><span className="text-xl font-semibold tabular-nums">{duration(s.seconds)}</span></summary><div className="mt-5 space-y-3 border-t border-white/10 pt-5 text-sm leading-relaxed"><p><span className="text-slate-400">Actual: </span><Result s={s}/></p>{s.target!==null&&<p><span className="text-slate-400">Prescribed target: </span>{s.target} {s.unit===1?'m':s.unit===3?'s':[1,5].includes(s.station)?'strokes':s.station===6?'steps':'reps'}</p>}{s.weight!==null&&<p><span className="text-slate-400">Prescribed load: </span>{s.station===6?'2 × ':''}{s.weight} kg{s.station===2||s.station===3?' including sled':''}</p>}{s.phase===1&&<p><span className="text-slate-400">Pace: </span>{s.gpsPace!==null?`${duration(s.gpsPace)}/km · GPS`:s.targetPace!==null?`${duration(s.targetPace)}/km · Target`:'Excluded by validity checks'}</p>}{s.label&&<p className="break-words text-slate-500">Watch label: {s.label}</p>}</div></details>)}</div>{!a.splits.length&&<p className="p-8 text-slate-400">No native laps recorded.</p>}</section>}
      {tab==='Share'&&<ShareWorkout a={a} title={title} setTitle={setTitle} exporting={exporting} onImage={()=>void image()} onCopy={(value,label)=>void copy(value,label)} onFit={()=>file&&save(file,`${fileName(brandedTitle(title))}.fit`)} onJson={()=>save(new Blob([JSON.stringify({...a,title:brandedTitle(title)},null,2)],{type:'application/json'}),`${fileName(brandedTitle(title))}.json`)}/>}
      {notice&&<p role="status" className="mt-6 rounded-lg border border-brand/25 bg-brand/5 p-4 text-sm text-brand">{notice}</p>}
    </>}
  </div>;
}
