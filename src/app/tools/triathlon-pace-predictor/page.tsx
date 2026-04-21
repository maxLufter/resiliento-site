import { Metadata } from 'next';
import Predictor from './Predictor';

export const metadata: Metadata = {
  title: 'Triathlon Race Pace Predictor | Sprint to Ironman Time Estimator',
  description: 'Free calculator predicting your finish time for Sprint, Olympic, 70.3, or Ironman. Uses your standalone paces and calculates endurance degradation.',
};

export default function TriathlonPacePredictorPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Triathlon Race Pace Predictor",
    "url": "https://resiliento.app/tools/triathlon-pace-predictor",
    "description": "Free calculator predicting your finish time for Sprint, Olympic, 70.3, or Ironman. Uses your standalone paces and calculates physiological endurance degradation.",
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
            Triathlon Pace <span className="text-brand">Predictor</span>
          </h1>
          <p className="text-lg leading-8 text-neutral-300 font-inter max-w-2xl mx-auto">
            Input your current standalone times. We factor in physiological endurance degradation (Riegel curve) and multi-sport fatigue to predict your race day splits and overall time.
          </p>
        </div>

        <Predictor />

        <div className="mt-16 bg-neutral-900 border border-neutral-800 rounded-xl p-8 text-center max-w-2xl mx-auto">
          <h3 className="text-xl font-bold text-white mb-4 font-montserrat">Knowing the pace is just step one.</h3>
          <p className="text-neutral-400 font-inter mb-6">
            Predicting a time is useless if your training plan causes burnout or injury before race day. A static plan doesn't care if you get sick. The RESILIENTO engine adapts your daily volume and intensity to get you to your goal time, injury-free.
          </p>
          <a href="/waitlist" className="inline-block bg-brand text-black font-semibold tracking-wide py-3 px-8 rounded-md transition-transform hover:scale-105">
            Join the Adaptive Engine Waitlist
          </a>
        </div>
      </div>
    </>
  );
}
