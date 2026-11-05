export const checklistEvents = ['sprint', 'olympic', '70.3', 'ironman'] as const;
export const checklistConditions = ['wetsuit', 'cold', 'hot', 'rain'] as const;

export function parseChecklistState(value: unknown, validIds: string[]) {
  const data = value && typeof value === 'object' ? value as Record<string, unknown> : {};
  const strings = (value: unknown, allowed: readonly string[]) => Array.isArray(value) ? [...new Set(value.filter((v): v is string => typeof v === 'string' && allowed.includes(v)))] : [];
  const eventType = checklistEvents.includes(data.eventType as typeof checklistEvents[number]) ? data.eventType as typeof checklistEvents[number] : 'olympic';
  return { eventType, conditions: strings(data.conditions, checklistConditions) as Array<typeof checklistConditions[number]>, checked: strings(data.checked, validIds), hiddenItems: strings(data.hiddenItems, validIds) };
}
