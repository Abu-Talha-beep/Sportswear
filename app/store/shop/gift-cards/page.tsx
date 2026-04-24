import { Metadata } from 'next';
export const dynamic = 'force-dynamic';
import { getProductsByCategoryAsync } from '@/lib/data/products';
import { ProductGrid } from '@/components/shop/ProductGrid';
import Link from 'next/link';

export const metadata: Metadata = { title: 'Gift Cards', description: 'Give the gift of sports kit with Your Club Stash digital gift cards.' };

export default async function GiftCardsPage() {
  const products = await getProductsByCategoryAsync('gift-cards');
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
      <nav className="text-sm text-muted mb-6">
        <Link href="/" className="hover:text-accent">Home</Link><span className="mx-2">/</span>
        <Link href="/store" className="hover:text-accent">Shop</Link><span className="mx-2">/</span>
        <span className="text-foreground font-medium">Gift Cards</span>
      </nav>
      <div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-accent to-pink-600 p-8 sm:p-12 mb-10">
        <h1 className="font-[var(--font-heading)] text-4xl md:text-6xl font-bold text-white uppercase relative z-10">Gift Cards</h1>
        <p className="text-white/80 mt-3 max-w-lg relative z-10">The perfect gift for any sports enthusiast. Available in multiple denominations.</p>
        <div className="absolute right-6 bottom-0 text-[150px] opacity-10 select-none">🎁</div>
      </div>
      <ProductGrid products={products} columns={3} />
    </div>
  );
}
