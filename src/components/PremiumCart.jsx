import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  TrashIcon, 
  PlusIcon, 
  MinusIcon,
  ShoppingCartIcon,
  HeartIcon,
  TruckIcon,
  ShieldCheckIcon
} from '@heroicons/react/24/outline';
import { useCart } from '../context/CartContext';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';

const PremiumCart = () => {
  const { cartItems, removeFromCart, updateQuantity, clearCart } = useCart();
  const navigate = useNavigate();

  // ...existing code...
};

export default PremiumCart;