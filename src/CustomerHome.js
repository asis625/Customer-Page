// src/CustomerHome.js
import React, { useEffect, useState } from "react";
import { collection, query, orderBy, limit, onSnapshot } from "firebase/firestore";
import { db } from "./firebase";
import { Link } from "react-router-dom";

function CustomerHome() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "products"), orderBy("createdAt", "desc"), limit(4));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const items = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setProducts(items);
    });
    return () => unsubscribe();
  }, []);

  return (
    <div
      className="min-h-screen text-white"
      style={{
        backgroundImage: "url('/E-store background.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      {/* Navbar */}
      <nav className="flex justify-between items-center px-8 py-4 bg-black/50 backdrop-blur-md fixed w-full top-0 z-50">
        <h1 className="text-2xl font-bold">E-Store</h1>
        <ul className="flex space-x-8 text-lg">
          <li>
            <Link to="/" className="hover:text-orange-400 transition">
              Home
            </Link>
          </li>
          <li>
            <Link to="/shop" className="hover:text-orange-400 transition">
              Shop
            </Link>
          </li>
          <li>
            <Link to="/contact" className="hover:text-orange-400 transition">
              Contact
            </Link>
          </li>
          <li>
            <Link to="/cart" className="hover:text-orange-400 transition">
              Cart
            </Link>
          </li>
        </ul>
      </nav>

      {/* Hero Section */}
      <section className="text-center py-40 px-4 bg-black/40">
        <h1 className="text-5xl font-bold mb-4">Welcome to E-Store</h1>
        <p className="text-xl mb-8 text-gray-200">
          Shop the latest and best products, just for you
        </p>
        <div className="flex justify-center gap-4">
          <Link
            to="/shop"
            className="bg-orange-500 hover:bg-orange-600 px-6 py-3 rounded-md text-lg transition"
          >
            Shop Now
          </Link>
          <Link
            to="/contact"
            className="bg-white text-black hover:bg-gray-200 px-6 py-3 rounded-md text-lg transition"
          >
            Contact Us
          </Link>
        </div>
      </section>

      {/* Products Preview */}
      <section className="py-20 px-8 text-center bg-black/40">
        <h2 className="text-3xl font-semibold">Featured Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white/10 backdrop-blur-md rounded-xl p-6 transition-transform hover:-translate-y-2"
            >
              {product.image && (
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-40 object-cover rounded-md mb-4"
                />
              )}
              <h3 className="text-xl font-medium mb-2">{product.name}</h3>
              <p className="text-gray-300">{product.description}</p>
              <p className="mt-2 font-semibold text-orange-400">${product.price}</p>
            </div>
          ))}
        </div>

        {/* Button to go to shop page */}
        <div className="mt-12">
          <Link
            to="/shop"
            className="bg-orange-500 hover:bg-orange-600 px-8 py-3 rounded-md text-lg transition"
          >
            View All Products
          </Link>
        </div>
      </section>
    </div>
  );
}

export default CustomerHome;
