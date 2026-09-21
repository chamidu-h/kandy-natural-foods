import React, { createContext, useState, useCallback, useMemo } from 'react';
import staticProducts from '../data/products.json';

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [allProducts] = useState(staticProducts);
  const [loading] = useState(false);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    searchTerm: '',
    category: 'all',
    sortBy: 'name-asc',
  });

  // Keep refreshProducts for backwards compatibility
  const fetchProducts = useCallback(() => {
    // Static data already loaded
  }, []);

  // No-op mutations for static architecture
  const addProduct = async () => {
    console.warn('Product addition is disabled in static mode.');
    return false;
  };

  const updateProduct = async () => {
    console.warn('Product updates are disabled in static mode.');
    return false;
  };

  const deleteProduct = async () => {
    console.warn('Product deletion is disabled in static mode.');
    return false;
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

  // Clear error
  const clearError = useCallback(() => {
    setError(null);
  }, []);

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
    refreshProducts: fetchProducts,
    clearError,
  };

  return (
    <ProductContext.Provider value={value}>
      {children}
    </ProductContext.Provider>
  );
};
