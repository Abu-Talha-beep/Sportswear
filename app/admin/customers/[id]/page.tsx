import { AdminPlaceholder } from '@/components/admin/AdminPlaceholder';

export default async function AdminCustomerDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  return (
    <AdminPlaceholder
      title={`Customer ${id}`}
      summary="Full customer profile with order timeline, wishlist, abandoned cart details, and support notes."
      nextSteps={[
        'Show account profile and addresses, including account actions.',
        'Render complete order history and communication log.',
        'Add segment badges and internal notes.',
      ]}
    />
  );
}
