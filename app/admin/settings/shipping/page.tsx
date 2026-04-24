import { AdminPlaceholder } from '@/components/admin/AdminPlaceholder';

export default function AdminShippingSettingsPage() {
  return (
    <AdminPlaceholder
      title="Shipping Settings"
      summary="Manage UK and international shipping zones, rates, carrier options, and tracking URL templates."
      nextSteps={[
        'Add zone/rate CRUD with validation and preview.',
        'Configure free shipping threshold and policy exceptions.',
        'Integrate carrier APIs for label/tracking updates.',
      ]}
    />
  );
}
