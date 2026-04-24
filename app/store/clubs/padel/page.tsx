import { Metadata } from 'next';
export const dynamic = 'force-dynamic';
import Link from 'next/link';
import Image from 'next/image';
import { getClubsBySportAsync } from '@/lib/data/clubs';

export const metadata: Metadata = { title: 'Padel Clubs', description: 'Kit and equipment for padel clubs.' };

export default async function PadelPage() {
  const teams = await getClubsBySportAsync('padel');
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
      <nav className="text-sm text-muted mb-6">
        <Link href="/" className="hover:text-accent">Home</Link><span className="mx-2">/</span>
        <Link href="/store/clubs" className="hover:text-accent">Club Shops</Link><span className="mx-2">/</span>
        <span className="text-foreground font-medium">Padel</span>
      </nav>
      <div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-teal-700 to-primary p-8 sm:p-12 mb-10">
        <h1 className="font-[var(--font-heading)] text-4xl md:text-6xl font-bold text-white uppercase relative z-10">Padel</h1>
        <p className="text-white/80 mt-3 relative z-10">The UK&apos;s fastest growing racket sport. Kit up properly.</p>
        <div className="absolute right-6 bottom-0 text-[150px] opacity-10 select-none">🎾</div>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {teams.map((club) => (
          <Link key={club.slug} href={club.href} className="group bg-surface rounded-2xl p-4 border-2 border-transparent hover:border-accent hover:shadow-lg transition-all text-center">
            <div className="relative w-full aspect-square rounded-xl overflow-hidden bg-surface-alt mb-3">
              {club.logoUrl ? (
                <Image src={club.logoUrl} alt={club.name} fill className="object-cover group-hover:scale-105 transition-transform" sizes="150px" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-3xl text-muted">🏅</div>
              )}
            </div>
            <p className="text-xs font-semibold text-foreground group-hover:text-accent transition-colors">{club.name}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
