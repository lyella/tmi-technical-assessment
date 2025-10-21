'use client';

import Link from 'next/link';
import { useAppSelector } from '@/hooks/useCart';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const { totalItems } = useAppSelector((state) => state.cart);
  const pathname = usePathname();
  
  const isActive = (path: string) => pathname === path;
  
  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 backdrop-blur-sm bg-opacity-95 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <span className="text-2xl font-light text-gray-900 transition-transform duration-300 group-hover:scale-105">TMI</span>
            <span className="text-gray-500 font-light">Store</span>
          </Link>
          
          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              href="/" 
              className={`transition-all duration-300 font-light ${
                isActive('/') 
                  ? 'text-gray-900 border-b-2 border-gray-900 pb-1' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Home
            </Link>
            <Link 
              href="/products" 
              className={`transition-all duration-300 font-light ${
                isActive('/products') 
                  ? 'text-gray-900 border-b-2 border-gray-900 pb-1' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Products
            </Link>
          </div>
          
          {/* Cart Icon */}
          <Link 
            href="/cart" 
            className="relative flex items-center space-x-2 bg-gray-900 text-white px-4 py-2 rounded-sm hover:bg-gray-800 transition-all duration-300 font-light hover:shadow-lg hover:scale-105"
          >
            <svg 
              className="w-5 h-5" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" 
              />
            </svg>
            <span className="hidden sm:inline text-sm">Cart</span>
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-white text-gray-900 text-xs font-light rounded-full h-5 w-5 flex items-center justify-center border border-gray-900 animate-scale-in">
                {totalItems}
              </span>
            )}
          </Link>
        </div>
      </div>
      
      {/* Mobile Navigation */}
      <div className="md:hidden border-t border-gray-200">
        <div className="flex justify-around py-2">
          <Link 
            href="/" 
            className={`flex flex-col items-center px-3 py-2 font-light ${
              isActive('/') ? 'text-gray-900' : 'text-gray-500'
            }`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            <span className="text-xs mt-1">Home</span>
          </Link>
          <Link 
            href="/products" 
            className={`flex flex-col items-center px-3 py-2 font-light ${
              isActive('/products') ? 'text-gray-900' : 'text-gray-500'
            }`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
            </svg>
            <span className="text-xs mt-1">Products</span>
          </Link>
        </div>
      </div>
    </nav>
  );
}
