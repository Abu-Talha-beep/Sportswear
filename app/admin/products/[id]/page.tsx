import { AdminPlaceholder } from '@/components/admin/AdminPlaceholder';

export default async function AdminEditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  return (
    <AdminPlaceholder
      title={`Edit Product ${id}`}
      summary="Update product details, pricing rules, stock, and channel visibility for store and club shops."
      nextSteps={[
        'Load existing product from DB by id and hydrate edit form.',
        'Track stock history with who/when/why metadata.',
        'Add reorder threshold alert automation.',
      ]}
    />
  );
}
