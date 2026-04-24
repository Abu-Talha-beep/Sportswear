import { AdminPlaceholder } from '@/components/admin/AdminPlaceholder';

export default function AdminAnalyticsCustomersPage() {
  return (
    <AdminPlaceholder
      title="Customer Reports"
      summary="Compare new vs returning behavior, CLV, geographies, and loyalty segments."
      nextSteps={[
        'Add CLV and retention cohort visuals.',
        'Show acquisition source and regional maps.',
        'Export segment snapshots for CRM workflows.',
      ]}
    />
  );
}
