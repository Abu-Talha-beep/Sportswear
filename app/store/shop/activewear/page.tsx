import { Metadata } from 'next';
export const dynamic = 'force-dynamic';
import { getProductsByCategoryAsync } from '@/lib/data/products';
import { ProductGrid } from '@/components/shop/ProductGrid';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Activewear',
  description: 'High-performance activewear for training and match days. Training tees, compression shorts, jerseys and more.',
};

export default async function ActivewearPage() {
  const activewearProducts = (await getProductsByCategoryAsync('activewear')).filter((p) => !p.clubSlug);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
      {/* Breadcrumb */}
      <nav className="text-sm text-muted mb-6">
        <Link href="/" className="hover:text-accent">Home</Link>
        <span className="mx-2">/</span>
        <Link href="/store" className="hover:text-accent">Shop</Link>
        <span className="mx-2">/</span>
        <span className="text-foreground font-medium">Activewear</span>
      </nav>

      {/* Hero */}
      <div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-accent to-primary p-8 sm:p-12 mb-10">
        <div className="relative z-10">
          <h1 className="font-[var(--font-heading)] text-4xl md:text-6xl font-bold text-white uppercase">
            Activewear
          </h1>
          <p className="text-white/80 mt-3 max-w-lg">
            Performance-driven training and match wear. Built to move, designed to win.
          </p>
        </div>
        <div className="absolute right-6 bottom-0 text-[150px] opacity-10 select-none">⚡</div>
      </div>

      <ProductGrid products={activewearProducts} />
    </div>
  );
}
