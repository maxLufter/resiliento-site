import { Metadata } from 'next';
import NutritionCalculator from './NutritionCalculator';

export const metadata: Metadata = {
  title: 'Race Nutrition Calculator — Carbs, Sodium, Caffeine & Fluid Plan | RESILIENTO',
  description: 'Evidence-based race nutrition planner for triathlon, cycling, and running. Calculate carbohydrate, sodium, fluid, and caffeine targets based on your event distance, body mass, gut tolerance, and conditions.',
  keywords: 'race nutrition calculator, triathlon nutrition plan, ironman nutrition strategy, carb intake calculator, race fueling plan, sodium electrolyte calculator',
};

export default function NutritionPage() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-24 sm:py-32 lg:px-8 pt-32 sm:pt-40">
      <div className="max-w-3xl text-center mx-auto mb-16">
        <h1 className="text-4xl font-bold tracking-tight text-white mb-6 uppercase border-b-2 border-brand/30 pb-4 inline-block font-montserrat">
          Race <span className="text-brand">Nutrition</span> Calculator
        </h1>
        <p className="text-lg leading-8 text-neutral-300 font-inter">
          Evidence-based fueling strategy for your next race. Calculate carbohydrate, sodium, fluid, and caffeine targets — then see exactly what to consume and when.
        </p>
      </div>

      <div className="max-w-5xl mx-auto">
        <NutritionCalculator />
      </div>
    </div>
  );
}
