'use client';

import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../../contexts/AuthContext';
import { useCart } from '../../../contexts/CartContext';

import { Product, getProducts } from '../../../lib/mockData';
import Skeleton from '@/components/Skeleton';
import ThemeToggle from '@/components/ThemeToggle';

const StarIcon = ({ filled, onClick }: { filled: boolean, onClick?: () => void }) => (
  <span
    className={`${filled ? 'text-yellow-400' : 'text-gray-300'} ${onClick ? 'cursor-pointer hover:scale-110 transition-transform' : ''}`}
    onClick={onClick}
  >
    ★
  </span>
);

const InteractiveStarRating = ({ initialRating = 0 }: { initialRating?: number }) => {
  const [rating, setRating] = useState(initialRating);
  const [hover, setHover] = useState(0);

  return (
    <div className="flex items-center space-x-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <StarIcon
          key={star}
          filled={star <= (hover || rating)}
          onClick={() => setRating(star)}
        />
      ))}
      <span className="ml-2 text-sm text-gray-500 font-medium">Click to rate</span>
    </div>
  );
};
export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const { user } = useAuth();
  const { addToCart, cartCount } = useCart();
  const resolvedParams = use(params);

  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isAdded, setIsAdded] = useState(false);

  useEffect(() => {
    if (resolvedParams.id) {
      const allProducts = getProducts();
      const foundProduct = allProducts.find(p => p.id === parseInt(resolvedParams.id));
      setProduct(foundProduct || null);
      setLoading(false);
    }
  }, [resolvedParams.id]);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
      setIsAdded(true);
      setTimeout(() => setIsAdded(false), 2000);
    }
  };

  // Use product images if available, otherwise just use the main image
  const galleryImages = [
    product?.image,
    // Add placeholders if we don't have real extra images yet, just so the gallery isn't empty
    product?.image,
    product?.image,
    product?.image
  ].filter(Boolean) as string[];

  if (loading) {
    return (
      <div className="min-h-screen bg-stone-50 dark:bg-stone-950 transition-colors duration-300">
        <header className="bg-white/80 dark:bg-stone-900/80 backdrop-blur-md shadow-lg border-b border-stone-100 dark:border-stone-800 transition-colors duration-300">
          <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between">
              <Skeleton width={150} height={24} />
              <Skeleton width={48} height={48} circle />
            </div>
          </div>
        </header>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <div className="bg-white dark:bg-stone-900 rounded-2xl shadow-xl p-6 border border-transparent dark:border-stone-800 transition-colors duration-300">
                <Skeleton height={400} className="w-full mb-4" />
                <div className="grid grid-cols-4 gap-2">
                  <Skeleton height={80} className="w-full" />
                  <Skeleton height={80} className="w-full" />
                  <Skeleton height={80} className="w-full" />
                  <Skeleton height={80} className="w-full" />
                </div>
              </div>
            </div>
            <div>
              <div className="bg-white dark:bg-stone-900 rounded-2xl shadow-xl p-8 border border-transparent dark:border-stone-800 transition-colors duration-300">
                <Skeleton height={12} width="20%" className="mb-4" />
                <Skeleton height={32} width="80%" className="mb-4" />
                <Skeleton height={20} width="60%" className="mb-6" />
                <Skeleton height={100} className="w-full mb-6" />
                <Skeleton height={40} width="30%" className="mb-8" />
                <div className="border-t border-stone-100 dark:border-stone-800 pt-6">
                  <Skeleton height={48} className="w-full mb-6" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-stone-50 dark:bg-stone-950 flex items-center justify-center transition-colors duration-300">
        <div className="text-center">
          <div className="text-6xl mb-4 opacity-75">📦</div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-stone-100 mb-2">Product Not Found</h1>
          <p className="text-gray-600 dark:text-stone-400 mb-4">The product you're looking for doesn't exist.</p>
          <button
            onClick={() => router.push('/catalog')}
            className="bg-stone-800 dark:bg-stone-200 text-white dark:text-stone-900 px-6 py-3 rounded-lg font-semibold hover:bg-stone-900 dark:hover:bg-white transition-all duration-300 shadow-md"
          >
            Back to Catalog
          </button>
        </div>
      </div >
    );
  }

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-stone-950 transition-colors duration-300">
      {/* Header */}
      <header className="bg-white/90 dark:bg-stone-900/90 backdrop-blur-md shadow-lg border-b border-stone-100 dark:border-stone-800 sticky top-0 z-50 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => router.push('/catalog')}
                className="text-stone-600 dark:text-stone-400 hover:text-slate-800 dark:hover:text-stone-200 font-medium transition-colors"
              >
                ← Back to Catalog
              </button>
              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-gradient-to-br from-slate-700 to-stone-600 rounded-lg flex items-center justify-center shadow-md">
                  <span className="text-white font-bold text-xl">LV</span>
                </div>
                <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100 hidden sm:block">
                  Luna Verse
                </h1>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <ThemeToggle />
              <button
                onClick={() => router.push('/checkout')}
                className="relative p-3 bg-gradient-to-r from-slate-700 to-stone-600 text-white rounded-full hover:shadow-lg transform hover:scale-105 transition-all duration-300"
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Product Images */}
          <div className="lg:sticky lg:top-24 h-max">
            <div className="bg-white dark:bg-stone-900 rounded-2xl shadow-xl p-4 sm:p-6 border border-transparent dark:border-stone-800 transition-colors duration-300">
              {/* Main Image */}
              <div className="aspect-square bg-stone-100 dark:bg-stone-950 rounded-xl overflow-hidden mb-4 relative group">
                <img
                  src={galleryImages[selectedImage]}
                  alt={product.title}
                  className="w-full h-full object-cover mix-blend-multiply dark:mix-blend-normal transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              {/* Thumbnail Gallery */}
              <div className="grid grid-cols-4 gap-2 sm:gap-4">
                {galleryImages.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`aspect-square rounded-xl overflow-hidden border-2 transition-all duration-300 ${selectedImage === index
                      ? 'border-stone-600 dark:border-stone-400 shadow-md transform scale-105'
                      : 'border-transparent hover:border-stone-300 dark:hover:border-stone-600 opacity-70 hover:opacity-100'
                      } bg-stone-100 dark:bg-stone-950`}
                  >
                    <img
                      src={image}
                      alt={`${product.title} ${index + 1}`}
                      className="w-full h-full object-cover mix-blend-multiply dark:mix-blend-normal"
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Product Details */}
          <div>
            <div className="bg-white dark:bg-stone-900 rounded-2xl shadow-xl p-6 sm:p-8 border border-transparent dark:border-stone-800 transition-colors duration-300">
              {/* Product Info */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm text-stone-500 dark:text-stone-400 font-bold tracking-wider uppercase">
                    {product.brand}
                  </span>
                  <span className="bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-400 text-xs font-bold px-3 py-1 rounded-full border border-emerald-200 dark:border-emerald-800/50">
                    In Stock
                  </span>
                </div>

                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900 dark:text-stone-100 mb-4 leading-tight">
                  {product.title}
                </h1>

                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-6">
                  <div className="flex items-center bg-stone-50 dark:bg-stone-950 px-3 py-1.5 rounded-full w-max border border-stone-200 dark:border-stone-800">
                    <div className="flex items-center">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <StarIcon key={star} filled={star <= Math.round(product.rating || 0)} />
                      ))}
                    </div>
                    <span className="ml-2 text-sm font-medium text-gray-700 dark:text-stone-300">
                      {product.rating} <span className="text-gray-400 dark:text-stone-500 font-normal">({product.reviews} reviews)</span>
                    </span>
                  </div>
                  <div className="hidden sm:block w-1 h-1 bg-stone-300 dark:bg-stone-700 rounded-full"></div>
                  <InteractiveStarRating initialRating={Math.round(product.rating || 0)} />
                </div>

                <p className="text-gray-600 dark:text-stone-400 mb-8 leading-relaxed text-base sm:text-lg">
                  {product.description}
                </p>

                <div className="flex items-end gap-3 mb-8">
                  <div className="text-4xl sm:text-5xl font-black text-slate-800 dark:text-stone-100 tracking-tight">
                    ${product.price}
                  </div>
                </div>
              </div>

              {/* Quantity and Add to Cart */}
              <div className="border-t border-stone-100 dark:border-stone-800 pt-8">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                  <div className="flex flex-col gap-1">
                    <span className="text-sm font-medium text-stone-500 dark:text-stone-400">Quantity</span>
                    <div className="flex items-center bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-800 rounded-lg p-1">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="w-10 h-10 flex items-center justify-center text-gray-600 dark:text-stone-400 hover:bg-white dark:hover:bg-stone-800 hover:shadow-sm rounded-md transition-all"
                      >
                        -
                      </button>
                      <span className="w-12 text-center font-semibold text-gray-900 dark:text-stone-100">
                        {quantity}
                      </span>
                      <button
                        onClick={() => setQuantity(quantity + 1)}
                        className="w-10 h-10 flex items-center justify-center text-gray-600 dark:text-stone-400 hover:bg-white dark:hover:bg-stone-800 hover:shadow-sm rounded-md transition-all"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-1 w-full sm:w-auto">
                    <span className="text-sm font-medium text-stone-500 dark:text-stone-400">Total Price</span>
                    <span className="text-2xl font-bold text-gray-900 dark:text-stone-100">
                      ${(product.price * quantity).toFixed(2)}
                    </span>
                  </div>
                </div>

                <button
                  onClick={handleAddToCart}
                  className={`w-full ${isAdded
                    ? 'bg-emerald-600 hover:bg-emerald-700 shadow-emerald-600/20'
                    : 'bg-stone-900 dark:bg-stone-100 hover:bg-stone-800 dark:hover:bg-white text-white dark:text-stone-900 shadow-stone-900/20 dark:shadow-stone-100/20'
                    } py-4 rounded-xl font-bold text-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2`}
                >
                  {isAdded ? (
                    <><span>✓</span> Added to Cart</>
                  ) : (
                    <><span>🛒</span> Add to Cart</>
                  )}
                </button>
              </div>

              {/* Specifications */}
              {product.specifications && (
                <div className="border-t border-stone-100 dark:border-stone-800 pt-8 mt-8">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-stone-100 mb-6 flex items-center gap-2">
                    <span>⚙️</span> Specifications
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
                    {Object.entries(product.specifications).map(([key, value]) => (
                      <div key={key} className="flex flex-col py-2 border-b border-stone-100 dark:border-stone-800/60">
                        <span className="text-sm text-stone-500 dark:text-stone-400 mb-1">{key}</span>
                        <span className="font-medium text-gray-900 dark:text-stone-200">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Features */}
              <div className="border-t border-stone-100 dark:border-stone-800 pt-8 mt-8">
                <h3 className="text-xl font-bold text-gray-900 dark:text-stone-100 mb-6">Why Choose Luna Verse?</h3>
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 rounded-full bg-stone-100 dark:bg-stone-800 flex items-center justify-center text-xl shrink-0">🚀</div>
                    <div>
                      <p className="font-bold text-gray-900 dark:text-stone-200">Fast Shipping</p>
                      <p className="text-sm text-gray-600 dark:text-stone-400 mt-1">Get your order in 2-3 business days securely packed</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 rounded-full bg-stone-100 dark:bg-stone-800 flex items-center justify-center text-xl shrink-0">🔒</div>
                    <div>
                      <p className="font-bold text-gray-900 dark:text-stone-200">Secure Payment</p>
                      <p className="text-sm text-gray-600 dark:text-stone-400 mt-1">Your data is fully protected with 256-bit SSL encryption</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 rounded-full bg-stone-100 dark:bg-stone-800 flex items-center justify-center text-xl shrink-0">💜</div>
                    <div>
                      <p className="font-bold text-gray-900 dark:text-stone-200">24/7 Support</p>
                      <p className="text-sm text-gray-600 dark:text-stone-400 mt-1">Our PC building experts are always here to help you</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Reviews Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="bg-white dark:bg-stone-900 rounded-2xl shadow-xl p-6 sm:p-10 border border-transparent dark:border-stone-800 transition-colors duration-300">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-stone-100 flex items-center gap-3">
              Customer Reviews
              <span className="bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400 text-sm py-1 px-3 rounded-full font-medium">
                {product.reviews} total
              </span>
            </h2>
          </div>

          <div className="space-y-8">
            {product.detailedReviews?.map((review) => (
              <div key={review.id} className="border-b border-stone-100 dark:border-stone-800/60 pb-8 last:border-0 last:pb-0">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
                  <div className="flex items-center space-x-4">
                    {review.photo ? (
                      <img src={review.photo} alt={review.author} className="w-14 h-14 rounded-full border-2 border-stone-100 dark:border-stone-800 shadow-sm object-cover" />
                    ) : (
                      <div className="w-14 h-14 rounded-full bg-gradient-to-br from-stone-200 to-stone-300 dark:from-stone-700 dark:to-stone-800 flex items-center justify-center text-stone-600 dark:text-stone-300 font-bold text-xl shadow-inner">
                        {review.author[0]}
                      </div>
                    )}
                    <div>
                      <p className="font-bold text-gray-900 dark:text-stone-200 text-lg">{review.author}</p>
                      <p className="text-sm text-stone-500 dark:text-stone-400">{review.date}</p>
                    </div>
                  </div>
                  <div className="flex bg-stone-50 dark:bg-stone-800/50 px-3 py-1.5 rounded-full w-max">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <StarIcon key={star} filled={star <= review.rating} />
                    ))}
                  </div>
                </div>
                <p className="text-gray-700 dark:text-stone-300 leading-relaxed mb-4 text-base sm:text-lg">
                  "{review.comment}"
                </p>
                {/* Buyer Verified Badge */}
                <div className="flex items-center text-emerald-600 dark:text-emerald-500 text-xs font-bold uppercase tracking-wider bg-emerald-50 dark:bg-emerald-900/20 w-max px-3 py-1.5 rounded-full">
                  <span className="mr-1.5 text-sm">✓</span> Verified Purchase
                </div>
              </div>
            ))}

            {!product.detailedReviews?.length && (
              <div className="text-center py-16 border-2 border-dashed border-stone-200 dark:border-stone-800 rounded-2xl bg-stone-50 dark:bg-stone-900/50">
                <div className="text-4xl mb-4 opacity-50">✍️</div>
                <p className="text-stone-600 dark:text-stone-400 font-medium text-lg">No reviews yet.</p>
                <p className="text-stone-500 dark:text-stone-500 mt-1">Be the first to share your thoughts about this product!</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
