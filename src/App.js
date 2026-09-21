import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import ProductDetailPage from './pages/ProductDetailPage';
import AboutPage from './pages/AboutPage'; 
import AdminPage from './pages/AdminPage';
import { ProductProvider } from './context/ProductContext';
import ScrollToTop from './components/utility/ScrollToTop';

import FloatingWhatsApp from './components/common/FloatingWhatsApp';

function App() {
  return (
    <ProductProvider>
      <div className="app-container">
        <ScrollToTop />
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/products/:productId" element={<ProductDetailPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/admin" element={<AdminPage />} />
          </Routes>
        </main>
        <Footer />
        <FloatingWhatsApp />
      </div>
    </ProductProvider>
  );
}

export default App;
