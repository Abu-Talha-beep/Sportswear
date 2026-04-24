// ═══════════════════════════════════════════
// NAVIGATION DATA
// ═══════════════════════════════════════════

import { NavItem } from '@/types';

export const mainNavigation: NavItem[] = [
  { label: 'Home', href: '/' },
  {
    label: 'Club Shops',
    href: '/store/clubs',
    children: [
      { label: 'Rugby Clubs', href: '/store/clubs/rugbyclubs' },
      { label: 'Football Clubs', href: '/store/clubs/footballclubs' },
      { label: 'Softball Teams', href: '/store/clubs/softball-teams' },
      { label: 'Darts Teams', href: '/store/clubs/dartsteams' },
      { label: 'Korfball', href: '/store/clubs/korfball' },
      { label: 'Netball', href: '/store/clubs/netball' },
      { label: 'Padel', href: '/store/clubs/padel' },
      { label: 'Horseball', href: '/store/clubs/horseball' },
      { label: 'Charities', href: '/store/clubs/charities' },
    ],
  },
  {
    label: 'Shop',
    href: '/store',
    children: [
      { label: 'Activewear', href: '/store/shop/activewear' },
      { label: 'Leisurewear', href: '/store/shop/leisurewear' },
      { label: 'Fashionwear', href: '/store/shop/fashionwear' },
      { label: 'Player Equipment', href: '/store/shop/playerequipment' },
      { label: 'Rugby Gear', href: '/store/shop/rugbygear' },
      { label: 'The Pride Collection', href: '/store/shop/the-pride-collection' },
      { label: 'YCS Outlet', href: '/store/shop/the-ycs-outlet' },
      { label: 'Gift Cards', href: '/store/shop/gift-cards' },
    ],
  },
  { label: 'Create Your Stash', href: '/stashbuilder' },
  { label: 'About', href: '/about' },
];

export const footerLinks = {
  help: [
    { label: 'Sustainability', href: '/sustainability' },
    { label: 'Size Guides', href: '/size-guides' },
    { label: 'Delivery', href: '/delivery' },
    { label: 'FAQs', href: '/faqs' },
    { label: 'Contact Us', href: '/contact-us' },
  ],
  legal: [
    { label: 'Returns Policy', href: '/returns-policy' },
    { label: 'Terms & Conditions', href: '/terms' },
    { label: 'Privacy Policy', href: '/privacy-policy' },
  ],
};

export const announcementMessages = [
  'FREE delivery on orders over £50 🚚',
  '#STASHLIFE — Join the movement',
  'Custom kit design available — Build Your Stash today!',
];
