import Link from "next/link";
import { WaitlistForm } from "@/components/WaitlistForm";
import { MovementVisualizer } from "@/components/MovementVisualizer";
import { ExpandableListItem } from "@/components/ExpandableListItem";
import { SoftwareApplicationJsonLd } from "@/components/StructuredData";

export const metadata = {
  title: "Adaptive HYROX Training Program & AI Plan | RESILIENTO",
  description: "Stop blowing up on the sleds. RESILIENTO provides an adaptive HYROX training program that balances compromise running, erg conditioning, and heavy strength systemically.",
};

export default function HyroxPage() {
  return (
    <div className="flex flex-col">
      <SoftwareApplicationJsonLd sport="HYROX" specificDescription="The adaptive HYROX training program for modern athletes. Unifying sled conditioning, wall balls, compromise running, and structural mobility." />
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
              The Adaptive <br className="hidden sm:block"/> HYROX Engine.
            </h1>
            
            <p className="text-lg sm:text-2xl lg:text-3xl text-slate-400 mb-10 sm:mb-16 leading-[1.6] sm:leading-[1.4] max-w-3xl font-light tracking-tight">
              Sled pushes, compromise running, and heavy mechanics globally unified. 
              Built for HYROX athletes who demand <span className="text-white font-medium">systematic logic</span>, not randomly generated suffering.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center gap-8">
              <Link 
                href="#waitlist" 
                className="group relative inline-flex items-center justify-between border-2 border-brand bg-brand/5 px-8 py-5 w-full sm:w-auto hover:bg-brand transition-colors"
              >
                <span className="text-[13px] font-bold tracking-[0.2em] text-white group-hover:text-black uppercase">
                  Join HYROX Waitlist
                </span>
                <span className="text-brand group-hover:text-black ml-4 transform group-hover:translate-x-1 transition-all">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* The Collision Section - HYROX Specific */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 sm:py-32 lg:py-40 border-b border-border">
        <div className="grid lg:grid-cols-2 gap-12 sm:gap-16 lg:gap-24 items-start">
          <div className="lg:sticky lg:top-40">
            <h2 className="text-5xl sm:text-7xl font-bold tracking-tighter text-white uppercase leading-[0.9]">
              The <br/> Collision.
            </h2>
          </div>
          
          <div className="space-y-24">
            <div>
              <p className="text-2xl text-slate-300 leading-relaxed font-light mb-12">
                HYROX demands both raw strength and aerobic capacity. When your run coach doesn&apos;t talk to your strength log, you absorb the collision.
              </p>
              
              <div className="space-y-12">
                <ExpandableListItem 
                  label="Failure Point 01"
                  title="Fried Legs, Blind Pacing"
                  summary="Your HYROX plan demands a threshold run or erg sprint today. It has zero awareness of the neuromuscular damage from yesterday&apos;s heavy wall balls and sled pulls."
                  details={
                    <>
                      <p>
                        HYROX is unique in that the structural damage from the stations directly ruins the precise mechanics needed for efficient running. If you are doing isolated 1km running intervals without simulating the pre-fatigue of a 150kg sled push, you are not actually training for the race format.
                      </p>
                      <p>
                        RESILIENTO engineers <strong>&quot;Compromise Running&quot;</strong> directly into the heart of your plan. Track days are carefully orchestrated, but your engine-building days intentionally spike your legs with heavy station work before forcing you to hold your threshold pace, precisely simulating race-day leg drain.
                      </p>
                    </>
                  }
                />

                <ExpandableListItem 
                  label="Failure Point 02"
                  title="The 'More is Better' Trap"
                  summary="Most hybrid programs just stack a running plan on top of a CrossFit program. The result is overtraining. True HYROX preparation requires concurrent training logic."
                  details={
                    <>
                      <p>
                        The quickest way to burn out in hybrid fitness is to execute two separate programs concurrently. A 5-day running plan plus a 5-day lifting plan does not make you a super-athlete; it results in metabolic exhaustion and plateaued performance in both domains.
                      </p>
                      <p>
                        Instead, the system uses a single unified load budget (Total System Stress). Heavy structural days are intelligently offset by active recovery or low-zone aerobic flushes, meaning every single sled push and every single running mile correctly balances the central nervous system without redlining it.
                      </p>
                    </>
                  }
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Movement Integration */}
      <section className="py-20 sm:py-32 lg:py-40 border-b border-border bg-black">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
           <div className="mb-24 flex items-center justify-between border-b border-border pb-12">
            <h2 className="text-5xl sm:text-7xl font-bold tracking-tighter text-white uppercase">
              Integrated <br/> Biomechanics.
            </h2>
            <div className="text-brand font-mono text-xs tracking-[0.2em] uppercase text-right hidden sm:block">
              Structural Shielding <br/> Active
            </div>
          </div>
          <MovementVisualizer />
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
              Secure HYROX Access.
            </h2>
            <p className="text-lg text-slate-400 font-light max-w-xl mx-auto">
              RESILIENTO is undergoing strict closed-cohort testing. 
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
