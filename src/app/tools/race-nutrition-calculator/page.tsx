import { ToolPage, toolMetadata } from '@/components/ToolPage';
import NutritionCalculator from './NutritionCalculator';

export const metadata = toolMetadata('race-nutrition-calculator');

export default function Page() {
  return <ToolPage slug="race-nutrition-calculator"><NutritionCalculator /></ToolPage>;
}
