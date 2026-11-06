'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../contexts/AuthContext';

// Using emojis instead of lucide icons
const CartIcon = () => <span>🛒</span>;
const StarIcon = ({ filled }: { filled: boolean }) => (
  <span className={filled ? 'text-yellow-400' : 'text-gray-300'}>★</span>
);

import { Product, getProducts } from '../lib/mockData';
import ThemeToggle from '../components/ThemeToggle';
import QuickViewModal from '../components/QuickViewModal';

export default function HomePage() {
  const router = useRouter();
  const { user, logout } = useAuth();
  const [cart, setCart] = useState<{ id: number, quantity: number }[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  useEffect(() => {
    // Load cart from localStorage on component mount
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  useEffect(() => {
    // Save cart to localStorage whenever it changes
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const [products, setProducts] = useState<Product[]>([]);
  useEffect(() => {
    setProducts(getProducts().slice(0, 4));
  }, []);

  const addToCart = (productId: number) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === productId);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === productId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { id: productId, quantity: 1 }];
    });
  };

  const getCartCount = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const removeFromCart = (productId: number) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const getTotalPrice = () => {
    return cart.reduce((total, cartItem) => {
      const product = products.find(p => p.id === cartItem.id);
      return total + (product?.price || 0) * cartItem.quantity;
    }, 0);
  };

  const getCartItems = () => {
    return cart.map(cartItem => {
      const product = products.find(p => p.id === cartItem.id);
      return { ...product, quantity: cartItem.quantity };
    }).filter(Boolean);
  };

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-stone-950 transition-colors duration-300">
      {/* Decorative Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-stone-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-slate-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-stone-100 rounded-full mix-blend-multiply filter blur-xl opacity-15 animate-pulse"></div>
      </div>

      {/* Header */}
      <header className="bg-white/95 dark:bg-stone-900/95 backdrop-blur-md shadow-sm border-b border-stone-100 dark:border-stone-800 relative transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-br from-slate-700 to-stone-600 rounded-lg flex items-center justify-center shadow-md">
              <span className="text-white font-bold text-xl">LV</span>
            </div>
            <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100">Luna Verse</h1>
          </div>
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            {user ? (
              // User is logged in - show profile and cart
              <>
                <div className="flex items-center space-x-3">
                  <div className="hidden sm:flex items-center space-x-2">
                    <div className="w-8 h-8 bg-gradient-to-r from-slate-700 to-stone-600 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-md">
                      {user.firstName.charAt(0)}{user.lastName.charAt(0)}
                    </div>
                    <span className="text-sm font-medium text-stone-700">
                      Hi, {user.firstName}
                    </span>
                  </div>
                  {user.role === 'admin' && (
                    <button
                      onClick={() => router.push('/admin')}
                      className="px-3 py-1.5 bg-stone-900 text-white rounded-md text-xs font-medium hover:bg-stone-800 transition-colors shadow-sm"
                    >
                      Admin Portal
                    </button>
                  )}
                  <button
                    onClick={() => router.push('/profile')}
                    className="p-2 text-stone-600 hover:text-slate-800 transition-colors"
                    title="My Profile"
                  >
                    👤
                  </button>
                  <button
                    onClick={logout}
                    className="p-2 text-stone-600 hover:text-slate-800 transition-colors"
                    title="Sign Out"
                  >
                    🚪
                  </button>
                </div>
                <div className="relative">
                  <button
                    onClick={() => setIsCartOpen(true)}
                    className="p-3 bg-gradient-to-r from-slate-700 to-stone-600 text-white rounded-full hover:shadow-lg transform hover:scale-105 transition-all duration-300 shadow-md"
                  >
                    <CartIcon />
                    {cart.length > 0 && (
                      <span className="absolute -top-1 -right-1 bg-stone-500 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center font-bold shadow-lg">
                        {getCartCount()}
                      </span>
                    )}
                  </button>
                </div>
              </>
            ) : (
              // User is not logged in - show login/register and cart
              <>
                <div className="hidden sm:flex items-center space-x-3">
                  <button
                    onClick={() => router.push('/login')}
                    className="text-stone-600 hover:text-slate-800 font-medium transition-colors"
                  >
                    Sign In
                  </button>
                  <button
                    onClick={() => router.push('/register')}
                    className="bg-gradient-to-r from-slate-700 to-stone-600 text-white px-4 py-2 rounded-full font-medium hover:from-slate-800 hover:to-stone-700 transition-all duration-300 shadow-md"
                  >
                    Sign Up
                  </button>
                </div>
                <div className="relative">
                  <button
                    onClick={() => setIsCartOpen(true)}
                    className="p-3 bg-gradient-to-r from-slate-700 to-stone-600 text-white rounded-full hover:shadow-lg transform hover:scale-105 transition-all duration-300 shadow-md"
                  >
                    <CartIcon />
                    {cart.length > 0 && (
                      <span className="absolute -top-1 -right-1 bg-stone-500 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center font-bold shadow-lg">
                        {getCartCount()}
                      </span>
                    )}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-stone-900"></div>
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm text-stone-200 text-sm font-medium mb-6 shadow-md border border-white/10">
            <span className="mr-2">✨</span> Premium PC Hardware Components
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6">
            <span className="block">Build Your Dream</span>
            <span className="block text-stone-300">Gaming Rig</span>
          </h2>
          <p className="text-xl text-stone-300 max-w-3xl mx-auto mb-8 leading-relaxed">
            Discover our collection of premium graphics cards, SSDs, and RAM modules to elevate your gaming experience to the next level.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => router.push('/catalog')}
              className="px-8 py-3 bg-white text-stone-900 font-bold rounded-full hover:shadow-xl transform hover:scale-105 transition-all duration-300 shadow-md"
            >
              Shop Now 🚀
            </button>
            <button
              onClick={() => router.push('/catalog')}
              className="px-8 py-3 bg-white/10 backdrop-blur-sm text-white font-bold rounded-full border border-white/20 hover:bg-white/20 transition-all duration-300 shadow-md"
            >
              View Deals 💎
            </button>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <main className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-800 dark:text-stone-100 mb-4 transition-colors">
            Featured Products
          </h2>
          <p className="text-gray-600 dark:text-stone-400 max-w-2xl mx-auto transition-colors">
            Hand-picked components for the ultimate gaming experience
          </p>
        </div>

        <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {products.map((product) => (
            <div key={product.id} className="group relative">
              {/* Product Card */}
              <div
                className="bg-white dark:bg-stone-900 rounded-2xl shadow-lg hover:shadow-2xl border border-transparent dark:border-stone-800 transform hover:-translate-y-2 transition-all duration-300 overflow-hidden cursor-pointer"
                onClick={() => router.push(`/product/${product.id}`)}
              >
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

                {/* Image Container */}
                <div className="relative overflow-hidden bg-stone-100 dark:bg-stone-950 h-48 group">
                  <img
                    src={product.image || 'https://via.placeholder.com/300'}
                    alt={product.title}
                    className="w-full h-full object-cover mix-blend-multiply dark:mix-blend-normal transition-all duration-500 group-hover:scale-110"
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
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-stone-800 dark:text-stone-100 group-hover:text-amber-600 dark:group-hover:text-amber-500 transition-colors">
                        {product.title}
                      </h3>
                      <p className="text-sm text-stone-500 dark:text-stone-400 mt-1 line-clamp-2">
                        {product.description}
                      </p>
                    </div>
                  </div>

                  {/* Rating */}
                  {product.rating && (
                    <div className="flex items-center mb-4">
                      <div className="flex items-center">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <StarIcon key={star} filled={star <= Math.round(product.rating || 0)} />
                        ))}
                      </div>
                      <span className="ml-2 text-sm text-stone-500 dark:text-stone-400 font-medium">
                        {product.rating} ({product.reviews || 128} reviews)
                      </span>
                    </div>
                  )}

                  {/* Price and Button */}
                  <div className="flex items-center justify-between mt-auto">
                    <div>
                      <p className="text-2xl font-bold text-slate-700 dark:text-stone-200">
                        ${product.price}
                      </p>
                      <p className="text-xs text-stone-500 dark:text-stone-400 line-through">
                        ${Math.floor(product.price * 1.3)}
                      </p>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        addToCart(product.id);
                      }}
                      className="bg-stone-800 dark:bg-stone-100 text-white dark:text-stone-900 p-3 rounded-full hover:shadow-lg transform hover:scale-110 transition-all duration-300 group shadow-md"
                    >
                      <CartIcon />
                      <span className="absolute -top-2 -right-2 bg-stone-500 dark:bg-stone-300 text-white dark:text-stone-900 font-bold text-xs rounded-full w-5 h-5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-sm">
                        ✓
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="relative bg-stone-900 text-stone-300 mt-20 overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-px bg-stone-800"></div>
        </div>

        <div className="relative max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-10 h-10 bg-stone-800 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-xl">LV</span>
                </div>
                <h3 className="text-xl font-bold text-white">Luna Verse</h3>
              </div>
              <p className="text-stone-400 text-sm leading-relaxed">
                Your premium destination for high-performance PC hardware components. Build the gaming rig of your dreams.
              </p>
            </div>

            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-stone-400 hover:text-white transition-colors text-sm">About Us</a></li>
                <li><a href="#" className="text-stone-400 hover:text-white transition-colors text-sm">Contact</a></li>
                <li><a href="#" className="text-stone-400 hover:text-white transition-colors text-sm">Shipping Info</a></li>
                <li><a href="#" className="text-stone-400 hover:text-white transition-colors text-sm">Returns</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Connect With Us</h4>
              <div className="flex space-x-4 mb-6">
                <div className="w-10 h-10 bg-white/5 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/10 transition-colors cursor-pointer">
                  <span className="text-sm">📧</span>
                </div>
                <div className="w-10 h-10 bg-white/5 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/10 transition-colors cursor-pointer">
                  <span className="text-sm">💬</span>
                </div>
                <div className="w-10 h-10 bg-white/5 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/10 transition-colors cursor-pointer">
                  <span className="text-sm">📱</span>
                </div>
              </div>
              <p className="text-stone-400 text-sm">
                Subscribe to our newsletter for exclusive deals!
              </p>
            </div>
          </div>

          <div className="border-t border-stone-800 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-stone-500 text-sm mb-4 md:mb-0">
                &copy; {new Date().getFullYear()} Luna Verse. All rights reserved.
              </p>
              <div className="flex items-center space-x-6">
                <span className="text-stone-500 text-sm">Made with 🤍 by gamers, for gamers</span>
                <div className="flex items-center space-x-2">
                  <span className="text-stone-500 text-sm">Payment methods:</span>
                  <span className="text-xs">💳</span>
                  <span className="text-xs">💰</span>
                  <span className="text-xs">🏦</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
      {/* Cart Modal */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div className="absolute inset-0 bg-stone-900/50 backdrop-blur-sm" onClick={() => setIsCartOpen(false)}></div>
          <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl transform transition-transform">
            <div className="flex flex-col h-full">
              {/* Cart Header */}
              <div className="bg-stone-900 text-white p-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold">Shopping Cart</h2>
                  <button
                    onClick={() => setIsCartOpen(false)}
                    className="text-white/80 hover:text-white transition-colors"
                  >
                    <span className="text-2xl">×</span>
                  </button>
                </div>
              </div>

              {/* Cart Items */}
              <div className="flex-1 overflow-y-auto p-6">
                {cart.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="text-6xl mb-4">🛒</div>
                    <p className="text-stone-500 text-lg">Your cart is empty</p>
                    <p className="text-stone-400 text-sm mt-2">Add some awesome PC components!</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {getCartItems().map((item: any) => (
                      <div key={item.id} className="bg-gray-50 rounded-lg p-4 flex items-center space-x-4">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-20 h-20 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900">{item.title}</h3>
                          <p className="text-sm text-gray-500">{item.description}</p>
                          <p className="text-lg font-bold text-purple-600">${item.price}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition-colors"
                          >
                            -
                          </button>
                          <span className="w-8 text-center font-semibold">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition-colors"
                          >
                            +
                          </button>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="w-8 h-8 rounded-full bg-red-100 hover:bg-red-200 text-red-600 flex items-center justify-center transition-colors ml-2"
                          >
                            🗑️
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Cart Footer */}
              {cart.length > 0 && (
                <div className="border-t border-stone-200 p-6 bg-stone-50">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-lg font-semibold text-stone-900">Total:</span>
                    <span className="text-2xl font-bold text-slate-800">
                      ${getTotalPrice()}
                    </span>
                  </div>
                  <div className="space-y-3">
                    <button
                      onClick={() => router.push('/checkout')}
                      className="w-full bg-slate-800 text-white py-3 rounded-lg font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300"
                    >
                      Proceed to Checkout 💳
                    </button>
                    <button
                      onClick={() => setIsCartOpen(false)}
                      className="w-full bg-stone-200 text-stone-800 py-3 rounded-lg font-semibold hover:bg-stone-300 transition-colors"
                    >
                      Continue Shopping 🛍️
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      <QuickViewModal
        product={quickViewProduct}
        isOpen={!!quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />
    </div>
  );
}
