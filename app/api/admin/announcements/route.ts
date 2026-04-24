import { NextRequest, NextResponse } from 'next/server';
import { getAdminSession } from '@/lib/admin/session';
import { dbGetSiteContent, dbSetSiteContent } from '@/lib/supabase/db';

const ANNOUNCEMENTS_KEY = 'announcement_messages';

function unauthorized() {
  return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
}

function sanitizeMessages(input: unknown): string[] {
  if (!Array.isArray(input)) {
    return [];
  }

  return input
    .filter((value): value is string => typeof value === 'string')
    .map((value) => value.trim())
    .filter((value) => value.length > 0)
    .slice(0, 20);
}

export async function GET() {
  const session = await getAdminSession();
  if (!session) return unauthorized();

  try {
    const value = await dbGetSiteContent(ANNOUNCEMENTS_KEY);
    return NextResponse.json({ messages: sanitizeMessages(value) });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const session = await getAdminSession();
  if (!session) return unauthorized();

  try {
    const body = await req.json();
    const messages = sanitizeMessages(body?.messages);
    await dbSetSiteContent(ANNOUNCEMENTS_KEY, messages);
    return NextResponse.json({ messages });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
