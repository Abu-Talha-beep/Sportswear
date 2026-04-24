'use client';

import { FormEvent, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

function getSafeNextPath(nextPath: string | null): string {
  if (!nextPath) return '/admin';

  // Allow only in-app admin paths to avoid open redirects.
  if (!nextPath.startsWith('/admin')) {
    return '/admin';
  }

  return nextPath;
}

export function AdminLoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const data = (await response.json().catch(() => null)) as { message?: string } | null;
        setError(data?.message || 'Login failed. Please check your credentials.');
        return;
      }

      const nextPath = getSafeNextPath(searchParams.get('next'));
      router.replace(nextPath);
      router.refresh();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[linear-gradient(160deg,#0f172a_0%,#111827_45%,#1f2937_100%)] px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-md rounded-3xl border border-white/10 bg-white/95 p-8 shadow-2xl">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">Your Club Stash</p>
        <h1 className="mt-2 font-(--font-heading) text-4xl uppercase text-primary">Admin Login</h1>
        <p className="mt-2 text-sm text-muted">Sign in with your staff credentials to access the operations dashboard.</p>

        <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="mb-1 block text-sm font-semibold text-foreground">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="w-full rounded-xl border border-border bg-surface px-4 py-2.5 text-sm focus:border-accent focus:outline-none"
              placeholder="admin@yourclubstash.co.uk"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="mb-1 block text-sm font-semibold text-foreground">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="w-full rounded-xl border border-border bg-surface px-4 py-2.5 text-sm focus:border-accent focus:outline-none"
              placeholder="Enter password"
              required
            />
          </div>

          {error && <p className="rounded-xl bg-red-50 px-3 py-2 text-sm font-medium text-red-600">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-accent px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-accent-dark disabled:cursor-not-allowed disabled:opacity-70"
          >
            {loading ? 'Signing in...' : 'Sign in to admin'}
          </button>
        </form>
      </div>
    </div>
  );
}
