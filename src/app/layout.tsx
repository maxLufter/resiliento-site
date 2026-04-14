import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";
import "./globals.css";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

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
    canonical: 'https://resiliento.app',
  },
  verification: {
    google: '-FShNqe8nHwXMbQSPb95SdYBHEkbgZRpShgO7maQfc0',
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/icon.svg', type: 'image/svg+xml' }
    ],
    apple: [
      { url: '/logo-picture.png' }
    ]
  },
  title: "RESILIENTO | Hybrid Training Engine",
  description: "The hybrid training engine for modern athletes. Unifying HYROX, triathlon, strength, mobility, and recovery into one adaptive system.",
  keywords: ["hybrid athlete", "concurrent training", "triathlon strength planner", "hyrox training", "hyrox plan", "adaptive training engine", "endurance sports", "mobility for athletes"],
  openGraph: {
    title: "RESILIENTO | Hybrid Training Engine",
    description: "The hybrid training engine for modern athletes. Built for athletes who demand systematic logic, not blind compliance.",
    url: "https://resiliento.app",
    siteName: "Resiliento",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 800,
        alt: "RESILIENTO Hybrid Training Engine - Stronger in Every Discipline",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "RESILIENTO | Hybrid Training Engine",
    description: "Unifying endurance, strength, mobility, and recovery into one adaptive system.",
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              "name": "RESILIENTO",
              "applicationCategory": "HealthAndFitnessApplication",
              "operatingSystem": "Web",
              "url": "https://resiliento.app",
              "image": "https://resiliento.app/logo-picture.png",
              "description": "The hybrid training engine for modern athletes. Unifying HYROX, triathlon, strength, mobility, and recovery into one adaptive system.",
              "offers": {
                "@type": "Offer",
                "availability": "https://schema.org/PreOrder"
              }
            })
          }}
        />
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
