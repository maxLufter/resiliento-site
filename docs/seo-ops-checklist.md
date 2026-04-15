# Production SEO Operations Checklist

This checklist contains manual actions required post-deployment to ensure immediate indexing and ongoing search health.

## Immediate Post-Deploy Actions
- [ ] **Verify Production Canonicals:** Open `https://resiliento.app` and sport-specific pages. Inspect `head` to ensure `<link rel="canonical" href="...">` resolves properly to the production domain.
- [ ] **Verify Robots.txt:** Navigate to `https://resiliento.app/robots.txt` and confirm `User-agent: *` is allowed to access `/`. Ensure it points to the correct sitemap URL.
- [ ] **Verify Sitemap:** Navigate to `https://resiliento.app/sitemap.xml` and confirm no dead links, staging URLs, or `localhost` paths exist.
- [ ] **Verify Open Graph:** Use a tool like https://www.opengraph.xyz/ to preview `https://resiliento.app`. Verify that `og-image.jpg` correctly renders with proper proportions and the correct category title.
- [ ] **Verify Structured Data:** Copy the source of the homepage and test it in the [Google Rich Results Test](https://search.google.com/test/rich-results). Ensure `SoftwareApplication`, `Organization`, `WebSite`, and `FAQPage` return no critical errors.

## Search Engine Submissions
- [ ] **Google Search Console (GSC):**
  - Add/Verify `https://resiliento.app` if not already done.
  - Navigate to **Sitemaps** -> Submit `https://resiliento.app/sitemap.xml`.
  - Use **URL Inspection** -> Request Indexing for the homepage, `/triathlon`, `/hyrox`, `/running`, `/hybrid-training-engine`, and `/adaptive-training-planner`.
- [ ] **Bing Webmaster Tools (BWT):**
  - Import property from Google Search Console or verify manually.
  - Submit sitemap to Bing.
  - Since we have an IndexNow script (`scripts/indexnow.mjs`), trigger it to immediately push our URLs to Bing/Yandex.

## Day 7 Monitoring
- [ ] Review GSC **Pages** report. Check for "Crawled - currently not indexed" or "Discovered - currently not indexed" statuses on key pages.
- [ ] Query Google for `site:resiliento.app` to verify all submitted pages are live in the index.
- [ ] Perform an incognito semantic search test (e.g., "adaptive triathlon training app") to see if the targeted sub-pages rank or appear.
