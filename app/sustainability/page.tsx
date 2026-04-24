import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sustainability',
  description: 'Our commitment to sustainability — a tree for every order at Your Club Stash.',
};

export default function SustainabilityPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16">
      <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-emerald-700 to-emerald-900 p-10 sm:p-16 mb-12">
        <h1 className="font-[var(--font-heading)] text-4xl md:text-6xl font-bold text-white uppercase relative z-10">Sustainability</h1>
        <p className="text-emerald-200/80 mt-4 text-lg relative z-10">Our promise to the planet. Every order makes a difference.</p>
        <div className="absolute right-8 bottom-4 text-[200px] opacity-10 select-none">🌳</div>
      </div>
      <div className="prose max-w-none text-muted leading-relaxed space-y-6">
        <h2 className="font-[var(--font-heading)] text-2xl font-bold text-primary uppercase">A Tree for Every Order</h2>
        <p>At Your Club Stash, we believe in giving back. That&apos;s why we plant a tree for every single order placed through our website. Through our partnership with leading reforestation charities, we&apos;ve planted over 10,000 trees worldwide.</p>
        <h2 className="font-[var(--font-heading)] text-2xl font-bold text-primary uppercase">Eco-Friendly Materials</h2>
        <p>We&apos;re continuously working to increase the proportion of recycled and sustainable materials in our product range. Many of our garments now feature recycled polyester, organic cotton, and water-based inks.</p>
        <h2 className="font-[var(--font-heading)] text-2xl font-bold text-primary uppercase">Packaging</h2>
        <p>All our packaging is 100% recyclable. We&apos;ve eliminated single-use plastic from our dispatch process and use recycled cardboard boxes and compostable mailers wherever possible.</p>
        <h2 className="font-[var(--font-heading)] text-2xl font-bold text-primary uppercase">Our Goals</h2>
        <ul className="list-disc list-inside space-y-2">
          <li>Plant 50,000 trees by 2027</li>
          <li>100% sustainable materials by 2028</li>
          <li>Carbon-neutral operations by 2027</li>
          <li>Zero waste to landfill by 2026</li>
        </ul>
      </div>
    </div>
  );
}
