export const metadata = {
  title: "Privacy Policy | RESILIENTO",
  description: "Privacy policy for RESILIENTO.",
};

export default function PrivacyPage() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
      <header className="mb-12 border-b border-border pb-8">
        <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl uppercase mb-2">
          Privacy Policy
        </h1>
        <p className="text-slate-500 font-mono text-[10px] tracking-widest uppercase">Effective Date: April 2026</p>
      </header>

      <div className="prose prose-invert prose-brand max-w-none text-slate-300">
        <h2>1. Introduction</h2>
        <p>
          Welcome to RESILIENTO. We respect your privacy and are committed to protecting your personal data. This privacy policy will inform you as to how we look after your personal data when you visit our website (regardless of where you visit it from) and tell you about your privacy rights and how the law protects you.
        </p>
        
        <h2>2. Data We Collect</h2>
        <p>
          Currently, as RESILIENTO is operating primarily as a waitlist and marketing site, we collect minimal data:
        </p>
        <ul>
          <li><strong>Identity and Contact Data:</strong> Email address when you join our waitlist.</li>
          <li><strong>Technical Data:</strong> Internet protocol (IP) address, browser type and version, time zone setting and location.</li>
          <li><strong>Usage Data:</strong> Information about how you use our website.</li>
        </ul>

        <h2>3. How We Use Your Data</h2>
        <p>
          We use your data primarily to manage our waitlist, contact you regarding early access to the platform, and to improve our website experience through basic analytics.
        </p>

        <h2>4. Data Security</h2>
        <p>
          We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used, or accessed in an unauthorized way, altered, or disclosed.
        </p>

        <h2>5. Your Legal Rights</h2>
        <p>
          Under certain circumstances, you have rights under data protection laws in relation to your personal data, including the right to request access, correction, erasure, restriction, transfer, or to object to processing.
        </p>
        <p>
          To exercise any of these rights, please contact us at support@resiliento.app.
        </p>
      </div>
    </article>
  );
}
