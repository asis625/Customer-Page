import React from 'react';
import { Link } from 'react-router-dom';
import { 
  MapPinIcon, 
  PhoneIcon, 
  EnvelopeIcon,
  ChatBubbleLeftIcon 
} from '@heroicons/react/24/outline';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const paymentMethods = [
    { name: 'eSewa', logo: '/images/payments/esewa.png' },
    { name: 'Khalti', logo: '/images/payments/khalti.png' },
    { name: 'Fonepay', logo: '/images/payments/fonepay.png' },
    { name: 'ConnectIPS', logo: '/images/payments/connectips.png' },
    { name: 'Visa', logo: '/images/payments/visa.png' },
    { name: 'Mastercard', logo: '/images/payments/mastercard.png' }
  ];

  const deliveryPartners = [
    { name: 'Pathao', logo: '/images/delivery/pathao.png' },
    { name: 'NepXpress', logo: '/images/delivery/nepxpress.png' },
    { name: 'Daraz Express', logo: '/images/delivery/daraz.png' }
  ];

  return (
    <footer className="bg-gray-900 text-white">
      {/* Newsletter signup */}
      <div className="bg-gradient-to-r from-orange-500 to-red-500 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-2">Stay Updated!</h3>
            <p className="mb-4">Get the latest deals and offers delivered to your inbox</p>
            <div className="flex max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 rounded-l-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
              />
              <button className="px-6 py-2 bg-white text-orange-500 rounded-r-lg font-semibold hover:bg-gray-100 transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main footer content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company info */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">E</span>
              </div>
              <h3 className="text-xl font-bold">E-Store Nepal</h3>
            </div>
            <p className="text-gray-400 mb-4">
              Nepal's premier online shopping destination. Quality products, authentic brands, and reliable service across the country.
            </p>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <MapPinIcon className="h-4 w-4 text-orange-500" />
                <span className="text-sm">Kathmandu, Nepal</span>
              </div>
              <div className="flex items-center space-x-2">
                <PhoneIcon className="h-4 w-4 text-orange-500" />
                <span className="text-sm">+977-9800000000</span>
              </div>
              <div className="flex items-center space-x-2">
                <EnvelopeIcon className="h-4 w-4 text-orange-500" />
                <span className="text-sm">support@estore.com.np</span>
              </div>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-gray-400 hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-white transition-colors">Contact Us</Link></li>
              <li><Link to="/faq" className="text-gray-400 hover:text-white transition-colors">FAQ</Link></li>
              <li><Link to="/size-guide" className="text-gray-400 hover:text-white transition-colors">Size Guide</Link></li>
              <li><Link to="/track-order" className="text-gray-400 hover:text-white transition-colors">Track Order</Link></li>
              <li><Link to="/bulk-order" className="text-gray-400 hover:text-white transition-colors">Bulk Orders</Link></li>
            </ul>
          </div>

          {/* Policies */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Policies</h4>
            <ul className="space-y-2">
              <li><Link to="/return-policy" className="text-gray-400 hover:text-white transition-colors">Return & Refund</Link></li>
              <li><Link to="/shipping-policy" className="text-gray-400 hover:text-white transition-colors">Shipping Policy</Link></li>
              <li><Link to="/privacy-policy" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms-conditions" className="text-gray-400 hover:text-white transition-colors">Terms & Conditions</Link></li>
              <li><Link to="/warranty" className="text-gray-400 hover:text-white transition-colors">Warranty</Link></li>
            </ul>
          </div>

          {/* Contact & Support */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Customer Support</h4>
            <div className="space-y-3">
              <div>
                <p className="text-gray-400 text-sm mb-2">Customer Service Hours:</p>
                <p className="text-white text-sm">Sun-Fri: 9AM-6PM</p>
                <p className="text-white text-sm">Saturday: 10AM-5PM</p>
              </div>
              
              <div className="flex space-x-3">
                <a 
                  href="viber://chat?number=9779800000000" 
                  className="bg-purple-600 p-2 rounded-lg hover:bg-purple-700 transition-colors"
                  title="Chat on Viber"
                >
                  <ChatBubbleLeftIcon className="h-5 w-5" />
                </a>
                <a 
                  href="https://wa.me/9779800000000" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-green-600 p-2 rounded-lg hover:bg-green-700 transition-colors"
                  title="Chat on WhatsApp"
                >
                  <ChatBubbleLeftIcon className="h-5 w-5" />
                </a>
                <a 
                  href="https://m.me/estore.nepal" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-600 p-2 rounded-lg hover:bg-blue-700 transition-colors"
                  title="Chat on Messenger"
                >
                  <ChatBubbleLeftIcon className="h-5 w-5" />
                </a>
              </div>

              {/* Social media */}
              <div>
                <p className="text-gray-400 text-sm mb-2">Follow Us:</p>
                <div className="flex space-x-3">
                  <a href="https://facebook.com/estore.nepal" className="text-gray-400 hover:text-blue-400 transition-colors">
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </a>
                  <a href="https://instagram.com/estore.nepal" className="text-gray-400 hover:text-pink-400 transition-colors">
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987c6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.565-3.239-1.469l2.695-2.695c.329.329.78.532 1.283.532.503 0 .954-.203 1.283-.532l2.695 2.695c-.791.904-1.942 1.469-3.239 1.469z"/>
                    </svg>
                  </a>
                  <a href="https://tiktok.com/@estore.nepal" className="text-gray-400 hover:text-purple-400 transition-colors">
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-.88-.05A6.33 6.33 0 005.76 20.5a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1.8-.5z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Payment methods and delivery partners */}
        <div className="border-t border-gray-800 pt-8 mt-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Payment methods */}
            <div>
              <h5 className="text-sm font-semibold mb-3 text-gray-400">SECURE PAYMENTS</h5>
              <div className="flex flex-wrap gap-3">
                {paymentMethods.map((method) => (
                  <div key={method.name} className="bg-white p-2 rounded-md">
                    <img 
                      src={method.logo} 
                      alt={method.name}
                      className="h-6 w-auto"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'block';
                      }}
                    />
                    <span className="hidden text-xs text-gray-600">{method.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Delivery partners */}
            <div>
              <h5 className="text-sm font-semibold mb-3 text-gray-400">DELIVERY PARTNERS</h5>
              <div className="flex flex-wrap gap-3">
                {deliveryPartners.map((partner) => (
                  <div key={partner.name} className="bg-white p-2 rounded-md">
                    <img 
                      src={partner.logo} 
                      alt={partner.name}
                      className="h-6 w-auto"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'block';
                      }}
                    />
                    <span className="hidden text-xs text-gray-600">{partner.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Security badges */}
        <div className="border-t border-gray-800 pt-6 mt-6">
          <div className="flex flex-wrap items-center justify-center space-x-6">
            <div className="flex items-center space-x-2">
              <div className="bg-green-600 rounded-full p-1">
                <svg className="h-4 w-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
              </div>
              <span className="text-sm text-gray-400">SSL Secured</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="bg-blue-600 rounded-full p-1">
                <svg className="h-4 w-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <span className="text-sm text-gray-400">Verified Seller</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="bg-orange-600 rounded-full p-1">
                <svg className="h-4 w-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.293l-3-3a1 1 0 00-1.414-1.414L9 5.586 7.707 4.293a1 1 0 00-1.414 1.414L8.586 8 6.293 10.293a1 1 0 001.414 1.414L9 10.414l1.293 1.293a1 1 0 001.414-1.414L10.414 9l1.293-1.293a1 1 0 000-1.414z" clipRule="evenodd" />
                </svg>
              </div>
              <span className="text-sm text-gray-400">Money Back Guarantee</span>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 pt-6 mt-6 text-center text-gray-400 text-sm">
          <p>© {currentYear} E-Store Nepal. All rights reserved. | Made with ❤️ in Nepal</p>
          <p className="mt-1">Registered Business in Nepal | Tax ID: 123456789</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;