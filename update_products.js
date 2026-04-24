const fs = require('fs');

const replacements = [
  { search: /getProductsByCategory\(/g, replace: 'await getProductsByCategoryAsync(' },
  { search: /getProductsByClub\(/g, replace: 'await getProductsByClubAsync(' },
  { search: /getProductBySlug\(/g, replace: 'await getProductBySlugAsync(' },
  { search: /getOutletProducts\(/g, replace: 'await getOutletProductsAsync(' },
  { search: /getFeaturedProducts\(/g, replace: 'await getFeaturedProductsAsync(' },
  { search: /products\.filter\(\(p\) => !p\.clubSlug\)/g, replace: '(await getAllProductsAsync()).filter((p) => !p.clubSlug)' },
  { search: /import \{([^}]*)\} from '@\/lib\/data\/products';/g, replace: (match, p1) => {
    let newImports = p1.replace(/getProductsByCategory/g, 'getProductsByCategoryAsync')
                       .replace(/getProductsByClub/g, 'getProductsByClubAsync')
                       .replace(/getProductBySlug/g, 'getProductBySlugAsync')
                       .replace(/getOutletProducts/g, 'getOutletProductsAsync')
                       .replace(/getFeaturedProducts/g, 'getFeaturedProductsAsync')
                       .replace(/products(?!By)/g, 'getAllProductsAsync');
    return `import { ${newImports.split(',').map(s=>s.trim()).filter(Boolean).join(', ')} } from '@/lib/data/products';`;
  }}
];

const files = [
  'app/store/shop/the-ycs-outlet/page.tsx',
  'app/store/shop/rugbygear/page.tsx',
  'app/store/shop/playerequipment/page.tsx',
  'app/store/shop/leisurewear/page.tsx',
  'app/store/shop/the-pride-collection/page.tsx',
  'app/store/shop/gift-cards/page.tsx',
  'app/store/shop/fashionwear/page.tsx',
  'app/store/shop/activewear/page.tsx',
  'app/store/page.tsx',
  'app/store/clubs/[clubSlug]/page.tsx',
  'app/product/[slug]/page.tsx',
];

for (const file of files) {
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');
    
    // special replacements
    for (const {search, replace} of replacements) {
      content = typeof replace === 'function' ? content.replace(search, replace) : content.replace(search, replace);
    }

    // Add dynamic export to make sure these pages stay fresh
    if (!content.includes('force-dynamic')) {
      content = content.replace(/import \{ Metadata \} from 'next';/, "import { Metadata } from 'next';\nexport const dynamic = 'force-dynamic';");
    }

    fs.writeFileSync(file, content);
    console.log('Updated ' + file);
  } else {
    console.log('Not found ' + file);
  }
}
