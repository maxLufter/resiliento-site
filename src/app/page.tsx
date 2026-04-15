import Link from "next/link";
import { WaitlistForm } from "@/components/WaitlistForm";
import { MovementVisualizer } from "@/components/MovementVisualizer";
import { ExpandableCard } from "@/components/ExpandableCard";
import { ExpandableListItem } from "@/components/ExpandableListItem";
import { SoftwareApplicationJsonLd, FAQJsonLd } from "@/components/StructuredData";

const landingFaqs = [
  {
    question: "What makes RESILIENTO an adaptive training plan?",
    answer: "Unlike static PDF plans, RESILIENTO is a dynamic engine. It monitors your daily HRV, subjective readiness, and past training load. If you are fatigued or miss a session, the system automatically recalculates your upcoming workouts, compressing intervals or shifting rest days to keep you on tracking without overtraining."
  },
  {
    question: "Can it handle hybrid training (running and lifting together)?",
    answer: "Yes. RESILIENTO was built specifically for concurrent training. It mathematically buffers your high-intensity track days away from heavy lower-body lifts, reducing interference and allowing you to build aerobic capacity while maintaining strength."
  },
  {
    question: "Does it work for Triathlon and HYROX?",
    answer: "Absolutely. We have specific modules for both. The Triathlon module coordinates swim, bike, and run while injecting structural maintenance strength. The HYROX module focuses on sled conditioning, compromise running, and wall balls, preparing you specifically for the race demands."
  }
];
export default function Home() {
  return (
    <div className="flex flex-col">
      <SoftwareApplicationJsonLd specificDescription="The adaptive training app for modern athletes. Unifying triathlon, running, HYROX, strength, and mobility into one single framework." />
      <FAQJsonLd faqs={landingFaqs} />
      {/* Hero Section */}
      <section className="relative pt-40 pb-20 sm:pt-48 sm:pb-32 overflow-hidden border-b border-border">
        {/* Abstract structural graphics */}
        <div className="absolute top-1/4 right-[10%] w-[1px] h-screen bg-gradient-to-b from-brand/20 to-transparent transform rotate-45 opacity-50 pointer-events-none" />
        <div className="absolute top-1/3 right-[15%] w-[1px] h-screen bg-gradient-to-b from-brand/20 to-transparent transform rotate-45 opacity-20 pointer-events-none" />
        
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="max-w-5xl">
            <div className="flex items-center gap-4 mb-16">
              <div className="h-[2px] w-16 bg-brand"></div>
              <span className="text-brand text-[11px] font-mono tracking-[0.3em] uppercase">Status: Closed Cohort V1.0</span>
            </div>
            
            <h1 className="text-5xl sm:text-7xl lg:text-[8rem] font-bold tracking-tighter text-white mb-10 leading-[0.9] uppercase">
              The Hybrid <br className="hidden sm:block"/> Training Engine.
            </h1>
            
            <p className="text-lg sm:text-2xl lg:text-3xl text-slate-400 mb-10 sm:mb-16 leading-[1.6] sm:leading-[1.4] max-w-3xl font-light tracking-tight">
              The adaptive training app for triathlon, HYROX, and hybrid athletes. One system coordinating endurance, strength, mobility, and recovery with dynamic adaptation.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center gap-8">
              <Link 
                href="#waitlist" 
                className="group relative inline-flex items-center justify-between border-2 border-brand bg-brand/5 px-8 py-5 w-full sm:w-auto hover:bg-brand transition-colors"
              >
                <span className="text-[13px] font-bold tracking-[0.2em] text-white group-hover:text-black uppercase">
                  Join Waitlist
                </span>
                <span className="text-brand group-hover:text-black ml-4 transform group-hover:translate-x-1 transition-all">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* The Collision Section - Replaces Generic "Problem" Grid */}
      <section id="architecture" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 sm:py-32 lg:py-40 border-b border-border">
        <div className="grid lg:grid-cols-2 gap-12 sm:gap-16 lg:gap-24 items-start">
          <div className="lg:sticky lg:top-40">
            <h2 className="text-5xl sm:text-7xl font-bold tracking-tighter text-white uppercase leading-[0.9]">
              The <br/> Collision.
            </h2>
          </div>
          
          <div className="space-y-24">
            <div>
              <p className="text-2xl text-slate-300 leading-relaxed font-light mb-12">
                Physical stress is systemic. When your endurance planner doesn&apos;t talk to your strength log, you absorb the collision. Fragmentation breaks athletes.
              </p>
              
              <div className="space-y-12">
                <ExpandableListItem 
                  label="Failure Point 01"
                  title="Blind Pacing"
                  summary="Your HYROX or triathlon plan demands a high-intensity threshold run today. It has zero awareness of the structural damage from yesterday&apos;s heavy back squats."
                  details={
                    <>
                      <p>
                        Executing intensity domains blindly guarantees failure. The physiological cost of a heavy lower-body lifting session dramatically impairs your ability to hit VO2 Max or anaerobic threshold targets for roughly 36 to 48 hours. When you manually stack these workouts back-to-back, you aren&apos;t adapting—you are accumulating unrecoverable nervous system fatigue.
                      </p>
                      <p>
                        Our algorithm intrinsically buffers your load. It tracks the specific neuromuscular taxation generated by the strength engine, and forces a structural separation before allowing the endurance engine to prescribe high-output sprints. It&apos;s concurrent training, solved.
                      </p>
                    </>
                  }
                />

                <ExpandableListItem 
                  label="Failure Point 02"
                  title="Passive Readiness"
                  summary="Your wearable spits out a low readiness score, but lacks the architectural capability to actually rebuild tomorrow&apos;s session to match it."
                  details={
                    <>
                      <p>
                        Most apps function as expensive mirrors. They gleefully tell you that your HRV is tanked and your sleep was poor, but the static PDF training plan on your calendar still tells you to go run 20 miles. Information without action is useless.
                      </p>
                      <p>
                        RESILIENTO consumes this metabolic snapshot and immediately reacts. The engine downgrades total session volume, strips out the high-intensity intervals, and shifts the output entirely into a Zone 2 / Active Recovery protocol—automatically restructuring the remainder of your macrocycle to catch up safely on the missed load later.
                      </p>
                    </>
                  }
                />

                <ExpandableListItem 
                  label="Failure Point 03"
                  title="Schedule Fragility"
                  summary="If your 90-minute training block shrinks to 30 minutes, static plans fail. They don&apos;t know how to cleanly compress the daily physiological target."
                  details={
                    <>
                      <p>
                        A rigid plan shatters upon contact with the real world. When meetings run late and you only have 30 minutes left, blindly skipping the workout breaks your long-term periodization momentum. Chopping the end off the workout yourself means you miss the most critical speed intervals.
                      </p>
                      <p>
                        The engine solves this via <strong>Dynamic Compression</strong>. It algorithmically reduces warm-up profiles and condenses work-to-rest ratio structures, attempting to preserve the primary physiological stimulus of the day within the new compressed timeframe footprint.
                      </p>
                    </>
                  }
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Engine Mechanics - Replaces "Solution" Checklist */}
      <section className="bg-surface border-b border-border py-20 sm:py-32 lg:py-40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-24 flex items-center justify-between border-b border-border pb-12">
            <h2 className="text-5xl sm:text-7xl font-bold tracking-tighter text-white uppercase">
              The Engine.
            </h2>
            <div className="text-brand font-mono text-xs tracking-[0.2em] uppercase text-right hidden sm:block">
              Algorithmic Balancing <br/> Module Activated
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16">
            <div className="group">
              <div className="text-brand text-4xl mb-6 font-light opacity-50 group-hover:opacity-100 transition-opacity">01.</div>
              <h4 className="text-2xl text-white font-bold tracking-tight mb-4 uppercase">Dynamic Compression</h4>
              <p className="text-slate-400 text-lg font-light leading-[1.6]">
                When life abruptly halves your available time, the engine structurally compresses the session, preserving the physiological target rather than truncating it.
              </p>
            </div>
            <div className="group">
              <div className="text-brand text-4xl mb-6 font-light opacity-50 group-hover:opacity-100 transition-opacity">02.</div>
              <h4 className="text-2xl text-white font-bold tracking-tight mb-4 uppercase">Biomechanical Buffering</h4>
              <p className="text-slate-400 text-lg font-light leading-[1.6]">
                Strength and mobility aren&apos;t optional bolt-ons. They are deployed tactically to counter the exact accumulated load of your primary discipline.
              </p>
            </div>
            <div className="group">
              <div className="text-brand text-4xl mb-6 font-light opacity-50 group-hover:opacity-100 transition-opacity">03.</div>
              <h4 className="text-2xl text-white font-bold tracking-tight mb-4 uppercase">Autoregulation</h4>
              <p className="text-slate-400 text-lg font-light leading-[1.6]">
                Subjective fatigue and objective inputs immediately dictate load drops and rest days before your body breaks down physically.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 1: Autoregulation Engine */}
      <section className="py-20 sm:py-32 lg:py-40 border-b border-border bg-black">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 sm:gap-16 lg:gap-24 items-start">
            <div>
              <div className="flex items-center gap-4 mb-10">
                <div className="h-[1px] w-8 bg-brand" />
                <span className="text-brand font-mono text-[11px] tracking-[0.3em] uppercase">Module 01 — Autoregulation</span>
              </div>
              <h2 className="text-5xl sm:text-7xl font-bold tracking-tighter text-white uppercase leading-[0.9] mb-10">
                The Plan<br/>That Fights<br/>Back.
              </h2>
              <p className="text-xl text-slate-400 font-light leading-relaxed max-w-lg">
                Every other app gives you a static plan and hopes life cooperates. RESILIENTO operates on a closed-loop autoregulation model — each training day is a <span className="text-white font-medium">live decision</span>, not a pre-printed prescription.
              </p>
            </div>

            <div className="space-y-0">
              {/* Step 1 */}
              <div className="border-t border-border pt-10 pb-10 group cursor-default">
                <div className="flex items-start gap-8">
                  <div className="text-brand font-mono text-xs tracking-[0.2em] uppercase shrink-0 pt-1 opacity-60 group-hover:opacity-100 transition-opacity">01</div>
                  <div>
                    <h4 className="text-xl font-bold text-white uppercase mb-3 tracking-tight">Signal Acquisition</h4>
                    <p className="text-slate-500 font-light leading-relaxed">
                      Each morning the engine reads incoming signals — subjective fatigue score, resting HR variance, HRV trend, and last 7-day load vector. These aren&apos;t visualized for you to manually interpret. They are fed directly into the next decision.
                    </p>
                  </div>
                </div>
              </div>
              {/* Step 2 */}
              <div className="border-t border-border pt-10 pb-10 group cursor-default">
                <div className="flex items-start gap-8">
                  <div className="text-brand font-mono text-xs tracking-[0.2em] uppercase shrink-0 pt-1 opacity-60 group-hover:opacity-100 transition-opacity">02</div>
                  <div>
                    <h4 className="text-xl font-bold text-white uppercase mb-3 tracking-tight">Load Decision</h4>
                    <p className="text-slate-500 font-light leading-relaxed">
                      Based on the incoming signal state, today&apos;s session is classified as Go, Compress, Downgrade, or Recovery. This isn&apos;t a notification. This is a structural output that dictates which specific workout blocks are assembled for today.
                    </p>
                  </div>
                </div>
              </div>
              {/* Step 3 */}
              <div className="border-t border-border pt-10 pb-10 group cursor-default">
                <div className="flex items-start gap-8">
                  <div className="text-brand font-mono text-xs tracking-[0.2em] uppercase shrink-0 pt-1 opacity-60 group-hover:opacity-100 transition-opacity">03</div>
                  <div>
                    <h4 className="text-xl font-bold text-white uppercase mb-3 tracking-tight">Disruption Resolution</h4>
                    <p className="text-slate-500 font-light leading-relaxed">
                      A missed session is not skipped. It is deterministically resolved — the remaining week is algorithmically redistributed to preserve weekly TSS targets without violating acute load thresholds or over-stacking the following day.
                    </p>
                  </div>
                </div>
              </div>
              {/* Step 4 */}
              <div className="border-t border-b border-border pt-10 pb-10 group cursor-default">
                <div className="flex items-start gap-8">
                  <div className="text-brand font-mono text-xs tracking-[0.2em] uppercase shrink-0 pt-1 opacity-60 group-hover:opacity-100 transition-opacity">04</div>
                  <div>
                    <h4 className="text-xl font-bold text-white uppercase mb-3 tracking-tight">Horizon Re-Projection</h4>
                    <p className="text-slate-500 font-light leading-relaxed">
                      If accumulated disruption pushes the training block materially off-course, the macrocycle re-projects automatically. Peak week position, volume ramp rate, and race-day proximity windows are recalculated. The long-game is always protected.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Stat callouts */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-0 mt-24 border border-border">
            <div className="p-10 border-r border-border">
              <div className="text-5xl font-bold text-brand mb-3 tracking-tighter">72h</div>
              <div className="text-[11px] font-mono tracking-[0.2em] uppercase text-slate-500">Disruption Re-computation Window</div>
            </div>
            <div className="p-10 border-r border-border">
              <div className="text-5xl font-bold text-white mb-3 tracking-tighter">4</div>
              <div className="text-[11px] font-mono tracking-[0.2em] uppercase text-slate-500">Daily Load States — Go / Compress / Downgrade / Recover</div>
            </div>
            <div className="p-10">
              <div className="text-5xl font-bold text-white mb-3 tracking-tighter">0</div>
              <div className="text-[11px] font-mono tracking-[0.2em] uppercase text-slate-500">Manual re-planning required from the athlete</div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Race Architecture & Peaking */}
      <section className="py-20 sm:py-32 lg:py-40 border-b border-border bg-[#030303]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 mb-12">
            <div className="h-[1px] w-8 bg-brand" />
            <span className="text-brand font-mono text-[11px] tracking-[0.3em] uppercase">Module 02 — Race Architecture</span>
          </div>

          <div className="mb-20">
            <h2 className="text-5xl sm:text-7xl font-bold tracking-tighter text-white uppercase leading-[0.9] mb-8">
              Built For<br/>Race Day.
            </h2>
            <p data-nosnippet className="text-xl text-slate-400 font-light leading-relaxed max-w-2xl">
              Most planning tools let you enter a race date and call it structure. RESILIENTO reverse-engineers your Ironman, 70.3, or marathon build from A-Race to today — then enforces periodization, taper logic, and volume caps with mathematical precision.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-0 border border-border mb-24">
            <div className="p-12 border-r border-border hover:bg-surface transition-colors group">
              <div className="text-brand font-mono text-xs tracking-[0.3em] uppercase mb-6 opacity-60 group-hover:opacity-100 transition-opacity">A-Race Priority</div>
              <h4 className="text-2xl font-bold text-white uppercase tracking-tight mb-4">Primary Target</h4>
              <p data-nosnippet className="text-slate-500 font-light leading-relaxed">
                Your A-Race is the fixed structural anchor. All training blocks, volume peaks, and taper sequences are calculated backward from this single non-negotiable date. The entire mesocycle is shaped by proximity to it.
              </p>
            </div>
            <div className="p-12 border-r border-border hover:bg-surface transition-colors group">
              <div className="text-brand font-mono text-xs tracking-[0.3em] uppercase mb-6 opacity-60 group-hover:opacity-100 transition-opacity">B/C Race Injection</div>
              <h4 className="text-2xl font-bold text-white uppercase tracking-tight mb-4">Race-As-Stimulus</h4>
              <p data-nosnippet className="text-slate-500 font-light leading-relaxed">
                Secondary and tertiary races are treated as high-intensity stimulus events, not disruptions. The engine integrates them into the load curve — using them to drive specificity peaks without blowing the taper window for the A-Race.
              </p>
            </div>
            <div className="p-12 hover:bg-surface transition-colors group">
              <div className="text-brand font-mono text-xs tracking-[0.3em] uppercase mb-6 opacity-60 group-hover:opacity-100 transition-opacity">Automated Tapering</div>
              <h4 className="text-2xl font-bold text-white uppercase tracking-tight mb-4">Peak Expression</h4>
              <p data-nosnippet className="text-slate-500 font-light leading-relaxed">
                The taper is not a manual cutback. Volume, intensity, and density are reduced according to sport-specific physiological decay curves — engineered to land you at race morning with maximum freshness and retained fitness.
              </p>
            </div>
          </div>

          {/* Race countdown visual element */}
          <div className="border border-border bg-black p-10 sm:p-16">
            <div className="flex items-center gap-4 mb-10">
              <span className="text-[10px] font-mono tracking-[0.3em] text-brand uppercase">Macrocycle Snapshot — Example 20-Week Build</span>
            </div>
            <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
              {['Base I', 'Base II', 'Build I', 'Build II', 'Build III', 'Peak', 'Taper', 'RACE'].map((phase, i) => (
                <div key={i} className={`border p-3 sm:p-4 text-center ${i === 7 ? 'border-brand bg-brand/10' : i === 6 ? 'border-white/20' : 'border-border'}`}>
                  <div className={`text-[9px] sm:text-[10px] font-mono tracking-[0.15em] uppercase ${i === 7 ? 'text-brand' : i === 6 ? 'text-slate-300' : 'text-slate-600'}`}>{phase}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Strength & Mobility as First-Class Citizens */}
      <section className="py-20 sm:py-32 lg:py-40 border-b border-border bg-black">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 mb-12">
            <div className="h-[1px] w-8 bg-brand" />
            <span className="text-brand font-mono text-[11px] tracking-[0.3em] uppercase">Module 03 — Structural Integration</span>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 sm:gap-16 lg:gap-24 mb-24">
            <div>
              <h2 className="text-5xl sm:text-7xl font-bold tracking-tighter text-white uppercase leading-[0.9] mb-8">
                Strength<br/>Is Not<br/>Optional.
              </h2>
              <p className="text-xl text-slate-400 font-light leading-relaxed">
                Most triathlon and running apps treat strength as a sidebar. RESILIENTO runs the strength engine in parallel with the endurance planner — both systems share the same load budget, recovery model, and adaptation timeline.
              </p>
            </div>
            <div className="space-y-8 pt-4">
              <div className="border-l-2 border-brand pl-8">
                <h4 className="text-xl font-bold text-white uppercase mb-2 tracking-tight">Dedicated Strength Archetypes</h4>
                <p className="text-slate-500 font-light leading-relaxed">
                  Sessions are classified by archetype: Hypertrophy, Strength-Endurance, Neuromuscular Activation, or Maintenance. Each archetype is deployed based on where you sit in the endurance periodization cycle — not random.
                </p>
              </div>
              <div className="border-l-2 border-border hover:border-brand pl-8 transition-colors">
                <h4 className="text-xl font-bold text-white uppercase mb-2 tracking-tight">Concurrent Training Logic</h4>
                <p className="text-slate-500 font-light leading-relaxed">
                  The engine explicitly models interference effects — heavy leg strength sessions are automatically buffered from high-intensity endurance sessions. No more destroying your track workout with the residual fatigue of yesterday&apos;s deadlifts.
                </p>
              </div>
              <div className="border-l-2 border-border hover:border-brand pl-8 transition-colors">
                <h4 className="text-xl font-bold text-white uppercase mb-2 tracking-tight">Load Ceiling Enforcement</h4>
                <p className="text-slate-500 font-light leading-relaxed">
                  During peak endurance blocks, strength sessions are automatically compressed and de-loaded by the engine. During base phase, strength volume ramps alongside endurance. The two systems are permanently synchronized.
                </p>
              </div>
            </div>
          </div>

          {/* Mobility subsection */}
          <div className="border border-border bg-[#030303] grid lg:grid-cols-2 gap-0">
            <div className="p-12 border-r border-border">
              <div className="text-brand font-mono text-xs tracking-[0.3em] uppercase mb-8">Mobility — Corrective Architecture</div>
              <h3 className="text-3xl font-bold text-white uppercase tracking-tight mb-6 leading-tight">
                Corrective Work<br/>Stitched Into Training.
              </h3>
              <p className="text-slate-400 font-light leading-relaxed mb-8">
                Mobility is not a recovery section at the bottom of your plan. RESILIENTO performs a structural asymmetry assessment during onboarding — then continuously injects targeted corrective protocols into daily sessions based on your specific imbalances and accumulated sport-specific stress.
              </p>
              <div className="space-y-3">
                {['Hip Capsule Mobility', 'Thoracic Rotation', 'Ankle Dorsiflexion', 'Posterior Chain Lengthening', 'Shoulder Blade Control'].map((item) => (
                  <div key={item} className="flex items-center gap-3 text-slate-500 font-light text-sm">
                    <span className="w-1 h-1 bg-brand shrink-0" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
            <div className="p-12">
              <div className="text-brand font-mono text-xs tracking-[0.3em] uppercase mb-8">Readiness-Gated Deployment</div>
              <h3 className="text-3xl font-bold text-white uppercase tracking-tight mb-6 leading-tight">
                Context-Aware<br/>Each Day.
              </h3>
              <p className="text-slate-400 font-light leading-relaxed mb-8">
                Corrective work is not static. On high-readiness days, mobility protocols stay minimal and brief. On low-readiness, high-fatigue days, the engine promotes longer restoration sequences to front-load tissue quality work before the next hard block.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="border border-border p-5">
                  <div className="text-2xl font-bold text-brand mb-1 tracking-tighter">High</div>
                  <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-slate-600">Readiness → Activation Focus</div>
                </div>
                <div className="border border-border p-5">
                  <div className="text-2xl font-bold text-slate-300 mb-1 tracking-tighter">Low</div>
                  <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-slate-600">Readiness → Restoration Focus</div>
                </div>
              </div>
            </div>
          </div>

          <MovementVisualizer />
        </div>
      </section>

      {/* Telemetry & Interface Section */}
      <section className="py-20 sm:py-32 lg:py-40 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 border-b border-border">
        <div className="mb-24">
          <h2 className="text-[10px] sm:text-xs font-mono tracking-[0.3em] uppercase text-brand mb-6">
            System Telemetry
          </h2>
          <h3 className="text-4xl sm:text-6xl font-bold tracking-tighter text-white uppercase leading-[0.9]">
            The Interface.
          </h3>
        </div>

        <div className="space-y-32">
          {/* Screenshot 1: Dashboard */}
          <div className="grid lg:grid-cols-12 gap-16 items-center">
            <div className="lg:col-span-5 order-2 lg:order-1">
              <h4 className="text-2xl font-bold text-white uppercase mb-4 tracking-tight">Adaptive Dashboard</h4>
              <p className="text-slate-400 font-light leading-relaxed mb-6">
                The central command. Instantly surface today&apos;s structural focus—from decreasing run intervals to your proximity to the next major objective. The engine synthesizes your entire load progression into actionable daily directives.
              </p>
              <div className="flex items-center gap-3 text-[10px] font-mono text-brand uppercase tracking-[0.2em]">
                <span className="w-1 h-px bg-brand"></span>
                <span>Active Modules: CTL Forecasting, Session Cues</span>
              </div>
            </div>
            <div className="lg:col-span-7 order-1 lg:order-2">
              <div className="bg-[#050505] border border-border flex flex-col items-center justify-center relative overlow-hidden rounded-xl shadow-2xl shadow-brand/10 p-2 sm:p-4">
                <img src="/screenshots/dashboard.png" alt="RESILIENTO Dashboard showing overall CTL readiness and training focus" className="object-cover w-full h-auto rounded-lg border border-border/50" />
              </div>
            </div>
          </div>

          {/* Screenshot 2: Readiness & Recovery */}
          <div className="grid lg:grid-cols-12 gap-16 items-center">
            <div className="lg:col-span-7">
              <div className="bg-[#050505] border border-border flex flex-col items-center justify-center relative rounded-xl shadow-2xl shadow-brand/10 p-2 sm:p-4">
                <img src="/screenshots/recovery.png" alt="Recovery Insights showing Acute-to-Chronic Workload Ratio and Injury Risk" className="object-cover w-full h-auto rounded-lg border border-border/50" />
              </div>
            </div>
            <div className="lg:col-span-5">
              <h4 className="text-2xl font-bold text-white uppercase mb-4 tracking-tight">Recovery & Risk Insights</h4>
              <p className="text-slate-400 font-light leading-relaxed mb-6">
                Passive metric dashboards are dead. The Recovery matrix tracks your Acute-to-Chronic Workload Ratio (ACWR), Load Progression, and Biomechanical Stress levels. The engine uses this exact data to algorithmically adjust tomorrow&apos;s intervals.
              </p>
              <div className="flex items-center gap-3 text-[10px] font-mono text-brand uppercase tracking-[0.2em]">
                <span className="w-1 h-px bg-brand"></span>
                <span>Active Modules: ACWR, Injury Risk Detection</span>
              </div>
            </div>
          </div>

          {/* Screenshot 3: Calendar */}
          <div className="grid lg:grid-cols-12 gap-16 items-center">
            <div className="lg:col-span-5 order-2 lg:order-1">
              <h4 className="text-2xl font-bold text-white uppercase mb-4 tracking-tight">Tactical Calendar</h4>
              <p className="text-slate-400 font-light leading-relaxed mb-6">
                A unified grid for endurance, strength, and structural mobility sessions. View exact load scores, target TSS, and completed actuals. When a session is missed, the calendar dynamically rebuilds the remaining week to preserve the physiological target.
              </p>
              <div className="flex items-center gap-3 text-[10px] font-mono text-brand uppercase tracking-[0.2em]">
                <span className="w-1 h-px bg-brand"></span>
                <span>Active Modules: Schedule Friction Adjustment</span>
              </div>
            </div>
            <div className="lg:col-span-7 order-1 lg:order-2">
              <div className="bg-[#050505] border border-border flex flex-col items-center justify-center relative rounded-xl shadow-2xl shadow-brand/10 p-2 sm:p-4">
                <img src="/screenshots/calendar.png" alt="Calendar View showing tactical training schedule and missed session adjustment" className="object-cover w-full h-auto rounded-lg border border-border/50" />
              </div>
            </div>
          </div>

           {/* Screenshot 4: Session Detail */}
           <div className="grid lg:grid-cols-12 gap-16 items-center">
            <div className="lg:col-span-7">
              <div className="bg-[#050505] border border-border flex flex-col items-center justify-center relative rounded-xl shadow-2xl shadow-brand/10 p-2 sm:p-4">
                <img src="/screenshots/session_run.png" alt="Structured Session Detail highlighting exact main set pacing and coach technical focus" className="object-cover w-full h-auto rounded-lg border border-border/50" />
              </div>
            </div>
            <div className="lg:col-span-5">
              <h4 className="text-2xl font-bold text-white uppercase mb-4 tracking-tight">Structured Session Detail</h4>
              <p className="text-slate-400 font-light leading-relaxed mb-6">
                Execution requires precision. Dive into exact session timelines with warmup breakdowns, main set pacing targets, and coach-level session notes detailing the &apos;why&apos;, technical focus, and mistakes to avoid.
              </p>
              <div className="flex items-center gap-3 text-[10px] font-mono text-brand uppercase tracking-[0.2em]">
                <span className="w-1 h-px bg-brand"></span>
                <span>Active Modules: Pacing Execution, Technical Focus</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Target Athlete Directive - Raw and Aggressive */}
      <section className="py-20 sm:py-32 lg:py-40 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 border-b border-border">
        <h2 className="text-[10px] sm:text-xs font-mono tracking-[0.3em] uppercase text-brand mb-12 text-center">
          Target Execution Profiles
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16">
          <ExpandableCard 
            title="The Hybrid Athlete"
            summary="You refuse to choose between a 500lb deadlift and a sub-3 marathon. You require a system that understands concurrent training interference."
            details={
              <>
                <p>
                  Most programs fail hybrid athletes by blindly stacking a running plan on top of a strength program. This leads to massive cumulative fatigue and physiological interference—your body doesn&apos;t know if it&apos;s supposed to build muscle or endurance.
                </p>
                <p>
                  RESILIENTO actively monitors the interference effect. It strategically buffers high-intensity interval runs away from heavy squat days, ensuring neuromuscular recovery. Furthermore, it shifts your lifting volume into maintenance mode precisely when your endurance blocks peak, preventing structural breakdown while allowing you to preserve absolute strength.
                </p>
              </>
            }
          />
          <ExpandableCard 
            title="The Self-Coached"
            summary="You demand systematic logic, not blind compliance to a PDF template. You want the capability of a high-end coach, automated."
            details={
              <>
                <p>
                  You know enough about training to know that pre-written 12-week templates are fundamentally flawed because they don&apos;t respond to real life. When you get sick, travel, or miss a workout, a PDF can&apos;t recalculate your macrocycle.
                </p>
                <p>
                  The engine serves as a responsive algorithm that thinks like a master coach. It tracks your Acute-to-Chronic Workload Ratio (ACWR), predicts injury risk probabilities, and auto-regulates your daily prescribed TSS based precisely on the physiological data it ingests from your connected devices and subjective feedback loop.
                </p>
              </>
            }
          />
        </div>
      </section>

      {/* Gateway Section - Sport Specific Intents */}
      <section className="py-20 sm:py-32 bg-[#050505] border-b border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center mb-16">
          <h2 className="text-[10px] sm:text-xs font-mono tracking-[0.3em] uppercase text-brand mb-4">
            Specialized Modalities
          </h2>
          <h3 className="text-3xl sm:text-5xl font-bold tracking-tighter text-white uppercase">
            Built For Your Sport
          </h3>
        </div>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid md:grid-cols-3 gap-8">
          <Link href="/triathlon" className="border border-border p-10 hover:border-brand transition-colors group">
            <h4 className="text-2xl font-bold text-white uppercase tracking-tight mb-4 group-hover:text-brand transition-colors">Triathlon</h4>
            <p className="text-slate-400 font-light mb-8">An adaptive plan coordinating swim, bike, run, and structural strength without breaking your body.</p>
            <span className="text-[11px] font-mono tracking-[0.2em] uppercase text-brand">View Module →</span>
          </Link>
          <Link href="/hyrox" className="border border-border p-10 hover:border-brand transition-colors group">
            <h4 className="text-2xl font-bold text-white uppercase tracking-tight mb-4 group-hover:text-brand transition-colors">HYROX</h4>
            <p className="text-slate-400 font-light mb-8">Master the sleds and wall balls. Blending compromise running with heavy erg conditioning.</p>
            <span className="text-[11px] font-mono tracking-[0.2em] uppercase text-brand">View Module →</span>
          </Link>
          <Link href="/running" className="border border-border p-10 hover:border-brand transition-colors group">
            <h4 className="text-2xl font-bold text-white uppercase tracking-tight mb-4 group-hover:text-brand transition-colors">Hybrid Running</h4>
            <p className="text-slate-400 font-light mb-8">Run fast, lift heavy. A running plan that algorithmically separates track days from heavy lifting.</p>
            <span className="text-[11px] font-mono tracking-[0.2em] uppercase text-brand">View Module →</span>
          </Link>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 sm:py-32 border-b border-border">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tighter text-white uppercase">
              Frequently Asked Questions
            </h2>
          </div>
          <div className="space-y-8">
            {landingFaqs.map((faq, idx) => (
              <div key={idx} className="border border-border p-8">
                <h4 className="text-xl font-bold text-white mb-4">{faq.question}</h4>
                <p className="text-slate-400 font-light leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Terminal Waitlist Section */}
      <section id="waitlist" className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-20 sm:py-32 lg:py-40">
        <div className="border border-border bg-[#030303] p-8 sm:p-16 relative">
          {/* Corner accents */}
          <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-brand"></div>
          <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-brand"></div>
          <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-brand"></div>
          <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-brand"></div>
          
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tighter text-white mb-6 uppercase">
              Secure Access.
            </h2>
            <p className="text-lg text-slate-400 font-light max-w-xl mx-auto">
              RESILIENTO is undergoing strict closed-cohort testing. We sequence onboarding based on athlete profile relevance and waitlist positioning.
            </p>
          </div>
          
          <div className="max-w-2xl mx-auto">
            <WaitlistForm />
          </div>
        </div>
      </section>
    </div>
  );
}
