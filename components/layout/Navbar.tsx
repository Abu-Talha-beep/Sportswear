'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { Search, ShoppingBag, User, Menu, X, ChevronDown } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import { MobileMenu } from './MobileMenu';
import { NavItem } from '@/types';

const defaultNav: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'Club Shops', href: '/store/clubs', children: [] },
  { label: 'Shop', href: '/store', children: [] },
  { label: 'About', href: '/about' },
];

export function Navbar() {
  const [navItems, setNavItems] = useState<NavItem[]>(defaultNav);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const totalItems = useCartStore((s) => s.totalItems);
  const openCart = useCartStore((s) => s.openCart);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function loadNav() {
      try {
        const res = await fetch('/api/navigation');
        const data = await res.json();
        if (data.navigation) {
          setNavItems(data.navigation);
        }
      } catch (err) {
        console.error('Failed to load navigation:', err);
      }
    }
    loadNav();
  }, []);

  // Track scroll for sticky effect
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setActiveDropdown(null);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  return (
    <>
      <header
        className={`sticky top-0 z-40 transition-all duration-300 w-full ${
          scrolled
            ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-border-light'
            : 'bg-white border-b border-border'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group flex-shrink-0" aria-label="Your Club Stash home">
              <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
                <span className="text-white font-[var(--font-heading)] font-bold text-lg">YCS</span>
              </div>
              <div className="hidden sm:block">
                <span className="font-[var(--font-heading)] text-xl font-bold text-primary tracking-wide uppercase">
                  Your Club Stash
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1 mx-4" ref={dropdownRef}>
              {navItems.map((item) => (
                <div key={item.label} className="relative">
                  {item.children && item.children.length > 0 ? (
                    <button
                      onClick={() =>
                        setActiveDropdown(activeDropdown === item.label ? null : item.label)
                      }
                      className={`flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                        activeDropdown === item.label
                          ? 'bg-primary text-white'
                          : 'text-foreground hover:bg-surface-alt'
                      }`}
                      aria-expanded={activeDropdown === item.label}
                    >
                      {item.label}
                      <ChevronDown
                        className={`w-4 h-4 transition-transform ${
                          activeDropdown === item.label ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                  ) : (
                    <Link
                      href={item.href || '/'}
                      className="px-4 py-2 rounded-lg text-sm font-semibold text-foreground hover:bg-surface-alt transition-all duration-200"
                    >
                      {item.label}
                    </Link>
                  )}

                  {/* Dropdown */}
                  {item.children && item.children.length > 0 && activeDropdown === item.label && (
                    <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-xl shadow-2xl border border-border-light overflow-hidden animate-in fade-in slide-in-from-top-2 z-50">
                      <div className="py-2">
                        {item.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className="block px-4 py-2.5 text-sm text-foreground hover:bg-accent hover:text-white transition-colors"
                            onClick={() => setActiveDropdown(null)}
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </nav>

            {/* Right actions */}
            <div className="flex items-center gap-2 flex-shrink-0">
              {/* Search */}
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="p-2.5 rounded-xl hover:bg-surface-alt transition-colors"
                aria-label="Search"
              >
                <Search className="w-5 h-5 text-foreground" />
              </button>

              {/* Account */}
              <Link
                href="/my-account"
                className="p-2.5 rounded-xl hover:bg-surface-alt transition-colors"
                aria-label="My account"
              >
                <User className="w-5 h-5 text-foreground" />
              </Link>

              {/* Cart */}
              <button
                onClick={openCart}
                className="relative p-2.5 rounded-xl hover:bg-surface-alt transition-colors"
                aria-label="Shopping cart"
              >
                <ShoppingBag className="w-5 h-5 text-foreground" />
                {totalItems() > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-accent text-white text-[10px] font-bold rounded-full flex items-center justify-center badge-pulse">
                    {totalItems()}
                  </span>
                )}
              </button>

              {/* Mobile menu toggle */}
              <button
                onClick={() => setMobileOpen(true)}
                className="lg:hidden p-2.5 rounded-xl hover:bg-surface-alt transition-colors"
                aria-label="Open menu"
              >
                <Menu className="w-5 h-5 text-foreground" />
              </button>
            </div>
          </div>

          {/* Search bar */}
          {searchOpen && (
            <div className="pb-4 animate-in fade-in slide-in-from-top-2">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted" />
                <input
                  type="text"
                  placeholder="Search products, clubs, categories..."
                  className="w-full pl-12 pr-12 py-3 bg-surface-alt rounded-xl border border-border focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none text-sm transition-all"
                  autoFocus
                />
                <button
                  onClick={() => setSearchOpen(false)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-lg hover:bg-border transition-colors"
                >
                  <X className="w-4 h-4 text-muted" />
                </button>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Mobile Menu */}
      <MobileMenu isOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}
