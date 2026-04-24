import { NextResponse } from 'next/server';
export const dynamic = 'force-dynamic';
import { dbGetSiteContent } from '@/lib/supabase/db';

export async function GET() {
  try {
    const messages = await dbGetSiteContent('announcement_messages');
    return NextResponse.json({ messages: Array.isArray(messages) ? messages : [] });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
