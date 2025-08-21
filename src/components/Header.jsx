import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MagnifyingGlassIcon, HeartIcon, ShoppingCartIcon, UserIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { useCart } from '../../context/CartContext';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchLanguage, setSearchLanguage] = useState('en');
  const { cartItems } = useCart();
  const navigate = useNavigate();

  const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white text-center py-2 text-sm">
        🎉 नेपालभर निःशुल्क डेलिभरी! Free delivery across Nepal! | Viber: +977-9800000000
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-2xl font-bold text-orange-600">
            NepaliShop
          </Link>
          <nav className="flex items-center gap-6">
            <Link to="/shop" className="text-gray-700 hover:text-orange-600 font-semibold">
              Shop
            </Link>
            <Link to="/new-arrivals" className="text-gray-700 hover:text-orange-600 font-semibold">
              New Arrivals
            </Link>
            <Link to="/cart" className="relative text-gray-700 hover:text-orange-600 font-semibold">
              Cart
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-3 bg-orange-500 text-white rounded-full text-xs px-2 py-1">
                  {cartItemCount}
                </span>
              )}
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;