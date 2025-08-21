import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  CreditCardIcon, 
  TruckIcon, 
  PhoneIcon,
  ShieldCheckIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { useCart } from '../context/CartContext';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';

const PremiumCheckout = () => {
  const { cartItems, clearCart } = useCart();
  const navigate = useNavigate();

  // ...existing code...
};

export default PremiumCheckout;