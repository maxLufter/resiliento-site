import Link from "next/link";
import Image from "next/image";

export const metadata = {
  title: "Structural Mobility for Athletes | RESILIENTO",
  description: "Why random stretching fails, and how athletes use integrated, context-aware mobility to improve position tolerance, movement quality, and durability.",
};

export default function MobilityPage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative pt-32 pb-24 border-b border-border overflow-hidden">
        <div className="absolute top-1/4 left-[10%] w-[1px] h-screen bg-gradient-to-b from-brand/20 to-transparent transform -rotate-45 opacity-50 pointer-events-none" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10 w-full mt-12">
          <div className="max-w-4xl">
            <div className="flex items-center gap-4 mb-8">
              <div className="h-[2px] w-12 bg-brand"></div>
              <span className="text-brand text-[11px] font-mono tracking-[0.3em] uppercase">Core Concept 03</span>
            </div>
            <h1 className="text-4xl sm:text-6xl font-bold tracking-tighter text-white mb-8 uppercase leading-[1]">
              Mobility Is Not <br/> A Cool-Down.
            </h1>
            <p className="text-xl sm:text-2xl text-slate-400 leading-[1.6] font-light max-w-3xl">
              Randomly pulling on your hamstrings after a hard session achieves nothing. True mobility is an engineered intervention designed to restore position tolerance, movement quality, and structural durability.
            </p>
          </div>
        </div>
      </section>

      {/* The Problem with Random Stretching */}
      <section className="py-24 border-b border-border bg-surface">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-8 uppercase">
                The Waste of Random Stretching
              </h2>
              <div className="prose prose-invert prose-brand max-w-none text-slate-300 font-light leading-relaxed">
                <p>
                  For the vast majority of endurance and hybrid athletes, mobility is an afterthought—a quick 5-minute routine performed out of a vague sense of guilt at the end of a workout. This unstructured, passive approach yields almost zero long-term neuromuscular adaptation.
                </p>
                <p>
                  Passive stretching without context does not fix biomechanical restrictions. To actually improve position tolerance (e.g. staying low on a TT bike without destroying your lower back) or movement quality (e.g. maintaining a healthy hip extension during hour three of a marathon), mobility must be highly specific.
                </p>
                <p>
                  It must address the actual deficits created by your primary sport, and it must counteract the posture you hold during your workday.
                </p>
              </div>
            </div>
            
            <div className="bg-[#050505] border border-border flex flex-col items-center justify-center relative overlow-hidden rounded-xl shadow-2xl shadow-brand/10 p-2 sm:p-4">
               <img src="/screenshots/movement.png" alt="Detailed neuromuscular breakdown for corrective exercise" className="object-cover w-full h-auto rounded-lg border border-border/50" />
               <div className="mt-4 text-[10px] font-mono text-slate-500 uppercase tracking-widest text-center">
                 Engine-prescribed corrective movement
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Context-Aware Modalities */}
      <section className="py-24 border-b border-border bg-black">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-6 uppercase">
              Activation vs. Restoration
            </h2>
            <p className="text-lg text-slate-400 max-w-3xl font-light">
              Because RESILIENTO is a <Link href="/hybrid-training-engine" className="text-brand hover:underline">Hybrid Engine</Link>, it knows your current fatigue state. Doing a deep 40-minute tissue restoration session immediately before a heavy deadlift block is dangerous. Mobility only works when it respects the context of the training block.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-0 border border-border">
            <div className="p-10 border-r border-border border-b sm:border-b-0 hover:bg-surface transition-colors">
              <div className="flex items-center gap-3 mb-6 font-mono text-[10px] tracking-widest uppercase text-brand">
                <span className="w-2 h-2 bg-brand rounded-full"></span> High Readiness State
              </div>
              <h4 className="text-xl font-bold text-white uppercase mb-4 tracking-tight">Brief Activation</h4>
              <p className="text-slate-500 font-light text-sm leading-relaxed">
                When you are fresh and about to tackle an intense session, mobility is prescribed as "Brief Activation." The goal is not to lengthen tissues, but to neurologically switch on dormant muscle groups (like the glute medius) and open up joint capsules just enough to allow full range of motion during the imminent heavy load.
              </p>
            </div>
            <div className="p-10 hover:bg-surface transition-colors">
              <div className="flex items-center gap-3 mb-6 font-mono text-[10px] tracking-widest uppercase text-slate-500">
                <span className="w-2 h-2 bg-slate-500 rounded-full"></span> High Fatigue / Recovery State
              </div>
              <h4 className="text-xl font-bold text-white uppercase mb-4 tracking-tight">Longer Restoration</h4>
              <p className="text-slate-500 font-light text-sm leading-relaxed">
                When your subjective fatigue is high or you are on a designated rest day, the engine allocates time for "Longer Restoration." This involves deep tissue quality work, prolonged isometric holds, and down-regulating the central nervous system to clear accumulated biomechanical distress.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Sport Examples */}
      <section className="py-24 border-b border-border bg-surface">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
           <div className="mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-6 uppercase">
              Sport-Specific Deficits
            </h2>
            <p className="text-lg text-slate-400 max-w-3xl font-light">
              A generic yoga routine won't fix the damage done by hundreds of miles on a bike saddle. Here is what targeted structural work actually looks like.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-black border border-border p-6 hover:border-brand/50 transition-colors">
              <h3 className="text-lg font-bold text-white uppercase mb-2">The Triathlete</h3>
              <p className="text-slate-400 text-sm font-light">
                Requires intense thoracic spine extension work to counteract the severely flexed aero-bar position, allowing the lungs to fully expand during the run.
              </p>
            </div>
            <div className="bg-black border border-border p-6 hover:border-brand/50 transition-colors">
              <h3 className="text-lg font-bold text-white uppercase mb-2">The Runner</h3>
              <p className="text-slate-400 text-sm font-light">
                Needs concentrated ankle dorsiflexion and calf release tracking. A locked ankle forces the knee and hip to absorb massive, unintended shock.
              </p>
            </div>
            <div className="bg-black border border-border p-6 hover:border-brand/50 transition-colors">
              <h3 className="text-lg font-bold text-white uppercase mb-2">The Strength Hybrid</h3>
              <p className="text-slate-400 text-sm font-light">
                Requires hip rotation and anterior chain lengthening. Heavy squatting combined with cycling creates impenetrable tightness in the hips that will inevitably refer to the lower back.
              </p>
            </div>
            <div className="bg-black border border-border p-6 hover:border-brand/50 transition-colors">
              <h3 className="text-lg font-bold text-white uppercase mb-2">The Desk Athlete</h3>
              <p className="text-slate-400 text-sm font-light">
                If you sit for 9 hours before training, your glutes are amnesic. Pre-session activation is mandatory to keep the hamstrings from tearing during sprints.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 border-b border-border bg-black">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-white uppercase">Mobility FAQ</h2>
          </div>
          
          <div className="space-y-8">
            <div className="border-b border-border pb-8">
              <h3 className="text-xl font-bold text-white uppercase mb-3">Do I need equipment?</h3>
              <p className="text-slate-400 font-light leading-relaxed">
                Baseline work requires nothing but floor space. Advanced restorative protocols use simple tools like a foam roller, lacrosse ball, or resistance band to dig into deeper fascial tissue.
              </p>
            </div>
            <div className="border-b border-border pb-8">
              <h3 className="text-xl font-bold text-white uppercase mb-3">Is this just yoga?</h3>
              <p className="text-slate-400 font-light leading-relaxed">
                No. Yoga is an excellent general practice, but it is not inherently sport-specific. Engine-prescribed mobility is targeted, systematic damage-control for the exact movements you performed earlier in the day.
              </p>
            </div>
            <div className="border-b border-border pb-8">
              <h3 className="text-xl font-bold text-white uppercase mb-3">How long does it take?</h3>
              <p className="text-slate-400 font-light leading-relaxed">
                Activation phases are intentionally fast—usually 5 to 8 minutes. Restoration phases are slightly longer (15-20 minutes) but are only prompted when the engine identifies a recovery window that supports it.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 bg-[#030303]">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tighter text-white mb-6 uppercase">
            Build A Bulletproof Chassis.
          </h2>
          <p className="text-xl text-slate-400 font-light mb-10 max-w-2xl mx-auto">
            Stop waiting until you're injured to work on tissue quality. Integrate protective movement into the daily engine.
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
