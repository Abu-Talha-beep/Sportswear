'use client';

import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

export function Card({ children, className, hover = true }: CardProps) {
  return (
    <div
      className={cn(
        'bg-surface rounded-2xl overflow-hidden border border-border-light',
        hover && 'hover:shadow-xl hover:-translate-y-1 transition-all duration-300',
        className
      )}
    >
      {children}
    </div>
  );
}

interface BadgeProps {
  type: 'sale' | 'new' | 'featured' | 'top';
  className?: string;
}

const badgeColors = {
  sale: 'bg-accent text-white',
  new: 'bg-emerald-500 text-white',
  featured: 'bg-amber-500 text-white',
  top: 'bg-info text-white',
};

export function Badge({ type, className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-block px-3 py-1 text-[10px] font-bold uppercase tracking-wider rounded-full',
        badgeColors[type],
        className
      )}
    >
      {type === 'sale' ? 'Sale' : type === 'new' ? 'New' : type === 'featured' ? 'Featured' : 'Top'}
    </span>
  );
}
