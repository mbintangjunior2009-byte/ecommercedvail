'use client';

import { useState, useEffect, useMemo } from 'react';
import { getOrders, saveOrders } from '../../../lib/mockData';

export default function AdminOrdersPage() {
    const [orders, setOrders] = useState<any[]>([]);
    const [statusFilter, setStatusFilter] = useState<string>('All');

    useEffect(() => {
        setOrders(getOrders());
    }, []);

    const handleMarkDelivered = (id: string) => {
        const updated = orders.map(o =>
            o.id === id ? { ...o, status: 'Delivered' } : o
        );
        setOrders(updated);
        saveOrders(updated);
    };

    const filteredOrders = useMemo(() => {
        if (statusFilter === 'All') return orders;
        return orders.filter(o => o.status === statusFilter);
    }, [orders, statusFilter]);

    // Metrics calculations
    const metrics = useMemo(() => {
        const totalOrders = orders.length;
        const pendingOrders = orders.filter(o => o.status === 'Processing');
        const pendingRevenue = pendingOrders.reduce((sum, order) => sum + order.total, 0);

        return {
            total: totalOrders,
            pendingCount: pendingOrders.length,
            pendingRevenue: pendingRevenue
        };
    }, [orders]);

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold tracking-tight text-stone-900 dark:text-white">Incoming Order Report</h1>
                <p className="mt-2 text-sm text-stone-500 dark:text-slate-400">
                    Track pending fulfillments, analyze incoming revenue, and update order statuses.
                </p>
            </div>

            {/* Metrics Dashboard */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 mb-8">
                <div className="rounded-2xl border border-stone-100 dark:border-slate-800/60 bg-white dark:bg-slate-800/40 p-8 shadow-sm transition-all hover:shadow-md">
                    <p className="text-sm font-medium text-stone-500 dark:text-slate-400">Total Lifetime Orders</p>
                    <h3 className="text-3xl font-bold text-stone-900 dark:text-white mt-2">{metrics.total}</h3>
                </div>
                <div className="rounded-2xl border border-blue-100 dark:border-blue-900/30 bg-blue-50/30 dark:bg-blue-900/10 p-8 shadow-sm transition-all hover:shadow-md">
                    <p className="text-sm font-medium text-blue-600 dark:text-blue-400">Pending Fulfillments</p>
                    <h3 className="text-3xl font-bold text-blue-700 dark:text-blue-300 mt-2">{metrics.pendingCount}</h3>
                </div>
                <div className="rounded-2xl border border-green-100 dark:border-green-900/30 bg-green-50/30 dark:bg-green-900/10 p-8 shadow-sm transition-all hover:shadow-md">
                    <p className="text-sm font-medium text-green-600 dark:text-green-400">Pending Revenue</p>
                    <h3 className="text-3xl font-bold text-green-700 dark:text-green-300 mt-2">${metrics.pendingRevenue.toFixed(2)}</h3>
                </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-2">
                <h2 className="text-xl font-bold text-stone-900 dark:text-white">Order List</h2>

                {/* Filter Controls */}
                <div className="flex bg-stone-50/50 dark:bg-slate-800/50 p-1.5 rounded-xl border border-stone-100 dark:border-slate-800/60 w-full sm:w-auto shadow-sm">
                    {['All', 'Processing', 'Delivered'].map(status => (
                        <button
                            key={status}
                            onClick={() => setStatusFilter(status)}
                            className={`flex-1 sm:flex-none px-5 py-2 text-sm font-medium rounded-lg transition-all ${statusFilter === status
                                ? 'bg-white dark:bg-slate-700 text-stone-900 dark:text-white shadow-sm ring-1 ring-stone-900/5 dark:ring-white/10'
                                : 'text-stone-500 dark:text-slate-400 hover:text-stone-900 dark:hover:text-slate-200 hover:bg-stone-100/50 dark:hover:bg-slate-700/30'
                                }`}
                        >
                            {status}
                        </button>
                    ))}
                </div>
            </div>

            <div className="bg-white dark:bg-slate-800/40 rounded-2xl border border-stone-100 dark:border-slate-800/60 shadow-sm overflow-hidden overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[700px]">
                    <thead>
                        <tr className="bg-stone-50/50 dark:bg-slate-900/20 border-b border-stone-100 dark:border-slate-800/60 text-xs uppercase tracking-wider text-stone-500 dark:text-slate-400">
                            <th className="py-4 px-6 font-medium">Order ID</th>
                            <th className="py-4 px-6 font-medium">Customer</th>
                            <th className="py-4 px-6 font-medium">Date</th>
                            <th className="py-4 px-6 font-medium">Total</th>
                            <th className="py-4 px-6 font-medium">Status</th>
                            <th className="py-4 px-6 font-medium text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-50 dark:divide-slate-800/50">
                        {filteredOrders.length === 0 ? (
                            <tr>
                                <td colSpan={6} className="py-12 text-center text-sm text-stone-400 dark:text-slate-500">
                                    No orders found for the selected filter.
                                </td>
                            </tr>
                        ) : (
                            filteredOrders.map((order) => (
                                <tr key={order.id} className="hover:bg-stone-50/30 dark:hover:bg-slate-800/30 transition-colors group">
                                    <td className="py-4 px-6 text-sm font-medium text-stone-900 dark:text-white">
                                        #{order.id}
                                    </td>
                                    <td className="py-4 px-6 text-sm text-stone-600 dark:text-slate-300">
                                        {order.customer}
                                    </td>
                                    <td className="py-4 px-6 text-sm text-stone-500 dark:text-slate-400">
                                        {order.date}
                                    </td>
                                    <td className="py-4 px-6 text-sm font-medium text-stone-900 dark:text-white">
                                        ${order.total.toFixed(2)}
                                    </td>
                                    <td className="py-4 px-6">
                                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${order.status === 'Delivered' ? 'bg-green-50 text-green-700 border-green-200/50 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800/30' :
                                            order.status === 'Processing' ? 'bg-blue-50 text-blue-700 border-blue-200/50 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-800/30 animate-pulse' :
                                                'bg-stone-50 text-stone-700 border-stone-200/50 dark:bg-slate-800/50 dark:text-slate-300 dark:border-slate-700/50'
                                            }`}>
                                            {order.status}
                                        </span>
                                    </td>
                                    <td className="py-4 px-6 text-right">
                                        {order.status === 'Processing' && (
                                            <button
                                                onClick={() => handleMarkDelivered(order.id)}
                                                className="text-stone-700 bg-white border border-stone-200 shadow-sm hover:bg-stone-50 dark:bg-slate-800 dark:border-slate-700 dark:hover:bg-slate-700 dark:text-slate-200 px-4 py-2 rounded-xl text-xs font-medium transition-all hover:shadow"
                                            >
                                                Mark Delivered
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
