"use client";

import { useState } from "react";

interface ExpandableListItemProps {
  label: string;
  title: string;
  summary: string;
  details: React.ReactNode;
}

export function ExpandableListItem({ label, title, summary, details }: ExpandableListItemProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div 
      className={`border-l-2 pl-8 transition-all duration-500 cursor-pointer group ${isOpen ? 'border-brand' : 'border-border hover:border-brand/50'}`}
      onClick={() => setIsOpen(!isOpen)}
    >
      <div className="flex items-center gap-4 mb-4">
        <span className="text-brand font-mono text-[11px] tracking-[0.2em] uppercase">{label}</span>
        <div className="h-[1px] flex-1 bg-border/50 group-hover:bg-brand/30 transition-colors" />
        <button 
          className="text-brand font-mono text-2xl leading-none font-light opacity-60 group-hover:opacity-100 transition-all transform shrink-0 pl-2"
          style={{ transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)', transition: 'transform 0.3s ease' }}
        >
          +
        </button>
      </div>
      <h3 className="text-3xl font-bold tracking-tight text-white mb-4 uppercase group-hover:text-brand transition-colors duration-300">{title}</h3>
      <p className="text-slate-400 text-lg leading-relaxed font-light">
        {summary}
      </p>
      
      <div 
        className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-[1000px] opacity-100 mt-6' : 'max-h-0 opacity-0'}`}
      >
        <div className="text-slate-300 text-base font-light leading-relaxed space-y-4 pb-4">
          {details}
        </div>
      </div>
    </div>
  );
}
