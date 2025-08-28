import React, { useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ProductContext } from '../context/ProductContext';
import Button from '../components/common/Button';
import styles from './ProductDetailPage.module.css';

const ProductDetailPage = () => {
  const { productId } = useParams();
  const { getProductById } = useContext(ProductContext);
  const product = getProductById(productId);

  // State to manage the currently displayed main image
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!product) {
    return <p>Sweet not found!</p>;
  }

  // Use an empty array as a fallback
  const { images = [] } = product;

  const whatsappMessage = `https://wa.me/+94717524985?text=I'm%20interested%20in%20your%20product:%20${product.name}`;

  return (
    <div>
      <Helmet>
        <title>{`${product.name} | Kandy Natural Foods`}</title>
        <meta name="description" content={product.description} />
      </Helmet>
      <div className={styles.container}>
        {/* Image Gallery Section */}
        <div className={styles.galleryContainer}>
          <div className={styles.mainImageContainer}>
            {images.length > 0 ? (
              <img
                key={currentImageIndex} // Add key to re-trigger animations
                src={images[currentImageIndex]}
                alt={`${product.name} view ${currentImageIndex + 1}`}
                className={styles.mainImage}
              />
            ) : (
              <img src="/images/placeholder.jpg" alt="Placeholder" className={styles.mainImage} />
            )}
          </div>
          {/* Thumbnails - only show if there is more than one image */}
          {images.length > 1 && (
            <div className={styles.thumbnailContainer}>
              {images.map((imageSrc, index) => (
                <button
                  key={index}
                  className={`${styles.thumbnailButton} ${index === currentImageIndex ? styles.activeThumbnail : ''}`}
                  onClick={() => setCurrentImageIndex(index)}
                  aria-label={`View image ${index + 1}`}
                >
                  <img
                    src={imageSrc}
                    alt={`${product.name} thumbnail ${index + 1}`}
                    className={styles.thumbnailImage}
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Details Section */}
        <div className={styles.detailsContainer}>
          <h1>{product.name}</h1>
          <p className={styles.price}>{`Rs. ${product.price}`}</p>
          <p className={styles.description}>{product.description}</p>
          <Button onClick={() => window.open(whatsappMessage, '_blank')}>
            Order on WhatsApp
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
