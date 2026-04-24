import { AdminNavItem } from '@/lib/admin/types';

export const adminNav: AdminNavItem[] = [
  { label: 'Dashboard', href: '/admin' },
  { label: 'Products', href: '/admin/products' },
  { label: 'Orders', href: '/admin/orders' },
  { label: 'Clubs', href: '/admin/clubs' },
  { label: 'Customers', href: '/admin/customers' },
  { label: 'Stash Builder', href: '/admin/stash-builder' },
  { label: 'Content', href: '/admin/content' },
  { label: 'Marketing', href: '/admin/marketing/coupons' },
  { label: 'Analytics', href: '/admin/analytics' },
  { label: 'Settings', href: '/admin/settings' },
  { label: 'Staff & Roles', href: '/admin/staff', roles: ['super-admin'] },
];
