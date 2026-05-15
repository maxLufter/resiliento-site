import { Metadata } from 'next';
import Link from 'next/link';
import ChecklistPlanner from './ChecklistPlanner';
import { ClipboardCheck } from 'lucide-react';
import { BreadcrumbJsonLd } from '@/components/StructuredData';

export const metadata: Metadata = {
  title: 'Triathlon Race Day Checklist & Packing Planner',
  description: 'Never forget essential race gear again. Smart triathlon packing checklist that adapts to your event distance (Sprint to Ironman), wetsuit rules, and weather conditions.',
  keywords: 'triathlon checklist, triathlon packing list, race day checklist, ironman packing list, triathlon gear list, wetsuit triathlon checklist',
};

export default function ChecklistPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Triathlon Race Day Checklist & Packing Planner",
    "url": "https://resiliento.app/tools/triathlon-checklist",
    "description": "Never forget essential race gear again. Smart triathlon packing checklist that adapts to your event distance (Sprint to Ironman), wetsuit rules, and weather conditions.",
    "applicationCategory": "HealthAndFitnessApplication",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BreadcrumbJsonLd items={[
        { name: 'Home', url: 'https://resiliento.app' },
        { name: 'Tools', url: 'https://resiliento.app/tools' },
        { name: 'Race Day Checklist', url: 'https://resiliento.app/tools/triathlon-checklist' },
      ]} />
      <div className="max-w-7xl mx-auto px-6 py-24 sm:py-32 lg:px-8 pt-32 sm:pt-40">
        <div className="mb-8">
          <Link href="/tools" className="text-xs font-mono tracking-[0.2em] uppercase text-slate-500 hover:text-brand transition-colors">← All Tools</Link>
        </div>
        <div className="max-w-3xl text-center mx-auto mb-16">
          <div className="flex items-center justify-center gap-4 mb-6">
            <ClipboardCheck size={40} className="text-brand" strokeWidth={2} />
            <h1 className="text-4xl font-bold tracking-tight text-white uppercase border-b-2 border-brand/30 pb-4 inline-block font-montserrat m-0">
              Race Day <span className="text-brand">Checklist</span>
            </h1>
          </div>
          <p className="text-lg leading-8 text-neutral-300 font-inter">
            Smart packing planner that adapts to your event distance and race conditions. Check items off as you pack — your progress is saved automatically.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <ChecklistPlanner />
        </div>

        <div className="mt-16 bg-neutral-900 border border-neutral-800 rounded-xl p-8 text-center max-w-2xl mx-auto">
          <h3 className="text-xl font-bold text-white mb-4 font-montserrat">Don't forget the most important item: Fitness.</h3>
          <p className="text-neutral-400 font-inter mb-6">
            Having the right gear is essential, but arriving at the start line overtrained or underprepared ruins the race. The RESILIENTO engine dynamically structures your training to peak perfectly for race day.
          </p>
          <Link href="/waitlist" className="inline-block bg-brand text-black font-semibold tracking-wide py-3 px-8 rounded-md transition-transform hover:scale-105">
            Join the Adaptive Engine Waitlist
          </Link>
        </div>
      </div>
    </>
  );
}
