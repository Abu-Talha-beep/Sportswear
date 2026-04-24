import { AdminPlaceholder } from '@/components/admin/AdminPlaceholder';

export default async function AdminStashBuilderDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  return (
    <AdminPlaceholder
      title={`Stash Request ${id}`}
      summary="Review customer selections, upload design proofs, and move jobs through production milestones."
      nextSteps={[
        'Render itemized quote breakdown and lead-time controls.',
        'Track proof versions and approval history.',
        'Trigger invoice generation after completion.',
      ]}
    />
  );
}
