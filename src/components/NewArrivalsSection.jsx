import React from 'react';
import { useCart } from '../context/CartContext';

const products = [
  { id: 1, name: 'Handmade Dhaka Topi', price: 499 },
  { id: 2, name: 'Pashmina Shawl', price: 1299 },
  { id: 3, name: 'Silver Earrings', price: 799 },
  { id: 4, name: 'Cotton Kurta', price: 999 },
];

const NewArrivalsSection = () => {
  const { addToCart } = useCart();

  return (
    <section style={{ background: '#fff7e6', borderRadius: 24, padding: '2rem', margin: '2rem auto', maxWidth: 900 }}>
      <h2 style={{ color: '#7c4a03', fontWeight: 'bold' }}>New Arrivals</h2>
      <div style={{ display: 'flex', gap: '1.5rem', overflowX: 'auto' }}>
        {products.map(product => (
          <div key={product.id} style={{ minWidth: 180, background: '#fff', borderRadius: 18, boxShadow: '0 2px 12px rgba(0,0,0,0.08)', padding: '1rem', textAlign: 'center' }}>
            <div style={{ fontWeight: 'bold' }}>{product.name}</div>
            <div>Rs. {product.price}</div>
            <button
              onClick={() => addToCart(product)}
              style={{
                marginTop: '1rem',
                background: '#ff9800',
                color: '#fff',
                border: 'none',
                borderRadius: 8,
                padding: '0.5rem 1rem',
                fontWeight: 'bold',
                cursor: 'pointer'
              }}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default NewArrivalsSection;