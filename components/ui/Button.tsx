'use client';

import { ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'accent' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  children: ReactNode;
  fullWidth?: boolean;
}

const variants = {
  primary: 'bg-primary text-white hover:bg-primary-light shadow-lg hover:shadow-xl',
  secondary: 'bg-surface-alt text-foreground hover:bg-border border border-border',
  ghost: 'bg-transparent text-foreground hover:bg-surface-alt',
  accent: 'bg-accent text-white hover:bg-accent-dark shadow-lg hover:shadow-xl',
  outline: 'border-2 border-primary text-primary hover:bg-primary hover:text-white',
};

const sizes = {
  sm: 'px-4 py-2 text-xs',
  md: 'px-6 py-3 text-sm',
  lg: 'px-8 py-4 text-base',
};

export function Button({
  variant = 'primary',
  size = 'md',
  children,
  fullWidth,
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        'font-[var(--font-heading)] font-bold uppercase tracking-wider rounded-xl transition-all duration-200 active:scale-95 inline-flex items-center justify-center gap-2',
        variants[variant],
        sizes[size],
        fullWidth ? 'w-full' : '',
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
