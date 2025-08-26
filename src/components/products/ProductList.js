import React, { useContext } from 'react';
import { ProductContext } from '../../context/ProductContext';
import ProductCard from './ProductCard';
import styles from './ProductList.module.css';

const ProductList = () => {
  const { products, loading } = useContext(ProductContext);

  if (loading) {
    return <p>Loading sweets...</p>;
  }

  return (
    <div className={styles.grid}>
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductList;
