import assert from 'node:assert/strict';
import { toolCatalog } from '../src/lib/tool-catalog.ts';
import { toolGuides } from '../src/lib/tool-guides.ts';

// Read-only checks against a local build or the public deployment. Never submits a form.
const base = new URL(process.argv[2] || 'https://resiliento.app');
const productionOrigin = 'https://resiliento.app';
const decode = text => text.replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#x27;|&#39;/g, "'");
async function get(path) {
  const response = await fetch(new URL(path, base), { redirect: 'follow', signal: AbortSignal.timeout(30000) });
  assert.equal(response.status, 200, `${path}: HTTP ${response.status}`);
  assert(!/noindex/i.test(response.headers.get('x-robots-tag') || ''), `${path}: noindex header`);
  return { html: await response.text(), url: response.url };
}
const reports = await Promise.all(toolCatalog.map(async tool => {
  const path = `/tools/${tool.slug}`;
  const { html, url } = await get(path);
  const guide = toolGuides[tool.slug];
  assert.equal(new URL(url).pathname, path, `${path}: unexpected redirect`);
  assert.equal((html.match(/<h1[\s>]/g) || []).length, 1, `${path}: expected one h1`);
  assert.equal(decode(html.match(/<title>(.*?)<\/title>/s)?.[1] || ''), `${guide.title} | RESILIENTO`, `${path}: title`);
  assert(html.includes(`rel="canonical" href="${productionOrigin}${path}"`), `${path}: canonical`);
  for (const marker of ['name="description"', 'property="og:title"', 'name="twitter:title"', 'id="how-to-use"', 'id="worked-example"', 'id="method"', 'id="questions"', 'datetime="2026-11-05"']) {
    assert(html.toLowerCase().includes(marker.toLowerCase()), `${path}: missing ${marker}`);
  }
  const metadata = html.match(/<meta\b[^>]*>/g) || [];
  assert(!metadata.some(tag => /name="robots"/.test(tag) && /noindex/.test(tag)), `${path}: noindex meta`);
  const schemas = [...html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)].map(match => JSON.parse(match[1]));
  const application = schemas.find(schema => schema['@type'] === 'WebApplication');
  assert.equal(application?.name, guide.heading, `${path}: application schema`);
  assert.equal(application.url, `${productionOrigin}${path}`, `${path}: application URL`);
  assert.equal(application.offers.price, '0', `${path}: free tool offer`);
  assert(schemas.some(schema => schema['@type'] === 'BreadcrumbList'), `${path}: breadcrumbs`);
  for (const related of guide.related) assert(html.includes(`href="/tools/${related.slug}"`), `${path}: related link`);
  assert(html.includes(`href="/waitlist?from=${tool.slug}"`), `${path}: attributed CTA`);
  return { path, status: 200, title: guide.title, serverRenderedGuide: true };
}));
const [{ html: sitemap }, { html: robots }, { html: index }, { html: home }, { html: waitlist }] = await Promise.all([
  get('/sitemap.xml'), get('/robots.txt'), get('/tools'), get('/'), get('/waitlist'),
]);
for (const tool of toolCatalog) {
  assert(sitemap.includes(`<loc>${productionOrigin}/tools/${tool.slug}</loc>`), `sitemap: ${tool.slug}`);
  assert(index.includes(`href="/tools/${tool.slug}"`), `catalog: ${tool.slug}`);
}
assert(robots.includes('Sitemap: https://resiliento.app/sitemap.xml'), 'robots sitemap declaration');
assert(!/^Disallow:\s*\/\s*$/m.test(robots), 'robots blocks the whole site');
assert(index.includes('CollectionPage') && index.includes('ItemList'), 'catalog collection schema');
assert(home.includes('href="/tools"'), 'home links to tools');
assert(waitlist.includes('type="email"'), 'waitlist form renders');
console.log(JSON.stringify({ origin: base.origin, checkedAt: new Date().toISOString(), tools: reports, sitemap: 'passed', robots: 'passed', catalog: 'passed', home: 'passed', waitlist: 'renders; not submitted' }, null, 2));
