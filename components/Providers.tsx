'use client';

import { Provider } from 'react-redux';
import { store } from '@/store';
import { useEffect } from 'react';
import { initializeCart } from '@/store/cartSlice';

export function Providers({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    store.dispatch(initializeCart());
  }, []);
  
  return <Provider store={store}>{children}</Provider>;
}
