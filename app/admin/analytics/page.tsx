import { AdminPlaceholder } from '@/components/admin/AdminPlaceholder';

export default function AdminAnalyticsOverviewPage() {
  return (
    <AdminPlaceholder
      title="Analytics Overview"
      summary="Track top-level sales, product, customer, inventory, and sustainability KPIs."
      nextSteps={[
        'Add date-range controls and dashboard widgets.',
        'Enable CSV/Excel/PDF export actions.',
        'Configure scheduled report delivery to admin emails.',
      ]}
    />
  );
}
