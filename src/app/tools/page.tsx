import type { Metadata } from 'next';
import Link from 'next/link';
import { toolCatalog } from '@/lib/tool-catalog';
import { BreadcrumbJsonLd } from '@/components/StructuredData';
import { ToolIcon } from '@/components/ToolIcon';

const tools = [
  ...toolCatalog.map(tool => ({ ...tool, href: `/tools/${tool.slug}` })),
  {
    slug: 'resiliento-bikefit', title: 'Resiliento Bikefit',
    description: 'Review your road or triathlon riding position with video-based pose tracking.',
    tag: 'Video analysis', href: 'https://bikefit.resiliento.app/',
  },
  {
    slug: 'resiliento-hybrid-tracker', title: 'HYROX & Hybrid Tracker',
    description: 'Record runs, stations and transitions on your Garmin watch. Review named laps in Connect.',
    tag: 'Garmin watch app', href: '/hyrox-tracker',
  },
  {
    slug: 'fit-analyzer', title: 'FIT Workout Analyzer',
    description: 'Explore a saved workout in your browser and prepare a card for Strava. Requires a FIT file.',
    tag: 'Saved activity analysis', href: '/tools/fit-analyzer',
  },
];
const groups = [
  { id: 'everyday-training', title: 'Everyday training', description: 'Set your pace, understand your effort and plan the week.', slugs: ['running-pace-calculator', 'hr-zones-calculator', 'hybrid-split-builder', 'tss-estimator'] },
  { id: 'race-preparation', title: 'Race preparation', description: 'Work out your race timing, fueling and what to pack.', slugs: ['race-nutrition-calculator', 'triathlon-pace-predictor', 'triathlon-checklist'] },
  { id: 'cycling', title: 'Cycling & bike setup', description: 'Dial in your tyres and review your riding position.', slugs: ['optimal-tyre-pressure', 'resiliento-bikefit'] },
  { id: 'garmin-activity-data', title: 'Garmin & activity data', description: 'For compatible Garmin watches and saved workout files.', slugs: ['resiliento-hybrid-tracker', 'fit-analyzer'] },
];
const actions: Record<string, string> = {
  'running-pace-calculator': 'Calculate pace', 'hr-zones-calculator': 'Find your zones',
  'hybrid-split-builder': 'Build your week', 'tss-estimator': 'Estimate training load',
  'race-nutrition-calculator': 'Plan race fuel', 'triathlon-pace-predictor': 'Estimate finish time',
  'triathlon-checklist': 'Build your checklist', 'optimal-tyre-pressure': 'Calculate tyre pressure',
  'resiliento-bikefit': 'Open Bikefit', 'resiliento-hybrid-tracker': 'Explore the Garmin app', 'fit-analyzer': 'Analyze a FIT file',
};
const orderedTools = groups.flatMap(group => group.slugs.map(slug => tools.find(tool => tool.slug === slug)!));
const description = 'Free training calculators and planners for running, heart-rate zones, hybrid training and race day, plus cycling tools, Garmin tracking and FIT workout analysis.';
export const metadata: Metadata = {
  alternates: { canonical: '/tools' }, title: 'Free Running, Triathlon & Hybrid Training Tools', description,
  openGraph: { title: 'Free Running, Triathlon & Hybrid Training Tools', description, url: 'https://resiliento.app/tools', images: ['/og-image.jpg'] },
  twitter: { card: 'summary_large_image', title: 'Free Running, Triathlon & Hybrid Training Tools', description, images: ['/og-image.jpg'] },
};

export default function ToolsIndexPage() {
  const collection = {
    '@context': 'https://schema.org', '@type': 'CollectionPage',
    name: 'Free Running, Triathlon & Hybrid Training Tools', url: 'https://resiliento.app/tools',
    mainEntity: { '@type': 'ItemList', numberOfItems: orderedTools.length, itemListElement: orderedTools.map((tool, index) => ({
      '@type': 'ListItem', position: index + 1, name: tool.title, url: new URL(tool.href, 'https://resiliento.app').href,
    })) },
  };
  return (
    <div className="mx-auto max-w-6xl px-5 pb-24 pt-36 sm:px-8 sm:pt-40">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collection).replace(/</g, '\\u003c') }} />
      <BreadcrumbJsonLd items={[{ name: 'Home', url: 'https://resiliento.app' }, { name: 'Free Training Tools', url: 'https://resiliento.app/tools' }]} />
      <header className="mx-auto mb-12 max-w-2xl text-center">
        <h1 className="mb-5 font-montserrat text-4xl font-bold tracking-tight text-white sm:text-5xl">Free training <span className="text-brand">tools.</span></h1>
        <p className="text-lg leading-relaxed text-slate-300">Start with your everyday training. Find race preparation, cycling tools and Garmin apps below.</p>
      </header>
      <nav aria-label="Tool categories" className="mb-14 flex flex-wrap justify-center gap-2 sm:gap-3">
        {groups.map(group => <a key={group.id} href={`#${group.id}`} className="inline-flex min-h-11 items-center rounded-full border border-white/15 px-4 py-2 text-sm text-slate-300 transition hover:border-brand/60 hover:text-brand focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand">{group.title}</a>)}
      </nav>
      <div className="space-y-14 sm:space-y-16">
        {groups.map(group => <section key={group.id} id={group.id} aria-labelledby={`${group.id}-title`} className="scroll-mt-40">
          <header className="mb-6 border-t border-white/10 pt-7">
            <h2 id={`${group.id}-title`} className="text-2xl font-semibold tracking-tight text-white">{group.title}</h2>
            <p className="mt-2 text-base leading-relaxed text-slate-400">{group.description}</p>
          </header>
          <div className={`grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 ${group.slugs.length === 3 ? 'lg:grid-cols-3' : ''}`}>
            {group.slugs.map(slug => {
              const tool = tools.find(tool => tool.slug === slug)!;
              const watch = slug === 'resiliento-hybrid-tracker';
              return <Link key={slug} href={tool.href} className="group flex min-w-0 flex-col rounded-2xl border border-white/10 bg-[#0a0d0c] p-6 transition duration-200 hover:-translate-y-0.5 hover:border-brand/50 hover:bg-[#0e1411] motion-reduce:transform-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand sm:p-7">
                <div className={`mb-6 inline-flex h-14 w-14 items-center justify-center self-start rounded-xl border ${watch ? 'border-[#ffed00]/25 bg-[#ffed00]/10 text-[#ffed00]' : 'border-brand/20 bg-brand/10 text-brand'}`}><ToolIcon slug={slug} size={30}/></div>
                <p className="mb-2 text-sm text-slate-400">{tool.tag}</p>
                <h3 className="mb-3 text-xl font-semibold tracking-tight text-white transition group-hover:text-brand">{tool.title}</h3>
                <p className="mb-6 flex-1 text-base leading-relaxed text-slate-400">{tool.description}</p>
                <span className="text-sm font-semibold text-brand">{actions[slug]}</span>
              </Link>;
            })}
          </div>
        </section>)}
      </div>
    </div>
  );
}
