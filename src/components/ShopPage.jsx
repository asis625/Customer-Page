import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  collection, 
  query, 
  where, 
  orderBy, 
  getDocs,
  startAfter,
  limit 
} from 'firebase/firestore';
import { 
  HeartIcon, 
  StarIcon, 
  FunnelIcon,
  ViewColumnsIcon,
  Squares2X2Icon,
  ListBulletIcon 
} from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolid } from '@heroicons/react/24/solid';
import { db } from '../firebase';
import { CartContext } from '../context/CartContext';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';

const ShopPage = () => {
  const { category } = useParams();
  const { addToCart } = useContext(CartContext);
  
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [lastVisible, setLastVisible] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [wishlist, setWishlist] = useState([]);
  const [viewMode, setViewMode] = useState('grid'); // grid, list
  const [gridSize, setGridSize] = useState('medium'); // small, medium, large
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    category: category || '',
    priceRange: '',
    rating: '',
    brand: '',
    size: '',
    color: '',
    availability: '',
    sortBy: 'newest'
  });

  const categories = [
    { value: '', label: 'All Categories', nameNe: 'सबै वर्गहरु' },
    { value: 'clothing', label: 'Clothing', nameNe: 'कपडा' },
    { value: 'electronics', label: 'Electronics', nameNe: 'इलेक्ट्रोनिक्स' },
    { value: 'jewelry', label: 'Jewelry', nameNe: 'गहना' },
    { value: 'home-living', label: 'Home & Living', nameNe: 'घर सामान' },
    { value: 'sports', label: 'Sports', nameNe: 'खेल' },
    { value: 'books', label: 'Books', nameNe: 'किताब' },
    { value: 'accessories', label: 'Accessories', nameNe: 'सामान' }
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
    { value: 'newest', label: 'Newest First' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'rating', label: 'Highest Rated' },
    { value: 'popularity', label: 'Most Popular' },
    { value: 'discount', label: 'Best Deals' }
  ];

  const brands = [
    'Nike', 'Adidas', 'Samsung', 'Apple', 'Local Brand', 'Nepali Made'
  ];

  const sizes = [
    'XS', 'S', 'M', 'L', 'XL', 'XXL', 'Free Size'
  ];

  const colors = [
    { value: 'red', label: 'Red', nameNe: 'रातो' },
    { value: 'blue', label: 'Blue', nameNe: 'निलो' },
    { value: 'green', label: 'Green', nameNe: 'हरियो' },
    { value: 'yellow', label: 'Yellow', nameNe: 'पहेंलो' },
    { value: 'black', label: 'Black', nameNe: 'कालो' },
    { value: 'white', label: 'White', nameNe: 'सेतो' },
    { value: 'pink', label: 'Pink', nameNe: 'गुलाबी' }
  ];

  useEffect(() => {
    setFilters(prev => ({ ...prev, category: category || '' }));
  }, [category]);

  useEffect(() => {
    loadProducts(true);
  }, [filters]);

  const loadProducts = async (reset = false) => {
    if (reset) {
      setLoading(true);
      setProducts([]);
      setLastVisible(null);
      setHasMore(true);
    } else {
      setLoadingMore(true);
    }

    try {
      let q = collection(db, 'products');
      
      // Apply filters
      if (filters.category) {
        q = query(q, where('category', '==', filters.category));
      }
      
      // Apply sorting
      switch (filters.sortBy) {
        case 'price-low':
          q = query(q, orderBy('price', 'asc'));
          break;
        case 'price-high':
          q = query(q, orderBy('price', 'desc'));
          break;
        case 'rating':
          q = query(q, orderBy('rating', 'desc'));
          break;
        case 'popularity':
          q = query(q, orderBy('salesCount', 'desc'));
          break;
        default:
          q = query(q, orderBy('createdAt', 'desc'));
      }

      // Pagination
      q = query(q, limit(12));
      if (!reset && lastVisible) {
        q = query(q, startAfter(lastVisible));
      }

      const querySnapshot = await getDocs(q);
      const newProducts = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      // Apply client-side filters (for filters not supported by Firestore)
      let filteredProducts = newProducts;

      if (filters.priceRange) {
        const [min, max] = filters.priceRange.split('-').map(Number);
        filteredProducts = filteredProducts.filter(product => {
          const price = Number(product.price);
          if (max) {
            return price >= min && price <= max;
          }
          return price >= min;
        });
      }

      if (filters.rating) {
        const minRating = Number(filters.rating);
        filteredProducts = filteredProducts.filter(product => 
          (product.rating || 0) >= minRating
        );
      }

      if (filters.brand) {
        filteredProducts = filteredProducts.filter(product => 
          product.brand?.toLowerCase() === filters.brand.toLowerCase()
        );
      }

      if (filters.availability === 'in-stock') {
        filteredProducts = filteredProducts.filter(product => 
          product.stock > 0
        );
      }

      setProducts(prev => reset ? filteredProducts : [...prev, ...filteredProducts]);
      setLastVisible(querySnapshot.docs[querySnapshot.docs.length - 1]);
      setHasMore(querySnapshot.docs.length === 12);
    } catch (error) {
      console.error('Error loading products:', error);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  const toggleWishlist = (productId) => {
    setWishlist(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const handleAddToCart = (product) => {
    addToCart(product);
    // Show toast notification
  };

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const clearFilters = () => {
    setFilters({
      category: category || '',
      priceRange: '',
      rating: '',
      brand: '',
      size: '',
      color: '',
      availability: '',
      sortBy: 'newest'
    });
  };

  const getActiveFiltersCount = () => {
    return Object.entries(filters).filter(([key, value]) => 
      value && key !== 'category' && key !== 'sortBy'
    ).length;
  };

  const getCurrentCategory = () => {
    return categories.find(cat => cat.value === filters.category);
  };

  const getGridClasses = () => {
    switch (gridSize) {
      case 'small':
        return 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6';
      case 'large':
        return 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3';
      default:
        return 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4';
    }
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
      
      {/* Category Header */}
      <section className="bg-white py-8 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {getCurrentCategory()?.label || 'All Products'}
              </h1>
              <p className="text-gray-600">
                {getCurrentCategory()?.nameNe && `${getCurrentCategory().nameNe} • `}
                {products.length} products available
              </p>
            </div>

            {/* View Controls */}
            <div className="flex items-center space-x-4">
              {/* Grid Size Controls */}
              <div className="hidden md:flex items-center space-x-1 bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setGridSize('small')}
                  className={`p-2 rounded ${gridSize === 'small' ? 'bg-white shadow' : ''}`}
                >
                  <Squares2X2Icon className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setGridSize('medium')}
                  className={`p-2 rounded ${gridSize === 'medium' ? 'bg-white shadow' : ''}`}
                >
                  <ViewColumnsIcon className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setGridSize('large')}
                  className={`p-2 rounded ${gridSize === 'large' ? 'bg-white shadow' : ''}`}
                >
                  <ListBulletIcon className="h-4 w-4" />
                </button>
              </div>

              {/* Sort */}
              <select
                value={filters.sortBy}
                onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                {sortOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>

              {/* Filters Toggle */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 lg:hidden"
              >
                <FunnelIcon className="h-5 w-5" />
                <span>Filters</span>
                {getActiveFiltersCount() > 0 && (
                  <span className="bg-orange-500 text-white rounded-full text-xs px-2 py-1">
                    {getActiveFiltersCount()}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Filters Sidebar */}
          <div className={`w-72 flex-shrink-0 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Filters</h3>
                {getActiveFiltersCount() > 0 && (
                  <button
                    onClick={clearFilters}
                    className="text-sm text-orange-500 hover:text-orange-600"
                  >
                    Clear All
                  </button>
                )}
              </div>
              
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
                  {categories.map(cat => (
                    <option key={cat.value} value={cat.value}>
                      {cat.label}
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
                  Rating
                </label>
                <div className="space-y-2">
                  {[4, 3, 2, 1].map(rating => (
                    <label key={rating} className="flex items-center">
                      <input
                        type="radio"
                        name="rating"
                        value={rating}
                        checked={filters.rating === rating.toString()}
                        onChange={(e) => handleFilterChange('rating', e.target.value)}
                        className="mr-2"
                      />
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <StarIcon
                            key={i}
                            className={`h-4 w-4 ${
                              i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                            }`}
                          />
                        ))}
                        <span className="ml-1 text-sm text-gray-600">& up</span>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Brand Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Brand
                </label>
                <select
                  value={filters.brand}
                  onChange={(e) => handleFilterChange('brand', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  <option value="">All Brands</option>
                  {brands.map(brand => (
                    <option key={brand} value={brand}>
                      {brand}
                    </option>
                  ))}
                </select>
              </div>

              {/* Availability Filter */}
              <div className="mb-6">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={filters.availability === 'in-stock'}
                    onChange={(e) => handleFilterChange('availability', e.target.checked ? 'in-stock' : '')}
                    className="mr-2"
                  />
                  <span className="text-sm text-gray-700">In Stock Only</span>
                </label>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            {products.length === 0 ? (
              <div className="text-center py-16">
                <div className="text-gray-400 text-6xl mb-4">📦</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  No products found
                </h3>
                <p className="text-gray-600 mb-4">
                  Try adjusting your filters or check back later
                </p>
                <button
                  onClick={clearFilters}
                  className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg transition-colors"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <>
                <div className={`grid ${getGridClasses()} gap-6`}>
                  {products.map((product, index) => (
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
                          className={`w-full object-cover group-hover:scale-105 transition-transform duration-300 ${
                            gridSize === 'small' ? 'h-32' : gridSize === 'large' ? 'h-64' : 'h-48'
                          }`}
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
                        {product.discount && (
                          <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded-md text-sm font-semibold">
                            -{product.discount}%
                          </div>
                        )}
                        {product.stock === 0 && (
                          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                            <span className="text-white font-semibold">Out of Stock</span>
                          </div>
                        )}
                      </div>
                      
                      <div className="p-4">
                        <h3 className={`font-semibold text-gray-900 mb-1 line-clamp-2 ${
                          gridSize === 'small' ? 'text-sm' : 'text-base'
                        }`}>
                          {product.name}
                        </h3>
                        {gridSize !== 'small' && (
                          <p className="text-sm text-gray-500 mb-2 line-clamp-2">
                            {product.description}
                          </p>
                        )}
                        
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
                            <span className={`font-bold text-gray-900 ${
                              gridSize === 'small' ? 'text-sm' : 'text-base'
                            }`}>
                              NPR {product.price}
                            </span>
                            {product.originalPrice && (
                              <span className="text-xs text-gray-500 line-through ml-1">
                                NPR {product.originalPrice}
                              </span>
                            )}
                          </div>
                          <button 
                            onClick={() => handleAddToCart(product)}
                            disabled={product.stock === 0}
                            className={`bg-orange-500 hover:bg-orange-600 disabled:bg-gray-400 text-white px-3 py-1 rounded-md text-xs font-semibold transition-colors ${
                              gridSize === 'small' ? 'px-2 py-1' : 'px-3 py-1'
                            }`}
                          >
                            {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Load More Button */}
                {hasMore && (
                  <div className="text-center mt-12">
                    <button
                      onClick={() => loadProducts(false)}
                      disabled={loadingMore}
                      className="bg-orange-500 hover:bg-orange-600 disabled:bg-gray-400 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
                    >
                      {loadingMore ? 'Loading...' : 'Load More Products'}
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ShopPage;