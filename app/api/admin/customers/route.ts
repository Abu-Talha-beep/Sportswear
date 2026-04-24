import { NextRequest, NextResponse } from 'next/server';
import { getAdminSession } from '@/lib/admin/session';
import { dbGetCustomerOrderRows } from '@/lib/supabase/db';

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

interface CustomerAggregate {
  id: string;
  name: string;
  email: string;
  orders: number;
  totalSpent: number;
  firstOrderDate: string;
  lastOrderDate: string;
  club: string;
}

function unauthorized() {
  return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
}

function formatDate(value: string) {
  return new Date(value).toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
}

function getClubLabel(shippingAddress: unknown): string {
  if (!shippingAddress || typeof shippingAddress !== 'object') {
    return 'Independent';
  }

  const record = shippingAddress as Record<string, unknown>;
  const clubValue = record.club_name ?? record.club ?? record.clubSlug;
  if (typeof clubValue === 'string' && clubValue.trim()) {
    return clubValue.trim();
  }

  return 'Independent';
}

function getSegment(orderCount: number, lastOrderIso: string): CustomerRow['segment'] {
  const lastOrderMs = new Date(lastOrderIso).getTime();
  const daysSinceLastOrder = Math.max(0, (Date.now() - lastOrderMs) / (1000 * 60 * 60 * 24));

  if (orderCount >= 10) return 'vip';
  if (orderCount >= 2) {
    return daysSinceLastOrder > 120 ? 'at-risk' : 'repeat';
  }
  return daysSinceLastOrder > 120 ? 'at-risk' : 'new';
}

export async function GET(req: NextRequest) {
  const session = await getAdminSession();
  if (!session) return unauthorized();

  try {
    const url = new URL(req.url);
    const search = (url.searchParams.get('search') || '').trim().toLowerCase();
    const segmentFilter = (url.searchParams.get('segment') || '').trim().toLowerCase();
    const clubFilter = (url.searchParams.get('club') || '').trim().toLowerCase();
    const registeredAfter = (url.searchParams.get('registeredAfter') || '').trim();

    const orders = await dbGetCustomerOrderRows();

    const aggregated = new Map<string, CustomerAggregate>();

    for (const order of orders) {
      const email = String(order.customer_email || '').trim().toLowerCase();
      if (!email) continue;

      const createdAt = String(order.created_at || '');
      if (!createdAt) continue;

      const clubLabel = getClubLabel(order.shipping_address);
      const numericTotal = Number(order.total || 0);

      const existing = aggregated.get(email);
      if (!existing) {
        aggregated.set(email, {
          id: String(order.id),
          name: String(order.customer_name || 'Customer'),
          email,
          orders: 1,
          totalSpent: Number.isFinite(numericTotal) ? numericTotal : 0,
          firstOrderDate: createdAt,
          lastOrderDate: createdAt,
          club: clubLabel,
        });
        continue;
      }

      existing.orders += 1;
      existing.totalSpent += Number.isFinite(numericTotal) ? numericTotal : 0;

      if (new Date(createdAt).getTime() < new Date(existing.firstOrderDate).getTime()) {
        existing.firstOrderDate = createdAt;
      }
      if (new Date(createdAt).getTime() > new Date(existing.lastOrderDate).getTime()) {
        existing.lastOrderDate = createdAt;
      }

      if (existing.club === 'Independent' && clubLabel !== 'Independent') {
        existing.club = clubLabel;
      }
    }

    let customerAggregates = Array.from(aggregated.values());

    if (registeredAfter) {
      const threshold = new Date(registeredAfter).getTime();
      if (Number.isFinite(threshold)) {
        customerAggregates = customerAggregates.filter(
          (c) => new Date(c.firstOrderDate).getTime() >= threshold
        );
      }
    }

    let customers: CustomerRow[] = customerAggregates.map((row) => {
      const segment = getSegment(row.orders, row.lastOrderDate);
      return {
        id: row.id,
        name: row.name,
        email: row.email,
        orders: row.orders,
        totalSpent: Number(row.totalSpent.toFixed(2)),
        registered: formatDate(row.firstOrderDate),
        lastOrder: formatDate(row.lastOrderDate),
        club: row.club,
        segment,
      };
    });

    if (search) {
      customers = customers.filter(
        (c) => c.name.toLowerCase().includes(search) || c.email.toLowerCase().includes(search)
      );
    }

    if (segmentFilter && segmentFilter !== 'all-segments') {
      customers = customers.filter((c) => c.segment === segmentFilter);
    }

    if (clubFilter && clubFilter !== 'all-clubs') {
      customers = customers.filter((c) => c.club.toLowerCase() === clubFilter);
    }

    customers.sort((a, b) => b.orders - a.orders || b.totalSpent - a.totalSpent);

    const clubs = Array.from(new Set(customers.map((c) => c.club))).sort((a, b) =>
      a.localeCompare(b)
    );

    return NextResponse.json({ customers, clubs });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
