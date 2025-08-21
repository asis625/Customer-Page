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

  const categories = [
    { name: 'नयाँ आगमन', nameEn: 'New Arrivals', path: '/new-arrivals' },
    { name: 'कपडा', nameEn: 'Clothing', path: '/clothing' },
    { name: 'गहना', nameEn: 'Jewelry', path: '/jewelry' },
    { name: 'सामान', nameEn: 'Accessories', path: '/accessories' },
    { name: 'घर सामान', nameEn: 'Home & Living', path: '/home-living' },
    { name: 'खेल', nameEn: 'Sports', path: '/sports' }
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}&lang=${searchLanguage}`);
    }
  };

  const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      {/* Top banner */}
      <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white text-center py-2 text-sm">
        🎉 नेपालभर निःशुल्क डेलिभरी! Free delivery across Nepal! | Viber: +977-9800000000
      </div>
      {/* Main header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">E</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">E-Store</h1>
              <p className="text-xs text-gray-500">Premium Shopping</p>
            </div>
          </Link>
          {/* Search bar - hidden on mobile */}
          <div className="hidden md:flex flex-1 max-w-lg mx-8">
            <form onSubmit={handleSearch} className="flex w-full">
              <div className="relative flex-1">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={searchLanguage === 'ne' ? 'खोज्नुहोस्...' : 'Search products...'}
                  className="w-full px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
                <select
                  value={searchLanguage}
                  onChange={(e) => setSearchLanguage(e.target.value)}
                  className="absolute right-0 top-0 h-full px-2 border-l border-gray-300 bg-white text-xs rounded-r-none focus:outline-none"
                >
                  <option value="en">EN</option>
                  <option value="ne">नेपाली</option>
                </select>
              </div>
              <button
                type="submit"
                className="px-4 py-2 bg-orange-500 text-white rounded-r-lg hover:bg-orange-600 transition-colors"
              >
                <MagnifyingGlassIcon className="h-5 w-5" />
              </button>
            </form>
          </div>
          {/* Right side icons */}
          <div className="flex items-center space-x-4">
            {/* Account */}
            <Link
              to="/account"
              className="hidden sm:flex items-center space-x-1 text-gray-700 hover:text-orange-500 transition-colors"
            >
              <UserIcon className="h-6 w-6" />
              <span className="text-sm">Account</span>
            </Link>
            {/* Wishlist */}
            <Link
              to="/wishlist"
              className="hidden sm:flex items-center space-x-1 text-gray-700 hover:text-red-500 transition-colors"
            >
              <HeartIcon className="h-6 w-6" />
              <span className="text-sm">Wishlist</span>
            </Link>
            {/* Cart */}
            <Link
              to="/cart"
              className="flex items-center space-x-1 text-gray-700 hover:text-orange-500 transition-colors relative"
            >
              <ShoppingCartIcon className="h-6 w-6" />
              <span className="hidden sm:block text-sm">Cart</span>
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full text-xs h-5 w-5 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </Link>
            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden"
            >
              {isMenuOpen ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
        {/* Categories navigation */}
        <nav className="hidden md:flex space-x-8 py-4 border-t border-gray-200">
          {categories.map((category) => (
            <Link
              key={category.path}
              to={category.path}
              className="text-gray-700 hover:text-orange-500 transition-colors font-medium"
            >
              {category.nameEn}
              <span className="ml-1 text-sm text-gray-500">({category.name})</span>
            </Link>
          ))}
        </nav>
      </div>
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          {/* Mobile search */}
          <div className="p-4 border-b border-gray-200">
            <form onSubmit={handleSearch} className="flex">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={searchLanguage === 'ne' ? 'खोज्नुहोस्...' : 'Search products...'}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-orange-500 text-white rounded-r-lg"
              >
                <MagnifyingGlassIcon className="h-5 w-5" />
              </button>
            </form>
          </div>
          {/* Mobile navigation */}
          <div className="py-2">
            {categories.map((category) => (
              <Link
                key={category.path}
                to={category.path}
                className="block px-4 py-3 text-gray-700 hover:bg-gray-50 hover:text-orange-500"
                onClick={() => setIsMenuOpen(false)}
              >
                {category.nameEn} ({category.name})
              </Link>
            ))}
            <div className="border-t border-gray-200 mt-2 pt-2">
              <Link
                to="/account"
                className="block px-4 py-3 text-gray-700 hover:bg-gray-50 hover:text-orange-500"
                onClick={() => setIsMenuOpen(false)}
              >
                My Account
              </Link>
              <Link
                to="/wishlist"
                className="block px-4 py-3 text-gray-700 hover:bg-gray-50 hover:text-red-500"
                onClick={() => setIsMenuOpen(false)}
              >
                Wishlist
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;