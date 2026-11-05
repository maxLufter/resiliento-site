'use client';
import Link from 'next/link';
import { useRef } from 'react';
import { trackFunnel } from '@/lib/analytics';
import type { ToolSlug } from '@/lib/tool-catalog';

export function ToolExperience({ slug, children }: { slug: ToolSlug; children: React.ReactNode }) {
  const interacted = useRef(false);
  function recordInteraction() {
    if (!interacted.current) { trackFunnel('tool_interaction', slug); interacted.current = true; }
  }
  return <>
    <div onChangeCapture={recordInteraction} onClickCapture={e => {
      if (e.target instanceof Element && e.target.closest('button')) recordInteraction();
    }}>{children}</div>
    <section className="mt-8 border border-brand/25 bg-brand/5 p-6 sm:p-8 rounded-xl">
      <p className="text-brand text-xs font-mono uppercase tracking-widest mb-3">Your next training week</p>
      <h2 className="text-xl sm:text-2xl font-bold text-white mb-3">Put your numbers into a plan.</h2>
      <p className="text-slate-400 mb-5 max-w-2xl">RESILIENTO is building one training app for endurance, strength and recovery. Join the waitlist for early access. These tools stay free, with no signup required.</p>
      <Link href={`/waitlist?from=${slug}`} onClick={() => trackFunnel('tool_waitlist_click', slug)} className="inline-flex bg-brand text-black px-6 py-3 font-semibold rounded hover:brightness-110 transition">Get early access →</Link>
    </section>
  </>;
}
