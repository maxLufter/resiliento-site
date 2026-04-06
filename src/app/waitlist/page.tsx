import { WaitlistForm } from "@/components/WaitlistForm";

export const metadata = {
  title: "Join Waitlist | RESILIENTO",
  description: "Secure your access to early architecture phases of RESILIENTO, the hybrid training engine.",
};

export default function WaitlistPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
      <div className="border border-border bg-[#030303] p-8 sm:p-16 relative">
        {/* Corner accents */}
        <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-brand"></div>
        <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-brand"></div>
        <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-brand"></div>
        <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-brand"></div>
        
        <div className="text-center mb-16">
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tighter text-white mb-6 uppercase">
            Secure Access.
          </h1>
          <p className="text-lg text-slate-400 font-light max-w-xl mx-auto">
            RESILIENTO is actively testing with a closed cohort of athletes. We sequence new onboarding based on profile relevance and waitlist positioning. Join the waitlist to secure your place in the next deployment.
          </p>
        </div>
        
        <div className="max-w-2xl mx-auto">
          <WaitlistForm />
        </div>
      </div>
    </div>
  );
}
