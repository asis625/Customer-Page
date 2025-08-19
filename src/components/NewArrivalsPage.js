import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

const NewArrivalsPage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const snapshot = await getDocs(collection(db, 'products'));
      const list = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setProducts(list);
    };

    fetchProducts();
  }, []);

  return (
    <div style={{ padding: '2rem' }}>
      <h2>All New Arrivals</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
        {products.map((product) => (
          <div key={product.id} style={{
            width: '200px',
            border: '1px solid #ccc',
            padding: '10px',
            borderRadius: '10px',
            textAlign: 'center',
            backgroundColor: '#fffaf2'
          }}>
            <img
              src={product.imageUrl}
              alt={product.name}
              style={{ width: '100%', height: '180px', objectFit: 'cover', borderRadius: '10px' }}
            />
            <h4>{product.name}</h4>
            <p>NPR {product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewArrivalsPage;
