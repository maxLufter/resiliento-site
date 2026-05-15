import { Metadata } from 'next';
import Link from 'next/link';
import HRZonesCalculator from './HRZonesCalculator';

export const metadata: Metadata = {
  title: 'Heart Rate Training Zones Calculator | LTHR | RESILIENTO',
  description: 'Calculate your exact endurance training zones using the RESILIENTO LTHR model to optimize your conditioning.',
  openGraph: {
    title: 'Heart Rate Training Zones Calculator',
    description: 'Calculate your exact endurance training zones using proven methodologies.',
  }
};

export default function HRZonesCalculatorPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Heart Rate Training Zones Calculator",
    "url": "https://resiliento.app/tools/hr-zones-calculator",
    "description": "Calculate your exact endurance training zones using the RESILIENTO LTHR model.",
    "applicationCategory": "HealthAndFitnessApplication",
    "operatingSystem": "Any"
  };

  return (
    <main className="min-h-screen bg-black pt-24 pb-20 relative overflow-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      {/* Decorative Background Elements */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-brand/50 to-transparent opacity-50" />
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-brand/10 blur-[100px] rounded-full pointer-events-none" />
      <div className="absolute top-1/3 -left-40 w-96 h-96 bg-blue-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Header Section */}
        <div className="mb-8">
          <Link href="/tools" className="text-xs font-mono tracking-[0.2em] uppercase text-slate-500 hover:text-brand transition-colors">← All Tools</Link>
        </div>
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter mb-6 font-montserrat flex items-center justify-center gap-4">
            <span className="text-brand">❤️</span> 
            Heart Rate <span className="text-brand">ZONES</span>
          </h1>
          <p className="text-neutral-400 text-lg">
            Dial in your training intensities. Calculate your exact physiological zones using the proprietary RESILIENTO LTHR model.
          </p>
        </div>

        {/* Core Tool */}
        <HRZonesCalculator />
        
        {/* Educational Content Below */}
        <div className="max-w-3xl mx-auto mt-20 space-y-12">
          <section className="bg-neutral-900/50 border border-neutral-800 rounded-2xl p-8">
            <h3 className="text-xl font-bold text-white mb-4">Why LTHR?</h3>
            <p className="text-neutral-400 text-sm leading-relaxed mb-6">
              Heart rate zones are critical for ensuring you are targeting the correct energy systems during training. If you ride or run purely by feel, you risk making your easy days too hard, and your hard days too easy.
            </p>
            
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="w-12 h-12 shrink-0 bg-brand/10 border border-brand/20 rounded-xl flex items-center justify-center text-brand font-bold">1</div>
                <div>
                  <h4 className="text-sm font-bold text-white uppercase tracking-wide mb-1">Anchored to Physiology, not Maximums</h4>
                  <p className="text-xs text-neutral-400 leading-relaxed">
                    Lactate Threshold Heart Rate (LTHR) is the average heart rate you can sustain for a 60-minute all-out race effort. Because it anchors your zones to your actual metabolic threshold rather than an arbitrary maximum, it is universally considered the most accurate method for endurance athletes. The RESILIENTO framework uses a precision 5-zone LTHR system mapped directly to our hybrid training plans.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 shrink-0 bg-neutral-800 border border-neutral-700 rounded-xl flex items-center justify-center text-neutral-400 font-bold">2</div>
                <div>
                  <h4 className="text-sm font-bold text-white uppercase tracking-wide mb-1">Standardized Intensity</h4>
                  <p className="text-xs text-neutral-400 leading-relaxed">
                    Unlike standard % Max HR formulas that guess your limits based on age, LTHR is completely individualized. Two athletes with identical Max HRs can have wildly different Lactate Thresholds, making generic zones dangerous for structured training. By testing and setting your LTHR, every workout specifically targets the intended adaptation.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <div className="mt-16 bg-neutral-900 border border-neutral-800 rounded-xl p-8 text-center max-w-2xl mx-auto">
            <h3 className="text-xl font-bold text-white mb-4 font-montserrat">Training zones are only as good as the plan that uses them.</h3>
            <p className="text-neutral-400 font-inter mb-6">
              Knowing your LTHR is the first step. The RESILIENTO engine automatically structures your entire week of endurance and strength around these exact physiological zones to guarantee progress without overtraining.
            </p>
            <Link href="/waitlist" className="inline-block bg-brand text-black font-semibold tracking-wide py-3 px-8 rounded-md transition-transform hover:scale-105">
              Join the Adaptive Engine Waitlist
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
