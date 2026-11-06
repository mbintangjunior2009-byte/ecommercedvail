'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '../../contexts/AuthContext';

interface Order {
  id: string;
  date: string;
  total: number;
  status: 'processing' | 'shipped' | 'delivered' | 'cancelled';
  items: number;
}

export default function ProfilePage() {
  const router = useRouter();
  const { user, logout } = useAuth();

  const [activeTab, setActiveTab] = useState<'overview' | 'orders' | 'settings' | 'addresses'>('overview');
  const [isEditing, setIsEditing] = useState(false);

  // Mock order data (in real app, this would come from API)
  const [orders] = useState<Order[]>([
    {
      id: 'LV2024001',
      date: '2024-01-15',
      total: 1899.99,
      status: 'delivered',
      items: 3
    },
    {
      id: 'LV2024002',
      date: '2024-01-20',
      total: 599.99,
      status: 'shipped',
      items: 2
    },
    {
      id: 'LV2024003',
      date: '2024-01-25',
      total: 1299.99,
      status: 'processing',
      items: 4
    }
  ]);

  const [profileData, setProfileData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    phone: '',
    birthDate: '',
    gender: ''
  });

  if (!user) {
    router.push('/login');
    return null;
  }

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    // In real app, this would update the user profile
    setIsEditing(false);
  };

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'shipped': return 'bg-blue-100 text-blue-800';
      case 'processing': return 'bg-yellow-100 text-yellow-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: Order['status']) => {
    switch (status) {
      case 'delivered': return 'Delivered';
      case 'shipped': return 'Shipped';
      case 'processing': return 'Processing';
      case 'cancelled': return 'Cancelled';
      default: return status;
    }
  };

  return (
    <div className="min-h-screen bg-stone-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => router.push('/')}
                className="text-stone-600 hover:text-slate-800 font-medium"
              >
                ← Back to Store
              </button>
              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-gradient-to-br from-slate-700 to-stone-600 rounded-full flex items-center justify-center text-white font-bold">
                  LV
                </div>
                <h1 className="text-2xl font-bold text-gray-900">My Account</h1>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="text-red-600 hover:text-red-700 font-medium"
            >
              Sign Out
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-xl p-6">
              {/* User Info */}
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-slate-700 to-stone-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                  {user.firstName.charAt(0)}{user.lastName.charAt(0)}
                </div>
                <h2 className="text-xl font-bold text-gray-900">
                  {user.firstName} {user.lastName}
                </h2>
                <p className="text-gray-600 text-sm">{user.email}</p>
                <p className="text-xs text-gray-500 mt-1">
                  Member since {new Date(user.createdAt).toLocaleDateString()}
                </p>
              </div>

              {/* Navigation */}
              <nav className="space-y-2">
                <button
                  onClick={() => setActiveTab('overview')}
                  className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${activeTab === 'overview'
                      ? 'bg-stone-100 text-stone-800 font-medium'
                      : 'text-gray-700 hover:bg-gray-100'
                    }`}
                >
                  📊 Overview
                </button>
                <button
                  onClick={() => setActiveTab('orders')}
                  className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${activeTab === 'orders'
                      ? 'bg-stone-100 text-stone-800 font-medium'
                      : 'text-gray-700 hover:bg-gray-100'
                    }`}
                >
                  📦 Orders
                </button>
                <button
                  onClick={() => setActiveTab('settings')}
                  className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${activeTab === 'settings'
                      ? 'bg-stone-100 text-stone-800 font-medium'
                      : 'text-gray-700 hover:bg-gray-100'
                    }`}
                >
                  ⚙️ Settings
                </button>
                <button
                  onClick={() => setActiveTab('addresses')}
                  className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${activeTab === 'addresses'
                      ? 'bg-stone-100 text-stone-800 font-medium'
                      : 'text-gray-700 hover:bg-gray-100'
                    }`}
                >
                  📍 Addresses
                </button>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl shadow-xl p-8">
              {/* Overview Tab */}
              {activeTab === 'overview' && (
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Account Overview</h3>

                  {/* Stats */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-stone-50 rounded-lg p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-stone-600 text-sm font-medium">Total Orders</p>
                          <p className="text-2xl font-bold text-gray-900">{orders.length}</p>
                        </div>
                        <span className="text-3xl">📦</span>
                      </div>
                    </div>
                    <div className="bg-slate-50 rounded-lg p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-slate-600 text-sm font-medium">Total Spent</p>
                          <p className="text-2xl font-bold text-gray-900">
                            ${orders.reduce((sum, order) => sum + order.total, 0).toFixed(2)}
                          </p>
                        </div>
                        <span className="text-3xl">💳</span>
                      </div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-gray-600 text-sm font-medium">Member Since</p>
                          <p className="text-2xl font-bold text-gray-900">
                            {new Date(user.createdAt).getFullYear()}
                          </p>
                        </div>
                        <span className="text-3xl">📅</span>
                      </div>
                    </div>
                  </div>

                  {/* Recent Orders */}
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">Recent Orders</h4>
                    <div className="space-y-4">
                      {orders.slice(0, 3).map((order) => (
                        <div key={order.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-medium text-gray-900">Order #{order.id}</p>
                              <p className="text-sm text-gray-600">
                                {new Date(order.date).toLocaleDateString()} • {order.items} items
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="font-semibold text-gray-900">${order.total.toFixed(2)}</p>
                              <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                                {getStatusText(order.status)}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <button
                      onClick={() => setActiveTab('orders')}
                      className="mt-4 text-stone-600 hover:text-slate-800 font-medium"
                    >
                      View All Orders →
                    </button>
                  </div>
                </div>
              )}

              {/* Orders Tab */}
              {activeTab === 'orders' && (
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Order History</h3>

                  {orders.length === 0 ? (
                    <div className="text-center py-12">
                      <div className="text-6xl mb-4">📦</div>
                      <p className="text-gray-500 text-lg">No orders yet</p>
                      <p className="text-gray-400 text-sm mt-2">Start shopping to see your orders here</p>
                      <Link
                        href="/"
                        className="inline-block mt-4 bg-slate-800 text-white px-6 py-2 rounded-lg font-semibold hover:bg-slate-900 transition-all duration-300"
                      >
                        Start Shopping
                      </Link>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {orders.map((order) => (
                        <div key={order.id} className="border rounded-lg p-6 hover:bg-gray-50 transition-colors">
                          <div className="flex items-center justify-between mb-4">
                            <div>
                              <h4 className="text-lg font-semibold text-gray-900">Order #{order.id}</h4>
                              <p className="text-sm text-gray-600">
                                Placed on {new Date(order.date).toLocaleDateString()}
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="text-xl font-bold text-gray-900">${order.total.toFixed(2)}</p>
                              <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                                {getStatusText(order.status)}
                              </span>
                            </div>
                          </div>
                          <div className="flex items-center justify-between">
                            <p className="text-sm text-gray-600">{order.items} items</p>
                            <button className="text-stone-600 hover:text-slate-800 font-medium text-sm">
                              View Details →
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Settings Tab */}
              {activeTab === 'settings' && (
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-2xl font-bold text-gray-900">Account Settings</h3>
                    <button
                      onClick={() => setIsEditing(!isEditing)}
                      className="text-stone-600 hover:text-slate-800 font-medium"
                    >
                      {isEditing ? 'Cancel' : 'Edit Profile'}
                    </button>
                  </div>

                  <form onSubmit={handleProfileUpdate} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          First Name
                        </label>
                        <input
                          type="text"
                          value={profileData.firstName}
                          onChange={(e) => setProfileData(prev => ({ ...prev, firstName: e.target.value }))}
                          disabled={!isEditing}
                          className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-stone-500 focus:border-transparent disabled:bg-gray-50 text-gray-900"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Last Name
                        </label>
                        <input
                          type="text"
                          value={profileData.lastName}
                          onChange={(e) => setProfileData(prev => ({ ...prev, lastName: e.target.value }))}
                          disabled={!isEditing}
                          className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-stone-500 focus:border-transparent disabled:bg-gray-50 text-gray-900"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        value={profileData.email}
                        onChange={(e) => setProfileData(prev => ({ ...prev, email: e.target.value }))}
                        disabled={!isEditing}
                        className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-stone-500 focus:border-transparent disabled:bg-gray-50 text-gray-900"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          value={profileData.phone}
                          onChange={(e) => setProfileData(prev => ({ ...prev, phone: e.target.value }))}
                          disabled={!isEditing}
                          placeholder="+1 (555) 123-4567"
                          className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-stone-500 focus:border-transparent disabled:bg-gray-50 text-gray-900"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Birth Date
                        </label>
                        <input
                          type="date"
                          value={profileData.birthDate}
                          onChange={(e) => setProfileData(prev => ({ ...prev, birthDate: e.target.value }))}
                          disabled={!isEditing}
                          className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-stone-500 focus:border-transparent disabled:bg-gray-50 text-gray-900"
                        />
                      </div>
                    </div>

                    {isEditing && (
                      <div className="flex justify-end space-x-4">
                        <button
                          type="button"
                          onClick={() => setIsEditing(false)}
                          className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="px-6 py-2 bg-slate-800 text-white rounded-lg hover:bg-slate-900 transition-all duration-300"
                        >
                          Save Changes
                        </button>
                      </div>
                    )}
                  </form>

                  {/* Password Change Section */}
                  <div className="mt-8 pt-8 border-t">
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">Password & Security</h4>
                    <div className="space-y-4">
                      <button className="text-stone-600 hover:text-slate-800 font-medium">
                        Change Password →
                      </button>
                      <button className="text-stone-600 hover:text-slate-800 font-medium block">
                        Enable Two-Factor Authentication →
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Addresses Tab */}
              {activeTab === 'addresses' && (
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-2xl font-bold text-gray-900">Shipping Addresses</h3>
                    <button className="bg-slate-800 text-white px-4 py-2 rounded-lg font-semibold hover:bg-slate-900 transition-all duration-300">
                      Add New Address
                    </button>
                  </div>

                  <div className="text-center py-12">
                    <div className="text-6xl mb-4">📍</div>
                    <p className="text-gray-500 text-lg">No saved addresses</p>
                    <p className="text-gray-400 text-sm mt-2">Add your first shipping address for faster checkout</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
