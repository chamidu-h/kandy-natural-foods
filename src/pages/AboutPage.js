import React, { useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { FaWhatsapp } from 'react-icons/fa';
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
    <div className={styles.pageWrapper}>
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
        <section className={`${styles.section} ${styles.headerSection}`}>
          <h1>Keepers of a Sweet Tradition</h1>
          <p className={styles.subtitle}>
            We are a trusted Sri Lankan company dedicated to producing high-quality, original, and naturally handmade food items that honor our island's heritage.
          </p>
        </section>


        {/* Our Heritage Section */}
        <section className={`${styles.section} ${styles.heritageSection}`}>
          <div className={styles.heritageImage}>
            <img src="/images/story.jpeg" alt="The lush, green landscape of Panvila, Kandy, home of Kandy Natural Foods" />
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


        {/* --- NEW: Beyond Kithul - All Traditional Sweets Section --- */}
        <section className={`${styles.section} ${styles.allSweetsSection}`}>
          <div className={styles.allSweetsContent}>
            <h2>Masters of Tradition, Beyond Kithul</h2>
            <p>
              While Kithul is at the heart of our story, our passion extends to the entire spectrum of Sri Lankan sweets. We are experts in crafting the delightful blend of tradition and flavor that defines our nation's festive treats. 
            </p>
            <p>
              From the crispy elegance of <strong>kokis</strong> and the golden richness of <strong>konda kavum</strong>, to the soft, leaf-wrapped <strong>helapa</strong> and the spiced coconut goodness of <strong>bibikkan</strong>, each sweet offers a unique texture and taste. Whether it's the creamy <strong>watalappan</strong>, the crumbly <strong>aluwa</strong>, or the festive crunch of <strong>thala kerali</strong>, our sweets are more than just desserts—they’re edible celebrations of culture and generations of love.
            </p>
          </div>
          <div className={styles.allSweetsImage}>
            {/* Make sure to save the attached image to this path in your public folder */}
            <img src="/images/all-sweets.jpg" alt="A vibrant assortment of traditional Sri Lankan sweets like kokis, kavum, aluwa, and pani walalu" />
          </div>
        </section>


        {/* The Kithul Tradition Section */}
        <section className={`${styles.section} ${styles.kithulHistorySection}`}>
          <div className={styles.kithulHistoryContent}>
            <h2>The Soul of Our Sweets: Kithul</h2>
            <h3>The History of a Treasured Palm</h3>
            <p>
              Kithul (Caryota urens), commonly known as the fishtail palm, has been a part of Sri Lankan culture for centuries. This remarkable tree is deeply woven into the island’s rural life, particularly in the central and southern regions. Traditionally, villagers tapped the sap from the Kithul flower to make treacle (kithul peni) and jaggery (hakuru) — prized sweeteners used in both everyday cooking and ceremonial offerings.
            </p>
            <p>
              The practice of kithul tapping is a skilled, time-consuming art passed down through generations. It involves climbing tall palms, delicately slicing the flower stalks, and collecting the sap drop by drop. The collected sap is then slowly boiled over wood fires to produce pure, golden treacle or allowed to crystallize into jaggery.
            </p>
          </div>
          <div className={styles.kithulHistoryImage}>
            <img src="/images/kithul-tapping-process.jpg" alt="A skilled tapper harvesting sap from a Kithul palm tree" className={styles.fullWidthImage} />
          </div>
        </section>


        {/* Kithul Products Section */}
        <section className={`${styles.section} ${styles.kithulProductsSection}`}>
          <h2>The Golden Harvest</h2>
          <div className={styles.kithulProductsGrid}>
            {/* Kithul Treacle Card */}
            <div className={styles.productCard}>
              <div className={styles.productImageContainer}>
                <img src="/images/kithul-treacle.jpg" alt="A bottle of rich, golden Kithul Treacle" className={styles.fullWidthImage} />
              </div>
              <h3>What is Kithul Treacle?</h3>
              <p>
                Kithul treacle (Kithul peni) is a natural sweet syrup made from the sap of the Kithul palm. Harvested by skilled tappers, the sap is slowly boiled over a wood fire until it thickens into a smooth, sticky syrup — without any additives or preservatives.
              </p>
              <ul className={styles.featuresList}>
                <li>🌿 100% Natural – No refined sugar, no chemicals.</li>
                <li>🍯 Unique Taste – Deep caramel notes with a hint of smokiness.</li>
                <li>💪 Health Benefits – Low glycemic index compared to regular sugar.</li>
              </ul>
            </div>


            {/* Kithul Jaggery Card */}
            <div className={styles.productCard}>
              <div className={styles.productImageContainer}>
                <img src="/images/kithul-jaggery.jpg" alt="Solid blocks of dark, natural Kithul Jaggery" className={styles.fullWidthImage} />
              </div>
              <h3>What is Kithul Jaggery?</h3>
              <p>
                Kithul jaggery (Kithul hakuru) is a traditional sweetener made by boiling Kithul sap until it solidifies into blocks. Dark, rich, and deeply aromatic, it is considered the finest and most flavorful type of jaggery in Sri Lanka, produced using centuries-old artisanal methods.
              </p>
              <ul className={styles.featuresList}>
                <li>🍫 Rich Flavor – Deep, earthy sweetness with a smoky note.</li>
                <li>🌱 100% Natural – No additives or artificial colors.</li>
                <li>💡 Healthy Alternative – Contains iron, calcium, and potassium.</li>
              </ul>
            </div>
          </div>
        </section>


        {/* Our Promise Section */}
        <section className={`${styles.section} ${styles.promiseSection}`}>
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
        
        {/* Versatility of Kithul Section */}
        <section className={`${styles.section} ${styles.sweetsCelebrationSection}`}>
          <div className={styles.sweetsContent}>
            <h2>From Our Palm to Your Plate</h2>
            <p>
              More than just a sweetener, Kithul Jaggery and Treacle are versatile ingredients that inspire culinary creativity. Drizzle our rich <strong>Kithul Treacle</strong> over buffalo curd for a classic dessert, or stir our fragrant <strong>Kithul Jaggery</strong> into your morning tea. From baking to traditional sweets, the deep, smoky-caramel notes of Kithul elevate every dish.
            </p>
          </div>
          <div className={styles.sweetsImageGrid}>
            <div className={styles.gridImageContainer}>
              <img src="/images/kithul-curd-and-treacle.jpg" alt="Kithul treacle being drizzled over a bowl of buffalo curd" className={styles.gridImage} />
            </div>
            <div className={styles.gridImageContainer}>
              <img src="/images/kithul-jaggery-from-tree.jpg" alt="Kithul tree" className={styles.gridImage} />
            </div>
            <div className={styles.gridImageContainer}>
              <img src="/images/kithul-jaggery-with-waffles.jpg" alt="A freshly baked cake made with Kithul as a natural sweetener" className={styles.gridImage} />
            </div>
            <div className={styles.gridImageContainer}>
              <img src="/images/traditional-kithul-with-pancakes.jpg" alt="An assortment of traditional Sri Lankan sweets made with Kithul" className={styles.gridImage} />
            </div>
          </div>
        </section>


        {/* Contact Details Section */}
        <section ref={contactSectionRef} id="contact-us" className={`${styles.section} ${styles.contactSection}`}>
          <h2>Get in Touch</h2>
          <p className={styles.contactSubtitle}>
            We'd love to hear from you! Visit us, call, or send an email for inquiries or to place an order.
          </p>
          <div className={styles.contactGrid}>
            <div className={styles.contactItem}>
              <h3>Our Address</h3>
              <p>41/B, Nicedail Garden, Liyangaswagura, Panvila, Kandy, Sri Lanka</p>
            </div>
            <div className={styles.contactItem}>
              <h3>Phone / WhatsApp</h3>
              <p>+94 77 228 0203</p>
              <a href="https://wa.me/94772280203" target="_blank" rel="noopener noreferrer" className={styles.whatsappButtonLink}>
                <Button variant="whatsapp" className={styles.whatsappButton}>
                  <FaWhatsapp className={styles.whatsappIcon} />
                  Chat on WhatsApp
                </Button>
              </a>
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
        <section className={`${styles.section} ${styles.ctaSection}`}>
          <h2>Experience the Tradition</h2>
          <p>
            Now that you know our story, we invite you to taste the love and heritage crafted into every product.
          </p>
          <Link to="/products">
            <Button variant="secondary">Browse Our Shop</Button>
          </Link>
        </section>
      </div>
    </div>
  );
};


export default AboutPage;
