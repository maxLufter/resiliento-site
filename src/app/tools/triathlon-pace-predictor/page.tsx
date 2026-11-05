import { ToolPage, toolMetadata } from '@/components/ToolPage';
import Predictor from './Predictor';

export const metadata = toolMetadata('triathlon-pace-predictor');

export default function Page() {
  return <ToolPage slug="triathlon-pace-predictor"><Predictor /></ToolPage>;
}
