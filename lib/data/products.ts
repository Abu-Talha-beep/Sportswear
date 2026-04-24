// ═══════════════════════════════════════════
// MOCK PRODUCT DATA
// ═══════════════════════════════════════════

import { Product } from '@/types';

export const products: Product[] = [
  // ── ACTIVEWEAR ──
  {
    id: '1',
    slug: 'performance-training-tee',
    name: 'Performance Training Tee',
    price: 24.99,
    category: 'activewear',
    images: [
      '/images/products/training-tee.png',
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&h=600&fit=crop&q=80',
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Navy', 'Black', 'Red'],
    description: 'Lightweight, moisture-wicking training tee designed for peak performance. Features breathable mesh panels and flatlock seams for maximum comfort during intense workouts.',
    badge: 'new',
    inStock: true,
    rating: 4.8,
    reviews: 124,
  },
  {
    id: '2',
    slug: 'elite-compression-shorts',
    name: 'Elite Compression Shorts',
    price: 29.99,
    category: 'activewear',
    images: [
      '/images/products/compression-shorts.png',
      'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=600&h=600&fit=crop&q=80',
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Black', 'Navy'],
    description: 'High-performance compression shorts with graduated compression technology. Ideal for training and match days.',
    inStock: true,
    rating: 4.6,
    reviews: 89,
  },
  {
    id: '3',
    slug: 'pro-match-jersey',
    name: 'Pro Match Jersey',
    price: 44.99,
    originalPrice: 54.99,
    category: 'activewear',
    images: [
      '/images/products/match-jersey.png',
      'https://images.unsplash.com/photo-1580087256394-dc596e1c8f4f?w=600&h=600&fit=crop&q=80',
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Red', 'Blue', 'White'],
    description: 'Professional grade match jersey with sublimated design. Lightweight, breathable fabric with reinforced stitching.',
    badge: 'sale',
    inStock: true,
    rating: 4.9,
    reviews: 256,
  },
  {
    id: '4',
    slug: 'training-track-pants',
    name: 'Training Track Pants',
    price: 34.99,
    category: 'activewear',
    images: [
      '/images/products/track-pants.png',
      'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=600&h=600&fit=crop&q=80',
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    description: 'Tapered fit track pants with zip pockets and elasticated waistband. Perfect for warm-ups and travel days.',
    inStock: true,
    rating: 4.5,
    reviews: 67,
  },

  // ── LEISUREWEAR ──
  {
    id: '5',
    slug: 'club-hoodie-premium',
    name: 'Club Hoodie Premium',
    price: 49.99,
    category: 'leisurewear',
    images: [
      '/images/products/club-hoodie.png',
      'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600&h=600&fit=crop&q=80',
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Navy', 'Black', 'Grey'],
    description: 'Premium heavyweight hoodie with embroidered club crest. 80% cotton, 20% polyester blend for ultimate comfort.',
    badge: 'featured',
    inStock: true,
    rating: 4.9,
    reviews: 342,
  },
  {
    id: '6',
    slug: 'sub-robe-changing-coat',
    name: 'Sub Robe Changing Coat',
    price: 89.99,
    category: 'leisurewear',
    images: [
      '/images/products/sub-robe.png',
      'https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=600&h=600&fit=crop&q=80',
    ],
    sizes: ['S/M', 'L/XL'],
    colors: ['Black', 'Navy', 'Camo'],
    description: 'The ultimate changing robe. Waterproof outer shell with fleece-lined interior. Essential for post-match warmth.',
    badge: 'top',
    inStock: true,
    rating: 4.7,
    reviews: 198,
  },
  {
    id: '7',
    slug: 'quarter-zip-midlayer',
    name: 'Quarter-Zip Midlayer',
    price: 39.99,
    category: 'leisurewear',
    images: [
      'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=600&h=600&fit=crop&q=80',
      'https://images.unsplash.com/photo-1611312449408-fcece27cdbb7?w=600&h=600&fit=crop&q=80',
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    description: 'Versatile quarter-zip midlayer. Perfect for training, sideline, or casual wear. Brushed inner fleece.',
    inStock: true,
    rating: 4.4,
    reviews: 156,
  },
  {
    id: '8',
    slug: 'jogger-bottoms',
    name: 'Jogger Bottoms',
    price: 32.99,
    category: 'leisurewear',
    images: [
      'https://images.unsplash.com/photo-1552902865-b72c031ac5ea?w=600&h=600&fit=crop&q=80',
      'https://images.unsplash.com/photo-1580906853305-0aab2b0e3b4b?w=600&h=600&fit=crop&q=80',
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    description: 'Comfortable cotton-blend joggers with cuffed ankles. Features two side pockets and one back pocket.',
    inStock: true,
    rating: 4.3,
    reviews: 89,
  },

  // ── FASHIONWEAR ──
  {
    id: '9',
    slug: 'pvida-netball-dress',
    name: 'PVIDA Netball Dress',
    price: 54.99,
    category: 'fashionwear',
    images: [
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&h=600&fit=crop&q=80',
      'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=600&h=600&fit=crop&q=80',
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    description: 'Stylish and functional netball dress with built-in shorts. Sublimated design with moisture-wicking fabric.',
    badge: 'new',
    inStock: true,
    rating: 4.8,
    reviews: 45,
  },
  {
    id: '10',
    slug: 'pride-rainbow-tee',
    name: 'Pride Rainbow Training Tee',
    price: 27.99,
    category: 'fashionwear',
    subcategory: 'pride-collection',
    images: [
      'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600&h=600&fit=crop&q=80',
      'https://images.unsplash.com/photo-1562157873-818bc0726f68?w=600&h=600&fit=crop&q=80',
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    description: 'Celebrate inclusivity with our Pride Collection training tee. Vibrant rainbow design on performance fabric.',
    badge: 'featured',
    inStock: true,
    rating: 4.9,
    reviews: 178,
  },

  // ── PLAYER EQUIPMENT ──
  {
    id: '11',
    slug: 'safejawz-mouthguard',
    name: 'SafeJawz Mouthguard',
    price: 19.99,
    category: 'playerequipment',
    images: [
      'https://images.unsplash.com/photo-1517466787929-bc90951d0974?w=600&h=600&fit=crop&q=80',
      'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=600&h=600&fit=crop&q=80',
    ],
    sizes: ['Junior', 'Adult'],
    colors: ['Black', 'Clear', 'Pink'],
    description: 'Custom-fit boil and bite mouthguard. Slim-fit design for easy breathing and communication.',
    inStock: true,
    rating: 4.6,
    reviews: 312,
  },
  {
    id: '12',
    slug: 'd3-rugby-shoulder-pads',
    name: 'D3 Rugby Shoulder Pads',
    price: 34.99,
    category: 'playerequipment',
    images: [
      'https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=600&h=600&fit=crop&q=80',
      'https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=600&h=600&fit=crop&q=80',
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    description: 'World Rugby approved shoulder pads. Lightweight foam padding with ventilated mesh body.',
    inStock: true,
    rating: 4.5,
    reviews: 87,
  },
  {
    id: '13',
    slug: 'training-rugby-ball',
    name: 'Training Rugby Ball',
    price: 22.99,
    category: 'playerequipment',
    images: [
      'https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=600&h=600&fit=crop&q=80',
      'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=600&h=600&fit=crop&q=80',
    ],
    sizes: ['Size 3', 'Size 4', 'Size 5'],
    description: 'High-grip training rugby ball. Machine-stitched construction with excellent shape retention.',
    inStock: true,
    rating: 4.3,
    reviews: 56,
  },

  // ── RUGBY GEAR ──
  {
    id: '14',
    slug: 'pro-rugby-boots',
    name: 'Pro Rugby Boots',
    price: 79.99,
    originalPrice: 99.99,
    category: 'rugbygear',
    images: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&h=600&fit=crop&q=80',
      'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=600&h=600&fit=crop&q=80',
    ],
    sizes: ['6', '7', '8', '9', '10', '11', '12'],
    description: 'Professional rugby boots with 8-stud configuration. Full-grain leather upper with padded ankle collar.',
    badge: 'sale',
    inStock: true,
    rating: 4.7,
    reviews: 134,
  },
  {
    id: '15',
    slug: 'scrum-cap',
    name: 'Protective Scrum Cap',
    price: 24.99,
    category: 'rugbygear',
    images: [
      'https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=600&h=600&fit=crop&q=80',
      'https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=600&h=600&fit=crop&q=80',
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    description: 'IRB-approved scrum cap with strategically placed ventilation. Adjustable chin strap.',
    inStock: true,
    rating: 4.4,
    reviews: 72,
  },

  // ── OUTLET ──
  {
    id: '16',
    slug: 'outlet-training-top',
    name: 'Training Top — Outlet',
    price: 14.99,
    originalPrice: 29.99,
    category: 'outlet',
    images: [
      'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=600&h=600&fit=crop&q=80',
      'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=600&h=600&fit=crop&q=80',
    ],
    sizes: ['M', 'L', 'XL'],
    description: 'Previous season training top at a great price. Same quality, lower cost. Limited stock.',
    badge: 'sale',
    inStock: true,
    rating: 4.2,
    reviews: 34,
  },
  {
    id: '17',
    slug: 'outlet-shorts',
    name: 'Match Shorts — Outlet',
    price: 9.99,
    originalPrice: 19.99,
    category: 'outlet',
    images: [
      'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=600&h=600&fit=crop&q=80',
      'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=600&h=600&fit=crop&q=80',
    ],
    sizes: ['S', 'M', 'L'],
    description: 'End of line match shorts. Professional quality at outlet prices.',
    badge: 'sale',
    inStock: true,
    rating: 4.0,
    reviews: 22,
  },

  // ── GIFT CARDS ──
  {
    id: '18',
    slug: 'gift-card-25',
    name: '£25 Gift Card',
    price: 25.0,
    category: 'gift-cards',
    images: [
      'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=600&fit=crop&q=80',
      'https://images.unsplash.com/photo-1549465220-1a8b9238f067?w=600&h=600&fit=crop&q=80',
    ],
    sizes: [],
    description: 'Your Club Stash digital gift card. Send the gift of sports kit to someone special.',
    inStock: true,
  },
  {
    id: '19',
    slug: 'gift-card-50',
    name: '£50 Gift Card',
    price: 50.0,
    category: 'gift-cards',
    images: [
      'https://images.unsplash.com/photo-1549465220-1a8b9238f067?w=600&h=600&fit=crop&q=80',
      'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=600&fit=crop&q=80',
    ],
    sizes: [],
    description: 'Your Club Stash digital gift card. Perfect for birthdays and celebrations.',
    badge: 'featured',
    inStock: true,
  },

  // ── CLUB-SPECIFIC PRODUCTS ──
  {
    id: '20',
    slug: 'dorking-rfc-home-jersey',
    name: 'Dorking RFC Home Jersey',
    price: 44.99,
    category: 'activewear',
    clubSlug: 'dorking-rfc',
    images: [
      'https://images.unsplash.com/photo-1580087256394-dc596e1c8f4f?w=600&h=600&fit=crop&q=80',
      'https://images.unsplash.com/photo-1517466787929-bc90951d0974?w=600&h=600&fit=crop&q=80',
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    description: 'Official Dorking RFC home jersey. Sublimated club crest and sponsor logos.',
    inStock: true,
    rating: 4.8,
    reviews: 45,
  },
  {
    id: '21',
    slug: 'dorking-rfc-training-top',
    name: 'Dorking RFC Training Top',
    price: 34.99,
    category: 'activewear',
    clubSlug: 'dorking-rfc',
    images: [
      'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=600&h=600&fit=crop&q=80',
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&h=600&fit=crop&q=80',
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    description: 'Official Dorking RFC training top with embroidered crest.',
    inStock: true,
    rating: 4.6,
    reviews: 32,
  },
  {
    id: '22',
    slug: 'bosham-fc-home-kit',
    name: 'Bosham FC Home Kit',
    price: 39.99,
    category: 'activewear',
    clubSlug: 'bosham-fc',
    images: [
      'https://images.unsplash.com/photo-1580087256394-dc596e1c8f4f?w=600&h=600&fit=crop&q=80',
      'https://images.unsplash.com/photo-1562157873-818bc0726f68?w=600&h=600&fit=crop&q=80',
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    description: 'Official Bosham FC home kit. Professional sublimated design.',
    inStock: true,
    rating: 4.7,
    reviews: 28,
  },
  {
    id: '23',
    slug: 'hurricanes-softball-jersey',
    name: 'Hurricanes Softball Jersey',
    price: 36.99,
    category: 'activewear',
    clubSlug: 'hurricanes-softball',
    images: [
      'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600&h=600&fit=crop&q=80',
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&h=600&fit=crop&q=80',
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    description: 'Official Hurricanes Softball team jersey.',
    badge: 'new',
    inStock: true,
    rating: 4.5,
    reviews: 15,
  },
  {
    id: '24',
    slug: 'birmingham-panthers-korfball-top',
    name: 'Birmingham Panthers Korfball Top',
    price: 32.99,
    category: 'activewear',
    clubSlug: 'birmingham-panthers',
    images: [
      'https://images.unsplash.com/photo-1562157873-818bc0726f68?w=600&h=600&fit=crop&q=80',
      'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600&h=600&fit=crop&q=80',
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    description: 'Official Birmingham Panthers korfball playing top.',
    inStock: true,
    rating: 4.4,
    reviews: 12,
  },
];

/** Get products by category */
export function getProductsByCategory(category: string): Product[] {
  return products.filter((p) => p.category === category);
}

/** Get products by club */
export function getProductsByClub(clubSlug: string): Product[] {
  return products.filter((p) => p.clubSlug === clubSlug);
}

/** Get product by slug */
export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

/** Get featured products */
export function getFeaturedProducts(): Product[] {
  return products.filter((p) => p.badge === 'featured' || p.badge === 'new');
}

/** Get outlet products */
export function getOutletProducts(): Product[] {
  return products.filter((p) => p.badge === 'sale');
}

// ─── SUPABASE FETCH HELPERS ───

async function fetchProductsFromDB(filters?: { category?: string; clubSlug?: string; badge?: string }): Promise<Product[] | null> {
  try {
    const { isSupabaseConfigured, getSupabaseAdminClient } = await import('@/lib/supabase/server');
    if (!isSupabaseConfigured()) return null;

    const sb = getSupabaseAdminClient();
    let query = sb.from('products').select('*, clubs(name, slug)').eq('is_active', true).order('sort_order', { ascending: true });

    if (filters?.category) query = query.eq('category_slug', filters.category);
    if (filters?.badge) {
      if (filters.badge === 'featured') {
        query = query.in('badge', ['featured', 'new']);
      } else {
        query = query.eq('badge', filters.badge);
      }
    }

    const { data, error } = await query;
    if (error || !data) return null;

    let results = data;
    if (filters?.clubSlug) {
      results = results.filter((r: any) => r.clubs && r.clubs.slug === filters.clubSlug);
    }

    return results.map((row: any) => ({
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
  } catch {
    return null;
  }
}

async function fetchProductBySlugFromDB(slug: string): Promise<Product | null> {
  try {
    const { isSupabaseConfigured, getSupabaseAdminClient } = await import('@/lib/supabase/server');
    if (!isSupabaseConfigured()) return null;

    const sb = getSupabaseAdminClient();
    const { data, error } = await sb.from('products').select('*, clubs(name, slug)').eq('slug', slug).maybeSingle();

    if (error || !data) return null;

    return {
      id: data.id,
      slug: data.slug,
      name: data.name,
      price: Number(data.price),
      originalPrice: data.original_price ? Number(data.original_price) : undefined,
      category: data.category_slug || '',
      clubSlug: data.clubs?.slug || '',
      images: data.images || [],
      sizes: data.sizes || [],
      colors: data.colors || [],
      description: data.description || '',
      badge: data.badge || undefined,
      inStock: data.in_stock ?? true,
      rating: data.rating ? Number(data.rating) : undefined,
      reviews: data.review_count || 0,
    };
  } catch {
    return null;
  }
}

// ─── ASYNC PUBLIC API (used by server components) ───

export async function getAllProductsAsync(): Promise<Product[]> {
  const dbProducts = await fetchProductsFromDB();
  if (dbProducts !== null) return dbProducts;
  return products;
}

export async function getProductsByCategoryAsync(category: string): Promise<Product[]> {
  const dbProducts = await fetchProductsFromDB({ category });
  if (dbProducts !== null) return dbProducts;
  return products.filter((p) => p.category === category);
}

export async function getProductsByClubAsync(clubSlug: string): Promise<Product[]> {
  const dbProducts = await fetchProductsFromDB({ clubSlug });
  if (dbProducts !== null) return dbProducts;
  return products.filter((p) => p.clubSlug === clubSlug);
}

export async function getProductBySlugAsync(slug: string): Promise<Product | undefined> {
  const dbProduct = await fetchProductBySlugFromDB(slug);
  if (dbProduct) return dbProduct;
  return products.find((p) => p.slug === slug);
}

export async function getFeaturedProductsAsync(): Promise<Product[]> {
  const dbProducts = await fetchProductsFromDB({ badge: 'featured' });
  if (dbProducts !== null) return dbProducts;
  return products.filter((p) => p.badge === 'featured' || p.badge === 'new');
}

export async function getOutletProductsAsync(): Promise<Product[]> {
  const dbProducts = await fetchProductsFromDB({ badge: 'sale' });
  if (dbProducts !== null) return dbProducts;
  return products.filter((p) => p.badge === 'sale');
}
