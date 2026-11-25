import Link from 'next/link';
import { toolCatalog, type ToolSlug } from '@/lib/tool-catalog';
import { ToolIcon } from './ToolIcon';

export function ToolsSpotlight({ slugs = ['hybrid-split-builder', 'race-nutrition-calculator', 'hr-zones-calculator'] }: { slugs?: ToolSlug[] }) {
  return <section className="border-b border-border py-16 sm:py-24">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-5 mb-8">
        <div><p className="text-xs font-mono text-brand uppercase tracking-widest mb-3">Free to use. No signup.</p>
          <h2 className="text-3xl sm:text-4xl text-white font-bold tracking-tight">Plan your next session or race.</h2></div>
        <Link href="/tools" className="text-sm text-brand hover:underline underline-offset-4">All training tools</Link>
      </div>
      <div className="grid md:grid-cols-3 gap-5">
        {slugs.map(slug => toolCatalog.find(t => t.slug === slug)!).map(tool => <Link key={tool.slug} href={`/tools/${tool.slug}`} className="group rounded-xl border border-border bg-surface/50 p-6 hover:border-brand/60 transition-colors">
          <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl border border-brand/20 bg-brand/10 text-brand"><ToolIcon slug={tool.slug}/></div>
          <span className="text-sm text-brand">{tool.tag}</span>
          <h3 className="mt-4 mb-3 text-xl font-bold text-white group-hover:text-brand transition-colors">{tool.title}</h3>
          <p className="text-sm text-slate-400 leading-relaxed">{tool.description}</p>
          <span className="mt-6 inline-block text-sm text-brand">Open tool</span>
        </Link>)}
      </div>
    </div>
  </section>;
}
