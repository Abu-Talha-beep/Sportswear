import { redirect } from 'next/navigation';
import { getAdminSession } from '@/lib/admin/session';
import { AdminLoginForm } from '@/components/admin/AdminLoginForm';

function getSafeNextPath(nextPath?: string): string {
  if (!nextPath) return '/admin';
  return nextPath.startsWith('/admin') ? nextPath : '/admin';
}

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  const session = await getAdminSession();
  const { next } = await searchParams;

  if (session) {
    redirect(getSafeNextPath(next));
  }

  return <AdminLoginForm />;
}
