'use client';

import { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

// Fallback data — used while loading or if the API fails
const fallbackCategories = [
  { name: 'Rugby Clubs', image: '', href: '/store/clubs/rugbyclubs' },
  { name: 'Football Clubs', image: '', href: '/store/clubs/footballclubs' },
  { name: 'Softball', image: '', href: '/store/clubs/softball-teams' },
  { name: 'Korfball', image: '', href: '/store/clubs/korfball' },
  { name: 'Netball', image: '', href: '/store/clubs/netball' },
  { name: 'Padel', image: '', href: '/store/clubs/padel' },
  { name: 'Darts', image: '', href: '/store/clubs/dartsteams' },
];

// Map sport slugs → route paths and display labels
const sportRouteMap: Record<string, { label: string; href: string }> = {
  rugby: { label: 'Rugby Clubs', href: '/store/clubs/rugbyclubs' },
  football: { label: 'Football Clubs', href: '/store/clubs/footballclubs' },
  softball: { label: 'Softball', href: '/store/clubs/softball-teams' },
  korfball: { label: 'Korfball', href: '/store/clubs/korfball' },
  netball: { label: 'Netball', href: '/store/clubs/netball' },
  padel: { label: 'Padel', href: '/store/clubs/padel' },
  horseball: { label: 'Horseball', href: '/store/clubs/horseball' },
  darts: { label: 'Darts', href: '/store/clubs/dartsteams' },
  charities: { label: 'Charities', href: '/store/clubs/charities' },
  cricket: { label: 'Cricket', href: '/store/clubs/cricket' },
  corporatestash: { label: 'Corporate Stash', href: '/store/clubs/corporatestash' },
  yourtradestash: { label: 'Your Trade Stash', href: '/store/clubs/yourtradestash' },
};

interface SportCategory {
  name: string;
  image: string;
  href: string;
}

export function SportCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [categories, setCategories] = useState<SportCategory[]>(fallbackCategories);

  useEffect(() => {
    async function loadSports() {
      try {
        const res = await fetch('/api/clubs');
        const data = await res.json();
        const clubs = data.clubs ?? [];

        // Group clubs by sport and pick the first club's logo as the sport image
        const sportMap: Record<string, string> = {};
        for (const club of clubs) {
          if (!sportMap[club.sport] && club.logoUrl) {
            sportMap[club.sport] = club.logoUrl;
          }
        }

        // Build the carousel items from actual sports in the database
        const dynamicCategories: SportCategory[] = Object.entries(sportMap).map(
          ([sport, image]) => {
            const route = sportRouteMap[sport] || {
              label: sport.charAt(0).toUpperCase() + sport.slice(1),
              href: `/store/clubs/${sport}`,
            };
            return { name: route.label, image, href: route.href };
          }
        );

        if (dynamicCategories.length > 0) {
          setCategories(dynamicCategories);
        }
      } catch {
        // Keep fallback data on error
      }
    }
    loadSports();
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const amount = 300;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -amount : amount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center justify-between mb-8"
        >
          <div>
            <h2 className="font-[var(--font-heading)] text-3xl md:text-4xl font-bold text-primary uppercase">
              Browse by Sport
            </h2>
            <p className="text-muted mt-1">Find your sport, find your stash</p>
          </div>
          <div className="hidden sm:flex gap-2">
            <button
              onClick={() => scroll('left')}
              className="w-10 h-10 rounded-xl bg-surface-alt border border-border hover:bg-primary hover:text-white flex items-center justify-center transition-all"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scroll('right')}
              className="w-10 h-10 rounded-xl bg-surface-alt border border-border hover:bg-primary hover:text-white flex items-center justify-center transition-all"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </motion.div>

        <div
          ref={scrollRef}
          className="flex gap-5 overflow-x-auto no-scrollbar pb-4"
        >
          {categories.map((cat, i) => (
            <motion.div
              key={cat.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="flex-shrink-0"
            >
              <Link
                href={cat.href}
                className="group block w-36 sm:w-44 text-center"
              >
                <div className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-full overflow-hidden border-4 border-border-light group-hover:border-accent transition-colors duration-300 mx-auto shadow-lg group-hover:shadow-xl bg-surface-alt">
                  {cat.image ? (
                    <Image
                      src={cat.image}
                      alt={cat.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                      sizes="176px"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-4xl text-muted">
                      🏅
                    </div>
                  )}
                </div>
                <p className="mt-3 font-[var(--font-heading)] text-sm font-bold text-foreground group-hover:text-accent transition-colors uppercase">
                  {cat.name}
                </p>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
