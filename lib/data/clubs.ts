// ═══════════════════════════════════════════
// CLUBS DATA — Fetches from Supabase, with
// hardcoded mock fallback for dev/preview
// ═══════════════════════════════════════════

import { Club } from '@/types';

// ─── SUPABASE FETCH HELPERS ───

async function fetchClubsFromDB(filters?: { sport?: string }): Promise<Club[] | null> {
  try {
    // Dynamic import to avoid pulling server-only code into client bundles
    const { isSupabaseConfigured, getSupabaseAdminClient } = await import('@/lib/supabase/server');
    if (!isSupabaseConfigured()) return null;

    const sb = getSupabaseAdminClient();
    let query = sb
      .from('clubs')
      .select('*')
      .eq('is_active', true)
      .order('sort_order', { ascending: true });

    if (filters?.sport) query = query.eq('sport', filters.sport);

    const { data, error } = await query;
    if (error || !data) return null;

    // Map DB columns → front-end Club type
    return data.map((row) => ({
      slug: row.slug,
      name: row.name,
      sport: row.sport,
      logoUrl: row.logo_url || '',
      href: `/store/clubs/${row.slug}`,
      description: row.description || '',
      featured: row.is_featured ?? false,
    }));
  } catch {
    return null;
  }
}

async function fetchClubBySlugFromDB(slug: string): Promise<Club | null> {
  try {
    const { isSupabaseConfigured, getSupabaseAdminClient } = await import('@/lib/supabase/server');
    if (!isSupabaseConfigured()) return null;

    const sb = getSupabaseAdminClient();
    const { data, error } = await sb
      .from('clubs')
      .select('*')
      .eq('slug', slug)
      .maybeSingle();

    if (error || !data) return null;

    return {
      slug: data.slug,
      name: data.name,
      sport: data.sport,
      logoUrl: data.logo_url || '',
      href: `/store/clubs/${data.slug}`,
      description: data.description || '',
      featured: data.is_featured ?? false,
    };
  } catch {
    return null;
  }
}

// ─── ASYNC PUBLIC API (used by server components) ───

/** Get clubs by sport — fetches from Supabase, falls back to mock */
export async function getClubsBySportAsync(sport: string): Promise<Club[]> {
  const dbClubs = await fetchClubsFromDB({ sport });
  if (dbClubs !== null) return dbClubs;
  // Fallback to mock
  return clubs.filter((c) => c.sport === sport);
}

/** Get club by slug — fetches from Supabase, falls back to mock */
export async function getClubBySlugAsync(slug: string): Promise<Club | undefined> {
  const dbClub = await fetchClubBySlugFromDB(slug);
  if (dbClub) return dbClub;
  // Fallback to mock
  return clubs.find((c) => c.slug === slug);
}

/** Get all unique sports — fetches from Supabase, falls back to mock */
export async function getAllSportsAsync(): Promise<string[]> {
  const dbClubs = await fetchClubsFromDB();
  if (dbClubs !== null) return [...new Set(dbClubs.map((c) => c.sport))];
  return [...new Set(clubs.map((c) => c.sport))];
}

/** Get featured clubs — fetches from Supabase, falls back to mock */
export async function getFeaturedClubsAsync(): Promise<Club[]> {
  const dbClubs = await fetchClubsFromDB();
  if (dbClubs !== null) return dbClubs.filter((c) => c.featured);
  return clubs.filter((c) => c.featured);
}

/** Get all clubs — fetches from Supabase, falls back to mock */
export async function getAllClubsAsync(): Promise<Club[]> {
  const dbClubs = await fetchClubsFromDB();
  if (dbClubs !== null) return dbClubs;
  return clubs;
}

// ─── SYNC HELPERS (kept for backward compat / client components) ───

/** @deprecated Use getClubsBySportAsync in server components */
export function getClubsBySport(sport: string): Club[] {
  return clubs.filter((c) => c.sport === sport);
}

/** @deprecated Use getClubBySlugAsync in server components */
export function getClubBySlug(slug: string): Club | undefined {
  return clubs.find((c) => c.slug === slug);
}

/** @deprecated Use getAllSportsAsync in server components */
export function getAllSports(): string[] {
  return [...new Set(clubs.map((c) => c.sport))];
}

/** @deprecated Use getFeaturedClubsAsync in server components */
export function getFeaturedClubs(): Club[] {
  return clubs.filter((c) => c.featured);
}

// ─── MOCK DATA (fallback when Supabase is not configured) ───

