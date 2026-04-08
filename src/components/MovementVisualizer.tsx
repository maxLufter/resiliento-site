"use client";

import { useState, useRef, useEffect } from "react";

const ARCHETYPES = [
  { id: "squat", name: "Squat Pattern", desc: "Bilateral and unilateral knee dominance. Absorbing and producing vertical force." },
  { id: "hinge", name: "Hinge Mechanic", desc: "Posterior chain loading. Glute and hamstring dominance for explosive power." },
  { id: "vertical_pull", name: "Vertical Pull", desc: "Full kinetic chain suspension. Latissimus dominance and grip integrity." },
  { id: "horizontal_push", name: "Horizontal Push", desc: "Anterior compound pressing. Chest and front delt architectural stabilization." }
];

export function MovementVisualizer() {
  const [active, setActive] = useState(ARCHETYPES[0].id);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    if (videoRef.current) {
      setIsTransitioning(true);
      // Wait for fade out
      setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.src = `/media/archetypes/${active}.mp4`;
          videoRef.current.poster = `/media/archetypes/${active}.jpeg`;
          videoRef.current.load();
          
          // Only play if not on extremely slow connection
          const playPromise = videoRef.current.play();
          if (playPromise !== undefined) {
            playPromise.catch(() => {
              // Auto-play was prevented
            });
          }
          setIsTransitioning(false);
        }
      }, 150); 
    }
  }, [active]);

  return (
    <div className="grid lg:grid-cols-12 gap-8 lg:gap-16 mt-20 items-stretch border-t border-border pt-20">
      {/* Left List */}
      <div className="lg:col-span-5 space-y-2 relative z-10">
        <h3 className="text-[11px] font-mono tracking-[0.3em] uppercase text-brand mb-8 ml-5">
          Movement Architecture Database
        </h3>
        {ARCHETYPES.map((arch) => (
          <button
            key={arch.id}
            onClick={() => setActive(arch.id)}
            className={`w-full text-left group border-l-2 p-5 transition-all duration-300 ${
              active === arch.id 
                ? "border-brand bg-brand/5" 
                : "border-border hover:border-brand/50 hover:bg-white/[0.02]"
            }`}
          >
            <h4 className={`text-xl font-bold tracking-tight uppercase mb-2 ${
              active === arch.id ? "text-white" : "text-slate-400 group-hover:text-slate-200"
            }`}>
              {arch.name}
            </h4>
            <p className={`text-sm font-light leading-relaxed ${
              active === arch.id ? "text-slate-300" : "text-slate-500"
            }`}>
              {arch.desc}
            </p>
          </button>
        ))}
      </div>

      {/* Right Video Visualizer */}
      <div className="lg:col-span-7 bg-[#030303] border border-border relative overflow-hidden flex items-center justify-center min-h-[400px] lg:min-h-[600px] group">
        <div className={`absolute inset-0 transition-opacity duration-300 z-0 ${isTransitioning ? "opacity-30" : "opacity-100"}`}>
             <video
                ref={videoRef}
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                poster={`/media/archetypes/${active}.jpeg`}
             />
        </div>
        
        {/* Corner accents */}
        <div className="absolute top-0 left-0 w-8 h-8 border-t border-l border-brand/50 z-10" />
        <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-brand/50 z-10" />
        <div className="absolute bottom-0 left-0 w-8 h-8 border-b border-l border-brand/50 z-10" />
        <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-brand/50 z-10" />
        
        {/* HUD UI overlay */}
        <div className="absolute bottom-6 left-6 z-10 flex flex-col gap-2 pointer-events-none">
           <div className="bg-black/60 backdrop-blur-sm border border-white/10 px-3 py-1.5 flex items-center gap-2 w-fit">
              <span className="w-1.5 h-1.5 rounded-full bg-brand animate-pulse" />
              <span className="font-mono text-[10px] uppercase tracking-widest text-white">Execution Telemetry</span>
           </div>
           <div className="bg-black/60 backdrop-blur-sm border border-white/10 px-3 py-1.5 w-fit">
              <span className="font-mono text-[10px] uppercase tracking-widest text-slate-400">Class: <span className="text-white">{active.toUpperCase()}</span></span>
           </div>
        </div>
      </div>
    </div>
  );
}
