import { Metadata } from 'next';
import Calculator from './Calculator';
import { Footprints } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Running Pace Calculator & Speed Converter | RESILIENTO',
  description: 'Free Running Pace Calculator. Plan your race strategy, calculate required pace for target finish times, predict event outcomes, and seamlessly convert pace to km/h or mph.',
  keywords: 'running pace calculator, pace to km/h converter, marathon finish time predictor, half marathon pace calculator',
};

export default function PaceCalculatorPage() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-24 sm:py-32 lg:px-8 pt-32 sm:pt-40">
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
    </div>
  );
}
