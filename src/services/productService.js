// Base URL for your deployed admin API
const API_BASE_URL = 'https://kandy-admin.vercel.app/api';

// Get all products from API
export const getProducts = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/products`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const products = await response.json();
    return products;
  } catch (error) {
    console.error('Failed to fetch products from API:', error);
    
    // Return empty array if API fails
    return [];
  }
};

// Get single product by ID
export const getProductById = async (id) => {
  try {
    const products = await getProducts();
    return products.find(product => product.id === parseInt(id));
  } catch (error) {
    console.error('Failed to fetch product:', error);
    return null;
  }
};

// Add new product (for admin use)
export const addProduct = async (productData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/products`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(productData),
    });

    if (!response.ok) {
      throw new Error('Failed to add product');
    }

    return await response.json();
  } catch (error) {
    console.error('Failed to add product:', error);
    throw error;
  }
};
