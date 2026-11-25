'use client';
import { useEffect, useState } from 'react';
import { workoutCard } from '@/lib/fit-card';
import { brandedTitle, type Analysis } from '@/lib/fit-analysis';

export default function CardPreview({analysis,title}:{analysis:Analysis;title:string}) {
  const [url,setUrl]=useState('');const [error,setError]=useState('');
  useEffect(()=>{
    let canceled=false;let imageUrl='';
    const timer=setTimeout(()=>{
      workoutCard(analysis,brandedTitle(title)).then(blob=>{
        if(canceled)return;
        imageUrl=URL.createObjectURL(blob);setUrl(imageUrl);setError('');
      }).catch(()=>{if(!canceled)setError('Preview could not be generated.');});
    },150);
    return ()=>{canceled=true;clearTimeout(timer);if(imageUrl)URL.revokeObjectURL(imageUrl);};
  },[analysis,title]);
  return <div className="min-w-0 rounded-2xl border border-white/10 bg-[#0c110f] p-5 sm:p-6">
    <div className="mb-5 flex items-center justify-between gap-4"><h3 className="text-base font-semibold">Your Strava card</h3><span className="text-sm text-slate-400">1080 × 1350 · PNG</span></div>
    <div className="mx-auto aspect-[4/5] w-full max-w-md overflow-hidden rounded-lg bg-[#07110d] shadow-2xl">
      {/* Local object URL: no image optimization or file upload. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      {url?<img src={url} alt="Preview of your workout card for sharing" className="block h-full w-full max-w-full object-contain"/>:<p role="status" className="p-8 text-sm text-slate-400">{error||'Preparing your card…'}</p>}
    </div>
    {analysis.stations.length>10&&<p className="mt-4 text-sm text-slate-400">First 10 station groups shown. The description and full report include every group.</p>}
  </div>;
}
