import Link from "next/link";
import Image from "next/image";

export const metadata = {
  title: "RESILIENTO App | Adaptive Training Planner Algorithm",
  description: "Why static PDF plans fail real athletes. Learn the mechanics of smart compression, deterministic recalculation, and how adapting to schedule friction preserves consistency.",
};

export default function AdaptiveTrainingPlannerPage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative pt-32 pb-24 border-b border-border overflow-hidden">
        <div className="absolute top-1/4 left-[10%] w-[1px] h-screen bg-gradient-to-b from-brand/20 to-transparent transform -rotate-45 opacity-50 pointer-events-none" />
        <div className="absolute bottom-0 right-[20%] w-[1px] h-96 bg-gradient-to-t from-brand/10 to-transparent transform rotate-12 opacity-30 pointer-events-none" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10 w-full mt-12">
          <div className="max-w-4xl">
            <div className="flex items-center gap-4 mb-8">
              <div className="h-[2px] w-12 bg-brand"></div>
              <span className="text-brand text-[11px] font-mono tracking-[0.3em] uppercase">Core Concept 02</span>
            </div>
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tighter text-white mb-8 uppercase leading-[0.9]">
              The RESILIENTO <br/> Adaptive Planner
            </h1>
            <p className="text-xl sm:text-2xl text-slate-400 leading-[1.6] font-light max-w-3xl">
              Real life disrupts ideal schedules. Trying to perfectly execute a rigid 16-week template usually leads to acute injury or systemic burnout. Here is how dynamic algorithmic adaptation overrules arbitrary calendars.
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
                The Inevitable Catch-Up Trap
              </h2>
              <div className="prose prose-invert prose-brand max-w-none text-slate-300 font-light leading-relaxed">
                <p className="text-lg">
                  Most athletes start a new block of training with a high degree of optimism and a rigid, 16-week PDF or static synced calendar. For the first two weeks, it works flawlessly. Then, inevitable friction happens.
                </p>
                <p>
                  A critical work meeting runs two hours late. You miss your Tuesday morning swim. Your child gets sick. Suddenly, your perfect plan becomes a massive source of anxiety.
                </p>
                <p>
                  <strong>Athletes with static plans have two very bad options when life gets in the way:</strong>
                </p>
                <ul>
                  <li>They try to "catch up" by dragging the missed swim to Wednesday, stubbornly stacking it on top of a highly demanding track workout. Consequently, they are deeply fatigued for their Thursday ride, subsequently missing their critical power targets and arriving at the weekend structurally disjointed and over-reached.</li>
                  <li>They delete the session outright, sacrificing the progressive overload required to force aerobic adaptation over the mesocycle.</li>
                </ul>
                <p>
                  Preserving the shape of the calendar at the expense of the physiological stimulus *always* backfires.
                </p>
              </div>
            </div>
            
            <div className="space-y-8">
              <div className="border border-border bg-black p-8 group hover:border-brand/50 transition-colors shadow-lg">
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-brand font-mono text-[10px] tracking-[0.2em] uppercase">Redistribution Logistics</span>
                </div>
                <h3 className="text-xl font-bold text-white uppercase mb-3">Handling The Missed Session</h3>
                <p className="text-slate-400 font-light text-sm leading-relaxed">
                  Missing a technical threshold swim or interval run alters the weekly load distribution. Rather than blindly skipping it or unsafely stacking it onto tomorrow, an <Link href="/hybrid-training-engine" className="text-brand hover:underline">adaptive hybrid engine</Link> deterministically reschedules the highest-priority sessions inside the remaining 72 hours.
                  <br/><br/>
                  It redistributes the lost aerobic volume to alternative disciplines (e.g., adding 15 minutes of Z2 to your weekend long ride) without causing an acute load spike that would compromise tissue integrity.
                </p>
              </div>

              <div className="border border-border bg-black p-8 group hover:border-brand/50 transition-colors shadow-lg">
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-brand font-mono text-[10px] tracking-[0.2em] uppercase">Temporal Flexibility</span>
                </div>
                <h3 className="text-xl font-bold text-white uppercase mb-3">Smart Compression Algorithm</h3>
                <p className="text-slate-400 font-light text-sm leading-relaxed">
                  Your 90-minute structured endurance ride is blocked because you only have a 35-minute window before leaving for the airport. Simply truncating the main cycle set ruins the intended stimulus. 
                  <br/><br/>
                  Smart compression calculates the required Training Stress Score (TSS) for the original bike workout and mathematically converts the steady-state aerobic blocks into higher-density threshold or sweet-spot work on the trainer, extracting an equivalent systemic stress score from the brutally abbreviated timeframe.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Visual Proof / UI Context */}
      <section className="py-24 border-b border-border bg-black overflow-hidden hidden md:block">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-16 items-center">
             <div className="lg:col-span-7 relative z-10">
               {/* Decorative elements behind image */}
              <div className="absolute inset-0 bg-gradient-to-r from-brand/20 to-transparent blur-3xl opacity-20 -z-10 -translate-x-10 translate-y-10"></div>
              <div className="bg-[#050505] border border-border p-2 sm:p-4 rounded-xl shadow-2xl">
                <img src="/screenshots/calendar.png" alt="Adaptive tactical calendar showing dynamic rescheduling of a missed training session." className="w-full h-auto rounded-lg border border-border/30" />
              </div>
            </div>
             <div className="lg:col-span-5 relative z-10">
              <h2 className="text-3xl font-bold text-white uppercase mb-6 tracking-tight">Tactical Schedule UI</h2>
              <p className="text-slate-400 font-light leading-relaxed mb-6">
                The calendar in RESILIENTO is not a static PDF. It is a live calculation. When a session is missed, or a day is marked as "Low Readiness," the interface instantly rebuilds the remainder of the week's tactical grid to safely absorb the disruption. 
              </p>
              <ul className="space-y-3 font-mono text-[10px] tracking-widest uppercase text-slate-500">
                <li className="flex items-center gap-3"><span className="w-1 h-1 bg-brand rounded-full"></span> Automatic CSS Volume Redistribution</li>
                <li className="flex items-center gap-3"><span className="w-1 h-1 bg-brand rounded-full"></span> Conflict Avoidance Mechanics</li>
                <li className="flex items-center gap-3"><span className="w-1 h-1 bg-brand rounded-full"></span> Acute/Chronic Load Preservation</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Adaptive Architecture Framework */}
      <section className="py-24 border-b border-border bg-surface">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-20 text-center max-w-3xl mx-auto">
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white mb-6 uppercase">
              The Hierarchy of Adaptation
            </h2>
            <p className="text-lg text-slate-400 max-w-3xl font-light">
              Consistency is not about flawless execution. The athletes who make the most progress are rarely the ones who heroically execute a perfect 16-week block. They are the ones who string together B+ weeks for 3 years straight.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-0 border border-border">
            <div className="p-12 border-r border-border border-b sm:border-b-0 hover:bg-black transition-colors">
              <div className="text-slate-600 font-mono text-[10px] tracking-widest uppercase mb-4">Level 1 - Flawed</div>
              <h4 className="text-xl font-bold text-white uppercase mb-4 tracking-tight">Truncating</h4>
              <p className="text-slate-500 font-light text-sm leading-relaxed">
                Stopping a workout halfway through because you ran out of time. You often bypass the core main set entirely or skip the critical cooldown clearing lactate. This means you absorb the fatigue of getting dressed and warming up, without actually earning the specific physiological adaptation.
              </p>
            </div>
            <div className="p-12 border-r border-border border-b sm:border-b-0 hover:bg-black transition-colors">
               <div className="text-slate-600 font-mono text-[10px] tracking-widest uppercase mb-4">Level 2 - Destructive</div>
              <h4 className="text-xl font-bold text-white uppercase mb-4 tracking-tight">Skipping</h4>
              <p className="text-slate-500 font-light text-sm leading-relaxed">
                Wiping the session off the calendar entirely. You survive today, but if you do this twice in a week, the progressive overload of the mesocycle collapses. The engine's macro-level plan effectively derails, and your race volume projection drops below the safety threshold.
              </p>
            </div>
            <div className="p-12 bg-brand/5 border border-brand/30 relative hover:bg-brand/10 transition-colors">
              <div className="absolute top-0 right-0 p-4">
                <span className="w-2 h-2 rounded-full bg-brand animate-pulse block"></span>
              </div>
               <div className="text-brand font-mono text-[10px] tracking-widest uppercase mb-4">Level 3 - Optimal</div>
              <h4 className="text-xl font-bold text-white uppercase mb-4 tracking-tight">Algorithmic Adapting</h4>
              <p className="text-slate-400 font-light text-sm leading-relaxed">
                The engine actively queries the remaining week, notes the exact Training Stress Score (TSS) deficit, and mathematically restructures tomorrow's session to ingest the lost volume, substituting intervals or modifying formats without ever violating maximum daily recovery caps.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Resolution Architecture Framework Table */}
      <section className="py-24 border-b border-border bg-black">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="border border-border bg-[#050505] p-8 sm:p-12 overflow-hidden relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-brand/5 blur-3xl rounded-full"></div>
            <div className="flex items-center gap-4 mb-10">
              <span className="text-brand font-mono text-[10px] tracking-[0.2em] uppercase">Resolution Protocol Snapshot</span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border-y border-border">
              <div className="p-6 md:p-8 font-bold text-slate-400 uppercase text-sm border-b md:border-b-0 md:border-r border-border bg-surface/20">The Friction Event</div>
              <div className="p-6 md:p-8 font-bold text-brand uppercase text-sm bg-brand/5">RESILIENTO Automated Algorithm</div>
              
              {/* Row 1 */}
              <div className="p-6 md:p-8 text-sm text-slate-300 border-t border-b md:border-b-0 md:border-r border-border font-medium">Missed 2hr Weekend Long Ride</div>
              <div className="p-6 md:p-8 text-sm text-white border-t border-b md:border-b-0 border-border font-light bg-brand/5">Injects 45m Z2 active recovery into Monday; converts Thursday tempo run to high-yield threshold to safely recapture TSS.</div>
              
              {/* Row 2 */}
              <div className="p-6 md:p-8 text-sm text-slate-300 border-t border-b md:border-b-0 md:border-r border-border font-medium">Acute Sleep Disruption (HRV Drop)</div>
              <div className="p-6 md:p-8 text-sm text-white border-t border-b md:border-b-0 border-border font-light bg-brand/5">Intercepts planned VO2 Max interval swim. Downgrades session to form-focused drills to retain structural safety without zeroing the day.</div>
              
              {/* Row 3 */}
              <div className="p-6 md:p-8 text-sm text-slate-300 border-t md:border-r border-border font-medium">Repeatedly Missed Strength Blocks</div>
              <div className="p-6 md:p-8 text-sm text-white border-t border-border font-light bg-brand/5">Triggers Horizon Re-Projection. Lowers projected 1RM targets; recalculates entirely new mesocycle ramp rate grounded in reality.</div>
            </div>
          </div>
        </div>
      </section>

      {/* Comprehensive FAQ Section */}
      <section className="py-24 border-b border-border bg-black">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-white uppercase">Planner FAQ</h2>
          </div>
          
          <div className="space-y-10">
            <div className="border-l-2 border-brand pl-6">
              <h3 className="text-lg font-bold text-white uppercase mb-3">If I inherently keep missing sessions, what happens?</h3>
              <p className="text-slate-400 font-light leading-relaxed">
                RESILIENTO features a protocol called <strong>Horizon Re-Projection</strong>. If the engine detects accumulated disruption exceeding a major threshold (e.g., you've consistently missed 40% of the volume over two microcycles), it mathematically accepts that you are off the original trajectory. It automatically shifts the peaking curve and rebuilds the macrocycle closer to your reality, so you aren't perpetually drowning in unattainable load targets.
              </p>
            </div>
            <div className="border-l-2 border-border pl-6 hover:border-brand transition-colors">
              <h3 className="text-lg font-bold text-white uppercase mb-3">Does an adaptive plan mean I can be lazy?</h3>
              <p className="text-slate-400 font-light leading-relaxed">
                No. It means zero guesswork when uncontrollable events happen. It relies completely on your discipline to execute the newly adjusted load. If you consistently skip sessions out of apathy, the engine will inevitably de-load your structural expectations entirely to keep you safe from over-reaching when you finally do train.
              </p>
            </div>
            <div className="border-l-2 border-border pl-6 hover:border-brand transition-colors">
              <h3 className="text-lg font-bold text-white uppercase mb-3">Does it adapt strength sessions as well as endurance?</h3>
              <p className="text-slate-400 font-light leading-relaxed">
                Yes. Because it functions as a single <Link href="/hybrid-training-engine" className="text-brand hover:underline">Hybrid Engine</Link>, missing a heavy structural strength day might cause the planner to convert a high-intensity run interval tomorrow into an aerobic recovery run simply to make room for the rescheduled barbell strength block. That is the power of a unified system.
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
            Stop letting a missed Tuesday morning ruin your entire training block. The most successful athletes are the most adaptable.
          </p>
          <Link 
            href="/waitlist" 
            className="group relative inline-flex items-center justify-between border-2 border-brand bg-brand/5 px-10 py-5 hover:bg-brand transition-colors shadow-[0_0_20px_rgba(255,255,255,0.05)] hover:shadow-brand/20"
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
