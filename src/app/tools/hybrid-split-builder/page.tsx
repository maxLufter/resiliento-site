import { Metadata } from 'next';
import Builder from './Builder';
import { Calendar } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Hybrid Athlete Training Split Builder | Concurrent Training Planner',
  description: 'Plan your weekly schedule balancing strength and endurance. Visualize interference effects and optimize recovery gaps with our free hybrid athlete split builder.',
};

export default function HybridSplitBuilderPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Hybrid Athlete Training Split Builder",
    "url": "https://resiliento.app/tools/hybrid-split-builder",
    "description": "Plan your weekly schedule balancing strength and endurance. Visualize interference effects and optimize recovery gaps with our free hybrid athlete split builder.",
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
      <div className="max-w-5xl mx-auto px-6 py-24 sm:py-32 pt-32 sm:pt-40">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-4 mb-6">
            <Calendar size={40} className="text-brand" strokeWidth={2} />
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-white uppercase border-b-2 border-brand/30 pb-4 inline-block font-montserrat m-0">
              Hybrid Athlete <span className="text-brand">Split Builder</span>
            </h1>
          </div>
          <p className="text-lg leading-8 text-neutral-300 font-inter max-w-2xl mx-auto">
            Concurrent training causes physiological interference (AMPK vs mTOR). Input your target volumes below to generate a baseline schedule structured specifically to minimize negative adaptations.
          </p>
        </div>

        <Builder />

        <div className="mt-16 bg-neutral-900 border border-neutral-800 rounded-xl p-8 text-center max-w-2xl mx-auto">
          <h3 className="text-xl font-bold text-white mb-4 font-montserrat">Static schedules break on Thursday.</h3>
          <p className="text-neutral-400 font-inter mb-6">
            This calculator designs a perfect-world scenario. But what happens when you miss Tuesday's run because of work? A static PDF collapses. The RESILIENTO engine instantly recalculates your split on the fly to preserve recovery protocols.
          </p>
          <a href="/waitlist" className="inline-block bg-brand text-black font-semibold tracking-wide py-3 px-8 rounded-md transition-transform hover:scale-105">
            Join the Adaptive Engine Waitlist
          </a>
        </div>
      </div>
    </>
  );
}
