"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { isToolSlug } from "@/lib/tool-catalog";
import { trackFunnel } from "@/lib/analytics";
import { joinWaitlist } from "@/app/actions/waitlist";

export function WaitlistForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const pathname = usePathname();
  const [error, setError] = useState('');
  const [confirmationSent, setConfirmationSent] = useState(false);
  async function clientAction(formData: FormData) {
    if (status === 'loading') return;
    setStatus('loading'); setError('');
    const from = new URLSearchParams(window.location.search).get('from') ?? '';
    const source = isToolSlug(from) ? from : pathname;
    formData.set('source', source);
    trackFunnel('waitlist_submit', source);
    try {
      const result = await joinWaitlist(formData);
      if (result.success) {
        setConfirmationSent(Boolean(result.confirmationSent));
        setStatus('success');
        if (!formData.get('bot_trap')) trackFunnel('waitlist_success', source);
      } else {
        setError(result.error ?? 'Please try again.'); setStatus('error');
        trackFunnel('waitlist_error', source);
      }
    } catch {
      setError('Connection interrupted. Please try again.'); setStatus('error');
      trackFunnel('waitlist_error', source);
    }
  }

  if (status === "success") {
    return (
      <div role="status" className="border border-brand/30 bg-brand/5 p-8 relative">
        <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-brand"></div>
        <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-brand"></div>
        
        <div className="flex items-center gap-3 mb-4">
          <div className="w-2 h-2 bg-brand animate-pulse"></div>
          <h3 className="text-lg font-semibold text-white tracking-wide">YOU’RE ON THE LIST</h3>
        </div>
        <p className="text-slate-400 leading-relaxed font-light text-sm">
          We’ll email you when early access is available. {confirmationSent ? "A confirmation email is on its way." : "Your signup was received, but we couldn’t send the confirmation email."}
        </p>
      </div>
    );
  }

  return (
    <form action={clientAction} className="space-y-6">
      {/* Hidden honeypot field to trap bots */}
      <input 
        type="text" 
        name="bot_trap" 
        tabIndex={-1} 
        autoComplete="off" 
        className="opacity-0 absolute w-0 h-0 pointer-events-none" 
        aria-hidden="true" 
      />

      <div className="group border-b border-white/10 focus-within:border-brand transition-colors pb-2">
        <label htmlFor="name" className="block text-xs font-mono tracking-widest text-slate-500 mb-2 uppercase">
          First name <span className="text-slate-500">(optional)</span>
        </label>
        <input
          id="name"
          name="name"
          type="text"
          autoComplete="given-name"
          maxLength={100}
          placeholder="First Name"
          suppressHydrationWarning
          className="block w-full bg-transparent border-0 p-0 text-white focus:ring-0 sm:text-base placeholder:text-slate-700 font-light focus:outline-none"
        />
      </div>

      <div className="group border-b border-white/10 focus-within:border-brand transition-colors pb-2">
        <label htmlFor="email" className="block text-xs font-mono tracking-widest text-slate-500 mb-2 uppercase">
          Email Address <span className="text-brand">*</span>
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          maxLength={254}
          required
          pattern="[^\s@]+@[^\s@]+\.[^\s@]+"
          title="Please enter a valid email address with a domain"
          placeholder="athlete@domain.com"
          suppressHydrationWarning
          className="block w-full bg-transparent border-0 p-0 text-white focus:ring-0 sm:text-base placeholder:text-slate-700 font-light focus:outline-none"
        />
      </div>

      <div className="group border-b border-white/10 focus-within:border-brand transition-colors pb-2">
        <label htmlFor="sport" className="block text-xs font-mono tracking-widest text-slate-500 mb-2 uppercase">
          Primary Sport
        </label>
        <input
          id="sport"
          name="sport"
          maxLength={100}
          type="text"
          placeholder="Triathlon, HYROX, OCR..."
          suppressHydrationWarning
          className="block w-full bg-transparent border-0 p-0 text-white focus:ring-0 sm:text-base placeholder:text-slate-700 font-light focus:outline-none"
        />
      </div>

      <div className="group border-b border-white/10 focus-within:border-brand transition-colors pb-2">
        <label htmlFor="frustration" className="block text-xs font-mono tracking-widest text-slate-500 mb-2 uppercase">
          Biggest Training Bottleneck
        </label>
        <textarea
          id="frustration"
          name="frustration"
          rows={2}
          maxLength={2000}
          placeholder="What breaks your consistency?"
          suppressHydrationWarning
          className="block w-full bg-transparent border-0 p-0 text-white focus:ring-0 sm:text-base placeholder:text-slate-700 font-light focus:outline-none resize-none"
        />
      </div>

      <p className="text-xs text-slate-400">We’ll contact you about early access. No payment required. <Link href="/privacy" className="underline hover:text-brand">Privacy policy</Link>.</p>

      {status === "error" && (
        <p role="alert" className="text-sm text-red-400 font-mono">{error}</p>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full relative flex items-center justify-between bg-white/5 hover:bg-white/10 border border-white/10 p-4 transition-all disabled:opacity-50 group mt-8"
      >
        <span className="text-sm font-bold tracking-widest text-white uppercase">
          {status === "loading" ? "Joining..." : "Join Waitlist"}
        </span>
        <span className="text-brand group-hover:translate-x-1 transition-transform">→</span>
      </button>
    </form>
  );
}
