import Link from "next/link";
import Image from "next/image";

export const metadata = {
  title: "RESILIENTO App | Structural Mobility Engine",
  description: "Why random stretching fails hybrid athletes. Learn how to use integrated, context-aware mobility to improve position tolerance, movement quality, and structural durability.",
};

export default function MobilityPage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative pt-32 pb-24 border-b border-border overflow-hidden">
        <div className="absolute top-1/4 left-[10%] w-[1px] h-screen bg-gradient-to-b from-brand/20 to-transparent transform -rotate-45 opacity-50 pointer-events-none" />
        <div className="absolute top-1/3 right-[15%] w-[1px] h-screen bg-gradient-to-t from-brand/30 to-transparent transform rotate-45 opacity-20 pointer-events-none" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10 w-full mt-12">
          <div className="max-w-4xl">
            <div className="flex items-center gap-4 mb-8">
              <div className="h-[2px] w-12 bg-brand"></div>
              <span className="text-brand text-[11px] font-mono tracking-[0.3em] uppercase">Core Concept 03</span>
            </div>
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tighter text-white mb-8 uppercase leading-[0.9]">
              The RESILIENTO <br/> Mobility Engine
            </h1>
            <p className="text-xl sm:text-2xl text-slate-400 leading-[1.6] font-light max-w-3xl">
              Randomly pulling on your hamstrings after a hard session achieves nothing. True structural mobility is an engineered intervention designed specifically to restore position tolerance, movement quality, and durability for hybrid athletes.
            </p>
          </div>
        </div>
      </section>

      {/* The Problem with Random Stretching Grid Context */}
      <section className="py-24 border-b border-border bg-surface">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-8 uppercase">
                The Waste of Random Stretching
              </h2>
              <div className="prose prose-invert prose-brand max-w-none text-slate-300 font-light leading-relaxed">
                <p className="text-lg">
                  For the vast majority of triathletes and endurance runners, mobility is an afterthought—a quick routine performed out of a vague sense of guilt at the end of a grueling track session or long swim. This unstructured, passive approach yields almost zero long-term neuromuscular adaptation.
                </p>
                <p>
                  Passive stretching without context does not fix biomechanical restrictions. To actually improve <strong>position tolerance</strong> (e.g., staying low on a TT bike without destroying your lower back) or <strong>movement quality</strong> (e.g., maintaining healthy hip extension during hour three of a marathon), mobility must be highly specific.
                </p>
                <p>
                  A generic yoga routine won't fix the damage done by hundreds of miles on a bike saddle. It must address the exact deficits created by your primary sport, and it must counteract the posture you actively hold during your workday.
                </p>
              </div>
            </div>
            
             <div className="space-y-6">
                <div className="bg-[#050505] border border-border flex flex-col items-center justify-center relative overlow-hidden rounded-xl shadow-2xl p-2 sm:p-4 hover:border-brand/50 transition-colors">
                  <img src="/screenshots/movement.png" alt="Detailed neuromuscular breakdown for corrective exercise, engine-prescribed" className="object-cover w-full h-auto rounded-lg border border-border/50" />
                  <div className="mt-4 pb-2 text-[10px] font-mono text-slate-500 uppercase tracking-widest text-center">
                    Engine-Prescribed Corrective Breakdown
                  </div>
                </div>
            </div>
          </div>
        </div>
      </section>

      {/* Context-Aware Modalities - Deep Logic */}
      <section className="py-24 border-b border-border bg-black">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-20 text-center max-w-3xl mx-auto">
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white mb-6 uppercase">
              Activation vs. Restoration
            </h2>
            <p className="text-lg text-slate-400 font-light">
              Because RESILIENTO functions as a single <Link href="/hybrid-training-engine" className="text-brand hover:underline">Hybrid Engine</Link>, it knows your current systemic physiological and muscular fatigue state. Doing a deep 40-minute tissue restoration session immediately before a heavy deadlift block is biologically counter-productive. Mobility only works when it respects the context of the schedule.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="border border-border p-12 bg-surface/30 hover:bg-surface transition-colors">
              <div className="flex items-center gap-3 mb-6 font-mono text-[10px] tracking-widest uppercase text-brand">
                <span className="w-2 h-2 bg-brand animate-pulse"></span> Validated Readiness
              </div>
              <h4 className="text-2xl font-bold text-white uppercase mb-4 tracking-tight">Phase 1: Brief Activation</h4>
               <p className="text-slate-400 font-light text-sm leading-relaxed mb-6">
                When you are fresh and about to tackle an intense training session, mobility operates as "Brief Activation." 
              </p>
              <div className="bg-black border border-border p-5">
                <strong className="block text-white mb-2 text-sm uppercase font-mono tracking-widest text-[10px]">The Goal</strong>
                <p className="text-slate-500 text-sm leading-relaxed">
                  The objective is not to lengthen tissues, which can reduce explosive capacity. The objective is to neurologically switch on dormant muscle groups (like the glute medius) and lubricate joint capsules just enough to allow full, safe range-of-motion during the imminent heavy lifting load. Execution time: 5-8 minutes.
                </p>
              </div>
            </div>

            <div className="border border-border p-12 bg-surface/30 hover:bg-surface transition-colors">
              <div className="flex items-center gap-3 mb-6 font-mono text-[10px] tracking-widest uppercase text-slate-500">
                <span className="w-2 h-2 bg-slate-500"></span> High Fatigue State
              </div>
              <h4 className="text-2xl font-bold text-white uppercase mb-4 tracking-tight">Phase 2: Longer Restoration</h4>
               <p className="text-slate-400 font-light text-sm leading-relaxed mb-6">
                When your subjective fatigue is severely high, or you are on a designated system rest day, the engine switches logic.
              </p>
               <div className="bg-black border border-border p-5">
                <strong className="block text-white mb-2 text-sm uppercase font-mono tracking-widest text-[10px]">The Goal</strong>
                <p className="text-slate-500 text-sm leading-relaxed">
                  The engine dynamically allocates formal time for "Longer Restoration." This involves deep tissue quality work, prolonged isometric holds, and down-regulating the central nervous system to clear accumulated biomechanical distress. Execution time: 15-25 minutes.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Real-World Sport Specificity Grid */}
      <section className="py-24 border-b border-border bg-surface">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
           <div className="mb-16 max-w-3xl">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-6 uppercase">
              Addressing Sport-Specific Deficits
            </h2>
            <p className="text-lg text-slate-400 font-light">
              We look at mobility as a structural counteractant. Here is what targeted integration means in practice for different athlete profiles.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-black border border-border p-8 hover:border-brand/50 transition-colors shadow-lg h-full flex flex-col">
              <h3 className="text-xl font-bold text-white uppercase mb-4">The Triathlete</h3>
              <p className="text-slate-400 text-sm font-light leading-relaxed flex-1">
                The Aero position is devastating to posture. Triathletes explicitly require intense thoracic spine extension work to counteract the severely flexed position, allowing the lungs to fully expand during the run immediately following the bike.
              </p>
            </div>
            <div className="bg-black border border-border p-8 hover:border-brand/50 transition-colors shadow-lg h-full flex flex-col">
              <h3 className="text-xl font-bold text-white uppercase mb-4">The Runner</h3>
              <p className="text-slate-400 text-sm font-light leading-relaxed flex-1">
                Runners need uncompromising ankle dorsiflexion and calf release tracking. A locked ankle forces the knee and hip to absorb massive, unintended shock at high frequencies, eventually resulting in IT band or patellar failures.
              </p>
            </div>
            <div className="bg-black border border-border p-8 hover:border-brand/50 transition-colors shadow-lg h-full flex flex-col">
              <h3 className="text-xl font-bold text-white uppercase mb-4">The Strength Hybrid</h3>
              <p className="text-slate-400 text-sm font-light leading-relaxed flex-1">
                A powerlifter moving into endurance requires extreme hip rotation and anterior chain lengthening. Heavy squatting combined with cycling creates an impenetrable tightness in the hips that will inevitably refer structural pain to the lower back.
              </p>
            </div>
            <div className="bg-black border border-border p-8 hover:border-brand/50 transition-colors shadow-lg h-full flex flex-col">
              <h3 className="text-xl font-bold text-white uppercase mb-4">The Desk Athlete</h3>
              <p className="text-slate-400 text-sm font-light leading-relaxed flex-1">
                If you sit for 9 hours in an office chair before you train, your glutes are entirely amnesic. Pre-session activation is 100% mandatory to prevent the hamstrings from absorbing out-of-phase loads and tearing during track sprints.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Kinetic Protocol Snapshot Table */}
      <section className="py-24 border-b border-border bg-black">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="border border-border bg-[#050505] p-8 sm:p-12 overflow-hidden relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-brand/5 blur-3xl rounded-full"></div>
            <div className="flex items-center gap-4 mb-10">
              <span className="text-brand font-mono text-[10px] tracking-[0.2em] uppercase">Kinetic Protocol Snapshot</span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border-y border-border">
              <div className="p-6 md:p-8 font-bold text-slate-400 uppercase text-sm border-b md:border-b-0 md:border-r border-border bg-surface/20">Readiness State</div>
              <div className="p-6 md:p-8 font-bold text-brand uppercase text-sm bg-brand/5">RESILIENTO Action & Mechanism</div>
              
              {/* Row 1 */}
              <div className="p-6 md:p-8 text-sm text-slate-300 border-t border-b md:border-b-0 md:border-r border-border font-medium">Pre-Session: Heavy Squat / Lift</div>
              <div className="p-6 md:p-8 text-sm text-white border-t border-b md:border-b-0 border-border font-light bg-brand/5"><strong>Phase 1 Activation (5-8 min):</strong> Ignites dormant muscle groups (glute medius) without over-lengthening tissue. Maximizes safe force production.</div>
              
              {/* Row 2 */}
              <div className="p-6 md:p-8 text-sm text-slate-300 border-t border-b md:border-b-0 md:border-r border-border font-medium">Post-Session: Long Aero Ride</div>
              <div className="p-6 md:p-8 text-sm text-white border-t border-b md:border-b-0 border-border font-light bg-brand/5"><strong>Phase 2 Restoration (15 min):</strong> Triggers aggressive thoracic spine extension protocols to structurally counteract flexed hip positioning before the run.</div>
              
              {/* Row 3 */}
              <div className="p-6 md:p-8 text-sm text-slate-300 border-t md:border-r border-border font-medium">System Rest Day / High Fatigue</div>
              <div className="p-6 md:p-8 text-sm text-white border-t border-border font-light bg-brand/5"><strong>Deep Tissue Downgrade (25-40 min):</strong> Prolonged isometric holds. Explicitly designed to clear biomechanical glue and down-regulate the CNS.</div>
            </div>
          </div>
        </div>
      </section>

      {/* Comprehensive FAQ Section */}
      <section className="py-24 border-b border-border bg-black">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-white uppercase">Mobility Framework FAQ</h2>
          </div>
          
          <div className="space-y-10">
            <div className="border-l-2 border-brand pl-6">
              <h3 className="text-lg font-bold text-white uppercase mb-3">Do I need extensive, expensive equipment?</h3>
              <p className="text-slate-400 font-light leading-relaxed">
                Baseline structural work requires nothing but clear floor space. Advanced restorative protocols use highly accessible tools like a standard foam roller, a lacrosse ball, or a heavy resistance band to dig into deeper fascial tissue when the engine identifies major restrictions.
              </p>
            </div>
            <div className="border-l-2 border-border pl-6 hover:border-brand transition-colors">
              <h3 className="text-lg font-bold text-white uppercase mb-3">Is this just yoga repackaged?</h3>
              <p className="text-slate-400 font-light leading-relaxed">
                Not remotely. Yoga is an excellent general practice, but it is not inherently sport-specific. Engine-prescribed mobility is targeted, systematic damage control designed specifically to address the exact biomechanical movements you routinely execute.
              </p>
            </div>
            <div className="border-l-2 border-border pl-6 hover:border-brand transition-colors">
              <h3 className="text-lg font-bold text-white uppercase mb-3">Does mobility scheduling interact with the planner?</h3>
              <p className="text-slate-400 font-light leading-relaxed">
                Yes. Because they are unified, if the <Link href="/adaptive-training-planner" className="text-brand hover:underline">adaptive planner</Link> recognizes that you have missed several key mobility days, it may automatically increase the restorative mobility duration requirement on your next designated rest day to prevent systemic breakdown. 
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Line */}
      <section className="py-32 bg-[#030303]">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tighter text-white mb-6 uppercase">
            Build A Bulletproof Chassis.
          </h2>
          <p className="text-xl text-slate-400 font-light mb-10 max-w-2xl mx-auto">
            Stop waiting until you're genuinely injured to work on your structural tissue quality. Integrate protective movement into the daily engine.
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
