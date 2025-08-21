import React from 'react';
import styles from './ProductCard.module.css';

export default function ProductCard({ product }) {
  return (
    <div className={styles.card}>
      <img src={product.image} alt={product.name} className={styles.image} />
      <div className={styles.info}>
        <div className={styles.name}>{product.name}</div>
        <div className={styles.price}>Rs. {product.price}</div>
      </div>
    </div>
  );
}
