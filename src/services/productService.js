import staticProducts from '../data/products.json';

// Get all products locally
export const getProducts = async () => {
  return staticProducts;
};

// Get single product by ID
export const getProductById = async (id) => {
  return staticProducts.find(product => product.id === parseInt(id)) || null;
};

// No-op for static architecture
export const addProduct = async () => {
  throw new Error('Admin API is decommissioned. Site is now static.');
};
