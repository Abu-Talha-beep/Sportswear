import { NextResponse } from 'next/server';
export const dynamic = 'force-dynamic';
import { dbGetCategories } from '@/lib/supabase/db';

export async function GET() {
  try {
    const data = await dbGetCategories();
    return NextResponse.json({ categories: data });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
