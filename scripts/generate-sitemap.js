const fs = require('fs');
const path = require('path');

// --- Configuration ---
const SITE_URL = 'https://www.kandynaturalfoods.com'; 
const PUBLIC_PATH = path.resolve(__dirname, '..', 'public');
const PRODUCTS_PATH = path.resolve(__dirname, '..', 'src', 'data', 'products.json');

/**
 * Loads product data from local static data file.
 * @returns {Array<{id: number|string}>} Array of product objects.
 */
function getProducts() {
  const fileData = fs.readFileSync(PRODUCTS_PATH, 'utf8');
  return JSON.parse(fileData);
}

/**
 * Generates the sitemap.xml file content.
 * @param {Array<{id: number|string}>} products - The array of product objects.
 * @returns {string} The complete XML content for the sitemap.
 */
function generateSitemapXml(products) {
  const today = new Date().toISOString().split('T')[0];

  // List of static pages from App.js
  const staticPages = [
    '/',
    '/products',
    '/about',
  ];

  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

  // 1. Add static pages to the sitemap
  staticPages.forEach(page => {
    xml += '  <url>\n';
    xml += `    <loc>${SITE_URL}${page}</loc>\n`;
    xml += `    <lastmod>${today}</lastmod>\n`;
    xml += '  </url>\n';
  });

  // 2. Add dynamic product pages from static products
  products.forEach(product => {
    xml += '  <url>\n';
    xml += `    <loc>${SITE_URL}/products/${product.id}</loc>\n`;
    xml += `    <lastmod>${today}</lastmod>\n`;
    xml += '  </url>\n';
  });
  
  xml += `</urlset>`;
  
  return xml;
}

/**
 * Main function to run the sitemap generation process.
 */
function main() {
  try {
    console.log('🚀 Starting static sitemap generation...');
    
    const products = getProducts();
    console.log(`✅ Loaded ${products.length} products from local data.`);
    
    const sitemapXml = generateSitemapXml(products);
    const sitemapPath = path.join(PUBLIC_PATH, 'sitemap.xml');
    fs.writeFileSync(sitemapPath, sitemapXml);
    console.log(`✅ Sitemap successfully generated and saved to ${sitemapPath}`);

    const buildPath = path.resolve(__dirname, '..', 'build');
    if (fs.existsSync(buildPath)) {
      const buildSitemapPath = path.join(buildPath, 'sitemap.xml');
      fs.writeFileSync(buildSitemapPath, sitemapXml);
      console.log(`✅ Sitemap also copied to production build at ${buildSitemapPath}`);
    }
  } catch (error) {
    console.error('❌ An error occurred during sitemap generation:', error);
    process.exit(1);
  }
}

main();
