import Link from "next/link";

export const metadata = {
  title: "Adaptive Training Planner | RESILIENTO",
  description: "Why static PDF plans fail real athletes, how smart compression works, and why adapting to schedule friction is the secret to long-term consistency.",
};

export default function AdaptiveTrainingPlannerPage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative pt-32 pb-24 border-b border-border overflow-hidden">
        <div className="absolute top-1/4 left-[10%] w-[1px] h-screen bg-gradient-to-b from-brand/20 to-transparent transform -rotate-45 opacity-50 pointer-events-none" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10 w-full mt-12">
          <div className="max-w-4xl">
            <div className="flex items-center gap-4 mb-8">
              <div className="h-[2px] w-12 bg-brand"></div>
              <span className="text-brand text-[11px] font-mono tracking-[0.3em] uppercase">Core Concept 02</span>
            </div>
            <h1 className="text-4xl sm:text-6xl font-bold tracking-tighter text-white mb-8 uppercase leading-[1]">
              Static Plans Die <br/> On Contact With Reality.
            </h1>
            <p className="text-xl sm:text-2xl text-slate-400 leading-[1.6] font-light max-w-3xl">
              Real life disrupts ideal schedules. Trying to perfectly execute a rigid 16-week template usually leads to injury or burnout. Here is how dynamic adaptation preserves the actual training intent.
            </p>
          </div>
        </div>
      </section>

      {/* The Fragility of Static Plans */}
      <section className="py-24 border-b border-border bg-surface">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-8 uppercase">
                The Catch-Up Trap
              </h2>
              <div className="prose prose-invert prose-brand max-w-none text-slate-300 font-light leading-relaxed">
                <p>
                  Most athletes start a new block of training with a rigid, 16-week PDF or static calendar. For the first two weeks, it works flawlessly. Then, life happens.
                </p>
                <p>
                  A meeting runs late. You miss your Tuesday swim. Suddenly, your perfect plan becomes a source of stress. You try to "catch up" by moving the swim to Wednesday, stacking it on top of a heavy track workout. Consequently, you are fatigued for your Thursday ride, missing your power targets. By Friday, you are over-reached, under-recovered, and structurally disjointed.
                </p>
                <p>
                  <strong>Preserving the shape of the calendar at the expense of the physiological stimulus ALWAYS backfires.</strong> 
                </p>
              </div>
            </div>
            
            <div className="space-y-8">
              <div className="border border-border bg-black p-8 group hover:border-brand/50 transition-colors">
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-brand font-mono text-[10px] tracking-[0.2em] uppercase">Example A</span>
                </div>
                <h3 className="text-xl font-bold text-white uppercase mb-3">The Missed Swim</h3>
                <p className="text-slate-400 font-light text-sm leading-relaxed">
                  Missing a technical swim session alters the weekly load distribution. Instead of just skipping it or stubbornly stacking it, the planner deterministically reschedules the highest-priority sessions inside the remaining 72 hours, redistributing the aerobic volume to alternative disciplines without causing a load spike.
                </p>
              </div>

              <div className="border border-border bg-black p-8 group hover:border-brand/50 transition-colors">
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-brand font-mono text-[10px] tracking-[0.2em] uppercase">Example B</span>
                </div>
                <h3 className="text-xl font-bold text-white uppercase mb-3">Smart Compression</h3>
                <p className="text-slate-400 font-light text-sm leading-relaxed">
                  Your 90-minute structured ride is blocked because you only have a 35-minute window before work. Truncating the main set ruins the stimulus. Smart compression converts the steady-state aerobic blocks into higher-density threshold work, extracting an equivalent systemic stress score from the abbreviated timeframe.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Adaptive Architecture */}
      <section className="py-24 border-b border-border bg-black">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-6 uppercase">
              The Difference Between Truncating, Skipping, and Adapting
            </h2>
            <p className="text-lg text-slate-400 max-w-3xl font-light">
              Consistency is not about flawless execution. It is about how intelligently you handle disruption.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-0 border border-border">
            <div className="p-10 border-r border-border border-b sm:border-b-0">
              <h4 className="text-lg font-bold text-white uppercase mb-4 tracking-tight">Truncating (The Bad Way)</h4>
              <p className="text-slate-500 font-light text-sm leading-relaxed">
                Stopping a workout halfway through because you ran out of time. You often bypass the core main set or skip the critical cooldown, meaning you get the fatigue without the specific adaptation.
              </p>
            </div>
            <div className="p-10 border-r border-border border-b sm:border-b-0">
              <h4 className="text-lg font-bold text-white uppercase mb-4 tracking-tight">Skipping (The Lazy Way)</h4>
              <p className="text-slate-500 font-light text-sm leading-relaxed">
                Wiping the session off the calendar entirely. Do this twice in a week, and the progressive overload of the mesocycle collapses. The macro-level plan is completely derailed.
              </p>
            </div>
            <div className="p-10 bg-brand/5 border border-brand relative">
              <div className="absolute top-0 right-0 p-4">
                <span className="w-2 h-2 rounded-full bg-brand animate-pulse block"></span>
              </div>
              <h4 className="text-lg font-bold text-white uppercase mb-4 tracking-tight">Adapting (The Engine Way)</h4>
              <p className="text-slate-500 font-light text-sm leading-relaxed">
                The engine queries the remaining week, notes the exact Training Stress Score deficit, and mathematically restructures tomorrow's session to ingest the lost volume without violating recovery caps.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 border-b border-border bg-surface">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-white uppercase">Planner FAQ</h2>
          </div>
          
          <div className="space-y-8">
            <div className="border-b border-border pb-8">
              <h3 className="text-xl font-bold text-white uppercase mb-3">If I keep missing sessions, what happens?</h3>
              <p className="text-slate-400 font-light leading-relaxed">
                If the engine detects accumulated disruption exceeding a threshold (e.g. you've missed 40% of the volume over two weeks), it triggers a Horizon Re-Projection. It mathematically accepts that you are off the original trajectory, shifts the peaking curve, and rebuilds the macrocycle so you aren't perpetually drowning in unattainable load.
              </p>
            </div>
            <div className="border-b border-border pb-8">
              <h3 className="text-xl font-bold text-white uppercase mb-3">Does adapting mean I can slack off freely?</h3>
              <p className="text-slate-400 font-light leading-relaxed">
                No. It means zero guesswork when uncontrollable events happen. It relies on your discipline to execute the adjusted load. If you consistently skip, the engine will eventually de-load your structural expectations to keep you safe.
              </p>
            </div>
            <div className="border-b border-border pb-8">
              <h3 className="text-xl font-bold text-white uppercase mb-3">How does it adapt strength sessions?</h3>
              <p className="text-slate-400 font-light leading-relaxed">
                Because it is a <Link href="/hybrid-training-engine" className="text-brand hover:underline">Hybrid Engine</Link>, missing a heavy strength day might cause the planner to convert a high-intensity run interval tomorrow into an aerobic recovery run to make room for the rescheduled strength block. 
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 bg-[#030303]">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tighter text-white mb-6 uppercase">
            Execute. Adapt. Repeat.
          </h2>
          <p className="text-xl text-slate-400 font-light mb-10 max-w-2xl mx-auto">
            Stop letting a missed Tuesday ruin your entire week. The most successful athletes are the most adaptable.
          </p>
          <Link 
            href="/#waitlist" 
            className="group relative inline-flex items-center justify-between border-2 border-brand bg-brand/5 px-8 py-5 hover:bg-brand transition-colors"
          >
            <span className="text-[13px] font-bold tracking-[0.2em] text-white group-hover:text-black uppercase">
              Join Waitlist
            </span>
            <span className="text-brand group-hover:text-black ml-4 transform group-hover:translate-x-1 transition-all">→</span>
          </Link>
        </div>
      </section>
    </div>
  );
}
