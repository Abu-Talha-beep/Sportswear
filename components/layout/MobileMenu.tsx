'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { X, ChevronDown, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { NavItem } from '@/types';

const fallbackNav: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'Club Shops', href: '/store/clubs', children: [] },
  { label: 'Shop', href: '/store', children: [] },
  { label: 'About', href: '/about' },
];

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const [navItems, setNavItems] = useState<NavItem[]>(fallbackNav);
  const [expandedItem, setExpandedItem] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/navigation')
      .then(r => r.json())
      .then(d => { if (d.navigation) setNavItems(d.navigation); })
      .catch(() => {});
  }, []);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            onClick={onClose}
          />

          {/* Menu panel */}
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-y-0 left-0 w-[85%] max-w-sm bg-white z-50 flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-border">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-xl bg-accent flex items-center justify-center">
                  <span className="text-white font-[var(--font-heading)] font-bold text-base">YCS</span>
                </div>
                <span className="font-[var(--font-heading)] text-lg font-bold text-primary uppercase tracking-wide">
                  Your Club Stash
                </span>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-xl hover:bg-surface-alt transition-colors"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Navigation Links */}
            <nav className="flex-1 overflow-y-auto py-4">
              {navItems.map((item) => (
                <div key={item.label} className="border-b border-border-light last:border-0">
                  {item.children ? (
                    <>
                      <button
                        onClick={() =>
                          setExpandedItem(expandedItem === item.label ? null : item.label)
                        }
                        className="flex items-center justify-between w-full px-6 py-4 text-left"
                      >
                        <span className="font-semibold text-foreground">{item.label}</span>
                        <ChevronDown
                          className={`w-5 h-5 text-muted transition-transform ${
                            expandedItem === item.label ? 'rotate-180' : ''
                          }`}
                        />
                      </button>

                      <AnimatePresence>
                        {expandedItem === item.label && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden bg-surface-alt"
                          >
                            {item.children.map((child) => (
                              <Link
                                key={child.href}
                                href={child.href}
                                className="flex items-center gap-2 px-8 py-3 text-sm text-foreground hover:text-accent transition-colors"
                                onClick={onClose}
                              >
                                <ChevronRight className="w-4 h-4 text-muted" />
                                {child.label}
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </>
                  ) : (
                    <Link
                      href={item.href}
                      className="block px-6 py-4 font-semibold text-foreground hover:text-accent transition-colors"
                      onClick={onClose}
                    >
                      {item.label}
                    </Link>
                  )}
                </div>
              ))}
            </nav>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
