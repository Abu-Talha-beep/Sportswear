import { Metadata } from 'next';
export const dynamic = 'force-dynamic';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { getClubBySlugAsync } from '@/lib/data/clubs';
import { getProductsByClubAsync, getAllProductsAsync as allProducts } from '@/lib/data/products';
import { ProductGrid } from '@/components/shop/ProductGrid';

export async function generateMetadata({ params }: { params: Promise<{ clubSlug: string }> }): Promise<Metadata> {
  const { clubSlug } = await params;
  const club = await getClubBySlugAsync(clubSlug);
  if (!club) return { title: 'Club Not Found' };
  return {
    title: `${club.name} Shop`,
    description: club.description || `Shop the official ${club.name} range at Your Club Stash.`,
  };
}

const sportLabels: Record<string, { label: string; href: string }> = {
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

export default async function ClubShopPage({ params }: { params: Promise<{ clubSlug: string }> }) {
  const { clubSlug } = await params;
  const club = await getClubBySlugAsync(clubSlug);
  if (!club) notFound();

  const clubProducts = await getProductsByClubAsync(clubSlug);
  const sportInfo = sportLabels[club.sport] || { label: club.sport, href: '/store/clubs' };

  // If no specific club products, show some general products as demo
  const displayProducts = clubProducts.length > 0 ? clubProducts : (await allProducts()).filter((p) => !p.clubSlug).slice(0, 8);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
      {/* Breadcrumb */}
      <nav className="text-sm text-muted mb-6">
        <Link href="/" className="hover:text-accent">Home</Link>
        <span className="mx-2">/</span>
        <Link href="/store/clubs" className="hover:text-accent">Club Shops</Link>
        <span className="mx-2">/</span>
        <Link href={sportInfo.href} className="hover:text-accent">{sportInfo.label}</Link>
        <span className="mx-2">/</span>
        <span className="text-foreground font-medium">{club.name}</span>
      </nav>

      {/* Club Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mb-10 p-6 sm:p-8 bg-surface rounded-2xl border border-border-light">
        <div className="relative w-24 h-24 sm:w-32 sm:h-32 rounded-2xl overflow-hidden bg-surface-alt flex-shrink-0 border-2 border-border">
          {club.logoUrl ? (
            <Image
              src={club.logoUrl}
              alt={club.name}
              fill
              className="object-cover"
              sizes="128px"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-4xl text-muted">🏅</div>
          )}
        </div>
        <div>
          <h1 className="font-[var(--font-heading)] text-3xl md:text-5xl font-bold text-primary uppercase">
            {club.name}
          </h1>
          <p className="text-muted mt-2 max-w-xl">{club.description}</p>
          <span className="inline-block mt-3 px-4 py-1.5 bg-accent/10 text-accent text-xs font-bold uppercase rounded-full">
            {sportInfo.label}
          </span>
        </div>
      </div>

      {/* Products */}
      <h2 className="font-[var(--font-heading)] text-2xl font-bold text-primary uppercase mb-6">
        {clubProducts.length > 0 ? 'Official Range' : 'Recommended Products'}
      </h2>
      <ProductGrid products={displayProducts} />
    </div>
  );
}
