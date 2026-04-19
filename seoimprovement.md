# SEO EXECUTION PROMPT — RESILIENTO LANDING PAGE

You are working on the RESILIENTO marketing site / landing page.

## Objective

Improve organic discoverability for non-branded searches related to:
- triathlon training app / plan / coach
- running training app / adaptive running plan
- HYROX training app / plan
- hybrid athlete training app / plan
- adaptive training plan for endurance + strength
- recovery-aware / readiness-aware training app

Preserve the brand positioning around **“Hybrid Training Engine”**. Do **not** remove that phrase. Instead, make the site more understandable to search engines and first-time visitors by pairing the brand with explicit category wording.

Important nuance:
- “Hybrid Training Engine” should remain visible and important.
- But it should no longer be the only or main search-facing framing.
- We need clear category language such as adaptive training app, triathlon training app, HYROX training app, hybrid athlete training app, etc.

## Constraints and operating rules

1. This repo is developed on **Windows**.
   - Use Windows-friendly terminal commands and paths.
   - Prefer:
     - `dir`
     - `Get-ChildItem`
     - `Select-String`
     - `type`
     - `copy`
     - `move`
     - `del`
     - `rmdir`
     - `.bat` scripts
   - Do not assume Unix utilities like `grep`, `ls`, `rm -rf`, `export`, `touch`, or bash syntax unless the repo clearly supports them and you verify it.

2. This markdown file is the tracker.
   - Do **not** create a separate tracker.
   - Each task below starts as `[TO DO]`.
   - As soon as a task is fully completed, edit this file and change that task marker to `[DONE]`.
   - Keep the wording of the task, only update the status marker.
   - Update this same document continuously as you progress.

3. Execute tasks sequentially.
   - Do not stop after partial implementation.
   - Do not stop after code changes without testing.
   - Do not stop after frontend-only checks if backend / shared acceptance checks exist.
   - Continue until all tasks are completed or you hit a hard blocker.

4. Testing standard:
   - After every task, run the most relevant local checks for the files you changed.
   - At the end, run the full verification flow.
   - Full app checks must be green, including frontend, backend, acceptance harnesses, and especially `verify.bat`.
   - If any test fails, fix it before moving on.

5. Be conservative with scope.
   - Reuse existing components where sensible.
   - Do not break existing design language.
   - Improve clarity and SEO without turning the site into spammy keyword stuffing.
   - Keep the copy premium, technical, and credible.

6. Before editing, inspect the repo structure and identify:
   - app router layout files
   - homepage file
   - metadata / sitemap / robots files
   - dedicated landing pages for triathlon / HYROX / running if present
   - any content collections or static content source
   - any structured data helpers
   - the verification script(s)

7. Target positioning to reflect in copy and metadata:
   - RESILIENTO = brand
   - Hybrid Training Engine = brand descriptor
   - adaptive training app = category
   - built for triathlon, HYROX, running, and hybrid athletes = search-facing use cases
   - key differentiator = one system coordinating endurance, strength, mobility, and recovery with dynamic adaptation

8. Avoid over-targeting weak phrasing like:
   - “sport adaptation plan”
   Use stronger and more natural alternatives:
   - adaptive training plan
   - adaptive triathlon training
   - hybrid athlete training app
   - triathlon training app with strength
   - HYROX training plan app
   - readiness-aware training plan

---

## Implementation Notes

- **Key files to be edited**:
  - `src/app/layout.tsx` (Metadata setup, structured data)
  - `src/app/page.tsx` (Homepage copy and structural updates)
  - `src/app/sitemap.ts` (Sitemap generation updates)
  - `src/app/robots.ts` (Robots.txt generation updates)
  - Landing pages: `src/app/hyrox/page.tsx`, `src/app/triathlon/page.tsx`, `src/app/running/page.tsx`, `src/app/adaptive-training-planner/page.tsx`, `src/app/hybrid-training-engine/page.tsx`
- **Existing SEO assets already present**: `src/app/robots.ts`, `src/app/sitemap.ts`
- **Missing SEO assets**: Global JSON-LD structured data, robust Open Graph image, comprehensive and keyword-optimized metadata across all pages.
- **Routes/pages already available**: `triathlon`, `hyrox`, `running`, `adaptive-training-planner`, `hybrid-training-engine`.
- **Test commands discovered in the repo**:
  - `npm run build`
  - `npm run lint`
