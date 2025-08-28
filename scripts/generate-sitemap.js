const https = require('https');
const fs = require('fs');
const path = require('path');

// --- Configuration ---

// Your website's public URL
const SITE_URL = 'https://www.kandynaturalfoods.com'; 

// The API endpoint from your admin panel to fetch all products
const API_URL = 'https://admin.kandynaturalfoods.com/api/products';

// Path to the 'public' folder in your React app
const PUBLIC_PATH = path.resolve(__dirname, '..', 'public');

/**
 * Fetches product data from your live API.
 * This function is critical for getting the dynamic product IDs.
 * @returns {Promise<Array<{id: string}>>} A promise that resolves to an array of product objects.
 */
function fetchProducts() {
  return new Promise((resolve, reject) => {
    https.get(API_URL, (res) => {
      let data = '';
      
      // A chunk of data has been received.
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      // The whole response has been received.
      res.on('end', () => {
        try {
          const products = JSON.parse(data);
          // Ensure we received an array
          if (Array.isArray(products)) {
            console.log(`✅ Successfully fetched ${products.length} products from the API.`);
            resolve(products);
          } else {
            reject(new Error('API did not return a valid array of products.'));
          }
        } catch (error) {
          reject(new Error(`Failed to parse JSON from API response: ${error.message}`));
        }
      });

    }).on('error', (err) => {
      reject(new Error(`Failed to fetch products from API: ${err.message}`));
    });
  });
}

/**
 * Generates the sitemap.xml file content.
 * @param {Array<{id: string}>} products - The array of product objects from the API.
 * @returns {string} The complete XML content for the sitemap.
 */
function generateSitemapXml(products) {
  const today = new Date().toISOString().split('T')[0];

  // List of static pages from your App.js
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

  // 2. Add dynamic product pages from the API data
  products.forEach(product => {
    // The product ID is used to construct the URL, matching your React Router setup
    xml += '  <url>\n';
    xml += `    <loc>${SITE_URL}/products/${product.id}</loc>\n`;
    xml += `    <lastmod>${today}</lastmod>\n`; // Or use product.updated_at if available
    xml += '  </url>\n';
  });
  
  xml += `</urlset>`;
  
  return xml;
}

/**
 * Main function to run the sitemap generation process.
 */
async function main() {
  try {
    console.log('🚀 Starting sitemap generation...');
    
    // Fetch the live product data
    const products = await fetchProducts();
    
    // Generate the XML content
    const sitemapXml = generateSitemapXml(products);
    
    // Define the full path for the output file
    const sitemapPath = path.join(PUBLIC_PATH, 'sitemap.xml');
    
    // Write the XML to the sitemap.xml file in the 'public' directory
    fs.writeFileSync(sitemapPath, sitemapXml);
    
    console.log(`✅ Sitemap successfully generated and saved to ${sitemapPath}`);
    
  } catch (error) {
    console.error('❌ An error occurred during sitemap generation:');
    console.error(error);
    process.exit(1); // Exit with an error code
  }
}

// Run the main function
main();
