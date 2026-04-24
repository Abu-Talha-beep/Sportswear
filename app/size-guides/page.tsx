import { Metadata } from 'next';

export const metadata: Metadata = { title: 'Size Guides', description: 'Find your perfect fit with our comprehensive size guides.' };

export default function SizeGuidesPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16">
      <h1 className="font-[var(--font-heading)] text-4xl md:text-5xl font-bold text-primary uppercase mb-8">Size Guides</h1>
      <p className="text-muted mb-8">Use the tables below to find your perfect size. All measurements are in inches. If you&apos;re between sizes, we recommend sizing up for a comfortable fit.</p>

      {/* Adult Tops */}
      <h2 className="font-[var(--font-heading)] text-2xl font-bold text-primary uppercase mb-4">Adult Tops</h2>
      <div className="overflow-x-auto mb-10">
        <table className="w-full text-sm border border-border rounded-xl overflow-hidden">
          <thead className="bg-primary text-white">
            <tr><th className="px-4 py-3 text-left">Size</th><th className="px-4 py-3">Chest</th><th className="px-4 py-3">Waist</th><th className="px-4 py-3">Length</th></tr>
          </thead>
          <tbody>
            {[['XS','34-36','28-30','26'],['S','36-38','30-32','27'],['M','38-40','32-34','28'],['L','40-42','34-36','29'],['XL','42-44','36-38','30'],['XXL','44-46','38-40','31']].map(([s,c,w,l])=>(
              <tr key={s} className="border-t border-border hover:bg-surface-alt"><td className="px-4 py-3 font-semibold">{s}</td><td className="px-4 py-3 text-center text-muted">{c}</td><td className="px-4 py-3 text-center text-muted">{w}</td><td className="px-4 py-3 text-center text-muted">{l}</td></tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Adult Bottoms */}
      <h2 className="font-[var(--font-heading)] text-2xl font-bold text-primary uppercase mb-4">Adult Bottoms</h2>
      <div className="overflow-x-auto mb-10">
        <table className="w-full text-sm border border-border rounded-xl overflow-hidden">
          <thead className="bg-primary text-white">
            <tr><th className="px-4 py-3 text-left">Size</th><th className="px-4 py-3">Waist</th><th className="px-4 py-3">Hip</th><th className="px-4 py-3">Inside Leg</th></tr>
          </thead>
          <tbody>
            {[['S','28-30','36-38','30'],['M','30-32','38-40','31'],['L','32-34','40-42','32'],['XL','34-36','42-44','32'],['XXL','36-38','44-46','33']].map(([s,w,h,l])=>(
              <tr key={s} className="border-t border-border hover:bg-surface-alt"><td className="px-4 py-3 font-semibold">{s}</td><td className="px-4 py-3 text-center text-muted">{w}</td><td className="px-4 py-3 text-center text-muted">{h}</td><td className="px-4 py-3 text-center text-muted">{l}</td></tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="bg-accent/5 border border-accent/20 rounded-2xl p-6">
        <h3 className="font-semibold text-foreground mb-2">💡 Sizing Tip</h3>
        <p className="text-sm text-muted">For a relaxed fit, go one size up from your usual size. For compression or performance fit, stick with your measured size. If in doubt, contact us and we&apos;ll help!</p>
      </div>
    </div>
  );
}
