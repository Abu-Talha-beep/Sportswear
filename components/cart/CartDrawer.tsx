'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingBag, ArrowRight, Tag } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import { CartItemRow } from './CartItem';
import { formatPrice } from '@/lib/utils';
import { products as fallbackProducts } from '@/lib/data/products';
import { ProductCard } from '@/components/shop/ProductCard';
import { Product } from '@/types';

export function CartDrawer() {
  const { items, isOpen, closeCart, couponCode, setCouponCode, subtotal } =
    useCartStore();
  const [suggestions, setSuggestions] = useState<Product[]>([]);

  useEffect(() => {
    if (isOpen) {
      fetch('/api/products?limit=5')
        .then(res => res.json())
        .then(data => {
          if (data.products) {
            const cartIds = items.map((i) => i.product.id);
            setSuggestions(data.products.filter((p: Product) => !cartIds.includes(p.id)).slice(0, 3));
          }
        })
        .catch(() => {
          // fallback
          const cartIds = items.map((i) => i.product.id);
          setSuggestions(fallbackProducts.filter((p) => !cartIds.includes(p.id)).slice(0, 3));
        });
    }
  }, [isOpen, items]);

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
            onClick={closeCart}
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-y-0 right-0 w-full sm:w-[440px] bg-white z-50 flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-border">
              <div className="flex items-center gap-3">
                <ShoppingBag className="w-5 h-5 text-accent" />
                <h2 className="font-[var(--font-heading)] text-xl font-bold uppercase">
                  Your Cart ({items.length})
                </h2>
              </div>
              <button
                onClick={closeCart}
                className="p-2 rounded-xl hover:bg-surface-alt transition-colors"
                aria-label="Close cart"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Cart Content */}
            <div className="flex-1 overflow-y-auto">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full p-8 text-center">
                  <ShoppingBag className="w-16 h-16 text-border mb-4" />
                  <h3 className="font-[var(--font-heading)] text-xl font-bold uppercase text-foreground mb-2">
                    Your cart is empty
                  </h3>
                  <p className="text-sm text-muted mb-6">
                    Add some items to get started!
                  </p>
                  <button
                    onClick={closeCart}
                    className="px-6 py-3 bg-accent text-white font-[var(--font-heading)] font-bold uppercase rounded-xl hover:bg-accent-dark transition-colors"
                  >
                    Continue Shopping
                  </button>
                </div>
              ) : (
                <div className="p-4 space-y-4">
                  {/* Cart Items */}
                  {items.map((item) => (
                    <CartItemRow
                      key={`${item.product.id}-${item.size}`}
                      item={item}
                    />
                  ))}

                  {/* Coupon Code */}
                  <div className="flex gap-2 pt-2">
                    <div className="relative flex-1">
                      <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
                      <input
                        type="text"
                        placeholder="Coupon code"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 bg-surface-alt rounded-xl border border-border text-sm focus:border-accent focus:outline-none"
                      />
                    </div>
                    <button className="px-4 py-3 bg-primary text-white text-sm font-bold rounded-xl hover:bg-primary-light transition-colors">
                      Apply
                    </button>
                  </div>

                  {/* Suggestions */}
                  {suggestions.length > 0 && (
                    <div className="pt-4 border-t border-border">
                      <h4 className="font-[var(--font-heading)] text-sm font-bold uppercase text-muted mb-3">
                        You might also like
                      </h4>
                      <div className="grid grid-cols-3 gap-2">
                        {suggestions.map((product) => (
                          <ProductCard key={product.id} product={product} compact />
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-border p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-muted">Subtotal</span>
                  <span className="text-xl font-bold text-foreground">
                    {formatPrice(subtotal())}
                  </span>
                </div>
                <p className="text-xs text-muted">Shipping calculated at checkout</p>
                <button className="w-full py-4 bg-accent text-white font-[var(--font-heading)] text-lg font-bold uppercase rounded-xl hover:bg-accent-dark transition-colors flex items-center justify-center gap-2 shadow-lg">
                  Checkout <ArrowRight className="w-5 h-5" />
                </button>
                <button
                  onClick={closeCart}
                  className="w-full py-3 text-sm font-semibold text-muted hover:text-foreground transition-colors text-center"
                >
                  Continue Shopping
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
