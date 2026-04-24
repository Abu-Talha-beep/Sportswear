import { NextRequest, NextResponse } from 'next/server';
export const dynamic = 'force-dynamic';
import { dbGetProducts } from '@/lib/supabase/db';

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const category = url.searchParams.get('category') || undefined;
    const clubId = url.searchParams.get('clubId') || undefined;
    const badge = url.searchParams.get('badge') || undefined;
    const search = url.searchParams.get('search') || undefined;
    const limit = url.searchParams.get('limit') ? Number(url.searchParams.get('limit')) : undefined;

    const data = await dbGetProducts({ category, clubId, badge, search, limit });

    // Map to frontend Product type
    const products = data.map((row: any) => ({
      id: row.id,
      slug: row.slug,
      name: row.name,
      price: Number(row.price),
      originalPrice: row.original_price ? Number(row.original_price) : undefined,
      category: row.category_slug || '',
      clubSlug: row.clubs?.slug || '',
      images: row.images || [],
      sizes: row.sizes || [],
      colors: row.colors || [],
      description: row.description || '',
      badge: row.badge || undefined,
      inStock: row.in_stock ?? true,
      rating: row.rating ? Number(row.rating) : undefined,
      reviews: row.review_count || 0,
    }));

    return NextResponse.json({ products });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
