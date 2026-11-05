import { ToolPage, toolMetadata } from '@/components/ToolPage';
import HRZonesCalculator from './HRZonesCalculator';

export const metadata = toolMetadata('hr-zones-calculator');

export default function Page() {
  return <ToolPage slug="hr-zones-calculator"><HRZonesCalculator /></ToolPage>;
}
