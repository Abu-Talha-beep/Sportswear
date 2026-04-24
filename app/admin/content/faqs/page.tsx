import { AdminPlaceholder } from '@/components/admin/AdminPlaceholder';

export default function AdminContentFaqsPage() {
  return (
    <AdminPlaceholder
      title="FAQ Manager"
      summary="Create and organize frequently asked questions by category with sortable ordering."
      nextSteps={[
        'Build FAQ CRUD and category grouping.',
        'Add drag-and-drop ordering support.',
        'Track revision history for policy-related answers.',
      ]}
    />
  );
}
