import { Metadata } from 'next';

export const metadata: Metadata = { title: 'Delivery Information', description: 'Delivery options and timescales for Your Club Stash orders.' };

export default function DeliveryPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
      <h1 className="font-[var(--font-heading)] text-4xl md:text-5xl font-bold text-primary uppercase mb-8">Delivery Information</h1>
      <div className="space-y-6 text-muted leading-relaxed">
        <div className="bg-surface rounded-2xl border border-border-light p-6">
          <h3 className="font-[var(--font-heading)] text-lg font-bold text-primary uppercase mb-2">Standard Delivery</h3>
          <p>3-5 working days — <strong className="text-foreground">£3.99</strong> (FREE on orders over £50)</p>
        </div>
        <div className="bg-surface rounded-2xl border border-border-light p-6">
          <h3 className="font-[var(--font-heading)] text-lg font-bold text-primary uppercase mb-2">Express Delivery</h3>
          <p>1-2 working days — <strong className="text-foreground">£7.99</strong></p>
        </div>
        <div className="bg-surface rounded-2xl border border-border-light p-6">
          <h3 className="font-[var(--font-heading)] text-lg font-bold text-primary uppercase mb-2">International Delivery</h3>
          <p>7-14 working days — from <strong className="text-foreground">£12.99</strong></p>
        </div>
        <div className="bg-surface rounded-2xl border border-border-light p-6">
          <h3 className="font-[var(--font-heading)] text-lg font-bold text-primary uppercase mb-2">Custom Kit Orders</h3>
          <p>3-4 weeks from design approval. Delivery is included in the quoted price.</p>
        </div>
        <p>All orders are dispatched from our UK warehouse. You will receive an email with tracking information once your order has been shipped.</p>
        <p>During peak periods (Christmas, back to school, new season), delivery times may be slightly longer. We&apos;ll always keep you informed.</p>
      </div>
    </div>
  );
}
