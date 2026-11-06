'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Product } from '../lib/mockData';
import { useCart } from '../contexts/CartContext';

interface QuickViewModalProps {
    product: Product | null;
    isOpen: boolean;
    onClose: () => void;
}

export default function QuickViewModal({ product, isOpen, onClose }: QuickViewModalProps) {
    const router = useRouter();
    const { addToCart } = useCart();
    const [isAdded, setIsAdded] = useState(false);

    if (!isOpen || !product) return null;

    const handleAddToCart = (e: React.MouseEvent) => {
        e.stopPropagation();
        addToCart(product, 1);
        setIsAdded(true);
        setTimeout(() => setIsAdded(false), 2000);
    };

    const handleViewDetails = (e: React.MouseEvent) => {
        e.stopPropagation();
        router.push(`/product/${product.id}`);
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity" onClick={onClose}>
            <div
                className="relative bg-white dark:bg-stone-900 rounded-3xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto flex flex-col md:flex-row animate-in fade-in zoom-in-95 duration-200"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-10 p-2 bg-white/80 dark:bg-stone-800/80 hover:bg-white dark:hover:bg-stone-700 rounded-full backdrop-blur-md shadow-sm transition-all"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-stone-600 dark:text-stone-300">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                    </svg>
                </button>

                {/* Product Image */}
                <div className="w-full md:w-1/2 bg-stone-100 dark:bg-stone-950 p-8 flex items-center justify-center relative">
                    {product.badge && (
                        <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold text-white shadow-md z-10 ${product.badge === 'Best Seller' ? 'bg-orange-500' : 'bg-rose-600'
                            }`}>
                            {product.badge}
                        </div>
                    )}
                    <img
                        src={product.image}
                        alt={product.title}
                        className="max-w-full h-auto object-contain max-h-[400px] hover:scale-105 transition-transform duration-500"
                    />
                </div>

                {/* Product Details */}
                <div className="w-full md:w-1/2 p-8 flex flex-col justify-between">
                    <div>
                        <span className="text-xs font-bold text-amber-600 dark:text-amber-500 uppercase tracking-wider">{product.brand}</span>
                        <h2 className="text-2xl font-bold text-slate-800 dark:text-stone-100 mt-2 mb-2">{product.title}</h2>
                        <p className="text-3xl font-extrabold text-slate-900 dark:text-white mb-6">
                            ${product.price}
                        </p>
                        <p className="text-stone-600 dark:text-stone-400 mb-6 leading-relaxed line-clamp-4">
                            {product.description}
                        </p>
                    </div>

                    <div className="space-y-3 mt-4">
                        <button
                            onClick={handleAddToCart}
                            className={`w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center space-x-2 transition-all duration-300 ${isAdded
                                    ? 'bg-emerald-500 hover:bg-emerald-600 text-white shadow-lg shadow-emerald-500/30'
                                    : 'bg-gradient-to-r from-slate-800 to-stone-700 hover:from-slate-700 hover:to-stone-600 text-white shadow-xl hover:shadow-2xl transform hover:-translate-y-1'
                                }`}
                        >
                            <span>{isAdded ? 'Added to Cart! ✅' : 'Add to Cart 🛒'}</span>
                        </button>

                        <button
                            onClick={handleViewDetails}
                            className="w-full py-3 rounded-xl font-semibold text-stone-700 dark:text-stone-300 bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 transition-colors"
                        >
                            View Full Details
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
