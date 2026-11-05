import { ToolPage, toolMetadata } from '@/components/ToolPage';
import Builder from './Builder';

export const metadata = toolMetadata('hybrid-split-builder');

export default function Page() {
  return <ToolPage slug="hybrid-split-builder"><Builder /></ToolPage>;
}
