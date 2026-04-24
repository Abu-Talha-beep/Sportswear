-- Admin auth table for Your Club Stash admin panel
create extension if not exists pgcrypto;

create table if not exists public.admin_users (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  full_name text not null,
  role text not null check (
    role in (
      'super-admin',
      'store-manager',
      'club-admin',
      'content-editor',
      'customer-support',
      'warehouse'
    )
  ),
  password_hash text not null,
  is_active boolean not null default true,
  two_factor_enabled boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create or replace function public.set_updated_at_timestamp()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists admin_users_set_updated_at on public.admin_users;
create trigger admin_users_set_updated_at
before update on public.admin_users
for each row
execute function public.set_updated_at_timestamp();

create unique index if not exists admin_users_email_lower_idx on public.admin_users (lower(email));
