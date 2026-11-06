'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../contexts/AuthContext';
import { useCart } from '../../contexts/CartContext';

// Using emojis instead of lucide icons
const CartIcon = () => <span>🛒</span>;
const StarIcon = ({ filled }: { filled: boolean }) => (
  <span className={filled ? 'text-yellow-400' : 'text-gray-300'}>★</span>
);

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  rating?: number;
  image?: string;
  reviews?: number;
}



interface FormData {
  email: string;
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  zipCode: string;
  country: string;
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  cardName: string;
}

interface ShippingOption {
  id: string;
  title: string;
  price: number;
  description: string;
}

const SHIPPING_OPTIONS: ShippingOption[] = [
  { id: 'standard', title: 'Standard Shipping', price: 10, description: '3-5 business days' },
  { id: 'express', title: 'Express Shipping', price: 25, description: '1-2 business days' },
  { id: 'nextDay', title: 'Next Day Delivery', price: 50, description: '1 business day' }
];

export default function CheckoutPage() {
  const router = useRouter();
  const { user } = useAuth();
  const { cart, clearCart, cartTotal } = useCart();

  const [formData, setFormData] = useState<FormData>({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    zipCode: '',
    country: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardName: ''
  });

  const [paymentMethod, setPaymentMethod] = useState<'card' | 'qris'>('card');
  const [shippingMethod, setShippingMethod] = useState<string>('standard');
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    // Check if user is authenticated
    if (!user) {
      router.push('/login');
      return;
    }



    // Pre-fill form with user data
    if (user) {
      setFormData(prev => ({
        ...prev,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName
      }));
    }
  }, [user, router]);



  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return v.slice(0, 2) + '/' + v.slice(2, 4);
    }
    return v;
  };

  const validateForm = () => {
    const newErrors: Partial<FormData> = {};

    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.firstName) newErrors.firstName = 'First name is required';
    if (!formData.lastName) newErrors.lastName = 'Last name is required';
    if (!formData.address) newErrors.address = 'Address is required';
    if (!formData.city) newErrors.city = 'City is required';
    if (!formData.zipCode) newErrors.zipCode = 'ZIP code is required';
    if (!formData.country) newErrors.country = 'Country is required';
    if (!formData.cardNumber || formData.cardNumber.replace(/\s/g, '').length !== 16) {
      newErrors.cardNumber = 'Valid card number is required';
    }
    if (!formData.expiryDate || !formData.expiryDate.match(/^\d{2}\/\d{2}$/)) {
      newErrors.expiryDate = 'Valid expiry date is required (MM/YY)';
    }
    if (!formData.cvv || formData.cvv.length !== 3) {
      newErrors.cvv = 'Valid CVV is required';
    }
    if (!formData.cardName) newErrors.cardName = 'Cardholder name is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let formattedValue = value;

    if (name === 'cardNumber') {
      formattedValue = formatCardNumber(value);
    } else if (name === 'expiryDate') {
      formattedValue = formatExpiryDate(value);
    } else if (name === 'cvv') {
      formattedValue = value.replace(/[^0-9]/g, '').slice(0, 3);
    }

    setFormData(prev => ({
      ...prev,
      [name]: formattedValue
    }));

    // Clear error for this field
    if (errors[name as keyof FormData]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      // Clear cart
      clearCart();

      // Redirect to confirmation page
      router.push('/confirmation');
    }, 3000);
  };

  const subtotal = cartTotal;

  // Calculate shipping cost
  let shipping = 0;
  if (subtotal > 0) {
    if (shippingMethod === 'standard') {
      shipping = subtotal > 500 ? 0 : 10;
    } else {
      const selectedOption = SHIPPING_OPTIONS.find(opt => opt.id === shippingMethod);
      shipping = selectedOption ? selectedOption.price : 0;
    }
  }

  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-stone-50">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-md mx-auto text-center">
            <div className="text-6xl mb-4">🛒</div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Your cart is empty</h1>
            <p className="text-gray-600 mb-8">Add some products to your cart before checkout</p>
            <button
              onClick={() => router.push('/')}
              className="bg-stone-800 text-white px-8 py-3 rounded-full font-semibold hover:bg-stone-900 transition-all duration-300"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <header className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-slate-700 to-stone-600 rounded-full flex items-center justify-center text-white font-bold">
                LV
              </div>
              <h1 className="text-2xl font-bold text-gray-900">Luna Verse</h1>
            </div>
            <button
              onClick={() => router.push('/')}
              className="text-stone-600 hover:text-slate-800 font-medium"
            >
              ← Back to Store
            </button>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Checkout</h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Contact Information */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-stone-500 focus:border-transparent text-gray-900 ${errors.email ? 'border-red-500' : 'border-stone-300'
                          }`}
                        placeholder="john@example.com"
                      />
                      {errors.email && (
                        <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Shipping Information */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Shipping Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        First Name
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-stone-500 focus:border-transparent text-gray-900 ${errors.firstName ? 'border-red-500' : 'border-stone-300'
                          }`}
                        placeholder="John"
                      />
                      {errors.firstName && (
                        <p className="mt-1 text-sm text-red-600">{errors.firstName}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Last Name
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-stone-500 focus:border-transparent text-gray-900 ${errors.lastName ? 'border-red-500' : 'border-stone-300'
                          }`}
                        placeholder="Doe"
                      />
                      {errors.lastName && (
                        <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>
                      )}
                    </div>
                  </div>

                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Address
                    </label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-stone-500 focus:border-transparent text-gray-900 ${errors.address ? 'border-red-500' : 'border-stone-300'
                        }`}
                      placeholder="123 Main St"
                    />
                    {errors.address && (
                      <p className="mt-1 text-sm text-red-600">{errors.address}</p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        City
                      </label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-900 ${errors.city ? 'border-red-500' : 'border-gray-300'
                          }`}
                        placeholder="New York"
                      />
                      {errors.city && (
                        <p className="mt-1 text-sm text-red-600">{errors.city}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        ZIP Code
                      </label>
                      <input
                        type="text"
                        name="zipCode"
                        value={formData.zipCode}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-900 ${errors.zipCode ? 'border-red-500' : 'border-gray-300'
                          }`}
                        placeholder="10001"
                      />
                      {errors.zipCode && (
                        <p className="mt-1 text-sm text-red-600">{errors.zipCode}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Country
                      </label>
                      <input
                        type="text"
                        name="country"
                        value={formData.country}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-900 ${errors.country ? 'border-red-500' : 'border-gray-300'
                          }`}
                        placeholder="United States"
                      />
                      {errors.country && (
                        <p className="mt-1 text-sm text-red-600">{errors.country}</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Shipping Method Section */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Shipping Method</h3>
                  <div className="space-y-3">
                    {SHIPPING_OPTIONS.map((option) => (
                      <label
                        key={option.id}
                        className={`flex items-center justify-between p-4 border rounded-xl cursor-pointer transition-all ${shippingMethod === option.id
                            ? 'border-stone-800 bg-stone-50 ring-1 ring-stone-800'
                            : 'border-gray-200 hover:border-gray-300'
                          }`}
                        onClick={() => setShippingMethod(option.id)}
                      >
                        <div className="flex items-center">
                          <input
                            type="radio"
                            name="shippingMethod"
                            value={option.id}
                            checked={shippingMethod === option.id}
                            onChange={() => setShippingMethod(option.id)}
                            className="h-4 w-4 text-stone-800 focus:ring-stone-800 border-gray-300"
                          />
                          <div className="ml-3">
                            <span className="block text-sm font-medium text-gray-900">{option.title}</span>
                            <span className="block text-sm text-gray-500">{option.description}</span>
                          </div>
                        </div>
                        <span className="text-sm font-semibold text-gray-900">
                          {option.id === 'standard' && subtotal > 500 ? 'FREE' : `$${option.price.toFixed(2)}`}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Payment Information */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Method</h3>

                  {/* Payment Method Toggle */}
                  <div className="flex space-x-4 mb-6">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('card')}
                      className={`flex-1 py-3 px-4 rounded-lg border-2 flex items-center justify-center space-x-2 transition-all ${paymentMethod === 'card'
                        ? 'border-stone-800 bg-stone-50 text-stone-900'
                        : 'border-gray-200 hover:border-gray-300 text-gray-600'
                        }`}
                    >
                      <span>💳</span>
                      <span className="font-medium">Credit Card</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('qris')}
                      className={`flex-1 py-3 px-4 rounded-lg border-2 flex items-center justify-center space-x-2 transition-all ${paymentMethod === 'qris'
                        ? 'border-stone-800 bg-stone-50 text-stone-900'
                        : 'border-gray-200 hover:border-gray-300 text-gray-600'
                        }`}
                    >
                      <span>📱</span>
                      <span className="font-medium">QRIS</span>
                    </button>
                  </div>

                  {paymentMethod === 'qris' ? (
                    <div className="bg-white border-2 border-dashed border-stone-300 rounded-xl p-8 text-center">
                      <div className="mb-4">
                        <div className="w-48 h-48 bg-white mx-auto p-2 border border-gray-200 rounded-lg shadow-sm">
                          {/* Placeholder for QR Code */}
                          <img
                            src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=LUNAVERSE-${total.toFixed(2)}-ORDER-${Date.now()}`}
                            alt="QRIS Payment Code"
                            className="w-full h-full object-contain"
                          />
                        </div>
                      </div>
                      <p className="text-stone-800 font-bold text-lg mb-2">Scan to Pay</p>
                      <p className="text-gray-600 text-sm mb-4">
                        Open your preferred banking or e-wallet app to scan this QR code
                      </p>
                      <div className="flex justify-center space-x-4">
                        <span className="px-2 py-1 bg-gray-100 rounded text-xs text-gray-600">GoPay</span>
                        <span className="px-2 py-1 bg-gray-100 rounded text-xs text-gray-600">OVO</span>
                        <span className="px-2 py-1 bg-gray-100 rounded text-xs text-gray-600">Dana</span>
                        <span className="px-2 py-1 bg-gray-100 rounded text-xs text-gray-600">BCA</span>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Card Number
                        </label>
                        <input
                          type="text"
                          name="cardNumber"
                          value={formData.cardNumber}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-900 ${errors.cardNumber ? 'border-red-500' : 'border-gray-300'
                            }`}
                          placeholder="1234 5678 9012 3456"
                          maxLength={19}
                        />
                        {errors.cardNumber && (
                          <p className="mt-1 text-sm text-red-600">{errors.cardNumber}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Cardholder Name
                        </label>
                        <input
                          type="text"
                          name="cardName"
                          value={formData.cardName}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-900 ${errors.cardName ? 'border-red-500' : 'border-gray-300'
                            }`}
                          placeholder="John Doe"
                        />
                        {errors.cardName && (
                          <p className="mt-1 text-sm text-red-600">{errors.cardName}</p>
                        )}
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Expiry Date
                          </label>
                          <input
                            type="text"
                            name="expiryDate"
                            value={formData.expiryDate}
                            onChange={handleInputChange}
                            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-900 ${errors.expiryDate ? 'border-red-500' : 'border-gray-300'
                              }`}
                            placeholder="MM/YY"
                            maxLength={5}
                          />
                          {errors.expiryDate && (
                            <p className="mt-1 text-sm text-red-600">{errors.expiryDate}</p>
                          )}
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            CVV
                          </label>
                          <input
                            type="text"
                            name="cvv"
                            value={formData.cvv}
                            onChange={handleInputChange}
                            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-900 ${errors.cvv ? 'border-red-500' : 'border-gray-300'
                              }`}
                            placeholder="123"
                            maxLength={3}
                          />
                          {errors.cvv && (
                            <p className="mt-1 text-sm text-red-600">{errors.cvv}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="mt-6">
                  <button
                    type="submit"
                    disabled={isProcessing}
                    className="w-full bg-slate-800 text-white py-3 rounded-lg font-semibold hover:bg-slate-900 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isProcessing ? (
                      <span className="flex items-center justify-center">
                        <span className="animate-spin mr-2">⚪</span>
                        Processing Payment...
                      </span>
                    ) : (
                      paymentMethod === 'qris' ? (
                        'I Have Paid'
                      ) : (
                        `Complete Purchase • $${total.toFixed(2)}`
                      )
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-xl p-6 sticky top-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Order Summary</h3>

              <div className="space-y-4 mb-6">
                {cart.map((item) => (
                  <div key={item.id} className="flex items-center space-x-4">
                    <img
                      src={item.image || 'https://via.placeholder.com/80'}
                      alt={item.title}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h4 className="text-sm font-medium text-gray-900 line-clamp-1">
                        {item.title}
                      </h4>
                      <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold text-gray-900">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium">
                    {shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Tax</span>
                  <span className="font-medium">${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-lg font-bold text-gray-900 pt-2 border-t">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              {shippingMethod === 'standard' && shipping > 0 && (
                <div className="mt-4 p-3 bg-stone-100 rounded-lg">
                  <p className="text-sm text-stone-700">
                    💜 Add ${(500 - subtotal).toFixed(2)} more for free shipping!
                  </p>
                </div>
              )}

              <div className="mt-6 space-y-2">
                <div className="flex items-center text-sm text-gray-600">
                  <span className="mr-2">🔒</span>
                  <span>Secure checkout powered by SSL encryption</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <span className="mr-2">💳</span>
                  <span>Accept all major credit cards</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <span className="mr-2">🚚</span>
                  <span>Fast shipping worldwide</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
