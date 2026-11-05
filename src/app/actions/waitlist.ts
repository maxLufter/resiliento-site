"use server";
import { createHash } from 'node:crypto';
import { Resend } from 'resend';
import { deliverWaitlist, validateWaitlist } from '@/lib/waitlist';
import { isToolSlug } from '@/lib/tool-catalog';

export async function joinWaitlist(formData: FormData) {
  if (formData.get('bot_trap')) return { success: true, confirmationSent: false };
  const parsed = validateWaitlist(formData);
  if (parsed.error || !parsed.lead) return { success: false, error: parsed.error };
  if (!process.env.RESEND_API_KEY) return { success: false, error: 'Signup is temporarily unavailable. Please try again later.' };
  const lead = parsed.lead;
  if (!isToolSlug(lead.source) && !['/', '/waitlist', '/hyrox', '/triathlon', '/running', '/adaptive-training-planner', '/hybrid-training-engine', '/mobility-for-hybrid-athletes'].includes(lead.source)) lead.source = 'unknown';
  const key = createHash('sha256').update(JSON.stringify(lead)).digest('hex');
  const resend = new Resend(process.env.RESEND_API_KEY);
  return deliverWaitlist(lead, (mail, options) => resend.emails.send(mail, options), key);
}
