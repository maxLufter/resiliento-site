"use client";

import { useState } from "react";

interface ExpandableCardProps {
  title: string;
  summary: string;
  details: React.ReactNode;
}

export function ExpandableCard({ title, summary, details }: ExpandableCardProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div 
      className={`border bg-black p-12 transition-all duration-500 cursor-pointer group ${isOpen ? 'border-brand' : 'border-border hover:border-brand/50'}`}
      onClick={() => setIsOpen(!isOpen)}
    >
      <div className="flex justify-between items-start mb-6">
        <h3 className="text-3xl text-white font-bold tracking-tight uppercase pr-4 group-hover:text-brand transition-colors duration-300">{title}</h3>
        <button 
          className="text-brand font-mono text-4xl leading-none font-light opacity-70 group-hover:opacity-100 transition-all transform shrink-0"
          style={{ transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)', transition: 'transform 0.3s ease' }}
        >
          +
        </button>
      </div>
      <p className="text-slate-400 text-xl font-light leading-relaxed">
        {summary}
      </p>
      
      <div 
        className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-[1000px] opacity-100 mt-8' : 'max-h-0 opacity-0'}`}
      >
        <div className="h-[1px] w-12 bg-brand mb-8 opacity-50"></div>
        <div className="text-slate-300 text-lg font-light leading-relaxed space-y-6">
          {details}
        </div>
      </div>
    </div>
  );
}
