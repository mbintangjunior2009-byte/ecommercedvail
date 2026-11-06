'use client';

import { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '../../contexts/AuthContext';

function ResetPasswordForm() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const email = searchParams.get('email');
    const { confirmPasswordReset, isLoading } = useAuth();

    const [formData, setFormData] = useState({
        password: '',
        confirmPassword: ''
    });

    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (!email) {
            setError('Invalid reset link. Please try again.');
            return;
        }

        if (formData.password.length < 6) {
            setError('Password must be at least 6 characters');
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        const isReset = await confirmPasswordReset(email, formData.password);

        if (isReset) {
            setSuccess(true);
            setTimeout(() => {
                router.push('/login');
            }, 3000);
        } else {
            setError('Failed to reset password. Please try again.');
        }
    };

    if (success) {
        return (
            <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <span className="text-2xl">✓</span>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Password Reset Successful</h2>
                <p className="text-gray-600 mb-8">
                    Your password has been updated. Redirecting to login...
                </p>
                <Link
                    href="/login"
                    className="block w-full bg-slate-800 text-white py-3 rounded-lg font-semibold hover:bg-slate-900 transition-all duration-300"
                >
                    Login Now
                </Link>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-2xl shadow-xl p-8">
            {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-red-600 text-sm">{error}</p>
                </div>
            )}

            {/* Show email being reset */}
            <div className="mb-6 text-center">
                <p className="text-sm text-gray-500">Resetting password for</p>
                <p className="font-medium text-gray-900">{email}</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        New Password
                    </label>
                    <input
                        type="password"
                        required
                        value={formData.password}
                        onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                        className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-stone-500 focus:border-transparent transition-colors text-gray-900"
                        placeholder="••••••••"
                        disabled={isLoading}
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Confirm New Password
                    </label>
                    <input
                        type="password"
                        required
                        value={formData.confirmPassword}
                        onChange={(e) => setFormData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                        className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-stone-500 focus:border-transparent transition-colors text-gray-900"
                        placeholder="••••••••"
                        disabled={isLoading}
                    />
                </div>

                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-slate-800 text-white py-3 rounded-lg font-semibold hover:bg-slate-900 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isLoading ? (
                        <span className="flex items-center justify-center">
                            <span className="animate-spin mr-2">⚪</span>
                            Resetting Password...
                        </span>
                    ) : (
                        'Reset Password'
                    )}
                </button>
            </form>
        </div>
    );
}

export default function ResetPasswordPage() {
    return (
        <div className="min-h-screen bg-stone-50 flex items-center justify-center px-4">
            <div className="max-w-md w-full">
                {/* Logo */}
                <div className="text-center mb-8">
                    <div className="flex items-center justify-center space-x-2 mb-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-slate-700 to-stone-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                            LV
                        </div>
                        <h1 className="text-2xl font-bold text-gray-900">Luna Verse</h1>
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">Set New Password</h2>
                </div>

                <Suspense fallback={<div className="text-center">Loading...</div>}>
                    <ResetPasswordForm />
                </Suspense>
            </div>
        </div>
    );
}
