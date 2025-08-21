import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import PremiumHomepage from './components/PremiumHomepage';
import NewArrivalsPage from './components/NewArrivalsPage';
import ProductList from './pages/ProductList';
import Checkout from './pages/Checkout';
import Cart from './Cart';

function App() {
  const [cart, setCart] = useState([]);

  const clearCart = () => setCart([]);

  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route path="/" element={<PremiumHomepage />} />
          <Route path="/new-arrivals" element={<NewArrivalsPage />} />
          <Route path="/shop" element={<ProductList cart={cart} setCart={setCart} />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout cart={cart} clearCart={clearCart} />} />
          {/* Add more routes as needed */}
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;
