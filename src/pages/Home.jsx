import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import { collection, getDocs, onSnapshot } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch products (one-time)
  useEffect(() => {
    async function fetchProducts() {
      const snapshot = await getDocs(collection(db, "products"));
      setProducts(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      setLoading(false);
    }
    fetchProducts();
  }, []);

  // Fetch categories in REAL-TIME
  useEffect(() => {
    const unsub = onSnapshot(collection(db, "categories"), snapshot => {
      setCategories(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsub();
  }, []);

  // Filter by search
  const filtered = products.filter(p =>
    (p.name?.toLowerCase().includes(search.toLowerCase()) ||
      p.category?.toLowerCase().includes(search.toLowerCase()))
  );

  // Show up to 4 new arrivals
  const newArrivals = filtered.slice(0, 4);

  return (
    <div className="branded-home-bg">
      {/* Hero Section */}
      <div className="branded-hero">
        <div className="branded-title">Aarambha</div>
        <div className="branded-slogan">Begin anew. नयाँ आरम्भ, नयाँ अन्दाज।</div>
        <div className="branded-searchbar">
          <input
            type="text"
            placeholder="Search products or categories..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="branded-search-input"
          />
          <button className="branded-search-btn" aria-label="Search">
            <svg width="22" height="22" fill="none" stroke="#7c5a27" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><circle cx="10" cy="10" r="7"/><line x1="15" y1="15" x2="21" y2="21"/></svg>
          </button>
        </div>
      </div>

      {/* Categories Section */}
      <div className="branded-categories-card" style={{ margin: "2em auto", maxWidth: 720 }}>
        <div className="branded-newarrivals-title">Categories</div>
        <ul style={{ display: "flex", gap: "1em", flexWrap: "wrap", listStyle: "none", padding: 0 }}>
          {categories.length === 0 ? (
            <li style={{ color: "#a87741" }}>No categories found.</li>
          ) : (
            categories.map(cat => (
              <li
                key={cat.id}
                style={{
                  background: "#fae9ce",
                  borderRadius: "12px",
                  padding: "0.5em 1.1em",
                  color: "#2e1f0d",
                  fontWeight: 600,
                  cursor: "pointer",
                  boxShadow: "0 1px 5px rgba(158,105,38,0.05)"
                }}
                onClick={() => navigate(`/category/${cat.name}`)}
              >
                {cat.name}
              </li>
            ))
          )}
        </ul>
      </div>

      {/* New Arrivals Section */}
      <div className="branded-newarrivals-card">
        <div className="branded-newarrivals-title">New Arrivals</div>
        <div className="branded-newarrivals-products">
          {loading ? (
            <div style={{ fontSize: "1.1rem", color: "#a87741", padding: 16 }}>Loading...</div>
          ) : newArrivals.length === 0 ? (
            <div style={{ fontSize: "1.1rem", color: "#a87741", padding: 16 }}>No products found.</div>
          ) : (
            newArrivals.map(prod => (
              <div key={prod.id} className="branded-newarrivals-product">
                <img
                  src={prod.imageUrl || "/background.png"}
                  alt={prod.name}
                  className="branded-newarrivals-img"
                  loading="lazy"
                />
                <div className="branded-newarrivals-name">{prod.name}</div>
                <div className="branded-newarrivals-price">NPR {Number(prod.price).toLocaleString("en-NP")}</div>
              </div>
            ))
          )}
        </div>
        <button className="branded-shopnow-btn" onClick={() => navigate("/category/New Arrivals")}>Shop Now</button>
      </div>

      {/* Optional: All Products Section */}
      <div className="branded-products-all" style={{ maxWidth: 720, margin: "2em auto" }}>
        <div className="branded-newarrivals-title">All Products</div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "1em" }}>
          {filtered.length === 0 ? (
            <div style={{ fontSize: "1.1rem", color: "#a87741", padding: 16 }}>No products found.</div>
          ) : (
            filtered.map(prod => (
              <div key={prod.id} className="branded-newarrivals-product">
                <img
                  src={prod.imageUrl || "/background.png"}
                  alt={prod.name}
                  className="branded-newarrivals-img"
                  loading="lazy"
                />
                <div className="branded-newarrivals-name">{prod.name}</div>
                <div className="branded-newarrivals-price">NPR {Number(prod.price).toLocaleString("en-NP")}</div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Responsive styles and background */}
      <style>
        {`
          .branded-home-bg {
            min-height: 100vh;
            background: linear-gradient(180deg, #f3e2c1 0%, #e7c795 100%), url('/background.png') center/cover no-repeat;
            font-family: 'Georgia', 'Times New Roman', serif;
            position: relative;
            padding-bottom: 32px;
          }
          .branded-hero {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: flex-start;
            padding-top: 4vw;
            padding-bottom: 2vw;
            position: relative;
            z-index: 1;
          }
          .branded-title {
            font-size: clamp(2.8rem, 6vw, 4.5rem);
            font-weight: 900;
            color: #2e1f0d;
            margin-bottom: 0.2em;
            letter-spacing: 0.04em;
            font-family: 'Georgia', 'Times New Roman', serif;
            text-shadow: 0 2px 12px rgba(100,60,10,0.08);
          }
          .branded-slogan {
            font-size: clamp(1.15rem, 3vw, 1.7rem);
            color: #7c5a27;
            margin-bottom: 2.2em;
            font-weight: 500;
            font-family: 'Georgia', serif;
            text-align: center;
            letter-spacing: 0.03em;
            text-shadow: 0 2px 8px rgba(130,90,30,0.06);
          }
          .branded-searchbar {
            display: flex;
            align-items: center;
            background: #fae9ce;
            border-radius: 18px;
            box-shadow: 0 2px 18px rgba(158,105,38,0.10);
            padding: 0.5em 1.1em;
            width: clamp(240px, 29vw, 430px);
            margin-bottom: 1.5em;
            border: 1.5px solid #e4c89c;
          }
          .branded-search-input {
            flex: 1;
            border: none;
            outline: none;
            background: transparent;
            font-size: 1.23rem;
            padding: 0.6em 0.2em;
            color: #3c2c19;
            font-family: inherit;
          }
          .branded-search-btn {
            background: none;
            border: none;
            padding-left: 0.7em;
            cursor: pointer;
            display: flex;
            align-items: center;
          }
          .branded-categories-card {
            background: #fae9ceee;
            border-radius: 20px;
            box-shadow: 0 2px 18px rgba(158,105,38,0.09);
            margin-bottom: 2em;
            padding: 1.7em 1.2em 1.1em 1.2em;
            display: flex;
            flex-direction: column;
            align-items: flex-start;
          }
          .branded-newarrivals-card {
            background: #fae9ceee;
            border-radius: 30px;
            box-shadow: 0 2px 18px rgba(158,105,38,0.09);
            max-width: 720px;
            margin: 0 auto;
            padding: 2.4em 1.2em 2em 1.2em;
            position: relative;
            z-index: 2;
            display: flex;
            flex-direction: column;
            align-items: center;
          }
          .branded-newarrivals-title {
            font-size: clamp(1.7rem, 4vw, 2.3rem);
            font-weight: 900;
            color: #2e1f0d;
            margin-bottom: 1.5em;
            letter-spacing: 0.04em;
            text-align: left;
            align-self: flex-start;
            font-family: 'Georgia', 'Times New Roman', serif;
          }
          .branded-newarrivals-products {
            display: flex;
            gap: 1.5em;
            justify-content: center;
            margin-bottom: 2em;
            flex-wrap: wrap;
            width: 100%;
          }
          .branded-newarrivals-product {
            background: #fffbe8;
            border-radius: 18px;
            box-shadow: 0 1px 9px rgba(158,105,38,0.06);
            padding: 1.1em 0.9em 0.8em 0.9em;
            display: flex;
            flex-direction: column;
            align-items: center;
            min-width: 120px;
            width: 130px;
            transition: box-shadow 0.18s;
          }
          .branded-newarrivals-product:hover {
            box-shadow: 0 4px 18px rgba(158,105,38,0.18);
          }
          .branded-newarrivals-img {
            width: 80px;
            height: 80px;
            object-fit: contain;
            margin-bottom: 0.9em;
            background: #f3e2c1;
            border-radius: 9px;
            box-shadow: 0 1px 5px rgba(158,105,38,0.05);
          }
          .branded-newarrivals-name {
            font-size: 1.08rem;
            font-weight: 600;
            color: #6e5431;
            margin-bottom: 0.4em;
            text-align: center;
            font-family: 'Georgia', serif;
            letter-spacing: 0.02em;
          }
          .branded-newarrivals-price {
            font-size: 1.08rem;
            font-weight: 700;
            color: #2e1f0d;
            margin-bottom: 0.2em;
            font-family: 'Georgia', serif;
          }
          .branded-shopnow-btn {
            background: #2e1f0d;
            color: #fff;
            border: none;
            border-radius: 13px;
            padding: 1em 2.3em;
            font-size: 1.18rem;
            font-weight: 700;
            cursor: pointer;
            margin-top: 1em;
            box-shadow: 0 2px 18px rgba(158,105,38,0.07);
            transition: background 0.15s;
            font-family: 'Georgia', serif;
            letter-spacing: 0.05em;
          }
          .branded-shopnow-btn:hover {
            background: #7c5a27;
          }
          @media (max-width: 700px) {
            .branded-newarrivals-card,
            .branded-categories-card,
            .branded-products-all {
              padding: 1.6em 0.5em 1.3em 0.5em;
              max-width: 97vw;
            }
            .branded-newarrivals-products {
              gap: 0.7em;
            }
            .branded-newarrivals-product {
              min-width: 90px;
              width: 100px;
              padding: 0.7em 0.2em 0.6em 0.2em;
            }
            .branded-newarrivals-img {
              width: 55px;
              height: 55px;
            }
          }
          @media (max-width: 420px) {
            .branded-hero {
              padding-top: 6vw;
            }
            .branded-title {
              font-size: 2.1rem;
            }
            .branded-slogan {
              font-size: 1.01rem;
            }
            .branded-searchbar {
              width: 95vw;
            }
            .branded-newarrivals-card,
            .branded-categories-card,
            .branded-products-all {
              padding: 1.2em 0.1em 1em 0.1em;
            }
            .branded-shopnow-btn {
              padding: 0.85em 1.3em;
              font-size: 1rem;
            }
          }
        `}
      </style>
    </div>
  );
}