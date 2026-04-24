import { isSupabaseConfigured, getSupabaseAdminClient } from '@/lib/supabase/server';

export interface ShopCategory {
  label: string;
  slug: string;
  href: string;
}

const fallbackCategories: ShopCategory[] = [
  { label: 'Activewear', slug: 'activewear', href: '/store/shop/activewear' },
  { label: 'Leisurewear', slug: 'leisurewear', href: '/store/shop/leisurewear' },
  { label: 'Fashionwear', slug: 'fashionwear', href: '/store/shop/fashionwear' },
  { label: 'Player Equipment', slug: 'playerequipment', href: '/store/shop/playerequipment' },
  { label: 'Rugby Gear', slug: 'rugbygear', href: '/store/shop/rugbygear' },
  { label: 'Outlet', slug: 'outlet', href: '/store/shop/outlet' },
  { label: 'Gift Cards', slug: 'gift-cards', href: '/store/shop/gift-cards' },
];

async function fetchCategoriesFromDB(): Promise<ShopCategory[] | null> {
  try {
    if (!isSupabaseConfigured()) {
      return null;
    }

    const sb = getSupabaseAdminClient();
    const { data, error } = await sb
      .from('categories')
      .select('slug,name,sort_order,is_active')
      .eq('is_active', true)
      .order('sort_order', { ascending: true });

    if (error || !data) {
      return null;
    }

    return data.map((row) => ({
      label: row.name,
      slug: row.slug,
      href: `/store/shop/${row.slug}`,
    }));
  } catch {
    return null;
  }
}

export async function getShopCategoriesAsync(): Promise<ShopCategory[]> {
  const dbCategories = await fetchCategoriesFromDB();
  if (dbCategories && dbCategories.length > 0) {
    return dbCategories;
  }

  return fallbackCategories;
}