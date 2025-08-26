import React, { useContext } from 'react';
import { ProductContext } from '../../context/ProductContext';
import ProductForm from './ProductForm';
import styles from './AdminDashboard.module.css';

const AdminDashboard = () => {
  const { products, addProduct } = useContext(ProductContext);

  return (
    <div className={styles.dashboard}>
      <h2>Admin Dashboard</h2>
      
      <div className={styles.section}>
        <h3>Add New Product</h3>
        <ProductForm onSave={addProduct} />
      </div>

      <div className={styles.section}>
        <h3>Manage Existing Products</h3>
        <ul className={styles.productList}>
          {products.map(product => (
            <li key={product.id} className={styles.productItem}>
              <span>{product.name}</span>
              <div>
                <button className={styles.editButton}>Edit</button>
                <button className={styles.deleteButton}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AdminDashboard;
