import { MetadataRoute } from 'next'
 
export default function sitemap(): MetadataRoute.Sitemap {
  const today = '2026-05-15';
  const toolsUpdate = '2026-05-15';
  const landingUpdate = '2026-05-15';
  const staticDate = '2025-12-01';

  return [
    {
      url: 'https://resiliento.app',
      lastModified: today,
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: 'https://resiliento.app/waitlist',
      lastModified: landingUpdate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: 'https://resiliento.app/hybrid-training-engine',
      lastModified: landingUpdate,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: 'https://resiliento.app/adaptive-training-planner',
      lastModified: landingUpdate,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: 'https://resiliento.app/mobility-for-hybrid-athletes',
      lastModified: landingUpdate,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: 'https://resiliento.app/hyrox',
      lastModified: landingUpdate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: 'https://resiliento.app/triathlon',
      lastModified: landingUpdate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: 'https://resiliento.app/running',
      lastModified: landingUpdate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: 'https://resiliento.app/impressum',
      lastModified: staticDate,
      changeFrequency: 'monthly',
      priority: 0.3,
    },
    {
      url: 'https://resiliento.app/privacy',
      lastModified: staticDate,
      changeFrequency: 'monthly',
      priority: 0.3,
    },
    {
      url: 'https://resiliento.app/tools',
      lastModified: toolsUpdate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: 'https://resiliento.app/tools/triathlon-pace-predictor',
      lastModified: toolsUpdate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: 'https://resiliento.app/tools/tss-estimator',
      lastModified: toolsUpdate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: 'https://resiliento.app/tools/hybrid-split-builder',
      lastModified: toolsUpdate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: 'https://resiliento.app/tools/optimal-tyre-pressure',
      lastModified: toolsUpdate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: 'https://resiliento.app/tools/running-pace-calculator',
      lastModified: toolsUpdate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: 'https://resiliento.app/tools/triathlon-checklist',
      lastModified: toolsUpdate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: 'https://resiliento.app/tools/race-nutrition-calculator',
      lastModified: toolsUpdate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: 'https://resiliento.app/tools/hr-zones-calculator',
      lastModified: toolsUpdate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
  ]
}
