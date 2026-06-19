'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingBag } from 'lucide-react';
import { useCart, useActiveTheme } from '@/lib/sdui/store';

export const FloatingCart: React.FC = () => {
  const cart = useCart();
  const theme = useActiveTheme();
  const [isBouncing, setIsBouncing] = useState(false);
  
  const itemCount = cart.reduce((count, item) => count + item.quantity, 0);

  // Trigger bounce animation when cart changes
  useEffect(() => {
    if (itemCount > 0) {
      setIsBouncing(true);
      const timeout = setTimeout(() => setIsBouncing(false), 300);
      return () => clearTimeout(timeout);
    }
  }, [itemCount]);

  if (itemCount === 0) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ scale: 0, opacity: 0, y: 50 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0, opacity: 0, y: 50 }}
        transition={{ type: 'spring', damping: 20, stiffness: 300 }}
        className="fixed bottom-6 right-6 z-50 pointer-events-auto"
      >
        <motion.button
          animate={isBouncing ? { scale: [1, 1.2, 0.9, 1.1, 1] } : { scale: 1 }}
          whileHover={{ scale: 1.05, y: -4 }}
          whileTap={{ scale: 0.95 }}
          className="relative flex items-center justify-center w-16 h-16 rounded-full shadow-premium-lg text-white group"
          style={{ backgroundColor: theme?.primary || '#111827' }}
          onClick={() => {
            // Placeholder: Could open a cart drawer here
            console.log("Cart clicked! Total items:", itemCount);
          }}
        >
          {/* Subtle pulse behind the button */}
          <div className="absolute inset-0 rounded-full bg-white opacity-20 animate-ping duration-1000" />
          
          <ShoppingBag size={28} className="group-hover:-rotate-12 transition-transform duration-300" />
          
          <motion.div
            key={itemCount}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-2 -right-2 flex items-center justify-center w-7 h-7 rounded-full text-sm font-bold shadow-md"
            style={{ 
              backgroundColor: theme?.accent || '#ef4444',
              color: '#fff'
            }}
          >
            {itemCount}
          </motion.div>
        </motion.button>
      </motion.div>
    </AnimatePresence>
  );
};
