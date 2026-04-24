'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { Plus, Pencil, Trash2, Search, X, Save, Loader2 } from 'lucide-react';
import { ImageUploader } from '@/components/admin/ImageUploader';

interface Club {
  id?: string;
  slug: string;
  name: string;
  sport: string;
  logo_url: string;
  banner_url: string;
  description: string;
  is_featured: boolean;
  is_active: boolean;
  sort_order: number;
}

const EMPTY_CLUB: Club = {
  slug: '', name: '', sport: 'rugby', logo_url: '', banner_url: '',
  description: '', is_featured: false, is_active: true, sort_order: 0,
};

const SPORTS = [
  'rugby', 'football', 'softball', 'korfball', 'netball',
  'padel', 'horseball', 'darts', 'charities', 'cricket', 'other',
  'corporatestash', 'yourtradestash',
];

export default function AdminClubsPage() {
  const [clubs, setClubs] = useState<Club[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [sportFilter, setSportFilter] = useState('');
  const [editing, setEditing] = useState<Club | null>(null);
  const [saving, setSaving] = useState(false);

  const fetchClubs = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (search) params.set('search', search);
      if (sportFilter) params.set('sport', sportFilter);
      const res = await fetch(`/api/admin/clubs?${params}`);
      const data = await res.json();
      setClubs(data.clubs ?? []);
    } catch { /* empty */ }
    setLoading(false);
  }, [search, sportFilter]);

  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { fetchClubs(); }, [fetchClubs]);

  const handleSave = async () => {
    if (!editing) return;
    setSaving(true);
    try {
      const res = await fetch('/api/admin/clubs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editing),
      });
      if (res.ok) { setEditing(null); fetchClubs(); }
    } catch { /* empty */ }
    setSaving(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this club permanently?')) return;
    try {
      await fetch('/api/admin/clubs', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });
      fetchClubs();
    } catch { /* empty */ }
  };

  // ── EDIT VIEW ──
  if (editing) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="font-[var(--font-heading)] text-2xl font-bold text-primary uppercase">
            {editing.id ? 'Edit Club' : 'Add New Club'}
          </h1>
          <button onClick={() => setEditing(null)} className="flex items-center gap-1 text-sm text-muted hover:text-foreground">
            <X className="w-4 h-4" /> Cancel
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-5">
            <div className="rounded-2xl border border-border bg-surface p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-1">Club Name *</label>
                  <input value={editing.name} onChange={(e) => setEditing({ ...editing, name: e.target.value })}
                    className="w-full rounded-xl border border-border px-4 py-2.5 text-sm bg-surface-alt focus:border-accent outline-none" placeholder="e.g. Dorking RFC" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-1">Slug *</label>
                  <input value={editing.slug} onChange={(e) => setEditing({ ...editing, slug: e.target.value })}
                    className="w-full rounded-xl border border-border px-4 py-2.5 text-sm bg-surface-alt focus:border-accent outline-none" placeholder="dorking-rfc" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-foreground mb-1">Description</label>
                <textarea value={editing.description} onChange={(e) => setEditing({ ...editing, description: e.target.value })}
                  rows={3} className="w-full rounded-xl border border-border px-4 py-2.5 text-sm bg-surface-alt focus:border-accent outline-none resize-none" />
              </div>
            </div>

            <div className="rounded-2xl border border-border bg-surface p-6 space-y-4">
              <ImageUploader
                value={editing.logo_url ? [editing.logo_url] : []}
                onChange={(urls) => setEditing({ ...editing, logo_url: urls[0] || '' })}
                folder="clubs/logos"
                maxFiles={1}
                label="Club Logo"
              />
              <ImageUploader
                value={editing.banner_url ? [editing.banner_url] : []}
                onChange={(urls) => setEditing({ ...editing, banner_url: urls[0] || '' })}
                folder="clubs/banners"
                maxFiles={1}
                label="Club Banner Image"
              />
            </div>
          </div>

          <div className="space-y-5">
            <div className="rounded-2xl border border-border bg-surface p-6 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-foreground mb-1">Sport *</label>
                <select value={editing.sport} onChange={(e) => setEditing({ ...editing, sport: e.target.value })}
                  className="w-full rounded-xl border border-border px-4 py-2.5 text-sm bg-surface-alt">
                  {SPORTS.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-foreground mb-1">Sort Order</label>
                <input type="number" value={editing.sort_order} onChange={(e) => setEditing({ ...editing, sort_order: Number(e.target.value) })}
                  className="w-full rounded-xl border border-border px-4 py-2.5 text-sm bg-surface-alt outline-none" />
              </div>

              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={editing.is_featured} onChange={(e) => setEditing({ ...editing, is_featured: e.target.checked })} className="rounded" />
                <span className="text-sm font-semibold">Featured Club</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={editing.is_active} onChange={(e) => setEditing({ ...editing, is_active: e.target.checked })} className="rounded" />
                <span className="text-sm font-semibold">Active (visible on site)</span>
              </label>
            </div>

            <button onClick={handleSave} disabled={saving || !editing.name || !editing.slug}
              className="w-full flex items-center justify-center gap-2 py-3 bg-accent text-white font-[var(--font-heading)] font-bold text-lg uppercase rounded-xl hover:bg-accent-dark transition-colors disabled:opacity-50">
              {saving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
              {saving ? 'Saving...' : 'Save Club'}
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
          <h1 className="font-[var(--font-heading)] text-2xl font-bold text-primary uppercase">Club Shops</h1>
          <p className="text-sm text-muted">Manage clubs, logos, and banners</p>
        </div>
        <button onClick={() => setEditing({ ...EMPTY_CLUB })}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-accent text-white font-semibold rounded-xl hover:bg-accent-dark">
          <Plus className="w-4 h-4" /> Add Club
        </button>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
          <input value={search} onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border text-sm bg-surface outline-none" placeholder="Search clubs..." />
        </div>
        <select value={sportFilter} onChange={(e) => setSportFilter(e.target.value)}
          className="rounded-xl border border-border px-4 py-2.5 text-sm bg-surface">
          <option value="">All Sports</option>
          {SPORTS.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>

      <div className="rounded-2xl border border-border bg-surface overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-20"><Loader2 className="w-8 h-8 animate-spin text-accent" /></div>
        ) : clubs.length === 0 ? (
          <div className="text-center py-20 text-muted">
            <p className="text-lg font-semibold">No clubs found</p>
            <p className="text-sm mt-1">Add your first club or run the database schema SQL first.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-surface-alt">
                  <th className="text-left px-4 py-3 font-semibold text-muted">Logo</th>
                  <th className="text-left px-4 py-3 font-semibold text-muted">Name</th>
                  <th className="text-left px-4 py-3 font-semibold text-muted">Sport</th>
                  <th className="text-left px-4 py-3 font-semibold text-muted">Featured</th>
                  <th className="text-left px-4 py-3 font-semibold text-muted">Actions</th>
                </tr>
              </thead>
              <tbody>
                {clubs.map((c) => (
                  <tr key={c.id} className="border-b border-border-light hover:bg-surface-alt/50">
                    <td className="px-4 py-3">
                      <div className="w-10 h-10 rounded-full overflow-hidden bg-surface-alt relative">
                        {c.logo_url ? <Image src={c.logo_url} alt={c.name} fill className="object-cover" sizes="40px" /> :
                          <div className="w-full h-full flex items-center justify-center text-xs text-muted">?</div>}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <p className="font-semibold text-foreground">{c.name}</p>
                      <p className="text-xs text-muted">{c.slug}</p>
                    </td>
                    <td className="px-4 py-3">
                      <span className="inline-block bg-surface-alt border border-border rounded-lg px-2 py-0.5 text-xs font-semibold capitalize">{c.sport}</span>
                    </td>
                    <td className="px-4 py-3">
                      {c.is_featured && <span className="text-xs font-bold text-accent">★ Featured</span>}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1">
                        <button onClick={() => setEditing(c)} className="p-2 rounded-lg hover:bg-surface-alt text-muted hover:text-accent"><Pencil className="w-4 h-4" /></button>
                        <button onClick={() => c.id && handleDelete(c.id)} className="p-2 rounded-lg hover:bg-red-50 text-muted hover:text-red-500"><Trash2 className="w-4 h-4" /></button>
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
