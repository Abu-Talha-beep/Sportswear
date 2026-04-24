export type AdminRole =
  | 'super-admin'
  | 'store-manager'
  | 'club-admin'
  | 'content-editor'
  | 'customer-support'
  | 'warehouse';

export interface AdminSessionPayload {
  email: string;
  name: string;
  role: AdminRole;
  expiresAt: number;
}

export interface AdminNavItem {
  label: string;
  href: string;
  roles?: AdminRole[];
}
