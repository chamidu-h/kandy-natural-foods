import React from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import styles from './FloatingWhatsApp.module.css';

const FloatingWhatsApp = () => {
  return (
    <aside className={styles.floatingContainer} aria-label="WhatsApp quick contact">
      <a
        href="https://wa.me/94772280203"
        target="_blank"
        rel="noopener noreferrer"
        className={styles.whatsappButton}
        aria-label="Chat with us on WhatsApp"
      >
        <span className={styles.pulseRing}></span>
        <FaWhatsapp className={styles.whatsappIcon} />
        <span className={styles.tooltip}>Chat with us</span>
      </a>
    </aside>
  );
};

export default FloatingWhatsApp;
