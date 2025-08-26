import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import styles from './ProductCard.module.css';

const ProductCard = ({ product }) => {
  // Use an empty array as a fallback if images are not provided
  const { id, name, price, images = [] } = product;
  const [currentIndex, setCurrentIndex] = useState(0);

  // Function to go to the next slide
  const goToNext = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  }, [images.length]);

  // Set up the automatic slideshow timer
  useEffect(() => {
    // Only start the timer if there is more than one image
    if (images.length > 1) {
      const timer = setInterval(goToNext, 4000); // Slides every 4 seconds
      return () => clearInterval(timer); // Cleanup the timer
    }
  }, [images.length, goToNext]);

  // Manual navigation handlers
  const handleNextClick = (e) => {
    e.preventDefault(); // Prevent link navigation when clicking buttons
    goToNext();
  };

  const handlePrevClick = (e) => {
    e.preventDefault(); // Prevent link navigation
    const newIndex = (currentIndex - 1 + images.length) % images.length;
    setCurrentIndex(newIndex);
  };

  return (
    <div className={styles.card}>
      {/* The entire card is a link, but the carousel can be interacted with */}
      <Link to={`/products/${id}`} className={styles.cardLink}>
        <div className={styles.imageContainer}>
          {images.length > 0 ? (
            <img
              key={currentIndex} // Re-trigger the animation on index change
              src={images[currentIndex]}
              alt={`${name} view ${currentIndex + 1}`}
              className={styles.image}
            />
          ) : (
            // Fallback placeholder if no images are available
            <img src="/images/placeholder.jpg" alt="Placeholder" className={styles.image} />
          )}
          
          {/* Show navigation buttons only if there is more than one image */}
          {images.length > 1 && (
            <>
              <button
                className={`${styles.navButton} ${styles.prevButton}`}
                onClick={handlePrevClick}
                aria-label="Previous image"
              >
                &#10094;
              </button>
              <button
                className={`${styles.navButton} ${styles.nextButton}`}
                onClick={handleNextClick}
                aria-label="Next image"
              >
                &#10095;
              </button>
            </>
          )}
        </div>

        <div className={styles.content}>
          <h3 className={styles.name}>{name}</h3>
          <p className={styles.price}>{`Rs. ${price}`}</p>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
