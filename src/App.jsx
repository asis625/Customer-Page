import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import ProductList from "./pages/ProductList";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import OrderConfirmation from "./pages/OrderConfirmation";

const backgroundStyle = {
  minHeight: "100vh",
  background: `linear-gradient(180deg, #f3e2c1 0%, #e7c795 100%), url('/background.png') center/cover no-repeat`,
  fontFamily: "serif",
  position: "relative",
  overflow: "hidden",
};

function App() {
  return (
    <CartProvider>
      <Router>
        <Navbar />
        <div style={backgroundStyle}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/category/:category" element={<ProductList />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/order-confirmation/:orderId" element={<OrderConfirmation />} />
          </Routes>
        </div>
        <Footer />
      </Router>
    </CartProvider>
  );
}

export default App;