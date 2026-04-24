// ═══════════════════════════════════════════
// SUPABASE DATA ACCESS LAYER
// Server-only — uses service role key
// ═══════════════════════════════════════════

import { getSupabaseAdminClient } from './server';

// ─── PRODUCTS ───

export async function dbGetProducts(filters?: {
  category?: string;
  clubId?: string;
  badge?: string;
  search?: string;
  limit?: number;
}) {
  const sb = getSupabaseAdminClient();
  let query = sb
    .from('products')
    .select('*, clubs(name, slug)')
    .eq('is_active', true)
    .order('sort_order', { ascending: true });

  if (filters?.category) query = query.eq('category_slug', filters.category);
  if (filters?.clubId) query = query.eq('club_id', filters.clubId);
  if (filters?.badge) query = query.eq('badge', filters.badge);
  if (filters?.search) query = query.ilike('name', `%${filters.search}%`);
  if (filters?.limit) query = query.limit(filters.limit);

  const { data, error } = await query;
  if (error) throw new Error(`dbGetProducts: ${error.message}`);
  return data ?? [];
}

export async function dbGetProductBySlug(slug: string) {
  const sb = getSupabaseAdminClient();
  const { data, error } = await sb
    .from('products')
    .select('*, clubs(name, slug)')
    .eq('slug', slug)
    .maybeSingle();

  if (error) throw new Error(`dbGetProductBySlug: ${error.message}`);
  return data;
}

export async function dbUpsertProduct(product: Record<string, unknown>) {
  const sb = getSupabaseAdminClient();
  const { data, error } = await sb
    .from('products')
    .upsert(product, { onConflict: 'id' })
    .select()
    .single();

  if (error) throw new Error(`dbUpsertProduct: ${error.message}`);
  return data;
}

export async function dbDeleteProduct(id: string) {
  const sb = getSupabaseAdminClient();
  const { error } = await sb.from('products').delete().eq('id', id);
  if (error) throw new Error(`dbDeleteProduct: ${error.message}`);
}

// ─── CLUBS ───

export async function dbGetClubs(filters?: { sport?: string; search?: string }) {
  const sb = getSupabaseAdminClient();
  let query = sb
    .from('clubs')
    .select('*')
    .eq('is_active', true)
    .order('sort_order', { ascending: true });

  if (filters?.sport) query = query.eq('sport', filters.sport);
  if (filters?.search) query = query.ilike('name', `%${filters.search}%`);

  const { data, error } = await query;
  if (error) throw new Error(`dbGetClubs: ${error.message}`);
  return data ?? [];
}

export async function dbGetClubBySlug(slug: string) {
  const sb = getSupabaseAdminClient();
  const { data, error } = await sb
    .from('clubs')
    .select('*')
    .eq('slug', slug)
    .maybeSingle();

  if (error) throw new Error(`dbGetClubBySlug: ${error.message}`);
  return data;
}

export async function dbUpsertClub(club: Record<string, unknown>) {
  const sb = getSupabaseAdminClient();
  const { data, error } = await sb
    .from('clubs')
    .upsert(club, { onConflict: 'id' })
    .select()
    .single();

  if (error) throw new Error(`dbUpsertClub: ${error.message}`);
  return data;
}

export async function dbDeleteClub(id: string) {
  const sb = getSupabaseAdminClient();
  const { error } = await sb.from('clubs').delete().eq('id', id);
  if (error) throw new Error(`dbDeleteClub: ${error.message}`);
}

// ─── HERO BANNERS ───

export async function dbGetBanners() {
  const sb = getSupabaseAdminClient();
  const { data, error } = await sb
    .from('hero_banners')
    .select('*')
    .eq('is_active', true)
    .order('sort_order', { ascending: true });

  if (error) throw new Error(`dbGetBanners: ${error.message}`);
  return data ?? [];
}

export async function dbUpsertBanner(banner: Record<string, unknown>) {
  const sb = getSupabaseAdminClient();
  const { data, error } = await sb
    .from('hero_banners')
    .upsert(banner, { onConflict: 'id' })
    .select()
    .single();

  if (error) throw new Error(`dbUpsertBanner: ${error.message}`);
  return data;
}

export async function dbDeleteBanner(id: string) {
  const sb = getSupabaseAdminClient();
  const { error } = await sb.from('hero_banners').delete().eq('id', id);
  if (error) throw new Error(`dbDeleteBanner: ${error.message}`);
}

// ─── ORDERS ───

export async function dbGetOrders(filters?: { status?: string; limit?: number }) {
  const sb = getSupabaseAdminClient();
  let query = sb
    .from('orders')
    .select('*, order_items(*)')
    .order('created_at', { ascending: false });

  if (filters?.status) query = query.eq('fulfillment_status', filters.status);
  if (filters?.limit) query = query.limit(filters.limit);

  const { data, error } = await query;
  if (error) throw new Error(`dbGetOrders: ${error.message}`);
  return data ?? [];
}

