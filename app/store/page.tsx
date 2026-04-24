import { Metadata } from 'next';
export const dynamic = 'force-dynamic';
import { getAllProductsAsync } from '@/lib/data/products';
import { getShopCategoriesAsync } from '@/lib/data/categories';
import { ProductGrid } from '@/components/shop/ProductGrid';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Shop All Products',
  description: 'Browse our complete range of activewear, leisurewear, and sporting equipment.',
};

export default async function StorePage() {
  // Show all non-club products
  const storeProducts = (await getAllProductsAsync()).filter((p) => !p.clubSlug);
  const categories = await getShopCategoriesAsync();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
      {/* Breadcrumb */}
      <nav className="text-sm text-muted mb-6">
        <Link href="/" className="hover:text-accent">Home</Link>
        <span className="mx-2">/</span>
        <span className="text-foreground font-medium">Shop</span>
      </nav>

      {/* Header */}
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-(--font-heading) text-4xl md:text-5xl text-primary uppercase">
            Shop All
          </h1>
          <p className="text-muted mt-2">{storeProducts.length} products available</p>
        </div>
        <Link
          href="/store/shop/by-sport"
          className="inline-block px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors font-semibold whitespace-nowrap"
        >
          Browse by Sport →
        </Link>
      </div>

      {/* Category filters */}
      <div className="flex flex-wrap gap-2 mb-8">
        <Link
          href="/store"
          className="px-4 py-2 rounded-full text-sm font-medium bg-surface border border-border hover:bg-accent hover:text-white hover:border-accent transition-all"
        >
          All
        </Link>
        {categories.map((cat) => (
          <Link
            key={cat.slug}
            href={cat.href}
            className="px-4 py-2 rounded-full text-sm font-medium bg-surface border border-border hover:bg-accent hover:text-white hover:border-accent transition-all"
          >
            {cat.label}
          </Link>
        ))}
      </div>

      {/* Product Grid */}
      <ProductGrid products={storeProducts} />
    </div>
  );
}
