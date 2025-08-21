import React from "react";
import { Link } from "react-router-dom";

export default function CategoryNav() {
  const categories = ["Tops", "Bottoms", "Accessories"];
  return (
    <nav style={{ display: "flex", gap: 24, margin: "24px 0", justifyContent: "center" }}>
      {categories.map(cat => (
        <Link key={cat} to={`/category/${cat}`} style={{
          padding: "8px 18px",
          borderRadius: 12,
          background: "#f3e2c1",
          color: "#3c2c19",
          textDecoration: "none",
          fontWeight: 600
        }}>
          {cat}
        </Link>
      ))}
    </nav>
  );
}