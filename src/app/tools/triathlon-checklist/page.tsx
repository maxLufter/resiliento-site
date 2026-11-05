import { ToolPage, toolMetadata } from '@/components/ToolPage';
import ChecklistPlanner from './ChecklistPlanner';

export const metadata = toolMetadata('triathlon-checklist');

export default function Page() {
  return <ToolPage slug="triathlon-checklist"><ChecklistPlanner /></ToolPage>;
}
