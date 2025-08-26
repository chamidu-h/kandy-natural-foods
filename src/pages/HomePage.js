import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Button from '../components/common/Button';
import ProductCard from '../components/products/ProductCard';
import { ProductContext } from '../context/ProductContext';
import styles from './HomePage.module.css';

const heroImages = [
  "/images/hero/hero1.jpg",
  "/images/hero/hero2.jpg",
  "/images/hero/hero3.jpg",
  "/images/hero/hero4.jpg",
];

const SLIDE_INTERVAL = 4000;

const HomePage = () => {
  const { products, loading } = React.useContext(ProductContext);
  const featuredProducts = products.slice(0, 6);

  // HERO SLIDER STATE
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() =>
      setCurrentSlide((prev) => (prev + 1) % heroImages.length),
      SLIDE_INTERVAL
    );
    return () => clearTimeout(timer);
  }, [currentSlide]);

  // Manual navigation (optional for mobile)
  const goToSlide = idx => setCurrentSlide(idx);

  return (
    <div className={styles.homeContainer}>
      <Helmet>
        <title>Your Sweet Shop | Handcrafted Sri Lankan Sweets</title>
        <meta name="description" content="Experience the authentic taste of Sri Lanka. We create traditional, handcrafted sweets with love, using the finest local ingredients." />
      </Helmet>
      
      {/* Cinematic Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroBgSlider}>
          {heroImages.map((imgSrc, idx) => (
            <div
              key={imgSrc}
              className={`${styles.bgSlide} ${idx === currentSlide ? styles.activeBg : ''}`}
              style={{ backgroundImage: `url(${imgSrc})` }}
              aria-hidden={idx !== currentSlide}
            />
          ))}
          {/* Layered color and gradient for legibility */}
          <div className={styles.heroOverlay}></div>
        </div>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>A Taste of Tradition, Crafted with Love</h1>
          <p className={styles.heroSubtitle}>
            Discover the authentic flavors of Sri Lankan sweets, made fresh daily with the finest local ingredients.
          </p>
          <div className={styles.heroButtons}>
            <Link to="/products">
              <Button variant="secondary">Explore Our Sweets</Button>
            </Link>
            <Link to="/about#contact-us">
              <Button variant="primary">Contact Us</Button>
            </Link>
          </div>
          {/* Slider pagination indicator for manual control (optional) */}
          <div className={styles.sliderDots}>
            {heroImages.map((img, idx) => (
              <button
                key={img}
                aria-label={`Show slide ${idx + 1}`}
                className={`${styles.dot} ${idx === currentSlide ? styles.dotActive : ''}`}
                onClick={e => { e.preventDefault(); goToSlide(idx); }}
                tabIndex={0}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className={styles.featuredSection}>
        <h2 className={styles.sectionTitle}>Our Featured Treats</h2>
        {loading ? (
          <p>Loading our delicious sweets...</p>
        ) : (
          <div className={styles.featuredGrid}>
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
        {/* New "View All" button added below the grid */}
        <div className={styles.viewAllButtonContainer}>
            <Link to="/products">
                <Button variant="primary">View All Sweets</Button>
            </Link>
        </div>
      </section>

      {/* Our Story Section */}
      <section className={styles.storySection}>
        <div className={styles.storyContent}>
            <h2 className={styles.sectionTitle}>From Our Family to Yours</h2>
            <p>
                For generations, our family has perfected the art of Sri Lankan sweet-making. We pour our hearts into every recipe, using time-honored techniques and pure, natural ingredients. It's more than just a business—it's our heritage.
            </p>
            <Link to="/products">
                <Button variant="primary">View Full Collection</Button>
            </Link>
        </div>
        <div className={styles.storyImage}>
            <img src="/images/story.jpeg" alt="The making of our sweets" />
        </div>
      </section>

    </div>
  );
};

export default HomePage;
