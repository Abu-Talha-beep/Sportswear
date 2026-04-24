import { NextRequest, NextResponse } from 'next/server';
export const dynamic = 'force-dynamic';
import { getAllClubsAsync, getClubsBySportAsync } from '@/lib/data/clubs';

/**
 * Public API for fetching clubs on the storefront.
 * No auth required — returns only active clubs.
 */
export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const sport = url.searchParams.get('sport') || undefined;

    const clubs = sport
      ? await getClubsBySportAsync(sport)
      : await getAllClubsAsync();

    return NextResponse.json({ clubs });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
