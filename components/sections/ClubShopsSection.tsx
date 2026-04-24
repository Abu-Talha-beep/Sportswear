'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Club } from '@/types';

const sportSections = [
  { sport: 'rugby', label: 'Rugby Clubs', href: '/store/clubs/rugbyclubs' },
  { sport: 'football', label: 'Football Clubs', href: '/store/clubs/footballclubs' },
  { sport: 'softball', label: 'Softball Teams', href: '/store/clubs/softball-teams' },
  { sport: 'korfball', label: 'Korfball, Netball & Padel', href: '/store/clubs/korfball', combineSports: ['korfball', 'netball', 'padel'] },

];

export function ClubShopsSection() {
  const [clubsBySport, setClubsBySport] = useState<Record<string, Club[]>>({});

  useEffect(() => {
    async function fetchClubs() {
      try {
        const res = await fetch('/api/clubs');
        const data = await res.json();
        const allClubs: Club[] = data.clubs ?? [];
        // Group clubs by sport
        const grouped: Record<string, Club[]> = {};
        for (const club of allClubs) {
          if (!grouped[club.sport]) grouped[club.sport] = [];
          grouped[club.sport].push(club);
        }
        setClubsBySport(grouped);
      } catch {
        // Fallback: leave empty, the sections just won't render
      }
    }
    fetchClubs();
  }, []);

  return (
    <section className="py-16 bg-surface-alt">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-[var(--font-heading)] text-3xl md:text-4xl font-bold text-primary uppercase">
            Club Shops
          </h2>
          <p className="text-muted mt-2">Find your club and shop their official range</p>
        </motion.div>

        <div className="space-y-12">
          {sportSections.map((section, sIdx) => {
            const sportClubs = section.combineSports
              ? section.combineSports.flatMap((s) => clubsBySport[s] || [])
              : clubsBySport[section.sport] || [];

            if (sportClubs.length === 0) return null;

            return (
              <motion.div
                key={section.sport}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: sIdx * 0.1 }}
              >
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-[var(--font-heading)] text-xl font-bold text-primary uppercase tracking-wider">
                    {section.label}
                  </h3>
                  <Link
                    href={section.href}
                    className="text-sm font-semibold text-accent hover:text-accent-dark transition-colors"
                  >
                    View All →
                  </Link>
                </div>

                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4">
                  {sportClubs.map((club, i) => (
                    <motion.div
                      key={club.slug}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.05 }}
                    >
                      <Link
                        href={club.href}
                        className="group block bg-white rounded-2xl p-4 border-2 border-transparent hover:border-accent hover:shadow-lg transition-all duration-300 text-center"
                      >
                        <div className="relative w-full aspect-square rounded-xl overflow-hidden bg-surface-alt mb-3">
                          {club.logoUrl ? (
                            <Image
                              src={club.logoUrl}
                              alt={club.name}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform duration-300"
                              sizes="150px"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-3xl text-muted">🏅</div>
                          )}
                        </div>
                        <p className="text-xs font-semibold text-foreground group-hover:text-accent transition-colors truncate">
                          {club.name}
                        </p>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            );
          })}
          {(() => {
            const explicitlyHandledSports = new Set(['rugby', 'football', 'softball', 'korfball', 'netball', 'padel']);
            const otherClubs = Object.entries(clubsBySport)
              .filter(([sport]) => !explicitlyHandledSports.has(sport))
              .flatMap(([, clubs]) => clubs);

            if (otherClubs.length === 0) return null;

            return (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: sportSections.length * 0.1 }}
              >
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-[var(--font-heading)] text-xl font-bold text-primary uppercase tracking-wider">
                    Other Shops
                  </h3>
                  <Link
                    href="/store/clubs"
                    className="text-sm font-semibold text-accent hover:text-accent-dark transition-colors"
                  >
                    View All →
                  </Link>
                </div>

                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4">
                  {otherClubs.map((club, i) => (
                    <motion.div
                      key={club.slug}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.05 }}
                    >
                      <Link
                        href={club.href}
                        className="group block bg-white rounded-2xl p-4 border-2 border-transparent hover:border-accent hover:shadow-lg transition-all duration-300 text-center"
                      >
                        <div className="relative w-full aspect-square rounded-xl overflow-hidden bg-surface-alt mb-3">
                          {club.logoUrl ? (
                            <Image
                              src={club.logoUrl}
                              alt={club.name}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform duration-300"
                              sizes="150px"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-3xl text-muted">🏅</div>
                          )}
                        </div>
                        <p className="text-xs font-semibold text-foreground group-hover:text-accent transition-colors truncate">
                          {club.name}
                        </p>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            );
          })()}
        </div>
      </div>
    </section>
  );
}
