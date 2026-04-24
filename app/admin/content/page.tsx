'use client';

import { useState, useEffect, useCallback } from 'react';
import { Plus, Pencil, Trash2, X, Save, Loader2, GripVertical, Image as ImageIcon } from 'lucide-react';
import { ImageUploader } from '@/components/admin/ImageUploader';

interface Banner {
  id?: string;
  title: string;
  subtitle: string;
  cta_text: string;
  cta_href: string;
  image_url: string;
  gradient: string;
  sort_order: number;
  is_active: boolean;
}

const EMPTY_BANNER: Banner = {
  title: '', subtitle: '', cta_text: 'Shop Now', cta_href: '/store',
  image_url: '', gradient: 'from-primary via-primary-light to-accent',
  sort_order: 0, is_active: true,
};

const GRADIENT_PRESETS = [
  { name: 'Brand', value: 'from-primary via-primary-light to-accent' },
  { name: 'Red Fire', value: 'from-accent via-accent-dark to-primary' },
  { name: 'Emerald', value: 'from-emerald-700 via-emerald-900 to-primary' },
  { name: 'Sunset', value: 'from-amber-600 via-orange-700 to-primary' },
  { name: 'Purple', value: 'from-purple-700 via-indigo-800 to-primary' },
  { name: 'Ocean', value: 'from-sky-600 via-blue-800 to-primary' },
];