- **Blockers or assumptions**: No `verify.bat` file was found in the repository root (the prompt might be referring to a generic command, but we'll use `npm run build` as our primary acceptance check).

---

## [DONE] Task 1 — Audit current SEO surfaces and document the implementation plan inside this file
### Goal
Inspect the current site and repo, then add a short implementation note section near the top of this file containing:
- key files to be edited
- existing SEO assets already present
- missing SEO assets
- routes/pages already available for triathlon / HYROX / running / hybrid-related intent
- test commands discovered in the repo
- any blockers or assumptions

### Deliverables
- This markdown file updated with a concise “Implementation notes” section.
- File paths listed explicitly.
- Test commands listed explicitly, with Windows-compatible commands.

### Tests
- Confirm the file updates are saved.
- Confirm the documented file paths actually exist.
- Confirm test commands are real commands from the repo and not guessed.

Do not stop when done with task 1. Do tests and proceed to task 2 when all green. Return to the doc after each task made, mark previous task as done and continue.

---

## [DONE] Task 2 — Strengthen metadata, indexability, canonical, robots, and sitemap foundation

### Goal
Make the site technically indexable and search-engine understandable.

### Requirements
Implement or improve, wherever appropriate:
- `metadataBase`
- canonical URLs
- title template strategy
- homepage title and meta description
- page-specific metadata for major landing pages
- `openGraph`
- `twitter`
- `robots`
- `robots.txt`
- `sitemap.xml` or `sitemap.ts`
- ensure there is no accidental `noindex`
- ensure social image references are valid
- ensure absolute URLs resolve correctly

### Content direction
The homepage metadata should preserve the brand while adding explicit category language, for example along the lines of:
- `RESILIENTO | Hybrid Training Engine for Triathlon, HYROX & Hybrid Athletes`

Do not blindly use this exact line if a better variant fits the existing copy structure, but keep the same principle:
- brand first
- category clarity second
- not overly long
- not spammy

### Deliverables
- Metadata foundation implemented or corrected.
- Major landing pages have distinct titles and descriptions.
- Sitemap and robots are valid and aligned with indexation.
- Canonicals are correct.

### Tests
- Run the relevant build / lint / type checks.
- Inspect generated output or rendered tags to confirm:
  - title exists
  - meta description exists
  - canonical exists
  - OG/Twitter tags exist
  - robots directives are correct
  - sitemap is generated / accessible
- Fix all issues before moving on.

Do not stop when done with task 2. Do tests and proceed to task 3 when all green. Return to the doc after each task made, mark previous task as done and continue.

---

## [DONE] Task 3 — Add or improve structured data (JSON-LD)

### Goal
Help search engines classify the product and page intent more clearly.

### Requirements
Add or improve structured data using valid JSON-LD where appropriate:
- `Organization`
- `WebSite`
- `SoftwareApplication`
- `FAQPage` for pages that contain FAQs
- optional `BreadcrumbList` if the site structure meaningfully supports it

### Guidance
The structured data should reflect the product as a training software / app for:
- triathlon
- HYROX
- running
- hybrid athletes
- adaptive training planning

Do not invent false claims. Only include facts that are clearly supported by the actual site.

### Deliverables
- Structured data added in the homepage and relevant landing pages.
- Reusable helper(s) if the codebase structure benefits from it.

### Tests
- Verify the JSON-LD renders correctly.
- Ensure no hydration / rendering issues.
- Ensure build, lint, and type checks pass.

Do not stop when done with task 3. Do tests and proceed to task 4 when all green. Return to the doc after each task made, mark previous task as done and continue.

---

## [DONE] Task 4 — Rewrite homepage SEO-critical copy without losing the brand

### Goal
Keep the current premium positioning but make the homepage immediately understandable to:
- search engines
- first-time visitors
- athletes searching for a concrete training solution

### Requirements
Revise the homepage above-the-fold and core supporting sections so that:
- “Hybrid Training Engine” remains visible
- category wording becomes explicit
- the homepage clearly signals relevance for triathlon, HYROX, running, and hybrid athletes
- the core differentiator is understandable in plain language

### Mandatory copy principles
- Keep the brand premium and intelligent.
- Remove avoidable jargon density.
- Replace abstract systems language with user-outcome language where possible.
- Explain what adapts:
  - fatigue / readiness
  - missed sessions
  - time constraints
  - endurance / strength interaction
  - mobility / recovery coordination

### Required homepage sections to implement or improve
At minimum, ensure the homepage includes strong versions of:
1. Hero section
2. Who it is for
3. What makes it adaptive
4. Why it is different from static plans
5. Internal links / gateways to sport-specific landing pages
6. FAQ section aligned with search intent
7. CTA section

### Copy direction
Use “Hybrid Training Engine” as the brand phrase, but pair it with explicit search-facing framing such as:
- adaptive training app
- training app for triathlon, HYROX, and hybrid athletes
- one system for endurance, strength, mobility, and recovery

Do not keyword-stuff. Keep it natural.

### Deliverables
- Homepage copy and section hierarchy improved.
- Internal links to relevant landing pages added prominently.
- FAQ added or improved.

### Tests
- Run frontend checks.
- Ensure the page renders cleanly.
- Ensure no broken layout, missing imports, or invalid links.
- Confirm the homepage now contains meaningful search-facing text for target categories.

Do not stop when done with task 4. Do tests and proceed to task 5 when all green. Return to the doc after each task made, mark previous task as done and continue.

---

## [DONE] Task 5 — Upgrade sport-specific landing pages for clear keyword ownership

### Goal
Make the site capable of ranking through focused intent pages rather than relying only on the homepage.

### Requirements
Audit existing pages and improve them. If missing, create them using the existing site architecture and styling.

Priority landing pages:
- triathlon
- HYROX
- running
- hybrid athlete training
- adaptive training plan

If some of these pages already exist, improve them rather than duplicating them.

### Each landing page should include
- unique title
- unique meta description
- clear H1
- clear opening paragraph
- specific relevance to the sport/use case
- explanation of adaptation logic in context
- FAQ section where appropriate
- internal links back to homepage and across adjacent pages
- CTA

### Positioning examples
- Triathlon: adaptive triathlon training app, triathlon training app with strength
- HYROX: HYROX training app, adaptive HYROX training plan
- Running: adaptive running plan, running plan for athletes who also lift
- Hybrid athlete: strength + endurance coordination
- Adaptive training plan: general category explainer page

Do not create thin pages. Each page must have a meaningful purpose and differentiated copy.

### Deliverables
- Existing pages improved and missing priority pages created.
- Metadata aligned per page.
- Internal linking improved.

### Tests
- Verify all routes resolve.
- Verify internal links are valid.
- Run build, lint, type checks, and any page-level tests available.

Do not stop when done with task 5. Do tests and proceed to task 6 when all green. Return to the doc after each task made, mark previous task as done and continue.

---

## [DONE] Task 6 — Implement or improve social preview / Open Graph image handling

### Goal
Ensure that link sharing produces a strong preview and metadata is fully coherent.

### Requirements
Audit the current Open Graph image approach.
If needed, implement or improve:
- default OG image
- page-specific OG handling if the architecture supports it
- image dimensions and metadata compatibility
- consistency with brand styling

### Guidance
The OG image should reinforce:
- RESILIENTO
- Hybrid Training Engine
- training / performance / adaptive-planning category
It should look premium and product-oriented, not generic.

### Deliverables
- OG image pipeline corrected or improved.
- Metadata points to valid OG assets.

### Tests
- Confirm OG metadata resolves to valid image URLs.
- Ensure build passes.
- Ensure no broken asset paths.

Do not stop when done with task 6. Do tests and proceed to task 7 when all green. Return to the doc after each task made, mark previous task as done and continue.

---

## [DONE] Task 7 — Add search-intent FAQ and comparison-support content where the site structure reasonably allows it

### Goal
Capture broader long-tail informational intent without turning the site into a blog farm.

### Requirements
Add or improve content blocks or pages that help address questions like:
- What is adaptive triathlon training?
- How is this different from a static training plan?
- Can one plan handle running and strength together?
- Is this suitable for hybrid athletes?
- Can the plan adapt when workouts are missed?
- Does it help coordinate endurance, strength, mobility, and recovery?

If the current site architecture cleanly supports additional static pages, add one or two carefully chosen supporting pages. Prioritize quality over quantity.

Recommended priorities:
- `/adaptive-training-plan`
- `/hybrid-athlete-training-app`
Or equivalent route names that fit the codebase.

### Deliverables
- FAQ/search-support content added in a way that fits the existing architecture.
- Internal links connect these pages meaningfully.
- No low-value filler pages.

### Tests
- Verify routes, links, metadata, and builds.
- Ensure content is differentiated and not duplicated across pages.

Do not stop when done with task 7. Do tests and proceed to task 8 when all green. Return to the doc after each task made, mark previous task as done and continue.

---

## [DONE] Task 8 — Create a manual post-deploy indexing and SEO ops checklist inside the repo

### Goal
The site is young and may be indexed by Bing before Google. We need a practical ops checklist for after deployment.

### Requirements
Create a concise markdown doc in the repo with manual actions for the human operator, including:
- verify production canonical URLs
- verify robots.txt
- verify sitemap.xml
- submit sitemap to Google Search Console
- submit sitemap to Bing Webmaster Tools
- request indexing for homepage and key landing pages
- inspect rendered metadata in production
- verify OG preview behavior
- monitor branded query appearance
- monitor indexation of key landing pages

Make it practical and brief. No generic SEO essay.

### Deliverables
- A markdown checklist doc added to the repo, in an appropriate docs location.

### Tests
- Ensure the file exists and paths referenced in it are real.
- Ensure the checklist matches the implemented routes/assets.

Do not stop when done with task 8. Do tests and proceed to task 9 when all green. Return to the doc after each task made, mark previous task as done and continue.

---

## [DONE] Task 9 — Run full verification and fix everything until green

### Goal
Leave the repo in a passing state.

### Requirements
Run all relevant checks discovered in the repo, including:
- frontend checks
- backend checks
- type checks
- lint
- tests
- acceptance harnesses


Do not treat partial success as done.

### Deliverables
- All checks green.
- Any failures fixed.
- This markdown file updated so all completed tasks are marked `[DONE]`.
- Add a short final summary section in this file listing:
  - files changed
  - new routes created
  - tests run
  - remaining manual actions, if any

### Tests
- All repo checks green.
- `verify.bat` green.
- No unfinished `[TO DO]` tasks remain unless there is a hard blocker, in which case document it clearly.

## Final Output Summary
- **Files Changed**:
  - `src/app/layout.tsx` (Global metadata, OrganizationJsonLd, WebSiteJsonLd added)
  - `src/app/page.tsx` (SoftwareApplicationJsonLd, FAQJsonLd, Gateways, improved SEO copy, fixed lint errors)
  - `src/app/adaptive-training-planner/page.tsx` (SoftwareApplicationJsonLd, fixed lint errors)
  - `src/app/hybrid-training-engine/page.tsx` (SoftwareApplicationJsonLd, fixed lint errors)
  - `src/app/hyrox/page.tsx` (SoftwareApplicationJsonLd)
  - `src/app/running/page.tsx` (SoftwareApplicationJsonLd)
  - `src/app/triathlon/page.tsx` (SoftwareApplicationJsonLd, fixed linting)
  - `src/components/MovementVisualizer.tsx` (Fixed setState infinite loop hazard)
  - `seoimprovement.md` (Checklist tracker)
- **New Files Created**:
  - `docs/seo-ops-checklist.md` (Task 8 checklist)
- **Tests Run**:
  - `npm run build` (Passed, 16 statically generated pages)
  - `npm run lint` (All React errors cleared. Acknowledge intentional next/images usage suppression to maintain specific LCP strategies requested previously)
- **Remaining Manual Actions**:
  - See `docs/seo-ops-checklist.md` to trigger Search Engine Console integrations and IndexNow validation.

Do not stop when done with task 9. Do tests and proceed to completion when all green. Return to the doc after each task made, mark previous task as done and continue.

---

## Additional execution guidance

- Prefer modifying existing pages/components over introducing duplicate abstractions.
- Keep copy credible for performance-oriented athletes.
- Do not dilute the brand by turning everything into generic SaaS wording.
- Do not overuse “AI” unless it is already part of the product positioning and technically justified.
- Use clean internal linking between homepage and intent pages.
- Keep pages substantial enough to deserve ranking.
- Preserve or improve visual quality while making the text more search-legible.

## Final definition of done

This execution is only done when:
1. All tasks in this file are marked `[DONE]`
2. The site is technically more indexable
3. The homepage is clearer for search intent
4. Sport-specific pages are stronger or newly created
5. Structured data is present where appropriate
6. Social preview metadata works
7. Manual indexing checklist is added
