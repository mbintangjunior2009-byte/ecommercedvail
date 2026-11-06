'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../contexts/AuthContext';
import { useCart } from '../../contexts/CartContext';

import { Product, getProducts } from '../../lib/mockData';
import Skeleton from '@/components/Skeleton';
import ThemeToggle from '@/components/ThemeToggle';
import QuickViewModal from '@/components/QuickViewModal';
const StarIcon = ({ filled }: { filled: boolean }) => (
  <span className={filled ? 'text-yellow-400' : 'text-gray-300'}>★</span>
);

export default function CatalogPage() {
  const router = useRouter();
  const { user } = useAuth();
  const { addToCart, cartCount } = useCart();
  const [addedItems, setAddedItems] = useState<{ [key: number]: boolean }>({});
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading delay for skeleton effect
    const timer = setTimeout(() => {
      setProducts(getProducts());
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedBrand, setSelectedBrand] = useState('all');
  const [priceRange, setPriceRange] = useState({ min: 0, max: 2000 });
  const [sortBy, setSortBy] = useState('featured');
  const [showFilters, setShowFilters] = useState(false);

  const categories = [
    { id: 'all', name: 'All Products', count: products.length },
    { id: 'graphics', name: 'Graphics Cards', count: products.filter(p => p.category === 'graphics').length },
    { id: 'processor', name: 'Processors', count: products.filter(p => p.category === 'processor').length },
    { id: 'memory', name: 'Memory', count: products.filter(p => p.category === 'memory').length },
    { id: 'storage', name: 'Storage', count: products.filter(p => p.category === 'storage').length },
    { id: 'motherboard', name: 'Motherboards', count: products.filter(p => p.category === 'motherboard').length },
    { id: 'case', name: 'Cases', count: products.filter(p => p.category === 'case').length }
  ];

  const brands = ['all', ...Array.from(new Set(products.map(p => p.brand)))];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesBrand = selectedBrand === 'all' || product.brand === selectedBrand;
    const matchesPrice = product.price >= priceRange.min && product.price <= priceRange.max;

    return matchesSearch && matchesCategory && matchesBrand && matchesPrice;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low': return a.price - b.price;
      case 'price-high': return b.price - a.price;
      case 'rating': return (b.rating || 0) - (a.rating || 0);
      case 'name': return a.title.localeCompare(b.title);
      default: return 0;
    }
  });

  const handleAddToCart = (product: Product) => {
    addToCart(product);
    setAddedItems(prev => ({ ...prev, [product.id]: true }));
    setTimeout(() => {
      setAddedItems(prev => ({ ...prev, [product.id]: false }));
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-stone-950 transition-colors duration-300">
      {/* Header */}
      <header className="bg-white/95 dark:bg-stone-900/95 backdrop-blur-md shadow-sm border-b border-stone-100 dark:border-stone-800 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <button
                onClick={() => router.push('/')}
                className="text-stone-600 dark:text-stone-400 hover:text-slate-800 dark:hover:text-stone-200 font-medium transition-colors"
              >
                ← Back
              </button>
              <div className="w-10 h-10 bg-gradient-to-br from-slate-700 to-stone-600 rounded-lg flex items-center justify-center shadow-md">
                <span className="text-white font-bold text-xl">LV</span>
              </div>
              <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100">
                Product Catalog
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <ThemeToggle />
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-64 px-4 py-2 pl-10 border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 text-gray-900 dark:text-stone-100 rounded-lg focus:ring-2 focus:ring-stone-500 focus:border-transparent transition-colors"
                />
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">🔍</span>
              </div>
              <button
                onClick={() => router.push('/checkout')}
                className="relative p-3 bg-gradient-to-r from-slate-700 to-stone-600 text-white rounded-full hover:shadow-lg transform hover:scale-105 transition-all duration-300 shadow-md"
              >
                🛒
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <div className="lg:w-64">
            <div className="bg-white dark:bg-stone-900 rounded-2xl shadow-lg border border-transparent dark:border-stone-800 p-6 sticky top-8 transition-colors duration-300">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-gray-900 dark:text-stone-100">Filters</h3>
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="lg:hidden text-stone-600 dark:text-stone-400 hover:text-slate-800 dark:hover:text-stone-200"
                >
                  {showFilters ? '✕' : '☰'}
                </button>
              </div>

              <div className={`${showFilters ? 'block' : 'hidden'} lg:block space-y-6`}>
                {/* Categories */}
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-stone-200 mb-3">Categories</h4>
                  <div className="space-y-2">
                    {categories.map(category => (
                      <label key={category.id} className="flex items-center justify-between cursor-pointer hover:bg-gray-50 dark:hover:bg-stone-800 p-2 rounded transition-colors">
                        <div className="flex items-center">
                          <input
                            type="radio"
                            name="category"
                            checked={selectedCategory === category.id}
                            onChange={() => setSelectedCategory(category.id)}
                            className="mr-2 text-stone-600 focus:ring-stone-500 dark:bg-stone-800 border-gray-300 dark:border-stone-600"
                          />
                          <span className="text-sm text-gray-700 dark:text-stone-300">{category.name}</span>
                        </div>
                        <span className="text-xs text-gray-500 dark:text-stone-400">({category.count})</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Brands */}
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-stone-200 mb-3">Brands</h4>
                  <select
                    value={selectedBrand}
                    onChange={(e) => setSelectedBrand(e.target.value)}
                    className="w-full px-3 py-2 border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 text-gray-900 dark:text-stone-100 rounded-lg focus:ring-2 focus:ring-stone-500 focus:border-transparent transition-colors"
                  >
                    {brands.map(brand => (
                      <option key={brand} value={brand}>
                        {brand === 'all' ? 'All Brands' : brand}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Price Range */}
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-stone-200 mb-3">Price Range</h4>
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm text-gray-600 dark:text-stone-400">Min: ${priceRange.min}</label>
                      <input
                        type="range"
                        min="0"
                        max="2000"
                        step="50"
                        value={priceRange.min}
                        onChange={(e) => setPriceRange(prev => ({ ...prev, min: parseInt(e.target.value) }))}
                        className="w-full h-2 bg-stone-200 rounded-lg appearance-none cursor-pointer dark:bg-stone-700"
                      />
                    </div>
                    <div>
                      <label className="text-sm text-gray-600 dark:text-stone-400">Max: ${priceRange.max}</label>
                      <input
                        type="range"
                        min="0"
                        max="2000"
                        step="50"
                        value={priceRange.max}
                        onChange={(e) => setPriceRange(prev => ({ ...prev, max: parseInt(e.target.value) }))}
                        className="w-full h-2 bg-stone-200 rounded-lg appearance-none cursor-pointer dark:bg-stone-700"
                      />
                    </div>
                  </div>
                </div>

                {/* Sort */}
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-stone-200 mb-3">Sort By</h4>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full px-3 py-2 border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 text-gray-900 dark:text-stone-100 rounded-lg focus:ring-2 focus:ring-stone-500 focus:border-transparent transition-colors"
                  >
                    <option value="featured">Featured</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Highest Rated</option>
                    <option value="name">Name: A to Z</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Product Grid */}
          <div className="flex-1">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-stone-100 transition-colors">
                {sortedProducts.length} Products Found
              </h2>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="lg:hidden bg-stone-600 text-white px-4 py-2 rounded-lg"
              >
                Filters {showFilters ? '✕' : '☰'}
              </button>
            </div>

            {sortedProducts.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4 opacity-75">🔍</div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-stone-200 mb-2">No products found</h3>
                <p className="text-gray-600 dark:text-stone-400">Try adjusting your filters or search terms</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {isLoading ? (
                  // Skeleton Loading State
                  Array.from({ length: 8 }).map((_, index) => (
                    <div key={index} className="bg-white dark:bg-stone-900 dark:border dark:border-stone-800 rounded-2xl shadow-lg overflow-hidden transition-colors duration-300">
                      <Skeleton height={192} className="w-full" />
                      <div className="p-6">
                        <Skeleton height={12} width="40%" className="mb-2" />
                        <Skeleton height={20} width="80%" className="mb-3" />
                        <Skeleton height={40} className="w-full mb-4" />
                        <div className="flex justify-between items-center">
                          <div>
                            <Skeleton height={24} width={80} className="mb-1" />
                            <Skeleton height={12} width={50} />
                          </div>
                          <Skeleton height={48} width={48} circle />
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  sortedProducts.map((product) => (
                    <div key={product.id} className="bg-white dark:bg-stone-900 dark:border dark:border-stone-800 rounded-2xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 overflow-hidden group cursor-pointer"
                      onClick={() => router.push(`/product/${product.id}`)}>
                      {/* Badge */}
                      {product.badge && (
                        <div className="absolute top-4 right-4 z-10">
                          <span className={`text-white text-[10px] font-black px-2 py-0.5 rounded shadow-sm tracking-tighter uppercase ${product.badge === 'Best Seller'
                            ? 'bg-amber-500'
                            : 'bg-rose-500'
                            }`}>
                            {product.badge}
                          </span>
                        </div>
                      )}

                      {/* Image */}
                      <div className="relative overflow-hidden bg-stone-100 h-48 sm:h-56">
                        <img
                          src={product.image || 'https://images.unsplash.com/photo-1618424181497-157f25b6ddd5?w=800&q=80'}
                          alt={product.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-stone-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setQuickViewProduct(product);
                            }}
                            className="pointer-events-auto bg-white/90 dark:bg-stone-900/90 text-stone-900 dark:text-stone-100 px-4 py-2 rounded-full font-semibold shadow-lg backdrop-blur-sm hover:scale-105 transition-transform duration-300 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0"
                          >
                            👁️ Quick View
                          </button>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-6">
                        <div className="mb-3">
                          <span className="text-xs text-stone-500 font-medium uppercase">
                            {product.brand}
                          </span>
                          <h3 className="text-lg font-bold text-gray-900 dark:text-stone-100 group-hover:text-amber-600 dark:group-hover:text-amber-500 transition-colors">
                            {product.title}
                          </h3>
                          <p className="text-sm text-gray-600 dark:text-stone-400 line-clamp-2 mt-1">
                            {product.description}
                          </p>
                        </div>

                        {/* Rating */}
                        <div className="flex items-center mb-4">
                          <div className="flex items-center">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <StarIcon key={star} filled={star <= Math.round(product.rating || 0)} />
                            ))}
                          </div>
                          <span className="ml-2 text-sm text-gray-600 dark:text-stone-400">
                            ({product.reviews || 0})
                          </span>
                        </div>

                        <div className="flex items-center justify-between mt-auto">
                          <div>
                            <p className="text-2xl font-bold text-slate-700 dark:text-stone-200">${product.price}</p>
                            <p className="text-xs text-green-600 dark:text-emerald-500 font-medium mt-1">In Stock</p>
                          </div>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleAddToCart(product);
                            }}
                            className={`${addedItems[product.id]
                              ? 'bg-green-600'
                              : 'bg-stone-800'
                              } text-white p-3 rounded-full hover:shadow-lg transform hover:scale-105 transition-all duration-300 min-w-[3rem] flex items-center justify-center`}
                          >
                            {addedItems[product.id] ? '✓' : '🛒'}
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      <QuickViewModal
        product={quickViewProduct}
        isOpen={!!quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />
    </div>
  );
}
