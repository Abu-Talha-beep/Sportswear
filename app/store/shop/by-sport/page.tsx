import { Metadata } from 'next';
import Link from 'next/link';
import { Card } from '@/components/ui/Card';

export const metadata: Metadata = {
  title: 'Shop by Sport',
  description: 'Browse products by your favorite sport. Rugby, football, netball, and more.',
};

// Available sports — should match clubs.sport values in Supabase
const SPORTS = [
  { slug: 'rugby', name: 'Rugby', emoji: '🏉', description: 'Rugby gear and apparel' },
  { slug: 'football', name: 'Football', emoji: '⚽', description: 'Football equipment and wear' },
  { slug: 'netball', name: 'Netball', emoji: '🏀', description: 'Netball uniforms and gear' },
  { slug: 'softball', name: 'Softball', emoji: '🥎', description: 'Softball equipment' },
  { slug: 'korfball', name: 'Korfball', emoji: '🎯', description: 'Korfball apparel' },
  { slug: 'padel', name: 'Padel', emoji: '🎾', description: 'Padel gear' },
  { slug: 'cricket', name: 'Cricket', emoji: '🏏', description: 'Cricket equipment' },
  { slug: 'darts', name: 'Darts', emoji: '🎱', description: 'Darts merchandise' },
];

export default function BySprtIndexPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
      {/* Breadcrumb */}
      <nav className="text-sm text-muted mb-6">
        <Link href="/" className="hover:text-accent">
          Home
        </Link>
        <span className="mx-2">/</span>
        <Link href="/store" className="hover:text-accent">
          Shop
        </Link>
        <span className="mx-2">/</span>
        <span className="text-foreground font-medium">By Sport</span>
      </nav>

      {/* Hero */}
      <div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600 p-8 sm:p-12 mb-10">
        <div className="relative z-10">
          <h1 className="font-[var(--font-heading)] text-4xl md:text-6xl font-bold text-white uppercase">
            Shop by Sport
          </h1>
          <p className="text-white/80 mt-3 max-w-lg">
            Find the perfect gear for your sport. Browse our collection by discipline.
          </p>
        </div>
        <div className="absolute right-6 bottom-0 text-[150px] opacity-10 select-none">
          ⛹️
        </div>
      </div>

      {/* Sports Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {SPORTS.map((sport) => (
          <Link
            key={sport.slug}
            href={`/store/shop/by-sport/${sport.slug}`}
          >
            <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer overflow-hidden">
              <div className="p-6 text-center">
                <div className="text-6xl mb-3">{sport.emoji}</div>
                <h2 className="font-bold text-xl text-foreground mb-2">
                  {sport.name}
                </h2>
                <p className="text-sm text-muted mb-4">
                  {sport.description}
                </p>
                <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold hover:bg-primary hover:text-white transition-colors">
                  Browse Products
                </span>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
