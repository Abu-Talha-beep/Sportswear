import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="text-center">
        <div className="text-8xl mb-6">🏟️</div>
        <h1 className="font-[var(--font-heading)] text-6xl md:text-8xl font-bold text-primary uppercase">404</h1>
        <h2 className="font-[var(--font-heading)] text-2xl font-bold text-foreground uppercase mt-2">
          Page Not Found
        </h2>
        <p className="text-muted mt-4 max-w-md mx-auto">
          Looks like this page has been subbed off. Let&apos;s get you back in the game.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
          <Link
            href="/"
            className="px-8 py-3.5 bg-accent text-white font-[var(--font-heading)] font-bold uppercase rounded-xl hover:bg-accent-dark transition-colors"
          >
            Back Home
          </Link>
          <Link
            href="/store"
            className="px-8 py-3.5 bg-surface border border-border text-foreground font-[var(--font-heading)] font-bold uppercase rounded-xl hover:bg-surface-alt transition-colors"
          >
            Shop All
          </Link>
        </div>
      </div>
    </div>
  );
}
