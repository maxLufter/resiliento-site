import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";
import "./globals.css";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { OrganizationJsonLd, WebSiteJsonLd } from "@/components/StructuredData";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://resiliento.app'),
  alternates: {
    canonical: './',
  },
  verification: {
    google: '-FShNqe8nHwXMbQSPb95SdYBHEkbgZRpShgO7maQfc0',
  },
  applicationName: 'RESILIENTO',
  appleWebApp: {
    title: 'RESILIENTO',
    statusBarStyle: 'default',
  },
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' }
    ],
    apple: [
      { url: '/favicon.svg', type: 'image/svg+xml' }
    ]
  },
  manifest: '/manifest.json',
  title: {
    default: "Adaptive Training App for Triathlon, HYROX & Hybrid Athletes | RESILIENTO",
    template: "%s | RESILIENTO"
  },
  description: "The adaptive training app for modern athletes. Unifying triathlon, running, HYROX, strength, mobility, and recovery into one dynamic system.",
  keywords: ["hybrid athlete", "concurrent training", "triathlon strength planner", "hyrox training", "hyrox plan", "adaptive training engine", "endurance sports", "mobility for athletes", "adaptive training plan"],
  openGraph: {
    title: {
      default: "Adaptive Training App for Triathlon, HYROX & Hybrid Athletes | RESILIENTO",
      template: "%s | RESILIENTO"
    },
    description: "The adaptive training app for modern athletes. Unifying triathlon, running, HYROX, strength, and recovery into one system.",
    url: "./",
    siteName: "RESILIENTO",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "RESILIENTO Hybrid Training Engine",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "RESILIENTO | Hybrid Training Engine",
    description: "Unifying triathlon, running, HYROX, strength, mobility, and recovery into one adaptive system.",
    images: ["/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${montserrat.variable} h-full antialiased dark`}>
      <head>
        <OrganizationJsonLd />
        <WebSiteJsonLd />
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground selection:bg-brand selection:text-black">
        <div className="fixed inset-0 bg-noise -z-10" />
        <Navigation />
        <main className="flex-1 relative z-10">{children}</main>
        <Footer />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
