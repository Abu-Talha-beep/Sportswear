-- ═══════════════════════════════════════════
-- YOUR CLUB STASH — Full Database Schema
-- Run this in Supabase SQL Editor
-- ═══════════════════════════════════════════

-- Reuse the updated_at trigger from 001
-- create or replace function public.set_updated_at_timestamp() ...

-- ─── CATEGORIES ───
create table if not exists public.categories (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  description text,
  image_url text,
  sort_order int not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create trigger categories_updated_at
before update on public.categories
for each row execute function public.set_updated_at_timestamp();

insert into public.categories (slug, name, sort_order) values
  ('activewear', 'Activewear', 1),
  ('leisurewear', 'Leisurewear', 2),
  ('fashionwear', 'Fashionwear', 3),
  ('playerequipment', 'Player Equipment', 4),
  ('rugbygear', 'Rugby Kit & Equipment', 5),
  ('pvidapadel', 'Padel Equipment', 6),
  ('gift-cards', 'Gift Cards', 7),
  ('outlet', 'YCS Outlet', 8)
on conflict (slug) do nothing;

-- ─── CLUBS ───
create table if not exists public.clubs (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  sport text not null,
  logo_url text,
  banner_url text,
  description text,
  is_featured boolean not null default false,
  is_active boolean not null default true,
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create trigger clubs_updated_at
before update on public.clubs
for each row execute function public.set_updated_at_timestamp();

create index if not exists clubs_sport_idx on public.clubs (sport);

-- ─── PRODUCTS ───
create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  description text,
  price numeric(10,2) not null,
  original_price numeric(10,2),
  category_slug text references public.categories(slug),
  club_id uuid references public.clubs(id) on delete set null,
  sizes text[] not null default '{}',
  colors text[] not null default '{}',
  images text[] not null default '{}',
  badge text check (badge in ('sale','new','featured','top')),
  in_stock boolean not null default true,
  stock_count int not null default 0,
  rating numeric(2,1),
  review_count int not null default 0,
  is_active boolean not null default true,
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create trigger products_updated_at
before update on public.products
for each row execute function public.set_updated_at_timestamp();

create index if not exists products_category_idx on public.products (category_slug);
create index if not exists products_club_idx on public.products (club_id);
create index if not exists products_badge_idx on public.products (badge);

-- ─── HERO BANNERS ───
create table if not exists public.hero_banners (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  subtitle text,
  cta_text text,
  cta_href text,
  image_url text,
  gradient text,
  sort_order int not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create trigger hero_banners_updated_at
before update on public.hero_banners
for each row execute function public.set_updated_at_timestamp();

-- ─── ORDERS ───
create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  order_number text not null unique,
  customer_name text not null,
  customer_email text not null,
  customer_phone text,
  shipping_address jsonb not null default '{}',
  subtotal numeric(10,2) not null default 0,
  shipping_cost numeric(10,2) not null default 0,
  discount numeric(10,2) not null default 0,
  total numeric(10,2) not null default 0,
  coupon_code text,
  payment_status text not null default 'pending' check (
    payment_status in ('pending','paid','failed','refunded')
  ),
  fulfillment_status text not null default 'unfulfilled' check (
    fulfillment_status in ('unfulfilled','processing','dispatched','delivered','returned')
  ),
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create trigger orders_updated_at
before update on public.orders
for each row execute function public.set_updated_at_timestamp();

create index if not exists orders_email_idx on public.orders (customer_email);
create index if not exists orders_status_idx on public.orders (fulfillment_status);

-- ─── ORDER ITEMS ───
create table if not exists public.order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders(id) on delete cascade,
  product_id uuid references public.products(id) on delete set null,
  product_name text not null,
  product_image text,
  size text,
  color text,
  quantity int not null default 1,
  unit_price numeric(10,2) not null,
  total_price numeric(10,2) not null
);

create index if not exists order_items_order_idx on public.order_items (order_id);

-- ─── SITE CONTENT (key-value for editable blocks) ───
create table if not exists public.site_content (
  id uuid primary key default gen_random_uuid(),
  content_key text not null unique,
  content_value jsonb not null default '{}',
  updated_at timestamptz not null default now()
);

create trigger site_content_updated_at
before update on public.site_content
for each row execute function public.set_updated_at_timestamp();

-- Default content entries
insert into public.site_content (content_key, content_value) values
  ('announcement_messages', '["We plant a tree for every order you place!","#STASHLIFE","Free UK delivery on orders over £50"]'::jsonb),
  ('footer_about', '"Your Club Stash are an independent, UK based supplier of active wear, leisurewear and sporting goods supplying all types of sports clubs, schools, businesses and charities."'::jsonb)
on conflict (content_key) do nothing;

-- ─── STORAGE BUCKET (run separately in Supabase Dashboard > Storage) ───
-- Create a bucket called "images" with public access
-- Or run: insert into storage.buckets (id, name, public) values ('images', 'images', true);
