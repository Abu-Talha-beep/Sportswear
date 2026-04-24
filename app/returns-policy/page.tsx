import { Metadata } from 'next';

export const metadata: Metadata = { title: 'Returns Policy', description: 'Our returns and refund policy for Your Club Stash orders.' };

export default function ReturnsPolicyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
      <h1 className="font-[var(--font-heading)] text-4xl md:text-5xl font-bold text-primary uppercase mb-8">Returns Policy</h1>
      <div className="prose max-w-none text-muted leading-relaxed space-y-6">
        <p>We want you to be completely happy with your purchase. If for any reason you&apos;re not satisfied, you can return most items within 30 days of delivery.</p>
        <h2 className="font-[var(--font-heading)] text-xl font-bold text-primary uppercase">How to Return</h2>
        <ol className="list-decimal list-inside space-y-2"><li>Email us at returns@yourclubstash.co.uk with your order number.</li><li>We&apos;ll provide a returns label and instructions.</li><li>Pack the item(s) securely and post them back.</li><li>Refunds are processed within 5-7 working days of receiving the return.</li></ol>
        <h2 className="font-[var(--font-heading)] text-xl font-bold text-primary uppercase">Conditions</h2>
        <ul className="list-disc list-inside space-y-2"><li>Items must be unworn, unwashed, and in original packaging.</li><li>Custom/personalised items cannot be returned unless faulty.</li><li>Sale items are final sale and cannot be returned.</li><li>Gift cards are non-refundable.</li></ul>
        <h2 className="font-[var(--font-heading)] text-xl font-bold text-primary uppercase">Exchanges</h2>
        <p>We&apos;re happy to exchange items for a different size, subject to availability. Contact us and we&apos;ll arrange the swap.</p>
        <h2 className="font-[var(--font-heading)] text-xl font-bold text-primary uppercase">Faulty Items</h2>
        <p>If you receive a faulty or damaged item, please contact us immediately. We&apos;ll arrange a free return and send a replacement or full refund.</p>
      </div>
    </div>
  );
}
