import type { Metadata } from 'next';
import Link from 'next/link';
import { BreadcrumbJsonLd } from '@/components/StructuredData';
import { ToolsSpotlight } from '@/components/ToolsSpotlight';

const title = 'HYROX & World Triathlon: What It Means for Your Training';
const description = 'The October 2026 partnership explained, plus a practical starting point for combining running, strength and triathlon with free planning tools.';
const url = 'https://resiliento.app/guides/hyrox-world-triathlon';
export const metadata: Metadata = { title, description, alternates: { canonical: url }, openGraph: { title, description, url, type: 'article', publishedTime: '2026-11-04', images: ['/og-image.jpg'] }, twitter: { card: 'summary_large_image', title, description, images: ['/og-image.jpg'] } };

export default function HybridRacingGuide() {
  return <>
    <BreadcrumbJsonLd items={[{ name: 'Home', url: 'https://resiliento.app' }, { name: 'HYROX & World Triathlon', url }]} />
    <article className="max-w-3xl mx-auto px-6 pt-40 pb-16 text-slate-300">
      <p className="text-brand text-xs font-mono uppercase tracking-widest mb-5">Hybrid racing · November 4, 2026</p>
      <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white mb-8">HYROX and World Triathlon: what changes for your training?</h1>
      <p className="text-xl leading-relaxed mb-8">For athletes who run, lift, swim or ride, the connection is familiar: different sports draw on the same training week. A shared sporting framework makes that conversation more visible. Your plan still needs to match your next race.</p>
      <section className="space-y-4 mb-12">
        <h2 className="text-2xl text-white font-bold">What was announced?</h2>
        <p>On October 28, 2026, World Triathlon and HYROX announced a signed term sheet for a strategic partnership. It recognises Hybrid Racing within the World Triathlon family, with Ultimate, Fast and Ultra formats. A detailed agreement is still to follow. Olympic and Paralympic inclusion is an ambition, not an announced Games entry.</p>
        <a href="https://triathlon.org/news/world-triathlon-and-hyrox-join-forces-in-landmark-partnership-to-globalise-hybrid-racing" className="text-brand underline underline-offset-4">Read the World Triathlon announcement →</a>
      </section>
      <section className="space-y-4 mb-12">
        <h2 className="text-2xl text-white font-bold">Start with the event you are actually entering</h2>
        <p>A triathlon plan must make room for swimming and cycling as well as running. A HYROX plan needs race-specific station practice and running under fatigue. Being fit in one discipline is useful, but it does not replace practicing the other.</p>
        <p>Choose your priority event and a realistic number of weekly sessions before adding extra training. Keep your easy days easy, and review whether your harder sessions leave you ready for the next one.</p>
      </section>
      <section className="space-y-4 mb-12">
        <h2 className="text-2xl text-white font-bold">Use a weekly template as a starting point</h2>
        <p>For running and lifting, our <Link href="/tools/hybrid-split-builder" className="text-brand underline">hybrid split builder</Link> places the main lower-body session on Tuesday and a quality run on Friday. With three runs, the other sessions are an easy Monday run and a long easy Sunday run. This is an editable starting structure, not a complete HYROX or triathlon programme.</p>
        <p>For triathlon, include your swim and bike sessions when reviewing total load. Do not simply add them on top of an already full running and lifting week.</p>
      </section>
      <section className="space-y-4 mb-12">
        <h2 className="text-2xl text-white font-bold">Make the plan useful today</h2>
        <ul className="list-disc pl-5 space-y-3">
          <li>Set sport-specific intensity ranges with the <Link href="/tools/hr-zones-calculator" className="text-brand underline">LTHR zones calculator</Link>.</li>
          <li>Estimate race splits with the <Link href="/tools/triathlon-pace-predictor" className="text-brand underline">triathlon finish time calculator</Link>.</li>
          <li>Practice a fueling plan using your actual product labels in the <Link href="/tools/race-nutrition-calculator" className="text-brand underline">race nutrition calculator</Link>.</li>
        </ul>
      </section>
      <div className="border border-brand/30 p-6 rounded-xl bg-brand/5">
        <h2 className="text-xl font-bold text-white mb-3">One week. One coordinated plan.</h2>
        <p className="mb-5">RESILIENTO is building a training app that connects endurance, strength and recovery. The free tools are available now; the app is in development.</p>
        <Link href="/waitlist" className="text-brand font-semibold">Join the early-access waitlist →</Link>
      </div>
      <p className="text-xs text-slate-500 mt-8">RESILIENTO is independent and is not affiliated with or endorsed by HYROX or World Triathlon.</p>
    </article>
    <ToolsSpotlight />
  </>;
}
