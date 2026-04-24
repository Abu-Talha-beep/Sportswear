import { NextResponse } from 'next/server';
export const dynamic = 'force-dynamic';
import { dbGetCategories, dbGetClubs } from '@/lib/supabase/db';
import { getSportRoute, normalizeSportKey } from '@/lib/data/clubSportRoutes';

const SPORT_PRIORITY: string[] = [
  'rugby',
  'football',
  'softball',
  'korfball',
  'netball',
  'padel',
  'horseball',
  'darts',
  'charities',
  'cricket',
  'corporatestash',
  'yourtradestash',
  'other',
];

function getSportPriorityIndex(sportKey: string): number {
  const index = SPORT_PRIORITY.indexOf(sportKey);
  return index === -1 ? Number.MAX_SAFE_INTEGER : index;
}

export async function GET() {
  try {
    const categoriesData = await dbGetCategories();
    const clubsData = await dbGetClubs();

    // Group sports while keeping a fallback link to the first club in each sport.
    const sportsMap = new Map<string, { sport: string; fallbackHref: string; firstSortOrder: number }>();
    for (const club of clubsData) {
      const sport = String(club.sport || '').trim();
      if (!sport) continue;

      const sportKey = normalizeSportKey(sport);
      if (!sportsMap.has(sportKey)) {
        sportsMap.set(sportKey, {
          sport,
          fallbackHref: `/store/clubs/${club.slug}`,
          firstSortOrder: Number(club.sort_order ?? Number.MAX_SAFE_INTEGER),
        });
      }
    }

    const clubShopChildren = Array.from(sportsMap.entries())
      .sort(([sportKeyA, valueA], [sportKeyB, valueB]) => {
        const priorityDiff = getSportPriorityIndex(sportKeyA) - getSportPriorityIndex(sportKeyB);
        if (priorityDiff !== 0) return priorityDiff;

        const sortDiff = valueA.firstSortOrder - valueB.firstSortOrder;
        if (sortDiff !== 0) return sortDiff;

        return valueA.sport.localeCompare(valueB.sport);
      })
      .map(([, { sport, fallbackHref }]) => {
        const route = getSportRoute(sport, fallbackHref);
        return {
          label: route.label,
          href: route.href,
        };
      });

    const mainNavigation = [
      { label: 'Home', href: '/' },
      {
        label: 'Club Shops',
        href: '/store/clubs',
        children: clubShopChildren
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
