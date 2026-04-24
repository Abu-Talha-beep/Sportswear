import { AdminPlaceholder } from '@/components/admin/AdminPlaceholder';

export default function AdminNewClubPage() {
  return (
    <AdminPlaceholder
      title="Add Club"
      summary="Create club storefront profiles with sport grouping, branding assets, and contact details."
      nextSteps={[
        'Implement logo and banner upload with minimum-size validation.',
        'Support commission percentage and custom vanity URL fields.',
        'Add club-specific pricing override controls.',
      ]}
    />
  );
}
