import React, { useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Button from '../components/common/Button';
import styles from './AboutPage.module.css';

const AboutPage = () => {
  const contactSectionRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (window.location.hash === '#contact-us' && contactSectionRef.current) {
        contactSectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={styles.aboutContainer}>
      <Helmet>
        <title>Our Story & Contact | Kandy Natural Foods</title>
        <meta 
          name="description" 
          content="Learn about Kandy Natural Foods, our heritage in Panvila, Kandy, and our passion for creating natural, handmade Sri Lankan sweets like Kithul Jaggery and Gingelly rolls." 
        />
        <link rel="canonical" href="https://www.kandynaturalfoods.com/about" />
      </Helmet>

      {/* Page Header Section */}
      <section className={styles.headerSection}>
        <h1>Keepers of a Sweet Tradition</h1>
        <p className={styles.subtitle}>
          We are a trusted Sri Lankan company dedicated to producing high-quality, original, and naturally handmade food items that honor our island's heritage.
        </p>
      </section>

      {/* Our Heritage Section */}
      <section className={styles.heritageSection}>
        <div className={styles.heritageImage}>
          <img src="/images/story.jpeg" alt="A depiction of traditional sweet making in Sri Lanka" />
        </div>
        <div className={styles.heritageContent}>
          <h2>A Legacy of Natural Goodness</h2>
          <p>
            Founded by Mr. Nandalal S Sirimalwaththa and Nishani L Amarasinghe, Kandy Natural Foods began with a simple mission: to share the authentic taste of Sri Lanka with the world. Our journey started in a small kitchen in Panvila, Kandy, with recipes passed down through generations. These weren't just instructions; they were stories of family, celebration, and the simple joy of a perfectly made sweet.
          </p>
          <p>
            We honor this legacy by using the same time-tested methods and the purest local ingredients—from rich Kithul sap to nutritious sesame seeds.
          </p>
        </div>
      </section>

      {/* Our Promise Section */}
      <section className={styles.promiseSection}>
        <h2>Our Promise to You</h2>
        <div className={styles.promiseGrid}>
          <div className={styles.promiseCard}>
            <h3>Pure & Natural Ingredients</h3>
            <p>We source the finest Kithul sap, sesame, and spices locally, ensuring every product is fresh, authentic, and free from additives.</p>
          </div>
          <div className={styles.promiseCard}>
            <h3>Handcrafted with Care</h3>
            <p>No shortcuts. Every product, from Kithul Jaggery to Gingelly Rolls, is handmade by skilled artisans dedicated to quality.</p>
          </div>
          <div className={styles.promiseCard}>
            <h3>Authentic Sri Lankan Taste</h3>
            <p>We deliver the comforting, genuine taste of a Sri Lankan home, preserving the flavors that have been cherished for centuries.</p>
          </div>
        </div>
      </section>

      {/* Contact Details Section */}
      <section 
        ref={contactSectionRef} 
        id="contact-us" 
        className={styles.contactSection}
      >
        <h2>Get in Touch</h2>
        <p className={styles.contactSubtitle}>
          We'd love to hear from you! Visit us, call, or send an email for inquiries, special requests, or to place an order.
        </p>
        <div className={styles.contactGrid}>
          <div className={styles.contactItem}>
            <h3>Our Address</h3>
            <p>41/B, Nicedail Garden, Liyangaswagura, Panvila, Kandy, Sri Lanka</p>
          </div>
          <div className={styles.contactItem}>
            <h3>Phone / WhatsApp</h3>
            <p>+94 77 228 0203</p>
          </div>
          <div className={styles.contactItem}>
            <h3>Email</h3>
            <p>kandynaturalfoods@gmail.com</p>
          </div>
          <div className={styles.contactItem}>
            <h3>Business Hours</h3>
            <p>Always Open</p>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className={styles.ctaSection}>
        <h2>Experience the Tradition</h2>
        <p>
          Now that you know our story, we invite you to taste the love and heritage crafted into every product.
        </p>
        <Link to="/products">
          <Button variant="secondary">Browse Our Shop</Button>
        </Link>
      </section>
    </div>
  );
};

export default AboutPage;
