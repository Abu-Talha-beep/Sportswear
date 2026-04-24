import { AdminPlaceholder } from '@/components/admin/AdminPlaceholder';

export default function AdminContentHomepagePage() {
  return (
    <AdminPlaceholder
      title="Homepage Manager"
      summary="Manage hero slides, category tiles, sport carousels, logos, and announcement bar content."
      nextSteps={[
        'Add drag-and-drop ordering for homepage blocks.',
        'Enable per-banner CTA, image, and link updates.',
        'Support schedule-based publishing for campaigns.',
      ]}
    />
  );
}
