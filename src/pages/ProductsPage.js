import React from 'react';
import { Helmet } from 'react-helmet-async';
import ProductList from '../components/products/ProductList';
import ProductFilter from '../components/products/ProductFilter';

const ProductsPage = () => {
  return (
    <div>
      <Helmet>
        <title>Our Products | Kandy Natural Foods</title>
        <meta name="description" content="Browse our collection of delicious, handcrafted Sri Lankan sweets." />
      </Helmet>
      <h2>Our Sweets Collection</h2>
      <ProductFilter />
      <ProductList />
    </div>
  );
};

export default ProductsPage;
