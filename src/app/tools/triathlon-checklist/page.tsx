import { Metadata } from 'next';
import ChecklistPlanner from './ChecklistPlanner';

export const metadata: Metadata = {
  title: 'Triathlon Race Day Checklist & Packing Planner | RESILIENTO',
  description: 'Never forget essential race gear again. Smart triathlon packing checklist that adapts to your event distance (Sprint to Ironman), wetsuit rules, and weather conditions.',
  keywords: 'triathlon checklist, triathlon packing list, race day checklist, ironman packing list, triathlon gear list, wetsuit triathlon checklist',
};

export default function ChecklistPage() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-24 sm:py-32 lg:px-8 pt-32 sm:pt-40">
      <div className="max-w-3xl text-center mx-auto mb-16">
        <h1 className="text-4xl font-bold tracking-tight text-white mb-6 uppercase border-b-2 border-brand/30 pb-4 inline-block font-montserrat">
          Race Day <span className="text-brand">Checklist</span>
        </h1>
        <p className="text-lg leading-8 text-neutral-300 font-inter">
          Smart packing planner that adapts to your event distance and race conditions. Check items off as you pack — your progress is saved automatically.
        </p>
      </div>

      <div className="max-w-4xl mx-auto">
        <ChecklistPlanner />
      </div>
    </div>
  );
}
