import { AdminPlaceholder } from '@/components/admin/AdminPlaceholder';

export default function AdminStashBuilderPage() {
  return (
    <AdminPlaceholder
      title="Stash Builder"
      summary="Manage quote requests, design proof approvals, and custom order production stages."
      nextSteps={[
        'Build quote inbox with workflow states and filtering.',
        'Attach proof versions and customer approval comments.',
        'Generate branded PDF quote documents.',
      ]}
    />
  );
}
