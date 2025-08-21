import React, { useState, useContext } from 'react';
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
import { CartContext } from '../context/CartContext';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';

const PremiumCheckout = () => {
  const { cartItems, clearCart } = useContext(CartContext);
  const navigate = useNavigate();
  
  const [step, setStep] = useState(1); // 1: Info, 2: Payment, 3: Confirmation
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    // Customer Info
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    
    // Shipping Address
    address: '',
    city: '',
    district: '',
    province: '',
    postalCode: '',
    landmark: '',
    
    // Payment
    paymentMethod: 'cod',
    
    // Special Instructions
    notes: ''
  });

  const nepalProvinces = [
    'Koshi Province',
    'Madhesh Province', 
    'Bagmati Province',
    'Gandaki Province',
    'Lumbini Province',
    'Karnali Province',
    'Sudurpashchim Province'
  ];

  const paymentMethods = [
    {
      id: 'cod',
      name: 'Cash on Delivery',
      nameNe: 'डेलिभरीमा नगद',
      description: 'Pay when your order arrives',
      icon: TruckIcon,
      fee: 0,
      popular: true
    },
    {
      id: 'esewa',
      name: 'eSewa',
      nameNe: 'इसेवा',
      description: 'Pay securely with eSewa wallet',
      icon: CreditCardIcon,
      fee: 0,
      logo: '/images/payments/esewa.png'
    },
    {
      id: 'khalti',
      name: 'Khalti',
      nameNe: 'खल्ती',
      description: 'Pay with Khalti digital wallet',
      icon: CreditCardIcon,
      fee: 0,
      logo: '/images/payments/khalti.png'
    },
    {
      id: 'fonepay',
      name: 'FonePay',
      nameNe: 'फोनपे',
      description: 'Bank transfer via FonePay',
      icon: CreditCardIcon,
      fee: 0,
      logo: '/images/payments/fonepay.png'
    },
    {
      id: 'connectips',
      name: 'ConnectIPS',
      nameNe: 'कनेक्ट आईपीएस',
      description: 'Direct bank transfer',
      icon: CreditCardIcon,
      fee: 0,
      logo: '/images/payments/connectips.png'
    },
    {
      id: 'bank',
      name: 'Bank Transfer',
      nameNe: 'बैंक ट्रान्सफर',
      description: 'Direct bank account transfer',
      icon: CreditCardIcon,
      fee: 0
    },
    {
      id: 'card',
      name: 'Credit/Debit Card',
      nameNe: 'कार्ड',
      description: 'Visa, Mastercard accepted',
      icon: CreditCardIcon,
      fee: 25 // Processing fee
    }
  ];

  const deliveryOptions = [
    {
      id: 'standard',
      name: 'Standard Delivery',
      nameNe: 'सामान्य डेलिभरी',
      duration: '3-5 business days',
      price: 100,
      description: 'Regular delivery service'
    },
    {
      id: 'express',
      name: 'Express Delivery',
      nameNe: 'द्रुत डेलिभरी',
      duration: '1-2 business days',
      price: 200,
      description: 'Faster delivery service'
    },
    {
      id: 'same-day',
      name: 'Same Day Delivery',
      nameNe: 'सोही दिन डेलिभरी',
      duration: 'Within 24 hours',
      price: 400,
      description: 'Available in Kathmandu Valley only',
      restriction: 'kathmandu-only'
    }
  ];

  const [selectedDelivery, setSelectedDelivery] = useState('standard');

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const calculateDeliveryFee = () => {
    const delivery = deliveryOptions.find(d => d.id === selectedDelivery);
    const subtotal = calculateSubtotal();
    
    // Free delivery for orders above NPR 2000
    if (subtotal >= 2000) {
      return 0;
    }
    
    return delivery ? delivery.price : 0;
  };

  const calculatePaymentFee = () => {
    const payment = paymentMethods.find(p => p.id === formData.paymentMethod);
    return payment ? payment.fee : 0;
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateDeliveryFee() + calculatePaymentFee();
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const validateStep = (stepNumber) => {
    switch (stepNumber) {
      case 1:
        return formData.firstName && formData.lastName && formData.email && 
               formData.phone && formData.address && formData.city && 
               formData.district && formData.province;
      case 2:
        return formData.paymentMethod;
      default:
        return true;
    }
  };

  const nextStep = () => {
    if (validateStep(step)) {
      setStep(step + 1);
    }
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const placeOrder = async () => {
    setLoading(true);
    try {
      const orderData = {
        customerInfo: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone
        },
        shippingAddress: {
          address: formData.address,
          city: formData.city,
          district: formData.district,
          province: formData.province,
          postalCode: formData.postalCode,
          landmark: formData.landmark
        },
        items: cartItems.map(item => ({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          image: item.image || item.imageUrl
        })),
        payment: {
          method: formData.paymentMethod,
          subtotal: calculateSubtotal(),
          deliveryFee: calculateDeliveryFee(),
          paymentFee: calculatePaymentFee(),
          total: calculateTotal()
        },
        delivery: selectedDelivery,
        notes: formData.notes,
        status: 'pending',
        createdAt: new Date(),
        orderNumber: `ORD-${Date.now()}`
      };

      await addDoc(collection(db, 'orders'), orderData);
      
      // Clear cart
      clearCart();
      
      // Move to confirmation step
      setStep(3);
    } catch (error) {
      console.error('Error placing order:', error);
      alert('Failed to place order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (cartItems.length === 0 && step !== 3) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-2xl mx-auto px-4 py-16 text-center">
          <div className="text-gray-400 text-6xl mb-4">🛒</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h2>
          <p className="text-gray-600 mb-8">Add some products to your cart before checkout</p>
          <button
            onClick={() => navigate('/shop')}
            className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
          >
            Continue Shopping
          </button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-center space-x-8">
            {[
              { num: 1, title: 'Information', titleNe: 'जानकारी' },
              { num: 2, title: 'Payment', titleNe: 'भुक्तानी' },
              { num: 3, title: 'Confirmation', titleNe: 'पुष्टिकरण' }
            ].map((s, index) => (
              <div key={s.num} className="flex items-center">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                  step >= s.num 
                    ? 'bg-orange-500 border-orange-500 text-white' 
                    : 'border-gray-300 text-gray-400'
                }`}>
                  {step > s.num ? (
                    <CheckCircleIcon className="h-6 w-6" />
                  ) : (
                    <span className="font-semibold">{s.num}</span>
                  )}
                </div>
                <div className="ml-3 text-sm">
                  <div className={`font-medium ${step >= s.num ? 'text-orange-600' : 'text-gray-400'}`}>
                    {s.title}
                  </div>
                  <div className="text-gray-500">{s.titleNe}</div>
                </div>
                {index < 2 && (
                  <div className={`mx-4 h-0.5 w-16 ${
                    step > s.num ? 'bg-orange-500' : 'bg-gray-300'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {step === 1 && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white rounded-lg shadow-sm p-6"
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Shipping Information
                  <span className="text-sm text-gray-500 ml-2">ढुवानी जानकारी</span>
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      First Name *
                    </label>
                    <input
                      type="text"
                      value={formData.firstName}
                      onChange={(e) => handleInputChange('firstName', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      value={formData.lastName}
                      onChange={(e) => handleInputChange('lastName', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      placeholder="+977-9800000000"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                      required
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Street Address *
                    </label>
                    <input
                      type="text"
                      value={formData.address}
                      onChange={(e) => handleInputChange('address', e.target.value)}
                      placeholder="House/Building number, Street name"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      City *
                    </label>
                    <input
                      type="text"
                      value={formData.city}
                      onChange={(e) => handleInputChange('city', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      District *
                    </label>
                    <input
                      type="text"
                      value={formData.district}
                      onChange={(e) => handleInputChange('district', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Province *
                    </label>
                    <select
                      value={formData.province}
                      onChange={(e) => handleInputChange('province', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                      required
                    >
                      <option value="">Select Province</option>
                      {nepalProvinces.map(province => (
                        <option key={province} value={province}>{province}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Postal Code
                    </label>
                    <input
                      type="text"
                      value={formData.postalCode}
                      onChange={(e) => handleInputChange('postalCode', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Landmark (Optional)
                    </label>
                    <input
                      type="text"
                      value={formData.landmark}
                      onChange={(e) => handleInputChange('landmark', e.target.value)}
                      placeholder="Near hospital, school, etc."
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                </div>

                {/* Delivery Options */}
                <div className="mt-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Delivery Options
                    <span className="text-sm text-gray-500 ml-2">ढुवानी विकल्प</span>
                  </h3>
                  <div className="space-y-3">
                    {deliveryOptions.map(option => (
                      <label
                        key={option.id}
                        className={`flex items-center justify-between p-4 border rounded-lg cursor-pointer transition-colors ${
                          selectedDelivery === option.id
                            ? 'border-orange-500 bg-orange-50'
                            : 'border-gray-300 hover:border-gray-400'
                        }`}
                      >
                        <div className="flex items-center">
                          <input
                            type="radio"
                            name="delivery"
                            value={option.id}
                            checked={selectedDelivery === option.id}
                            onChange={(e) => setSelectedDelivery(e.target.value)}
                            className="mr-3"
                          />
                          <div>
                            <div className="font-medium">{option.name}</div>
                            <div className="text-sm text-gray-500">{option.nameNe}</div>
                            <div className="text-sm text-gray-600">{option.description}</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold">
                            {calculateSubtotal() >= 2000 ? (
                              <span className="text-green-600">Free</span>
                            ) : (
                              `NPR ${option.price}`
                            )}
                          </div>
                          <div className="text-sm text-gray-500">{option.duration}</div>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="flex justify-end mt-8">
                  <button
                    onClick={nextStep}
                    disabled={!validateStep(1)}
                    className="bg-orange-500 hover:bg-orange-600 disabled:bg-gray-400 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
                  >
                    Continue to Payment
                  </button>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white rounded-lg shadow-sm p-6"
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Payment Method
                  <span className="text-sm text-gray-500 ml-2">भुक्तानी विधि</span>
                </h2>

                <div className="space-y-4">
                  {paymentMethods.map(method => (
                    <label
                      key={method.id}
                      className={`flex items-center justify-between p-4 border rounded-lg cursor-pointer transition-colors ${
                        formData.paymentMethod === method.id
                          ? 'border-orange-500 bg-orange-50'
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      <div className="flex items-center">
                        <input
                          type="radio"
                          name="payment"
                          value={method.id}
                          checked={formData.paymentMethod === method.id}
                          onChange={(e) => handleInputChange('paymentMethod', e.target.value)}
                          className="mr-4"
                        />
                        <div className="flex items-center">
                          <method.icon className="h-6 w-6 text-gray-400 mr-3" />
                          <div>
                            <div className="flex items-center">
                              <span className="font-medium">{method.name}</span>
                              {method.popular && (
                                <span className="ml-2 bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                                  Popular
                                </span>
                              )}
                            </div>
                            <div className="text-sm text-gray-500">{method.nameNe}</div>
                            <div className="text-sm text-gray-600">{method.description}</div>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        {method.fee > 0 ? (
                          <span className="text-red-600">+NPR {method.fee}</span>
                        ) : (
                          <span className="text-green-600">Free</span>
                        )}
                      </div>
                    </label>
                  ))}
                </div>

                {/* Special Instructions */}
                <div className="mt-8">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Special Instructions (Optional)
                  </label>
                  <textarea
                    value={formData.notes}
                    onChange={(e) => handleInputChange('notes', e.target.value)}
                    placeholder="Any special delivery instructions..."
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>

                <div className="flex justify-between mt-8">
                  <button
                    onClick={prevStep}
                    className="border border-gray-300 text-gray-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                  >
                    Back
                  </button>
                  <button
                    onClick={placeOrder}
                    disabled={loading || !validateStep(2)}
                    className="bg-orange-500 hover:bg-orange-600 disabled:bg-gray-400 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
                  >
                    {loading ? 'Placing Order...' : 'Place Order'}
                  </button>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white rounded-lg shadow-sm p-8 text-center"
              >
                <CheckCircleIcon className="h-16 w-16 text-green-500 mx-auto mb-4" />
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Order Confirmed!
                </h2>
                <p className="text-lg text-gray-600 mb-2">
                  आदेश पुष्टि भयो!
                </p>
                <p className="text-gray-600 mb-8">
                  Thank you for your order. We'll send you a confirmation email shortly.
                </p>
                
                <div className="bg-gray-50 rounded-lg p-6 mb-8">
                  <h3 className="font-semibold text-gray-900 mb-2">What's Next?</h3>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• You'll receive an order confirmation email</li>
                    <li>• We'll prepare your order for shipment</li>
                    <li>• You'll get tracking information once shipped</li>
                    <li>• Contact us anytime for updates</li>
                  </ul>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button
                    onClick={() => navigate('/shop')}
                    className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
                  >
                    Continue Shopping
                  </button>
                  <button
                    onClick={() => navigate('/account/orders')}
                    className="border border-gray-300 text-gray-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                  >
                    View Orders
                  </button>
                </div>
              </motion.div>
            )}
          </div>

          {/* Order Summary */}
          {step !== 3 && (
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm p-6 sticky top-4">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Order Summary
                  <span className="text-sm text-gray-500 ml-2">आदेश सारांश</span>
                </h3>

                <div className="space-y-4 mb-6">
                  {cartItems.map(item => (
                    <div key={item.id} className="flex items-center space-x-3">
                      <img
                        src={item.image || item.imageUrl || '/images/placeholder.jpg'}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900 line-clamp-2">{item.name}</h4>
                        <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold">NPR {item.price * item.quantity}</div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t pt-4 space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>NPR {calculateSubtotal()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Delivery Fee</span>
                    <span>
                      {calculateDeliveryFee() === 0 ? (
                        <span className="text-green-600">Free</span>
                      ) : (
                        `NPR ${calculateDeliveryFee()}`
                      )}
                    </span>
                  </div>
                  {calculatePaymentFee() > 0 && (
                    <div className="flex justify-between">
                      <span>Payment Fee</span>
                      <span>NPR {calculatePaymentFee()}</span>
                    </div>
                  )}
                  <div className="border-t pt-2 flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span>NPR {calculateTotal()}</span>
                  </div>
                </div>

                {calculateSubtotal() >= 2000 && (
                  <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-center text-green-700">
                      <CheckCircleIcon className="h-5 w-5 mr-2" />
                      <span className="text-sm font-medium">
                        Free delivery eligible!
                      </span>
                    </div>
                  </div>
                )}

                <div className="mt-6 space-y-2 text-xs text-gray-500">
                  <div className="flex items-center">
                    <ShieldCheckIcon className="h-4 w-4 mr-1" />
                    <span>Secure checkout</span>
                  </div>
                  <div className="flex items-center">
                    <TruckIcon className="h-4 w-4 mr-1" />
                    <span>Free returns within 7 days</span>
                  </div>
                  <div className="flex items-center">
                    <PhoneIcon className="h-4 w-4 mr-1" />
                    <span>24/7 customer support</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default PremiumCheckout;