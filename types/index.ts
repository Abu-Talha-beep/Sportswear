// ═══════════════════════════════════════════
// TYPE DEFINITIONS — Your Club Stash
// ═══════════════════════════════════════════

export interface Product {
  id: string;
  slug: string;
  name: string;
  price: number;
  originalPrice?: number;
  category: string;
  subcategory?: string;
  clubSlug?: string;
  images: string[];
  sizes: string[];
  colors?: string[];
  description: string;
  badge?: 'sale' | 'new' | 'featured' | 'top';
  inStock: boolean;
  rating?: number;
  reviews?: number;
}

export interface Club {
  slug: string;
  name: string;
  sport: string;
  logoUrl: string;
  href: string;
  description?: string;
  featured?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
  size: string;
  color?: string;
}

export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

export interface Banner {
  id: string;
  title: string;
  subtitle?: string;
  image: string;
  href: string;
  cta?: string;
}

export interface SportCategory {
  name: string;
  slug: string;
  image: string;
  href: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface StashBuilderStep {
  id: number;
  title: string;
  description: string;
}
