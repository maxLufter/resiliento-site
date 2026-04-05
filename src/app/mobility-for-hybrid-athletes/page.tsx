import Link from "next/link";

export const metadata = {
  title: "Practical Mobility for Hybrid Athletes | RESILIENTO",
  description: "Positioning mobility as a tool for durable training, movement quality, and resilience, fully integrated into the broader engine.",
};

export default function MobilityPage() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
      <header className="mb-12">
        <h1 className="text-4xl font-bold tracking-tight text-white mb-6 sm:text-5xl">
          Mobility for the Hybrid Athlete
        </h1>
        <p className="text-xl text-slate-400">
          Stop stretching randomly. How to use mobility to support durable training and movement quality.
        </p>
      </header>

      <div className="prose prose-invert prose-brand max-w-none text-slate-300">
        <h2>The Waste of Random Stretching</h2>
        <p>
          For many endurance and hybrid athletes, mobility is an afterthought—a random assortment of stretches performed for 5 minutes after a hard session out of a vague sense of guilt. This unstructured approach yields almost zero long-term adaptation.
        </p>
        <p>
          Mobility should not be passive stretching. It should be targeted restorative and preparative tissue work that directly serves your primary sport requirements.
        </p>
        
        <h2>Integration is Key</h2>
        <p>
          A runner with tight hip flexors needs specific anterior chain release before strength work. A triathlete in the aero position needs targeted thoracic extension. When mobility is disconnected from your daily schedule, it feels like a chore. When it is woven into the engine—prescribed specifically to counter the postural deficit of that day’s main session—it becomes essential maintenance.
        </p>

        <h2>Building Resilience</h2>
        <p>
          RESILIENTO views mobility as the buffer that allows you to safely absorb heavy workloads. By tracking biomechanical stress and dynamically serving focused, short mobility interventions when required, athletes construct a more durable foundation. It's the difference between breaking down halfway through a season and peaking precisely when you mean to.
        </p>
      </div>

      <div className="mt-16 pt-10 border-t border-white/10 text-center">
        <h3 className="text-2xl font-semibold text-white mb-6">Build a more durable engine.</h3>
        <Link 
          href="/waitlist" 
          className="inline-flex justify-center rounded-md bg-brand px-6 py-3 text-sm font-semibold text-[#0B111A] shadow-sm hover:bg-brand-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand transition-all"
        >
          Join the Waitlist
        </Link>
      </div>
    </article>
  );
}
