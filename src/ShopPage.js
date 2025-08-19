// src/ShopPage.js
import React from "react";

const ShopPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <h2 className="text-3xl font-bold mb-6">All Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="bg-white rounded-2xl shadow-lg p-4 text-black"
          >
            <img
              src={`https://via.placeholder.com/200?text=Product+${i + 1}`}
              alt={`Product ${i + 1}`}
              className="w-full h-40 object-cover rounded-lg mb-3"
            />
            <h3 className="text-lg font-semibold">Product {i + 1}</h3>
            <p className="text-sm text-gray-700 mb-2">$99.99</p>
            <button className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-lg">
              Buy Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShopPage;
