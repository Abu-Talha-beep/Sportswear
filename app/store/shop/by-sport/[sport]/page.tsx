import { Metadata } from 'next';
import { getProductsBySportAsync } from '@/lib/data/products';
import { ProductGrid } from '@/components/shop/ProductGrid';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export const dynamic = 'force-dynamic';

const SPORTS_MAP: Record<string, { name: string; emoji: string; description: string }> = {
  rugby: {
    name: 'Rugby',
    emoji: '🏉',
    description: 'Premium rugby gear designed for performance on the field.',
  },
  football: {
    name: 'Football',
    emoji: '⚽',
    description: 'Professional football equipment and apparel.',
  },
  netball: {
    name: 'Netball',
    emoji: '🏀',
    description: 'High-quality netball uniforms and gear.',
  },
  softball: {
    name: 'Softball',
    emoji: '🥎',
    description: 'Premium softball equipment and apparel.',
  },
  korfball: {
    name: 'Korfball',
    emoji: '🎯',
    description: 'Specialized korfball gear and uniforms.',
  },
  padel: {
    name: 'Padel',
    emoji: '🎾',
    description: 'Professional padel equipment and wear.',
  },
  cricket: {
    name: 'Cricket',
    emoji: '🏏',
    description: 'High-performance cricket gear.',
  },
  darts: {
    name: 'Darts',
    emoji: '🎱',
    description: 'Darts merchandise and accessories.',
  },
};

export async function generateMetadata({
  params,
}: {
  params: { sport: string };
}): Promise<Metadata> {
  const sport = SPORTS_MAP[params.sport];
  if (!sport) return {};

  return {
    title: `${sport.name} Gear & Equipment`,
    description: sport.description,
  };
}

export default async function SportProductPage({
  params,
}: {
  params: { sport: string };
}) {
  const sport = SPORTS_MAP[params.sport];

  if (!sport) {
    notFound();
  }

  const products = (await getProductsBySportAsync(params.sport)).filter(
    (p) => !p.clubSlug || params.sport.includes(p.clubSlug)
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
      {/* Breadcrumb */}
      <nav className="text-sm text-muted mb-6">
        <Link href="/" className="hover:text-accent">
          Home
        </Link>
        <span className="mx-2">/</span>
        <Link href="/store" className="hover:text-accent">
          Shop
        </Link>
        <span className="mx-2">/</span>
        <Link href="/store/shop/by-sport" className="hover:text-accent">
          By Sport
        </Link>
        <span className="mx-2">/</span>
        <span className="text-foreground font-medium">{sport.name}</span>
      </nav>

      {/* Hero */}
      <div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600 p-8 sm:p-12 mb-10">
        <div className="relative z-10">
          <div className="text-6xl mb-3">{sport.emoji}</div>
          <h1 className="font-[var(--font-heading)] text-4xl md:text-6xl font-bold text-white uppercase">
            {sport.name}
          </h1>
          <p className="text-white/80 mt-3 max-w-lg">{sport.description}</p>
        </div>
        <div className="absolute right-6 bottom-0 text-[150px] opacity-10 select-none">
          {sport.emoji}
        </div>
      </div>

      {/* Products */}
      {products.length > 0 ? (
        <ProductGrid products={products} />
      ) : (
        <div className="text-center py-12">
          <p className="text-muted text-lg mb-4">
            No products available for {sport.name} yet.
          </p>
          <p className="text-muted mb-6">
            Check back soon for new {sport.name} gear!
          </p>
          <Link
            href="/store/shop/by-sport"
            className="inline-block px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
          >
            Browse Other Sports
          </Link>
        </div>
      )}
    </div>
  );
}
