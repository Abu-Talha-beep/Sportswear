import { Metadata } from 'next';
import { TreePine, Users, Award, Heart } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn about Your Club Stash — UK-based supplier of high-quality sports kit for clubs, schools, and charities.',
};

export default function AboutPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
      {/* Hero */}
      <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-primary to-accent p-10 sm:p-16 mb-16">
        <div className="relative z-10 max-w-2xl">
          <h1 className="font-[var(--font-heading)] text-4xl md:text-6xl font-bold text-white uppercase">About Your Club Stash</h1>
          <p className="text-white/80 mt-4 text-lg leading-relaxed">
            We&apos;re a UK-based supplier of activewear, leisurewear, and sporting goods.
            Our mission is to provide high-quality, affordable kit for sports clubs, schools,
            businesses, and charities nationwide.
          </p>
        </div>
        <div className="absolute right-8 bottom-4 text-[200px] opacity-5 select-none">💪</div>
      </div>

      {/* Values */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
        {[
          { icon: Award, title: 'Quality First', desc: 'Premium materials and printing on every garment.' },
          { icon: Users, title: 'Community', desc: 'Supporting grassroots sport across the UK.' },
          { icon: TreePine, title: 'Sustainability', desc: 'A tree planted for every order placed.' },
          { icon: Heart, title: 'Passion', desc: 'Built by sports people, for sports people.' },
        ].map(({ icon: Icon, title, desc }) => (
          <div key={title} className="bg-surface rounded-2xl border border-border-light p-6 text-center hover:shadow-lg transition-shadow">
            <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center mx-auto mb-4">
              <Icon className="w-7 h-7 text-accent" />
            </div>
            <h3 className="font-[var(--font-heading)] text-lg font-bold text-primary uppercase">{title}</h3>
            <p className="text-sm text-muted mt-2">{desc}</p>
          </div>
        ))}
      </div>

      {/* Story */}
      <div className="max-w-3xl mx-auto">
        <h2 className="font-[var(--font-heading)] text-3xl font-bold text-primary uppercase mb-6">Our Story</h2>
        <div className="prose text-muted leading-relaxed space-y-4">
          <p>
            Your Club Stash was born from a simple idea: every team deserves to look and feel great,
            regardless of their budget. We noticed that grassroots clubs were being underserved —
            paying over the odds for kit that didn&apos;t last, from suppliers who didn&apos;t care.
          </p>
          <p>
            We set out to change that. Working directly with manufacturers and using the latest
            sublimation printing technology, we deliver premium-quality kit at prices that work
            for real clubs with real budgets.
          </p>
          <p>
            Today we supply over 100 clubs across rugby, football, softball, korfball, netball,
            padel, horseball, darts, and more. From Sunday league to semi-pro, from charities
            to corporate teams — we&apos;ve got you covered.
          </p>
        </div>
      </div>
    </div>
  );
}
