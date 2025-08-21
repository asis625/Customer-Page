import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const PremiumCheckout = () => {
  const { cartItems, clearCart } = useCart();
  const navigate = useNavigate();

  // ...rest of your PremiumCheckout logic and JSX...
};

export default PremiumCheckout;