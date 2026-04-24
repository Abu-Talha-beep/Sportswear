import { AdminRole } from '@/lib/admin/types';
import { getSupabaseAdminClient } from '@/lib/supabase/server';

export interface AdminUserRecord {
  id: string;
  email: string;
  fullName: string;
  role: AdminRole;
  passwordHash: string;
  isActive: boolean;
  twoFactorEnabled: boolean;
}

const ADMIN_ROLES: AdminRole[] = [
  'super-admin',
  'store-manager',
  'club-admin',
  'content-editor',
  'customer-support',
  'warehouse',
];

function isAdminRole(value: string): value is AdminRole {
  return ADMIN_ROLES.includes(value as AdminRole);
}

export async function getAdminUserByEmail(email: string): Promise<AdminUserRecord | null> {
  const normalized = email.trim().toLowerCase();
  if (!normalized) {
    return null;
  }

  const supabase = getSupabaseAdminClient();
  const { data, error } = await supabase
    .from('admin_users')
    .select('id,email,full_name,role,password_hash,is_active,two_factor_enabled')
    .ilike('email', normalized)
    .maybeSingle();

  if (error) {
    throw new Error(`Failed to fetch admin user: ${error.message}`);
  }

  if (!data) {
    return null;
  }

  if (!isAdminRole(data.role)) {
    return null;
  }

  return {
    id: data.id,
    email: data.email,
    fullName: data.full_name,
    role: data.role,
    passwordHash: data.password_hash,
    isActive: data.is_active,
    twoFactorEnabled: data.two_factor_enabled,
  };
}
