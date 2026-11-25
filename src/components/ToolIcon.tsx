import {
  Activity, Bike, CalendarDays, ClipboardCheck, FileChartColumn,
  Gauge, HeartPulse, ScanLine, Timer, Utensils, Watch, Wrench,
  type LucideIcon,
} from 'lucide-react';

const icons: Record<string, LucideIcon> = {
  'running-pace-calculator': Gauge,
  'hr-zones-calculator': HeartPulse,
  'hybrid-split-builder': CalendarDays,
  'tss-estimator': Activity,
  'race-nutrition-calculator': Utensils,
  'triathlon-pace-predictor': Timer,
  'triathlon-checklist': ClipboardCheck,
  'optimal-tyre-pressure': Bike,
  'resiliento-bikefit': ScanLine,
  'resiliento-hybrid-tracker': Watch,
  'fit-analyzer': FileChartColumn,
};

export function ToolIcon({ slug, size = 28, className = '' }: { slug: string; size?: number; className?: string }) {
  const Icon = icons[slug] || Wrench;
  return <Icon size={size} strokeWidth={1.7} aria-hidden="true" className={className} />;
}
