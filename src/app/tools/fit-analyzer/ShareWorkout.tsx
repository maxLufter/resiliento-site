'use client';
import { Copy, Download, Image as ImageIcon } from 'lucide-react';
import { brandedTitle, stravaDescription, type Analysis } from '@/lib/fit-analysis';
import CardPreview from './CardPreview';

const panel='rounded-2xl border border-white/10 bg-[#080c0b] p-6 sm:p-8';
const button='inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-white/20 px-5 py-3 text-sm font-semibold text-white transition hover:border-brand hover:text-brand focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand disabled:opacity-50';
export default function ShareWorkout({a,title,setTitle,exporting,notice,onImage,onCopy,onFit,onJson}:{
  a:Analysis;title:string;setTitle:(value:string)=>void;exporting:boolean;notice?:string;
  onImage:()=>void;onCopy:(value:string,label:string)=>void;onFit:()=>void;onJson:()=>void;
}) {
  return <section className="grid min-w-0 grid-cols-1 items-start gap-7 lg:grid-cols-2">
    <div className="min-w-0 space-y-5">
      <CardPreview analysis={a} title={title}/>
      <button className={`${button} w-full !border-brand !bg-brand !text-black`} disabled={exporting} onClick={onImage}><ImageIcon size={19}/>{exporting?'Generating…':'Download Strava card'}</button>
      <p className="text-center text-sm text-slate-400">No route or heart-rate trace in the card.</p>
    </div>
    <div className="min-w-0 space-y-6">
      <div className={panel}>
        <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-brand">Prepare for Strava</p>
        <h3 className="mb-6 text-2xl font-semibold">Your workout, ready to share.</h3>
        {notice&&<p aria-hidden="true" className="mb-5 rounded-lg border border-brand/25 bg-brand/5 p-3.5 text-sm text-brand">{notice}</p>}
        <label htmlFor="workout-title" className="mb-2 block text-sm text-slate-400">Activity title</label>
        <input id="workout-title" value={title} maxLength={200} onChange={e=>setTitle(e.target.value)} onBlur={()=>setTitle(brandedTitle(title))} className="mb-4 w-full rounded-lg border border-white/20 bg-black p-3 text-base focus:outline-brand"/>
        <button className={button} onClick={()=>onCopy(brandedTitle(title),'Title')}><Copy size={17}/>Copy title</button>
        <label htmlFor="strava-text" className="mb-2 mt-7 block text-sm text-slate-400">Description · all recorded stations</label>
        <textarea id="strava-text" readOnly value={stravaDescription({...a,title:brandedTitle(title)})} rows={9} className="mb-4 w-full rounded-lg border border-white/15 bg-black p-4 text-sm leading-relaxed text-slate-300"/>
        <button className={button} onClick={()=>onCopy(stravaDescription({...a,title:brandedTitle(title)}),'Description')}><Copy size={17}/>Copy description</button>
      </div>
      <div className={panel}>
        <h3 className="mb-5 text-xl font-semibold">Publish it your way.</h3>
        <ol className="list-decimal space-y-4 pl-5 text-base leading-relaxed text-slate-300">
          <li>If Garmin already synced this workout, edit that activity in Strava. Otherwise, upload the original FIT.</li>
          <li>Paste your title and description. Attach the downloaded PNG as an activity photo.</li>
          <li>For HYROX, switch the activity to Hybrid Racing in Strava and choose the appropriate workout type.</li>
        </ol>
        <a href="https://www.strava.com/upload/select" target="_blank" rel="noreferrer" className={`${button} mt-6 !border-[#fc4c02] !bg-[#fc4c02] !text-white`}>Open Strava file upload</a>
        <p className="mt-4 text-sm leading-relaxed text-slate-400">You review and publish in Strava. Uploading an already synced activity can be rejected as a duplicate.</p>
      </div>
      <div className={panel}>
        <h3 className="mb-4 text-lg font-semibold">Keep your data</h3>
        <div className="flex flex-wrap gap-3"><button className={button} onClick={onFit}><Download size={17}/>Original FIT</button><button className={button} onClick={onJson}><Download size={17}/>Full report JSON</button></div>
        <p className="mt-4 text-sm leading-relaxed text-slate-400">The FIT bytes are unchanged. The report includes every measurement and source label.</p>
      </div>
    </div>
  </section>;
}