export async function dbUpdateOrderStatus(id: string, updates: Record<string, unknown>) {
  const sb = getSupabaseAdminClient();
  const { data, error } = await sb
    .from('orders')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) throw new Error(`dbUpdateOrderStatus: ${error.message}`);
  return data;
}

export async function dbGetCustomerOrderRows() {
  const sb = getSupabaseAdminClient();
  const { data, error } = await sb
    .from('orders')
    .select('id,customer_name,customer_email,total,created_at,shipping_address')
    .order('created_at', { ascending: false });

  if (error) throw new Error(`dbGetCustomerOrderRows: ${error.message}`);
  return data ?? [];
}

// ─── CATEGORIES ───

export async function dbGetCategories() {
  const sb = getSupabaseAdminClient();
  const { data, error } = await sb
    .from('categories')
    .select('*')
    .eq('is_active', true)
    .order('sort_order', { ascending: true });

  if (error) throw new Error(`dbGetCategories: ${error.message}`);
  return data ?? [];
}

export async function dbGetAllCategories() {
  const sb = getSupabaseAdminClient();
  const { data, error } = await sb
    .from('categories')
    .select('*')
    .order('sort_order', { ascending: true });

  if (error) throw new Error(`dbGetAllCategories: ${error.message}`);
  return data ?? [];
}

export async function dbCreateCategory(category: Record<string, unknown>) {
  const sb = getSupabaseAdminClient();
  const { data, error } = await sb
    .from('categories')
    .insert(category)
    .select()
    .single();

  if (error) throw new Error(`dbCreateCategory: ${error.message}`);
  return data;
}

export async function dbUpdateCategory(id: string, category: Record<string, unknown>) {
  const sb = getSupabaseAdminClient();
  const { data, error } = await sb
    .from('categories')
    .update(category)
    .eq('id', id)
    .select()
    .single();

  if (error) throw new Error(`dbUpdateCategory: ${error.message}`);
  return data;
}

export async function dbDeleteCategory(id: string) {
  const sb = getSupabaseAdminClient();

  // Look up the category slug so we can unlink products
  const { data: cat } = await sb.from('categories').select('slug').eq('id', id).maybeSingle();
  if (!cat) {
    throw new Error('Category not found.');
  }

  // Unlink products that reference this category
  await sb.from('products').update({ category_slug: null }).eq('category_slug', cat.slug);

  // Now delete the category
  const { data, error } = await sb.from('categories').delete().eq('id', id).select();

  if (error) throw new Error(`dbDeleteCategory: ${error.message}`);
  if (!data || data.length === 0) {
    throw new Error('Category could not be deleted.');
  }
}

// ─── SITE CONTENT ───

export async function dbGetSiteContent(key: string) {
  const sb = getSupabaseAdminClient();
  const { data, error } = await sb
    .from('site_content')
    .select('content_value')
    .eq('content_key', key)
    .maybeSingle();

  if (error) throw new Error(`dbGetSiteContent: ${error.message}`);
  return data?.content_value ?? null;
}

export async function dbSetSiteContent(key: string, value: unknown) {
  const sb = getSupabaseAdminClient();
  const { error } = await sb
    .from('site_content')
    .upsert({ content_key: key, content_value: value }, { onConflict: 'content_key' });

  if (error) throw new Error(`dbSetSiteContent: ${error.message}`);
}

// ─── IMAGE UPLOAD ───

export async function dbUploadImage(
  bucket: string,
  path: string,
  file: Buffer,
  contentType: string
) {
  const sb = getSupabaseAdminClient();
  const { error } = await sb.storage
    .from(bucket)
    .upload(path, file, { contentType, upsert: true });

  if (error) throw new Error(`dbUploadImage: ${error.message}`);

  const { data: urlData } = sb.storage.from(bucket).getPublicUrl(path);
  return urlData.publicUrl;
}

// ─── DASHBOARD STATS ───

export async function dbGetDashboardStats() {
  const sb = getSupabaseAdminClient();

  const [productsRes, clubsRes, ordersRes, revenueRes] = await Promise.all([
    sb.from('products').select('id', { count: 'exact', head: true }).eq('is_active', true),
    sb.from('clubs').select('id', { count: 'exact', head: true }).eq('is_active', true),
    sb.from('orders').select('id', { count: 'exact', head: true }),
    sb.from('orders').select('total').eq('payment_status', 'paid'),
  ]);

  const totalRevenue = (revenueRes.data ?? []).reduce(
    (sum: number, o: { total: number }) => sum + Number(o.total),
    0
  );

  return {
    totalProducts: productsRes.count ?? 0,
    totalClubs: clubsRes.count ?? 0,
    totalOrders: ordersRes.count ?? 0,
    totalRevenue,
  };
}
