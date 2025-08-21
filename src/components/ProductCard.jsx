import React from 'react';

export default function ProductCard({ product }) {
  return (
    <div style={{
      minWidth: 180,
      background: '#fff',
      borderRadius: 18,
      boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
      padding: '1rem',
      textAlign: 'center'
    }}>
      <div style={{ fontWeight: 'bold' }}>{product.name}</div>
      <div>Rs. {product.price}</div>
    </div>
  );
}