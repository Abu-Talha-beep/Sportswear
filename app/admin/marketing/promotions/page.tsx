import { AdminPlaceholder } from '@/components/admin/AdminPlaceholder';

export default function AdminMarketingPromotionsPage() {
  return (
    <AdminPlaceholder
      title="Promotions Engine"
      summary="Set up flash sales, bundles, tiered pricing, and club-level promotional rules."
      nextSteps={[
        'Create promotion rule builder with validity windows.',
        'Add conflict resolution between overlapping discounts.',
        'Display campaign performance metrics in analytics.',
      ]}
    />
  );
}
