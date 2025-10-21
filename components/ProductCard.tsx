'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/types';
import { formatPrice } from '@/lib/utils';
import { useAppDispatch, useAppSelector } from '@/hooks/useCart';
import { addToCart } from '@/store/cartSlice';
import { useState } from 'react';

interface ProductCardProps {
  product: Product;
  trending?: boolean;
}

export default function ProductCard({ product, trending = false }: ProductCardProps) {
  const dispatch = useAppDispatch();
  const [isAdding, setIsAdding] = useState(false);
  
  // Get cart items to check if product is already in cart
  const cartItems = useAppSelector((state) => state.cart.items);
  const cartItem = cartItems.find((item) => item.product.id === product.id);
  const quantityInCart = cartItem ? cartItem.quantity : 0;
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsAdding(true);
    dispatch(addToCart(product));
    setTimeout(() => setIsAdding(false), 600);
  };
  
  return (
    <Link href={`/products/${product.id}`}>
      <div className="bg-white border border-gray-200 rounded-sm overflow-hidden hover:border-gray-300 transition-all duration-300 hover:shadow-md hover:-translate-y-1 h-full flex flex-col group">
        <div className="relative w-full h-64 bg-gray-50 overflow-hidden">
          {trending && (
            <div className="absolute top-2 left-2 bg-gray-900 text-white px-3 py-1 rounded-sm text-xs font-light z-10 flex items-center gap-1 animate-slide-in-left">
              New
            </div>
          )}
          {quantityInCart > 0 && (
            <div className="absolute top-2 right-2 bg-gray-900 text-white px-2 py-1 rounded-sm text-xs font-light z-10 animate-slide-in-right">
              {quantityInCart} in cart
            </div>
          )}
          <Image
            src={product.image}
            alt={product.title}
            fill
            className="object-contain p-4 group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        
        <div className="p-4 flex-1 flex flex-col">
          <div className="flex-1">
            <p className="text-xs text-gray-500 font-light uppercase tracking-wide mb-1">
              {product.category}
            </p>
            <h3 className="text-base font-light text-gray-900 line-clamp-2 mb-2">
              {product.title}
            </h3>
            <p className="text-sm text-gray-500 font-light line-clamp-2 mb-3">
              {product.description}
            </p>
          </div>
          
          <div className="flex items-center justify-between mb-3">
            <span className="text-xl font-light text-gray-900">
              {formatPrice(product.price)}
            </span>
            <div className="flex items-center space-x-1">
              <svg className="w-4 h-4 text-gray-400 fill-current" viewBox="0 0 20 20">
                <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
              </svg>
              <span className="text-xs text-gray-500 font-light">
                {product.rating.rate} ({product.rating.count})
              </span>
            </div>
          </div>
          
          <button
            onClick={handleAddToCart}
            disabled={isAdding}
            className={`w-full py-2.5 px-4 rounded-sm font-light transition-all duration-200 ${
              isAdding
                ? 'bg-gray-900 text-white'
                : quantityInCart > 0
                ? 'bg-white text-gray-900 border border-gray-900 hover:bg-gray-50'
                : 'bg-gray-900 text-white hover:bg-gray-800'
            }`}
          >
            {isAdding ? (
              <span className="flex items-center justify-center">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Added
              </span>
            ) : quantityInCart > 0 ? (
              `Add More (${quantityInCart} in cart)`
            ) : (
              'Add to Cart'
            )}
          </button>
        </div>
      </div>
    </Link>
  );
}
