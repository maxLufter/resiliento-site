import { Metadata } from 'next';
import Link from 'next/link';
import Calculator from './Calculator';
import { Footprints } from 'lucide-react';
import { BreadcrumbJsonLd } from '@/components/StructuredData';

export const metadata: Metadata = {
  title: 'Running Pace Calculator & Speed Converter',
  description: 'Free Running Pace Calculator. Plan your race strategy, calculate required pace for target finish times, predict event outcomes, and seamlessly convert pace to km/h or mph.',
  keywords: 'running pace calculator, pace to km/h converter, marathon finish time predictor, half marathon pace calculator',
};

export default function PaceCalculatorPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Running Pace Calculator & Speed Converter",
    "url": "https://resiliento.app/tools/running-pace-calculator",
    "description": "Free Running Pace Calculator. Plan your race strategy, calculate required pace for target finish times, predict event outcomes, and seamlessly convert pace to km/h or mph.",
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
        { name: 'Running Pace Calculator', url: 'https://resiliento.app/tools/running-pace-calculator' },
      ]} />
      <div className="max-w-7xl mx-auto px-6 py-24 sm:py-32 lg:px-8 pt-32 sm:pt-40">
        <div className="mb-8">
          <Link href="/tools" className="text-xs font-mono tracking-[0.2em] uppercase text-slate-500 hover:text-brand transition-colors">← All Tools</Link>
        </div>
        <div className="max-w-3xl text-center mx-auto mb-16">
          <div className="flex items-center justify-center gap-4 mb-6">
            <Footprints size={40} className="text-brand" strokeWidth={2} />
            <h1 className="text-4xl font-bold tracking-tight text-white uppercase border-b-2 border-brand/30 pb-4 inline-block font-montserrat m-0">
              Running <span className="text-brand">Pace Calculator</span>
            </h1>
          </div>
          <p className="text-lg leading-8 text-neutral-300 font-inter">
            Plan your race and training. Calculate your required pace for a target time, predict your finish time, or convert pace to speed (km/h).
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <Calculator />
        </div>

        <div className="mt-16 bg-neutral-900 border border-neutral-800 rounded-xl p-8 text-center max-w-2xl mx-auto">
          <h3 className="text-xl font-bold text-white mb-4 font-montserrat">Pacing is planning. Training is execution.</h3>
          <p className="text-neutral-400 font-inter mb-6">
            Knowing the pace required for a sub-3 marathon is easy. Building a training plan that gets you there without injury is hard. The RESILIENTO engine automatically adjusts your volume and intensity daily to keep you on target.
          </p>
          <Link href="/waitlist" className="inline-block bg-brand text-black font-semibold tracking-wide py-3 px-8 rounded-md transition-transform hover:scale-105">
            Join the Adaptive Engine Waitlist
          </Link>
        </div>
      </div>
    </>
  );
}
