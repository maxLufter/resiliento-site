import Link from "next/link";

export const metadata = {
  title: "Adaptive Training Planner for Athletes | RESILIENTO",
  description: "Why static plans fail real athletes. Learn how schedule friction affects progress and why adaptive planning is critical for consistent results.",
};

export default function AdaptiveTrainingPlannerPage() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
      <header className="mb-12">
        <h1 className="text-4xl font-bold tracking-tight text-white mb-6 sm:text-5xl">
          Static Plans Die on Contact with Reality
        </h1>
        <p className="text-xl text-slate-400">
          Real life disrupts ideal schedules. Here's why adaptive planning outcompetes rigid templates.
        </p>
      </header>

      <div className="prose prose-invert prose-brand max-w-none text-slate-300">
        <h2>The Illusion of the 16-Week PDF</h2>
        <p>
          Most athletes start a new block of training with a rigid, 16-week plan. For the first two weeks, it works flawlessly. Then, life happens. You get stuck at work, a meeting runs late, your child gets sick, or the weather turns dangerous.
        </p>
        <p>
          Immediately, a static plan becomes a source of stress rather than a source of progress. You are left with two bad choices: try to "catch up" by stacking missed workouts, thereby increasing injury risk; or skip the workout entirely, missing key developmental stimuli.
        </p>
        
        <h2>How Adaptive Planning Solves This</h2>
        <p>
          An adaptive training planner does what a smart coach would do. If your 90-minute endurance session is cut down to 45 minutes because of a schedule change, the planner doesn't just truncate the session. It recalculates the optimal stimulus for the time available, perhaps converting a steady aerobic ride into a dense threshold block.
        </p>
        <p>
          Adaptive planning isn't just about shifting things on a calendar. It's about preserving the fundamental logic of the training block despite constraints.
        </p>

        <h2>Consistency Over Perfection</h2>
        <p>
          The athletes who make the most progress aren't the ones who heroically execute a perfect 16-week block once a year. They are the ones who string together B+ weeks for 3 years straight. Adaptive planning ensures that when life inevitably causes friction, the engine bends instead of breaking.
        </p>
      </div>

      <div className="mt-16 pt-10 border-t border-white/10 text-center">
        <h3 className="text-2xl font-semibold text-white mb-6">Experience intelligent adaptation.</h3>
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
