'use client';

import { useState, useEffect } from 'react';
import { getUsers } from '../../../lib/mockData';

export default function AdminUsersPage() {
    const [users, setUsers] = useState<any[]>([]);

    useEffect(() => {
        setUsers(getUsers());
    }, []);

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold tracking-tight text-stone-900 dark:text-white">Users</h1>
                <p className="mt-2 text-sm text-stone-500 dark:text-slate-400">
                    Manage registered users and administrators.
                </p>
            </div>

            <div className="bg-white dark:bg-slate-800/40 rounded-2xl border border-stone-100 dark:border-slate-800/60 shadow-sm overflow-hidden overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[600px]">
                    <thead>
                        <tr className="bg-stone-50/50 dark:bg-slate-900/20 border-b border-stone-100 dark:border-slate-800/60 text-xs uppercase tracking-wider text-stone-500 dark:text-slate-400">
                            <th className="py-4 px-6 font-medium">Name</th>
                            <th className="py-4 px-6 font-medium">Email</th>
                            <th className="py-4 px-6 font-medium">Role</th>
                            <th className="py-4 px-6 font-medium">Joined</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-50 dark:divide-slate-800/50">
                        {users.map((user) => (
                            <tr key={user.id} className="hover:bg-stone-50/30 dark:hover:bg-slate-800/30 transition-colors group">
                                <td className="py-4 px-6 text-sm font-medium text-stone-900 dark:text-white">
                                    {user.firstName} {user.lastName}
                                </td>
                                <td className="py-4 px-6 text-sm text-stone-500 dark:text-slate-400">
                                    {user.email}
                                </td>
                                <td className="py-4 px-6">
                                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${user.role === 'admin' ? 'bg-purple-50 text-purple-700 border-purple-200/50 dark:bg-purple-900/20 dark:text-purple-400 dark:border-purple-800/30' :
                                        'bg-stone-50 text-stone-700 border-stone-200/50 dark:bg-slate-800/50 dark:text-slate-300 dark:border-slate-700/50'
                                        }`}>
                                        {user.role}
                                    </span>
                                </td>
                                <td className="py-4 px-6 text-sm text-stone-500 dark:text-slate-400">
                                    {new Date(user.createdAt).toLocaleDateString()}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
