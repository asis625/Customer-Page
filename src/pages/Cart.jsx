import React from "react";
import { useCart } from "../context/CartContext";
import CartItem from "../components/CartItem";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const { cart, updateQty, removeItem, total, clearCart } = useCart();
  const navigate = useNavigate();

  return (
    <div style={{ maxWidth: 800, margin: "40px auto", padding: "24px", background: "#f6ecd7f0", borderRadius: 24 }}>
      <h1 style={{ textAlign: "center" }}>Your Cart</h1>
      {cart.length === 0 ? (
        <p style={{ textAlign: "center", margin: 24 }}>Cart is empty</p>
      ) : (
        <div>
          {cart.map(item => (
            <CartItem
              key={item.id}
              item={item}
              updateQty={updateQty}
              removeItem={removeItem}
            />
          ))}
          <div style={{ textAlign: "right", fontWeight: 600, fontSize: "1.2rem", margin: "32px 0" }}>
            Total: NPR {total.toLocaleString('en-NP')}
          </div>
          <div style={{ display: "flex", justifyContent: "flex-end", gap: 12 }}>
            <button style={{ background: "#3c2c19", color: "#fff", border: "none", borderRadius: 10, padding: "12px 34px", fontSize: "1.14rem", fontWeight: 600, cursor: "pointer" }} onClick={() => navigate("/checkout")}>
              Proceed to Checkout
            </button>
            <button style={{ background: "#a87741", color: "#fff", border: "none", borderRadius: 10, padding: "12px 34px", fontSize: "1.14rem", fontWeight: 600, cursor: "pointer" }} onClick={clearCart}>
              Clear Cart
            </button>
          </div>
        </div>
      )}
    </div>
  );
}