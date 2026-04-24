'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { Loader2 } from 'lucide-react';
import { AdminPageHeader } from '@/components/admin/AdminPageHeader';
import { AdminTable } from '@/components/admin/AdminTable';

interface CustomerRow {
  id: string;
  name: string;
  email: string;
  orders: number;
  totalSpent: number;
  registered: string;
  lastOrder: string;
  club: string;
  segment: 'vip' | 'new' | 'repeat' | 'at-risk';
}

export default function AdminCustomersPage() {
  const [customers, setCustomers] = useState<CustomerRow[]>([]);
  const [clubs, setClubs] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [segment, setSegment] = useState('all-segments');
  const [club, setClub] = useState('all-clubs');
  const [registeredAfter, setRegisteredAfter] = useState('');

  const fetchCustomers = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const params = new URLSearchParams();
      if (search.trim()) params.set('search', search.trim());
      if (segment !== 'all-segments') params.set('segment', segment);
      if (club !== 'all-clubs') params.set('club', club);
      if (registeredAfter) params.set('registeredAfter', registeredAfter);

      const response = await fetch(`/api/admin/customers?${params.toString()}`);
      const data = (await response.json().catch(() => null)) as
        | { customers?: CustomerRow[]; clubs?: string[]; error?: string }
        | null;

      if (!response.ok) {
        setCustomers([]);
        setClubs([]);
        setError(data?.error || 'Failed to load customers.');
        return;
      }

      setCustomers(data?.customers ?? []);
      setClubs(data?.clubs ?? []);
    } catch {
      setCustomers([]);
      setClubs([]);
      setError('Failed to load customers.');
    } finally {
      setLoading(false);
    }
  }, [search, segment, club, registeredAfter]);

  useEffect(() => {
    fetchCustomers();
  }, [fetchCustomers]);

  const tableRows = useMemo(
    () =>
      customers.map((customer) => ({
        id: customer.id,
        name: customer.name,
        email: customer.email,
        orders: customer.orders,
        totalSpent: `GBP ${customer.totalSpent.toFixed(2)}`,
        registered: customer.registered,
        lastOrder: customer.lastOrder,
        club: customer.club,
      })),
    [customers]
  );

  const exportCsv = () => {
    if (tableRows.length === 0) return;

    const headers = ['id', 'name', 'email', 'orders', 'totalSpent', 'registered', 'lastOrder', 'club'];
    const lines = [headers.join(',')];

    for (const row of tableRows) {
      const values = headers.map((header) => {
        const cell = String(row[header as keyof typeof row] ?? '');
        return `"${cell.replace(/"/g, '""')}"`;
      });
      lines.push(values.join(','));
    }

    const csv = lines.join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `customers-${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Customers"
        description="Review customer profiles, order history, lifecycle segments, and retention actions."
      />

      <section className="grid grid-cols-1 gap-4 rounded-2xl border border-border bg-surface p-5 md:grid-cols-5">
        <input
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          className="rounded-xl border border-border px-4 py-2.5 text-sm"
          placeholder="Name or email"
        />
        <select
          className="rounded-xl border border-border px-4 py-2.5 text-sm"
          value={segment}
          onChange={(event) => setSegment(event.target.value)}
        >
          <option value="all-segments">All segments</option>
          <option value="vip">VIP</option>
          <option value="new">New</option>
          <option value="repeat">Repeat buyers</option>
          <option value="at-risk">At risk</option>
        </select>
        <select
          className="rounded-xl border border-border px-4 py-2.5 text-sm"
          value={club}
          onChange={(event) => setClub(event.target.value)}
        >
          <option value="all-clubs">All clubs</option>
          {clubs.map((clubValue) => (
            <option key={clubValue} value={clubValue}>
              {clubValue}
            </option>
          ))}
        </select>
        <input
          type="date"
          value={registeredAfter}
          onChange={(event) => setRegisteredAfter(event.target.value)}
          className="rounded-xl border border-border px-4 py-2.5 text-sm"
        />
        <button
          type="button"
          onClick={exportCsv}
          className="rounded-xl border border-border bg-surface-alt px-4 py-2.5 text-sm font-semibold hover:bg-border-light"
        >
          Export CSV
        </button>
      </section>

      {error ? (
        <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>
      ) : null}

      {loading ? (
        <div className="flex items-center justify-center rounded-2xl border border-border bg-surface py-20">
          <Loader2 className="h-7 w-7 animate-spin text-accent" />
        </div>
      ) : (
        <AdminTable
          title="Customer Directory"
          columns={['id', 'name', 'email', 'orders', 'totalSpent', 'registered', 'lastOrder', 'club']}
          rows={tableRows}
        />
      )}
    </div>
  );
}
