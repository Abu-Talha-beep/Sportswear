import { NextResponse } from 'next/server';
export const dynamic = 'force-dynamic';
import { dbGetCategories, dbGetClubs } from '@/lib/supabase/db';

export async function GET() {
  try {
    const categoriesData = await dbGetCategories();
    const clubsData = await dbGetClubs();

    // Group sports
    const sportsSet = new Set(clubsData.map(c => c.sport));
    const sportsList = Array.from(sportsSet).sort();

    const mainNavigation = [
      { label: 'Home', href: '/' },
      {
        label: 'Club Shops',
        href: '/store/clubs',
        children: sportsList.map(sport => ({
          label: sport.charAt(0).toUpperCase() + sport.slice(1),
          href: `/store/clubs/${sport}`
        }))
      },
      {
        label: 'Shop',
        href: '/store',
        children: categoriesData.map(cat => ({
          label: cat.name,
          href: `/store/shop/${cat.slug}`
        }))
      },
      { label: 'About', href: '/about' },
    ];

    return NextResponse.json({ navigation: mainNavigation });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
