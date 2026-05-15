import { Metadata } from 'next';
import Link from 'next/link';
import Calculator from './Calculator';
import { Gauge } from 'lucide-react';
import { BreadcrumbJsonLd } from '@/components/StructuredData';

export const metadata: Metadata = {
  title: 'Optimal Tyre Pressure Calculator (Physics-Based) | RESILIENTO',
  description: 'Calculate your optimal cycling tire pressure. A sophisticated physics-based calculator balancing casing tension, surface impedance, hookless rim limits, and wet weather conditions for maximum speed.',
  keywords: 'optimal tyre pressure calculator, cycling tire pressure, road bike tire pressure, gravel bike tire pressure, silca pressure calculator alternative',
};

export default function TyrePressurePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Optimal Tyre Pressure Calculator",
    "url": "https://resiliento.app/tools/optimal-tyre-pressure",
    "description": "Calculate your optimal cycling tire pressure. A sophisticated physics-based calculator balancing casing tension, surface impedance, hookless rim limits, and wet weather conditions for maximum speed.",
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
        { name: 'Optimal Tyre Pressure', url: 'https://resiliento.app/tools/optimal-tyre-pressure' },
      ]} />
      <div className="max-w-7xl mx-auto px-6 py-24 sm:py-32 lg:px-8 pt-32 sm:pt-40">
        <div className="mb-8">
          <Link href="/tools" className="text-xs font-mono tracking-[0.2em] uppercase text-slate-500 hover:text-brand transition-colors">← All Tools</Link>
        </div>
        <div className="max-w-3xl text-center mx-auto mb-16">
          <div className="flex items-center justify-center gap-4 mb-6">
            <Gauge size={40} className="text-brand" strokeWidth={2} />
            <h1 className="text-4xl font-bold tracking-tight text-white uppercase border-b-2 border-brand/30 pb-4 inline-block font-montserrat m-0">
              Optimal <span className="text-brand">Tyre Pressure</span>
            </h1>
          </div>
          <p className="text-lg leading-8 text-neutral-300 font-inter">
            Physics-based pressure calculation. Optimize your casing tension against surface impedance to find the exact breakpoint where you ride fastest and smoothest.
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <Calculator />
        </div>

        <div className="mt-16 bg-neutral-900 border border-neutral-800 rounded-xl p-8 text-center max-w-2xl mx-auto">
          <h3 className="text-xl font-bold text-white mb-4 font-montserrat">Free speed is great. A faster engine is better.</h3>
          <p className="text-neutral-400 font-inter mb-6">
            Optimizing your gear saves watts, but optimizing your physiology wins races. The RESILIENTO engine adapts your daily volume and intensity to build an unbreakable hybrid engine.
          </p>
          <Link href="/waitlist" className="inline-block bg-brand text-black font-semibold tracking-wide py-3 px-8 rounded-md transition-transform hover:scale-105">
            Join the Adaptive Engine Waitlist
          </Link>
        </div>
      </div>
    </>
  );
}
