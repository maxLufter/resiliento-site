import { Metadata } from 'next';
import Link from 'next/link';
import NutritionCalculator from './NutritionCalculator';
import { Zap } from 'lucide-react';
import { BreadcrumbJsonLd } from '@/components/StructuredData';

export const metadata: Metadata = {
  title: 'Race Nutrition Planner — Carbs, Sodium, Caffeine & Fluid Plan | RESILIENTO',
  description: 'Evidence-based race nutrition planner for triathlon, cycling, and running. Calculate carbohydrate, sodium, fluid, and caffeine targets based on your event distance, body mass, gut tolerance, and conditions.',
  keywords: 'race nutrition planner, triathlon nutrition plan, ironman nutrition strategy, carb intake calculator, race fueling plan, sodium electrolyte calculator',
};

export default function NutritionPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Race Nutrition Planner — Carbs, Sodium, Caffeine & Fluid Plan",
    "url": "https://resiliento.app/tools/race-nutrition-calculator",
    "description": "Evidence-based race nutrition planner for triathlon, cycling, and running. Calculate carbohydrate, sodium, fluid, and caffeine targets based on your event distance, body mass, gut tolerance, and conditions.",
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
        { name: 'Race Nutrition Planner', url: 'https://resiliento.app/tools/race-nutrition-calculator' },
      ]} />
      <div className="max-w-7xl mx-auto px-6 py-24 sm:py-32 lg:px-8 pt-32 sm:pt-40">
        <div className="mb-8">
          <Link href="/tools" className="text-xs font-mono tracking-[0.2em] uppercase text-slate-500 hover:text-brand transition-colors">← All Tools</Link>
        </div>
        <div className="max-w-3xl text-center mx-auto mb-16">
          <div className="flex items-center justify-center gap-4 mb-6">
            <Zap size={40} className="text-brand" strokeWidth={2} />
            <h1 className="text-4xl font-bold tracking-tight text-white uppercase border-b-2 border-brand/30 pb-4 inline-block font-montserrat m-0">
              Race <span className="text-brand">Nutrition</span> Planner
            </h1>
          </div>
          <p className="text-lg leading-8 text-neutral-300 font-inter">
            Evidence-based fueling strategy for your next race. Calculate carbohydrate, sodium, fluid, and caffeine targets — then see exactly what to consume and when.
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <NutritionCalculator />
        </div>
      </div>
    </>
  );
}
