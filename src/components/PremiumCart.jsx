import React, { useContext } from 'react';
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
import { CartContext } from '../context/CartContext';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';

const PremiumCart = () => {
  const { cartItems, removeFromCart, updateQuantity, clearCart } = useContext(CartContext);
  const navigate = useNavigate();

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const calculateDeliveryFee = () => {
    const subtotal = calculateSubtotal();
    return subtotal >= 2000 ? 0 : 100; // Free delivery over NPR 2000
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateDeliveryFee();
  };

  const handleQuantityChange = (itemId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(itemId);
    } else {
      updateQuantity(itemId, newQuantity);
    }
  };

  const addToWishlist = (product) => {
    // Add to wishlist functionality - would integrate with wishlist context
    removeFromCart(product.id);
  };

  const recommendedProducts = [
    {
      id: 'rec1',
      name: 'Premium Cotton T-Shirt',
      price: 1200,
      image: '/images/products/tshirt.jpg',
      rating: 4.5
    },
    {
      id: 'rec2',
      name: 'Wireless Earbuds',
      price: 3500,
      image: '/images/products/earbuds.jpg',
      rating: 4.8
    },
    {
      id: 'rec3',
      name: 'Traditional Khukuri',
      price: 2800,
      image: '/images/products/khukuri.jpg',
      rating: 4.7
    }
  ];

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <ShoppingCartIcon className="h-24 w-24 text-gray-400 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Your cart is empty
            </h1>
            <p className="text-gray-600 mb-2">
              तपाईंको कार्ट खाली छ
            </p>
            <p className="text-gray-600 mb-8">
              Looks like you haven't added anything to your cart yet.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link
                to="/shop"
                className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
              >
                Continue Shopping
              </Link>
              <Link
                to="/new-arrivals"
                className="border border-gray-300 text-gray-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
              >
                View New Arrivals
              </Link>
            </div>

            {/* Recommended Products */}
            <div className="text-left">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Recommended for you
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {recommendedProducts.map(product => (
                  <div key={product.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-48 object-cover"
                      onError={(e) => {
                        e.target.src = '/images/placeholder.jpg';
                      }}
                    />
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-900 mb-2">{product.name}</h3>
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-bold text-orange-600">
                          NPR {product.price}
                        </span>
                        <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md text-sm font-semibold transition-colors">
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
        
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Shopping Cart
          </h1>
          <p className="text-gray-600">
            किनमेल कार्ट • {cartItems.length} item{cartItems.length !== 1 ? 's' : ''}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="bg-white rounded-lg shadow-sm p-6"
              >
                <div className="flex items-start space-x-4">
                  <img
                    src={item.image || item.imageUrl || '/images/placeholder.jpg'}
                    alt={item.name}
                    className="w-24 h-24 object-cover rounded-lg"
                    onError={(e) => {
                      e.target.src = '/images/placeholder.jpg';
                    }}
                  />
                  
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-1">
                          {item.name}
                        </h3>
                        <p className="text-sm text-gray-600 mb-2">
                          {item.description}
                        </p>
                        <div className="text-lg font-bold text-orange-600">
                          NPR {item.price}
                        </div>
                      </div>
                      
                      <div className="flex space-x-2">
                        <button
                          onClick={() => addToWishlist(item)}
                          className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                          title="Move to Wishlist"
                        >
                          <HeartIcon className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                          title="Remove from Cart"
                        >
                          <TrashIcon className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between mt-4">
                      {/* Quantity Controls */}
                      <div className="flex items-center space-x-3">
                        <span className="text-sm text-gray-600">Quantity:</span>
                        <div className="flex items-center border border-gray-300 rounded-lg">
                          <button
                            onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                            className="p-2 hover:bg-gray-100 transition-colors"
                          >
                            <MinusIcon className="h-4 w-4" />
                          </button>
                          <span className="px-4 py-2 border-x border-gray-300 font-semibold">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                            className="p-2 hover:bg-gray-100 transition-colors"
                          >
                            <PlusIcon className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                      
                      {/* Item Total */}
                      <div className="text-right">
                        <div className="text-sm text-gray-600">Total</div>
                        <div className="text-lg font-bold text-gray-900">
                          NPR {(item.price * item.quantity).toLocaleString()}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
            
            {/* Continue Shopping */}
            <div className="flex justify-between items-center pt-4">
              <Link
                to="/shop"
                className="flex items-center text-orange-600 hover:text-orange-700 font-semibold transition-colors"
              >
                <PlusIcon className="h-5 w-5 mr-2" />
                Continue Shopping
              </Link>
              
              <button
                onClick={clearCart}
                className="text-red-600 hover:text-red-700 font-semibold transition-colors"
              >
                Clear Cart
              </button>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-4">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                Order Summary
                <span className="text-sm text-gray-500 ml-2">आदेश सारांश</span>
              </h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">
                    Subtotal ({cartItems.length} item{cartItems.length !== 1 ? 's' : ''})
                  </span>
                  <span className="font-semibold">
                    NPR {calculateSubtotal().toLocaleString()}
                  </span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Delivery Fee</span>
                  <span className="font-semibold">
                    {calculateDeliveryFee() === 0 ? (
                      <span className="text-green-600">Free</span>
                    ) : (
                      `NPR ${calculateDeliveryFee()}`
                    )}
                  </span>
                </div>
                
                {calculateSubtotal() >= 2000 && (
                  <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-center text-green-700 text-sm">
                      <TruckIcon className="h-4 w-4 mr-2" />
                      <span>Free delivery applied!</span>
                    </div>
                  </div>
                )}
                
                <div className="border-t pt-4 flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span>NPR {calculateTotal().toLocaleString()}</span>
                </div>
              </div>
              
              <button
                onClick={() => navigate('/checkout')}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg font-semibold transition-colors mb-4"
              >
                Proceed to Checkout
              </button>
              
              <div className="space-y-3 text-sm text-gray-600">
                <div className="flex items-center">
                  <ShieldCheckIcon className="h-4 w-4 mr-2 text-green-500" />
                  <span>Secure checkout guaranteed</span>
                </div>
                <div className="flex items-center">
                  <TruckIcon className="h-4 w-4 mr-2 text-blue-500" />
                  <span>Free returns within 7 days</span>
                </div>
              </div>
              
              {/* Promo Code */}
              <div className="mt-6 pt-6 border-t">
                <h3 className="font-semibold text-gray-900 mb-3">Promo Code</h3>
                <div className="flex space-x-2">
                  <input
                    type="text"
                    placeholder="Enter code"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                  <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors">
                    Apply
                  </button>
                </div>
              </div>
              
              {/* Payment Methods */}
              <div className="mt-6 pt-6 border-t">
                <h3 className="font-semibold text-gray-900 mb-3">We Accept</h3>
                <div className="grid grid-cols-3 gap-2">
                  {['eSewa', 'Khalti', 'COD'].map(method => (
                    <div key={method} className="bg-gray-50 p-2 rounded text-center text-xs">
                      {method}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Recommended Products */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">
            Customers also bought
            <span className="text-sm text-gray-500 ml-2">ग्राहकहरूले यो पनि किनेका छन्</span>
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {recommendedProducts.map(product => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-lg transition-shadow"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover"
                  onError={(e) => {
                    e.target.src = '/images/placeholder.jpg';
                  }}
                />
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-2">{product.name}</h3>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-orange-600">
                      NPR {product.price.toLocaleString()}
                    </span>
                    <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md text-sm font-semibold transition-colors">
                      Add to Cart
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default PremiumCart;