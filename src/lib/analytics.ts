'use client';
import { track } from '@vercel/analytics';

/** Opt in only after enabling Vercel custom events. Never send field values. */
export function trackFunnel(name: 'tool_interaction' | 'tool_waitlist_click' | 'waitlist_submit' | 'waitlist_success' | 'waitlist_error', source: string) {
  if (process.env.NEXT_PUBLIC_VERCEL_CUSTOM_EVENTS !== 'true') return;
  try { track(name, { source }); } catch { /* Analytics must not interrupt signup. */ }
}
