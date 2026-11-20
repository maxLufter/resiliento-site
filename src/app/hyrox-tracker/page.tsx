import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Resiliento Hybrid Tracker for Garmin',
  description: 'A Garmin watch app for HYROX-style races and hybrid training. Follow running intervals and stations, build custom workouts, and review your splits.',
  alternates: { canonical: '/hyrox-tracker' },
};

const features = [
  ['Race mode', 'Follow eight runs and eight stations, with optional Roxzone splits and division-specific weight presets.'],
  ['Quick Workouts', 'Preview the stages and targets of ten presets before starting, or build a custom workout with your own stages and rounds.'],
  ['Workout review', 'Check stage and total time, heart rate zones, outdoor GPS pace, and run and station splits on your watch.'],
];

export default function HybridTrackerPage() {
  return (
    <main className="mx-auto max-w-6xl px-6 pb-24 pt-32 sm:pt-40">
      <Link href="/tools" className="text-sm font-semibold text-brand hover:underline">← Free training tools</Link>
      <div className="mt-8 grid items-center gap-8 md:grid-cols-[1fr_300px] lg:gap-16">
        <div>
          <h1 className="font-montserrat text-4xl font-bold tracking-tight text-white sm:text-6xl">Resiliento Hybrid Tracker</h1>
          <p className="mt-5 text-lg leading-relaxed text-slate-300">A Garmin watch app for HYROX-style races and hybrid training. See your next station, follow your targets and review where you spent your time.</p>
          <p className="mt-5 text-sm text-slate-400">Connect IQ Store link will be added once the app is listed.</p>
        </div>
        <Image src="/hybrid-tracker/wall-balls.png" alt="Wall Balls stage with the target, stage and total timers, and heart rate zone gauge" width={454} height={454} className="mx-auto w-full max-w-[250px] rounded-full sm:max-w-[300px]" />
      </div>

      <div className="mt-12 grid gap-4 md:grid-cols-3">
        {features.map(([title, description]) => (
          <section key={title} className="rounded-xl border border-border bg-surface/50 p-6">
            <h2 className="font-montserrat text-lg font-bold text-white">{title}</h2>
            <p className="mt-2 leading-relaxed text-slate-300">{description}</p>
          </section>
        ))}
      </div>

      <section id="privacy" className="mt-14 max-w-3xl scroll-mt-28 border-t border-border pt-8">
        <h2 className="font-montserrat text-2xl font-bold text-white">Workout data and privacy</h2>
        <div className="mt-4 space-y-4 leading-relaxed text-slate-300">
          <p>The watch app uses heart rate for training displays and summaries. GPS is off by default and is used in Outdoor mode for distance and pace. The watch app does not send heart rate, GPS or workout data to Resiliento servers.</p>
          <p>Recent workout summaries remain on your watch. When you save a workout, it is recorded as a Garmin activity and can sync to Garmin Connect if sync is enabled. Garmin handles that sync under its own privacy terms.</p>
          <p>For app support or privacy questions, email <a href="mailto:support@resiliento.app" className="text-brand underline">support@resiliento.app</a>.</p>
        </div>
      </section>
      <p className="mt-8 text-sm text-slate-400">Resiliento is independent and is not affiliated with or endorsed by HYROX or Garmin.</p>
    </main>
  );
}
