import type { Metadata } from 'next';
import Link from 'next/link';
import { toolCatalog, type ToolSlug } from '@/lib/tool-catalog';
import { toolGuides } from '@/lib/tool-guides';
import { BreadcrumbJsonLd } from './StructuredData';
import { ToolExperience } from './ToolExperience';

export function toolMetadata(slug: ToolSlug): Metadata {
  const { title, description } = toolGuides[slug];
  const url = `/tools/${slug}`;
  return {
    title, description,
    alternates: { canonical: url },
    openGraph: { title, description, url, type: 'website', images: ['/og-image.jpg'] },
    twitter: { card: 'summary_large_image', title, description, images: ['/og-image.jpg'] },
  };
}

/** Server-rendered guidance stays available to readers and crawlers without interaction. */
export function ToolPage({ slug, children }: { slug: ToolSlug; children: React.ReactNode }) {
  const guide = toolGuides[slug];
  const url = `https://resiliento.app/tools/${slug}`;
  const schema = {
    '@context': 'https://schema.org', '@type': 'WebApplication', '@id': `${url}#tool`,
    name: guide.heading, description: guide.description, url,
    applicationCategory: 'HealthAndFitnessApplication', operatingSystem: 'Any',
    browserRequirements: 'Requires JavaScript for interactive calculations.',
    isAccessibleForFree: true, inLanguage: 'en',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    publisher: { '@type': 'Organization', name: 'RESILIENTO', url: 'https://resiliento.app' },
  };
  return <div className="max-w-6xl mx-auto px-5 sm:px-8 pt-32 sm:pt-40 pb-20">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, '\\u003c') }} />
    <BreadcrumbJsonLd items={[{ name: 'Home', url: 'https://resiliento.app' }, { name: 'Free Training Tools', url: 'https://resiliento.app/tools' }, { name: guide.heading, url }]} />
    <nav aria-label="Breadcrumb" className="text-xs sm:text-sm text-slate-400 flex flex-wrap gap-2 mb-8">
      <Link href="/" className="hover:text-brand">Home</Link><span aria-hidden="true">/</span>
      <Link href="/tools" className="hover:text-brand">Free training tools</Link><span aria-hidden="true">/</span>
      <span aria-current="page">{guide.heading}</span>
    </nav>
    <header className="max-w-3xl mx-auto text-center mb-10 sm:mb-14">
      <p className="font-mono text-xs uppercase tracking-widest text-brand mb-4">Free tool · No signup required</p>
      <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-white font-montserrat mb-6">{guide.heading}</h1>
      <p className="text-base sm:text-lg leading-relaxed text-slate-300">{guide.intro}</p>
      <nav aria-label="On this page" className="flex flex-wrap justify-center gap-x-5 gap-y-3 mt-6 text-sm text-slate-400">
        <a href="#calculator" className="hover:text-brand underline underline-offset-4">Use the tool</a>
        <a href="#how-to-use" className="hover:text-brand underline underline-offset-4">How to use</a>
        <a href="#worked-example" className="hover:text-brand underline underline-offset-4">Example</a>
        <a href="#method" className="hover:text-brand underline underline-offset-4">Method</a>
        <a href="#questions" className="hover:text-brand underline underline-offset-4">Questions</a>
      </nav>
    </header>
    <div id="calculator" className="scroll-mt-32"><ToolExperience slug={slug}>{children}</ToolExperience></div>
    <article aria-label={`${guide.heading} guide`} className="max-w-3xl mx-auto mt-16 space-y-12 text-slate-300 leading-relaxed">
      <section id="how-to-use" className="scroll-mt-32">
        <h2 className="text-2xl font-bold text-white mb-5">How to use this {slug === 'triathlon-checklist' ? 'checklist' : slug === 'hybrid-split-builder' ? 'planner' : 'calculator'}</h2>
        <ol className="list-decimal pl-6 space-y-3 marker:text-brand">{guide.steps.map(step => <li key={step}>{step}</li>)}</ol>
      </section>
      <section id="worked-example" className="scroll-mt-32">
        <h2 className="text-2xl font-bold text-white mb-4">{guide.example.title}</h2>
        <p className="mb-6">{guide.example.description}</p>
        <div className="overflow-x-auto rounded-lg border border-white/10">
          <table className="w-full text-left text-sm">
            <caption className="sr-only">{guide.example.title}</caption>
            <thead className="bg-white/5 text-white"><tr>{guide.example.columns.map(col => <th key={col} scope="col" className="p-3 sm:p-4 font-semibold">{col}</th>)}</tr></thead>
            <tbody>{guide.example.rows.map(row => <tr key={row[0]} className="border-t border-white/10">{row.map((cell, i) => i === 0 ? <th key={i} scope="row" className="p-3 sm:p-4 font-medium text-white">{cell}</th> : <td key={i} className="p-3 sm:p-4 tabular-nums">{cell}</td>)}</tr>)}</tbody>
          </table>
        </div>
      </section>
      <section id="method" className="scroll-mt-32">
        <h2 className="text-2xl font-bold text-white mb-4">{guide.method.title}</h2>
        <div className="space-y-4">{guide.method.paragraphs.map(p => <p key={p}>{p}</p>)}</div>
        {guide.sources && <ul className="mt-5 space-y-2 text-sm">{guide.sources.map(source => <li key={source.href}><a href={source.href} className="text-brand underline underline-offset-4">{source.title} ↗</a></li>)}</ul>}
      </section>
      <section id="questions" className="scroll-mt-32">
        <h2 className="text-2xl font-bold text-white mb-6">Frequently asked questions</h2>
        <div className="space-y-7">{guide.faqs.map(faq => <div key={faq.question}><h3 className="text-lg font-semibold text-white mb-2">{faq.question}</h3><p>{faq.answer}</p></div>)}</div>
      </section>
      <p className="text-sm text-slate-400 border-t border-white/10 pt-6">By RESILIENTO · Method and examples updated <time dateTime="2026-11-05">5 November 2026</time>. Found an issue? <a href="mailto:support@resiliento.app" className="underline hover:text-brand">Tell us what you entered and the result you expected.</a></p>
    </article>
    <section className="mt-16 border-t border-white/10 pt-10" aria-label="Related training tools">
      <h2 className="text-2xl font-bold text-white mb-6">Continue planning</h2>
      <div className="grid md:grid-cols-3 gap-5">{guide.related.map(({ slug: relatedSlug, reason }) => <Link key={relatedSlug} href={`/tools/${relatedSlug}`} className="rounded-xl border border-white/10 p-6 hover:border-brand/50 transition-colors group"><h3 className="text-lg font-semibold text-white group-hover:text-brand mb-3">{toolCatalog.find(t => t.slug === relatedSlug)!.title} →</h3><p className="text-sm leading-relaxed text-slate-400">{reason}</p></Link>)}</div>
    </section>
  </div>;
}
