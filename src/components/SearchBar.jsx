import React from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import styles from './SearchBar.module.css';

export default function SearchBar() {
  return (
    <div className={styles.searchContainer}>
      <input
        className={styles.searchInput}
        type="text"
        placeholder="Search products..."
      />
      <MagnifyingGlassIcon className={styles.searchIcon} width={20} height={20} />
    </div>
  );
}
