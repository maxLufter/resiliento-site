'use client';
import { useEffect, useRef, useState } from 'react';
import { workoutCard } from '@/lib/fit-card';
import { brandedTitle, type Analysis } from '@/lib/fit-analysis';

export default function CardPreview({analysis,title}:{analysis:Analysis;title:string}) {
  const [url,setUrl]=useState('');const [error,setError]=useState('');
  const urlRef=useRef('');
  useEffect(()=>{
    let canceled=false;
    const timer=setTimeout(()=>{
      workoutCard(analysis,brandedTitle(title)).then(blob=>{
        const nextUrl=URL.createObjectURL(blob);
        if(canceled){URL.revokeObjectURL(nextUrl);return;}
        if(urlRef.current)URL.revokeObjectURL(urlRef.current);
        urlRef.current=nextUrl;
        setUrl(nextUrl);setError('');
      }).catch(()=>{
        if(!canceled){
          if(urlRef.current){URL.revokeObjectURL(urlRef.current);urlRef.current='';}
          setUrl('');setError('Preview could not be generated.');
        }
      });
    },150);
    return ()=>{canceled=true;clearTimeout(timer);};
  },[analysis,title]);
  useEffect(()=>()=>{if(urlRef.current){URL.revokeObjectURL(urlRef.current);urlRef.current='';}},[]);
  const visible=analysis.splits.filter(s=>s.phase!==5);
  const mainSplits=visible.filter(s=>s.phase===1||s.phase===2);
  const showSplits=mainSplits.length>0&&mainSplits.length<=4;
  const displayedRowCount=showSplits?mainSplits.length:(analysis.stations.length||visible.length);
  return <div className="min-w-0 rounded-2xl border border-white/10 bg-[#0c110f] p-5 sm:p-6">
    <div className="mb-5 flex items-center justify-between gap-4"><h3 className="text-base font-semibold">Your Strava card</h3><span className="text-sm text-slate-400">1080 × 1350 · PNG</span></div>
    <div className="mx-auto aspect-[4/5] w-full max-w-md overflow-hidden rounded-lg bg-[#07110d] shadow-2xl">
      {/* Local object URL: no image optimization or file upload. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      {error?<p role="alert" className="p-8 text-sm text-rose-200">{error}</p>:url?<img src={url} alt="Preview of your workout card for sharing" className="block h-full w-full max-w-full object-contain"/>:<p role="status" className="p-8 text-sm text-slate-400">Preparing your card…</p>}
    </div>
    {displayedRowCount>10&&<p className="mt-4 text-sm text-slate-400">{analysis.stations.length?'First 10 station groups shown. The description and full report include every group.':'First 10 splits shown. The full report includes every lap.'}</p>}
  </div>;
}
