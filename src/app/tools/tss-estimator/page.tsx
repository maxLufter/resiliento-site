import { ToolPage, toolMetadata } from '@/components/ToolPage';
import Estimator from './Estimator';

export const metadata = toolMetadata('tss-estimator');

export default function Page() {
  return <ToolPage slug="tss-estimator"><Estimator /></ToolPage>;
}
