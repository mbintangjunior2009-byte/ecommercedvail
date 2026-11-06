'use client';

export default function AdminDashboardPage() {
    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold tracking-tight text-stone-900 dark:text-white">Dashboard</h1>
                <p className="mt-2 text-sm text-stone-500 dark:text-slate-400">
                    Overview of your store's performance.
                </p>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {/* Stat Cards */}
                <div className="rounded-2xl border border-stone-100 dark:border-slate-800/60 bg-white dark:bg-slate-800/40 p-8 shadow-sm transition-all hover:shadow-md">
                    <div className="flex items-center gap-4">
                        <div className="p-3.5 rounded-xl bg-blue-50/50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        </div>
                        <div>
                            <p className="text-sm font-medium text-stone-500 dark:text-slate-400">Total Revenue</p>
                            <h3 className="text-2xl font-bold text-stone-900 dark:text-white mt-0.5">$12,450.00</h3>
                        </div>
                    </div>
                </div>

                <div className="rounded-2xl border border-stone-100 dark:border-slate-800/60 bg-white dark:bg-slate-800/40 p-8 shadow-sm transition-all hover:shadow-md">
                    <div className="flex items-center gap-4">
                        <div className="p-3.5 rounded-xl bg-green-50/50 dark:bg-green-900/20 text-green-600 dark:text-green-400">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
                        </div>
                        <div>
                            <p className="text-sm font-medium text-stone-500 dark:text-slate-400">Total Orders</p>
                            <h3 className="text-2xl font-bold text-stone-900 dark:text-white mt-0.5">156</h3>
                        </div>
                    </div>
                </div>

                <div className="rounded-2xl border border-stone-100 dark:border-slate-800/60 bg-white dark:bg-slate-800/40 p-8 shadow-sm transition-all hover:shadow-md">
                    <div className="flex items-center gap-4">
                        <div className="p-3.5 rounded-xl bg-purple-50/50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" /></svg>
                        </div>
                        <div>
                            <p className="text-sm font-medium text-stone-500 dark:text-slate-400">Products</p>
                            <h3 className="text-2xl font-bold text-stone-900 dark:text-white mt-0.5">34</h3>
                        </div>
                    </div>
                </div>

                <div className="rounded-2xl border border-stone-100 dark:border-slate-800/60 bg-white dark:bg-slate-800/40 p-8 shadow-sm transition-all hover:shadow-md">
                    <div className="flex items-center gap-4">
                        <div className="p-3.5 rounded-xl bg-orange-50/50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                        </div>
                        <div>
                            <p className="text-sm font-medium text-stone-500 dark:text-slate-400">Active Users</p>
                            <h3 className="text-2xl font-bold text-stone-900 dark:text-white mt-0.5">89</h3>
                        </div>
                    </div>
                </div>
            </div>

            {/* Recent Activity placeholder */}
            <div className="mt-8">
                <h2 className="text-lg font-semibold text-stone-900 dark:text-white mb-6">Recent Activity</h2>
                <div className="rounded-2xl border border-stone-100 dark:border-slate-800/60 bg-white dark:bg-slate-800/40 p-12 shadow-sm flex items-center justify-center">
                    <p className="text-stone-400 dark:text-slate-500 text-sm">
                        Detailed activity charts will appear here.
                    </p>
                </div>
            </div>
        </div>
    );
}
