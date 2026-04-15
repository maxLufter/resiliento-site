import Link from "next/link";
import { WaitlistForm } from "@/components/WaitlistForm";
import { ExpandableListItem } from "@/components/ExpandableListItem";
import { SoftwareApplicationJsonLd } from "@/components/StructuredData";

export const metadata = {
  title: "Adaptive Running Training Program & Plan | RESILIENTO",
  description: "An adaptive running training program designed for runners who also lift heavy. Resiliento buffers your track days from your deadlifts to prevent injury.",
};

export default function RunningPage() {
  return (
    <div className="flex flex-col">
      <SoftwareApplicationJsonLd sport="Running" specificDescription="The adaptive running training program for hybrid athletes who want to run fast and lift heavy." />
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
              The Hybrid <br className="hidden sm:block"/> Running Plan.
            </h1>
            
            <p className="text-lg sm:text-2xl lg:text-3xl text-slate-400 mb-10 sm:mb-16 leading-[1.6] sm:leading-[1.4] max-w-3xl font-light tracking-tight">
              Built for runners who refuse to choose between a 500lb deadlift and a sub-3 marathon. A running program that aggressively models concurrent training interference.
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

      {/* The Collision Section */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 sm:py-32 lg:py-40 border-b border-border">
        <div className="grid lg:grid-cols-2 gap-12 sm:gap-16 lg:gap-24 items-start">
          <div className="lg:sticky lg:top-40">
            <h2 className="text-5xl sm:text-7xl font-bold tracking-tighter text-white uppercase leading-[0.9]">
              Concurrent <br/> Training Logic.
            </h2>
          </div>
          
          <div className="space-y-24">
            <div>
              <p className="text-2xl text-slate-300 leading-relaxed font-light mb-12">
                Running programs often assume you are only running. We know you are also lifting. RESILIENTO mathematically buffers your high-intensity track days away from heavy lower-body lifts.
              </p>
              
              <div className="space-y-12">
                <ExpandableListItem 
                  label="Interference Mitigation"
                  title="Buffered Speed Work"
                  summary="Your key track sessions are intelligently separated from taxing metabolic or hypertrophic stimulus. You hit your running paces fresh, decreasing acute injury risks and tendon overload."
                  details={
                    <>
                      <p>
                        Concurrent training presents a biological bottleneck: your body cannot optimally build maximum aerobic capacity and maximal force production in the exact same localized timezone. Running hard interval sessions on fatigued legs from yesterday&apos;s heavy squats blunts the neuromuscular stimulus of the sprint.
                      </p>
                      <p>
                        RESILIENTO structurally shields your key running workouts by enforcing a mandatory 48-hour buffer window between heavy lower-body lifts and Zone 4/5 track sessions. This dramatically drops the rate of lower-limb tendinopathy and stress fractures typically seen in hybrid athletes trying to do everything at once.
                      </p>
                    </>
                  }
                />

                <ExpandableListItem 
                  label="Autoregulation"
                  title="Dynamic Adjustments"
                  summary="When HRV dips or subjective fatigue spikes, the plan adapts. A 6x800m track session might automatically downgrade to a Zone 2 recovery block before you damage your tissues."
                  details={
                    <>
                      <p>
                        Static PDF plans demand compliance without context. But your central nervous system fatigue changes daily. Our engine takes in your morning HRV markers, localized soreness reports, and resting heart rate data to determine if you are biologically primed for high intensity.
                      </p>
                      <p>
                        If you are displaying signs of overreaching, the system will not just skip a workout. It intelligently downgrades the session intensity, calculates the load debt, and re-optimizes the rest of your week to ensure you remain on track for your long-term goal without breaking yourself today.
                      </p>
                    </>
                  }
                />
              </div>
            </div>
          </div>
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
