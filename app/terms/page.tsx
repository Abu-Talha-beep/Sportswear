import { Metadata } from 'next';

export const metadata: Metadata = { title: 'Terms & Conditions', description: 'Terms and conditions for using the Your Club Stash website.' };

export default function TermsPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
      <h1 className="font-[var(--font-heading)] text-4xl md:text-5xl font-bold text-primary uppercase mb-8">Terms & Conditions</h1>
      <div className="prose max-w-none text-muted leading-relaxed space-y-6">
        <p><em>Last updated: January 2026</em></p>
        <h2 className="font-[var(--font-heading)] text-xl font-bold text-primary uppercase">1. General</h2>
        <p>These terms govern your use of yourclubstash.co.uk. By placing an order, you agree to be bound by these terms.</p>
        <h2 className="font-[var(--font-heading)] text-xl font-bold text-primary uppercase">2. Orders</h2>
        <p>All orders are subject to availability. Prices are in GBP and include VAT where applicable. We reserve the right to refuse any order at our discretion.</p>
        <h2 className="font-[var(--font-heading)] text-xl font-bold text-primary uppercase">3. Payment</h2>
        <p>Payment is taken at the time of ordering via our secure payment provider. We accept Visa, Mastercard, Apple Pay, Google Pay, and PayPal.</p>
        <h2 className="font-[var(--font-heading)] text-xl font-bold text-primary uppercase">4. Delivery</h2>
        <p>Delivery timescales are estimates and not guaranteed. See our Delivery page for full details.</p>
        <h2 className="font-[var(--font-heading)] text-xl font-bold text-primary uppercase">5. Returns</h2>
        <p>See our Returns Policy page for full details on our 30-day returns policy.</p>
        <h2 className="font-[var(--font-heading)] text-xl font-bold text-primary uppercase">6. Intellectual Property</h2>
        <p>All content on this website, including images, text, and logos, is the property of Your Club Stash and may not be reproduced without permission.</p>
        <h2 className="font-[var(--font-heading)] text-xl font-bold text-primary uppercase">7. Limitation of Liability</h2>
        <p>We shall not be liable for any indirect, incidental, or consequential damages arising from the use of our website or products.</p>
        <h2 className="font-[var(--font-heading)] text-xl font-bold text-primary uppercase">8. Governing Law</h2>
        <p>These terms are governed by the laws of England and Wales.</p>
      </div>
    </div>
  );
}
