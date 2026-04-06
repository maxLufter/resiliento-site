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

      <div className="prose prose-invert prose-brand max-w-none text-slate-300">
        <h2>Information pursuant to Sect. 5 TMG</h2>
        <p>
          <strong>[Company Name]</strong><br />
          [Street Address]<br />
          [City, Zip Code]<br />
          [Country]
        </p>

        <h2>Represented by:</h2>
        <p>
          [Founder/Director Name]
        </p>

        <h2>Contact:</h2>
        <p>
          Email: support@resiliento.app<br />
          Phone: [Optional Phone Number]
        </p>

        <h2>Register / commercial register entry:</h2>
        <p>
          [Registry Court, if applicable]<br />
          [Registration Number, if applicable]
        </p>
        
        <h2>VAT ID:</h2>
        <p>
          Sales tax identification number according to Sect. 27 a of the Sales Tax Law:<br />
          [VAT Number, if applicable]
        </p>

        <p className="text-sm mt-12 text-slate-500">
          * Note: This is a placeholder document that will be updated with full legal entity details prior to commercial launch and payment collection.
        </p>
      </div>
    </article>
  );
}
