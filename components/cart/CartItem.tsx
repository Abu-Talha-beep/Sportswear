'use client';

import Image from 'next/image';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { CartItem } from '@/types';
import { useCartStore } from '@/store/cartStore';
import { formatPrice } from '@/lib/utils';

interface CartItemRowProps {
  item: CartItem;
}

export function CartItemRow({ item }: CartItemRowProps) {
  const { updateQuantity, removeItem } = useCartStore();
  const { product, quantity, size } = item;

  return (
    <div className="flex gap-4 p-3 bg-surface-alt rounded-xl">
      {/* Product Image */}
      <div className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 bg-border-light">
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          className="object-cover"
          sizes="80px"
        />
      </div>

      {/* Details */}
      <div className="flex-1 min-w-0">
        <h4 className="font-semibold text-sm text-foreground truncate">{product.name}</h4>
        <p className="text-xs text-muted mt-0.5">Size: {size}</p>
        <div className="flex items-center justify-between mt-2">
          {/* Quantity controls */}
          <div className="flex items-center gap-1 bg-white rounded-lg border border-border">
            <button
              onClick={() => updateQuantity(product.id, size, quantity - 1)}
              className="p-1.5 hover:bg-surface-alt rounded-l-lg transition-colors"
              aria-label="Decrease quantity"
            >
              <Minus className="w-3 h-3" />
            </button>
            <span className="w-8 text-center text-xs font-bold">{quantity}</span>
            <button
              onClick={() => updateQuantity(product.id, size, quantity + 1)}
              className="p-1.5 hover:bg-surface-alt rounded-r-lg transition-colors"
              aria-label="Increase quantity"
            >
              <Plus className="w-3 h-3" />
            </button>
          </div>

          {/* Price */}
          <span className="font-bold text-sm text-foreground">
            {formatPrice(product.price * quantity)}
          </span>
        </div>
      </div>

      {/* Remove */}
      <button
        onClick={() => removeItem(product.id, size)}
        className="p-1.5 self-start rounded-lg hover:bg-red-50 hover:text-accent transition-colors"
        aria-label="Remove item"
      >
        <Trash2 className="w-4 h-4 text-muted hover:text-accent" />
      </button>
    </div>
  );
}
