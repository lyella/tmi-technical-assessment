'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Product, SortOption } from '@/types';
import { getAllProducts, getAllCategories } from '@/lib/api';
import { sortProducts, filterProducts } from '@/lib/utils';
import ProductCard from '@/components/ProductCard';
import SearchBar from '@/components/SearchBar';
import LoadingSpinner from '@/components/LoadingSpinner';
import EmptyState from '@/components/EmptyState';

function ProductsContent() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get('category');
  
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortOption, setSortOption] = useState<SortOption>('default');
  const [searchQuery, setSearchQuery] = useState('');
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 });
  
  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const [productsData, categoriesData] = await Promise.all([
          getAllProducts(),
          getAllCategories(),
        ]);
        setProducts(productsData);
        setCategories(categoriesData);
        setFilteredProducts(productsData);
        setError(null);
      } catch (err) {
        setError('Failed to load products. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    
    fetchData();
  }, []);
  
  useEffect(() => {
    if (categoryParam) {
      setSelectedCategory(categoryParam);
    }
  }, [categoryParam]);
  
  useEffect(() => {
    let result = [...products];
    
    result = filterProducts(result, {
      category: selectedCategory,
      minPrice: priceRange.min,
      maxPrice: priceRange.max,
      searchQuery,
    });
    
    result = sortProducts(result, sortOption);
    
    setFilteredProducts(result);
  }, [products, selectedCategory, sortOption, searchQuery, priceRange]);
  
  if (loading) {
    return <LoadingSpinner />;
  }
  
  if (error) {
    return (
      <EmptyState
        title="Oops! Something went wrong"
        message={error}
        icon="products"
        action={{ label: 'Go Home', href: '/' }}
      />
    );
  }
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
      <h1 className="text-3xl md:text-4xl font-light mb-8 text-gray-900">All Products</h1>
      
      {/* Search and Filters */}
      <div className="mb-8 space-y-4">
        <SearchBar products={products} variant="compact" placeholder="Search products..." />
        
        <div className="flex flex-col md:flex-row gap-4">
          {/* Category Filter */}
          <div className="flex-1">
            <label className="block text-sm font-light text-gray-600 mb-2">
              Category
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-sm focus:outline-none focus:border-gray-900 transition-colors font-light text-gray-900 bg-white"
            >
              <option value="all">All Categories</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </option>
              ))}
            </select>
          </div>
          
          {/* Sort Options */}
          <div className="flex-1">
            <label className="block text-sm font-light text-gray-600 mb-2">
              Sort By
            </label>
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value as SortOption)}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-sm focus:outline-none focus:border-gray-900 transition-colors font-light text-gray-900 bg-white"
            >
              <option value="default">Default</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="name-asc">Name: A to Z</option>
              <option value="name-desc">Name: Z to A</option>
            </select>
          </div>
          
          {/* Price Range Filter */}
          <div className="flex-1">
            <label className="block text-sm font-light text-gray-600 mb-2">
              Price Range: ${priceRange.min} - ${priceRange.max}
            </label>
            <div className="space-y-2">
              <div className="flex gap-2 items-center">
                <input
                  type="number"
                  min="0"
                  max={priceRange.max}
                  value={priceRange.min}
                  onChange={(e) =>
                    setPriceRange({ ...priceRange, min: parseInt(e.target.value) || 0 })
                  }
                  className="w-20 px-2 py-1.5 border border-gray-300 rounded-sm focus:outline-none focus:border-gray-900 text-sm font-light text-gray-900"
                  placeholder="Min"
                />
                <span className="text-gray-400">-</span>
                <input
                  type="number"
                  min={priceRange.min}
                  max="1000"
                  value={priceRange.max}
                  onChange={(e) =>
                    setPriceRange({ ...priceRange, max: parseInt(e.target.value) || 1000 })
                  }
                  className="w-20 px-2 py-1.5 border border-gray-300 rounded-sm focus:outline-none focus:border-gray-900 text-sm font-light text-gray-900"
                  placeholder="Max"
                />
              </div>
              <input
                type="range"
                min="0"
                max="1000"
                step="10"
                value={priceRange.max}
                onChange={(e) =>
                  setPriceRange({ ...priceRange, max: parseInt(e.target.value) })
                }
                className="w-full h-1.5 bg-gray-200 rounded-sm appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-gray-900 [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-gray-900 [&::-moz-range-thumb]:border-0"
              />
            </div>
          </div>
        </div>
        
        {/* Active Filters Display */}
        <div className="flex flex-wrap gap-2 items-center">
          <span className="text-sm text-gray-600 font-light">
            Showing {filteredProducts.length} products
          </span>
          {selectedCategory !== 'all' && (
            <button
              onClick={() => setSelectedCategory('all')}
              className="px-3 py-1 bg-gray-100 text-gray-900 rounded-sm text-sm flex items-center gap-1 hover:bg-gray-200 transition-colors font-light"
            >
              {selectedCategory}
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="px-3 py-1 bg-gray-100 text-gray-900 rounded-sm text-sm flex items-center gap-1 hover:bg-gray-200 transition-colors font-light"
            >
              &quot;{searchQuery}&quot;
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
          {(priceRange.min > 0 || priceRange.max < 1000) && (
            <button
              onClick={() => setPriceRange({ min: 0, max: 1000 })}
              className="px-3 py-1 bg-gray-100 text-gray-900 rounded-sm text-sm flex items-center gap-1 hover:bg-gray-200 transition-colors font-light"
            >
              ${priceRange.min} - ${priceRange.max}
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
      </div>
      
      {/* Products Grid */}
      {filteredProducts.length === 0 ? (
        <EmptyState
          title="No products found"
          message="Try adjusting your filters or search query to find what you're looking for."
          icon="search"
          action={{ label: 'Clear Filters', href: '/products' }}
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <ProductsContent />
    </Suspense>
  );
}
