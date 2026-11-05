# Resiliento - Marketing Platform

The central premium marketing and lead-generation portal for the **Resiliento** coaching platform.

## Architecture & Stack

* **Framework**: [Next.js 16](https://nextjs.org) (App Router exclusively)
* **Language**: TypeScript + React 19
* **Styling**: Tailwind CSS v4 with dark mode focus, premium animations, and PostCSS.
* **Hosting / Edge**: [Vercel](https://vercel.com)
* **Analytics**: Vercel Analytics (`@vercel/analytics`) + Speed Insights (`@vercel/speed-insights`)
* **Domain**: `resiliento.app`

## Email & Lead Infrastructure

To maintain high deliverability and secure communication pipelines across the board:

* **Inbound Emails (Forwarding)**: Routed securely through **ImprovMX** verified at the Vercel DNS layer via robust MX and SPF TXT records. No local code configurations handle inbound email.
* **Outbound Emails (Transactional)**: Driven by the strict backend [Resend API](https://resend.com/). All operational and waitlist emails are routed server-side via Next.js server actions originating from `support@resiliento.app`.
* **Lead Capture Security**: Employs silent honeypots (`bot_trap`) and rigorous server-side string sanitization matrices in Server Actions to isolate executable code, completely averting bot submissions and ensuring frictionless, CAPTCHA-free onboarding.

## Local Development

```bash
# Install dependencies
npm install

# Start the dev engine
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Navigate to [http://localhost:3000](http://localhost:3000) to view the live environment. Next.js App Router hot-updates as you edit pages like `src/app/page.tsx`.

## Content Pillars & SEO

The site topology generates deeply indexable landing hubs calibrated for key cohorts:
- Triathlon Mastery
- Hyrox Performance
- Hybrid Running & Mobility

All sub-segments employ robust metadata and generate unified `sitemap.ts` structures natively.

### Training tool pages

All eight tool routes use the server-rendered `ToolPage` component. `src/lib/tool-guides.ts` holds each tool's search title, description, instructions, worked example, method, questions and contextual links. Keep examples consistent with the calculator and change the visible review date and sitemap date when content materially changes. Preserve existing route URLs.

`WebApplication`, breadcrumb and catalog `ItemList` data describe the visible content; they do not guarantee a Google rich result. Ratings and endorsements are not fabricated. The calculators remain usable without signup.

Validate with Node 22.18+ or Node 24+:

```bash
npm test
npm run build
# Against a running local production build:
npm run verify:site -- http://127.0.0.1:3100
# After the Vercel production deployment completes:
npm run verify:site -- https://resiliento.app
```

The read-only site check verifies HTTP responses, server-rendered guidance, metadata, canonical URLs, structured data, contextual links, sitemap and robots. It never submits the waitlist form.

Custom funnel events are opt-in through `NEXT_PUBLIC_VERCEL_CUSTOM_EVENTS=true` and require a Vercel plan that supports custom events. Without that flag, existing page-view analytics remain active and the new funnel events are not sent. Tool-origin attribution is also included in new waitlist notification emails.
