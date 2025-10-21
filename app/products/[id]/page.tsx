'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { Product } from '@/types';
import { getProductById } from '@/lib/api';
import { formatPrice } from '@/lib/utils';
import { useAppDispatch, useAppSelector } from '@/hooks/useCart';
import { addToCart } from '@/store/cartSlice';
import LoadingSpinner from '@/components/LoadingSpinner';
import EmptyState from '@/components/EmptyState';
import ReviewSection from '@/components/ReviewSection';

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector((state) => state.cart.items);
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [quantity, setQuantity] = useState(1);
  
  useEffect(() => {
    async function fetchProduct() {
      try {
        setLoading(true);
        const id = parseInt(params.id as string);
        const data = await getProductById(id);
        setProduct(data);
        setError(null);
      } catch (err) {
        setError('Failed to load product. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    
    fetchProduct();
  }, [params.id]);
  
  const handleAddToCart = () => {
    if (!product) return;
    
    setIsAdding(true);
    for (let i = 0; i < quantity; i++) {
      dispatch(addToCart(product));
    }
    setTimeout(() => setIsAdding(false), 600);
  };
  
  // Calculate quantity already in cart
  const quantityInCart = product ? cartItems.find(item => item.product.id === product.id)?.quantity || 0 : 0;
  
  if (loading) {
    return <LoadingSpinner />;
  }
  
  if (error || !product) {
    return (
      <EmptyState
        title="Product not found"
        message={error || "We couldn't find the product you're looking for."}
        icon="products"
        action={{ label: 'Back to Products', href: '/products' }}
      />
    );
  }
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
      {/* Breadcrumb */}
      <nav className="mb-6 flex items-center text-sm text-gray-600 font-light">
        <button onClick={() => router.push('/')} className="hover:text-gray-900 transition-colors">
          Home
        </button>
        <svg className="w-4 h-4 mx-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
        </svg>
        <button onClick={() => router.push('/products')} className="hover:text-gray-900 transition-colors">
          Products
        </button>
        <svg className="w-4 h-4 mx-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
        </svg>
        <span className="text-gray-900 font-light truncate">{product.title}</span>
      </nav>
      
      {/* Product Details */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Image Section */}
        <div className="bg-white border border-gray-200 rounded-sm p-8">
          <div className="relative w-full aspect-square">
            <Image
              src={product.image}
              alt={product.title}
              fill
              className="object-contain"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          </div>
        </div>
        
        {/* Info Section */}
        <div className="space-y-6">
          <div>
            <p className="text-sm text-gray-500 font-light uppercase mb-2 tracking-wide">
              {product.category === 'jewelery' ? 'jewelry' : product.category}
            </p>
            <h1 className="text-3xl md:text-4xl font-light text-gray-900 mb-4">
              {product.title}
            </h1>
            
            {/* Rating */}
            <div className="flex items-center space-x-2 mb-4">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.floor(product.rating.rate)
                        ? 'text-gray-400 fill-current'
                        : 'text-gray-200'
                    }`}
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                  </svg>
                ))}
              </div>
              <span className="text-gray-600 text-sm font-light">
                {product.rating.rate} ({product.rating.count} reviews)
              </span>
            </div>
            
            {/* Price */}
            <div className="mb-6">
              <span className="text-4xl font-light text-gray-900">
                {formatPrice(product.price)}
              </span>
            </div>
            
            {/* Description */}
            <div className="prose max-w-none">
              <h3 className="text-lg font-medium mb-2 text-gray-900">Description</h3>
              <p className="text-gray-600 leading-relaxed font-light">{product.description}</p>
            </div>
          </div>
          
          {/* Quantity Selector */}
          <div>
            <label className="block text-sm font-light text-gray-600 mb-2">
              Quantity
            </label>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                disabled={quantity <= 1}
                className={`w-10 h-10 border rounded-sm flex items-center justify-center transition-colors ${
                  quantity <= 1
                    ? 'border-gray-200 text-gray-300 cursor-not-allowed'
                    : 'border-gray-300 text-gray-900 hover:border-gray-900'
                }`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 12H4" />
                </svg>
              </button>
              
              <span className="text-2xl font-light w-12 text-center text-gray-900">
                {quantity}
              </span>
              
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="w-10 h-10 border border-gray-300 text-gray-900 hover:border-gray-900 rounded-sm flex items-center justify-center transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m8-8H4" />
                </svg>
              </button>
            </div>
          </div>
          
          {/* Add to Cart Button */}
          <div className="relative">
            {quantityInCart > 0 && (
              <div className="absolute -top-3 -right-3 bg-white border-2 border-gray-900 text-gray-900 text-xs font-medium px-3 py-1 rounded-full z-10 animate-slide-in-right">
                {quantityInCart} in cart
              </div>
            )}
            <button
              onClick={handleAddToCart}
              disabled={isAdding}
              className={`w-full py-4 px-8 rounded-sm font-medium text-lg transition-all duration-200 ${
                isAdding
                  ? 'bg-gray-900 text-white'
                  : quantityInCart > 0
                  ? 'bg-gray-900 text-white hover:bg-gray-800'
                  : 'bg-gray-900 text-white hover:bg-gray-800'
              }`}
            >
              {isAdding ? (
                <span className="flex items-center justify-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
                  </svg>
                  Added to Cart
                </span>
              ) : quantityInCart > 0 ? (
                `Add More (${quantityInCart} in cart)`
              ) : (
                'Add to Cart'
              )}
            </button>
          </div>
          
          {/* Features */}
          <div className="border-t border-gray-200 pt-6 space-y-4">
            <div className="flex items-start space-x-3">
              <svg className="w-5 h-5 text-gray-900 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
              </svg>
              <p className="text-gray-600 font-light">Free shipping on orders over $50</p>
            </div>
            <div className="flex items-start space-x-3">
              <svg className="w-5 h-5 text-gray-900 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
              </svg>
              <p className="text-gray-600 font-light">30-day return policy</p>
            </div>
            <div className="flex items-start space-x-3">
              <svg className="w-5 h-5 text-gray-900 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
              </svg>
              <p className="text-gray-600 font-light">Secure payment processing</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Customer Reviews Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ReviewSection productId={product.id} />
      </div>
    </div>
  );
}
