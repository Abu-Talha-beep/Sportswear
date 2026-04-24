# Your Club Stash

Next.js storefront + admin panel for Your Club Stash.

## Admin Auth Stack

- Next.js App Router
- Supabase PostgreSQL (`admin_users` table)
- `bcryptjs` password hash verification
- Signed HTTP-only session cookie

## Local Setup

1. Install dependencies:

```bash
npm install
```

2. Create environment file:

```bash
cp .env.example .env.local
```

3. Fill these required values in `.env.local`:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `ADMIN_SESSION_SECRET`

4. Run SQL migrations in Supabase SQL editor (in order):

- `supabase/sql/001_admin_users.sql`
- `supabase/sql/002_full_schema.sql`

5. Generate a password hash:

```bash
npm run admin:hash-password -- "YourStrongPassword123!"
```

6. Insert first admin user in Supabase SQL editor:

```sql
insert into public.admin_users (email, full_name, role, password_hash)
values (
	'admin@yourclubstash.co.uk',
	'Super Admin',
	'super-admin',
	'$2b$12$replace_with_output_from_hash_command'
);
```

7. Seed initial storefront/admin data:

```bash
node seed.js
```

8. Start app:

```bash
npm run dev
```

9. Open admin login:

- `http://localhost:3000/admin/login`

## Notes

- Admin routes are protected by `proxy.ts` and server-side session checks in `app/admin/layout.tsx`.
- `SUPABASE_SERVICE_ROLE_KEY` must stay server-side only.
