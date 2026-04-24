import { AdminPlaceholder } from '@/components/admin/AdminPlaceholder';

export default async function AdminEditClubPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  return (
    <AdminPlaceholder
      title={`Edit Club ${id}`}
      summary="Manage club profile, assigned products, and club-level analytics."
      nextSteps={[
        'Load club by id and prefill edit form.',
        'Add assign/unassign product controls for club assortment.',
        'Display revenue and order trend for this club.',
      ]}
    />
  );
}
