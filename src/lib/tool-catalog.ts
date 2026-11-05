export const toolCatalog = [
  { slug: 'hybrid-split-builder', title: 'Hybrid Training Split Builder', description: 'Build a week of running and strength around your available sessions.', tag: 'HYROX & hybrid' },
  { slug: 'race-nutrition-calculator', title: 'Race Nutrition Calculator', description: 'Turn your race duration and product labels into a fueling plan.', tag: 'Race nutrition' },
  { slug: 'hr-zones-calculator', title: 'LTHR Heart Rate Zones Calculator', description: 'Find your running or cycling zones from lactate threshold heart rate.', tag: 'Training zones' },
  { slug: 'triathlon-pace-predictor', title: 'Triathlon Finish Time Calculator', description: 'Estimate swim, bike, run and transition times for four race distances.', tag: 'Triathlon' },
  { slug: 'running-pace-calculator', title: 'Running Pace Calculator', description: 'Calculate pace, time and distance, or convert min/km to min/mile.', tag: 'Running' },
  { slug: 'triathlon-checklist', title: 'Triathlon Race Day Checklist', description: 'Pack for your distance and conditions. Save, share or print your list.', tag: 'Race preparation' },
  { slug: 'tss-estimator', title: 'Training Load & TSS Estimator', description: 'Compare session effort using duration and perceived exertion.', tag: 'Training load' },
  { slug: 'optimal-tyre-pressure', title: 'Bike Tyre Pressure Calculator', description: 'Estimate a starting pressure from system weight, tyre width and surface.', tag: 'Cycling' },
] as const;

export type ToolSlug = typeof toolCatalog[number]['slug'];
export function isToolSlug(value: string): value is ToolSlug {
  return toolCatalog.some(tool => tool.slug === value);
}
