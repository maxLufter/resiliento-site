<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

<!-- BEGIN:architecture-and-stack -->
## Stack Architecture & Domain Rules

**Next.js 16.2.2 Setup**
- Use **App Router** exclusively.
- Typescript + React 19.
- Styling: Tailwind CSS v4, PostCSS.

**Infrastructure & Deployment**
- **Hosting**: Vercel.
- **Analytics**: Vercel Analytics (`@vercel/analytics`).
- **Performance**: Vercel Speed Insights (`@vercel/speed-insights`).
- **Domain**: `resiliento.app`

**Email Architecture & Deliverability**
- **Inbound/Forwarding**: Handled by **ImprovMX**. Do NOT attempt to handle inbound email via code; this is configured at the Vercel DNS level (MX and SPF TXT records for ImprovMX).
- **Outbound/Transactional**: Driven by **Resend** (`resend` NPM package).
- **Sender Identity**: Use `support@resiliento.app` for outgoing notifications and user confirmations.
- **Form Security**: Rely on server actions (e.g., `src/app/actions`) with strict input sanitization and honeypot traps (e.g., `bot_trap`) to deter spam without injecting heavy client-side CAPTCHAs.

**Design & Brand**
- Aesthetic is premium, dynamic, and strictly adheres to dark-mode.
- Avoid generic utilities; respect established `globals.css` variable tokens and sophisticated typography.
- Emphasize micro-animations and seamless DOM transitions.
<!-- END:architecture-and-stack -->
