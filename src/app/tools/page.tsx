import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { toolCatalog } from '@/lib/tool-catalog';
import { BreadcrumbJsonLd } from '@/components/StructuredData';

const tools = [
  {
    slug: 'resiliento-hybrid-tracker',
    title: 'Resiliento: HYROX & Hybrid Tracker',
    description: 'Free standalone Garmin app for HYROX races & hybrid training — 101 watches, Roxzone splits, 10 presets, Concept2 PM5 BLE, and named Garmin Connect laps.',
    tag: 'Free Garmin Watch App · Connect IQ',
    href: '/hyrox-tracker',
  },
  ...toolCatalog.map(tool => ({ ...tool, href: `/tools/${tool.slug}` })),
  {
    slug: 'resiliento-bikefit',
    title: 'Resiliento Bikefit',
    description: 'Analyze a side-view riding video with AI pose tracking, then compare your road or triathlon position after an adjustment.',
    tag: 'AI bike fit',
    href: 'https://bikefit.resiliento.app/',
  },
];

export const metadata: Metadata = {
  alternates: { canonical: "/tools" },
  title: 'Free Running, Triathlon & Hybrid Training Tools',
  description: 'Eight free training tools: running pace, LTHR zones, race nutrition, triathlon time, packing checklist, tyre pressure, training load and a hybrid split builder.',
  openGraph: {
    title: 'Free Running, Triathlon & Hybrid Training Tools',
    description: 'Calculate pace and zones, plan race nutrition and equipment, or build a running and strength week. Eight free tools with examples and methods.',
    url: 'https://resiliento.app/tools',
    images: ['/og-image.jpg'],
  },
  twitter: { card: 'summary_large_image', title: 'Free Running, Triathlon & Hybrid Training Tools', description: 'Eight free calculators and planners, with worked examples and methods. No signup required.', images: ['/og-image.jpg'] },
};

export default function ToolsIndexPage() {
  const collection = {
    '@context': 'https://schema.org', '@type': 'CollectionPage',
    name: 'Free Running, Triathlon & Hybrid Training Tools', url: 'https://resiliento.app/tools',
    mainEntity: { '@type': 'ItemList', numberOfItems: tools.length, itemListElement: tools.map((tool, index) => ({
      '@type': 'ListItem', position: index + 1, name: tool.title, url: new URL(tool.href, 'https://resiliento.app').href,
    })) },
  };
  return (
    <div className="max-w-7xl mx-auto px-6 py-24 sm:py-32 lg:px-8 pt-32 sm:pt-40">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collection).replace(/</g, '\\u003c') }} />
      <BreadcrumbJsonLd items={[{ name: 'Home', url: 'https://resiliento.app' }, { name: 'Free Training Tools', url: 'https://resiliento.app/tools' }]} />
      <div className="max-w-2xl text-center mx-auto mb-16">
        <h1 className="text-4xl font-bold tracking-tight text-white mb-6 uppercase border-b-2 border-brand/30 pb-4 inline-block font-montserrat">
          Free Training <span className="text-brand">Tools</span>
        </h1>
        <p className="text-lg leading-8 text-neutral-300 font-inter">
          Free calculators and planners for running, triathlon and hybrid training, plus our Garmin watch app and video-based bike fitting.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {tools.map((tool) => {
          const isFeaturedApp = tool.slug === 'resiliento-hybrid-tracker';
          if (isFeaturedApp) {
            return (
              <Link
                key={tool.slug}
                href={tool.href}
                className="md:col-span-2 grid md:grid-cols-[1.05fr_0.95fr] bg-neutral-900 border border-[#FFED00]/30 rounded-xl overflow-hidden hover:border-[#FFED00]/70 transition-colors group"
              >
                <div className="p-8 flex-1 flex flex-col relative justify-between">
                  <div>
                    <span className="text-xs font-semibold text-[#FFED00] font-mono uppercase tracking-wider mb-3 block">
                      {tool.tag}
                    </span>
                    <h2 className="text-2xl font-bold text-white mb-3 group-hover:text-[#FFED00] transition-colors font-montserrat">
                      {tool.title}
                    </h2>
                    <p className="text-neutral-300 font-inter text-sm leading-relaxed mb-6">
                      {tool.description}
                    </p>
                  </div>
                  <div className="text-sm font-semibold text-[#FFED00] flex items-center">
                    Explore the app
                    <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                  </div>
                </div>
                <div className="relative bg-black flex items-center justify-center p-4 md:p-5 border-t md:border-t-0 md:border-l border-neutral-800">
                  <Image
                    src="/hybrid-tracker/hero-banner.jpg"
                    alt="Resiliento: HYROX & Hybrid Tracker Garmin watch hero preview"
                    width={1440}
                    height={720}
                    className="w-full h-auto rounded-lg object-cover"
                  />
                </div>
              </Link>
            );
          }
          return (
            <Link
              key={tool.slug}
              href={tool.href}
              className="flex flex-col bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden hover:border-brand/50 transition-colors group"
            >
              <div className="p-8 flex-1 flex flex-col relative">
                <div className="absolute top-8 right-8 text-neutral-600 group-hover:text-brand/40 transition-colors">
                  <ArrowUpRight size={28} strokeWidth={1.5} />
                </div>
                <span className="text-xs font-semibold text-brand font-mono uppercase tracking-wider mb-4 block">
                  {tool.tag}
                </span>
                <h2 className="text-xl font-bold text-white mb-4 group-hover:text-brand transition-colors font-montserrat pr-10">
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
          );
        })}
      </div>

      <section className="max-w-4xl mx-auto mt-14 border-t border-white/10 pt-10 text-slate-300 leading-relaxed">
        <h2 className="text-2xl font-bold text-white mb-5">Which tool should I start with?</h2>
        <div className="space-y-5">
          <p><strong className="text-white">Planning a running race?</strong> Use the <Link href="/tools/running-pace-calculator" className="text-brand underline">running pace calculator</Link> for your target finish time, then the <Link href="/tools/race-nutrition-calculator" className="text-brand underline">race nutrition calculator</Link> to estimate products for that duration.</p>
          <p><strong className="text-white">Preparing for triathlon?</strong> Start with the <Link href="/tools/triathlon-pace-predictor" className="text-brand underline">triathlon finish time calculator</Link>, review your <Link href="/tools/optimal-tyre-pressure" className="text-brand underline">bike tyre pressure</Link>, and pack with the <Link href="/tools/triathlon-checklist" className="text-brand underline">race day checklist</Link>.</p>
          <p><strong className="text-white">Combining running and lifting?</strong> Create a week with the <Link href="/tools/hybrid-split-builder" className="text-brand underline">hybrid split builder</Link>. Use <Link href="/tools/hr-zones-calculator" className="text-brand underline">LTHR zones</Link> as an intensity reference and <Link href="/tools/tss-estimator" className="text-brand underline">session-RPE load</Link> to compare completed sessions.</p>
        </div>
      </section>
    </div>
  );
}
