export interface SportRoute {
  label: string;
  href: string;
}

// Only include routes that actually exist as dedicated sport pages.
const STATIC_SPORT_ROUTES: Record<string, SportRoute> = {
  rugby: { label: 'Rugby Clubs', href: '/store/clubs/rugbyclubs' },
  football: { label: 'Football Clubs', href: '/store/clubs/footballclubs' },
  softball: { label: 'Softball Teams', href: '/store/clubs/softball-teams' },
  korfball: { label: 'Korfball', href: '/store/clubs/korfball' },
  netball: { label: 'Netball', href: '/store/clubs/netball' },
  padel: { label: 'Padel', href: '/store/clubs/padel' },
  horseball: { label: 'Horseball', href: '/store/clubs/horseball' },
  darts: { label: 'Darts Teams', href: '/store/clubs/dartsteams' },
  charities: { label: 'Charities', href: '/store/clubs/charities' },
};

export function normalizeSportKey(value: string): string {
  return value.trim().toLowerCase();
}

export function toSportLabel(value: string): string {
  return value
    .trim()
    .replace(/[-_]+/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

export function getSportRoute(
  sport: string,
  fallbackHref: string
): SportRoute {
  const key = normalizeSportKey(sport);
  const mapped = STATIC_SPORT_ROUTES[key];

  if (mapped) {
    return mapped;
  }

  return {
    label: toSportLabel(sport),
    href: fallbackHref,
  };
}
