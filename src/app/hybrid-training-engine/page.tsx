import Link from "next/link";
import Image from "next/image";

export const metadata = {
  title: "The Hybrid Training Engine Explained | RESILIENTO",
  description: "Why fragmented athlete software fails, the danger of the 'more data' trap without decision logic, and how a true hybrid training engine aligns endurance, strength, and recovery into one unified macrocycle.",
};

export default function HybridTrainingEnginePage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative pt-32 pb-24 border-b border-border overflow-hidden">
        <div className="absolute top-1/4 left-[10%] w-[1px] h-screen bg-gradient-to-b from-brand/20 to-transparent transform -rotate-45 opacity-50 pointer-events-none" />
        <div className="absolute top-1/3 right-[20%] w-[1px] h-screen bg-gradient-to-b from-brand/10 to-transparent transform rotate-45 opacity-30 pointer-events-none" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10 w-full mt-12">
          <div className="max-w-4xl">
            <div className="flex items-center gap-4 mb-8">
              <div className="h-[2px] w-12 bg-brand"></div>
              <span className="text-brand text-[11px] font-mono tracking-[0.3em] uppercase">Core Concept 01</span>
            </div>
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tighter text-white mb-8 uppercase leading-[0.9]">
              The Architecture of a <br/> Hybrid Training Engine
            </h1>
            <p className="text-xl sm:text-2xl text-slate-400 leading-[1.6] font-light max-w-3xl">
              When software treats strength, endurance, and systemic recovery as parallel universes, your body pays the toll. Here is why fragmentation breaks athletes—and what structural integration actually solves.
            </p>
          </div>
        </div>
      </section>

      {/* Introduction to the Silo Problem */}
      <section className="py-24 border-b border-border bg-surface">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-8 uppercase">
                The Fragmentation Failure
              </h2>
              <div className="prose prose-invert prose-brand max-w-none text-slate-300 font-light leading-relaxed">
                <p className="text-lg">
                  Look at your current software stack. You likely have an endurance platform dictating your runs and rides via auto-generated TSS targets, a separate app or spreadsheet managing your strength and barbell tracking, a wearable wrist-strap telling you how physically and neurologically tired you are, and a generic mobility app you open only when something already hurts.
                </p>
                <p>
                  <strong>None of these systems communicate. They are structurally blind to each other.</strong>
                </p>
                <p>
                  Your triathlon endurance app demands complex VO2 max intervals today because it has zero awareness of the heavy deadlifts you ground through yesterday evening. Your wearable flashes a red "Recovery: 24%" warning, but it doesn't plug into your training software to actually rewrite today’s track workout. 
                </p>
                <p>
                  Physical stress is systemic. You only have one Central Nervous System (CNS) and one structural chassis. But your software is siloed. When planners don't talk to logs, you become the manual load manager, forced to absorb the biomechanical and physiological collision.
                </p>
              </div>
            </div>
            
            <div className="space-y-8">
              <div className="border border-border bg-black p-8 group hover:border-brand/50 transition-colors shadow-xl">
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-brand font-mono text-[10px] tracking-[0.2em] uppercase">Interference Example A</span>
                </div>
                <h3 className="text-xl font-bold text-white uppercase mb-3">The Squat-Run Collision</h3>
                <p className="text-slate-400 font-light text-sm leading-relaxed">
                  A static marathon plan schedules a 90-minute tempo run for Thursday morning. On Wednesday night, you performed 5 sets of heavy back squats. Without a hybrid engine, the tempo run goes unchanged, and you attempt to hold a 6:45/mile pace on severely fatigued legs, risking a hamstring rupture. 
                  <br/><br/>
                  <strong>The Engine Solution:</strong> A hybrid engine detects the high-load lower-body strength session and preemptively calculates the interference effect. It buffers the run, converting it from a Tempo objective to a Z2 Aerobic volume preservation session, or shifts the heavy squat day 48 hours away from key running intensities.
                </p>
              </div>

              <div className="border border-border bg-black p-8 group hover:border-brand/50 transition-colors shadow-xl">
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-brand font-mono text-[10px] tracking-[0.2em] uppercase">Interference Example B</span>
                </div>
                <h3 className="text-xl font-bold text-white uppercase mb-3">The "More Data" Trap</h3>
                <p className="text-slate-400 font-light text-sm leading-relaxed">
                  Your smart ring registers a terrible night of sleep, a suppressed HRV, and gives you a 32% "Readiness Score." But more data is not a solution if there is no algorithmic decision logic attached. A fragmented recovery score just makes you feel guilty while you try to execute the original training plan.
                  <br/><br/>
                  <strong>The Engine Solution:</strong> An integrated training engine ingests that 32% score along with your subjective perceived exertion from yesterday, and immediately alters today's objective. It formally downgrades the session to protect your macro-level trajectory.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Unified Architecture Deep Dive */}
      <section className="py-24 border-b border-border bg-black">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-20 text-center max-w-3xl mx-auto">
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white mb-6 uppercase">
              What Defines a Real <br/> Hybrid Engine?
            </h2>
            <p className="text-lg text-slate-400 font-light">
              Integration changes how decisions are made. A true hybrid engine process load, intensity, readiness, and biomechanical stress across all disciplines simultaneously, operating on three core principles.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="border border-border p-10 bg-surface/50 hover:bg-surface transition-colors flex flex-col h-full">
              <div className="mb-8">
                <span className="flex items-center justify-center w-12 h-12 bg-black border border-border text-brand font-mono text-xl mb-6">01</span>
                <h4 className="text-xl font-bold text-white uppercase mb-4 tracking-tight">Shared Load Budgets</h4>
              </div>
              <p className="text-slate-400 font-light text-sm leading-relaxed flex-1">
                Strength and endurance draw from the exact same recovery pool. The engine enforces a unified structural load ceiling. If your triathlon run volume peaks during a "Race Build" phase, the engine automatically compresses your strength volume down to "Maintenance Archetypes." It prevents you from simultaneously chasing maximum muscular hypertrophy and maximum aerobic endurance, which biologically cancel each other out.
              </p>
            </div>

            <div className="border border-border p-10 bg-surface/50 hover:bg-surface transition-colors flex flex-col h-full">
              <div className="mb-8">
                <span className="flex items-center justify-center w-12 h-12 bg-black border border-border text-brand font-mono text-xl mb-6">02</span>
                <h4 className="text-xl font-bold text-white uppercase mb-4 tracking-tight">Contextual Re-Routing</h4>
              </div>
              <p className="text-slate-400 font-light text-sm leading-relaxed flex-1">
                Plans must survive contact with reality. A missed long ride isn't just left behind, nor is it blindly stacked onto tomorrow. The engine algorithmically redistributes the physiological target across the upcoming week without violating daily acute load thresholds.<br/><br/>
                <Link href="/adaptive-training-planner" className="text-brand hover:underline font-medium uppercase text-[10px] tracking-widest mt-2 inline-block">Explore Adaptive Planning →</Link>
              </p>
            </div>

            <div className="border border-[white/20] shadow-[0_0_30px_rgba(255,255,255,0.05)] p-10 bg-[#050505] hover:bg-surface transition-colors flex flex-col h-full relative overflow-hidden">
              <div className="absolute top-0 right-0 w-16 h-16 bg-brand/10 blur-2xl"></div>
              <div className="mb-8 relative z-10">
                <span className="flex items-center justify-center w-12 h-12 bg-black border border-brand/50 text-brand font-mono text-xl mb-6">03</span>
                <h4 className="text-xl font-bold text-white uppercase mb-4 tracking-tight">Kinetic Protection</h4>
              </div>
              <p className="text-slate-400 font-light text-sm leading-relaxed flex-1 relative z-10">
                Mobility isn't a random 15-minute stretching video on YouTube. It acts as an integrated, prescribed correction. The engine observes the accumulated fatigue generated by your primary disciplines (e.g., hundreds of miles in aero position) and prescribes targeted positional fixes to counteract that specific muscular shortening.<br/><br/>
                <Link href="/mobility-for-hybrid-athletes" className="text-brand hover:underline font-medium uppercase text-[10px] tracking-widest mt-2 inline-block">Explore Structural Mobility →</Link>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Visual Proof / UI Context */}
      <section className="py-24 border-b border-border bg-surface overflow-hidden hidden md:block">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-16 items-center">
             <div className="lg:col-span-5 relative z-10">
              <h2 className="text-3xl font-bold text-white uppercase mb-6 tracking-tight">Command Center Clarity</h2>
              <p className="text-slate-400 font-light leading-relaxed mb-6">
                A hybrid engine lives and dies by its interface. The RESILIENTO dashboard synthesizes the chaotic data of concurrent training into a single, decisive output stream: Fitness (CTL), Fatigue (ATL), and Form (TSB) mapped perfectly against your upcoming race targets.
              </p>
              <ul className="space-y-3 font-mono text-[10px] tracking-widest uppercase text-slate-500">
                <li className="flex items-center gap-3"><span className="w-1 h-1 bg-brand rounded-full"></span> Continuous Load Tracking</li>
                <li className="flex items-center gap-3"><span className="w-1 h-1 bg-brand rounded-full"></span> Multi-Discipline Aggregation</li>
                <li className="flex items-center gap-3"><span className="w-1 h-1 bg-brand rounded-full"></span> Physiological Forecasting</li>
              </ul>
            </div>
            <div className="lg:col-span-7 relative">
              {/* Decorative elements behind image */}
              <div className="absolute inset-0 bg-gradient-to-r from-brand/20 to-transparent blur-3xl opacity-20 -z-10 translate-x-10 translate-y-10"></div>
              <div className="bg-[#050505] border border-border p-2 sm:p-4 rounded-xl shadow-2xl">
                <img src="/screenshots/dashboard.png" alt="RESILIENTO engine dashboard displaying aggregated acute and chronic workload ratios for concurrent training." className="w-full h-auto rounded-lg border border-border/30" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Extreme Use-Case / Athlete Scenarios */}
      <section className="py-24 border-b border-border bg-black">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
           <div className="mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-6 uppercase">
              Designed for Severe Requirements
            </h2>
            <p className="text-lg text-slate-400 max-w-3xl font-light">
              Generic templates work fine for people who only run three days a week. The Hybrid Engine is built for athletes pushing the limits of physiological interference.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-8">
            <div className="border border-border p-8 hover:border-brand/30 transition-colors">
              <h3 className="text-xl font-bold text-white uppercase mb-2">The 70.3 + Powerlifting Hybrid</h3>
              <p className="text-slate-400 text-sm font-light leading-relaxed mb-4">
                Attempting to maintain a 500lb deadlift while building base volume for a Half-Ironman means your CNS is constantly under assault. The engine staggers peak strength blocks against lower-intensity aerobic build weeks, ensuring you aren't attempting to hit maximum wattage on the bike the day after maximum absolute strength outputs.
              </p>
            </div>
            <div className="border border-border p-8 hover:border-brand/30 transition-colors">
              <h3 className="text-xl font-bold text-white uppercase mb-2">The Tactical / First Responder</h3>
              <p className="text-slate-400 text-sm font-light leading-relaxed mb-4">
                Your schedule is unpredictable, and shift-work destroys sleep recovery metrics. You need high relative strength and elite work capacity. The engine reads the suppressed HRV from a 24-hour shift and immediately pivots a scheduled threshold-run into an active recovery row and mobility block, protecting your immune system.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Comprehensive FAQ Section */}
      <section className="py-24 border-b border-border bg-surface">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-white uppercase">Hybrid Engine FAQ</h2>
          </div>
          
          <div className="space-y-10">
            <div className="border-l-2 border-brand pl-6">
              <h3 className="text-lg font-bold text-white uppercase mb-3">Is this just for elite triathletes?</h3>
              <p className="text-slate-400 font-light leading-relaxed">
                No. It is built for any athlete managing concurrent training stress. Whether you are a dedicated powerlifter looking to run an ultra-marathon, a tactical athlete, or a cyclist trying to maintain upper body mass, the engine prevents the structural collision of conflicting adaptations.
              </p>
            </div>
            <div className="border-l-2 border-border pl-6 hover:border-brand transition-colors">
              <h3 className="text-lg font-bold text-white uppercase mb-3">How does it handle my wearable data?</h3>
              <p className="text-slate-400 font-light leading-relaxed">
                It pairs your subjective fatigue inputs (how you actually feel) with objective markers (resting HR, HRV trends) to dictate the daily load state (Go, Compress, Downgrade, Recovery). Data acts as an input for the algorithm, driving real-time scheduling changes. It is not just a passive dashboard widget.
              </p>
            </div>
            <div className="border-l-2 border-border pl-6 hover:border-brand transition-colors">
              <h3 className="text-lg font-bold text-white uppercase mb-3">Can I still do my own custom strength program?</h3>
              <p className="text-slate-400 font-light leading-relaxed">
                RESILIENTO provides highly structured strength archetypes that must dynamically adjust to your endurance blocks. While you can swap specific biomechanical movements (e.g., swapping a barbell back squat for a safety-bar squat), modifying the core phase-volume blocks manually breaks the integrated load calculation. The entire point of the engine is that everything must remain unified.
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
            Experience the only architecture systematically built to handle the catastrophic friction of concurrent hybrid training.
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
