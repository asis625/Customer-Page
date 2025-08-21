import React, { useContext, useState } from 'react';
import { CartContext } from './context/CartContext';
import { db } from './firebase';
import { collection, addDoc } from 'firebase/firestore'; // Fixed import

const Cart = () => {
  const { cartItems, removeFromCart, clearCart } = useContext(CartContext);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(false);

  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  const handleCheckout = async () => {
    if (!name || !email || !address) return alert("Fill all fields");
    setLoading(true);
    try {
      await addDoc(collection(db, "orders"), {
        customerName: name,
        customerEmail: email,
        address,
        products: cartItems,
        totalPrice,
        status: "pending",
        createdAt: new Date()
      });
      alert("Order placed!");
      clearCart();
      setName(''); setEmail(''); setAddress('');
    } catch (err) {
      console.error(err);
      alert("Checkout failed");
    }
    setLoading(false);
  };

  return (
    <div style={{ maxWidth: "500px", margin: "50px auto", fontFamily: "sans-serif" }}>
      <h2>Cart</h2>
      {cartItems.length === 0 && <p>No items in cart.</p>}
      {cartItems.map(item => (
        <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
          <span>{item.name} x {item.quantity}</span>
          <span>${item.price * item.quantity}</span>
          <button onClick={() => removeFromCart(item.id)}>Remove</button>
        </div>
      ))}
      {cartItems.length > 0 && (
        <div>
          <h3>Total: ${totalPrice}</h3>
          <input placeholder="Name" value={name} onChange={e => setName(e.target.value)} style={{ width: '100%', marginBottom: '5px' }} />
          <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} style={{ width: '100%', marginBottom: '5px' }} />
          <input placeholder="Address" value={address} onChange={e => setAddress(e.target.value)} style={{ width: '100%', marginBottom: '5px' }} />
          <button onClick={handleCheckout} disabled={loading}>{loading ? "Placing order..." : "Checkout (COD)"}</button>
        </div>
      )}
    </div>
  );
};

export default Cart;