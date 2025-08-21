import React from 'react';

const Footer = () => (
  <footer className="bg-white border-t mt-12">
    <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col sm:flex-row items-center justify-between">
      <div className="text-gray-600 text-sm">
        &copy; {new Date().getFullYear()} NepaliShop. All rights reserved.
      </div>
      <div className="flex gap-4 mt-2 sm:mt-0">
        <a href="/privacy" className="text-gray-500 hover:text-orange-600 text-sm">Privacy Policy</a>
        <a href="/terms" className="text-gray-500 hover:text-orange-600 text-sm">Terms of Service</a>
        <a href="/contact" className="text-gray-500 hover:text-orange-600 text-sm">Contact</a>
      </div>
    </div>
  </footer>
);

export default Footer;