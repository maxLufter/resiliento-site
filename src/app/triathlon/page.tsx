import Link from "next/link";
import { WaitlistForm } from "@/components/WaitlistForm";
import { ExpandableCard } from "@/components/ExpandableCard";
import { ExpandableListItem } from "@/components/ExpandableListItem";
import { SoftwareApplicationJsonLd } from "@/components/StructuredData";

export const metadata = {
  title: "Adaptive Triathlon Training Program & Coaching App | RESILIENTO",
  description: "A triathlon training program that adapts to your life. Stop failing static PDF plans. RESILIENTO dynamically balances swim, bike, run, and strength training.",
};

export default function TriathlonPage() {
  return (
    <div className="flex flex-col">
      <SoftwareApplicationJsonLd sport="Triathlon" specificDescription="The adaptive triathlon training program that balances swim, bike, run, and heavy strength training simultaneously." />
      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col justify-end pb-32 overflow-hidden border-b border-border">
        <div className="absolute top-1/4 right-[10%] w-[1px] h-screen bg-gradient-to-b from-brand/20 to-transparent transform rotate-45 opacity-50 pointer-events-none" />
        <div className="absolute top-1/3 right-[15%] w-[1px] h-screen bg-gradient-to-b from-brand/20 to-transparent transform rotate-45 opacity-20 pointer-events-none" />
        
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10 w-full mt-32">
          <div className="max-w-5xl">
            <div className="flex items-center gap-4 mb-16">
              <div className="h-[2px] w-16 bg-brand"></div>
              <span className="text-brand text-[11px] font-mono tracking-[0.3em] uppercase">Status: Closed Cohort V1.0</span>
            </div>
            
            <h1 className="text-5xl sm:text-7xl lg:text-[8rem] font-bold tracking-tighter text-white mb-10 leading-[0.9] uppercase">
              Adaptive <br className="hidden sm:block"/> Triathlon Coaching.
            </h1>
            
            <p className="text-lg sm:text-2xl lg:text-3xl text-slate-400 mb-10 sm:mb-16 leading-[1.6] sm:leading-[1.4] max-w-3xl font-light tracking-tight">
              Swim, Bike, Run, and Heavy Strength. Finally unified into a single intelligent system that adapts when life disrupts your schedule.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center gap-8">
              <Link 
                href="#waitlist" 
                className="group relative inline-flex items-center justify-between border-2 border-brand bg-brand/5 px-8 py-5 w-full sm:w-auto hover:bg-brand transition-colors"
              >
                <span className="text-[13px] font-bold tracking-[0.2em] text-white group-hover:text-black uppercase">
                  Join Triathlon Waitlist
                </span>
                <span className="text-brand group-hover:text-black ml-4 transform group-hover:translate-x-1 transition-all">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* The Collision Section */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 sm:py-32 lg:py-40 border-b border-border">
        <div className="grid lg:grid-cols-2 gap-12 sm:gap-16 lg:gap-24 items-start">
          <div className="lg:sticky lg:top-40">
            <h2 className="text-5xl sm:text-7xl font-bold tracking-tighter text-white uppercase leading-[0.9]">
              The Static <br/> Plan Failure.
            </h2>
          </div>
          
          <div className="space-y-24">
            <div>
              <p className="text-2xl text-slate-300 leading-relaxed font-light mb-12">
                Off-the-shelf triathlon plans shatter the moment you miss a session. RESILIENTO rebuilds the week around you.
              </p>
              
              <div className="space-y-12">
                <ExpandableListItem 
                  label="Failure Point 01"
                  title="Schedule Fragility"
                  summary="If your 90-minute bike session shrinks to 40 minutes because of work, static plans fail. RESILIENTO cleanly compresses the daily physiological target so you don&apos;t lose the structural benefit of the day."
                  details={
                    <>
                      <p>
                        A rigid plan isn&apos;t a strategy; it&apos;s a liability. When life abruptly cuts your training window, merely skipping the last half of your prescribed workout means you miss the crucial interval adaptations, ruining the structural integrity of the session.
                      </p>
                      <p>
                        With algorithmic <strong>Dynamic Compression</strong>, our engine doesn&apos;t just cut the workout in half. It instantly recalculates the interval-to-rest ratio, trims the warm-up protocol, and safely condenses the most critical physiological stimulus into your available 40 minutes. You achieve your daily TSS target and maintain periodization momentum.
                      </p>
                    </>
                  }
                />

                <ExpandableListItem 
                  label="Failure Point 02"
                  title="Neglected Strength"
                  summary="Endurance platforms treat strength training as an afterthought. RESILIENTO embeds a fully autoregulated heavy lifting program safely buffered away from your key aerobic sessions."
                  details={
                    <>
                      <p>
                        Triathlon focuses heavily on cardiovascular conditioning but often ignores the tissue resilience required to absorb thousands of foot strikes. Standard plans either exclude strength entirely or randomly assign 20-minute generic bodyweight routines.
                      </p>
                      <p>
                        RESILIENTO structurally synchronizes heavy strength programming right alongside your swim, bike, and run. It deploys explicit strength archetypes (Max Strength, Hypertrophy, Maintenance) based directly on your current endurance mesocycle. Your lifting volume peaks in the off-season and automatically dilutes into structural maintenance as race day approaches.
                      </p>
                    </>
                  }
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Target Athlete Directive - Raw and Aggressive */}
      <section className="py-20 sm:py-32 lg:py-40 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 border-b border-border">
        <h2 className="text-[10px] sm:text-xs font-mono tracking-[0.3em] uppercase text-brand mb-12 text-center">
          Event Focus Architecture
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16">
          <ExpandableCard 
            title="Ironman & 70.3 Build"
            summary="We reverse-engineer your long-course build from race day—enforcing volume caps, fatigue tracking, and structured tapers with algorithmic precision."
            details={
              <>
                <p>
                  Long-course racing requires enormous aerobic volume, which exponentially increases the risk of structural failure. The engine manages this by establishing a <strong>Maximum Recoverable Volume (MRV)</strong> ceiling based on your onboarding metrics and weekly HRV feedback.
                </p>
                <p>
                  As you enter your Peak phase, the engine automatically deprioritizes heavy lower-body strength (shifting it exclusively into a maintenance holding pattern) to ensure your legs are fresh for 100+ mile bike sessions and off-the-bike brick runs. It also maps your final 3-week taper down to the precise daily TSS required to shed fatigue while retaining neuromuscular sharpness.
                </p>
              </>
            }
          />
          <ExpandableCard 
            title="Olympic & Sprint Speed"
            summary="Highly dense training protocols prioritizing top-end threshold power, neuromuscular firing, and transition readiness."
            details={
              <>
                <p>
                  Short-course racing isn&apos;t just about finishing; it&apos;s about redlining from the gun. This build profile aggressively loads <strong>VO2 Max intervals</strong> and anaerobic capacity work, while maintaining a higher frequency of heavy strength sessions to build explosive power.
                </p>
                <p>
                  Because the overall aerobic volume is lower than an Ironman build, the engine dynamically fills the recovered capacity with intense mobility and transition-specific drills. You will run off the bike more frequently, but with drastically shorter, higher-intensity intervals to condition violent pacing shifts.
                </p>
              </>
            }
          />
        </div>
      </section>

      {/* Terminal Waitlist Section */}
      <section id="waitlist" className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-20 sm:py-32 lg:py-40">
        <div className="border border-border bg-[#030303] p-8 sm:p-16 relative">
          <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-brand"></div>
          <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-brand"></div>
          <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-brand"></div>
          <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-brand"></div>
          
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tighter text-white mb-6 uppercase">
              Secure Access.
            </h2>
          </div>
          
          <div className="max-w-2xl mx-auto">
            <WaitlistForm />
          </div>
        </div>
      </section>
    </div>
  );
}
