'use client';

import { useAppSelector } from '@/hooks/useCart';
import { formatPrice } from '@/lib/utils';
import CartItem from '@/components/CartItem';
import EmptyState from '@/components/EmptyState';
import Link from 'next/link';

export default function CartPage() {
  const { items, totalItems, totalAmount } = useAppSelector((state) => state.cart);
  
  if (items.length === 0) {
    return (
      <EmptyState
        title="Your cart is empty"
        message="Looks like you haven't added any items to your cart yet. Start shopping to fill it up!"
        icon="cart"
        action={{ label: 'Start Shopping', href: '/products' }}
      />
    );
  }
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
      <h1 className="text-3xl md:text-4xl font-light mb-8 text-gray-900">Shopping Cart</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <CartItem key={item.product.id} item={item} />
          ))}
        </div>
        
        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white border border-gray-200 rounded-sm p-6 sticky top-20">
            <h2 className="text-2xl font-light mb-6 text-gray-900">Order Summary</h2>
            
            <div className="space-y-4 mb-6">
              <div className="flex justify-between text-gray-600">
                <span className="font-light">Total Items:</span>
                <span className="font-medium text-gray-900">{totalItems}</span>
              </div>
              
              <div className="flex justify-between text-gray-600">
                <span className="font-light">Subtotal:</span>
                <span className="font-medium text-gray-900">{formatPrice(totalAmount)}</span>
              </div>
              
              <div className="flex justify-between text-gray-600">
                <span className="font-light">Shipping:</span>
                <span className="font-medium text-gray-900">
                  {totalAmount > 50 ? 'FREE' : formatPrice(5.99)}
                </span>
              </div>
              
              <div className="border-t border-gray-200 pt-4">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-medium text-gray-900">Total:</span>
                  <span className="text-2xl font-light text-gray-900">
                    {formatPrice(totalAmount + (totalAmount > 50 ? 0 : 5.99))}
                  </span>
                </div>
              </div>
            </div>
            
            {totalAmount <= 50 && (
              <div className="mb-6 p-3 bg-gray-50 border border-gray-200 rounded-sm">
                <p className="text-sm text-gray-700 font-light">
                  Add {formatPrice(50 - totalAmount)} more to get <strong className="font-medium">FREE shipping</strong>!
                </p>
                <div className="mt-2 bg-gray-200 rounded-sm h-2">
                  <div
                    className="bg-gray-900 h-2 rounded-sm transition-all duration-300"
                    style={{ width: `${(totalAmount / 50) * 100}%` }}
                  ></div>
                </div>
              </div>
            )}
            
            <button className="w-full bg-gray-900 text-white py-3 rounded-sm font-medium hover:bg-gray-800 transition-colors mb-3">
              Proceed to Checkout
            </button>
            
            <Link
              href="/products"
              className="block text-center text-gray-600 hover:text-gray-900 font-light"
            >
              Continue Shopping
            </Link>
            
            {/* Trust Badges */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="space-y-3">
                <div className="flex items-center space-x-3 text-sm text-gray-600 font-light">
                  <svg className="w-5 h-5 text-gray-900 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  <span>Secure Payment</span>
                </div>
                <div className="flex items-center space-x-3 text-sm text-gray-600 font-light">
                  <svg className="w-5 h-5 text-gray-900 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>30-Day Returns</span>
                </div>
                <div className="flex items-center space-x-3 text-sm text-gray-600 font-light">
                  <svg className="w-5 h-5 text-gray-900 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Quality Guaranteed</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
