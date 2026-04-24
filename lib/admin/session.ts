import { createHmac, timingSafeEqual } from 'crypto';
import { compare } from 'bcryptjs';
import { cookies } from 'next/headers';
import { AdminSessionPayload } from '@/lib/admin/types';
import { ADMIN_SESSION_COOKIE } from '@/lib/admin/constants';
import { getAdminUserByEmail } from '@/lib/admin/users';
import { isSupabaseConfigured } from '@/lib/supabase/server';
const SESSION_TTL_MS = 1000 * 60 * 60 * 12;

function getSessionSecret(): string {
  const secret = process.env.ADMIN_SESSION_SECRET?.trim();
  if (!secret) {
    throw new Error('ADMIN_SESSION_SECRET is not configured.');
  }
  return secret;
}

function toBase64Url(input: string): string {
  return Buffer.from(input, 'utf8').toString('base64url');
}

function fromBase64Url(input: string): string {
  return Buffer.from(input, 'base64url').toString('utf8');
}

function sign(data: string): string {
  return createHmac('sha256', getSessionSecret()).update(data).digest('base64url');
}

export async function validateAdminCredentials(
  email: string,
  password: string
): Promise<AdminSessionPayload | null> {
  if (!isSupabaseConfigured()) {
    throw new Error('Supabase is not configured for admin auth.');
  }

  // Ensure session signing secret exists before allowing auth.
  getSessionSecret();

  const normalizedEmail = email.trim().toLowerCase();
  if (!normalizedEmail || !password) {
    return null;
  }

  const adminUser = await getAdminUserByEmail(normalizedEmail);
  if (!adminUser || !adminUser.isActive) {
    return null;
  }

  const passwordOk = await compare(password, adminUser.passwordHash);
  if (!passwordOk) {
    return null;
  }

  return {
    email: adminUser.email,
    name: adminUser.fullName,
    role: adminUser.role,
    expiresAt: Date.now() + SESSION_TTL_MS,
  };
}

export function createAdminSessionToken(payload: AdminSessionPayload): string {
  const encodedPayload = toBase64Url(JSON.stringify(payload));
  const signature = sign(encodedPayload);
  return `${encodedPayload}.${signature}`;
}

export function verifyAdminSessionToken(token?: string | null): AdminSessionPayload | null {
  if (!token) {
    return null;
  }

  const [encodedPayload, signature] = token.split('.');
  if (!encodedPayload || !signature) {
    return null;
  }

  let expectedSignature = '';
  try {
    expectedSignature = sign(encodedPayload);
  } catch {
    return null;
  }
  const signatureBuffer = Buffer.from(signature);
  const expectedBuffer = Buffer.from(expectedSignature);

  if (signatureBuffer.length !== expectedBuffer.length) {
    return null;
  }

  const valid = timingSafeEqual(signatureBuffer, expectedBuffer);
  if (!valid) {
    return null;
  }

  try {
    const parsed = JSON.parse(fromBase64Url(encodedPayload)) as AdminSessionPayload;
    if (!parsed.email || !parsed.role || !parsed.expiresAt) {
      return null;
    }
    if (Date.now() > parsed.expiresAt) {
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
}

export async function getAdminSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_SESSION_COOKIE)?.value;
  return verifyAdminSessionToken(token);
}
