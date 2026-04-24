import { AdminPlaceholder } from '@/components/admin/AdminPlaceholder';

export default function AdminPaymentsSettingsPage() {
  return (
    <AdminPlaceholder
      title="Payment Settings"
      summary="Configure Stripe/PayPal credentials, accepted card wallets, and refund policy controls."
      nextSteps={[
        'Store gateway secrets in environment variables only.',
        'Add payment method toggles with audit logging.',
        'Implement test mode and webhook verification status.',
      ]}
    />
  );
}
