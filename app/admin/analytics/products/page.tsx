import { AdminPlaceholder } from '@/components/admin/AdminPlaceholder';

export default function AdminAnalyticsProductsPage() {
  return (
    <AdminPlaceholder
      title="Product Reports"
      summary="Evaluate best sellers, low performers, and demand patterns by size and colour."
      nextSteps={[
        'Add rankings by quantity and revenue.',
        'Show dead-stock and no-sales alerts.',
        'Map size/colour demand for stock planning.',
      ]}
    />
  );
}
