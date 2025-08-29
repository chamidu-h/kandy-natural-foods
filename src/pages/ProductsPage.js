import React from 'react';
import { Helmet } from 'react-helmet-async';
import ProductList from '../components/products/ProductList';
import ProductFilter from '../components/products/ProductFilter';

const ProductsPage = () => {
  return (
    <div>
      <Helmet>
        <title>Our Products | Kithul Jaggery, Treacle & More | Kandy Natural Foods</title>
        <meta name="description" content="Browse our collection of delicious, handcrafted Sri Lankan sweets, including pure Kithul Jaggery, Kithul Treacle, and nutritious Gingelly rolls and balls." />
        <link rel="canonical" href="https://www.kandynaturalfoods.com/products" />
      </Helmet>
      <h2>Our Collection of Natural Sri Lankan Kithul Products</h2>
      <ProductFilter />
      <ProductList />
    </div>
  );
};

export default ProductsPage;
