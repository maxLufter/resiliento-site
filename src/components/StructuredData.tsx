export const OrganizationJsonLd = () => {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "RESILIENTO",
    "url": "https://resiliento.app",
    "logo": "https://resiliento.app/favicon.svg",
    "sameAs": [
      // Add social links if available, e.g., "https://twitter.com/resiliento"
    ]
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
};

export const WebSiteJsonLd = () => {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "RESILIENTO",
    "alternateName": ["Resiliento", "RESILIENTO App"],
    "url": "https://resiliento.app/",
    "description": "The adaptive training app for modern athletes. Unifying triathlon, running, HYROX, strength, mobility, and recovery into one dynamic system."
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
};

export const SoftwareApplicationJsonLd = ({ sport, specificDescription }: { sport?: string, specificDescription?: string }) => {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": sport ? `RESILIENTO | ${sport}` : "RESILIENTO Adaptive Training Planner",
    "applicationCategory": "HealthAndFitnessApplication",
    "operatingSystem": "Web",
    "url": sport ? `https://resiliento.app/${sport.toLowerCase()}` : "https://resiliento.app",
    "description": specificDescription || "The adaptive training planner for hybrid athletes.",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD",
      "availability": "https://schema.org/PreOrder"
    }
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
};

export const FAQJsonLd = ({ faqs }: { faqs: { question: string; answer: string }[] }) => {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
};
