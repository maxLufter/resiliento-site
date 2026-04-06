import Link from "next/link";

export const metadata = {
  title: "The Hybrid Training Engine | RESILIENTO",
  description: "Why fragmented athlete software fails, the danger of the 'more data' trap without decision logic, and how a true hybrid training engine aligns endurance, strength, and recovery.",
};

export default function HybridTrainingEnginePage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative pt-32 pb-24 border-b border-border overflow-hidden">
        <div className="absolute top-1/4 left-[10%] w-[1px] h-screen bg-gradient-to-b from-brand/20 to-transparent transform -rotate-45 opacity-50 pointer-events-none" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10 w-full mt-12">
          <div className="max-w-4xl">
            <div className="flex items-center gap-4 mb-8">
              <div className="h-[2px] w-12 bg-brand"></div>
              <span className="text-brand text-[11px] font-mono tracking-[0.3em] uppercase">Core Concept 01</span>
            </div>
            <h1 className="text-4xl sm:text-6xl font-bold tracking-tighter text-white mb-8 uppercase leading-[1]">
              The Case for a <br/> Hybrid Training Engine
            </h1>
            <p className="text-xl sm:text-2xl text-slate-400 leading-[1.6] font-light max-w-3xl">
              When software treats strength, endurance, and recovery as parallel universes, your body pays the toll. Here is why fragmentation breaks athletes—and what real integration looks like.
            </p>
          </div>
        </div>
      </section>

      {/* The Problem with Fragmentation */}
      <section className="py-24 border-b border-border bg-surface">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-8 uppercase">
                The Fragmentation Failure
              </h2>
              <div className="prose prose-invert prose-brand max-w-none text-slate-300 font-light leading-relaxed">
                <p>
                  Look at your current software stack. You likely have an endurance platform dictating your runs and rides, a separate app or spreadsheet managing your lifts, a wearable telling you how tired you are, and maybe a generic mobility app. 
                </p>
                <p>
                  None of these systems communicate. They are structurally blind to each other. Your endurance app demands complex threshold intervals today because it has zero awareness of the heavy deadlifts you ground through yesterday. 
                </p>
                <p>
                  <strong>Physical stress is systemic, but your software is siloed.</strong> When planners don't talk to logs, you become the manual load manager, forced to absorb the biomechanical collision.
                </p>
              </div>
            </div>
            
            <div className="space-y-8">
              <div className="border border-border bg-black p-8 group hover:border-brand/50 transition-colors">
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-brand font-mono text-[10px] tracking-[0.2em] uppercase">Failure Mode A</span>
                </div>
                <h3 className="text-xl font-bold text-white uppercase mb-3">The Squat-Run Collision</h3>
                <p className="text-slate-400 font-light text-sm leading-relaxed">
                  A static triathlon plan schedules a 90-minute tempo run on Thursday. On Wednesday, you performed 5 sets of heavy back squats. Without a hybrid engine, the run goes unchanged. With a hybrid engine, the interference effect is calculated automatically—buffering the heavy leg day away from high-intensity running, or modifying the target pacing to account for residual neuromuscular fatigue.
                </p>
              </div>

              <div className="border border-border bg-black p-8 group hover:border-brand/50 transition-colors">
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-brand font-mono text-[10px] tracking-[0.2em] uppercase">Failure Mode B</span>
                </div>
                <h3 className="text-xl font-bold text-white uppercase mb-3">The "More Data" Trap</h3>
                <p className="text-slate-400 font-light text-sm leading-relaxed">
                  Your wearable flashes a red "32% Recovery" score. But more data is not a solution if there is no decision logic attached. A fragmented recovery score just makes you feel guilty. An integrated training engine ingests that 32% score and immediately alters today's objective—downgrading a VO2 max session to Z2 aerobic volume to protect your systemic readiness.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Integrated Architecture */}
      <section className="py-24 border-b border-border bg-black">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-6 uppercase">
              What Defines a Hybrid Engine?
            </h2>
            <p className="text-lg text-slate-400 max-w-3xl font-light">
              Integration changes how decisions are made. A hybrid engine processes load, intensity, readiness, and biomechanical stress across all disciplines simultaneously.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-0 border border-border">
            <div className="p-10 border-r border-border border-b sm:border-b-0 hover:bg-surface transition-colors">
              <h4 className="text-lg font-bold text-white uppercase mb-4 tracking-tight">Shared Load Budgets</h4>
              <p className="text-slate-500 font-light text-sm leading-relaxed">
                Strength and endurance draw from the same Central Nervous System. The engine enforces a unified structural load ceiling. If run volume peaks, strength volume automatically compresses to maintenance archetypes.
              </p>
            </div>
            <div className="p-10 border-r border-border border-b sm:border-b-0 hover:bg-surface transition-colors">
              <h4 className="text-lg font-bold text-white uppercase mb-4 tracking-tight">Contextual Recovery</h4>
              <p className="text-slate-500 font-light text-sm leading-relaxed">
                A missed long ride isn't just left behind. The engine algorithmically redistributes the physiological target across the upcoming week without violating daily acute load thresholds.
                <br/>
                <Link href="/adaptive-training-planner" className="text-brand hover:underline mt-4 inline-block font-medium">Read about Adaptive Planning →</Link>
              </p>
            </div>
            <div className="p-10 hover:bg-surface transition-colors">
              <h4 className="text-lg font-bold text-white uppercase mb-4 tracking-tight">Kinetic Protection</h4>
              <p className="text-slate-500 font-light text-sm leading-relaxed">
                Mobility isn't a random 15-minute stretching video. It acts as an integrated correction. The engine prescribes specific positional fixes based on the accumulated fatigue generated by your primary disciplines.
                <br/>
                <Link href="/mobility-for-hybrid-athletes" className="text-brand hover:underline mt-4 inline-block font-medium">Read about Structural Mobility →</Link>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 border-b border-border bg-surface">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-white uppercase">Engine FAQ</h2>
          </div>
          
          <div className="space-y-8">
            <div className="border-b border-border pb-8">
              <h3 className="text-xl font-bold text-white uppercase mb-3">Is this just for triathletes?</h3>
              <p className="text-slate-400 font-light leading-relaxed">
                No. It is built for any athlete managing concurrent training stress. Whether you are a powerlifter running ultra-marathons, a tactical athlete, or a cyclist trying to maintain upper body mass, the engine prevents the structural collision of conflicting adaptations.
              </p>
            </div>
            <div className="border-b border-border pb-8">
              <h3 className="text-xl font-bold text-white uppercase mb-3">How does it handle wearable data?</h3>
              <p className="text-slate-400 font-light leading-relaxed">
                It uses subjective fatigue inputs paired with objective markers (resting HR, HRV trends) to dictate the daily load state (Go, Compress, Downgrade, Recovery). Data is an input for the algorithm, not just a dashboard widget.
              </p>
            </div>
            <div className="border-b border-border pb-8">
              <h3 className="text-xl font-bold text-white uppercase mb-3">Can I still do my own strength program?</h3>
              <p className="text-slate-400 font-light leading-relaxed">
                RESILIENTO provides structured strength archetypes that dynamically adjust to your endurance blocks. While you can swap specific movements, replacing the core volume blocks breaks the load calculation. The entire point of the engine is that everything must remain unified.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 bg-[#030303]">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tighter text-white mb-6 uppercase">
            Stop Training In Silos.
          </h2>
          <p className="text-xl text-slate-400 font-light mb-10 max-w-2xl mx-auto">
            Experience the only architecture built specifically to handle the demands of concurrent hybrid training.
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
