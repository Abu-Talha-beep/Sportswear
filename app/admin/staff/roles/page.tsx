import { AdminPlaceholder } from '@/components/admin/AdminPlaceholder';

export default function AdminStaffRolesPage() {
  return (
    <AdminPlaceholder
      title="Role Management"
      summary="Define permission boundaries for super admins, managers, support, and warehouse users."
      nextSteps={[
        'Map role matrix to route-level and action-level permissions.',
        'Add custom role creation with per-module grants.',
        'Log all permission changes for audit compliance.',
      ]}
    />
  );
}
