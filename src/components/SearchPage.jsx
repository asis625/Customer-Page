import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore';
import { HeartIcon, StarIcon, FunnelIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolid } from '@heroicons/react/24/solid';
import { db } from '../firebase';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('q') || '';
  const searchLanguage = searchParams.get('lang') || 'en';
  
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [filters, setFilters] = useState({
    category: '',
    priceRange: '',
    rating: '',
    sortBy: 'relevance'
  });
  const [showFilters, setShowFilters] = useState(false);

  // Nepal-specific search terms mapping
  const nepaliToEnglishMap = {
    // Clothing terms
    'कपडा': ['clothing', 'clothes', 'garment'],
    'जुत्ता': ['shoes', 'footwear'],
    'टोपी': ['hat', 'cap'],
    'साडी': ['saree', 'sari'],
    'चोली': ['choli', 'blouse'],
    'कुर्ता': ['kurta', 'shirt'],
    'सलवार': ['salwar', 'trouser'],
    
    // Jewelry terms
    'गहना': ['jewelry', 'jewellery', 'ornament'],
    'सुन': ['gold'],
    'चाँदी': ['silver'],
    'हार': ['necklace'],
    'कानको फुल': ['earring', 'earrings'],
    'टिका': ['tika', 'forehead ornament'],
    'पोते': ['beads', 'mala'],
    
    // Electronics
    'मोबाइल': ['mobile', 'phone', 'smartphone'],
    'ल्यापटप': ['laptop', 'computer'],
    'घडी': ['watch', 'clock'],
    'रेडियो': ['radio'],
    'टिभी': ['tv', 'television'],
    
    // Home items
    'घर': ['home', 'house'],
    'खाना': ['food', 'meal'],
    'भाँडो': ['utensil', 'cookware'],
    'ओछ्यान': ['bed', 'mattress'],
    'तकिया': ['pillow'],
    'कम्बल': ['blanket'],
    
    // Colors
    'रातो': ['red'],
    'निलो': ['blue'],
    'हरियो': ['green'],
    'पहेंलो': ['yellow'],
    'कालो': ['black'],
    'सेतो': ['white'],
    'गुलाबी': ['pink'],
    
    // Common adjectives
    'नयाँ': ['new', 'latest'],
    'पुरानो': ['old', 'vintage'],
    'सुन्दर': ['beautiful', 'pretty'],
    'राम्रो': ['good', 'nice'],
    'सस्तो': ['cheap', 'affordable'],
    'महंगो': ['expensive', 'premium']
  };

  const categories = [
    { value: '', label: 'All Categories' },
    { value: 'clothing', label: 'Clothing (कपडा)' },
    { value: 'electronics', label: 'Electronics (इलेक्ट्रोनिक्स)' },
    { value: 'jewelry', label: 'Jewelry (गहना)' },
    { value: 'home', label: 'Home & Living (घर सामान)' },
    { value: 'sports', label: 'Sports (खेल)' },
    { value: 'books', label: 'Books (किताब)' }
  ];

  const priceRanges = [
    { value: '', label: 'All Prices' },
    { value: '0-500', label: 'Under NPR 500' },
    { value: '500-1500', label: 'NPR 500 - 1,500' },
    { value: '1500-5000', label: 'NPR 1,500 - 5,000' },
    { value: '5000-15000', label: 'NPR 5,000 - 15,000' },
    { value: '15000+', label: 'Above NPR 15,000' }
  ];

  const sortOptions = [
    { value: 'relevance', label: 'Most Relevant' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'rating', label: 'Highest Rated' },
    { value: 'newest', label: 'Newest First' },
    { value: 'popularity', label: 'Most Popular' }
  ];

  useEffect(() => {
    searchProducts();
  }, [searchQuery, searchLanguage]);

  useEffect(() => {
    applyFilters();
  }, [products, filters]);

  const getSearchTerms = (query) => {
    const terms = [query.toLowerCase()];
    
    // If searching in Nepali, add English equivalents
    if (searchLanguage === 'ne') {
      Object.entries(nepaliToEnglishMap).forEach(([nepali, englishTerms]) => {
        if (query.toLowerCase().includes(nepali)) {
          terms.push(...englishTerms);
        }
      });
    }
    
    // If searching in English, add partial matches for Nepali
    if (searchLanguage === 'en') {
      Object.entries(nepaliToEnglishMap).forEach(([nepali, englishTerms]) => {
        if (englishTerms.some(term => query.toLowerCase().includes(term))) {
          terms.push(nepali);
        }
      });
    }
    
    return terms;
  };

  const searchProducts = async () => {
    if (!searchQuery.trim()) {
      setProducts([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      // Get all products first (in a real app, you'd use full-text search)
      const q = query(collection(db, 'products'), orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      const allProducts = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      // Client-side search with smart matching
      const searchTerms = getSearchTerms(searchQuery);
      const searchResults = allProducts.filter(product => {
        const searchableText = [
          product.name,
          product.description,
          product.category,
          product.tags?.join(' ') || '',
          product.nameNe || '', // Nepali name if available
          product.descriptionNe || '' // Nepali description if available
        ].join(' ').toLowerCase();

        return searchTerms.some(term => searchableText.includes(term.toLowerCase()));
      });

      setProducts(searchResults);
    } catch (error) {
      console.error('Error searching products:', error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...products];

    // Category filter
    if (filters.category) {
      filtered = filtered.filter(product => 
        product.category?.toLowerCase() === filters.category
      );
    }

    // Price filter
    if (filters.priceRange) {
      const [min, max] = filters.priceRange.split('-').map(Number);
      filtered = filtered.filter(product => {
        const price = Number(product.price);
        if (max) {
          return price >= min && price <= max;
        }
        return price >= min; // For "15000+" range
      });
    }

    // Rating filter
    if (filters.rating) {
      const minRating = Number(filters.rating);
      filtered = filtered.filter(product => (product.rating || 0) >= minRating);
    }

    // Sort
    switch (filters.sortBy) {
      case 'price-low':
        filtered.sort((a, b) => Number(a.price) - Number(b.price));
        break;
      case 'price-high':
        filtered.sort((a, b) => Number(b.price) - Number(a.price));
        break;
      case 'rating':
        filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      case 'newest':
        filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      case 'popularity':
        filtered.sort((a, b) => (b.salesCount || 0) - (a.salesCount || 0));
        break;
      default:
        // Keep relevance order (already sorted by search relevance)
        break;
    }

    setFilteredProducts(filtered);
  };

  const toggleWishlist = (productId) => {
    setWishlist(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Search Results Header */}
      <section className="bg-white py-8 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                Search Results for "{searchQuery}"
              </h1>
              <p className="text-gray-600">
                {filteredProducts.length} products found
                {searchLanguage === 'ne' && ' (नेपाली खोज)'}
              </p>
            </div>
            
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 lg:hidden"
            >
              <FunnelIcon className="h-5 w-5" />
              <span>Filters</span>
            </button>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Filters Sidebar */}
          <div className={`w-64 flex-shrink-0 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-4">
              <h3 className="text-lg font-semibold mb-4">Filters</h3>
              
              {/* Category Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category
                </label>
                <select
                  value={filters.category}
                  onChange={(e) => handleFilterChange('category', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  {categories.map(category => (
                    <option key={category.value} value={category.value}>
                      {category.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Price Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Price Range
                </label>
                <select
                  value={filters.priceRange}
                  onChange={(e) => handleFilterChange('priceRange', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  {priceRanges.map(range => (
                    <option key={range.value} value={range.value}>
                      {range.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Rating Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Minimum Rating
                </label>
                <select
                  value={filters.rating}
                  onChange={(e) => handleFilterChange('rating', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  <option value="">Any Rating</option>
                  <option value="4">4+ Stars</option>
                  <option value="3">3+ Stars</option>
                  <option value="2">2+ Stars</option>
                </select>
              </div>

              {/* Sort Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Sort By
                </label>
                <select
                  value={filters.sortBy}
                  onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  {sortOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            {filteredProducts.length === 0 ? (
              <div className="text-center py-16">
                <div className="text-gray-400 text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  No products found
                </h3>
                <p className="text-gray-600 mb-4">
                  Try different keywords or remove some filters
                </p>
                <div className="text-sm text-gray-500">
                  <p>Search suggestions:</p>
                  <div className="flex flex-wrap justify-center gap-2 mt-2">
                    {['कपडा', 'गहना', 'मोबाइल', 'जुत्ता', 'घडी'].map(term => (
                      <Link
                        key={term}
                        to={`/search?q=${term}&lang=ne`}
                        className="px-3 py-1 bg-orange-100 text-orange-600 rounded-full hover:bg-orange-200 transition-colors"
                      >
                        {term}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProducts.map((product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-shadow group"
                  >
                    <div className="relative overflow-hidden rounded-t-xl">
                      <img
                        src={product.imageUrl || product.image || '/images/placeholder.jpg'}
                        alt={product.name}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                        onError={(e) => {
                          e.target.src = '/images/placeholder.jpg';
                        }}
                      />
                      <button
                        onClick={() => toggleWishlist(product.id)}
                        className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors"
                      >
                        {wishlist.includes(product.id) ? (
                          <HeartSolid className="h-4 w-4 text-red-500" />
                        ) : (
                          <HeartIcon className="h-4 w-4 text-gray-400" />
                        )}
                      </button>
                    </div>
                    
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-900 mb-1 line-clamp-2 text-sm">
                        {product.name}
                      </h3>
                      <p className="text-xs text-gray-500 mb-2 line-clamp-2">
                        {product.description}
                      </p>
                      
                      <div className="flex items-center mb-2">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <StarIcon
                              key={i}
                              className={`h-3 w-3 ${
                                i < (product.rating || 4) ? 'text-yellow-400 fill-current' : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-xs text-gray-500 ml-1">
                          ({product.reviewCount || 12})
                        </span>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-sm font-bold text-gray-900">
                            NPR {product.price}
                          </span>
                          {product.originalPrice && (
                            <span className="text-xs text-gray-500 line-through ml-1">
                              NPR {product.originalPrice}
                            </span>
                          )}
                        </div>
                        <button className="bg-orange-500 hover:bg-orange-600 text-white px-3 py-1 rounded-md text-xs font-semibold transition-colors">
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default SearchPage;