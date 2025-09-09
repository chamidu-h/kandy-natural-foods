import React, { useState, useContext, useEffect, useRef } from 'react';
import { ProductContext } from '../../context/ProductContext';
import Button from '../common/Button'; // We'll use our reusable button
import styles from './ProductFilter.module.css';

// Move FilterControls OUTSIDE the main component to prevent recreation on every render
const FilterControls = ({ filters, onFilterChange, inModal = false }) => {
  return (
    <>
      {/* Keep search separate for desktop but inside modal for mobile */}
      {!inModal && (
         <div className={styles.searchGroup}>
            <input
              type="text"
              name="searchTerm"
              placeholder="Search for sweets..."
              className={styles.searchInput}
              value={filters.searchTerm}
              onChange={onFilterChange}
            />
          </div>
      )}
    
      <div className={inModal ? styles.modalFilterGrid : styles.selectGroup}>
          {inModal && (
             <div className={styles.filterGroup}>
                <label htmlFor="modal_searchTerm">Search</label>
                <input
                  type="text"
                  id="modal_searchTerm"
                  name="searchTerm"
                  placeholder="Search..."
                  className={styles.searchInput}
                  value={filters.searchTerm}
                  onChange={onFilterChange}
                />
              </div>
          )}
          <div className={styles.filterGroup}>
            <label htmlFor={inModal ? "modal_category" : "category"}>Category</label>
            <select 
              id={inModal ? "modal_category" : "category"} 
              name="category" 
              className={styles.select}
              value={filters.category}
              onChange={onFilterChange}
            >
              <option value="all">All</option>
              <option value="traditional">Traditional</option>
              <option value="jaggery">Jaggery</option>
              <option value="treacle">Treacle</option>
            </select>
          </div>
          <div className={styles.filterGroup}>
            <label htmlFor={inModal ? "modal_sortBy" : "sortBy"}>Sort by</label>
            <select 
              id={inModal ? "modal_sortBy" : "sortBy"} 
              name="sortBy" 
              className={styles.select}
              value={filters.sortBy}
              onChange={onFilterChange}
            >
              <option value="name-asc">Name (A-Z)</option>
              <option value="price-asc">Price (Low to High)</option>
              <option value="price-desc">Price (High to Low)</option>
            </select>
          </div>
      </div>
    </>
  );
};

const ProductFilter = () => {
  const { filters, setFilters } = useContext(ProductContext);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  
  // Use a local state for modal inputs to apply them only on confirmation
  const [modalFilters, setModalFilters] = useState(filters);
  
  // Use refs to track timeout for debouncing
  const debounceRef = useRef(null);

  // Sync local modal state when global filters change
  useEffect(() => {
    setModalFilters(filters);
  }, [filters]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'searchTerm') {
      // Clear existing timeout
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
      
      // Update filters immediately for responsive UI
      setFilters(prevFilters => ({
        ...prevFilters,
        [name]: value
      }));
    } else {
      // For other filters, update immediately
      setFilters(prevFilters => ({
        ...prevFilters,
        [name]: value
      }));
    }
  };
  
  const handleModalInputChange = (e) => {
    const { name, value } = e.target;
    setModalFilters(prevFilters => ({
      ...prevFilters,
      [name]: value
    }));
  };

  const applyModalFilters = () => {
    setFilters(modalFilters);
    setIsFilterOpen(false);
  };

  const closeModal = () => {
    setIsFilterOpen(false);
    // Reset modal filters to current global filters when closing without applying
    setModalFilters(filters);
  };

  return (
    <>
      {/* Desktop Filter Bar */}
      <div className={`${styles.filterContainer} ${styles.desktopOnly}`}>
        <FilterControls 
          filters={filters} 
          onFilterChange={handleInputChange} 
          inModal={false} 
        />
      </div>

      {/* Mobile Filter Button */}
      <div className={`${styles.mobileFilterButtonContainer} ${styles.mobileOnly}`}>
        <Button onClick={() => setIsFilterOpen(true)} variant="primary">
            Filters
        </Button>
      </div>
      
      {/* Mobile Filter Modal */}
      {isFilterOpen && (
          <div className={`${styles.modalOverlay} ${styles.mobileOnly}`} onClick={closeModal}>
              <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                  <div className={styles.modalHeader}>
                      <h3>Filter & Sort</h3>
                      <button onClick={closeModal} className={styles.closeButton}>&times;</button>
                  </div>
                  <div className={styles.modalBody}>
                    <FilterControls 
                      filters={modalFilters} 
                      onFilterChange={handleModalInputChange} 
                      inModal={true} 
                    />
                  </div>
                  <div className={styles.modalFooter}>
                    <Button onClick={applyModalFilters} variant="secondary">Apply Filters</Button>
                  </div>
              </div>
          </div>
      )}
    </>
  );
};

export default ProductFilter;
