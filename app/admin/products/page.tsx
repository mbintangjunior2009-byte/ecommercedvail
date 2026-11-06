'use client';

import { useState, useEffect } from 'react';
import { Product, getProducts, saveProducts } from '../../../lib/mockData';

export default function AdminProductsPage() {
    const [products, setProducts] = useState<Product[]>([]);

    // Modal State
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);
    const [formData, setFormData] = useState<Partial<Product>>({
        title: '',
        price: 0,
        description: '',
        category: '',
        brand: '',
        image: '',
        inStock: true
    });

    useEffect(() => {
        setProducts(getProducts());
    }, []);

    const handleDelete = (id: number) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            const updated = products.filter(p => p.id !== id);
            setProducts(updated);
            saveProducts(updated);
        }
    };

    const handleToggleStock = (id: number) => {
        const updated = products.map(p =>
            p.id === id ? { ...p, inStock: !p.inStock } : p
        );
        setProducts(updated);
        saveProducts(updated);
    }

    const openAddModal = () => {
        setEditingProduct(null);
        setFormData({
            title: '',
            price: 0,
            description: '',
            category: '',
            brand: '',
            image: '',
            inStock: true
        });
        setIsModalOpen(true);
    };

    const openEditModal = (product: Product) => {
        setEditingProduct(product);
        setFormData(product);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    }

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (editingProduct) {
            // Update existing
            const updated = products.map(p =>
                p.id === editingProduct.id ? { ...p, ...formData } as Product : p
            );
            setProducts(updated);
            saveProducts(updated);
        } else {
            // Add new
            const newProduct: Product = {
                ...(formData as Product),
                id: Date.now(), // Generate simple ID
            };
            const updated = [...products, newProduct];
            setProducts(updated);
            saveProducts(updated);
        }

        setIsModalOpen(false);
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-stone-900 dark:text-white">Products</h1>
                    <p className="mt-2 text-sm text-stone-500 dark:text-slate-400">
                        Manage your store's catalog.
                    </p>
                </div>
                <button
                    onClick={openAddModal}
                    className="bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 px-5 py-2.5 rounded-xl text-sm font-medium shadow-sm hover:shadow-md hover:bg-stone-800 dark:hover:bg-white transition-all flex items-center gap-2"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                    Add Product
                </button>
            </div>

            <div className="bg-white dark:bg-slate-800/40 rounded-2xl border border-stone-100 dark:border-slate-800/60 shadow-sm overflow-hidden overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[800px]">
                    <thead>
                        <tr className="bg-stone-50/50 dark:bg-slate-900/20 border-b border-stone-100 dark:border-slate-800/60 text-xs uppercase tracking-wider text-stone-500 dark:text-slate-400">
                            <th className="py-4 px-6 font-medium">Product</th>
                            <th className="py-4 px-6 font-medium">Category</th>
                            <th className="py-4 px-6 font-medium">Price</th>
                            <th className="py-4 px-6 font-medium">Stock</th>
                            <th className="py-4 px-6 font-medium text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-50 dark:divide-slate-800/50">
                        {products.map((product) => (
                            <tr key={product.id} className="hover:bg-stone-50/30 dark:hover:bg-slate-800/30 transition-colors group">
                                <td className="py-4 px-6">
                                    <div className="flex items-center gap-4">
                                        <img src={product.image || '/placeholder.png'} alt={product.title} className="w-12 h-12 rounded-xl object-cover border border-stone-100 dark:border-slate-700/50 shadow-sm" />
                                        <div>
                                            <p className="text-sm font-medium text-stone-900 dark:text-white group-hover:text-stone-700 dark:group-hover:text-slate-200 transition-colors">{product.title}</p>
                                            <p className="text-xs text-stone-400 dark:text-slate-500 mt-0.5">{product.brand}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="py-4 px-6 text-sm text-stone-500 dark:text-slate-400 capitalize">
                                    {product.category}
                                </td>
                                <td className="py-4 px-6 text-sm text-stone-900 dark:text-white font-medium">
                                    ${Number(product.price).toFixed(2)}
                                </td>
                                <td className="py-4 px-6">
                                    <button
                                        onClick={() => handleToggleStock(product.id)}
                                        className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium cursor-pointer transition-all ${product.inStock
                                            ? 'bg-green-50 text-green-700 border border-green-200/50 hover:bg-green-100 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800/30 dark:hover:bg-green-900/40'
                                            : 'bg-red-50 text-red-700 border border-red-200/50 hover:bg-red-100 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800/30 dark:hover:bg-red-900/40'
                                            }`}
                                    >
                                        {product.inStock ? 'In Stock' : 'Out of Stock'}
                                    </button>
                                </td>
                                <td className="py-4 px-6 text-right">
                                    <button
                                        onClick={() => openEditModal(product)}
                                        className="text-stone-400 hover:text-stone-900 dark:hover:text-white transition-colors p-2"
                                        title="Edit"
                                        aria-label="Edit"
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                                    </button>
                                    <button
                                        onClick={() => handleDelete(product.id)}
                                        className="text-stone-400 hover:text-red-600 dark:hover:text-red-400 transition-colors p-2"
                                        title="Delete"
                                        aria-label="Delete"
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Product Form Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/20 dark:bg-slate-900/60 backdrop-blur-sm transition-opacity">
                    <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-stone-100 dark:border-slate-800 w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh] transform transition-all">
                        <div className="px-8 py-5 border-b border-stone-100 dark:border-slate-800 flex justify-between items-center bg-stone-50/50 dark:bg-slate-800/30">
                            <h2 className="text-xl font-semibold text-stone-900 dark:text-white">
                                {editingProduct ? 'Edit Product' : 'Add New Product'}
                            </h2>
                            <button
                                onClick={handleCloseModal}
                                className="text-stone-400 hover:text-stone-600 dark:text-slate-500 dark:hover:text-slate-300 transition-colors p-1 rounded-full hover:bg-stone-100 dark:hover:bg-slate-800"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                            </button>
                        </div>

                        <div className="p-8 overflow-y-auto">
                            <form id="product-form" onSubmit={handleFormSubmit} className="space-y-5">
                                <div>
                                    <label className="block text-sm font-medium text-stone-700 dark:text-slate-300 mb-1.5">Title</label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.title}
                                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                        className="w-full px-4 py-2.5 bg-stone-50 dark:bg-slate-800/50 border border-stone-200 dark:border-slate-700 rounded-xl text-stone-900 dark:text-white text-sm focus:ring-2 focus:ring-stone-900/10 dark:focus:ring-white/10 focus:border-stone-400 dark:focus:border-slate-500 transition-all outline-none"
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-5">
                                    <div>
                                        <label className="block text-sm font-medium text-stone-700 dark:text-slate-300 mb-1.5">Price ($)</label>
                                        <input
                                            type="number"
                                            step="0.01"
                                            required
                                            value={formData.price}
                                            onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
                                            className="w-full px-4 py-2.5 bg-stone-50 dark:bg-slate-800/50 border border-stone-200 dark:border-slate-700 rounded-xl text-stone-900 dark:text-white text-sm focus:ring-2 focus:ring-stone-900/10 dark:focus:ring-white/10 focus:border-stone-400 dark:focus:border-slate-500 transition-all outline-none"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-stone-700 dark:text-slate-300 mb-1.5">Brand</label>
                                        <input
                                            type="text"
                                            required
                                            value={formData.brand}
                                            onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                                            className="w-full px-4 py-2.5 bg-stone-50 dark:bg-slate-800/50 border border-stone-200 dark:border-slate-700 rounded-xl text-stone-900 dark:text-white text-sm focus:ring-2 focus:ring-stone-900/10 dark:focus:ring-white/10 focus:border-stone-400 dark:focus:border-slate-500 transition-all outline-none"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-5">
                                    <div>
                                        <label className="block text-sm font-medium text-stone-700 dark:text-slate-300 mb-1.5">Category</label>
                                        <input
                                            type="text"
                                            required
                                            value={formData.category}
                                            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                            className="w-full px-4 py-2.5 bg-stone-50 dark:bg-slate-800/50 border border-stone-200 dark:border-slate-700 rounded-xl text-stone-900 dark:text-white text-sm focus:ring-2 focus:ring-stone-900/10 dark:focus:ring-white/10 focus:border-stone-400 dark:focus:border-slate-500 transition-all outline-none"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-stone-700 dark:text-slate-300 mb-1.5">Image URL</label>
                                        <input
                                            type="url"
                                            value={formData.image || ''}
                                            onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                                            className="w-full px-4 py-2.5 bg-stone-50 dark:bg-slate-800/50 border border-stone-200 dark:border-slate-700 rounded-xl text-stone-900 dark:text-white text-sm focus:ring-2 focus:ring-stone-900/10 dark:focus:ring-white/10 focus:border-stone-400 dark:focus:border-slate-500 transition-all outline-none"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-stone-700 dark:text-slate-300 mb-1.5">Description</label>
                                    <textarea
                                        required
                                        rows={3}
                                        value={formData.description}
                                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                        className="w-full px-4 py-2.5 bg-stone-50 dark:bg-slate-800/50 border border-stone-200 dark:border-slate-700 rounded-xl text-stone-900 dark:text-white text-sm focus:ring-2 focus:ring-stone-900/10 dark:focus:ring-white/10 focus:border-stone-400 dark:focus:border-slate-500 transition-all outline-none resize-none"
                                    ></textarea>
                                </div>

                                <div className="flex items-center mt-2">
                                    <input
                                        type="checkbox"
                                        id="inStock"
                                        checked={formData.inStock}
                                        onChange={(e) => setFormData({ ...formData, inStock: e.target.checked })}
                                        className="h-4 w-4 text-stone-900 focus:ring-stone-900 border-stone-300 rounded cursor-pointer"
                                    />
                                    <label htmlFor="inStock" className="ml-2 block text-sm text-stone-700 dark:text-slate-300 cursor-pointer">
                                        Product is currently in stock
                                    </label>
                                </div>
                            </form>
                        </div>

                        <div className="px-8 py-5 border-t border-stone-100 dark:border-slate-800 flex justify-end gap-3 bg-stone-50/50 dark:bg-slate-800/30">
                            <button
                                type="button"
                                onClick={handleCloseModal}
                                className="px-5 py-2.5 text-sm text-stone-600 dark:text-slate-300 font-medium hover:bg-stone-200 dark:hover:bg-slate-700 rounded-xl transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                form="product-form"
                                className="px-5 py-2.5 bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 text-sm font-medium rounded-xl hover:bg-stone-800 dark:hover:bg-white transition-all shadow-sm hover:shadow-md"
                            >
                                {editingProduct ? 'Save Changes' : 'Add Product'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
