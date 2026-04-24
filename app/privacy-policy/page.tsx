import { Metadata } from 'next';

export const metadata: Metadata = { title: 'Privacy Policy', description: 'How we handle your data at Your Club Stash.' };

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
      <h1 className="font-[var(--font-heading)] text-4xl md:text-5xl font-bold text-primary uppercase mb-8">Privacy Policy</h1>
      <div className="prose max-w-none text-muted leading-relaxed space-y-6">
        <p><em>Last updated: January 2026</em></p>
        <p>Your Club Stash (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;) is committed to protecting your privacy. This policy explains how we collect, use, and safeguard your personal information.</p>
        <h2 className="font-[var(--font-heading)] text-xl font-bold text-primary uppercase">Information We Collect</h2>
        <ul className="list-disc list-inside space-y-2"><li>Name, email address, and contact details when you register or place an order.</li><li>Delivery address and billing information.</li><li>Browsing behaviour and cookies for site analytics.</li></ul>
        <h2 className="font-[var(--font-heading)] text-xl font-bold text-primary uppercase">How We Use Your Data</h2>
        <ul className="list-disc list-inside space-y-2"><li>To process and fulfil your orders.</li><li>To communicate with you about your orders and account.</li><li>To send marketing emails (with your consent).</li><li>To improve our website and services.</li></ul>
        <h2 className="font-[var(--font-heading)] text-xl font-bold text-primary uppercase">Your Rights</h2>
        <p>Under GDPR, you have the right to access, correct, or delete your personal data. Contact us at privacy@yourclubstash.co.uk to exercise these rights.</p>
        <h2 className="font-[var(--font-heading)] text-xl font-bold text-primary uppercase">Cookies</h2>
        <p>We use essential cookies to ensure the website functions correctly, and analytics cookies to understand how visitors use our site. You can manage your cookie preferences in your browser settings.</p>
        <h2 className="font-[var(--font-heading)] text-xl font-bold text-primary uppercase">Contact</h2>
        <p>For privacy-related queries, email: <strong>privacy@yourclubstash.co.uk</strong></p>
      </div>
    </div>
  );
}
