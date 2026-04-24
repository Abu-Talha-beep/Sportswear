import { redirect } from 'next/navigation';
import { getAdminSession } from '@/lib/admin/session';
import { AdminLoginForm } from '@/components/admin/AdminLoginForm';

export default async function AdminAuthPage() {
  const session = await getAdminSession();

  if (session) {
    redirect('/admin');
  }

  return <AdminLoginForm />;
}
