'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useSyncExternalStore } from 'react';
import {
  BarChart3,
  FileText,
  LayoutDashboard,
  Megaphone,
  Package,
  Settings,
  ShieldCheck,
  Shirt,
  ShoppingCart,
  Users,
} from 'lucide-react';
import { adminNav } from '@/lib/admin/navigation';
import { AdminRole } from '@/lib/admin/types';

interface AdminShellProps {
  children: React.ReactNode;
  adminName: string;
  adminEmail: string;
  adminRole: AdminRole;
}

function getNavIcon(href: string) {
  if (href === '/admin') return LayoutDashboard;
  if (href.startsWith('/admin/products')) return Package;
  if (href.startsWith('/admin/orders')) return ShoppingCart;
  if (href.startsWith('/admin/clubs')) return Shirt;
  if (href.startsWith('/admin/customers')) return Users;
  if (href.startsWith('/admin/stash-builder')) return Settings;
  if (href.startsWith('/admin/content')) return FileText;
  if (href.startsWith('/admin/marketing')) return Megaphone;
  if (href.startsWith('/admin/analytics')) return BarChart3;
  if (href.startsWith('/admin/settings')) return Settings;
  if (href.startsWith('/admin/staff')) return ShieldCheck;
  return LayoutDashboard;
}

const SIDEBAR_STORAGE_KEY = 'admin.sidebar.collapsed';

function subscribeSidebarState(onStoreChange: () => void) {
  if (typeof window === 'undefined') {
    return () => {};
  }

  const handleChange = () => onStoreChange();
  window.addEventListener('storage', handleChange);
  window.addEventListener('admin-sidebar-changed', handleChange as EventListener);

  return () => {
    window.removeEventListener('storage', handleChange);
    window.removeEventListener('admin-sidebar-changed', handleChange as EventListener);
  };
}

function getSidebarSnapshot() {
  if (typeof window === 'undefined') {
    return false;
  }
  return window.localStorage.getItem(SIDEBAR_STORAGE_KEY) === '1';
}

function getSidebarServerSnapshot() {
  return false;
}

export function AdminShell({ children, adminName, adminEmail, adminRole }: AdminShellProps) {
  const pathname = usePathname();
  const router = useRouter();
  const sidebarCollapsed = useSyncExternalStore(
    subscribeSidebarState,
    getSidebarSnapshot,
    getSidebarServerSnapshot
  );

  const visibleNav = adminNav.filter(
    (item) => !item.roles || item.roles.includes(adminRole) || adminRole === 'super-admin'
  );

  const effectiveCollapsed = sidebarCollapsed;

  const toggleSidebar = () => {
    const next = effectiveCollapsed ? '0' : '1';
    window.localStorage.setItem(SIDEBAR_STORAGE_KEY, next);
    window.dispatchEvent(new Event('admin-sidebar-changed'));
  };

  const handleLogout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' });
    router.replace('/admin/login');
    router.refresh();
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_0%_0%,#eef3ff_0,#f8f9fa_40%,#f8f9fa_100%)]">
      <div className="mx-auto flex max-w-[1500px] gap-5 px-4 py-6 sm:px-6 lg:px-8">
        <aside
          className={`hidden shrink-0 rounded-3xl bg-primary p-5 text-white transition-all duration-300 lg:block ${
            effectiveCollapsed ? 'w-24' : 'w-72'
          }`}
        >
          <div className="border-b border-white/10 pb-5">
            <div className="flex items-start justify-between gap-3">
              {!effectiveCollapsed && (
                <div>
                  <p className="text-xs uppercase tracking-[0.18em] text-white/60">Your Club Stash</p>
                  <h2 className="mt-2 font-[var(--font-heading)] text-2xl uppercase">Admin Panel</h2>
                </div>
              )}
              <button
                type="button"
                onClick={toggleSidebar}
                className="rounded-lg border border-white/20 px-2.5 py-1.5 text-sm font-semibold text-white/80 hover:bg-white/10 hover:text-white"
                title={effectiveCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
              >
                {effectiveCollapsed ? '>>' : '<<'}
              </button>
            </div>
          </div>

          <nav className="mt-6 space-y-1">
            {visibleNav.map((item) => {
              const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
              const Icon = getNavIcon(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`block rounded-xl px-4 py-2.5 text-sm font-semibold transition-colors ${
                    active ? 'bg-white text-primary' : 'text-white/80 hover:bg-white/10 hover:text-white'
                  } ${effectiveCollapsed ? 'px-0' : ''}`}
                  title={item.label}
                >
                  <span
                    className={`flex items-center ${
                      effectiveCollapsed ? 'justify-center' : 'justify-start gap-2.5'
                    }`}
                  >
                    <Icon className="h-4 w-4 shrink-0" />
                    {!effectiveCollapsed && <span>{item.label}</span>}
                  </span>
                </Link>
              );
            })}
          </nav>

          <button
            type="button"
            onClick={handleLogout}
            className={`mt-8 w-full rounded-xl border border-white/25 px-4 py-2.5 text-sm font-semibold text-white hover:bg-white/10 ${
              effectiveCollapsed ? 'px-0' : ''
            }`}
            title="Log out"
          >
            {effectiveCollapsed ? 'L' : 'Log out'}
          </button>
        </aside>

        <div className="flex min-w-0 flex-1 flex-col gap-5">
          <header className="rounded-2xl border border-border bg-surface px-5 py-4 shadow-sm">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.16em] text-muted">Signed in as</p>
                <p className="text-sm font-semibold text-foreground">{adminName}</p>
                <p className="text-xs text-muted">{adminEmail}</p>
              </div>
              <div className="inline-flex rounded-full bg-surface-alt px-3 py-1 text-xs font-semibold uppercase text-primary">
                {adminRole.replace('-', ' ')}
              </div>
            </div>
          </header>

          <main className="min-w-0">{children}</main>
        </div>
      </div>
    </div>
  );
}
