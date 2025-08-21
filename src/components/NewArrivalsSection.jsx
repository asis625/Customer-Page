import React from 'react';
import ProductCard from './ProductCard';
import styles from './NewArrivalsSection.module.css';

const products = [
  {
    id: 1,
    name: 'Handmade Dhaka Topi',
    price: 499,
    image: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 2,
    name: 'Pashmina Shawl',
    price: 1299,
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 3,
    name: 'Silver Earrings',
    price: 799,
    image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 4,
    name: 'Cotton Kurta',
    price: 999,
    image: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=400&q=80',
  },
];

export default function NewArrivalsSection() {
  return (
    <section className={styles.section}>
      <div className={styles.title}>New Arrivals</div>
      <div className={styles.scrollContainer}>
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      <div className={styles.buttonContainer}>
        <button className={styles.shopButton}>Shop Now</button>
      </div>
    </section>
  );
}
