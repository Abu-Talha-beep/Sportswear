import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = { title: 'Email Signup', description: 'Join the Your Club Stash mailing list for exclusive offers and new arrivals.' };

export default function EmailSignupPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-16">
      <div className="bg-surface rounded-2xl border border-border-light p-8 sm:p-12 text-center">
        <div className="text-5xl mb-4">📧</div>
        <h1 className="font-[var(--font-heading)] text-4xl md:text-5xl font-bold text-primary uppercase">Join the Stash</h1>
        <p className="text-muted mt-3 mb-8">Sign up for exclusive offers, new arrivals, and kit inspiration straight to your inbox.</p>
        <form className="space-y-4 max-w-md mx-auto">
          <input type="text" placeholder="Your name" className="w-full px-4 py-3 bg-surface-alt rounded-xl border border-border focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none text-sm" />
          <input type="email" placeholder="Email address" className="w-full px-4 py-3 bg-surface-alt rounded-xl border border-border focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none text-sm" />
          <label className="flex items-start gap-2 text-xs text-muted text-left">
            <input type="checkbox" className="mt-0.5 rounded" />
            I agree to receive marketing emails from Your Club Stash. You can unsubscribe at any time.
          </label>
          <button type="submit" className="w-full py-4 bg-accent text-white font-[var(--font-heading)] text-lg font-bold uppercase rounded-xl hover:bg-accent-dark transition-colors">
            Join Here!
          </button>
        </form>
        <p className="text-xs text-muted mt-6">We respect your privacy. <Link href="/privacy-policy" className="text-accent hover:underline">Privacy Policy</Link></p>
      </div>
    </div>
  );
}
