import React, { createContext, useState, useEffect, useCallback, useMemo } from 'react';

// Replace with your actual deployed admin URL
const API_BASE_URL = 'https://kandy-admin.vercel.app/api';

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    searchTerm: '',
    category: 'all',
    sortBy: 'name-asc',
  });

  // Fetch products from your deployed admin API
  const fetchProducts = useCallback(async () => {
    setLoading(true);
    setError(null);
    
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

      const data = await response.json();
      console.log('Successfully fetched products from API:', data.length);
      setAllProducts(data);
    } catch (err) {
      console.error('Failed to fetch products from API:', err);
      setError('Failed to load products from server');
      
      // Fallback to mock data if API fails
      setAllProducts(mockProducts);
    } finally {
      setLoading(false);
    }
  }, []);

  // Load products on component mount
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // Add new product via API
  const addProduct = async (productData) => {
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

      // Refresh products after successful add
      await fetchProducts();
      return true;
    } catch (err) {
      console.error('Failed to add product:', err);
      setError('Failed to add product');
      return false;
    }
  };

  // Update product via API
  const updateProduct = async (productData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/products`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),
      });

      if (!response.ok) {
        throw new Error('Failed to update product');
      }

      // Refresh products after successful update
      await fetchProducts();
      return true;
    } catch (err) {
      console.error('Failed to update product:', err);
      setError('Failed to update product');
      return false;
    }
  };

  // Delete product via API
  const deleteProduct = async (productId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/products?id=${productId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete product');
      }

      // Refresh products after successful delete
      await fetchProducts();
      return true;
    } catch (err) {
      console.error('Failed to delete product:', err);
      setError('Failed to delete product');
      return false;
    }
  };

  // Filter and sort products based on current filters
  const filteredAndSortedProducts = useMemo(() => {
    let products = [...allProducts];

    // Filter by search term
    if (filters.searchTerm) {
      products = products.filter(p => 
        p.name.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
        p.description.toLowerCase().includes(filters.searchTerm.toLowerCase())
      );
    }

    // Filter by category
    if (filters.category !== 'all') {
      products = products.filter(p => p.category === filters.category);
    }
    
    // Sort products
    switch (filters.sortBy) {
      case 'price-asc':
        products.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        products.sort((a, b) => b.price - a.price);
        break;
      case 'name-asc':
      default:
        products.sort((a, b) => a.name.localeCompare(b.name));
        break;
    }

    return products;
  }, [allProducts, filters]);

  // Get single product by ID
  const getProductById = (id) => {
    return allProducts.find(p => p.id === parseInt(id));
  };

  // Refresh products manually
  const refreshProducts = () => {
    fetchProducts();
  };

  // Clear any errors
  const clearError = () => {
    setError(null);
  };

  const value = {
    // Data
    products: filteredAndSortedProducts,
    allProducts,
    loading,
    error,
    
    // Filters
    filters,
    setFilters,
    
    // Product operations
    getProductById,
    addProduct,
    updateProduct,
    deleteProduct,
    
    // Utilities
    refreshProducts,
    clearError,
  };

  return (
    <ProductContext.Provider value={value}>
      {children}
    </ProductContext.Provider>
  );
};

// Fallback mock data (same as your existing data)
const mockProducts = [
  {
    id: 1,
    name: "Kevum",
    price: 150,
    category: "traditional",
    description: "A traditional Sri Lankan oil cake made from rice flour and treacle, deep-fried to a golden-brown perfection.",
    images: [
      "/images/kevum2.jpeg", 
      "/images/kevum4.jpeg", 
      "/images/kevum3.jpeg",
      "/images/kevum.jpeg"
    ],
  },
  {
    id: 2,
    name: "Kokis",
    price: 100,
    category: "biscuit",
    description: "A crispy and delicate sweet biscuit made from a batter of rice flour and coconut milk, shaped like a flower.",
    images: [
      "/images/kevum.jpeg", 
      "/images/kevum2.jpeg", 
      "/images/kevum3.jpeg"
    ],
  },
  {
    id: 3,
    name: "Watalappan",
    price: 250,
    category: "pudding",
    description: "A rich and creamy coconut custard pudding, sweetened with jaggery and spiced with cardamom and nutmeg.",
    images: [
      "/images/kevum.jpeg", 
      "/images/kevum2.jpeg", 
      "/images/kevum3.jpeg"
    ],
  },
  {
    id: 4,
    name: "Asmi",
    price: 180,
    category: "traditional",
    description: "A beautiful, lace-like crispy sweet made with rice flour and decorated with a sweet treacle syrup.",
    images: [
      "/images/kevum.jpeg", 
      "/images/kevum2.jpeg", 
      "/images/kevum3.jpeg"
    ],
  },
  {
    id: 5,
    name: "Mung Kevum",
    price: 160,
    category: "traditional",
    description: "A diamond-shaped sweet made from green gram flour and jaggery, with a soft, fudge-like texture.",
    images: [
      "/images/kevum.jpeg", 
      "/images/kevum2.jpeg", 
      "/images/kevum3.jpeg"
    ],
  },
  {
    id: 6,
    name: "Bibikkan",
    price: 350,
    category: "cake",
    description: "A dark, moist, and rich coconut cake made with shredded coconut, jaggery, and semolina, spiced to perfection.",
    images: [
      "/images/kevum2.jpeg", 
      "/images/kevum.jpeg", 
      "/images/kevum3.jpeg"
    ],
  },
  {
    id: 7,
    name: "Aluwa",
    price: 120,
    category: "fudge",
    description: "A soft, diamond-shaped fudge made from roasted rice flour, treacle, and cashews, spiced with cardamom.",
    images: [
      "/images/kevum.jpeg", 
      "/images/kevum2.jpeg", 
      "/images/kevum3.jpeg"
    ],
  },
  {
    id: 8,
    name: "Pani Walalu (Undu Wal)",
    price: 200,
    category: "traditional",
    description: "A sweet, juicy coil-shaped treat made from urad dal batter, deep-fried and soaked in a sweet kithul treacle syrup.",
    images: [
      "/images/kevum3.jpeg", 
      "/images/kevum.jpeg", 
      "/images/kevum2.jpeg"
    ],
  },
  {
    id: 9,
    name: "Kiri Toffee",
    price: 90,
    category: "fudge",
    description: "A simple yet delicious milk toffee made with condensed milk, sugar, and butter, often with cashews.",
    images: [
      "/images/kevum3.jpeg", 
      "/images/kevum2.jpeg", 
      "/images/kevum.jpeg"
    ],
  },
  {
    id: 10,
    name: "Pol Toffee",
    price: 110,
    category: "fudge",
    description: "A classic Sri Lankan sweet made from freshly grated coconut, sugar, and vanilla, with a slightly chewy texture.",
    images: [
      "/images/kevum2.jpeg", 
      "/images/kevum.jpeg", 
      "/images/kevum3.jpeg"
    ],
  }
];
