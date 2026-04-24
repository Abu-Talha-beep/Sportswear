import type { Metadata } from 'next';
import { Barlow_Condensed, DM_Sans } from 'next/font/google';
import './globals.css';
import { AnnouncementBar } from '@/components/layout/AnnouncementBar';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { CartDrawer } from '@/components/cart/CartDrawer';
import { ScrollToTop } from '@/components/ui/ScrollToTop';

const barlowCondensed = Barlow_Condensed({
  subsets: ['latin'],
  weight: ['400', '600', '700', '800'],
  variable: '--font-heading',
  display: 'swap',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-body',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'Your Club Stash — Upgrade Your Game with High-Quality Sports Kits',
    template: '%s | Your Club Stash',
  },
  description:
    'UK-based supplier of activewear, leisurewear, and sporting goods for sports clubs, schools, businesses, and charities. Custom kit design and team wear specialists.',
  keywords: [
    'sports kit',
    'team wear',
    'custom sportswear',
    'rugby kit',
    'football kit',
    'club shop',
    'UK sportswear',
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${barlowCondensed.variable} ${dmSans.variable} h-full`}
    >
      <body className="min-h-full flex flex-col antialiased" suppressHydrationWarning>
        <AnnouncementBar />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <CartDrawer />
        <ScrollToTop />
      </body>
    </html>
  );
}
