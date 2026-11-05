import { ToolPage, toolMetadata } from '@/components/ToolPage';
import Calculator from './Calculator';

export const metadata = toolMetadata('running-pace-calculator');

export default function Page() {
  return <ToolPage slug="running-pace-calculator"><Calculator /></ToolPage>;
}
