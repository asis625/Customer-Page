import React from "react";
import { useParams } from "react-router-dom";

const ShopPage = () => {
  const { category } = useParams();
  const products = [
    { id: 1, name: 'Dhaka Topi', category: 'accessories', price: 499 },
    { id: 2, name: 'Pashmina Shawl', category: 'shawls', price: 1299 },
    { id: 3, name: 'Silver Earrings', category: 'accessories', price: 799 },
    { id: 4, name: 'Cotton Kurta', category: 'clothing', price: 999 },
    // Add more products as needed
  ];

  const filteredProducts = category
    ? products.filter(product => product.category === category)
    : products;

  return (
    <div style={{ padding: '2rem', minHeight: '100vh', background: 'url("/background.png") center/cover no-repeat' }}>
      <h2 style={{ color: '#7c4a03', fontWeight: 'bold', marginBottom: '2rem' }}>
        {category ? `Category: ${category}` : 'All Products'}
      </h2>
      <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
        {filteredProducts.map(product => (
          <div key={product.id} style={{ minWidth: 180, background: '#fff', borderRadius: 18, boxShadow: '0 2px 12px rgba(0,0,0,0.08)', padding: '1rem', textAlign: 'center' }}>
            <div style={{ fontWeight: 'bold' }}>{product.name}</div>
            <div>Rs. {product.price}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShopPage;