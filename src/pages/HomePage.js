import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Button from '../components/common/Button';
import { FaWhatsapp } from 'react-icons/fa';
import ProductCard from '../components/products/ProductCard';
import { ProductContext } from '../context/ProductContext';
import styles from './HomePage.module.css';

const heroImages = [
  "/images/hero/hero3.JPG",
  "/images/hero/hero2.JPG",
  "/images/hero/hero5.JPG",
  "/images/hero/hero4.JPG",
  "/images/hero/hero1.JPG",
];

const SLIDE_INTERVAL = 4000;

// Define the names of the static featured products
const STATIC_FEATURED_PRODUCT_NAMES = [
  'Kithul jaggery (250g)',
  'Kithul treacle (200ml)',
  'Kithul jaggery cubes (25 pcs)',
];

const HomePage = () => {
  const { products, loading } = React.useContext(ProductContext);

  // State for the static featured products (3 defined products)
  const [staticFeaturedProducts, setStaticFeaturedProducts] = useState([]);
  
  // State for the randomly selected products (6 products, excluding static ones)
  const [randomProducts, setRandomProducts] = useState([]);

  // Hero slider state and effect
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() =>
      setCurrentSlide((prev) => (prev + 1) % heroImages.length),
      SLIDE_INTERVAL
    );
    return () => clearTimeout(timer);
  }, [currentSlide]);

  // Effect to separate static and random products when the product list is available
  useEffect(() => {
    if (products.length > 0) {
      // 1. Find the static featured products by name
      const staticProducts = STATIC_FEATURED_PRODUCT_NAMES.map(name => 
        products.find(p => p.name === name)
      ).filter(Boolean); // .filter(Boolean) removes any undefined if a product isn't found
      
      setStaticFeaturedProducts(staticProducts);

      // 2. Create a list of products that are NOT in the static list
      const otherProducts = products.filter(p => !STATIC_FEATURED_PRODUCT_NAMES.includes(p.name));
      
      // 3. Shuffle the 'otherProducts' list (Fisher-Yates shuffle)
      const shuffled = [...otherProducts];
      let currentIndex = shuffled.length;
      let randomIndex;

      while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [shuffled[currentIndex], shuffled[randomIndex]] = [
          shuffled[randomIndex],
          shuffled[currentIndex],
        ];
      }

      // 4. Set the random products to the first 6 items of the shuffled array
      setRandomProducts(shuffled.slice(0, 6));
    }
  }, [products]); // This effect runs whenever the main 'products' list changes

  const goToSlide = (idx) => setCurrentSlide(idx);

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Kandy Natural Foods (PVT) LTD",
    "url": "https://www.kandynaturalfoods.com",
    "logo": "https://www.kandynaturalfoods.com/logo.png",
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+94-77-228-0203",
      "contactType": "Customer Service",
      "email": "kandynaturalfoods@gmail.com",
      "areaServed": "LK",
      "availableLanguage": "en"
    },
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "41/B, Nicedail Garden, Liyangaswagura, Panvila",
      "addressLocality": "Kandy",
      "country": "LK"
    },
    "founder": [
      {
        "@type": "Person",
        "name": "Mr. Nandalal S Sirimalwaththa"
      },
      {
        "@type": "Person",
        "name": "Nishani L Amarasinghe"
      }
    ]
  };

  return (
    <div className={styles.homeContainer}>
      <Helmet>
        <title>Kandy Natural Foods (PVT) LTD | Authentic Sri Lankan Kithul & Gingelly Sweets</title>
        <meta name="description" content="Buy pure Kithul Jaggery, Kithul Treacle, and handmade Gingelly rolls online. Experience the traditional taste of Kandy, Sri Lanka, delivered to your door." />
        <link rel="canonical" href="https://www.kandynaturalfoods.com" />
        <script type="application/ld+json">
          {JSON.stringify(organizationSchema)}
        </script>
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
          <div className={styles.heroOverlay}></div>
        </div>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>Authentic Kithul Jaggery & Traditional Sweets</h1>
          <p className={styles.heroSubtitle}>
            Discover the rich, natural flavors of handmade Kithul Jaggery, Kithul Treacle, and Gingelly sweets, crafted with love in the heart of Kandy.
          </p>
          <div className={styles.heroButtons}>
            {/* Primary, standout button */}
            <Link to="/products">
              <Button variant="heroPrimary">Explore Our Products</Button>
            </Link>
            
            {/* Group for secondary contact actions */}
            <div className={styles.contactActions}>
              <Link to="/about#contact-us">
                <Button variant="heroSecondary">Contact Us</Button>
              </Link>
              <a href="https://wa.me/94772280203" target="_blank" rel="noopener noreferrer" className={styles.whatsappHeroButton} aria-label="Chat on WhatsApp">
                <FaWhatsapp />
              </a>
            </div>
          </div>
          <div className={styles.sliderDots}>
            {heroImages.map((img, idx) => (
              <button
                key={img}
                aria-label={`Show slide ${idx + 1}`}
                className={`${styles.dot} ${idx === currentSlide ? styles.dotActive : ''}`}
                onClick={(e) => { e.preventDefault(); goToSlide(idx); }}
                tabIndex={0}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Static Featured Products Section */}
      <section className={styles.featuredSection}>
        <h2 className={styles.sectionTitle}>Our Specialty Products</h2>
        {loading ? (
          <p>Loading our specialty products...</p>
        ) : (
          <div className={styles.featuredGrid}>
            {staticFeaturedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>

      {/* Random "More to Explore" Section */}
      <section className={styles.featuredSection}>
        <h2 className={styles.sectionTitle}>More to Explore</h2>
        {loading ? (
          <p>Loading more handcrafted treats...</p>
        ) : (
          <div className={styles.featuredGrid}>
            {randomProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
        <div className={styles.viewAllButtonContainer}>
            <Link to="/products">
                <Button variant="primary">View All Products</Button>
            </Link>
        </div>
      </section>

      {/* Our Story Section */}
      <section className={styles.storySection}>
        <div className={styles.storyContent}>
            <h2 className={styles.sectionTitle}>From Kandy Natural Foods to You</h2>
            <p>
                Kandy Natural Foods is a trusted family company dedicated to preserving Sri Lanka's culinary heritage. We use time-honored recipes and the finest natural ingredients to create authentic, healthy, and delicious foods.
            </p>
            <Link to="/about">
                <Button variant="primary">Discover Our Story</Button>
            </Link>
        </div>
        <div className={styles.storyImage}>
            <img src="/images/story.jpeg" alt="The traditional art of Sri Lankan Kithul Jaggery making" />
        </div>
      </section>

    </div>
  );
};

export default HomePage;
