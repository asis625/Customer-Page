// src/pages/Checkout.js
import React, { useState } from "react";
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

function Checkout({ cart, clearCart }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const placeOrder = async () => {
    if (!name || !email || !address) return alert("Fill all fields");
    if (cart.length === 0) return alert("Cart is empty");

    setLoading(true);
    try {
      await addDoc(collection(db, "orders"), {
        customerName: name,
        customerEmail: email,
        address,
        products: cart.map(({ id, name, price, quantity }) => ({ id, name, price, quantity })),
        totalPrice,
        status: "pending",
        createdAt: new Date(),
      });
      alert("Order placed successfully!");
      clearCart();
      navigate("/");
    } catch (err) {
      console.error(err);
      alert("Order failed");
    }
    setLoading(false);
  };

  return (
    <div style={{ fontFamily: "sans-serif", maxWidth: "600px", margin: "50px auto" }}>
      <h2>Checkout</h2>
      <div style={{ marginBottom: "10px" }}>
        <input
          placeholder="Name"
          value={name}
          onChange={e => setName(e.target.value)}
          style={{ width: "100%", marginBottom: "10px" }}
        />
        <input
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          style={{ width: "100%", marginBottom: "10px" }}
        />
        <textarea
          placeholder="Address"
          value={address}
          onChange={e => setAddress(e.target.value)}
          style={{ width: "100%", marginBottom: "10px" }}
        />
      </div>
      <h3>Total: ${totalPrice}</h3>
      <button onClick={placeOrder} disabled={loading}>
        {loading ? "Placing Order..." : "Place Order (Cash on Delivery)"}
      </button>
    </div>
  );
}

export default Checkout;
