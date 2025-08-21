import React from "react";
import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  return (
    <div style={{
      background: "#fffdfb",
      borderRadius: 18,
      boxShadow: "0 2px 18px rgba(158,105,38,0.06)",
      padding: "18px 12px 12px 12px",
      flex: "1 1 150px",
      maxWidth: 160,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      textAlign: "center",
      margin: "12px"
    }}>
      <Link to={`/product/${product.id}`}>
        <img
          src={product.imageUrl || "/background.png"}
          alt={product.name}
          style={{ width: 76, height: 76, objectFit: "contain", marginBottom: 12, background: "#f3e2c1", borderRadius: 7 }}
          loading="lazy"
        />
      </Link>
      <div style={{ fontWeight: 500, fontSize: "1.07rem", color: "#6e5431", marginBottom: 6 }}>{product.name}</div>
      <div style={{ fontWeight: 600, color: "#3c2c19", fontSize: "1.08rem" }}>NPR {Number(product.price).toLocaleString('en-NP')}</div>
    </div>
  );
}