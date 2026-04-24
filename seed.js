/* eslint-disable @typescript-eslint/no-require-imports */
// ═══════════════════════════════════════════
// Seed Script — Populates Supabase with initial data
// Run: node seed.js
// ═══════════════════════════════════════════

require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { persistSession: false } }
);

async function seed() {
  console.log('🌱 Seeding Your Club Stash database...\n');
  let hadErrors = false;

  // ── CATEGORIES ──
  console.log('🗂️  Seeding categories...');
  const categories = [
    { slug: 'activewear', name: 'Activewear', sort_order: 1 },
    { slug: 'leisurewear', name: 'Leisurewear', sort_order: 2 },
    { slug: 'fashionwear', name: 'Fashionwear', sort_order: 3 },
    { slug: 'playerequipment', name: 'Player Equipment', sort_order: 4 },
    { slug: 'rugbygear', name: 'Rugby Kit & Equipment', sort_order: 5 },
    { slug: 'pvidapadel', name: 'Padel Equipment', sort_order: 6 },
    { slug: 'gift-cards', name: 'Gift Cards', sort_order: 7 },
    { slug: 'outlet', name: 'YCS Outlet', sort_order: 8 },
  ];

  const { error: catErr } = await supabase.from('categories').upsert(categories, { onConflict: 'slug' });
  if (catErr) {
    hadErrors = true;
    console.log('  ⚠️ Categories:', catErr.message);
  } else {
    console.log(`  ✅ ${categories.length} categories seeded`);
  }

  // ── CLUBS ──
  console.log('🏟️  Seeding clubs...');
  const clubs = [
    { slug: 'dorking-rfc', name: 'Dorking RFC', sport: 'rugby', logo_url: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=200&h=200&fit=crop&q=80', description: 'Dorking Rugby Football Club — proudly serving the community since 1921.', is_featured: true, sort_order: 1 },
    { slug: 'piggy-smalls-rfc', name: 'Piggy Smalls RFC', sport: 'rugby', logo_url: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=200&h=200&fit=crop&q=80', description: "Piggy Smalls RFC — the UK's most entertaining rugby team name.", sort_order: 2 },
    { slug: 'woodrush-rfc', name: 'Woodrush RFC', sport: 'rugby', logo_url: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=200&h=200&fit=crop&q=80', description: "Woodrush RFC — Birmingham's finest community rugby club.", sort_order: 3 },
    { slug: 'earlsdon-rfc', name: 'Earlsdon RFC', sport: 'rugby', logo_url: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=200&h=200&fit=crop&q=80', description: "Earlsdon RFC — Coventry's community rugby club.", sort_order: 4 },
    { slug: 'stroud-rfc', name: 'Stroud RFC', sport: 'rugby', logo_url: 'https://images.unsplash.com/photo-1517466787929-bc90951d0974?w=200&h=200&fit=crop&q=80', description: 'Stroud RFC — established in the heart of Gloucestershire.', sort_order: 5 },
    { slug: 'bosham-fc', name: 'Bosham FC', sport: 'football', logo_url: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=200&h=200&fit=crop&q=80', description: 'Bosham Football Club — West Sussex grassroots football at its best.', is_featured: true, sort_order: 1 },
    { slug: 'wab-fc', name: 'WAB FC', sport: 'football', logo_url: 'https://images.unsplash.com/photo-1580087256394-dc596e1c8f4f?w=200&h=200&fit=crop&q=80', description: 'WAB FC — local football excellence.', sort_order: 2 },
    { slug: 'crawley-wasps', name: 'Crawley Wasps FC', sport: 'football', logo_url: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=200&h=200&fit=crop&q=80', description: "Crawley Wasps — women's football trailblazers.", sort_order: 3 },
    { slug: 'hurricanes-softball', name: 'Hurricanes', sport: 'softball', logo_url: 'https://images.unsplash.com/photo-1541746972996-4e0b0f43e02a?w=200&h=200&fit=crop&q=80', description: 'Hurricanes Softball — bringing the storm to every game.', sort_order: 1 },
    { slug: 'tigers-softball', name: 'Tigers', sport: 'softball', logo_url: 'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=200&h=200&fit=crop&q=80', description: 'Tigers Softball — fierce competitors.', sort_order: 2 },
    { slug: 'birmingham-panthers', name: 'Birmingham Panthers', sport: 'korfball', logo_url: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=200&h=200&fit=crop&q=80', description: 'Birmingham Panthers Korfball Club — mixed team excellence.', is_featured: true, sort_order: 1 },
    { slug: 'surrey-storm-netball', name: 'Surrey Storm Netball', sport: 'netball', logo_url: 'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=200&h=200&fit=crop&q=80', description: 'Surrey Storm Netball — inspiring the next generation.', sort_order: 1 },
    { slug: 'london-padel-club', name: 'London Padel Club', sport: 'padel', logo_url: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=200&h=200&fit=crop&q=80', description: 'London Padel Club — the fastest growing racket sport.', sort_order: 1 },
    { slug: 'arrows-darts-team', name: 'Arrows Darts Team', sport: 'darts', logo_url: 'https://images.unsplash.com/photo-1504257432389-52343af06ae3?w=200&h=200&fit=crop&q=80', description: 'Arrows Darts Team — hitting the treble 20 every time.', sort_order: 1 },
    { slug: 'sport-for-change', name: 'Sport for Change', sport: 'charities', logo_url: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=200&h=200&fit=crop&q=80', description: 'Sport for Change — using sport to transform communities.', sort_order: 1 },
  ];

  const normalizedClubs = clubs.map((club) => ({
    is_featured: false,
    is_active: true,
    ...club,
  }));

  const { error: clubErr } = await supabase.from('clubs').upsert(normalizedClubs, { onConflict: 'slug' });
  if (clubErr) {
    hadErrors = true;
    console.log('  ⚠️ Clubs:', clubErr.message);
  } else {
    console.log(`  ✅ ${normalizedClubs.length} clubs seeded`);
  }

  // Get club IDs for linking products
  const { data: dbClubs } = await supabase.from('clubs').select('id, slug');
  const clubMap = {};
  (dbClubs || []).forEach(c => { clubMap[c.slug] = c.id; });

  // ── PRODUCTS ──
  console.log('📦 Seeding products...');
  const products = [
    { slug: 'performance-training-tee', name: 'Performance Training Tee', price: 24.99, category_slug: 'activewear', images: ['/images/products/training-tee.png'], sizes: ['XS','S','M','L','XL','XXL'], colors: ['Navy','Black','Red'], description: 'Lightweight, moisture-wicking training tee designed for peak performance.', badge: 'new', in_stock: true, stock_count: 150, rating: 4.8, review_count: 124, sort_order: 1 },
    { slug: 'elite-compression-shorts', name: 'Elite Compression Shorts', price: 29.99, category_slug: 'activewear', images: ['/images/products/compression-shorts.png'], sizes: ['S','M','L','XL','XXL'], colors: ['Black','Navy'], description: 'High-performance compression shorts with graduated compression technology.', in_stock: true, stock_count: 200, rating: 4.6, review_count: 89, sort_order: 2 },
    { slug: 'pro-match-jersey', name: 'Pro Match Jersey', price: 44.99, original_price: 54.99, category_slug: 'activewear', images: ['/images/products/match-jersey.png'], sizes: ['XS','S','M','L','XL','XXL'], colors: ['Red','Blue','White'], description: 'Professional grade match jersey with sublimated design.', badge: 'sale', in_stock: true, stock_count: 80, rating: 4.9, review_count: 256, sort_order: 3 },
    { slug: 'training-track-pants', name: 'Training Track Pants', price: 34.99, category_slug: 'activewear', images: ['/images/products/track-pants.png'], sizes: ['S','M','L','XL','XXL'], colors: ['Navy'], description: 'Tapered fit track pants with zip pockets.', in_stock: true, stock_count: 120, rating: 4.5, review_count: 67, sort_order: 4 },
    { slug: 'club-hoodie-premium', name: 'Club Hoodie Premium', price: 49.99, category_slug: 'leisurewear', images: ['/images/products/club-hoodie.png'], sizes: ['XS','S','M','L','XL','XXL'], colors: ['Navy','Black','Grey'], description: 'Premium heavyweight hoodie with embroidered club crest.', badge: 'featured', in_stock: true, stock_count: 90, rating: 4.9, review_count: 342, sort_order: 1 },
    { slug: 'sub-robe-changing-coat', name: 'Sub Robe Changing Coat', price: 89.99, category_slug: 'leisurewear', images: ['/images/products/sub-robe.png'], sizes: ['S/M','L/XL'], colors: ['Black','Navy','Camo'], description: 'The ultimate changing robe. Waterproof outer shell with fleece-lined interior.', badge: 'top', in_stock: true, stock_count: 45, rating: 4.7, review_count: 198, sort_order: 2 },
    { slug: 'quarter-zip-midlayer', name: 'Quarter-Zip Midlayer', price: 39.99, category_slug: 'leisurewear', images: ['https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=600&h=600&fit=crop&q=80'], sizes: ['S','M','L','XL','XXL'], colors: ['Charcoal','Navy'], description: 'Versatile quarter-zip midlayer with brushed fleece.', in_stock: true, stock_count: 110, rating: 4.4, review_count: 156, sort_order: 3 },
    { slug: 'pvida-netball-dress', name: 'PVIDA Netball Dress', price: 54.99, category_slug: 'fashionwear', images: ['https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&h=600&fit=crop&q=80'], sizes: ['XS','S','M','L','XL'], colors: ['Red/White'], description: 'Stylish and functional netball dress with built-in shorts.', badge: 'new', in_stock: true, stock_count: 60, rating: 4.8, review_count: 45, sort_order: 1 },
    { slug: 'safejawz-mouthguard', name: 'SafeJawz Mouthguard', price: 19.99, category_slug: 'playerequipment', images: ['https://images.unsplash.com/photo-1517466787929-bc90951d0974?w=600&h=600&fit=crop&q=80'], sizes: ['Junior','Adult'], colors: ['Black','Clear','Pink'], description: 'Custom-fit boil and bite mouthguard.', in_stock: true, stock_count: 300, rating: 4.6, review_count: 312, sort_order: 1 },
    { slug: 'pro-rugby-boots', name: 'Pro Rugby Boots', price: 79.99, original_price: 99.99, category_slug: 'rugbygear', images: ['https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&h=600&fit=crop&q=80'], sizes: ['6','7','8','9','10','11','12'], colors: ['Black'], description: 'Professional rugby boots with 8-stud configuration.', badge: 'sale', in_stock: true, stock_count: 35, rating: 4.7, review_count: 134, sort_order: 1 },
    { slug: 'gift-card-25', name: '£25 Gift Card', price: 25.00, category_slug: 'gift-cards', images: ['https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=600&fit=crop&q=80'], sizes: [], colors: [], description: 'Digital gift card. Send the gift of sports kit.', in_stock: true, stock_count: 999, sort_order: 1 },
    { slug: 'gift-card-50', name: '£50 Gift Card', price: 50.00, category_slug: 'gift-cards', images: ['https://images.unsplash.com/photo-1549465220-1a8b9238f067?w=600&h=600&fit=crop&q=80'], sizes: [], colors: [], description: 'Digital gift card. Perfect for birthdays.', badge: 'featured', in_stock: true, stock_count: 999, sort_order: 2 },
    { slug: 'outlet-training-top', name: 'Training Top — Outlet', price: 14.99, original_price: 29.99, category_slug: 'outlet', images: ['https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=600&h=600&fit=crop&q=80'], sizes: ['M','L','XL'], colors: ['Navy'], description: 'Previous season training top at a great price.', badge: 'sale', in_stock: true, stock_count: 25, rating: 4.2, review_count: 34, sort_order: 1 },
    // Club-specific products
    { slug: 'dorking-rfc-home-jersey', name: 'Dorking RFC Home Jersey', price: 44.99, category_slug: 'activewear', club_id: clubMap['dorking-rfc'], images: ['https://images.unsplash.com/photo-1580087256394-dc596e1c8f4f?w=600&h=600&fit=crop&q=80'], sizes: ['XS','S','M','L','XL','XXL'], colors: ['Navy/Red'], description: 'Official Dorking RFC home jersey.', in_stock: true, stock_count: 75, rating: 4.8, review_count: 45, sort_order: 10 },
    { slug: 'bosham-fc-home-kit', name: 'Bosham FC Home Kit', price: 39.99, category_slug: 'activewear', club_id: clubMap['bosham-fc'], images: ['https://images.unsplash.com/photo-1580087256394-dc596e1c8f4f?w=600&h=600&fit=crop&q=80'], sizes: ['S','M','L','XL'], colors: ['Blue/White'], description: 'Official Bosham FC home kit.', in_stock: true, stock_count: 50, rating: 4.7, review_count: 28, sort_order: 11 },
  ];

  const normalizedProducts = products.map((product) => ({
    review_count: 0,
    in_stock: true,
    is_active: true,
    ...product,
  }));

  const { error: prodErr } = await supabase.from('products').upsert(normalizedProducts, { onConflict: 'slug' });
  if (prodErr) {
    hadErrors = true;
    console.log('  ⚠️ Products:', prodErr.message);
  } else {
    console.log(`  ✅ ${normalizedProducts.length} products seeded`);
  }

  // ── HERO BANNERS ──
  console.log('🖼️  Seeding hero banners...');
  const banners = [
    { title: 'Upgrade Your Game', subtitle: 'High-quality sports kits for every club', cta_text: 'Shop Now', cta_href: '/store', gradient: 'from-primary via-primary-light to-accent', sort_order: 1, is_active: true },
    { title: 'Custom Kit Builder', subtitle: "Design your team's unique identity", cta_text: 'Build Your Stash', cta_href: '/stashbuilder', gradient: 'from-accent via-accent-dark to-primary', sort_order: 2, is_active: true },
    { title: 'New Season Collections', subtitle: 'Fresh drops for 2026 — be the first', cta_text: 'Explore', cta_href: '/store/shop/activewear', gradient: 'from-emerald-700 via-emerald-900 to-primary', sort_order: 3, is_active: true },
    { title: 'Outlet Sale — Up to 50% Off', subtitle: 'Premium kit at unbeatable prices', cta_text: 'Shop Outlet', cta_href: '/store/shop/the-ycs-outlet', gradient: 'from-amber-600 via-orange-700 to-primary', sort_order: 4, is_active: true },
  ];

  const { data: existingBanners, error: existingBannerErr } = await supabase
    .from('hero_banners')
    .select('title');

  if (existingBannerErr) {
    hadErrors = true;
    console.log('  ⚠️ Banners:', existingBannerErr.message);
  } else {
    const existingTitles = new Set((existingBanners || []).map((b) => b.title));
    const missingBanners = banners.filter((banner) => !existingTitles.has(banner.title));

    if (missingBanners.length === 0) {
      console.log('  ✅ Hero banners already seeded');
    } else {
      const { error: bannerErr } = await supabase.from('hero_banners').insert(missingBanners);
      if (bannerErr) {
        hadErrors = true;
        console.log('  ⚠️ Banners:', bannerErr.message);
      } else {
        console.log(`  ✅ ${missingBanners.length} banners seeded`);
      }
    }
  }

  // ── DONE ──
  if (hadErrors) {
    console.log('\n⚠️ Seeding finished with errors. Review the warnings above.');
    process.exitCode = 1;
    return;
  }

  console.log('\n✅ Seeding complete! Your database is ready.');
  console.log('   Go to /admin to see your data in the admin panel.');
}

seed().catch(console.error);
