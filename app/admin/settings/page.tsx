import { AdminPageHeader } from '@/components/admin/AdminPageHeader';
import Link from 'next/link';

const settingSections = [
  {
    title: 'General Settings',
    summary: 'Store name, logos, locale, timezone, and core business profile.',
    href: '/admin/settings',
  },
  {
    title: 'Shipping',
    summary: 'Zones, carriers, and free-shipping threshold policies.',
    href: '/admin/settings/shipping',
  },
  {
    title: 'Payments',
    summary: 'Gateway setup, accepted methods, and refund behavior.',
    href: '/admin/settings/payments',
  },
  {
    title: 'Emails',
    summary: 'SMTP provider and notification templates/toggles.',
    href: '/admin/settings/emails',
  },
  {
    title: 'SEO',
    summary: 'Global metadata templates, redirects, and robots control.',
    href: '/admin/settings/seo',
  },
];

export default function AdminSettingsPage() {
  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Settings"
        description="Configure store-wide behavior for operations, compliance, payments, and customer communication."
      />

      <section className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {settingSections.map((section) => (
          <Link
            key={section.title}
            href={section.href}
            className="rounded-2xl border border-border bg-surface p-5 shadow-sm transition-colors hover:bg-surface-alt"
          >
            <h2 className="font-[var(--font-heading)] text-2xl font-bold text-primary uppercase">{section.title}</h2>
            <p className="mt-2 text-sm text-muted">{section.summary}</p>
          </Link>
        ))}
      </section>
    </div>
  );
}
