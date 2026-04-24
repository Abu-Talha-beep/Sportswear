import { AdminPlaceholder } from '@/components/admin/AdminPlaceholder';

export default function AdminEmailSettingsPage() {
  return (
    <AdminPlaceholder
      title="Email Settings"
      summary="Set SMTP provider, template defaults, and customer/admin notification preferences."
      nextSteps={[
        'Add provider setup form and test-send action.',
        'Map templates to order and lifecycle events.',
        'Expose notification toggles by event type.',
      ]}
    />
  );
}
