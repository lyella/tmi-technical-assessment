'use client';

import Image from 'next/image';
import { CartItem as CartItemType } from '@/types';
import { formatPrice } from '@/lib/utils';
import { useAppDispatch } from '@/hooks/useCart';
import { incrementQuantity, decrementQuantity, removeFromCart } from '@/store/cartSlice';

interface CartItemProps {
  item: CartItemType;
}

export default function CartItem({ item }: CartItemProps) {
  const dispatch = useAppDispatch();
  const { product, quantity } = item;
  const subtotal = product.price * quantity;
  
  return (
    <div className="bg-white border border-gray-200 rounded-sm p-4 flex gap-4 hover:border-gray-300 transition-colors">
      <div className="relative w-24 h-24 flex-shrink-0 bg-gray-50 rounded-sm">
        <Image
          src={product.image}
          alt={product.title}
          fill
          className="object-contain p-2"
          sizes="96px"
        />
      </div>
      
      <div className="flex-1 flex flex-col">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <h3 className="text-lg font-light text-gray-900 line-clamp-2">
              {product.title}
            </h3>
            <p className="text-sm text-gray-500 mt-1 font-light">
              {formatPrice(product.price)} each
            </p>
          </div>
          
          <button
            onClick={() => dispatch(removeFromCart(product.id))}
            className="text-gray-500 hover:text-gray-900 p-1 transition-colors"
            aria-label="Remove item"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
        
        <div className="flex justify-between items-center mt-auto">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => dispatch(decrementQuantity(product.id))}
              disabled={quantity <= 1}
              className={`w-8 h-8 border rounded-sm flex items-center justify-center transition-colors ${
                quantity <= 1
                  ? 'border-gray-200 text-gray-300 cursor-not-allowed'
                  : 'border-gray-300 text-gray-900 hover:border-gray-900'
              }`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 12H4" />
              </svg>
            </button>
            
            <span className="w-12 text-center font-light text-gray-900">
              {quantity}
            </span>
            
            <button
              onClick={() => dispatch(incrementQuantity(product.id))}
              className="w-8 h-8 border border-gray-300 text-gray-900 hover:border-gray-900 rounded-sm flex items-center justify-center transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m8-8H4" />
              </svg>
            </button>
          </div>
          
          <div className="text-right">
            <p className="text-sm text-gray-500 font-light">Subtotal</p>
            <p className="text-xl font-light text-gray-900">
              {formatPrice(subtotal)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
