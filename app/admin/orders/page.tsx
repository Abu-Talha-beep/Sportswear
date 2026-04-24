'use client';

import { useState, useEffect, useCallback } from 'react';
import { Loader2, ChevronDown } from 'lucide-react';

interface OrderItem {
  id: string;
  product_name: string;
  product_image: string;
  size: string;
  color: string;
  quantity: number;
  unit_price: number;
  total_price: number;
}

interface Order {
  id: string;
  order_number: string;
  customer_name: string;
  customer_email: string;
  subtotal: number;
  total: number;
  payment_status: string;
  fulfillment_status: string;
  created_at: string;
  order_items: OrderItem[];
}

const STATUS_COLORS: Record<string, string> = {
  pending: 'bg-amber-100 text-amber-700',
  paid: 'bg-emerald-100 text-emerald-700',
  failed: 'bg-red-100 text-red-700',
  refunded: 'bg-gray-100 text-gray-600',
  unfulfilled: 'bg-amber-100 text-amber-700',
  processing: 'bg-sky-100 text-sky-700',
  dispatched: 'bg-blue-100 text-blue-700',
  delivered: 'bg-emerald-100 text-emerald-700',
  returned: 'bg-red-100 text-red-700',
};

const FULFILLMENT_OPTIONS = ['unfulfilled', 'processing', 'dispatched', 'delivered', 'returned'];

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [updating, setUpdating] = useState<string | null>(null);

  const fetchOrders = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (statusFilter) params.set('status', statusFilter);
      const res = await fetch(`/api/admin/orders?${params}`);
      const data = await res.json();
      setOrders(data.orders ?? []);
    } catch { /* empty */ }
    setLoading(false);
  }, [statusFilter]);

  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { fetchOrders(); }, [fetchOrders]);

  const updateStatus = async (orderId: string, field: string, value: string) => {
    setUpdating(orderId);
    try {
      await fetch('/api/admin/orders', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: orderId, [field]: value }),
      });
      fetchOrders();
    } catch { /* empty */ }
    setUpdating(null);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-[var(--font-heading)] text-2xl font-bold text-primary uppercase">Orders</h1>
        <p className="text-sm text-muted">View and manage customer orders</p>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        {['All', ...FULFILLMENT_OPTIONS].map((s) => {
          const count = s === 'All' ? orders.length : orders.filter((o) => o.fulfillment_status === s).length;
          return (
            <button key={s} onClick={() => setStatusFilter(s === 'All' ? '' : s)}
              className={`rounded-xl border p-3 text-center transition-all ${statusFilter === (s === 'All' ? '' : s)
                ? 'border-accent bg-accent/5' : 'border-border bg-surface hover:border-accent/30'}`}>
              <p className="text-xl font-bold text-primary">{count}</p>
              <p className="text-xs font-semibold text-muted capitalize">{s}</p>
            </button>
          );
        })}
      </div>

      {/* Orders list */}
      <div className="rounded-2xl border border-border bg-surface overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-20"><Loader2 className="w-8 h-8 animate-spin text-accent" /></div>
        ) : orders.length === 0 ? (
          <div className="text-center py-20 text-muted">
            <p className="text-lg font-semibold">No orders yet</p>
            <p className="text-sm mt-1">Orders will appear here once customers start purchasing.</p>
          </div>
        ) : (
          <div className="divide-y divide-border-light">
            {orders.map((order) => (
              <div key={order.id}>
                {/* Order row */}
                <div className="flex items-center gap-4 px-5 py-4 hover:bg-surface-alt/30 cursor-pointer"
                  onClick={() => setExpandedId(expandedId === order.id ? null : order.id)}>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3">
                      <span className="font-bold text-primary text-sm">#{order.order_number}</span>
                      <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${STATUS_COLORS[order.payment_status] || 'bg-gray-100'}`}>
                        {order.payment_status}
                      </span>
                      <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${STATUS_COLORS[order.fulfillment_status] || 'bg-gray-100'}`}>
                        {order.fulfillment_status}
                      </span>
                    </div>
                    <p className="text-sm text-foreground mt-0.5">{order.customer_name} — {order.customer_email}</p>
                    <p className="text-xs text-muted">{new Date(order.created_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</p>
                  </div>
                  <p className="font-bold text-lg text-primary">£{Number(order.total).toFixed(2)}</p>
                  <ChevronDown className={`w-5 h-5 text-muted transition-transform ${expandedId === order.id ? 'rotate-180' : ''}`} />
                </div>

                {/* Expanded details */}
                {expandedId === order.id && (
                  <div className="px-5 pb-5 bg-surface-alt/30">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      {/* Items */}
                      <div className="rounded-xl border border-border bg-surface p-4">
                        <h3 className="text-sm font-bold text-foreground mb-3">Order Items ({order.order_items?.length ?? 0})</h3>
                        <div className="space-y-2">
                          {(order.order_items ?? []).map((item) => (
                            <div key={item.id} className="flex items-center gap-3 text-sm">
                              <div className="w-8 h-8 rounded bg-surface-alt flex items-center justify-center text-xs text-muted">
                                {item.quantity}×
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="font-semibold truncate">{item.product_name}</p>
                                <p className="text-xs text-muted">{item.size}{item.color ? ` / ${item.color}` : ''}</p>
                              </div>
                              <p className="font-semibold">£{Number(item.total_price).toFixed(2)}</p>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Update status */}
                      <div className="rounded-xl border border-border bg-surface p-4 space-y-3">
                        <h3 className="text-sm font-bold text-foreground mb-3">Update Status</h3>
                        <div>
                          <label className="block text-xs font-semibold text-muted mb-1">Fulfillment Status</label>
                          <select
                            value={order.fulfillment_status}
                            onChange={(e) => updateStatus(order.id, 'fulfillment_status', e.target.value)}
                            disabled={updating === order.id}
                            className="w-full rounded-xl border border-border px-3 py-2 text-sm bg-surface-alt">
                            {FULFILLMENT_OPTIONS.map((s) => (
                              <option key={s} value={s} className="capitalize">{s}</option>
                            ))}
                          </select>
                        </div>
                        {updating === order.id && (
                          <div className="flex items-center gap-2 text-xs text-accent">
                            <Loader2 className="w-3 h-3 animate-spin" /> Updating...
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
