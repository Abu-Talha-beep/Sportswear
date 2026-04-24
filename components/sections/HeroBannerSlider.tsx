'use client';

import { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

interface Banner {
  id: string;
  title: string;
  subtitle: string;
  cta_text: string;
  cta_href: string;
  gradient: string;
  image_url?: string;
}

const defaultBanners: Banner[] = [
  {
    id: '1',
    title: 'Upgrade Your Game',
    subtitle: 'High-quality sports kits for every club',
    cta_text: 'Shop Now',
    cta_href: '/store',
    gradient: 'from-primary via-primary-light to-accent',
  },
  {
    id: '2',
    title: 'Custom Kit Builder',
    subtitle: 'Design your team\'s unique identity',
    cta_text: 'Explore Clubs',
    cta_href: '/store/clubs',
    gradient: 'from-accent via-accent-dark to-primary',
  },
  {
    id: '3',
    title: 'New Season Collections',
    subtitle: 'Fresh drops for 2026 — be the first',
    cta_text: 'Explore',
    cta_href: '/store/shop/activewear',
    gradient: 'from-emerald-700 via-emerald-900 to-primary',
  },
  {
    id: '4',
    title: 'Outlet Sale — Up to 50% Off',
    subtitle: 'Premium kit at unbeatable prices',
    cta_text: 'Shop Outlet',
    cta_href: '/store/shop/the-ycs-outlet',
    gradient: 'from-amber-600 via-orange-700 to-primary',
  },
];

const emojis = ['⚡', '🎨', '🔥', '💰', '🏆', '⚽', '🏉'];

export function HeroBannerSlider() {
  const [banners, setBanners] = useState<Banner[]>(defaultBanners);
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    async function fetchBanners() {
      try {
        const res = await fetch('/api/banners');
        const data = await res.json();
        if (data.banners && data.banners.length > 0) {
          setBanners(data.banners);
          setCurrent(0);
        }
      } catch {
        // fallback to default
      }
    }
    fetchBanners();
  }, []);

  const goToNext = useCallback(() => {
    setDirection(1);
    setCurrent((prev) => (prev + 1) % banners.length);
  }, [banners.length]);

  const goToPrev = () => {
    setDirection(-1);
    setCurrent((prev) => (prev - 1 + banners.length) % banners.length);
  };

  // Auto-rotation
  useEffect(() => {
    const interval = setInterval(goToNext, 5000);
    return () => clearInterval(interval);
  }, [goToNext]);

  const variants = {
    enter: (dir: number) => ({ x: dir > 0 ? '100%' : '-100%', opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? '-100%' : '100%', opacity: 0 }),
  };

  if (!banners.length) return null;

  return (
    <section className="relative w-full h-[280px] sm:h-[360px] lg:h-[380px] overflow-hidden" aria-label="Hero banner">
      <AnimatePresence initial={false} custom={direction} mode="wait">
        <motion.div
          key={banners[current].id}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          className={`absolute inset-0 bg-gradient-to-br ${banners[current].gradient || 'from-primary to-accent'}`}
        >
          {banners[current].image_url ? (
            <div
              className="absolute inset-0 bg-center bg-cover"
              style={{ backgroundImage: `url(${banners[current].image_url})` }}
            />
          ) : null}

          {/* Improve text contrast regardless of image brightness */}
          <div className="absolute inset-0 bg-black/35" />

          {/* Decorative elements */}
          <div className="absolute inset-0">
            <div className="absolute top-10 right-10 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
            <div className="absolute bottom-10 left-10 w-64 h-64 bg-white/5 rounded-full blur-2xl" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[200px] sm:text-[300px] opacity-5 select-none">
              {emojis[current % emojis.length]}
            </div>
          </div>

          {/* Content */}
          <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 flex items-center">
            <div className="max-w-2xl">
              <motion.h1
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="font-[var(--font-heading)] text-3xl sm:text-4xl lg:text-6xl font-bold text-white uppercase leading-none"
              >
                {banners[current].title}
              </motion.h1>
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="text-base sm:text-lg text-white/80 mt-3 max-w-lg"
              >
                {banners[current].subtitle}
              </motion.p>
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                <Link
                  href={banners[current].cta_href || '#'}
                  className="inline-block mt-6 px-8 py-4 bg-white text-primary font-[var(--font-heading)] font-bold text-lg uppercase rounded-xl hover:bg-accent hover:text-white transition-all duration-300 shadow-2xl hover:shadow-accent/30 hover:scale-105"
                >
                  {banners[current].cta_text || 'Shop Now'}
                </Link>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation arrows */}
      <button
        onClick={goToPrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors z-10"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={goToNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors z-10"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Dot indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {banners.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              setDirection(i > current ? 1 : -1);
              setCurrent(i);
            }}
            className={`h-2 rounded-full transition-all duration-300 ${
              i === current ? 'w-8 bg-white' : 'w-2 bg-white/40 hover:bg-white/60'
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
