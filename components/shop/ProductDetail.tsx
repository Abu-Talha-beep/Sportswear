'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Minus, Plus, ShoppingBag, Heart, Star, Truck, RotateCcw, Shield } from 'lucide-react';
import { Product } from '@/types';
import { useCartStore } from '@/store/cartStore';
import { formatPrice } from '@/lib/utils';
import { Badge } from '@/components/ui/Card';
import { ProductCard } from '@/components/shop/ProductCard';

interface ProductDetailProps {
  product: Product;
  relatedProducts: Product[];
}

export function ProductDetail({ product, relatedProducts }: ProductDetailProps) {
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const [activeTab, setActiveTab] = useState<'description' | 'size-guide' | 'delivery'>('description');

  const addItem = useCartStore((s) => s.addItem);
  const openCart = useCartStore((s) => s.openCart);

  const handleAddToCart = () => {
    const size = selectedSize || product.sizes[0] || 'One Size';
    addItem(product, size, quantity, selectedColor || undefined);
    openCart();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
      {/* Breadcrumb */}
      <nav className="text-sm text-muted mb-8">
        <Link href="/" className="hover:text-accent">Home</Link>
        <span className="mx-2">/</span>
        <Link href="/store" className="hover:text-accent">Shop</Link>
        <span className="mx-2">/</span>
        <span className="text-foreground font-medium">{product.name}</span>
      </nav>

      {/* Product section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
        {/* Image Gallery */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Main image */}
          <div className="relative aspect-square rounded-2xl overflow-hidden bg-surface-alt border border-border-light mb-4">
            <Image
              src={product.images[activeImage]}
              alt={product.name}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
            {product.badge && (
              <div className="absolute top-4 left-4">
                <Badge type={product.badge} />
              </div>
            )}
          </div>

          {/* Thumbnails */}
          {product.images.length > 1 && (
            <div className="flex gap-3">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImage(i)}
                  className={`relative w-20 h-20 rounded-xl overflow-hidden border-2 transition-colors ${
                    activeImage === i ? 'border-accent' : 'border-border-light hover:border-muted'
                  }`}
                >
                  <Image src={img} alt={`${product.name} ${i + 1}`} fill className="object-cover" sizes="80px" />
                </button>
              ))}
            </div>
          )}
        </motion.div>

        {/* Product Info */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <h1 className="font-[var(--font-heading)] text-3xl md:text-4xl font-bold text-primary uppercase">
            {product.name}
          </h1>

          {/* Rating */}
          {product.rating && (
            <div className="flex items-center gap-2 mt-3">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.floor(product.rating!) ? 'fill-amber-400 text-amber-400' : 'text-border'
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-muted">({product.reviews} reviews)</span>
            </div>
          )}

          {/* Price */}
          <div className="flex items-center gap-3 mt-4">
            <span className="text-3xl font-bold text-foreground">{formatPrice(product.price)}</span>
            {product.originalPrice && (
              <>
                <span className="text-xl text-muted line-through">{formatPrice(product.originalPrice)}</span>
                <span className="px-3 py-1 bg-accent/10 text-accent text-sm font-bold rounded-full">
                  Save {formatPrice(product.originalPrice - product.price)}
                </span>
              </>
            )}
          </div>

          {/* Description */}
          <p className="text-muted mt-4 leading-relaxed">{product.description}</p>

          {/* Size selector */}
          {product.sizes.length > 0 && (
            <div className="mt-6">
              <label className="text-sm font-semibold text-foreground block mb-3">Size</label>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`min-w-[48px] px-4 py-2.5 rounded-xl text-sm font-semibold border-2 transition-all ${
                      selectedSize === size
                        ? 'border-accent bg-accent text-white'
                        : 'border-border bg-surface text-foreground hover:border-accent'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Color selector */}
          {product.colors && product.colors.length > 0 && (
            <div className="mt-6">
              <label className="text-sm font-semibold text-foreground block mb-3">Colour</label>
              <div className="flex flex-wrap gap-2">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`px-4 py-2.5 rounded-xl text-sm font-semibold border-2 transition-all ${
                      selectedColor === color
                        ? 'border-accent bg-accent text-white'
                        : 'border-border bg-surface text-foreground hover:border-accent'
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity */}
          <div className="mt-6">
            <label className="text-sm font-semibold text-foreground block mb-3">Quantity</label>
            <div className="inline-flex items-center bg-surface-alt rounded-xl border border-border">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="p-3 hover:bg-border rounded-l-xl transition-colors"
                aria-label="Decrease quantity"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="w-14 text-center font-bold text-lg">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="p-3 hover:bg-border rounded-r-xl transition-colors"
                aria-label="Increase quantity"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Add to cart */}
          <div className="flex gap-3 mt-8">
            <button
              onClick={handleAddToCart}
              className="flex-1 py-4 bg-accent text-white font-[var(--font-heading)] text-lg font-bold uppercase rounded-xl hover:bg-accent-dark transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-3 active:scale-95"
            >
              <ShoppingBag className="w-5 h-5" />
              Add to Cart
            </button>
            <button
              className="p-4 bg-surface border-2 border-border rounded-xl hover:border-accent hover:text-accent transition-all"
              aria-label="Add to wishlist"
            >
              <Heart className="w-5 h-5" />
            </button>
          </div>

          {/* Trust badges */}
          <div className="grid grid-cols-3 gap-4 mt-8 pt-8 border-t border-border">
            {[
              { icon: Truck, text: 'Free delivery over £50' },
              { icon: RotateCcw, text: '30-day returns' },
              { icon: Shield, text: 'Secure checkout' },
            ].map(({ icon: Icon, text }) => (
              <div key={text} className="text-center">
                <Icon className="w-5 h-5 mx-auto text-accent mb-1.5" />
                <p className="text-[11px] text-muted font-medium">{text}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Product Tabs */}
      <div className="mt-16">
        <div className="flex gap-1 border-b border-border">
          {(['description', 'size-guide', 'delivery'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 font-[var(--font-heading)] font-bold uppercase text-sm transition-colors border-b-2 ${
                activeTab === tab
                  ? 'border-accent text-accent'
                  : 'border-transparent text-muted hover:text-foreground'
              }`}
            >
              {tab === 'size-guide' ? 'Size Guide' : tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
        <div className="py-8">
          {activeTab === 'description' && (
            <div className="max-w-3xl text-muted leading-relaxed space-y-4">
              <p>{product.description}</p>
              <p>All our products are made from premium materials and designed to withstand the rigours of competitive sport. Each item undergoes strict quality control before shipping.</p>
            </div>
          )}
          {activeTab === 'size-guide' && (
            <div className="max-w-3xl">
              <p className="text-muted mb-4">Please refer to the size chart below. If you&apos;re between sizes, we recommend sizing up.</p>
              <div className="overflow-x-auto">
                <table className="w-full text-sm border border-border rounded-xl overflow-hidden">
                  <thead className="bg-primary text-white">
                    <tr>
                      <th className="px-4 py-3 text-left font-semibold">Size</th>
                      <th className="px-4 py-3 text-left font-semibold">Chest (inches)</th>
                      <th className="px-4 py-3 text-left font-semibold">Waist (inches)</th>
                      <th className="px-4 py-3 text-left font-semibold">Length (inches)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ['XS', '34-36', '28-30', '26'],
                      ['S', '36-38', '30-32', '27'],
                      ['M', '38-40', '32-34', '28'],
                      ['L', '40-42', '34-36', '29'],
                      ['XL', '42-44', '36-38', '30'],
                      ['XXL', '44-46', '38-40', '31'],
                    ].map(([size, chest, waist, length]) => (
                      <tr key={size} className="border-t border-border hover:bg-surface-alt">
                        <td className="px-4 py-3 font-semibold">{size}</td>
                        <td className="px-4 py-3 text-muted">{chest}</td>
                        <td className="px-4 py-3 text-muted">{waist}</td>
                        <td className="px-4 py-3 text-muted">{length}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
          {activeTab === 'delivery' && (
            <div className="max-w-3xl text-muted leading-relaxed space-y-4">
              <p><strong className="text-foreground">Standard Delivery:</strong> 3-5 working days — £3.99 (FREE over £50)</p>
              <p><strong className="text-foreground">Express Delivery:</strong> 1-2 working days — £7.99</p>
              <p><strong className="text-foreground">International:</strong> 7-14 working days — from £12.99</p>
              <p>All orders are dispatched from our UK warehouse. You will receive tracking details via email once your order has been shipped.</p>
            </div>
          )}
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="mt-16 pt-12 border-t border-border">
          <h2 className="font-[var(--font-heading)] text-2xl md:text-3xl font-bold text-primary uppercase mb-8">
            You Might Also Like
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
