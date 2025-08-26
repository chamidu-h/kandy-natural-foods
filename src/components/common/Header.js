import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Header.module.css';

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        {/* The NavLink now wraps both the image and the text */}
        <NavLink to="/" className={styles.logo}>
          <img 
            src="/images/logo.png" // Absolute path from the public folder
            alt="Kandy Natural Foods Logo" 
            className={styles.logoImg} 
          />
          <span className={styles.logoText}>
            KANDY NATURAL FOODS
          </span>
        </NavLink>
        <nav className={styles.nav}>
          <NavLink to="/" className={({ isActive }) => isActive ? styles.activeLink : styles.link}>Home</NavLink>
          <NavLink to="/products" className={({ isActive }) => isActive ? styles.activeLink : styles.link}>Products</NavLink>
          <NavLink to="/about" className={({ isActive }) => isActive ? styles.activeLink : styles.link}>About Us</NavLink>
        </nav>
      </div>
    </header>
  );
};

export default Header;
