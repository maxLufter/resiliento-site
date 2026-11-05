export type WaitlistLead = { name: string; email: string; sport: string; frustration: string; source: string };

export function validateWaitlist(formData: FormData): { lead: WaitlistLead; error?: never } | { error: string; lead?: never } {
  const read = (key: string) => { const value = formData.get(key); return typeof value === 'string' ? value.trim() : ''; };
  const lead = { name: read('name'), email: read('email'), sport: read('sport'), frustration: read('frustration'), source: read('source') };
  if (!lead.email || lead.email.length > 254 || !/^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(lead.email)) return { error: 'Enter a valid email address.' };
  if (lead.name.length > 100 || lead.sport.length > 100 || lead.frustration.length > 2000 || lead.source.length > 120) return { error: 'Please shorten the optional details and try again.' };
  if (/[\r\n\u0000]/.test(lead.email)) return { error: 'Enter a valid email address.' };
  return { lead };
}

export function escapeHtml(value: string): string {
  return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

type Mail = { from: string; to: string; subject: string; html: string };
type Send = (mail: Mail, options: { idempotencyKey: string }) => Promise<{ error: unknown; data?: { id: string } | null }>;

export async function deliverWaitlist(lead: WaitlistLead, send: Send, key: string) {
  const safe = Object.fromEntries(Object.entries(lead).map(([key, value]) => [key, escapeHtml(value)]));
  try {
    const result = await send({ from: 'Resiliento Waitlist <support@resiliento.app>', to: 'support@resiliento.app', subject: 'New RESILIENTO waitlist signup',
      html: `<h2>New waitlist lead</h2><p>Name: ${safe.name || 'Not provided'}</p><p>Email: ${safe.email}</p><p>Sport: ${safe.sport || 'Not provided'}</p><p>Training needs: ${safe.frustration || 'Not provided'}</p><p>Signup source: ${safe.source || 'Unknown'}</p>`
    }, { idempotencyKey: `lead/${key}` });
    if (result.error || !result.data?.id) return { success: false, error: 'We could not save your signup. Please try again.' };
  } catch { return { success: false, error: 'We could not save your signup. Please try again.' }; }
  // The lead is accepted even if its confirmation email cannot be sent.
  let confirmationSent = false;
  try {
    const result = await send({ from: 'Team Resiliento <support@resiliento.app>', to: lead.email, subject: 'You’re on the RESILIENTO waitlist',
      html: `<div style="font-family:Arial,sans-serif;max-width:560px;margin:auto;line-height:1.6"><h1>Welcome to RESILIENTO</h1><p>Thanks${safe.name ? `, ${safe.name}` : ''} — you’re on the waitlist.</p><p>We’re building a training app that brings endurance, strength and recovery into one plan. We’ll email you when early access is available.</p><p>In the meantime, <a href="https://resiliento.app/tools">use our free training tools</a> to plan your next session or race.</p><p>Questions or want to leave the waitlist? Reply to this email.</p></div>`
    }, { idempotencyKey: `confirmation/${key}` });
    confirmationSent = !result.error && Boolean(result.data?.id);
  } catch { /* Lead is already recorded above. */ }
  return { success: true, confirmationSent };
}
