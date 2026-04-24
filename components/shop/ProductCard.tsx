'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Heart, ShoppingBag, Star } from 'lucide-react';
import { Product } from '@/types';
import { formatPrice } from '@/lib/utils';
import { Badge } from '@/components/ui/Card';
import { useCartStore } from '@/store/cartStore';
import { motion } from 'framer-motion';

interface ProductCardProps {
  product: Product;
  compact?: boolean;
}

export function ProductCard({ product, compact = false }: ProductCardProps) {
  const addItem = useCartStore((s) => s.addItem);
  const openCart = useCartStore((s) => s.openCart);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product, product.sizes[0] || 'M');
    openCart();
  };

  if (compact) {
    return (
      <Link href={`/product/${product.slug}`} className="group">
        <div className="relative aspect-square rounded-xl overflow-hidden bg-surface-alt">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-500"
            sizes="120px"
          />
        </div>
        <p className="text-xs font-medium text-foreground mt-1.5 truncate">{product.name}</p>
        <p className="text-xs font-bold text-accent">{formatPrice(product.price)}</p>
      </Link>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.4 }}
    >
      <Link href={`/product/${product.slug}`} className="group block">
        <div className="bg-surface rounded-2xl overflow-hidden border border-border-light hover:shadow-2xl hover:border-accent/20 transition-all duration-300">
          {/* Image */}
          <div className="relative aspect-square overflow-hidden bg-surface-alt">
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-700"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            />

            {/* Badge */}
            {product.badge && (
              <div className="absolute top-3 left-3">
                <Badge type={product.badge} />
              </div>
            )}

            {/* Quick actions overlay */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
            <div className="absolute bottom-3 left-3 right-3 flex gap-2 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
              <button
                onClick={handleQuickAdd}
                className="flex-1 py-2.5 bg-accent text-white text-xs font-bold uppercase rounded-xl hover:bg-accent-dark transition-colors flex items-center justify-center gap-1.5 shadow-lg"
                aria-label="Quick add to cart"
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                Quick Add
              </button>
              <button
                onClick={(e) => e.preventDefault()}
                className="p-2.5 bg-white rounded-xl hover:bg-red-50 transition-colors shadow-lg"
                aria-label="Add to wishlist"
              >
                <Heart className="w-4 h-4 text-foreground hover:text-accent" />
              </button>
            </div>
          </div>

          {/* Info */}
          <div className="p-4">
            <h3 className="font-semibold text-sm text-foreground group-hover:text-accent transition-colors line-clamp-2">
              {product.name}
            </h3>

            {/* Rating */}
            {product.rating && (
              <div className="flex items-center gap-1 mt-1.5">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3 h-3 ${
                        i < Math.floor(product.rating!) ? 'fill-amber-400 text-amber-400' : 'text-border'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-[10px] text-muted">({product.reviews})</span>
              </div>
            )}

            {/* Price */}
            <div className="flex items-center gap-2 mt-2">
              <span className="font-bold text-base text-foreground">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice && (
                <span className="text-sm text-muted line-through">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
