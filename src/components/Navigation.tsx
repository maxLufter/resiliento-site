import Link from "next/link";
import Image from "next/image";

export function Navigation() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full bg-black/90 backdrop-blur-md border-b border-white/5">
      <div className="mx-auto flex h-24 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center">
          <Link href="/" className="flex items-center gap-4 group">
            <div className="relative w-16 h-16 sm:w-[84px] sm:h-[84px] flex-shrink-0">
              <Image 
                src="/resiliento_icon_light.svg" 
                alt="RESILIENTO Icon" 
                fill
                className="object-contain opacity-100 group-hover:scale-105 transition-transform duration-500 drop-shadow-xl"
              />
            </div>
            <div className="flex flex-col justify-center">
              <span className="font-montserrat font-[550] text-3xl sm:text-[32px] text-white tracking-[0.13em] uppercase leading-none -mr-[0.13em]">RESILIENTO</span>
              <span className="font-montserrat font-bold tracking-[0.25em] text-[9px] sm:text-[10.5px] text-slate-400 uppercase mt-1">HYBRID TRAINING ENGINE</span>
            </div>
          </Link>
        </div>

        <nav className="hidden md:flex items-center gap-12 text-[11px] font-mono tracking-[0.3em] text-slate-500 uppercase">
          <Link href="/hybrid-training-engine" className="hover:text-brand transition-colors">
            Theory
          </Link>
          <Link href="/adaptive-training-planner" className="hover:text-brand transition-colors">
            Adaptation
          </Link>
          <Link href="/mobility-for-hybrid-athletes" className="hover:text-brand transition-colors">
            Mobility
          </Link>
        </nav>

        <div className="flex items-center">
          <Link 
            href="/waitlist" 
            className="group flex items-center gap-2 border border-border bg-black hover:border-brand px-6 py-3 text-[11px] font-mono tracking-[0.2em] uppercase text-white hover:text-brand transition-colors"
          >
            <span>Waitlist</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
