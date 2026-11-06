'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ConfirmationPage() {
  const router = useRouter();
  const [orderNumber, setOrderNumber] = useState('');
  const [orderDate, setOrderDate] = useState('');

  useEffect(() => {
    // Generate random order number
    const orderNum = 'LV' + Math.random().toString(36).substr(2, 9).toUpperCase();
    setOrderNumber(orderNum);

    // Set current date
    const date = new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    setOrderDate(date);
  }, []);

  return (
    <div className="min-h-screen bg-stone-50">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto">
          {/* Success Animation */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
              <span className="text-4xl">✅</span>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Order Confirmed!
            </h1>
            <p className="text-xl text-gray-600 mb-2">
              Thank you for your purchase from Luna Verse
            </p>
            <p className="text-gray-500">
              Your order has been successfully processed and will be shipped soon.
            </p>
          </div>

          {/* Order Details Card */}
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
            <div className="border-b pb-6 mb-6">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Order Details</h2>
                  <div className="space-y-1">
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Order Number:</span> {orderNumber}
                    </p>
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Order Date:</span> {orderDate}
                    </p>
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Payment Method:</span> Credit Card
                    </p>
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Shipping Method:</span> Standard Shipping
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                    Processing
                  </span>
                </div>
              </div>
            </div>

            {/* Shipping Information */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Shipping Information</h3>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-gray-700">Your order will be shipped to your provided address.</p>
                <p className="text-sm text-gray-600 mt-2">
                  Estimated delivery: 5-7 business days
                </p>
              </div>
            </div>

            {/* Next Steps */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">What's Next?</h3>
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <span className="text-stone-600 mt-1">📧</span>
                  <div>
                    <p className="text-gray-900 font-medium">Order Confirmation Email</p>
                    <p className="text-sm text-gray-600">You'll receive a detailed confirmation email shortly.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="text-stone-600 mt-1">📦</span>
                  <div>
                    <p className="text-gray-900 font-medium">Order Processing</p>
                    <p className="text-sm text-gray-600">We're preparing your items for shipment.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="text-stone-600 mt-1">🚚</span>
                  <div>
                    <p className="text-gray-900 font-medium">Shipping Notification</p>
                    <p className="text-sm text-gray-600">You'll get tracking information once your order ships.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Customer Support */}
            <div className="bg-stone-100 rounded-lg p-4">
              <h4 className="font-semibold text-stone-900 mb-2">Need Help?</h4>
              <p className="text-sm text-stone-700 mb-3">
                Our customer support team is here to assist you with any questions about your order.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <button className="flex items-center justify-center px-4 py-2 bg-slate-800 text-white rounded-lg hover:bg-slate-900 transition-colors">
                  <span className="mr-2">💬</span>
                  Live Chat
                </button>
                <button className="flex items-center justify-center px-4 py-2 bg-white text-stone-600 border border-stone-600 rounded-lg hover:bg-stone-50 transition-colors">
                  <span className="mr-2">📧</span>
                  Email Support
                </button>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => router.push('/')}
              className="flex-1 bg-slate-800 text-white py-3 rounded-lg font-semibold hover:bg-slate-900 transition-all duration-300"
            >
              Continue Shopping
            </button>
            <button
              onClick={() => window.print()}
              className="flex-1 bg-white border-2 border-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
            >
              Print Receipt
            </button>
          </div>

          {/* Additional Info */}
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-600 mb-4">
              Follow us for updates and exclusive offers
            </p>
            <div className="flex justify-center space-x-4">
              <button className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors">
                📘
              </button>
              <button className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors">
                🐦
              </button>
              <button className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors">
                📷
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
