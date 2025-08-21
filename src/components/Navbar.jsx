import React from "react";
import { Link } from "react-router-dom";

const styles = {
  navbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "32px 48px 0 48px",
    fontFamily: "serif",
    position: "relative",
    zIndex: 2,
  },
  brand: {
    fontWeight: 700,
    fontSize: "2rem",
    letterSpacing: "0.04em",
    color: "#3c2c19",
  },
  navLinks: {
    display: "flex",
    gap: 32,
    marginLeft: 32,
    fontSize: "1.15rem",
    color: "#271b0c",
    fontWeight: 500,
  },
  link: {
    textDecoration: "none",
    color: "#271b0c",
    fontWeight: 500,
    transition: "color 0.2s",
  },
  cart: {
    marginLeft: "auto",
    marginRight: 0,
  },
};

export default function Navbar() {
  return (
    <div style={styles.navbar}>
      <div style={styles.brand}>Aarambha</div>
      <div style={styles.navLinks}>
        <Link style={styles.link} to="/">Home</Link>
        <Link style={styles.link} to="/category/Tops">Tops</Link>
        <Link style={styles.link} to="/category/Bottoms">Bottoms</Link>
        <Link style={styles.link} to="/category/Accessories">Accessories</Link>
        <Link style={styles.link} to="/deals">Deals</Link>
      </div>
      <div style={styles.cart}>
        <Link style={styles.link} to="/cart">
          <span role="img" aria-label="cart" style={{fontSize: 24}}>🛒</span>
        </Link>
      </div>
    </div>
  );
}