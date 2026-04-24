import { Metadata } from 'next';
export const dynamic = 'force-dynamic';
import Link from 'next/link';
import Image from 'next/image';
import { getAllSportsAsync, getClubsBySportAsync } from '@/lib/data/clubs';

export const metadata: Metadata = {
  title: 'Club Shops',
  description: 'Browse all club shops. Find your club and shop their official range of kit and leisurewear.',
};

const sportLabels: Record<string, string> = {
  rugby: 'Rugby Clubs',
  football: 'Football Clubs',
  softball: 'Softball Teams',
  korfball: 'Korfball',
  netball: 'Netball',
  padel: 'Padel',
  horseball: 'Horseball',
  darts: 'Darts Teams',
  charities: 'Charities',
  cricket: 'Cricket',
  corporatestash: 'Corporate Stash',
  yourtradestash: 'Your Trade Stash',
  other: 'Other',
};

export default async function ClubsPage() {
  const sports = await getAllSportsAsync();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
      <nav className="text-sm text-muted mb-6">
        <Link href="/" className="hover:text-accent">Home</Link>
        <span className="mx-2">/</span>
        <span className="text-foreground font-medium">Club Shops</span>
      </nav>

      <div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-primary to-accent p-8 sm:p-12 mb-12">
        <h1 className="font-[var(--font-heading)] text-4xl md:text-6xl font-bold text-white uppercase relative z-10">
          Club Shops
        </h1>
        <p className="text-white/80 mt-3 max-w-lg relative z-10">
          Find your club and shop their official range. We supply teams across the UK.
        </p>
        <div className="absolute right-6 bottom-0 text-[150px] opacity-10 select-none">🏆</div>
      </div>

      {await Promise.all(sports.map(async (sport) => {
        const sportClubs = await getClubsBySportAsync(sport);
        return (
          <section key={sport} className="mb-12">
            <h2 className="font-[var(--font-heading)] text-2xl font-bold text-primary uppercase mb-6 border-b-2 border-accent pb-3 inline-block">
              {sportLabels[sport] || sport}
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              {sportClubs.map((club) => (
                <Link
                  key={club.slug}
                  href={club.href}
                  className="group bg-surface rounded-2xl p-4 border-2 border-transparent hover:border-accent hover:shadow-lg transition-all duration-300 text-center"
                >
                  <div className="relative w-full aspect-square rounded-xl overflow-hidden bg-surface-alt mb-3">
                    {club.logoUrl ? (
                      <Image
                        src={club.logoUrl}
                        alt={club.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        sizes="150px"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-3xl text-muted">🏅</div>
                    )}
                  </div>
                  <p className="text-xs font-semibold text-foreground group-hover:text-accent transition-colors truncate">
                    {club.name}
                  </p>
                </Link>
              ))}
            </div>
          </section>
        );
      }))}
    </div>
  );
}
