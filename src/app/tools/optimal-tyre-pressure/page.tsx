import { ToolPage, toolMetadata } from '@/components/ToolPage';
import Calculator from './Calculator';

export const metadata = toolMetadata('optimal-tyre-pressure');

export default function Page() {
  return <ToolPage slug="optimal-tyre-pressure"><Calculator /></ToolPage>;
}
