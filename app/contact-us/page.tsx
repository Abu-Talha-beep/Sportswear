import { Metadata } from 'next';
import { Mail, Phone, MapPin, Clock, Send } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Get in touch with the Your Club Stash team. We\'d love to hear from you.',
};

export default function ContactUsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
      <div className="text-center mb-12">
        <h1 className="font-[var(--font-heading)] text-4xl md:text-5xl font-bold text-primary uppercase">Contact Us</h1>
        <p className="text-muted mt-3 max-w-xl mx-auto">Have a question about an order, custom kit, or anything else? We&apos;re here to help.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Contact Info Cards */}
        <div className="space-y-4">
          {[
            { icon: Mail, title: 'Email', detail: 'info@yourclubstash.co.uk', sub: 'We reply within 24 hours' },
            { icon: Phone, title: 'Phone', detail: '+44 (0) 1234 567890', sub: 'Mon-Fri, 9am-5pm' },
            { icon: MapPin, title: 'Address', detail: 'Your Club Stash HQ', sub: 'United Kingdom' },
            { icon: Clock, title: 'Business Hours', detail: 'Mon-Fri: 9am - 5pm', sub: 'Weekends: Closed' },
          ].map(({ icon: Icon, title, detail, sub }) => (
            <div key={title} className="bg-surface rounded-2xl border border-border-light p-5 flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0">
                <Icon className="w-5 h-5 text-accent" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground text-sm">{title}</h3>
                <p className="text-sm text-foreground mt-0.5">{detail}</p>
                <p className="text-xs text-muted mt-0.5">{sub}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-2 bg-surface rounded-2xl border border-border-light p-8">
          <h2 className="font-[var(--font-heading)] text-2xl font-bold text-primary uppercase mb-6">Send us a message</h2>
          <form className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="text-sm font-semibold text-foreground block mb-2">Name</label>
                <input type="text" className="w-full px-4 py-3 bg-surface-alt rounded-xl border border-border focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none text-sm" placeholder="John Smith" />
              </div>
              <div>
                <label className="text-sm font-semibold text-foreground block mb-2">Email</label>
                <input type="email" className="w-full px-4 py-3 bg-surface-alt rounded-xl border border-border focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none text-sm" placeholder="john@example.com" />
              </div>
            </div>
            <div>
              <label className="text-sm font-semibold text-foreground block mb-2">Subject</label>
              <select className="w-full px-4 py-3 bg-surface-alt rounded-xl border border-border focus:border-accent outline-none text-sm">
                <option>General Enquiry</option>
                <option>Order Query</option>
                <option>Custom Kit Request</option>
                <option>Club Partnership</option>
                <option>Returns & Refunds</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-semibold text-foreground block mb-2">Message</label>
              <textarea rows={6} className="w-full px-4 py-3 bg-surface-alt rounded-xl border border-border focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none text-sm resize-none" placeholder="Tell us how we can help..." />
            </div>
            <button type="submit" className="px-8 py-3.5 bg-accent text-white font-[var(--font-heading)] font-bold uppercase rounded-xl hover:bg-accent-dark transition-colors flex items-center gap-2">
              <Send className="w-4 h-4" /> Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
