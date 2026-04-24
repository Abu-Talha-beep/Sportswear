import { Metadata } from 'next';
export const dynamic = 'force-dynamic';
import { getProductsByCategoryAsync } from '@/lib/data/products';
import { ProductGrid } from '@/components/shop/ProductGrid';
import Link from 'next/link';

export const metadata: Metadata = { title: 'Fashionwear', description: 'Stylish sports fashion including the Pride Collection.' };

export default async function FashionwearPage() {
  const products = await getProductsByCategoryAsync('fashionwear');
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
      <nav className="text-sm text-muted mb-6">
        <Link href="/" className="hover:text-accent">Home</Link><span className="mx-2">/</span>
        <Link href="/store" className="hover:text-accent">Shop</Link><span className="mx-2">/</span>
        <span className="text-foreground font-medium">Fashionwear</span>
      </nav>
      <div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-purple-700 to-primary p-8 sm:p-12 mb-10">
        <h1 className="font-[var(--font-heading)] text-4xl md:text-6xl font-bold text-white uppercase relative z-10">Fashionwear</h1>
        <p className="text-white/80 mt-3 max-w-lg relative z-10">Where sport meets style. Stand out on and off the pitch.</p>
        <div className="absolute right-6 bottom-0 text-[150px] opacity-10 select-none">👗</div>
      </div>
      <ProductGrid products={products} />
    </div>
  );
}
