import Link from "next/link";

export const metadata = {
  title: "What is a Hybrid Training Engine? | RESILIENTO",
  description: "Learn how combining endurance, strength, mobility, and recovery creates better decisions and why athletes need integration instead of fragmented tools.",
};

export default function HybridTrainingEnginePage() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
      <header className="mb-12">
        <h1 className="text-4xl font-bold tracking-tight text-white mb-6 sm:text-5xl">
          The Case for a Hybrid Training Engine
        </h1>
        <p className="text-xl text-slate-400">
          Why your three different training apps are holding your performance back, and how integration solves the problem.
        </p>
      </header>

      <div className="prose prose-invert prose-brand max-w-none text-slate-300">
        <h2>The State of Athlete Software is Fragmented</h2>
        <p>
          If you are a serious amateur athlete, your software stack probably looks like this:
          An endurance planner for your swim, bike, and run. A separate app or spreadsheet for your lifting. A wearable that tells you your recovery score. And maybe a mobility app you use when your knees start to hurt.
        </p>
        <p>
          The problem isn't that these tools are bad. The problem is that they are totally isolated. Your endurance planner doesn't know you did heavy deadlifts yesterday. Your strength app functions without any context of tomorrow's 5-hour ride. Your recovery score doesn't actually change the plan—it just tells you you're tired while the planner still demands high-intensity intervals.
        </p>
        
        <h2>Enter the Hybrid Engine</h2>
        <p>
          A hybrid training engine is a system where endurance, strength, mobility, and recovery are not just tracked in one place, but actually influence each other. 
        </p>
        <p>
          When you use a unified engine, the system understands the total physiological load. If your biomechanical stress is high from running, the engine automatically prioritizes restorative mobility and scales back the lower-body strength session. If you missed a key endurance workout, the engine knows how to compensate without overloading your weekend.
        </p>

        <h2>Better Decisions, Not Just More Data</h2>
        <p>
          We built RESILIENTO because we were tired of being the middleman between our apps. We wanted an intelligent system that makes the complex decisions for us, balancing the conflicting demands of multi-sport and hybrid training.
        </p>
        <p>
          It's time to stop training in silos.
        </p>
      </div>

      <div className="mt-16 pt-10 border-t border-white/10 text-center">
        <h3 className="text-2xl font-semibold text-white mb-6">Ready to unify your training?</h3>
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
