import React, { useState } from 'react';
import Button from '../common/Button';
import styles from './ProductForm.module.css';

const ProductForm = ({ onSave, product = {} }) => {
  const [name, setName] = useState(product.name || '');
  const [price, setPrice] = useState(product.price || '');
  const [description, setDescription] = useState(product.description || '');
  const [category, setCategory] = useState(product.category || 'traditional');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Ensure price is saved as a number
    onSave({ name, price: Number(price), description, category });
    
    // Reset form
    setName('');
    setPrice('');
    setDescription('');
    setCategory('traditional');
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.formGroup}>
        <label htmlFor="name">Product Name</label>
        <input 
          type="text" 
          id="name" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          required 
        />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="price">Price (Numerical Value Only)</label>
        <input 
          type="number" // Changed to number
          id="price" 
          value={price} 
          onChange={(e) => setPrice(e.target.value)} 
          required 
          placeholder="e.g., 150"
        />
      </div>
       <div className={styles.formGroup}>
        <label htmlFor="category">Category</label>
        <select 
          id="category" 
          value={category} 
          onChange={(e) => setCategory(e.target.value)} 
          required
        >
          <option value="traditional">Traditional</option>
          <option value="pudding">Pudding</option>
          <option value="biscuit">Biscuit</option>
        </select>
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="description">Description</label>
        <textarea 
          id="description" 
          value={description} 
          onChange={(e) => setDescription(e.target.value)} 
          required 
        />
      </div>
      <Button type="submit">Save Product</Button>
    </form>
  );
};

export default ProductForm;
