import { WaitlistForm } from "@/components/WaitlistForm";

export const metadata = {
  title: "Join Waitlist | RESILIENTO",
  description: "Join the early access waitlist for RESILIENTO, the hybrid training engine.",
};

export default function WaitlistPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl mb-4">
          Get Early Access
        </h1>
        <p className="text-lg text-slate-400">
          We are currently onboarding athletes in small cohorts to ensure the engine is properly tuned. Join the list to secure your spot.
        </p>
      </div>
      
      <div className="bg-surface border border-white/5 shadow-2xl rounded-3xl p-8 sm:p-12">
        <WaitlistForm />
      </div>
    </div>
  );
}
