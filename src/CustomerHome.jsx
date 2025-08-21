import React, { useEffect, useState } from "react";
import { db } from "./firebase";
import { collection, getDocs } from "firebase/firAarambha";

// Use your local background image from public/background.png
const templeBackground = "/background.png";

export default function CustomerHome() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const productsCol = collection(db, "products");
        const snapshot = await getDocs(productsCol);
        const productList = [];
        snapshot.forEach((doc) => {
          productList.push({ id: doc.id, ...doc.data() });
        });
        console.log("Fetched products:", productList); // DEBUG: See products in browser console
        setProducts(productList);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  return (
    <div style={styles.bg}>
      {/* Navbar */}
      <div style={styles.navbar}>
        <div style={styles.brand}>E-Store</div>
        <div style={styles.navLinks}>
          <a style={styles.link} href="/home">Home</a>
          <a style={styles.link} href="/new-arrivals">New Arrivals</a>
          <a style={styles.link} href="/deals">Deals</a>
          <a style={styles.link} href="/tops">Tops</a>
          <a style={styles.link} href="/bottoms">Bottoms</a>
          <a style={styles.link} href="/accessories">Accessories</a>
        </div>
        <div style={styles.cart}>
          <span role="img" aria-label="cart" style={{fontSize: 24}}>🛒</span>
        </div>
      </div>

      {/* Hero */}
      <div style={styles.hero}>
        <div style={styles.title}>E-Store</div>
        <div style={styles.searchBar}>
          <input
            style={styles.searchInput}
            placeholder="Search"
          />
          <span style={styles.searchIcon}>🔍</span>
        </div>
      </div>

      {/* New Arrivals Section */}
      <div style={styles.arrivalsBox}>
        <div style={styles.arrivalsTitle}>New Arrivals</div>
        {loading ? (
          <div style={{ fontSize: "1.1rem", color: "#a87741", padding: 16 }}>
            Loading products...
          </div>
        ) : products.length === 0 ? (
          <div style={{ fontSize: "1.1rem", color: "#a87741", padding: 16 }}>
            No products found.
          </div>
        ) : (
          <div style={styles.productRow}>
            {products.slice(0, 4).map((p) => (
              <div style={styles.productCard} key={p.id}>
                <img
                  src={p.imageUrl ? p.imageUrl : templeBackground}
                  alt={p.name}
                  style={styles.productImg}
                />
                <div style={styles.productName}>{p.name}</div>
                <div style={styles.productPrice}>NPR {p.price}</div>
              </div>
            ))}
          </div>
        )}
        <button style={styles.shopBtn}>Shop Now</button>
      </div>

      {/* Faint temple image background */}
      <img
        src={templeBackground}
        alt=""
        style={styles.templeBg}
      />
    </div>
  );
}

const styles = {
  bg: {
    minHeight: "100vh",
    background: "linear-gradient(180deg, #f3e2c1 0%, #e7c795 100%)",
    fontFamily: "serif",
    position: "relative",
    overflow: "hidden",
  },
  navbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "32px 48px 0 48px",
    fontFamily: "inherit",
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
  hero: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: 48,
    marginBottom: 16,
    position: "relative",
    zIndex: 2,
  },
  title: {
    fontSize: "4rem",
    fontWeight: 700,
    color: "#3c2c19",
    marginBottom: 24,
    fontFamily: "inherit",
    letterSpacing: "0.04em",
  },
  searchBar: {
    display: "flex",
    alignItems: "center",
    background: "#f6ecd7",
    borderRadius: 16,
    padding: "8px 18px",
    width: 340,
    boxShadow: "0 2px 6px rgba(0,0,0,0.04)",
    fontSize: "1.2rem",
  },
  searchInput: {
    flex: 1,
    border: "none",
    background: "transparent",
    fontSize: "1.15rem",
    outline: "none",
    padding: "8px 0",
    color: "#5b4724",
    fontFamily: "inherit",
  },
  searchIcon: {
    marginLeft: 12,
    fontSize: "1.4rem",
    color: "#8a6a3e",
    cursor: "pointer",
  },
  arrivalsBox: {
    background: "#f6ecd7f0",
    borderRadius: 32,
    margin: "50px auto 0 auto",
    padding: "36px 32px 48px 32px",
    width: "80%",
    maxWidth: 900,
    boxShadow: "0 6px 36px rgba(158,105,38,0.07)",
    position: "relative",
    zIndex: 2,
  },
  arrivalsTitle: {
    fontSize: "2.1rem",
    fontWeight: 700,
    color: "#392a18",
    marginBottom: 18,
    fontFamily: "inherit",
  },
  productRow: {
    display: "flex",
    gap: 24,
    marginBottom: 36,
    flexWrap: "wrap",
    justifyContent: "flex-start",
  },
  productCard: {
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
  },
  productImg: {
    width: 76,
    height: 76,
    objectFit: "contain",
    marginBottom: 12,
    background: "#f3e2c1",
    borderRadius: 7,
  },
  productName: {
    fontWeight: 500,
    fontSize: "1.07rem",
    color: "#6e5431",
    marginBottom: 6,
  },
  productPrice: {
    fontWeight: 600,
    color: "#3c2c19",
    fontSize: "1.08rem",
  },
  shopBtn: {
    margin: "0 auto",
    background: "#3c2c19",
    color: "#fffbe6",
    border: "none",
    borderRadius: 10,
    padding: "12px 34px",
    fontSize: "1.14rem",
    fontWeight: 600,
    cursor: "pointer",
    boxShadow: "0 2px 8px rgba(158,105,38,0.07)",
    marginTop: 16,
    letterSpacing: "0.02em",
  },
  templeBg: {
    position: "absolute",
    top: 120,
    left: 0,
    width: "100%",
    height: "calc(100vh - 120px)",
    objectFit: "cover",
    opacity: 0.17,
    zIndex: 1,
    pointerEvents: "none",
    filter: "sepia(0.35) blur(1px)",
  },
};