import type { Metadata } from 'next';
import Link from 'next/link';
import Analyzer from './Analyzer';

export const metadata: Metadata = {
  title:'FIT Workout Analyzer | Hybrid Training & HYROX',
  description:'Open a Garmin FIT file privately in your browser. Explore hybrid workout splits, station results, running pace and heart rate, then prepare a card for Strava.',
  alternates:{canonical:'/tools/fit-analyzer'},
};

export default function Page() {
  return <div className="mx-auto max-w-7xl px-5 pb-24 pt-36 sm:px-8 sm:pt-40">
    <nav aria-label="Breadcrumb" className="mb-9 flex gap-3 text-sm text-slate-400"><Link href="/tools" className="hover:text-brand">Free training tools</Link><span>/</span><span className="text-white">FIT analyzer</span></nav>
    <header className="mb-10 max-w-3xl">
      <p className="mb-4 font-mono text-sm uppercase tracking-[.18em] text-brand">Resiliento · Workout lab</p>
      <h1 className="font-montserrat text-4xl font-bold leading-tight tracking-tight sm:text-6xl">One workout.<br/><span className="text-slate-400">The whole picture.</span></h1>
      <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-300">Your runs, stations and transitions, together. Open a FIT activity to explore every split and make a card worth sharing.</p>
    </header>
    <Analyzer />
    <section className="mt-16 grid gap-8 border-t border-white/10 pt-10 text-base leading-relaxed text-slate-400 md:grid-cols-3">
      <div><h2 className="mb-3 text-lg font-semibold text-white">Get your original FIT</h2><p>In Garmin Connect on the web, open the activity and choose Export Original from its settings. Unzip the download and select the .fit file here.</p></div>
      <div><h2 className="mb-3 text-lg font-semibold text-white">Built for hybrid workouts</h2><p>Resiliento stage fields unlock exercise-specific results. Other single-session FIT activities get a basic report from their native data. Missing measurements stay missing.</p></div>
      <div><h2 className="mb-3 text-lg font-semibold text-white">Your browser does the work</h2><p>FIT parsing, calculations and image generation run on your device. No workout uploads, accounts or saved history. Clearing the report removes it from this page.</p></div>
    </section>
    <details className="mt-10 rounded-2xl border border-white/10 p-6 text-slate-400">
      <summary className="cursor-pointer text-base font-semibold text-white">How the metrics are calculated</summary>
      <div className="mt-5 space-y-4 text-base leading-relaxed">
        <p>Workout time excludes warmup and pauses. Native activity distance may include movement outside running stages. Phase heart rates are weighted by recorded active lap time and only include laps with heart-rate data.</p>
        <p>Running pace needs at least 10 seconds, 30 metres, and 1:30–30:00 per km. Eligible GPS runs take priority; if none qualify, eligible prescribed-distance runs are labeled Target. Drift is the last eligible run pace minus the first; positive values mean slowing.</p>
        <p>Station results use actual recorded measurements. Coverage such as 2/3 means two of three station laps have that measurement. Prescribed targets and loads remain separate. GPS values are estimates. Unreliable automatic wrist counts in older recordings are excluded from this report and exports. Erg power and pace show observed lap ranges; they are not whole-workout averages. Carry load is per kettlebell and its load-distance volume uses both kettlebells.</p>
        <p>This tool preserves your original FIT. It does not rewrite native exercise sets or activity types. <a href="https://support.strava.com/en-us/articles/18519573-how-do-i-log-a-hyrox-activity-with-the-hybrid-racing-sport-type" target="_blank" rel="noreferrer" className="text-brand underline">Strava currently requires switching device uploads to Hybrid Racing manually.</a></p>
      </div>
    </details>
  </div>;
}
