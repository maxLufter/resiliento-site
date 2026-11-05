export type FuelProduct = { carbs: number; sodium: number; caffeine: number };
export type FuelServing = FuelProduct & { caffeinated: boolean };
export type GelPattern = 'none' | 'first_half' | 'alternate' | 'all';

const validProduct = (p: FuelProduct) => p.carbs >= 1 && p.carbs <= 250 && p.sodium >= 0 && p.caffeine >= 0 && Object.values(p).every(Number.isFinite);

/** Pack whole servings; the same list drives totals, packing and the timeline. */
export function planFuel(targetCarbs: number, regular: FuelProduct, caffeinated?: FuelProduct, pattern: GelPattern = 'none', caffeineBudget = 0): FuelServing[] {
  if (!Number.isFinite(targetCarbs) || targetCarbs <= 0 || !validProduct(regular)) return [];
  const maxServings = 500;
  let chosenCaf = 0;
  let chosenRegular = Math.min(maxServings, Math.ceil(targetCarbs / regular.carbs));
  if (caffeinated && validProduct(caffeinated) && pattern !== 'none' && Number.isFinite(caffeineBudget)) {
    const maxCaf = Math.min(maxServings, Math.ceil(targetCarbs / caffeinated.carbs));
    for (let c = 1; c <= maxCaf; c++) {
      const r = Math.max(0, Math.ceil((targetCarbs - c * caffeinated.carbs) / regular.carbs));
      const count = c + r;
      if (count > maxServings) continue;
      if (pattern !== 'all' && c > Math.ceil(count / 2)) continue;
      if (c * caffeinated.caffeine + r * regular.caffeine > caffeineBudget) continue;
      chosenCaf = c;
      chosenRegular = r;
    }
  }
  const servings: FuelServing[] = [];
  let remainingCaf = chosenCaf;
  let remainingRegular = chosenRegular;
  for (let i = 0; i < chosenCaf + chosenRegular; i++) {
    const useCaf = remainingCaf > 0 && (pattern !== 'alternate' || i % 2 === 0 || remainingRegular === 0);
    if (useCaf && caffeinated) { servings.push({ ...caffeinated, caffeinated: true }); remainingCaf--; }
    else { servings.push({ ...regular, caffeinated: false }); remainingRegular--; }
  }
  return servings;
}

export function fuelTotals(servings: FuelServing[]) {
  return servings.reduce((sum, p) => ({ carbs: sum.carbs + p.carbs, sodium: sum.sodium + p.sodium, caffeine: sum.caffeine + p.caffeine }), { carbs: 0, sodium: 0, caffeine: 0 });
}

export function servingTimes(duration: number, count: number): number[] {
  if (!Number.isFinite(duration) || duration <= 0 || !Number.isInteger(count) || count < 1 || count > 500) return [];
  // Midpoints never drop the last serving, even for short legs.
  return Array.from({ length: count }, (_, i) => duration * (i + 0.5) / count);
}
