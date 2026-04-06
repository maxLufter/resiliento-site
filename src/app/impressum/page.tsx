export const metadata = {
  title: "Impressum | RESILIENTO",
  description: "Legal notice and impressum for RESILIENTO.",
};

export default function ImpressumPage() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
      <header className="mb-12">
        <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Impressum
        </h1>
        <p className="mt-4 text-slate-400">Legal Notice</p>
      </header>

      <div className="prose prose-invert prose-brand max-w-none text-slate-400 font-light space-y-8">
        <div className="border-t border-border pt-8">
          <h2 className="text-xl font-bold text-white uppercase mb-4 tracking-tight">Information pursuant to Sect. 5 TMG</h2>
          <p className="leading-relaxed">
            RESILIENTO<br />
            {/* TODO: Add Full Legal Address here before commercial launch */}
            Pending Incorporation Finalization<br />
          </p>
        </div>

        <div className="border-t border-border pt-8">
          <h2 className="text-xl font-bold text-white uppercase mb-4 tracking-tight">Contact</h2>
          <p className="leading-relaxed">
            Email: <a href="mailto:support@resiliento.app" className="text-brand hover:underline">support@resiliento.app</a><br />
          </p>
        </div>
        
        <div className="border-t border-border pt-8">
          <h2 className="text-xl font-bold text-white uppercase mb-4 tracking-tight">Status</h2>
          <p className="leading-relaxed text-sm">
            RESILIENTO is currently in closed cohort testing phase. Full commercial entity registration, authorized representative details, and VAT identification are pending finalization prior to public launch.
          </p>
        </div>
      </div>
    </article>
  );
}
