import { AdminPlaceholder } from '@/components/admin/AdminPlaceholder';

export default function AdminAnalyticsSalesPage() {
  return (
    <AdminPlaceholder
      title="Sales Reports"
      summary="Analyze revenue trends, channels, conversion funnel, and average order value."
      nextSteps={[
        'Build daily/weekly/monthly/yearly trend charts.',
        'Break down revenue by category, club, and channel.',
        'Export and schedule recurring sales reports.',
      ]}
    />
  );
}
