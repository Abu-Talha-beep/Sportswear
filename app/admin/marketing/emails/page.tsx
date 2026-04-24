import { AdminPlaceholder } from '@/components/admin/AdminPlaceholder';

export default function AdminMarketingEmailsPage() {
  return (
    <AdminPlaceholder
      title="Email Campaigns"
      summary="Manage subscribers, lifecycle automation, and one-off campaign sends."
      nextSteps={[
        'Add subscriber list and segment targeting.',
        'Configure abandoned cart and re-engagement automations.',
        'Create reusable branded template editor.',
      ]}
    />
  );
}
