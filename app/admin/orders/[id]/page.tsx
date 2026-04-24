import { AdminPlaceholder } from '@/components/admin/AdminPlaceholder';

export default async function AdminOrderDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  return (
    <AdminPlaceholder
      title={`Order ${id}`}
      summary="Detailed order view with payment info, fulfillment timeline, tracking, notes, and activity log."
      nextSteps={[
        'Render customer, shipping, billing, and itemized totals sections.',
        'Add status transition actions with email triggers.',
        'Implement refund and return handling workflow.',
      ]}
    />
  );
}
