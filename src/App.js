import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './CartContext';
import CustomerHome from './CustomerHome';
import NewArrivalsPage from './components/NewArrivalsPage';
import Cart from './Cart';

function App() {
  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route path="/" element={<CustomerHome />} />
          <Route path="/new-arrivals" element={<NewArrivalsPage />} />
        </Routes>
        <Cart />
      </Router>
    </CartProvider>
  );
}

export default App;
