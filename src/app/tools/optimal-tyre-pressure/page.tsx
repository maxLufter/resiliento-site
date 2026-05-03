import { Metadata } from 'next';
import Calculator from './Calculator';

export const metadata: Metadata = {
  title: 'Optimal Tyre Pressure Calculator (Physics-Based) | RESILIENTO',
  description: 'Calculate your optimal cycling tire pressure. A sophisticated physics-based calculator balancing casing tension, surface impedance, hookless rim limits, and wet weather conditions for maximum speed.',
  keywords: 'optimal tyre pressure calculator, cycling tire pressure, road bike tire pressure, gravel bike tire pressure, silca pressure calculator alternative',
};

export default function TyrePressurePage() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-24 sm:py-32 lg:px-8 pt-32 sm:pt-40">
      <div className="max-w-3xl text-center mx-auto mb-16">
        <h1 className="text-4xl font-bold tracking-tight text-white mb-6 uppercase border-b-2 border-brand/30 pb-4 inline-block font-montserrat">
          Optimal <span className="text-brand">Tyre Pressure</span>
        </h1>
        <p className="text-lg leading-8 text-neutral-300 font-inter">
          Physics-based pressure calculation. Optimize your casing tension against surface impedance to find the exact breakpoint where you ride fastest and smoothest.
        </p>
      </div>

      <div className="max-w-5xl mx-auto">
        <Calculator />
      </div>
    </div>
  );
}
