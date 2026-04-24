'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { Plus, Pencil, Trash2, Search, X, Save, Loader2 } from 'lucide-react';
import { ImageUploader } from '@/components/admin/ImageUploader';

interface Product {
  id?: string;
  slug: string;
  name: string;
  description: string;
  price: number;
  original_price?: number | null;
  category_slug: string;
  club_id?: string | null;
  sizes: string[];
  colors: string[];
  images: string[];
  badge?: string | null;
  in_stock: boolean;
  stock_count: number;
  is_active: boolean;
  sort_order: number;
}

const EMPTY_PRODUCT: Product = {
  slug: '', name: '', description: '', price: 0, original_price: null,
  category_slug: 'activewear', club_id: null, sizes: [], colors: [],
  images: [], badge: null, in_stock: true, stock_count: 100, is_active: true, sort_order: 0,
};

const CATEGORIES = [
  'activewear', 'leisurewear', 'fashionwear', 'playerequipment',
  'rugbygear', 'pvidapadel', 'gift-cards', 'outlet',
];

const BADGES = ['', 'new', 'sale', 'featured', 'top'];

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [catFilter, setCatFilter] = useState('');
  const [editing, setEditing] = useState<Product | null>(null);
  const [saving, setSaving] = useState(false);
  const [sizeInput, setSizeInput] = useState('');
  const [colorInput, setColorInput] = useState('');

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (search) params.set('search', search);
      if (catFilter) params.set('category', catFilter);
      const res = await fetch(`/api/admin/products?${params}`);
      const data = await res.json();
      setProducts(data.products ?? []);
    } catch { /* empty */ }
    setLoading(false);
  }, [search, catFilter]);

  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { fetchProducts(); }, [fetchProducts]);

  const handleSave = async () => {
    if (!editing) return;
    setSaving(true);
    try {
      const res = await fetch('/api/admin/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editing),
      });
      if (res.ok) {
        setEditing(null);
        fetchProducts();
      }
    } catch { /* empty */ }
    setSaving(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this product permanently?')) return;
    try {
      await fetch('/api/admin/products', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });
      fetchProducts();
    } catch { /* empty */ }
  };

  const addSize = () => {
    if (!sizeInput.trim() || !editing) return;
    setEditing({ ...editing, sizes: [...editing.sizes, sizeInput.trim()] });
    setSizeInput('');
  };

  const addColor = () => {
    if (!colorInput.trim() || !editing) return;
    setEditing({ ...editing, colors: [...editing.colors, colorInput.trim()] });
    setColorInput('');
  };

  // ── EDIT MODAL ──
  if (editing) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="font-[var(--font-heading)] text-2xl font-bold text-primary uppercase">
            {editing.id ? 'Edit Product' : 'Add New Product'}
          </h1>
          <button onClick={() => setEditing(null)} className="flex items-center gap-1 text-sm text-muted hover:text-foreground">
            <X className="w-4 h-4" /> Cancel
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left column — main fields */}
          <div className="lg:col-span-2 space-y-5">
            <div className="rounded-2xl border border-border bg-surface p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-1">Product Name *</label>
                  <input value={editing.name} onChange={(e) => setEditing({ ...editing, name: e.target.value })}
                    className="w-full rounded-xl border border-border px-4 py-2.5 text-sm bg-surface-alt focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none" placeholder="e.g. Performance Training Tee" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-1">Slug *</label>
                  <input value={editing.slug} onChange={(e) => setEditing({ ...editing, slug: e.target.value })}
                    className="w-full rounded-xl border border-border px-4 py-2.5 text-sm bg-surface-alt focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none" placeholder="performance-training-tee" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-foreground mb-1">Description</label>
                <textarea value={editing.description} onChange={(e) => setEditing({ ...editing, description: e.target.value })}
                  rows={3} className="w-full rounded-xl border border-border px-4 py-2.5 text-sm bg-surface-alt focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none resize-none" />
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-1">Price (£) *</label>
                  <input type="number" step="0.01" value={editing.price} onChange={(e) => setEditing({ ...editing, price: Number(e.target.value) })}
                    className="w-full rounded-xl border border-border px-4 py-2.5 text-sm bg-surface-alt focus:border-accent outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-1">Was Price (£)</label>
                  <input type="number" step="0.01" value={editing.original_price ?? ''} onChange={(e) => setEditing({ ...editing, original_price: e.target.value ? Number(e.target.value) : null })}
                    className="w-full rounded-xl border border-border px-4 py-2.5 text-sm bg-surface-alt focus:border-accent outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-1">Stock Count</label>
                  <input type="number" value={editing.stock_count} onChange={(e) => setEditing({ ...editing, stock_count: Number(e.target.value) })}
                    className="w-full rounded-xl border border-border px-4 py-2.5 text-sm bg-surface-alt focus:border-accent outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-1">Sort Order</label>
                  <input type="number" value={editing.sort_order} onChange={(e) => setEditing({ ...editing, sort_order: Number(e.target.value) })}
                    className="w-full rounded-xl border border-border px-4 py-2.5 text-sm bg-surface-alt focus:border-accent outline-none" />
                </div>
              </div>

              {/* Sizes */}
              <div>
                <label className="block text-sm font-semibold text-foreground mb-1">Sizes</label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {editing.sizes.map((s, i) => (
                    <span key={i} className="inline-flex items-center gap-1 bg-surface-alt border border-border rounded-lg px-2.5 py-1 text-xs font-semibold">
                      {s}
                      <button type="button" onClick={() => setEditing({ ...editing, sizes: editing.sizes.filter((_, idx) => idx !== i) })} className="text-muted hover:text-red-500">
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input value={sizeInput} onChange={(e) => setSizeInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addSize())}
                    className="flex-1 rounded-xl border border-border px-3 py-2 text-sm bg-surface-alt outline-none" placeholder="Add size (e.g. XL)" />
                  <button type="button" onClick={addSize} className="px-3 py-2 bg-accent text-white rounded-xl text-sm font-semibold hover:bg-accent-dark">Add</button>
                </div>
              </div>

              {/* Colors */}
              <div>
                <label className="block text-sm font-semibold text-foreground mb-1">Colors</label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {editing.colors.map((c, i) => (
                    <span key={i} className="inline-flex items-center gap-1 bg-surface-alt border border-border rounded-lg px-2.5 py-1 text-xs font-semibold">
                      {c}
                      <button type="button" onClick={() => setEditing({ ...editing, colors: editing.colors.filter((_, idx) => idx !== i) })} className="text-muted hover:text-red-500">
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input value={colorInput} onChange={(e) => setColorInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addColor())}
                    className="flex-1 rounded-xl border border-border px-3 py-2 text-sm bg-surface-alt outline-none" placeholder="Add color (e.g. Navy)" />
                  <button type="button" onClick={addColor} className="px-3 py-2 bg-accent text-white rounded-xl text-sm font-semibold hover:bg-accent-dark">Add</button>
                </div>
              </div>
            </div>

            {/* Images */}
            <div className="rounded-2xl border border-border bg-surface p-6">
              <ImageUploader
                value={editing.images}
                onChange={(images) => setEditing({ ...editing, images })}
                folder="products"
                maxFiles={6}
                label="Product Images"
              />
            </div>
          </div>

          {/* Right column — sidebar fields */}
          <div className="space-y-5">
            <div className="rounded-2xl border border-border bg-surface p-6 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-foreground mb-1">Category *</label>
                <select value={editing.category_slug} onChange={(e) => setEditing({ ...editing, category_slug: e.target.value })}
                  className="w-full rounded-xl border border-border px-4 py-2.5 text-sm bg-surface-alt">
                  {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-foreground mb-1">Badge</label>
                <select value={editing.badge ?? ''} onChange={(e) => setEditing({ ...editing, badge: e.target.value || null })}
                  className="w-full rounded-xl border border-border px-4 py-2.5 text-sm bg-surface-alt">
                  {BADGES.map((b) => <option key={b} value={b}>{b || 'None'}</option>)}
                </select>
              </div>

              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={editing.in_stock} onChange={(e) => setEditing({ ...editing, in_stock: e.target.checked })} className="rounded" />
                <span className="text-sm font-semibold">In Stock</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={editing.is_active} onChange={(e) => setEditing({ ...editing, is_active: e.target.checked })} className="rounded" />
                <span className="text-sm font-semibold">Active (visible on site)</span>
              </label>
            </div>

            <button onClick={handleSave} disabled={saving || !editing.name || !editing.slug}
              className="w-full flex items-center justify-center gap-2 py-3 bg-accent text-white font-[var(--font-heading)] font-bold text-lg uppercase rounded-xl hover:bg-accent-dark transition-colors disabled:opacity-50">
              {saving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
              {saving ? 'Saving...' : 'Save Product'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── LIST VIEW ──
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-[var(--font-heading)] text-2xl font-bold text-primary uppercase">Products</h1>
          <p className="text-sm text-muted">Manage your product catalog</p>
        </div>
        <button onClick={() => setEditing({ ...EMPTY_PRODUCT })}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-accent text-white font-semibold rounded-xl hover:bg-accent-dark transition-colors">
          <Plus className="w-4 h-4" /> Add Product
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
          <input value={search} onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border text-sm bg-surface focus:border-accent outline-none" placeholder="Search products..." />
        </div>
        <select value={catFilter} onChange={(e) => setCatFilter(e.target.value)}
          className="rounded-xl border border-border px-4 py-2.5 text-sm bg-surface">
          <option value="">All Categories</option>
          {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>

      {/* Table */}
      <div className="rounded-2xl border border-border bg-surface overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-accent" />
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-20 text-muted">
            <p className="text-lg font-semibold">No products found</p>
            <p className="text-sm mt-1">Add your first product or run the database schema SQL first.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-surface-alt">
                  <th className="text-left px-4 py-3 font-semibold text-muted">Image</th>
                  <th className="text-left px-4 py-3 font-semibold text-muted">Name</th>
                  <th className="text-left px-4 py-3 font-semibold text-muted">Category</th>
                  <th className="text-left px-4 py-3 font-semibold text-muted">Price</th>
                  <th className="text-left px-4 py-3 font-semibold text-muted">Stock</th>
                  <th className="text-left px-4 py-3 font-semibold text-muted">Badge</th>
                  <th className="text-left px-4 py-3 font-semibold text-muted">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((p) => (
                  <tr key={p.id} className="border-b border-border-light hover:bg-surface-alt/50 transition-colors">
                    <td className="px-4 py-3">
                      <div className="w-12 h-12 rounded-lg overflow-hidden bg-surface-alt relative">
                        {p.images?.[0] ? (
                          <Image src={p.images[0]} alt={p.name} fill className="object-cover" sizes="48px" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-muted text-xs">No img</div>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <p className="font-semibold text-foreground">{p.name}</p>
                      <p className="text-xs text-muted">{p.slug}</p>
                    </td>
                    <td className="px-4 py-3">
                      <span className="inline-block bg-surface-alt border border-border rounded-lg px-2 py-0.5 text-xs font-semibold">{p.category_slug}</span>
                    </td>
                    <td className="px-4 py-3 font-semibold">
                      £{Number(p.price).toFixed(2)}
                      {p.original_price && <span className="text-xs text-muted line-through ml-1">£{Number(p.original_price).toFixed(2)}</span>}
                    </td>
                    <td className="px-4 py-3">
                      <span className={`text-xs font-bold ${p.in_stock ? 'text-emerald-600' : 'text-red-500'}`}>
                        {p.in_stock ? `${p.stock_count} in stock` : 'Out of stock'}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      {p.badge && (
                        <span className="inline-block bg-accent/10 text-accent rounded-lg px-2 py-0.5 text-xs font-bold uppercase">{p.badge}</span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1">
                        <button onClick={() => setEditing(p)} className="p-2 rounded-lg hover:bg-surface-alt transition-colors text-muted hover:text-accent">
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button onClick={() => p.id && handleDelete(p.id)} className="p-2 rounded-lg hover:bg-red-50 transition-colors text-muted hover:text-red-500">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
