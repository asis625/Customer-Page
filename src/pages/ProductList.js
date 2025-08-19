// src/pages/ProductList.js
import React, { useEffect, useState } from "react";
import { db } from "../firebase"; // make sure firebase.js is inside src/
import { collection, onSnapshot } from "firebase/firestore";
import { Link } from "react-router-dom";

function ProductList({ cart, setCart }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "products"), snapshot => {
      const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setProducts(items);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const addToCart = (product) => {
    const existing = cart.find(item => item.id === product.id);
    if (existing) {
      setCart(
        cart.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  if (loading) return <p>Loading products...</p>;
  if (products.length === 0) return <p>No products available.</p>;

  return (
    <div style={{ fontFamily: "sans-serif", maxWidth: "800px", margin: "50px auto" }}>
      <h2>Nehu Thrifts and Trends</h2>
      <Link to="/checkout">
        <button style={{ marginBottom: "20px" }}>
          Go to Checkout ({cart.reduce((a, b) => a + b.quantity, 0)})
        </button>
      </Link>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {products.map(product => (
          <li
            key={product.id}
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "20px",
              border: "1px solid #ccc",
              padding: "10px",
              borderRadius: "8px",
            }}
          >
            {product.imageUrl && (
              <img
                src={product.imageUrl}
                alt={product.name}
                style={{ width: "100px", height: "100px", objectFit: "cover", marginRight: "15px" }}
              />
            )}
            <div style={{ flex: 1 }}>
              <h3 style={{ margin: 0 }}>{product.name}</h3>
              <p style={{ margin: "5px 0" }}>${product.price}</p>
              <button onClick={() => addToCart(product)}>Add to Cart</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProductList;
