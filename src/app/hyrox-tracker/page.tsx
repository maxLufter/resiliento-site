import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import {
  Activity,
  ArrowUpRight,
  BarChart3,
  Cpu,
  Gauge,
  Globe,
  ShieldCheck,
  Sliders,
  Timer,
  Watch,
  Zap,
} from 'lucide-react';
import { BreadcrumbJsonLd, FAQJsonLd } from '@/components/StructuredData';

const CONNECT_IQ_URL =
  'https://apps.garmin.com/apps/6a76f594-8546-411e-a4c7-fc59eef1606b';
const PAGE_URL = 'https://resiliento.app/hyrox-tracker';
const PAGE_TITLE = 'Resiliento: HYROX & Hybrid Tracker for Garmin';
const PAGE_DESCRIPTION =
  'Free standalone Garmin Connect IQ watch app for HYROX races and hybrid training. 101 supported watches, division weights, Roxzone splits, Concept2 PM5 BLE, 10 quick presets, and on-watch analytics.';

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: { canonical: '/hyrox-tracker' },
  openGraph: {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    url: PAGE_URL,
    type: 'website',
    siteName: 'RESILIENTO',
    images: [
      {
        url: '/hybrid-tracker/hero-banner.jpg',
        width: 1440,
        height: 720,
        alt: 'Resiliento: HYROX & Hybrid Tracker on a Garmin watch alongside an athlete on a Concept2 RowErg',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    images: ['/hybrid-tracker/hero-banner.jpg'],
  },
};

const proofStats = [
  {
    value: '100% Free',
    detail: 'No paywalls, subscriptions, or companion phone required',
    icon: Zap,
  },
  {
    value: '101 Watches',
    detail: 'Forerunner, Fenix 6-9, Epix, Venu 2-4 & X1, Vivoactive, Enduro',
    icon: Watch,
  },
  {
    value: '15 Languages',
    detail: 'Localized on-watch UI with smooth horizontal scrolling labels',
    icon: Globe,
  },
  {
    value: 'PM5 + FIT Laps',
    detail: 'Concept2 SkiErg/RowErg BLE + named Garmin Connect station laps',
    icon: Cpu,
  },
];

const screenGallery = [
  {
    src: '/hybrid-tracker/card-01-home.png',
    badge: 'Home Hub',
    title: 'Race, Quick & Custom in One Tap',
    caption:
      'High-contrast yellow-on-obsidian interface built around immediate starts for full races, 10 quick presets, custom builders, and saved Stats.',
  },
  {
    src: '/hybrid-tracker/card-02-steps.png',
    badge: 'Step Builder',
    title: 'Structured Circuits & Target Scaling',
    caption:
      'Inspect every stage before starting, tap Settings · Repeat Nx to edit rounds, scale targets x0.5 to x2, or auto-apply Singles/Doubles weights.',
  },
  {
    src: '/hybrid-tracker/card-03-race.png',
    badge: 'Race Setup',
    title: 'Warm up, Division & Roxzone Setup',
    caption:
      'Toggle Indoor GPS, Warm up, Roxzone transitions, and Singles/Doubles division right on the Ready card before starting.',
  },
  {
    src: '/hybrid-tracker/card-04-telemetry.png',
    badge: 'Live Race View',
    title: 'Immediate Laps & Concept2 PM5 BLE',
    caption:
      'Track stage and total timers, heart rate zone arc, live Concept2 SkiErg/RowErg telemetry, optional target run pace delta, and immediate LAP boundaries.',
  },
  {
    src: '/hybrid-tracker/card-05-stats.png',
    badge: 'Stats & Strava Cards',
    title: 'Watch Analytics & Strava Share Cards',
    caption:
      'Review TOTAL TIME, AVG HR, KCAL, and PACE/km on your wrist, inspect clean Garmin Connect laps, or drop your .zip/.fit file into FIT Analyzer for a Strava PNG card.',
  },
];

const capabilities = [
  {
    title: 'Official HYROX Race & 25-100% Sims',
    description:
      'Complete 8 x 1 km runs + 8 functional stations with official Singles and Doubles (Open & Pro) station weights populated automatically, plus 25%, 50%, 75%, or 100% scaled race simulations.',
    icon: Gauge,
  },
  {
    title: 'Warm up & Roxzone Lookahead',
    description:
      'Record optional Warm up separately from main race time, and preview the upcoming station (> Next Stage) during Roxzone transitions up to 64 runtime stages.',
    icon: Timer,
  },
  {
    title: '10 Quick Presets + Auto-Save Builder',
    description:
      'Launch Half HYROX Sim, Compromised Running, or Sled & Grip x3 with button scrolling, or build auto-saving custom circuits with MM:SS durations and x0.5-x2 scaling.',
    icon: Sliders,
  },
  {
    title: 'Concept2 PM5 BLE & Manual Results',
    description:
      'Pair Concept2 PM5 SkiErg and RowErg monitors directly via watch Bluetooth Low Energy for live watts, /500 m pace, distance, and stroke data, alongside manual station results and load volume tracking.',
    icon: Cpu,
  },
  {
    title: 'Race-Day Ergonomics & Smooth Labels',
    description:
      'Optional Target Run Pace alerts with live ahead/behind deltas, a clear 4 o’clock LAP cue ideal for 2-button Venu watches, optional workout touch lock on 5-button watches, and marquee scrolling labels on every screen.',
    icon: Activity,
  },
  {
    title: 'Clean Connect Laps & Strava Cards',
    description:
      'Compact 15-field FIT laps, M:SS / H:MM:SS Connect Stats without truncation noise, 12 on-watch summary pages, and free browser .zip/.fit Strava PNG card generation.',
    icon: BarChart3,
  },
];

const deviceFamilies = [
  'Forerunner 165 / 255 / 265 / 570 / 955 / 965 / 970',
  'Fenix 6 / 7 / 8 / 9 Pro, Solar & Fenix E',
  'Epix Gen 2 & Epix Pro (42 / 47 / 51 mm)',
  'Venu 2 / 3 / 4 & Venu X1',
  'Vivoactive 4 / 5 / 6',
  'Enduro 3 & Enduro 4',
  'Instinct 3 AMOLED & Instinct Crossover AMOLED',
  'MARQ Gen 2 / Athlete / Gen 3',
];

const faqs = [
  {
    question: 'Is Resiliento: HYROX & Hybrid Tracker really free and standalone?',
    answer:
      'Yes. All core features — full HYROX Race mode, scaled 25-100% simulations, 10 quick presets, custom workout builder, Concept2 PM5 BLE, and 12-page post-workout Stats — run offline on your watch with zero paywall, account, or phone companion app.',
  },
  {
    question: 'Where do I see named stations and loads in Garmin Connect?',
    answer:
      'Open your saved workout in the Garmin Connect mobile app, tap the Laps tab, and rotate your phone to landscape. Garmin Connect reveals the custom FIT developer columns with each stage name, load weight, and PM5 erg telemetry.',
  },
  {
    question: 'Does it work indoors without GPS and with Concept2 ergometers?',
    answer:
      'Yes. Choose Indoor mode directly on the Ready screen to disable GPS while recording time, heart rate zones, target-based run pace stats, manual station results, and direct Bluetooth Low Energy telemetry from paired Concept2 PM5 SkiErg or RowErg monitors.',
  },
  {
    question: 'How does touchscreen lock work on Venu vs. Forerunner and Fenix?',
    answer:
      'On 5-button watches with UP/DOWN hardware buttons (such as Forerunner and Fenix), the unified Touchscreen setting includes Lock touch in race to prevent sweaty taps during Sled Pulls. On 2-button touchscreen watches like Venu 3, Venu 4, and Venu X1, touch stays active and the lower-right LAP cue stays tappable.',
  },
  {
    question: 'Do app updates preserve my Race Division weights and Custom Workouts?',
    answer:
      'Yes. Store updates keep the same app UUID and backward-compatible on-watch storage schema so your selected division weights, custom templates, quick preset modifications, paired PM5 IDs, and saved history carry across versions.',
  },
];

export default function HybridTrackerPage() {
  const softwareSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Resiliento: HYROX & Hybrid Tracker',
    description: PAGE_DESCRIPTION,
    url: PAGE_URL,
    installUrl: CONNECT_IQ_URL,
    applicationCategory: 'SportsApplication',
    operatingSystem: 'Garmin Connect IQ',
    softwareVersion: '1.3.0',
    image: 'https://resiliento.app/hybrid-tracker/hero-banner.jpg',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
  };

  return (
    <div className="mx-auto max-w-7xl px-6 pb-24 pt-32 sm:pt-40 lg:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(softwareSchema).replace(/</g, '\\u003c'),
        }}
      />
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: 'https://resiliento.app' },
          { name: 'Free Training Tools', url: 'https://resiliento.app/tools' },
          { name: 'Resiliento: HYROX & Hybrid Tracker', url: PAGE_URL },
        ]}
      />
      <FAQJsonLd faqs={faqs} />

      {/* Hero Section */}
      <section className="border-b border-border pb-14">
        <Link
          href="/tools"
          className="inline-flex items-center text-sm font-semibold text-brand hover:underline"
        >
          ← Free training tools
        </Link>

        <div className="mt-7 flex flex-wrap items-center gap-3">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#FFED00]/35 bg-[#FFED00]/10 px-3.5 py-1 font-mono text-xs font-semibold uppercase tracking-wider text-[#FFED00]">
            <span className="h-2 w-2 rounded-full bg-[#FFED00]" />
            Live on Connect IQ · v1.3.0
          </span>
          <span className="rounded-full border border-white/15 bg-neutral-900 px-3.5 py-1 font-mono text-xs uppercase tracking-wider text-slate-300">
            100% Free · Offline-First · 101 Watches
          </span>
        </div>

        <div className="mt-7 max-w-4xl">
          <h1 className="font-montserrat text-4xl font-bold tracking-tight text-white sm:text-6xl">
            Resiliento:{' '}
            <span className="text-[#FFED00]">HYROX &amp; Hybrid Tracker</span>
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-relaxed text-slate-300 sm:text-xl">
            The free standalone Garmin Connect IQ watch app built for HYROX
            races and hybrid training. Track all 8 runs and 8 stations with
            automatic division weights, optional Roxzone lookahead splits,
            Concept2 PM5 telemetry, 10 quick workouts, and 12-page post-race
            analytics — straight from your wrist.
          </p>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center">
            <a
              href={CONNECT_IQ_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#FFED00] px-6 py-3.5 font-montserrat text-sm font-bold uppercase tracking-wider text-black transition-colors hover:bg-[#f2e000]"
            >
              Install Free on Connect IQ
              <ArrowUpRight className="h-4 w-4" />
            </a>
            <a
              href="#screens"
              className="inline-flex items-center justify-center rounded-lg border border-white/20 bg-neutral-900 px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:border-[#FFED00]/60 hover:text-[#FFED00]"
            >
              Explore Watch Screens
            </a>
            <Link
              href="/tools/hybrid-split-builder"
              className="text-sm font-semibold text-brand underline underline-offset-4 hover:text-white sm:ml-2"
            >
              Plan training weeks with the Hybrid Split Builder →
            </Link>
          </div>
        </div>

        <div className="mt-10 overflow-hidden rounded-2xl border border-[#FFED00]/25 bg-neutral-950 shadow-[0_24px_80px_-24px_rgba(255,237,0,0.2)]">
          <Image
            src="/hybrid-tracker/hero-banner.jpg"
            alt="Resiliento: HYROX & Hybrid Tracker showing live 1000 m Row stage telemetry, dual timers, and HR zone arc on a Garmin watch beside an athlete rowing"
            width={1440}
            height={720}
            priority
            className="h-auto w-full object-cover"
          />
        </div>
      </section>

      {/* 4-Column Proof Bar */}
      <section
        aria-label="Key specifications"
        className="grid gap-4 border-b border-border py-10 sm:grid-cols-2 lg:grid-cols-4"
      >
        {proofStats.map(({ value, detail, icon: Icon }) => (
          <div
            key={value}
            className="rounded-xl border border-white/10 bg-neutral-950/90 p-5"
          >
            <div className="flex items-center justify-between">
              <span className="font-montserrat text-2xl font-bold text-[#FFED00]">
                {value}
              </span>
              <Icon className="h-5 w-5 text-slate-400" />
            </div>
            <p className="mt-2 text-sm leading-relaxed text-slate-300">
              {detail}
            </p>
          </div>
        ))}
      </section>

      {/* 5-Screen Visual Gallery */}
      <section id="screens" className="scroll-mt-24 border-b border-border py-16">
        <div className="max-w-3xl">
          <p className="font-mono text-xs font-semibold uppercase tracking-[0.22em] text-[#FFED00]">
            Built for Race-Day Clarity
          </p>
          <h2 className="mt-3 font-montserrat text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Every watch screen designed for 170+ BPM legibility.
          </h2>
          <p className="mt-3 text-base leading-relaxed text-slate-300">
            High-contrast yellow and white typography on an obsidian canvas,
            with smart marquee scrolling labels and hardware-aligned button cues
            captured directly from the Garmin watch simulator.
          </p>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {screenGallery.slice(0, 3).map((screen) => (
            <article
              key={screen.title}
              className="group flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-neutral-950 transition-all duration-300 hover:-translate-y-1 hover:border-[#FFED00]/50"
            >
              <div className="bg-black p-3">
                <Image
                  src={screen.src}
                  alt={screen.title}
                  width={540}
                  height={720}
                  className="h-auto w-full rounded-xl"
                />
              </div>
              <div className="flex-1 p-5">
                <span className="font-mono text-xs font-semibold uppercase tracking-wider text-[#FFED00]">
                  {screen.badge}
                </span>
                <h3 className="mt-2 font-montserrat text-lg font-bold text-white">
                  {screen.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-300">
                  {screen.caption}
                </p>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:mx-auto lg:max-w-4xl">
          {screenGallery.slice(3).map((screen) => (
            <article
              key={screen.title}
              className="group flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-neutral-950 transition-all duration-300 hover:-translate-y-1 hover:border-[#FFED00]/50"
            >
              <div className="bg-black p-3">
                <Image
                  src={screen.src}
                  alt={screen.title}
                  width={540}
                  height={720}
                  className="h-auto w-full rounded-xl"
                />
              </div>
              <div className="flex-1 p-5">
                <span className="font-mono text-xs font-semibold uppercase tracking-wider text-[#FFED00]">
                  {screen.badge}
                </span>
                <h3 className="mt-2 font-montserrat text-lg font-bold text-white">
                  {screen.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-300">
                  {screen.caption}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="my-12 rounded-2xl border border-brand/30 bg-brand/5 p-7 sm:p-10">
        <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-brand">After the workout · Strava Share Card</p>
        <h2 className="text-2xl font-semibold sm:text-3xl">Generate your Strava card &amp; analyze every split in your browser.</h2>
        <p className="mt-4 max-w-3xl text-base leading-relaxed text-slate-300">Drop your Garmin Connect .zip export or .fit file directly into your browser to inspect every run split, station result, and heart-rate phase, then download a branded 4:5 Strava PNG workout card and formatted split summary. Your activity file stays on your device.</p>
        <Link href="/tools/fit-analyzer" className="mt-6 inline-flex rounded-lg bg-brand px-6 py-3 text-base font-semibold text-black">Open FIT Analyzer &amp; Strava Card</Link>
      </section>
      {/* 6 Core Capability Cards */}
      <section className="border-b border-border py-16">
        <div className="max-w-3xl">
          <p className="font-mono text-xs font-semibold uppercase tracking-[0.22em] text-[#FFED00]">
            Complete Hybrid Toolset
          </p>
          <h2 className="mt-3 font-montserrat text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Why athletes switch from generic timers.
          </h2>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {capabilities.map(({ title, description, icon: Icon }) => (
            <article
              key={title}
              className="rounded-xl border border-white/10 bg-neutral-950 p-6 transition-colors hover:border-[#FFED00]/40"
            >
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-[#FFED00]/30 bg-[#FFED00]/10 text-[#FFED00]">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 font-montserrat text-lg font-bold text-white">
                {title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-300">
                {description}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* 3-Step Quick Start */}
      <section id="quick-start" className="scroll-mt-24 border-b border-border py-16">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div>
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.22em] text-[#FFED00]">
              From Wrist to Finish Line
            </p>
            <h2 className="mt-3 font-montserrat text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Up and racing in 30 seconds.
            </h2>

            <ol className="mt-8 space-y-6">
              <li className="flex gap-4">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#FFED00]/40 bg-[#FFED00]/10 font-mono text-sm font-bold text-[#FFED00]">
                  01
                </span>
                <div>
                  <h3 className="font-montserrat text-base font-bold text-white">
                    Install Free from Connect IQ
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-slate-300">
                    Add Resiliento: HYROX &amp; Hybrid Tracker via the Garmin
                    Connect IQ Store app or Garmin Express. No phone bridge or
                    subscription required.
                  </p>
                </div>
              </li>

              <li className="flex gap-4">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#FFED00]/40 bg-[#FFED00]/10 font-mono text-sm font-bold text-[#FFED00]">
                  02
                </span>
                <div>
                  <h3 className="font-montserrat text-base font-bold text-white">
                    Pick Official Race, Quick Workout, or Custom Circuit
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-slate-300">
                    Select Singles or Doubles weights once in Settings, toggle
                    Indoor/Outdoor GPS and Roxzone transitions on the Ready
                    screen, and optionally scale race volume from 25% to 100%.
                  </p>
                </div>
              </li>

              <li className="flex gap-4">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#FFED00]/40 bg-[#FFED00]/10 font-mono text-sm font-bold text-[#FFED00]">
                  03
                </span>
                <div>
                  <h3 className="font-montserrat text-base font-bold text-white">
                    Lap, Finish &amp; Inspect Every Split
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-slate-300">
                    Press LAP (or tap the 4 o&apos;clock cue) at each stage
                    boundary for immediate lap recording, then review 12 watch
                    pages, open Activity → Laps in Garmin Connect, or generate a
                    Strava PNG card at /tools/fit-analyzer.
                  </p>
                </div>
              </li>
            </ol>
          </div>

          <div className="rounded-2xl border border-white/10 bg-neutral-950 p-6 text-center">
            <Image
              src="/hybrid-tracker/wall-balls.png"
              alt="Resiliento live Wall Balls watch screen with target reps, load weight, dual timers, and lower-right LAP cue"
              width={454}
              height={454}
              className="mx-auto w-full max-w-[260px] rounded-full border border-[#FFED00]/30"
            />
            <p className="mt-4 font-mono text-xs uppercase tracking-wider text-[#FFED00]">
              4/8 · Wall Balls · 100 reps · 6 kg
            </p>
            <p className="mt-1 text-sm text-slate-400">
              High-contrast active view with live target load, heart rate zone
              gauge, and symmetrical LAP cue.
            </p>
          </div>
        </div>
      </section>

      {/* Supported Garmin Watches Strip */}
      <section className="border-b border-border py-14">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.22em] text-[#FFED00]">
              101 Compatible Models
            </p>
            <h2 className="mt-2 font-montserrat text-2xl font-bold text-white sm:text-3xl">
              Supported Garmin watches
            </h2>
          </div>
          <a
            href={CONNECT_IQ_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand hover:underline"
          >
            Check exact model compatibility on Connect IQ
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>

        <div className="mt-6 flex flex-wrap gap-2.5">
          {deviceFamilies.map((family) => (
            <span
              key={family}
              className="rounded-lg border border-white/10 bg-neutral-950 px-3.5 py-2 text-sm text-slate-200"
            >
              {family}
            </span>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="border-b border-border py-16">
        <div className="max-w-3xl">
          <h2 className="font-montserrat text-3xl font-bold text-white">
            Frequently asked questions
          </h2>
          <dl className="mt-8 space-y-6">
            {faqs.map(({ question, answer }) => (
              <div
                key={question}
                className="rounded-xl border border-white/10 bg-neutral-950/70 p-6"
              >
                <dt className="font-montserrat text-base font-bold text-white">
                  {question}
                </dt>
                <dd className="mt-2 text-sm leading-relaxed text-slate-300">
                  {answer}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Privacy & Final CTA */}
      <section
        id="privacy"
        className="mt-14 grid scroll-mt-28 gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-start"
      >
        <div>
          <div className="flex items-center gap-2.5 text-[#FFED00]">
            <ShieldCheck className="h-5 w-5" />
            <span className="font-mono text-xs font-semibold uppercase tracking-wider">
              Offline-First Privacy
            </span>
          </div>
          <h2 className="mt-3 font-montserrat text-2xl font-bold text-white">
            Workout data and privacy
          </h2>
          <div className="mt-4 space-y-4 text-sm leading-relaxed text-slate-300">
            <p>
              The watch app uses heart rate for training displays and summaries.
              GPS is off by default and is used in Outdoor mode for distance and
              live pace alerts. The watch app does not send heart rate, GPS, or
              workout data to Resiliento servers.
            </p>
            <p>
              Preferences, custom workouts, and recent workout summaries stay
              stored locally on your watch. When you save an activity, it writes
              a standard Garmin FIT file that can sync to Garmin Connect under
              your Garmin privacy settings.
            </p>
            <p>
              For app support or privacy questions, email{' '}
              <a
                href="mailto:support@resiliento.app"
                className="text-brand underline"
              >
                support@resiliento.app
              </a>
              .
            </p>
          </div>
        </div>

        <aside className="rounded-2xl border border-[#FFED00]/30 bg-gradient-to-br from-[#FFED00]/10 via-neutral-950 to-neutral-950 p-7">
          <p className="font-mono text-xs font-semibold uppercase tracking-wider text-[#FFED00]">
            Ready for Race Day?
          </p>
          <h2 className="mt-2 font-montserrat text-2xl font-bold text-white">
            Get Resiliento on your wrist today.
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-slate-300">
            Free download on the Garmin Connect IQ Store, backed by our
            full-stack HYROX planning and pacing tools on Resiliento.
          </p>
          <div className="mt-6 flex flex-col gap-3">
            <a
              href={CONNECT_IQ_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#FFED00] px-5 py-3 font-montserrat text-sm font-bold uppercase tracking-wider text-black transition-colors hover:bg-[#f2e000]"
            >
              Install Free on Connect IQ
              <ArrowUpRight className="h-4 w-4" />
            </a>
            <div className="flex flex-wrap gap-x-5 gap-y-2 pt-2 text-sm font-semibold text-brand">
              <Link href="/hyrox" className="hover:underline">
                HYROX training planner →
              </Link>
              <Link href="/tools/hybrid-split-builder" className="hover:underline">
                Hybrid split builder →
              </Link>
            </div>
          </div>
        </aside>
      </section>

      <p className="mt-12 border-t border-border pt-6 text-xs text-slate-400">
        Resiliento is independent and is not affiliated with or endorsed by
        HYROX or Garmin.
      </p>
    </div>
  );
}
