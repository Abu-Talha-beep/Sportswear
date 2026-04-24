'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { Loader2, Plus, Save, Pencil, X, Upload, ImageIcon, Trash2 } from 'lucide-react';
import { AdminPageHeader } from '@/components/admin/AdminPageHeader';
import Image from 'next/image';

interface CategoryRow {
  id: string;
  slug: string;
  name: string;
  description: string | null;
  image_url: string | null;
  sort_order: number;
  is_active: boolean;
}

interface CategoryFormState {
  id?: string;
  slug: string;
  name: string;
  description: string;
  image_url: string;
  sort_order: number;
  is_active: boolean;
}

const EMPTY_CATEGORY: CategoryFormState = {
  slug: '',
  name: '',
  description: '',
  image_url: '',
  sort_order: 0,
  is_active: true,
};

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<CategoryRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [editing, setEditing] = useState<CategoryFormState | null>(null);
  const [uploading, setUploading] = useState(false);

  const handleImageUpload = async (file: File) => {
    if (!editing) return;
    setUploading(true);
    setError('');
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('folder', 'categories');
      const res = await fetch('/api/admin/upload', { method: 'POST', body: formData });
      const data = (await res.json().catch(() => null)) as { url?: string; error?: string } | null;
      if (!res.ok) {
        setError(data?.error || 'Image upload failed.');
        return;
      }
      if (data?.url) {
        setEditing({ ...editing, image_url: data.url });
      }
    } catch {
      setError('Image upload failed.');
    } finally {
      setUploading(false);
    }
  };

  const fetchCategories = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch('/api/admin/categories');
      const data = (await response.json().catch(() => null)) as
        | { categories?: CategoryRow[]; error?: string }
        | null;

      if (!response.ok) {
        setCategories([]);
        setError(data?.error || 'Failed to load categories.');
        return;
      }

      setCategories(data?.categories ?? []);
    } catch {
      setCategories([]);
      setError('Failed to load categories.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const sortedCategories = useMemo(
    () => [...categories].sort((a, b) => a.sort_order - b.sort_order || a.name.localeCompare(b.name)),
    [categories]
  );

  const startCreate = () => {
    setEditing({ ...EMPTY_CATEGORY, sort_order: sortedCategories.length });
  };

  const startEdit = (category: CategoryRow) => {
    setEditing({
      id: category.id,
      slug: category.slug,
      name: category.name,
      description: category.description || '',
      image_url: category.image_url || '',
      sort_order: category.sort_order,
      is_active: category.is_active,
    });
  };

  const saveCategory = async () => {
    if (!editing) return;
    setSaving(true);
    setError('');

    try {
      const response = await fetch('/api/admin/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editing),
      });

      const data = (await response.json().catch(() => null)) as
        | { category?: CategoryRow; error?: string }
        | null;

      if (!response.ok) {
        setError(data?.error || 'Failed to save category.');
        return;
      }

      setEditing(null);
      await fetchCategories();
    } catch {
      setError('Failed to save category.');
    } finally {
      setSaving(false);
    }
  };

  const toggleActive = async (category: CategoryRow) => {
    setSaving(true);
    setError('');
    try {
      const response = await fetch('/api/admin/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...category, is_active: !category.is_active }),
      });

      const data = (await response.json().catch(() => null)) as
        | { category?: CategoryRow; error?: string }
        | null;

      if (!response.ok) {
        setError(data?.error || 'Failed to update category status.');
        return;
      }

      await fetchCategories();
    } catch {
      setError('Failed to update category status.');
    } finally {
      setSaving(false);
    }
  };

  const deleteCategory = async (category: CategoryRow) => {
    if (!confirm(`Permanently delete "${category.name}"? This cannot be undone.`)) return;
    setSaving(true);
    setError('');
    try {
      const response = await fetch('/api/admin/categories', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: category.id }),
      });

      const data = (await response.json().catch(() => null)) as
        | { success?: boolean; error?: string }
        | null;

      if (!response.ok) {
        setError(data?.error || 'Failed to delete category.');
        return;
      }

      await fetchCategories();
    } catch {
      setError('Failed to delete category.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Categories"
        description="Manage the storefront category list used by the shop landing page and product assignment screens."
      />

      <div className="flex items-center justify-between gap-4 rounded-2xl border border-border bg-surface p-5">
        <div>
          <p className="text-sm font-semibold text-foreground">Storefront categories</p>
          <p className="text-sm text-muted">Add, rename, reorder, or disable categories without touching code.</p>
        </div>
        <button
          type="button"
          onClick={startCreate}
          className="inline-flex items-center gap-2 rounded-xl bg-accent px-4 py-2.5 text-sm font-semibold text-white hover:bg-accent-dark"
        >
          <Plus className="h-4 w-4" /> New Category
        </button>
      </div>

      {error ? (
        <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>
      ) : null}

      {editing ? (
        <div className="grid grid-cols-1 gap-6 rounded-2xl border border-border bg-surface p-6 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-4">
            <div>
              <label className="mb-1 block text-sm font-semibold text-foreground">Category Name</label>
              <input
                value={editing.name}
                onChange={(event) => setEditing({ ...editing, name: event.target.value })}
                className="w-full rounded-xl border border-border bg-surface-alt px-4 py-2.5 text-sm outline-none"
                placeholder="Activewear"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-semibold text-foreground">Slug</label>
              <input
                value={editing.slug}
                onChange={(event) => setEditing({ ...editing, slug: event.target.value })}
                className="w-full rounded-xl border border-border bg-surface-alt px-4 py-2.5 text-sm outline-none"
                placeholder="activewear"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-semibold text-foreground">Description</label>
              <textarea
                value={editing.description}
                onChange={(event) => setEditing({ ...editing, description: event.target.value })}
                rows={4}
                className="w-full resize-none rounded-xl border border-border bg-surface-alt px-4 py-2.5 text-sm outline-none"
                placeholder="Short category description for the storefront."
              />
            </div>
          </div>

          <div className="space-y-4">
            {/* Image Upload */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-foreground">Category Image</label>

              {editing.image_url ? (
                <div className="relative group w-full rounded-xl border border-border overflow-hidden bg-surface-alt">
                  <div className="relative w-full h-40">
                    <Image
                      src={editing.image_url}
                      alt="Category preview"
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
                    <label className="cursor-pointer inline-flex items-center gap-1.5 rounded-lg bg-white/90 px-3 py-1.5 text-xs font-semibold text-foreground hover:bg-white transition-colors">
                      <Upload className="h-3.5 w-3.5" />
                      Replace
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          const f = e.target.files?.[0];
                          if (f) handleImageUpload(f);
                        }}
                      />
                    </label>
                    <button
                      type="button"
                      onClick={() => setEditing({ ...editing, image_url: '' })}
                      className="inline-flex items-center gap-1.5 rounded-lg bg-red-500/90 px-3 py-1.5 text-xs font-semibold text-white hover:bg-red-600 transition-colors"
                    >
                      <Trash2 className="h-3.5 w-3.5" /> Remove
                    </button>
                  </div>
                </div>
              ) : (
                <label className={`flex flex-col items-center justify-center w-full h-40 rounded-xl border-2 border-dashed border-border bg-surface-alt cursor-pointer hover:border-accent hover:bg-accent/5 transition-colors ${
                  uploading ? 'pointer-events-none opacity-60' : ''
                }`}>
                  {uploading ? (
                    <>
                      <Loader2 className="h-8 w-8 animate-spin text-accent mb-2" />
                      <span className="text-xs text-muted">Uploading…</span>
                    </>
                  ) : (
                    <>
                      <ImageIcon className="h-8 w-8 text-muted mb-2" />
                      <span className="text-sm font-medium text-foreground">Click to upload image</span>
                      <span className="text-xs text-muted mt-1">PNG, JPG, WebP up to 5MB</span>
                    </>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const f = e.target.files?.[0];
                      if (f) handleImageUpload(f);
                    }}
                  />
                </label>
              )}

              {/* Manual URL fallback */}
              <div className="mt-2">
                <input
                  value={editing.image_url}
                  onChange={(event) => setEditing({ ...editing, image_url: event.target.value })}
                  className="w-full rounded-xl border border-border bg-surface-alt px-4 py-2.5 text-xs outline-none text-muted"
                  placeholder="Or paste image URL manually…"
                />
              </div>
            </div>
            <div>
              <label className="mb-1 block text-sm font-semibold text-foreground">Sort Order</label>
              <input
                type="number"
                value={editing.sort_order}
                onChange={(event) => setEditing({ ...editing, sort_order: Number(event.target.value) })}
                className="w-full rounded-xl border border-border bg-surface-alt px-4 py-2.5 text-sm outline-none"
              />
            </div>
            <label className="flex items-center gap-2 text-sm font-semibold text-foreground">
              <input
                type="checkbox"
                checked={editing.is_active}
                onChange={(event) => setEditing({ ...editing, is_active: event.target.checked })}
                className="rounded border-border"
              />
              Active
            </label>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={saveCategory}
                disabled={saving}
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-accent px-4 py-2.5 text-sm font-semibold text-white hover:bg-accent-dark disabled:opacity-70"
              >
                {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                Save
              </button>
              <button
                type="button"
                onClick={() => setEditing(null)}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-surface-alt px-4 py-2.5 text-sm font-semibold text-foreground hover:bg-border-light"
              >
                <X className="h-4 w-4" /> Cancel
              </button>
            </div>
          </div>
        </div>
      ) : null}

      <div className="rounded-2xl border border-border bg-surface shadow-sm overflow-hidden">
        <div className="border-b border-border bg-surface-alt px-5 py-4">
          <h2 className="font-(--font-heading) text-xl uppercase text-primary">Category Directory</h2>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-accent" />
          </div>
        ) : sortedCategories.length === 0 ? (
          <div className="px-5 py-20 text-center text-sm text-muted">No categories found.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-surface-alt/70 text-left">
                <tr>
                  <th className="px-5 py-3 font-semibold text-foreground whitespace-nowrap">Image</th>
                  <th className="px-5 py-3 font-semibold text-foreground whitespace-nowrap">Name</th>
                  <th className="px-5 py-3 font-semibold text-foreground whitespace-nowrap">Slug</th>
                  <th className="px-5 py-3 font-semibold text-foreground whitespace-nowrap">Sort</th>
                  <th className="px-5 py-3 font-semibold text-foreground whitespace-nowrap">Status</th>
                  <th className="px-5 py-3 font-semibold text-foreground whitespace-nowrap">Actions</th>
                </tr>
              </thead>
              <tbody>
                {sortedCategories.map((category) => (
                  <tr key={category.id} className="border-t border-border-light">
                    <td className="px-5 py-3">
                      {category.image_url ? (
                        <div className="relative h-10 w-10 rounded-lg overflow-hidden border border-border bg-surface-alt">
                          <Image src={category.image_url} alt={category.name} fill className="object-cover" unoptimized />
                        </div>
                      ) : (
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-dashed border-border bg-surface-alt">
                          <ImageIcon className="h-4 w-4 text-muted" />
                        </div>
                      )}
                    </td>
                    <td className="px-5 py-3">
                      <div className="font-medium text-foreground">{category.name}</div>
                      {category.description ? (
                        <div className="mt-1 max-w-lg text-xs text-muted">{category.description}</div>
                      ) : null}
                    </td>
                    <td className="px-5 py-3 text-muted">{category.slug}</td>
                    <td className="px-5 py-3 text-muted">{category.sort_order}</td>
                    <td className="px-5 py-3">
                      <span
                        className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${
                          category.is_active ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-500'
                        }`}
                      >
                        {category.is_active ? 'Active' : 'Hidden'}
                      </span>
                    </td>
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => startEdit(category)}
                          className="inline-flex items-center gap-1 rounded-lg border border-border bg-surface-alt px-3 py-1.5 text-xs font-semibold text-foreground hover:bg-border-light"
                        >
                          <Pencil className="h-3.5 w-3.5" /> Edit
                        </button>
                        <button
                          type="button"
                          onClick={() => toggleActive(category)}
                          disabled={saving}
                          className="inline-flex items-center gap-1 rounded-lg border border-border bg-surface-alt px-3 py-1.5 text-xs font-semibold text-foreground hover:bg-border-light disabled:opacity-70"
                        >
                          {category.is_active ? 'Hide' : 'Show'}
                        </button>
                        <button
                          type="button"
                          onClick={() => deleteCategory(category)}
                          disabled={saving}
                          className="inline-flex items-center gap-1 rounded-lg border border-red-200 bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-600 hover:bg-red-100 disabled:opacity-70"
                        >
                          <Trash2 className="h-3.5 w-3.5" /> Delete
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