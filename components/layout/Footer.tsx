'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { footerLinks } from '@/lib/data/navigation';

export function Footer() {
  return (
    <footer className="bg-primary text-white">
      {/* Email Signup Banner */}
      <div className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="font-[var(--font-heading)] text-2xl md:text-3xl font-bold uppercase">
              Stay in the Game
            </h3>
            <p className="text-white/70 mt-1 text-sm">
              Get exclusive offers, new arrivals & kit inspiration straight to your inbox.
            </p>
          </div>
          <div className="flex w-full md:w-auto">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 md:w-72 px-4 py-3 bg-white/10 border border-white/20 rounded-l-xl text-sm text-white placeholder:text-white/50 focus:outline-none focus:border-accent"
            />
            <Link
              href="/email-signup"
              className="px-6 py-3 bg-accent hover:bg-accent-dark rounded-r-xl font-[var(--font-heading)] font-bold text-sm uppercase tracking-wider transition-colors flex items-center gap-2"
            >
              Join <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* About */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-xl bg-accent flex items-center justify-center">
                <span className="text-white font-[var(--font-heading)] font-bold text-base">YCS</span>
              </div>
              <span className="font-[var(--font-heading)] text-lg font-bold uppercase tracking-wide">
                Your Club Stash
              </span>
            </div>
            <p className="text-white/60 text-sm leading-relaxed">
              UK-based supplier of activewear, leisurewear, and sporting goods for sports clubs,
              schools, businesses, and charities.
            </p>
            {/* Social */}
            <div className="flex gap-3 mt-5">
              {[
                { label: 'Fb', text: 'Facebook', href: '#' },
                { label: 'Ig', text: 'Instagram', href: '#' },
                { label: 'X', text: 'Twitter / X', href: '#' },
                { label: '✉', text: 'Email', href: 'mailto:info@yourclubstash.co.uk' },
              ].map((social) => (
                <a
                  key={social.text}
                  href={social.href}
                  className="w-10 h-10 rounded-xl bg-white/10 hover:bg-accent flex items-center justify-center transition-colors text-xs font-bold"
                  aria-label={social.text}
                >
                  {social.label}
                </a>
              ))}
            </div>
          </div>

          {/* Help */}
          <div>
            <h4 className="font-[var(--font-heading)] text-lg font-bold uppercase mb-4 text-accent">
              Help
            </h4>
            <ul className="space-y-3">
              {footerLinks.help.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/60 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-[var(--font-heading)] text-lg font-bold uppercase mb-4 text-accent">
              Legal
            </h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/60 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Payment & Trust */}
          <div>
            <h4 className="font-[var(--font-heading)] text-lg font-bold uppercase mb-4 text-accent">
              Secure Payments
            </h4>
            <div className="flex flex-wrap gap-3">
              {['Visa', 'Mastercard', 'Apple Pay', 'Google Pay', 'PayPal'].map((method) => (
                <div
                  key={method}
                  className="px-3 py-2 bg-white/10 rounded-lg text-xs font-medium text-white/70"
                >
                  {method}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-white/40">
            Copyright 2026 © Your Club Stash. All rights reserved.
          </p>
          <p className="text-xs text-white/40">
            Made with ❤️ for the sports community
          </p>
        </div>
      </div>
    </footer>
  );
}
