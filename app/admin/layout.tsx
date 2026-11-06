'use client';

import { useAuth } from '../../contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const { user, isLoading } = useAuth();
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        if (!isLoading) {
            if (!user) {
                router.push('/login');
            } else if (user.role !== 'admin') {
                router.push('/');
            }
        }
    }, [user, isLoading, router]);

    if (isLoading || !user || user.role !== 'admin') {
        return (
            <div className="flex h-screen items-center justify-center bg-stone-50 dark:bg-slate-900">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-stone-800 dark:border-stone-200"></div>
            </div>
        );
    }

    const isActive = (path: string) => pathname === path;
    const linkClass = (path: string) => `block px-4 py-3 flex items-center gap-3 rounded-xl transition-all duration-200 ${isActive(path) ? 'bg-stone-900 dark:bg-white text-white dark:text-stone-900 font-medium shadow-sm' : 'text-stone-500 dark:text-slate-400 hover:bg-stone-100 dark:hover:bg-slate-800 hover:text-stone-900 dark:hover:text-white'}`;

    return (
        <div className="flex h-screen bg-stone-50/50 dark:bg-slate-900/50">
            {/* Sidebar */}
            <aside className="w-72 bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl border-r border-stone-100 dark:border-slate-800/50 flex flex-col">
                <div className="p-8 pb-4">
                    <h2 className="text-2xl font-bold tracking-tight text-stone-900 dark:text-white">Admin<span className="text-stone-400 font-light">Portal</span></h2>
                </div>
                <nav className="mt-4 px-4 space-y-1.5 flex-grow">
                    <Link href="/admin" className={linkClass('/admin')}>
                        <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>
                        Dashboard
                    </Link>
                    <Link href="/admin/products" className={linkClass('/admin/products')}>
                        <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>
                        Products
                    </Link>
                    <Link href="/admin/orders" className={linkClass('/admin/orders')}>
                        <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
                        Orders
                    </Link>
                    <Link href="/admin/users" className={linkClass('/admin/users')}>
                        <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                        Users
                    </Link>
                </nav>
                <div className="p-6">
                    <Link href="/" className="flex items-center text-sm font-medium text-stone-400 hover:text-stone-900 dark:hover:text-white transition-colors group">
                        <svg className="w-4 h-4 mr-2 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                        Back to Store
                    </Link>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto p-8">
                {children}
            </main>
        </div>
    );
}
