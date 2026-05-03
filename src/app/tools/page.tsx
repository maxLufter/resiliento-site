import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Free Endurance & Hybrid Training Tools',
  description: 'Calculators and estimators for triathlon pacing, Training Stress Score (TSS), and hybrid athlete week planning.',
};

const tools = [
  {
    title: 'Triathlon Race Pace Predictor',
    description: 'Calculate your predicted finish time for Sprint, Olympic, 70.3, or Ironman based on your current standalone paces and endurance degradation factors.',
    href: '/tools/triathlon-pace-predictor',
    tag: 'Triathlon',
  },
  {
    title: 'Training Stress (TSS) Estimator',
    description: 'Estimate the physiological cost of your workouts using RPE (Rate of Perceived Exertion) and duration to understand your fatigue runway.',
    href: '/tools/tss-estimator',
    tag: 'Physiology',
  },
  {
    title: 'Hybrid Athlete Week Split Builder',
    description: 'Plan your weekly schedule. See the interference effects of combining heavy strength training with endurance workouts.',
    href: '/tools/hybrid-split-builder',
    tag: 'Hybrid',
  },
  {
    title: 'Optimal Tyre Pressure',
    description: 'A highly sophisticated physics-based calculator that optimizes your casing tension against surface impedance for maximum speed.',
    href: '/tools/optimal-tyre-pressure',
    tag: 'Physics',
  },
  {
    title: 'Running Pace Calculator',
    description: 'Calculate your required pace, predict finish times, and convert running pace to equivalent speed (km/h and mph).',
    href: '/tools/running-pace-calculator',
    tag: 'Running',
  },
];

export default function ToolsIndexPage() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-24 sm:py-32 lg:px-8 pt-32 sm:pt-40">
      <div className="max-w-2xl text-center mx-auto mb-16">
        <h1 className="text-4xl font-bold tracking-tight text-white mb-6 uppercase border-b-2 border-brand/30 pb-4 inline-block font-montserrat">
          Training <span className="text-brand">Tools</span>
        </h1>
        <p className="text-lg leading-8 text-neutral-300 font-inter">
          Standalone calculators analyzing pacing, physiological stress, and training interference. For advanced dynamic adaptation, join the RESILIENTO waitlist.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {tools.map((tool) => (
          <Link
            key={tool.href}
            href={tool.href}
            className="flex flex-col bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden hover:border-brand/50 transition-colors group"
          >
            <div className="p-8 flex-1 flex flex-col">
              <span className="text-xs font-semibold text-brand font-mono uppercase tracking-wider mb-4">
                {tool.tag}
              </span>
              <h2 className="text-xl font-bold text-white mb-4 group-hover:text-brand transition-colors font-montserrat">
                {tool.title}
              </h2>
              <p className="text-neutral-400 font-inter text-sm mb-6 flex-1">
                {tool.description}
              </p>
              <div className="text-sm font-semibold text-white flex items-center group-hover:text-brand transition-colors">
                Launch Tool 
                <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
