'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface CategoryTile {
  title: string;
  image: string;
  href: string;
  color: string;
}

const defaultTiles: Record<string, Partial<CategoryTile>> = {
  leisurewear: {
    image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&h=800&fit=crop&q=80',
    color: 'from-primary/90 to-primary/50',
  },
  activewear: {
    image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&h=800&fit=crop&q=80',
    color: 'from-accent/90 to-accent/50',
  },
  playerequipment: {
    image: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=800&h=800&fit=crop&q=80',
    color: 'from-gray-900/90 to-gray-700/50',
  },
  fashionwear: {
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&h=800&fit=crop&q=80',
    color: 'from-purple-800/90 to-purple-600/50',
  },
  rugbygear: {
    image: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=800&h=800&fit=crop&q=80',
    color: 'from-teal-800/90 to-teal-600/50',
  },
};

const fallbackTiles: CategoryTile[] = [
  {
    title: 'Leisurewear',
    image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&h=800&fit=crop&q=80',
    href: '/store/shop/leisurewear',
    color: 'from-primary/90 to-primary/50',
  },
  {
    title: 'Activewear',
    image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&h=800&fit=crop&q=80',
    href: '/store/shop/activewear',
    color: 'from-accent/90 to-accent/50',
  },
  {
    title: 'Player Equipment',
    image: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=800&h=800&fit=crop&q=80',
    href: '/store/shop/playerequipment',
    color: 'from-gray-900/90 to-gray-700/50',
  },
];

export function CategoryTiles() {
  const [tiles, setTiles] = useState<CategoryTile[]>(fallbackTiles);

  useEffect(() => {
    async function loadCategories() {
      try {
        const res = await fetch('/api/categories');
        const data = await res.json();
        if (data.categories && data.categories.length > 0) {
          const dynamicTiles = data.categories.map((cat: any) => {
            const defaults = defaultTiles[cat.slug] || {
              image: 'https://images.unsplash.com/photo-1518002171953-a080ee817e1f?w=800&h=800&fit=crop&q=80', // generic sports
              color: 'from-slate-800/90 to-slate-600/50',
            };
            return {
              title: cat.name,
              href: `/store/shop/${cat.slug}`,
              ...defaults,
            };
          });
          setTiles(dynamicTiles);
        }
      } catch {
        // use fallbacks
      }
    }
    loadCategories();
  }, []);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-8"
      >
        <h2 className="font-[var(--font-heading)] text-3xl md:text-4xl font-bold text-primary uppercase">
          Shop by Category
        </h2>
        <p className="text-muted mt-2">Find exactly what your team needs</p>
      </motion.div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
        {tiles.map((tile, i) => (
          <motion.div
            key={tile.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.4 }}
          >
            <Link
              href={tile.href}
              className="group relative block aspect-[3/2] rounded-2xl overflow-hidden"
            >
              <Image
                src={tile.image}
                alt={tile.title}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-700"
                sizes="(max-width: 768px) 50vw, 33vw"
              />
              {/* Overlay */}
              <div className={`absolute inset-0 bg-gradient-to-t ${tile.color} group-hover:opacity-80 transition-opacity`} />
              {/* Title */}
              <div className="absolute inset-0 flex items-end p-5">
                <h3 className="font-[var(--font-heading)] text-xl sm:text-2xl font-bold text-white uppercase">
                  {tile.title}
                </h3>
              </div>
              {/* Hover border */}
              <div className="absolute inset-0 border-4 border-transparent group-hover:border-white/30 rounded-2xl transition-colors duration-300" />
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