export default function AdminContentPage() {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Banner | null>(null);
  const [saving, setSaving] = useState(false);
  const [tab, setTab] = useState<'banners' | 'announcements'>('banners');
  const [announcements, setAnnouncements] = useState<string[]>([]);
  const [newAnnouncement, setNewAnnouncement] = useState('');
  const [announcementsLoading, setAnnouncementsLoading] = useState(false);
  const [announcementsSaving, setAnnouncementsSaving] = useState(false);
  const [announcementsError, setAnnouncementsError] = useState('');

  const fetchBanners = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/banners');
      const data = await res.json();
      setBanners(data.banners ?? []);
    } catch { /* empty */ }
    setLoading(false);
  }, []);

  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { fetchBanners(); }, [fetchBanners]);

  const fetchAnnouncements = useCallback(async () => {
    setAnnouncementsLoading(true);
    setAnnouncementsError('');
    try {
      const response = await fetch('/api/admin/announcements');
      const data = (await response.json().catch(() => null)) as
        | { messages?: string[]; error?: string }
        | null;

      if (!response.ok) {
        setAnnouncements([]);
        setAnnouncementsError(data?.error || 'Failed to load announcements.');
        return;
      }

      setAnnouncements(data?.messages ?? []);
    } catch {
      setAnnouncements([]);
      setAnnouncementsError('Failed to load announcements.');
    } finally {
      setAnnouncementsLoading(false);
    }
  }, []);

  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { fetchAnnouncements(); }, [fetchAnnouncements]);

  const handleSaveBanner = async () => {
    if (!editing) return;
    setSaving(true);
    try {
      const res = await fetch('/api/admin/banners', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editing),
      });
      if (res.ok) { setEditing(null); fetchBanners(); }
    } catch { /* empty */ }
    setSaving(false);
  };

  const handleDeleteBanner = async (id: string) => {
    if (!confirm('Delete this banner?')) return;
    try {
      await fetch('/api/admin/banners', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });
      fetchBanners();
    } catch { /* empty */ }
  };

  const addAnnouncement = () => {
    if (!newAnnouncement.trim()) return;
    setAnnouncements([...announcements, newAnnouncement.trim()]);
    setNewAnnouncement('');
  };

  const saveAnnouncements = async () => {
    setAnnouncementsSaving(true);
    setAnnouncementsError('');
    try {
      const response = await fetch('/api/admin/announcements', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: announcements }),
      });

      const data = (await response.json().catch(() => null)) as
        | { messages?: string[]; error?: string }
        | null;

      if (!response.ok) {
        setAnnouncementsError(data?.error || 'Failed to save announcements.');
        return;
      }

      setAnnouncements(data?.messages ?? []);
    } catch {
      setAnnouncementsError('Failed to save announcements.');
    } finally {
      setAnnouncementsSaving(false);
    }
  };

  // ── BANNER EDIT ──
  if (editing) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="font-[var(--font-heading)] text-2xl font-bold text-primary uppercase">
            {editing.id ? 'Edit Banner' : 'Add Hero Banner'}
          </h1>
          <button onClick={() => setEditing(null)} className="flex items-center gap-1 text-sm text-muted hover:text-foreground">
            <X className="w-4 h-4" /> Cancel
          </button>
        </div>

        {/* Live preview */}
        <div className={`relative h-48 rounded-2xl overflow-hidden bg-gradient-to-br ${editing.gradient}`}>
          <div className="absolute inset-0 flex items-center p-8">
            <div>
              <h2 className="font-[var(--font-heading)] text-3xl font-bold text-white uppercase">{editing.title || 'Banner Title'}</h2>
              <p className="text-white/80 mt-1">{editing.subtitle || 'Subtitle text goes here'}</p>
              <span className="inline-block mt-3 px-4 py-2 bg-white text-primary text-sm font-bold rounded-lg">{editing.cta_text || 'CTA'}</span>
            </div>
          </div>
          <div className="absolute top-2 right-2 bg-black/40 text-white text-xs px-2 py-1 rounded">Live Preview</div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 rounded-2xl border border-border bg-surface p-6 space-y-4">
            <div>
              <label className="block text-sm font-semibold text-foreground mb-1">Title *</label>
              <input value={editing.title} onChange={(e) => setEditing({ ...editing, title: e.target.value })}
                className="w-full rounded-xl border border-border px-4 py-2.5 text-sm bg-surface-alt focus:border-accent outline-none" placeholder="Upgrade Your Game" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-foreground mb-1">Subtitle</label>
              <input value={editing.subtitle} onChange={(e) => setEditing({ ...editing, subtitle: e.target.value })}
                className="w-full rounded-xl border border-border px-4 py-2.5 text-sm bg-surface-alt focus:border-accent outline-none" placeholder="High-quality sports kits for every club" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-foreground mb-1">CTA Button Text</label>
                <input value={editing.cta_text} onChange={(e) => setEditing({ ...editing, cta_text: e.target.value })}
                  className="w-full rounded-xl border border-border px-4 py-2.5 text-sm bg-surface-alt outline-none" placeholder="Shop Now" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-foreground mb-1">CTA Link</label>
                <input value={editing.cta_href} onChange={(e) => setEditing({ ...editing, cta_href: e.target.value })}
                  className="w-full rounded-xl border border-border px-4 py-2.5 text-sm bg-surface-alt outline-none" placeholder="/store" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">Background Gradient</label>
              <div className="grid grid-cols-3 gap-2">
                {GRADIENT_PRESETS.map((g) => (
                  <button key={g.name} type="button" onClick={() => setEditing({ ...editing, gradient: g.value })}
                    className={`h-12 rounded-xl bg-gradient-to-br ${g.value} border-2 transition-all ${editing.gradient === g.value ? 'border-white ring-2 ring-accent' : 'border-transparent'}`}>
                    <span className="text-white text-xs font-bold">{g.name}</span>
                  </button>
                ))}
              </div>
            </div>

            <ImageUploader
              value={editing.image_url ? [editing.image_url] : []}
              onChange={(urls) => setEditing({ ...editing, image_url: urls[0] || '' })}
              folder="banners"
              maxFiles={1}
              label="Background Image (optional — overrides gradient)"
            />
          </div>

          <div className="space-y-5">
            <div className="rounded-2xl border border-border bg-surface p-6 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-foreground mb-1">Sort Order</label>
                <input type="number" value={editing.sort_order} onChange={(e) => setEditing({ ...editing, sort_order: Number(e.target.value) })}
                  className="w-full rounded-xl border border-border px-4 py-2.5 text-sm bg-surface-alt outline-none" />
              </div>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={editing.is_active} onChange={(e) => setEditing({ ...editing, is_active: e.target.checked })} className="rounded" />
                <span className="text-sm font-semibold">Active</span>
              </label>
            </div>

            <button onClick={handleSaveBanner} disabled={saving || !editing.title}
              className="w-full flex items-center justify-center gap-2 py-3 bg-accent text-white font-[var(--font-heading)] font-bold text-lg uppercase rounded-xl hover:bg-accent-dark disabled:opacity-50">
              {saving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
              {saving ? 'Saving...' : 'Save Banner'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── LIST VIEW ──
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-[var(--font-heading)] text-2xl font-bold text-primary uppercase">Content Management</h1>
        <p className="text-sm text-muted">Manage homepage banners, sliders, and site content</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-surface-alt p-1 rounded-xl w-fit">
        <button onClick={() => setTab('banners')}
          className={`px-5 py-2 rounded-lg text-sm font-semibold transition-colors ${tab === 'banners' ? 'bg-white text-primary shadow-sm' : 'text-muted hover:text-foreground'}`}>
          <ImageIcon className="w-4 h-4 inline mr-1.5" />Hero Banners
        </button>
        <button onClick={() => setTab('announcements')}
          className={`px-5 py-2 rounded-lg text-sm font-semibold transition-colors ${tab === 'announcements' ? 'bg-white text-primary shadow-sm' : 'text-muted hover:text-foreground'}`}>
          📢 Announcements
        </button>
      </div>

      {tab === 'banners' && (
        <>
          <div className="flex justify-end">
            <button onClick={() => setEditing({ ...EMPTY_BANNER, sort_order: banners.length })}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-accent text-white font-semibold rounded-xl hover:bg-accent-dark">
              <Plus className="w-4 h-4" /> Add Banner
            </button>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-20"><Loader2 className="w-8 h-8 animate-spin text-accent" /></div>
          ) : banners.length === 0 ? (
            <div className="rounded-2xl border border-border bg-surface text-center py-20 text-muted">
              <p className="text-lg font-semibold">No banners yet</p>
              <p className="text-sm mt-1">Add hero slider banners for the homepage. Run the DB schema first.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {banners.map((b) => (
                <div key={b.id} className="rounded-2xl border border-border bg-surface overflow-hidden">
                  <div className="flex items-center gap-4 p-4">
                    <GripVertical className="w-5 h-5 text-muted/40 cursor-grab" />
                    <div className={`w-32 h-16 rounded-xl bg-gradient-to-br ${b.gradient} flex-shrink-0 flex items-center justify-center`}>
                      <span className="text-white text-xs font-bold truncate px-2">{b.title}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-foreground truncate">{b.title}</p>
                      <p className="text-xs text-muted truncate">{b.subtitle} • CTA: {b.cta_text} → {b.cta_href}</p>
                    </div>
                    <span className={`text-xs font-bold ${b.is_active ? 'text-emerald-600' : 'text-red-400'}`}>
                      {b.is_active ? 'Active' : 'Hidden'}
                    </span>
                    <div className="flex items-center gap-1">
                      <button onClick={() => setEditing(b)} className="p-2 rounded-lg hover:bg-surface-alt text-muted hover:text-accent"><Pencil className="w-4 h-4" /></button>
                      <button onClick={() => b.id && handleDeleteBanner(b.id)} className="p-2 rounded-lg hover:bg-red-50 text-muted hover:text-red-500"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}

      {tab === 'announcements' && (
        <div className="rounded-2xl border border-border bg-surface p-6 space-y-4">
          <h2 className="font-[var(--font-heading)] text-lg font-bold text-primary uppercase">Announcement Bar Messages</h2>
          <p className="text-sm text-muted">These messages scroll across the top of the website.</p>

          {announcementsError ? (
            <p className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
              {announcementsError}
            </p>
          ) : null}

          <div className="space-y-2">
            {announcementsLoading ? (
              <div className="flex items-center justify-center rounded-xl bg-surface-alt py-8">
                <Loader2 className="h-5 w-5 animate-spin text-accent" />
              </div>
            ) : announcements.length === 0 ? (
              <p className="rounded-xl bg-surface-alt px-4 py-3 text-sm text-muted">
                No announcement messages saved yet.
              </p>
            ) : (
              announcements.map((msg, i) => (
                <div key={i} className="flex items-center gap-3 bg-surface-alt rounded-xl px-4 py-2.5">
                  <GripVertical className="w-4 h-4 text-muted/40 cursor-grab" />
                  <span className="flex-1 text-sm">{msg}</span>
                  <button onClick={() => setAnnouncements(announcements.filter((_, idx) => idx !== i))} className="text-muted hover:text-red-500">
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))
            )}
          </div>

          <div className="flex gap-2">
            <input value={newAnnouncement} onChange={(e) => setNewAnnouncement(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addAnnouncement())}
              className="flex-1 rounded-xl border border-border px-4 py-2.5 text-sm bg-surface-alt outline-none" placeholder="Add announcement message..." />
            <button onClick={addAnnouncement} className="px-4 py-2.5 bg-accent text-white rounded-xl text-sm font-semibold hover:bg-accent-dark">
              <Plus className="w-4 h-4" />
            </button>
          </div>

          <button
            type="button"
            onClick={saveAnnouncements}
            disabled={announcementsSaving}
            className="px-5 py-2.5 bg-primary text-white rounded-xl text-sm font-semibold hover:bg-primary-light disabled:opacity-70"
          >
            {announcementsSaving ? (
              <>
                <Loader2 className="w-4 h-4 inline mr-1.5 animate-spin" /> Saving...
              </>
            ) : (
              <>
                <Save className="w-4 h-4 inline mr-1.5" /> Save Announcements
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
}
