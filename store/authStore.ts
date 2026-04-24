// ═══════════════════════════════════════════
// ZUSTAND AUTH STORE — Supabase authentication
// ═══════════════════════════════════════════

'use client';

import { create } from 'zustand';
import { getSupabaseBrowserClient } from '@/lib/supabase/client';

interface User {
  email: string;
  name: string;
}

interface AuthStore {
  user: User | null;
  isLoggedIn: boolean;
  isLoading: boolean;
  authError: string;

  initialize: () => Promise<void>;
  login: (email: string, password: string) => Promise<boolean>;
  register: (email: string, password: string, name?: string) => Promise<boolean>;
  logout: () => Promise<void>;
  clearAuthError: () => void;
}

const supabase = getSupabaseBrowserClient();
let authListenerInitialized = false;

function toStoreUser(user: { email?: string | null; user_metadata?: { full_name?: string } }): User {
  const email = user.email ?? '';
  return {
    email,
    name: user.user_metadata?.full_name || email.split('@')[0] || 'Member',
  };
}

export const useAuthStore = create<AuthStore>()((set) => ({
  user: null,
  isLoggedIn: false,
  isLoading: false,
  authError: '',

  initialize: async () => {
    set({ isLoading: true, authError: '' });
    if (!supabase) {
      set({ user: null, isLoggedIn: false, isLoading: false, authError: 'Supabase environment variables are missing.' });
      return;
    }

    const { data, error } = await supabase.auth.getSession();

    if (error) {
      set({ user: null, isLoggedIn: false, isLoading: false, authError: error.message });
      return;
    }

    const sessionUser = data.session?.user;
    if (sessionUser) {
      set({ user: toStoreUser(sessionUser), isLoggedIn: true, isLoading: false });
    } else {
      set({ user: null, isLoggedIn: false, isLoading: false });
    }

    if (!authListenerInitialized) {
      authListenerInitialized = true;
      supabase.auth.onAuthStateChange((_event, session) => {
        const user = session?.user;
        if (user) {
          set({
            user: toStoreUser(user),
            isLoggedIn: true,
            authError: '',
          });
        } else {
          set({ user: null, isLoggedIn: false });
        }
      });
    }
  },

  login: async (email, password) => {
    set({ isLoading: true, authError: '' });
    if (!supabase) {
      set({ isLoading: false, authError: 'Supabase environment variables are missing.' });
      return false;
    }

    const { data, error } = await supabase.auth.signInWithPassword({ email, password });

    if (error || !data.user) {
      set({ isLoading: false, authError: error?.message || 'Login failed.' });
      return false;
    }

    set({
      user: toStoreUser(data.user),
      isLoggedIn: true,
      isLoading: false,
      authError: '',
    });
    return true;
  },

  register: async (email, password, name) => {
    set({ isLoading: true, authError: '' });
    if (!supabase) {
      set({ isLoading: false, authError: 'Supabase environment variables are missing.' });
      return false;
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: name || email.split('@')[0],
        },
      },
    });

    if (error) {
      set({ isLoading: false, authError: error.message });
      return false;
    }

    // Some Supabase projects require email confirmation before session is created.
    if (data.session && data.user) {
      set({
        user: toStoreUser(data.user),
        isLoggedIn: true,
        isLoading: false,
        authError: '',
      });
      return true;
    }

    // Registration succeeded but this project requires email confirmation.
    // Keep authError empty so UI can show a success/info message instead of an error state.
    set({ isLoading: false, authError: '' });
    return true;
  },

  logout: async () => {
    set({ isLoading: true, authError: '' });
    if (!supabase) {
      set({ user: null, isLoggedIn: false, isLoading: false, authError: '' });
      return;
    }

    const { error } = await supabase.auth.signOut();
    if (error) {
      set({ isLoading: false, authError: error.message });
      return;
    }
    set({ user: null, isLoggedIn: false, isLoading: false, authError: '' });
  },

  clearAuthError: () => set({ authError: '' }),
}));
