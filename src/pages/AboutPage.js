import React, { useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Button from '../components/common/Button';
import styles from './AboutPage.module.css';

const AboutPage = () => {
  // Create a ref for the contact section
  const contactSectionRef = useRef(null);

  // Effect to scroll to the contact section if the URL hash is present
  useEffect(() => {
    // A short delay ensures the page has rendered before scrolling
    const timer = setTimeout(() => {
      if (window.location.hash === '#contact-us' && contactSectionRef.current) {
        contactSectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);

    return () => clearTimeout(timer); // Cleanup timer on unmount
  }, []);

  return (
    <div className={styles.aboutContainer}>
      <Helmet>
        <title>Our Story & Contact | Kandy Natural Foods</title>
        <meta 
          name="description" 
          content="Learn about our heritage, passion for Sri Lankan sweets, and how to contact us. Find our address, phone number, and business hours." 
        />
      </Helmet>

      {/* Page Header Section */}
      <section className={styles.headerSection}>
        <h1>From Our Island, to Your Heart</h1>
        <p className={styles.subtitle}>
          We are more than just a sweet shop. We are keepers of tradition, curators of flavor, and a family dedicated to sharing the authentic taste of Sri Lanka.
        </p>
      </section>

      {/* Our Heritage Section */}
      <section className={styles.heritageSection}>
        <div className={styles.heritageImage}>
          <img src="/images/story.jpeg" alt="A depiction of traditional sweet making" />
        </div>
        <div className={styles.heritageContent}>
          <h2>A Legacy of Sweetness</h2>
          <p>
            Our story began in a small village kitchen, with recipes passed down through generations. These weren't just instructions on paper; they were stories of celebrations, family gatherings, and the simple joy of a perfectly made *kevum*. We honor this legacy by using the same time-tested methods and the purest local ingredients—kithul treacle from the nearby palms, fresh coconuts, and rice flour milled in our community.
          </p>
          <p>
            Every sweet we create is a piece of our heritage, a tribute to the hands that first crafted these delicacies.
          </p>
        </div>
      </section>

      {/* Our Promise Section */}
      <section className={styles.promiseSection}>
        <h2>Our Promise to You</h2>
        <div className={styles.promiseGrid}>
          <div className={styles.promiseCard}>
            <h3>Authentic Ingredients</h3>
            <p>We source everything locally, from the jaggery to the spices, ensuring every bite is fresh and flavorful.</p>
          </div>
          <div className={styles.promiseCard}>
            <h3>Handcrafted with Care</h3>
            <p>No machines, no shortcuts. Every sweet is shaped, fried, and decorated by our skilled artisans.</p>
          </div>
          <div className={styles.promiseCard}>
            <h3>A Taste of Home</h3>
            <p>For those who miss it and for those who are new to it, we aim to deliver the comforting taste of a true Sri Lankan home.</p>
          </div>
        </div>
      </section>

      {/* Contact Details Section - Add ref and id */}
      <section 
        ref={contactSectionRef} 
        id="contact-us" 
        className={styles.contactSection}
      >
        <h2>Get in Touch</h2>
        <p className={styles.contactSubtitle}>
          We'd love to hear from you! Visit our shop, give us a call, or send us an email for any inquiries or special orders.
        </p>
        <div className={styles.contactGrid}>
          <div className={styles.contactItem}>
            <h3>Our Shop</h3>
            <p>123 Galle Road, Colombo 03, Sri Lanka</p>
          </div>
          <div className={styles.contactItem}>
            <h3>Phone</h3>
            <p>+94 77 123 4567</p>
          </div>
          <div className={styles.contactItem}>
            <h3>Email</h3>
            <p>orders@yoursweetshop.lk</p>
          </div>
          <div className={styles.contactItem}>
            <h3>Business Hours</h3>
            <p>Mon - Sat: 9:00 AM - 7:00 PM</p>
            <p>Sunday: 10:00 AM - 5:00 PM</p>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className={styles.ctaSection}>
        <h2>Experience the Tradition</h2>
        <p>
          Now that you know our story, we invite you to taste the love and heritage baked into every treat.
        </p>
        <Link to="/products">
          <Button variant="secondary">Browse Our Collection</Button>
        </Link>
      </section>
    </div>
  );
};

export default AboutPage;
