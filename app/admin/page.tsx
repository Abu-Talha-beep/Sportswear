import { AdminPageHeader } from '@/components/admin/AdminPageHeader';
import { AdminStatCard } from '@/components/admin/AdminStatCard';
import { dbGetDashboardStats, dbGetOrders, dbGetProducts } from '@/lib/supabase/db';

export default async function AdminDashboardPage() {
  let stats = { totalProducts: 0, totalClubs: 0, totalOrders: 0, totalRevenue: 0 };
  let recentOrders: Record<string, unknown>[] = [];
  let lowStockProducts: Record<string, unknown>[] = [];

  try {
    stats = await dbGetDashboardStats();
    recentOrders = await dbGetOrders({ limit: 5 });
    lowStockProducts = await dbGetProducts({ limit: 10 });
  } catch {
    // DB may not be set up yet — show zeros
  }

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Dashboard"
        description="Live operations snapshot across orders, customers, inventory, and sustainability."
      />

      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <AdminStatCard label="Total Products" value={String(stats.totalProducts)} delta="+2 this week" />
        <AdminStatCard label="Total Clubs" value={String(stats.totalClubs)} delta="Active shops" />
        <AdminStatCard label="Total Orders" value={String(stats.totalOrders)} delta="All time" />
        <AdminStatCard label="Revenue" value={`£${stats.totalRevenue.toFixed(2)}`} delta="From paid orders" />
      </section>

      <section className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        {/* Recent Orders */}
        <div className="rounded-2xl border border-border bg-surface p-6 shadow-sm">
          <h2 className="font-[var(--font-heading)] text-xl font-bold text-primary uppercase mb-4">Recent Orders</h2>
          {recentOrders.length === 0 ? (
            <p className="text-sm text-muted py-8 text-center">No orders yet. They will appear here once customers start purchasing.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-2 text-xs font-semibold text-muted">Order #</th>
                    <th className="text-left py-2 text-xs font-semibold text-muted">Customer</th>
                    <th className="text-left py-2 text-xs font-semibold text-muted">Total</th>
                    <th className="text-left py-2 text-xs font-semibold text-muted">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map((o: Record<string, unknown>) => (
                    <tr key={o.id as string} className="border-b border-border-light">
                      <td className="py-2 font-semibold text-primary">#{o.order_number as string}</td>
                      <td className="py-2">{o.customer_name as string}</td>
                      <td className="py-2 font-semibold">£{Number(o.total).toFixed(2)}</td>
                      <td className="py-2">
                        <span className="inline-block bg-surface-alt border border-border rounded-lg px-2 py-0.5 text-xs font-semibold capitalize">
                          {o.fulfillment_status as string}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Products overview */}
        <div className="rounded-2xl border border-border bg-surface p-6 shadow-sm">
          <h2 className="font-[var(--font-heading)] text-xl font-bold text-primary uppercase mb-4">Products</h2>
          {lowStockProducts.length === 0 ? (
            <p className="text-sm text-muted py-8 text-center">No products in database yet. Add products in the Products tab or run the schema SQL first.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-2 text-xs font-semibold text-muted">Name</th>
                    <th className="text-left py-2 text-xs font-semibold text-muted">Category</th>
                    <th className="text-left py-2 text-xs font-semibold text-muted">Price</th>
                    <th className="text-left py-2 text-xs font-semibold text-muted">Stock</th>
                  </tr>
                </thead>
                <tbody>
                  {lowStockProducts.map((p: Record<string, unknown>) => (
                    <tr key={p.id as string} className="border-b border-border-light">
                      <td className="py-2 font-semibold">{p.name as string}</td>
                      <td className="py-2">
                        <span className="inline-block bg-surface-alt border border-border rounded-lg px-2 py-0.5 text-xs font-semibold">{p.category_slug as string}</span>
                      </td>
                      <td className="py-2 font-semibold">£{Number(p.price).toFixed(2)}</td>
                      <td className="py-2">
                        <span className={`text-xs font-bold ${(p.stock_count as number) > 10 ? 'text-emerald-600' : 'text-amber-500'}`}>
                          {p.stock_count as number}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </section>

      {/* Quick links */}
      <section className="rounded-2xl border border-border bg-surface p-6 shadow-sm">
        <h2 className="font-[var(--font-heading)] text-xl font-bold text-primary uppercase mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: '➕ Add Product', href: '/admin/products' },
            { label: '🏟️ Add Club', href: '/admin/clubs' },
            { label: '🖼️ Edit Banners', href: '/admin/content' },
            { label: '📦 View Orders', href: '/admin/orders' },
          ].map((item) => (
            <a key={item.label} href={item.href}
              className="rounded-xl border border-border hover:border-accent p-4 text-center transition-all hover:shadow-md">
              <p className="text-sm font-semibold text-foreground">{item.label}</p>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}
