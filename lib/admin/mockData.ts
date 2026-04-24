export const dashboardKpis = [
  { label: "Today's Revenue", value: 'GBP 6,482', delta: '+18% vs yesterday' },
  { label: 'Orders Today', value: '74', delta: '18 pending, 41 processing' },
  { label: 'Active Customers', value: '1,249', delta: '+6% in last 30 days' },
  { label: 'Cart Abandonment', value: '28.4%', delta: '-2.1% this week' },
  { label: 'Low Stock Alerts', value: '12', delta: '4 critical items' },
  { label: 'Pending Stash Requests', value: '9', delta: '3 new today' },
  { label: 'Trees Planted', value: '18,432', delta: '+74 today' },
];

export const productRows = [
  {
    id: 'P-1001',
    name: 'Performance Rugby Jersey',
    sku: 'YCS-RUG-001',
    category: 'rugbygear',
    price: 'GBP 42.00',
    stock: 64,
    status: 'Active',
    badge: 'Featured',
  },
  {
    id: 'P-1002',
    name: 'Club Training Hoodie',
    sku: 'YCS-ACT-021',
    category: 'activewear',
    price: 'GBP 55.00',
    stock: 18,
    status: 'Active',
    badge: 'Top',
  },
  {
    id: 'P-1003',
    name: 'Match Day Shorts',
    sku: 'YCS-RUG-014',
    category: 'playerequipment',
    price: 'GBP 29.00',
    stock: 9,
    status: 'Active',
    badge: 'Sale',
  },
  {
    id: 'P-1004',
    name: 'Travel Polo',
    sku: 'YCS-LEI-011',
    category: 'leisurewear',
    price: 'GBP 35.00',
    stock: 0,
    status: 'Archived',
    badge: 'None',
  },
];

export const orderRows = [
  {
    id: '#YCS-2026-1042',
    date: '22 Apr 2026',
    customer: 'Olivia Carter',
    items: 3,
    total: 'GBP 118.00',
    payment: 'Paid',
    fulfillment: 'Processing',
    club: 'Warriors RFC',
  },
  {
    id: '#YCS-2026-1041',
    date: '22 Apr 2026',
    customer: 'James Patel',
    items: 2,
    total: 'GBP 74.00',
    payment: 'Paid',
    fulfillment: 'Shipped',
    club: 'Lions FC',
  },
  {
    id: '#YCS-2026-1040',
    date: '21 Apr 2026',
    customer: 'Sophie Green',
    items: 1,
    total: 'GBP 42.00',
    payment: 'Pending',
    fulfillment: 'Pending',
    club: 'Independent',
  },
];

export const clubRows = [
  { id: 'C-001', name: 'Warriors RFC', sport: 'Rugby', products: 28, revenue: 'GBP 84,120', status: 'Active' },
  { id: 'C-002', name: 'Lions FC', sport: 'Football', products: 19, revenue: 'GBP 52,440', status: 'Active' },
  { id: 'C-003', name: 'Falcons Netball', sport: 'Netball', products: 13, revenue: 'GBP 21,890', status: 'Inactive' },
];

export const customerRows = [
  {
    id: 'U-1001',
    name: 'Olivia Carter',
    email: 'olivia@example.com',
    orders: 12,
    totalSpent: 'GBP 1,284.00',
    registered: '18 Jan 2025',
    lastOrder: '22 Apr 2026',
    club: 'Warriors RFC',
  },
  {
    id: 'U-1002',
    name: 'James Patel',
    email: 'james@example.com',
    orders: 5,
    totalSpent: 'GBP 442.00',
    registered: '04 Oct 2025',
    lastOrder: '22 Apr 2026',
    club: 'Lions FC',
  },
  {
    id: 'U-1003',
    name: 'Sophie Green',
    email: 'sophie@example.com',
    orders: 1,
    totalSpent: 'GBP 42.00',
    registered: '20 Apr 2026',
    lastOrder: '21 Apr 2026',
    club: 'Independent',
  },
];
