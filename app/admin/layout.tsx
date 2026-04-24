import { redirect } from 'next/navigation';
import { AdminShell } from '@/components/admin/AdminShell';
import { getAdminSession } from '@/lib/admin/session';
import { getAdminUserByEmail } from '@/lib/admin/users';

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getAdminSession();

  if (!session) {
    redirect('/admin/login');
  }

  const adminUser = await getAdminUserByEmail(session.email);
  if (!adminUser || !adminUser.isActive) {
    redirect('/admin/login');
  }

  return (
    <AdminShell
      adminName={adminUser.fullName}
      adminEmail={adminUser.email}
      adminRole={adminUser.role}
    >
      {children}
    </AdminShell>
  );
}
