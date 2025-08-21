import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import PremiumHomepage from './components/PremiumHomepage';
import NewArrivalsSection from './components/NewArrivalsSection'; // <-- updated import
import ShopPage from './components/ShopPage';
import SearchPage from './components/SearchPage';
import PremiumCheckout from './components/PremiumCheckout';
import PremiumCart from './components/PremiumCart';
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
          <Route path="/new-arrivals" element={<NewArrivalsSection />} /> {/* <-- updated usage */}
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/category/:category" element={<ShopPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/products" element={<ProductList cart={cart} setCart={setCart} />} />
          <Route path="/cart" element={<PremiumCart />} />
          <Route path="/cart-simple" element={<Cart />} />
          <Route path="/checkout" element={<PremiumCheckout />} />
          <Route path="/checkout-simple" element={<Checkout cart={cart} clearCart={clearCart} />} />
          {/* Add more routes as needed */}
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;