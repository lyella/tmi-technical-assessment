'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Product } from '@/types';

interface SearchBarProps {
  products: Product[];
  variant?: 'hero' | 'compact';
  onSearch?: (query: string) => void;
  placeholder?: string;
}

export default function SearchBar({ 
  products, 
  variant = 'hero',
  onSearch,
  placeholder 
}: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const searchRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const isHeroVariant = variant === 'hero';
  const defaultPlaceholder = isHeroVariant 
    ? 'Search for products, categories...' 
    : 'Search products...';

  // Filter products based on search query
  useEffect(() => {
    if (query.trim().length > 0) {
      const filtered = products.filter((product) => {
        const searchTerms = query.toLowerCase().split(' ');
        const productText = `${product.title} ${product.description} ${product.category}`.toLowerCase();
        return searchTerms.every(term => productText.includes(term));
      });
      setFilteredProducts(filtered.slice(0, 6)); // Show max 6 results
      setIsOpen(true);
    } else {
      setFilteredProducts([]);
      setIsOpen(false);
    }
    
    // Call onSearch callback if provided
    if (onSearch) {
      onSearch(query);
    }
  }, [query, products, onSearch]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/products?search=${encodeURIComponent(query)}`);
      setIsOpen(false);
      setQuery('');
    }
  };

  const handleProductClick = () => {
    setIsOpen(false);
    setQuery('');
  };

  const handleClear = () => {
    setQuery('');
    setIsOpen(false);
    if (onSearch) {
      onSearch('');
    }
  };

  return (
    <div ref={searchRef} className={`relative ${isHeroVariant ? 'w-full max-w-2xl mx-auto' : 'w-full'}`}>
      <form onSubmit={handleSearch}>
        <div className="relative">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={placeholder || defaultPlaceholder}
            className={`w-full ${
              isHeroVariant 
                ? 'px-6 py-4 text-base' 
                : 'px-4 py-3 pl-12'
            } bg-white border border-gray-300 rounded-sm focus:outline-none focus:border-gray-900 transition-colors font-light text-gray-900 placeholder-gray-400`}
          />
          
          {/* Search Icon */}
          {!isHeroVariant && (
            <svg
              className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          )}
          
          {/* Clear/Search Button */}
          {query ? (
            <button
              type="button"
              onClick={handleClear}
              className={`absolute right-2 top-1/2 -translate-y-1/2 ${
                isHeroVariant ? 'p-2.5' : 'p-2'
              } text-gray-400 hover:text-gray-900 transition-colors`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          ) : (
            <button
              type="submit"
              className={`absolute right-2 top-1/2 -translate-y-1/2 ${
                isHeroVariant ? 'p-2.5' : 'p-2'
              } text-gray-600 hover:text-gray-900 transition-colors`}
            >
              <svg 
                className={isHeroVariant ? 'w-5 h-5' : 'w-4 h-4'} 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
                />
              </svg>
            </button>
          )}
        </div>
      </form>

      {/* Search Results Dropdown */}
      {isOpen && filteredProducts.length > 0 && (
        <div className="absolute z-50 w-full mt-2 bg-white border border-gray-200 rounded-sm shadow-lg max-h-96 overflow-y-auto">
          <div className="p-3 border-b border-gray-100">
            <p className="text-xs text-gray-500 font-light uppercase tracking-wide">
              {filteredProducts.length} {filteredProducts.length === 1 ? 'result' : 'results'} found
            </p>
          </div>
          {filteredProducts.map((product) => (
            <Link
              key={product.id}
              href={`/products/${product.id}`}
              onClick={handleProductClick}
              className="flex items-center gap-4 p-3 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-0"
            >
              <div className="relative w-16 h-16 bg-gray-50 rounded-sm flex-shrink-0">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-contain p-2"
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-gray-500 font-light uppercase mb-0.5">
                  {product.category}
                </p>
                <h4 className="text-sm font-light text-gray-900 line-clamp-1 mb-1">
                  {product.title}
                </h4>
                <p className="text-sm font-light text-gray-900">
                  ${product.price.toFixed(2)}
                </p>
              </div>
            </Link>
          ))}
          <Link
            href={`/products?search=${encodeURIComponent(query)}`}
            onClick={handleProductClick}
            className="block p-3 text-center text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors font-light border-t border-gray-200"
          >
            View all results →
          </Link>
        </div>
      )}

      {/* No Results */}
      {isOpen && query.trim().length > 0 && filteredProducts.length === 0 && (
        <div className="absolute z-50 w-full mt-2 bg-white border border-gray-200 rounded-sm shadow-lg p-6 text-center">
          <svg className="w-12 h-12 text-gray-300 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <p className="text-gray-600 font-light mb-2">No products found</p>
          <p className="text-sm text-gray-500 font-light">Try searching with different keywords</p>
        </div>
      )}
    </div>
  );
}