export const clubs: Club[] = [
  // ── RUGBY CLUBS ──
  {
    slug: 'dorking-rfc',
    name: 'Dorking RFC',
    sport: 'rugby',
    logoUrl: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=200&h=200&fit=crop&q=80',
    href: '/store/clubs/dorking-rfc',
    description: 'Dorking Rugby Football Club — proudly serving the community since 1921.',
    featured: true,
  },
  {
    slug: 'piggy-smalls-rfc',
    name: 'Piggy Smalls RFC',
    sport: 'rugby',
    logoUrl: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=200&h=200&fit=crop&q=80',
    href: '/store/clubs/piggy-smalls-rfc',
    description: 'Piggy Smalls RFC — the UK\'s most entertaining rugby team name.',
  },
  {
    slug: 'woodrush-rfc',
    name: 'Woodrush RFC',
    sport: 'rugby',
    logoUrl: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=200&h=200&fit=crop&q=80',
    href: '/store/clubs/woodrush-rfc',
    description: 'Woodrush RFC — Birmingham\'s finest community rugby club.',
  },
  {
    slug: 'earlsdon-rfc',
    name: 'Earlsdon RFC',
    sport: 'rugby',
    logoUrl: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=200&h=200&fit=crop&q=80',
    href: '/store/clubs/earlsdon-rfc',
    description: 'Earlsdon RFC — Coventry\'s community rugby club.',
  },
  {
    slug: 'stroud-rfc',
    name: 'Stroud RFC',
    sport: 'rugby',
    logoUrl: 'https://images.unsplash.com/photo-1517466787929-bc90951d0974?w=200&h=200&fit=crop&q=80',
    href: '/store/clubs/stroud-rfc',
    description: 'Stroud RFC — established in the heart of Gloucestershire.',
  },

  // ── FOOTBALL CLUBS ──
  {
    slug: 'bosham-fc',
    name: 'Bosham FC',
    sport: 'football',
    logoUrl: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=200&h=200&fit=crop&q=80',
    href: '/store/clubs/bosham-fc',
    description: 'Bosham Football Club — West Sussex grassroots football at its best.',
    featured: true,
  },
  {
    slug: 'wab-fc',
    name: 'WAB FC',
    sport: 'football',
    logoUrl: 'https://images.unsplash.com/photo-1580087256394-dc596e1c8f4f?w=200&h=200&fit=crop&q=80',
    href: '/store/clubs/wab-fc',
    description: 'WAB FC — local football excellence.',
  },
  {
    slug: 'crawley-wasps',
    name: 'Crawley Wasps FC',
    sport: 'football',
    logoUrl: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=200&h=200&fit=crop&q=80',
    href: '/store/clubs/crawley-wasps',
    description: 'Crawley Wasps — women\'s football trailblazers.',
  },

  // ── SOFTBALL TEAMS ──
  {
    slug: 'hurricanes-softball',
    name: 'Hurricanes',
    sport: 'softball',
    logoUrl: 'https://images.unsplash.com/photo-1541746972996-4e0b0f43e02a?w=200&h=200&fit=crop&q=80',
    href: '/store/clubs/hurricanes-softball',
    description: 'Hurricanes Softball — bringing the storm to every game.',
  },
  {
    slug: 'tigers-softball',
    name: 'Tigers',
    sport: 'softball',
    logoUrl: 'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=200&h=200&fit=crop&q=80',
    href: '/store/clubs/tigers-softball',
    description: 'Tigers Softball — fierce competitors.',
  },

  // ── KORFBALL ──
  {
    slug: 'birmingham-panthers',
    name: 'Birmingham Panthers',
    sport: 'korfball',
    logoUrl: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=200&h=200&fit=crop&q=80',
    href: '/store/clubs/birmingham-panthers',
    description: 'Birmingham Panthers Korfball Club — mixed team excellence.',
    featured: true,
  },

  // ── NETBALL ──
  {
    slug: 'surrey-storm-netball',
    name: 'Surrey Storm Netball',
    sport: 'netball',
    logoUrl: 'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=200&h=200&fit=crop&q=80',
    href: '/store/clubs/surrey-storm-netball',
    description: 'Surrey Storm Netball — inspiring the next generation.',
  },

  // ── PADEL ──
  {
    slug: 'london-padel-club',
    name: 'London Padel Club',
    sport: 'padel',
    logoUrl: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=200&h=200&fit=crop&q=80',
    href: '/store/clubs/london-padel-club',
    description: 'London Padel Club — the fastest growing racket sport.',
  },

  // ── HORSEBALL ──
  {
    slug: 'uk-horseball',
    name: 'UK Horseball Association',
    sport: 'horseball',
    logoUrl: 'https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?w=200&h=200&fit=crop&q=80',
    href: '/store/clubs/uk-horseball',
    description: 'UK Horseball — equestrian sport excellence.',
  },

  // ── DARTS ──
  {
    slug: 'arrows-darts-team',
    name: 'Arrows Darts Team',
    sport: 'darts',
    logoUrl: 'https://images.unsplash.com/photo-1504257432389-52343af06ae3?w=200&h=200&fit=crop&q=80',
    href: '/store/clubs/arrows-darts-team',
    description: 'Arrows Darts Team — hitting the treble 20 every time.',
  },

  // ── CHARITIES ──
  {
    slug: 'sport-for-change',
    name: 'Sport for Change',
    sport: 'charities',
    logoUrl: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=200&h=200&fit=crop&q=80',
    href: '/store/clubs/sport-for-change',
    description: 'Sport for Change — using sport to transform communities.',
  },
];
