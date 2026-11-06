'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '../../contexts/AuthContext';

export default function ForgotPasswordPage() {
    const { resetPassword, isLoading } = useAuth();
    const [email, setEmail] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;

        const success = await resetPassword(email);
        if (success) {
            setIsSubmitted(true);
            setError('');
        } else {
            setError('Email not found. Please try again or register a new account.');
        }
    };

    if (isSubmitted) {
        return (
            <div className="min-h-screen bg-stone-50 flex items-center justify-center px-4">
                <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <span className="text-2xl">✉️</span>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Check Your Email</h2>
                    <p className="text-gray-600 mb-8">
                        We've sent a password reset link to <span className="font-semibold">{email}</span>.
                        Please check your inbox.
                    </p>

                    <div className="mb-8 p-4 bg-blue-50 border border-blue-200 rounded-lg text-left">
                        <p className="text-sm text-blue-800 font-semibold mb-2">Demo Mode:</p>
                        <p className="text-sm text-blue-600 mb-2">Since we can't send real emails, click here to simulate the reset link:</p>
                        <Link
                            href={`/reset-password?email=${encodeURIComponent(email)}`}
                            className="text-sm text-blue-700 underline hover:text-blue-900 break-all"
                        >
                            /reset-password?email={email}
                        </Link>
                    </div>

                    <Link
                        href="/login"
                        className="block w-full bg-slate-800 text-white py-3 rounded-lg font-semibold hover:bg-slate-900 transition-all duration-300"
                    >
                        Back to Login
                    </Link>
                </div>
            </div>
        );
    }

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
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">Forgot Password?</h2>
                    <p className="text-gray-600">Enter your email to receive a reset link</p>
                </div>

                {/* Form */}
                <div className="bg-white rounded-2xl shadow-xl p-8">
                    {error && (
                        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                            <p className="text-red-600 text-sm">{error}</p>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Email Address
                            </label>
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                    setError('');
                                }}
                                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-stone-500 focus:border-transparent transition-colors text-gray-900 ${error ? 'border-red-500' : 'border-stone-300'
                                    }`}
                                placeholder="john@example.com"
                                disabled={isLoading}
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading || !email}
                            className="w-full bg-slate-800 text-white py-3 rounded-lg font-semibold hover:bg-slate-900 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isLoading ? (
                                <span className="flex items-center justify-center">
                                    <span className="animate-spin mr-2">⚪</span>
                                    Sending Link...
                                </span>
                            ) : (
                                'Send Reset Link'
                            )}
                        </button>
                    </form>

                    <div className="mt-8 text-center">
                        <Link
                            href="/login"
                            className="text-stone-600 hover:text-slate-800 font-medium flex items-center justify-center"
                        >
                            <span className="mr-2">←</span> Back to Login
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
