'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { TreePine, Sparkles } from 'lucide-react';

export function HalfBannerRow() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Sustainability Banner */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <Link
            href="/sustainability"
            className="group relative block h-48 sm:h-56 rounded-2xl overflow-hidden bg-gradient-to-br from-emerald-600 to-emerald-900"
          >
            <div className="absolute inset-0 flex items-center p-8">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <TreePine className="w-5 h-5 text-emerald-300" />
                  <span className="text-emerald-300 text-xs font-bold uppercase tracking-wider">
                    Sustainability
                  </span>
                </div>
                <h3 className="font-[var(--font-heading)] text-2xl sm:text-3xl font-bold text-white uppercase">
                  A Tree for Every Order
                </h3>
                <p className="text-emerald-200/80 text-sm mt-2">
                  Over 10,000 trees planted and counting 🌳
                </p>
              </div>
            </div>
            <div className="absolute right-4 bottom-4 text-[120px] opacity-10 select-none">
              🌳
            </div>
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
          </Link>
        </motion.div>

        {/* New Arrivals Banner */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <Link
            href="/store/shop/activewear"
            className="group relative block h-48 sm:h-56 rounded-2xl overflow-hidden bg-gradient-to-br from-accent to-primary"
          >
            <div className="absolute inset-0 flex items-center p-8">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="w-5 h-5 text-amber-300" />
                  <span className="text-amber-300 text-xs font-bold uppercase tracking-wider">
                    Just Dropped
                  </span>
                </div>
                <h3 className="font-[var(--font-heading)] text-2xl sm:text-3xl font-bold text-white uppercase">
                  New Season 2026
                </h3>
                <p className="text-white/70 text-sm mt-2">
                  Explore the latest activewear collection
                </p>
              </div>
            </div>
            <div className="absolute right-4 bottom-4 text-[120px] opacity-10 select-none">
              ⚡
            </div>
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
