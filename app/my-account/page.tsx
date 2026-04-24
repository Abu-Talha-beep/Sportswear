'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, User } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';

export default function MyAccountPage() {
  const {
    user,
    isLoggedIn,
    isLoading,
    authError,
    initialize,
    login,
    register,
    logout,
    clearAuthError,
  } = useAuthStore();

  // Login form state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState('');

  // Register form state
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [showRegPassword, setShowRegPassword] = useState(false);
  const [regSuccess, setRegSuccess] = useState('');
  const [regError, setRegError] = useState('');

  useEffect(() => {
    initialize();
  }, [initialize]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    clearAuthError();
    setRegSuccess('');
    setLoginError('');
    if (!loginEmail || !loginPassword) {
      setLoginError('Please fill in all fields.');
      return;
    }
    const success = await login(loginEmail, loginPassword);
    if (!success) setLoginError(authError || 'Invalid login credentials.');
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    clearAuthError();
    setRegSuccess('');
    setRegError('');
    if (!regEmail || !regPassword) {
      setRegError('Please enter email and password.');
      return;
    }
    if (regPassword.length < 8) {
      setRegError('Password must be at least 8 characters.');
      return;
    }
    const success = await register(regEmail, regPassword);
    if (!success) {
      setRegError(authError || 'Registration failed.');
      return;
    }
    if (!isLoggedIn) {
      setRegSuccess('Account created. Check your email to confirm your account.');
    }
  };

  // Logged-in view
  if (isLoggedIn && user) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-surface rounded-2xl border border-border-light p-8 sm:p-12 text-center"
        >
          <div className="w-20 h-20 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-6">
            <User className="w-10 h-10 text-accent" />
          </div>
          <h1 className="font-[var(--font-heading)] text-3xl font-bold text-primary uppercase">
            Welcome back, {user.name}!
          </h1>
          <p className="text-muted mt-2">{user.email}</p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-10">
            {[
              { label: 'Orders', value: '0', desc: 'No orders yet' },
              { label: 'Wishlist', value: '0', desc: 'Nothing saved' },
              { label: 'Addresses', value: '0', desc: 'No addresses' },
            ].map((stat) => (
              <div key={stat.label} className="bg-surface-alt rounded-xl p-5">
                <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                <p className="text-sm font-semibold text-foreground">{stat.label}</p>
                <p className="text-xs text-muted mt-1">{stat.desc}</p>
              </div>
            ))}
          </div>

          <button
            onClick={() => void logout()}
            className="mt-8 px-8 py-3 bg-surface-alt border border-border text-foreground font-semibold rounded-xl hover:bg-border transition-colors"
          >
            Log Out
          </button>
        </motion.div>
      </div>
    );
  }

  // Login / Register view
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16">
      <h1 className="font-[var(--font-heading)] text-4xl md:text-5xl font-bold text-primary uppercase text-center mb-12">
        My Account
      </h1>

      {isLoading && (
        <p className="text-center text-sm text-muted mb-6">Loading your account...</p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Login */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-surface rounded-2xl border border-border-light p-8"
        >
          <h2 className="font-[var(--font-heading)] text-2xl font-bold text-primary uppercase mb-6">
            Login
          </h2>
          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="text-sm font-semibold text-foreground block mb-2">Email address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
                <input
                  type="email"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 bg-surface-alt rounded-xl border border-border focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none text-sm"
                  placeholder="you@example.com"
                />
              </div>
            </div>
            <div>
              <label className="text-sm font-semibold text-foreground block mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  className="w-full pl-11 pr-11 py-3 bg-surface-alt rounded-xl border border-border focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none text-sm"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-sm text-muted cursor-pointer">
                <input type="checkbox" className="rounded" />
                Remember me
              </label>
              <a href="#" className="text-sm text-accent hover:text-accent-dark font-medium">
                Lost your password?
              </a>
            </div>
            {(loginError || authError) && <p className="text-sm text-accent font-medium">{loginError || authError}</p>}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 bg-accent text-white font-[var(--font-heading)] font-bold text-lg uppercase rounded-xl hover:bg-accent-dark transition-colors"
            >
              {isLoading ? 'Logging In...' : 'Log In'}
            </button>
          </form>
        </motion.div>

        {/* Register */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-surface rounded-2xl border border-border-light p-8"
        >
          <h2 className="font-[var(--font-heading)] text-2xl font-bold text-primary uppercase mb-6">
            Register
          </h2>
          <form onSubmit={handleRegister} className="space-y-5">
            <div>
              <label className="text-sm font-semibold text-foreground block mb-2">Email address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
                <input
                  type="email"
                  value={regEmail}
                  onChange={(e) => setRegEmail(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 bg-surface-alt rounded-xl border border-border focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none text-sm"
                  placeholder="you@example.com"
                />
              </div>
            </div>
            <div>
              <label className="text-sm font-semibold text-foreground block mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
                <input
                  type={showRegPassword ? 'text' : 'password'}
                  value={regPassword}
                  onChange={(e) => setRegPassword(e.target.value)}
                  className="w-full pl-11 pr-11 py-3 bg-surface-alt rounded-xl border border-border focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none text-sm"
                  placeholder="At least 8 characters"
                />
                <button
                  type="button"
                  onClick={() => setShowRegPassword(!showRegPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted hover:text-foreground"
                >
                  {showRegPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
            <p className="text-xs text-muted leading-relaxed">
              Your personal data will be used to support your experience throughout this website,
              to manage access to your account, and for other purposes described in our{' '}
              <a href="/privacy-policy" className="text-accent hover:underline">privacy policy</a>.
            </p>
            {regError && <p className="text-sm text-accent font-medium">{regError}</p>}
            {regSuccess && <p className="text-sm text-emerald-600 font-medium">{regSuccess}</p>}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 bg-primary text-white font-[var(--font-heading)] font-bold text-lg uppercase rounded-xl hover:bg-primary-light transition-colors"
            >
              {isLoading ? 'Registering...' : 'Register'}
            </button>
          </form>

          <div className="mt-8 p-6 bg-surface-alt rounded-xl">
            <h3 className="font-semibold text-foreground mb-3">Why create an account?</h3>
            <ul className="space-y-2 text-sm text-muted">
              <li className="flex items-start gap-2">✓ Track your orders</li>
              <li className="flex items-start gap-2">✓ Save your favourite items</li>
              <li className="flex items-start gap-2">✓ Faster checkout experience</li>
              <li className="flex items-start gap-2">✓ Exclusive member offers</li>
            </ul>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
