import { AdminPlaceholder } from '@/components/admin/AdminPlaceholder';

export default function AdminStaffPage() {
  return (
    <AdminPlaceholder
      title="Staff Directory"
      summary="Manage admin users, activity tracking, and account security controls."
      nextSteps={[
        'Create staff invite and role assignment workflows.',
        'Enforce 2FA for privileged roles.',
        'Display last login and action audit history.',
      ]}
    />
  );
}
