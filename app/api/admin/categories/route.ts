import { NextRequest, NextResponse } from 'next/server';
import { getAdminSession } from '@/lib/admin/session';
import { dbCreateCategory, dbDeleteCategory, dbGetAllCategories, dbUpdateCategory } from '@/lib/supabase/db';

function unauthorized() {
  return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
}

function normalizeCategory(body: Record<string, unknown>) {
  return {
    slug: String(body.slug || '').trim(),
    name: String(body.name || '').trim(),
    description: String(body.description || '').trim() || null,
    image_url: String(body.image_url || '').trim() || null,
    sort_order: Number(body.sort_order ?? 0),
    is_active: Boolean(body.is_active ?? true),
  };
}

export async function GET() {
  const session = await getAdminSession();
  if (!session) return unauthorized();

  try {
    const categories = await dbGetAllCategories();
    return NextResponse.json({ categories });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const session = await getAdminSession();
  if (!session) return unauthorized();

  try {
    const body = (await req.json()) as Record<string, unknown>;
    const category = normalizeCategory(body);

    if (!category.slug || !category.name) {
      return NextResponse.json({ error: 'Slug and name are required.' }, { status: 400 });
    }

    let saved;
    if (typeof body.id === 'string' && body.id.trim()) {
      saved = await dbUpdateCategory(body.id, category);
    } else {
      saved = await dbCreateCategory(category);
    }

    return NextResponse.json({ category: saved });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  const session = await getAdminSession();
  if (!session) return unauthorized();

  try {
    const body = (await req.json()) as { id?: string };
    if (!body.id) {
      return NextResponse.json({ error: 'Category id is required.' }, { status: 400 });
    }

    await dbDeleteCategory(body.id);
    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
