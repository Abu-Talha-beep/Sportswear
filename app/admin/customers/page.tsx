import { AdminPageHeader } from '@/components/admin/AdminPageHeader';
import { AdminTable } from '@/components/admin/AdminTable';
import { customerRows } from '@/lib/admin/mockData';

export default function AdminCustomersPage() {
  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Customers"
        description="Review customer profiles, order history, lifecycle segments, and retention actions."
      />

      <section className="grid grid-cols-1 gap-4 rounded-2xl border border-border bg-surface p-5 md:grid-cols-5">
        <input className="rounded-xl border border-border px-4 py-2.5 text-sm" placeholder="Name or email" />
        <select className="rounded-xl border border-border px-4 py-2.5 text-sm" defaultValue="all-segments">
          <option value="all-segments">All segments</option>
          <option value="vip">VIP</option>
          <option value="new">New</option>
          <option value="repeat">Repeat buyers</option>
          <option value="at-risk">At risk</option>
        </select>
        <select className="rounded-xl border border-border px-4 py-2.5 text-sm" defaultValue="all-clubs">
          <option value="all-clubs">All clubs</option>
          <option value="warriors-rfc">Warriors RFC</option>
          <option value="lions-fc">Lions FC</option>
        </select>
        <input type="date" className="rounded-xl border border-border px-4 py-2.5 text-sm" />
        <button className="rounded-xl border border-border bg-surface-alt px-4 py-2.5 text-sm font-semibold hover:bg-border-light">
          Export CSV
        </button>
      </section>

      <AdminTable
        title="Customer Directory"
        columns={['id', 'name', 'email', 'orders', 'totalSpent', 'registered', 'lastOrder', 'club']}
        rows={customerRows}
      />
    </div>
  );
}
