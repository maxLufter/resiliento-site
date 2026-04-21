import { Metadata } from 'next';
import Estimator from './Estimator';

export const metadata: Metadata = {
  title: 'Training Stress Score (TSS) Estimator | RESILIENTO Tools',
  description: 'Estimate the physiological cost of your endurance or strength workouts using RPE and duration. Calculate your training stress score and recovery runway for free.',
};

export default function TSSEstimatorPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Training Stress Score (TSS) Estimator",
    "url": "https://resiliento.app/tools/tss-estimator",
    "description": "Estimate the physiological cost of your endurance or strength workouts using RPE and duration. Calculate your training stress score and recovery runway for free.",
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
      <div className="max-w-4xl mx-auto px-6 py-24 sm:py-32 pt-32 sm:pt-40">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-6 uppercase border-b-2 border-brand/30 pb-4 inline-block font-montserrat">
            Training <span className="text-brand">Stress Score (TSS)</span>
          </h1>
          <p className="text-lg leading-8 text-neutral-300 font-inter max-w-2xl mx-auto">
            Calculate the physiological impact of a session based on duration and Rate of Perceived Exertion (RPE). Discover how a single heavy session drains your readiness runway.
          </p>
        </div>

        <Estimator />

        <div className="mt-16 bg-neutral-900 border border-neutral-800 rounded-xl p-8 text-center max-w-2xl mx-auto">
          <h3 className="text-xl font-bold text-white mb-4 font-montserrat">Fatigue compounds invisibly.</h3>
          <p className="text-neutral-400 font-inter mb-6">
            Knowing your workout scored 120 TSS is helpful. Knowing your body needs exactly 48 hours before another intense threshold session is game-changing. That's what the RESILIENTO engine handles automatically.
          </p>
          <a href="/waitlist" className="inline-block bg-brand text-black font-semibold tracking-wide py-3 px-8 rounded-md transition-transform hover:scale-105">
            Join the Adaptive Engine Waitlist
          </a>
        </div>
      </div>
    </>
  );
}
