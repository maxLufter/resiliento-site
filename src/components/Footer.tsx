import Link from "next/link";
import Image from "next/image";

export function Footer() {
  return (
    <footer className="border-t border-border bg-black">
      <div className="mx-auto max-w-7xl px-4 pb-12 pt-24 sm:px-6 lg:px-8">
        <div className="xl:grid xl:grid-cols-3 xl:gap-24">
          <div className="space-y-8">
            <Link href="/" className="flex items-center gap-4 group">
              <div className="relative w-10 h-10 sm:w-14 sm:h-14 lg:w-[72px] lg:h-[72px] flex-shrink-0">
                <Image 
                  src="/resiliento_icon_light.svg" 
                  alt="RESILIENTO Icon" 
                  fill
                  className="object-contain opacity-50 group-hover:opacity-100 transition-all duration-500"
                />
              </div>
              <div className="flex flex-col justify-center">
                <span className="font-montserrat font-[550] text-xl sm:text-2xl lg:text-[28px] text-white tracking-[0.13em] uppercase leading-none -mr-[0.13em] opacity-80 group-hover:opacity-100 transition-opacity">RESILIENTO</span>
                <span className="font-montserrat font-bold tracking-[0.25em] text-[7px] sm:text-[8px] lg:text-[9.5px] text-slate-500 uppercase mt-1 opacity-80 group-hover:opacity-100 transition-opacity">HYBRID TRAINING ENGINE</span>
              </div>
            </Link>
            <p className="text-sm leading-[1.8] text-slate-500 max-w-xs font-light">
              Engineering resilience for the hybrid athlete. Systematic planning over chaotic effort.
            </p>
          </div>
          <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-12 xl:col-span-2 xl:mt-0">
            <div>
              <h3 className="text-[10px] font-mono tracking-[0.2em] uppercase text-brand mb-6">Engine</h3>
              <ul role="list" className="space-y-4">
                <li>
                  <Link href="/hybrid-training-engine" className="text-sm text-slate-400 hover:text-white transition-colors">
                    Theory
                  </Link>
                </li>
                <li>
                  <Link href="/adaptive-training-planner" className="text-sm text-slate-400 hover:text-white transition-colors">
                    Adaptation
                  </Link>
                </li>
                <li>
                  <Link href="/mobility-for-hybrid-athletes" className="text-sm text-slate-400 hover:text-white transition-colors">
                    Mobility
                  </Link>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-[10px] font-mono tracking-[0.2em] uppercase text-brand mb-6">Disciplines</h3>
              <ul role="list" className="space-y-4">
                <li>
                  <Link href="/hyrox" className="text-sm text-slate-400 hover:text-white transition-colors">
                    HYROX Training
                  </Link>
                </li>
                <li>
                  <Link href="/triathlon" className="text-sm text-slate-400 hover:text-white transition-colors">
                    Triathlon Training
                  </Link>
                </li>
                <li>
                  <Link href="/running" className="text-sm text-slate-400 hover:text-white transition-colors">
                    Hybrid Running
                  </Link>
                </li>
              </ul>
            </div>
            
            <div className="space-y-12">
              <div>
                <h3 className="text-[10px] font-mono tracking-[0.2em] uppercase text-brand mb-6">CommHQ</h3>
                <ul role="list" className="space-y-4">
                  <li>
                    <Link href="/waitlist" className="text-sm text-white hover:text-brand transition-colors flex items-center gap-2 group">
                      <span className="group-hover:text-brand">Join Waitlist</span>
                      <span className="text-brand transform group-hover:translate-x-1 transition-transform">→</span>
                    </Link>
                  </li>
                  <li className="text-sm text-slate-500 font-mono">
                    SYS: support@resiliento.app
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-[10px] font-mono tracking-[0.2em] uppercase text-brand mb-6">Legal</h3>
                <ul role="list" className="space-y-4">
                  <li>
                    <Link href="/privacy" className="text-sm text-slate-400 hover:text-white transition-colors">
                      Privacy Policy
                    </Link>
                  </li>
                  <li>
                    <Link href="/impressum" className="text-sm text-slate-400 hover:text-white transition-colors">
                      Impressum
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-24 border-t border-border pt-12">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-[10px] font-mono tracking-[0.2em] text-slate-600 uppercase">
              &copy; {new Date().getFullYear()} RESILIENTO.
            </p>
            <div className="flex items-center gap-2 text-[10px] font-mono text-brand uppercase tracking-[0.2em]">
              <span className="w-1.5 h-1.5 bg-brand animate-pulse"></span>
              System Online
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
