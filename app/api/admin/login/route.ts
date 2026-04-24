import { NextResponse } from 'next/server';
import { ADMIN_SESSION_COOKIE } from '@/lib/admin/constants';
import {
  createAdminSessionToken,
  validateAdminCredentials,
} from '@/lib/admin/session';

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as
    | { email?: string; password?: string }
    | null;

  const email = body?.email || '';
  const password = body?.password || '';
  let sessionPayload = null;

  try {
    sessionPayload = await validateAdminCredentials(email, password);
  } catch (error) {
    return NextResponse.json(
      {
        message:
          error instanceof Error
            ? error.message
            : 'Admin authentication is not configured correctly.',
      },
      { status: 500 }
    );
  }

  if (!sessionPayload) {
    return NextResponse.json({ message: 'Invalid admin credentials.' }, { status: 401 });
  }

  let token = '';
  try {
    token = createAdminSessionToken(sessionPayload);
  } catch (error) {
    return NextResponse.json(
      {
        message:
          error instanceof Error
            ? error.message
            : 'Admin session token could not be created.',
      },
      { status: 500 }
    );
  }
  const response = NextResponse.json({ ok: true });

  response.cookies.set({
    name: ADMIN_SESSION_COOKIE,
    value: token,
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 60 * 60 * 12,
  });

  return response;
}
