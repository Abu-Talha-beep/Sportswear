import { Metadata } from 'next';
export const dynamic = 'force-dynamic';
import { getAllProductsAsync } from '@/lib/data/products';
import { ProductGrid } from '@/components/shop/ProductGrid';
import Link from 'next/link';

export const metadata: Metadata = { title: 'The Pride Collection', description: 'Celebrate inclusivity with our vibrant Pride Collection sportswear.' };

export default async function PrideCollectionPage() {
  const prideProducts = (await getAllProductsAsync()).filter((p) => p.category_slug === 'the-pride-collection' || p.name.toLowerCase().includes('pride'));
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
      <nav className="text-sm text-muted mb-6">
        <Link href="/" className="hover:text-accent">Home</Link><span className="mx-2">/</span>
        <Link href="/store" className="hover:text-accent">Shop</Link><span className="mx-2">/</span>
        <span className="text-foreground font-medium">The Pride Collection</span>
      </nav>
      <div className="relative rounded-2xl overflow-hidden p-8 sm:p-12 mb-10" style={{ background: 'linear-gradient(135deg, #e63946, #f4a261, #e9c46a, #2a9d8f, #264653, #7b2cbf)' }}>
        <h1 className="font-[var(--font-heading)] text-4xl md:text-6xl font-bold text-white uppercase relative z-10">The Pride Collection</h1>
        <p className="text-white/90 mt-3 max-w-lg relative z-10">Celebrate who you are. Sport is for everyone. 🏳️‍🌈</p>
        <div className="absolute right-6 bottom-0 text-[150px] opacity-10 select-none">🌈</div>
      </div>
      <ProductGrid products={prideProducts} />
    </div>
  );
}
