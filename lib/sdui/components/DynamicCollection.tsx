'use client';

import React, { useRef, useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Image from 'next/image';
import { DynamicCollectionProps } from '../types';
import { useDispatch, useActiveTheme, useIntegrations } from '../store';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Check, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';
import confetti from 'canvas-confetti';

export const DynamicCollection: React.FC<DynamicCollectionProps> = React.memo(
  ({ id, props: { title, items, scrollDirection, itemWidth }, onAction }) => {
    const dispatch = useDispatch();
    const theme = useActiveTheme();
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [scrollPosition, setScrollPosition] = useState(0);
    const [maxScroll, setMaxScroll] = useState(0);
    const { toggleIntegration, isIntegrationConnected, getConnectedIntegrationCount } = useIntegrations();

    const updateScrollMetrics = useCallback(() => {
      if (scrollContainerRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
        setScrollPosition(scrollLeft);
        setMaxScroll(scrollWidth - clientWidth);
      }
    }, []);

    useEffect(() => {
      updateScrollMetrics();
      window.addEventListener('resize', updateScrollMetrics);
      const container = scrollContainerRef.current;
      if (container) {
        container.addEventListener('scroll', updateScrollMetrics);
        return () => {
          container.removeEventListener('scroll', updateScrollMetrics);
          window.removeEventListener('resize', updateScrollMetrics);
        };
      }
    }, [updateScrollMetrics]);

    const scroll = (direction: 'left' | 'right') => {
      if (scrollContainerRef.current) {
        const scrollAmount = itemWidth * 1.5;
        scrollContainerRef.current.scrollBy({
          left: direction === 'left' ? -scrollAmount : scrollAmount,
          behavior: 'smooth',
        });
      }
    };

    const handleConnect = (integrationId: string, e?: React.MouseEvent) => {
      const action = { type: 'INTEGRATION_TOGGLE' as const, payload: { integrationId } };
      onAction?.(action);
      dispatch(action);
      
      if (e) {
        // Fire confetti
        const rect = (e.target as HTMLElement).getBoundingClientRect();
        const x = (rect.left + rect.width / 2) / window.innerWidth;
        const y = (rect.top + rect.height / 2) / window.innerHeight;
        
        confetti({
          particleCount: 80,
          spread: 90,
          origin: { x, y },
          colors: [theme?.primary || '#6366f1', theme?.secondary || '#10b981', '#00ff88'],
          disableForReducedMotion: true,
          zIndex: 100
        });
      }
    };

    const scrollProgress = maxScroll > 0 ? scrollPosition / maxScroll : 0;
    const canScrollLeft = scrollPosition > 10;
    const canScrollRight = scrollPosition < maxScroll - 10;
    const cardWidth = Math.max(itemWidth, 240);
    const connectedCount = getConnectedIntegrationCount();

    return (
      <motion.section
        id={id}
        className="w-full py-16 md:py-24 overflow-hidden"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 md:mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="flex flex-col">
            <motion.div 
              className="h-1.5 w-12 rounded-full mb-4"
              style={{ backgroundColor: theme?.secondary || '#10b981' }}
              variants={{
                hidden: { width: 0, opacity: 0 },
                visible: { width: 48, opacity: 1, transition: { duration: 0.8, ease: "easeOut" } }
              }}
            />
            <motion.h2
              className="text-3xl md:text-5xl font-extrabold text-balance tracking-tight font-heading"
              style={{ color: '#111827' }}
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
            >
              {title}
            </motion.h2>
            <motion.p
              className="text-lg text-gray-600 mt-2"
              variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { delay: 0.2 } } }}
            >
              Connected: <span className="font-bold" style={{ color: theme?.primary || '#6366f1' }}>{connectedCount}</span> / {items.length}
            </motion.p>
          </div>

          {/* Desktop Navigation Arrows */}
          <motion.div 
            className="hidden md:flex gap-3"
            variants={{ hidden: { opacity: 0, x: 20 }, visible: { opacity: 1, x: 0 } }}
          >
            <button
              onClick={() => scroll('left')}
              disabled={!canScrollLeft}
              className={cn(
                "p-3 rounded-full border-2 transition-all duration-300",
                canScrollLeft 
                  ? "border-gray-200 hover:border-gray-900 text-gray-900 hover:bg-gray-50 active:scale-95" 
                  : "border-gray-100 text-gray-300 cursor-not-allowed"
              )}
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={() => scroll('right')}
              disabled={!canScrollRight}
              className={cn(
                "p-3 rounded-full border-2 transition-all duration-300",
                canScrollRight 
                  ? "border-gray-200 hover:border-gray-900 text-gray-900 hover:bg-gray-50 active:scale-95" 
                  : "border-gray-100 text-gray-300 cursor-not-allowed"
              )}
            >
              <ChevronRight size={24} />
            </button>
          </motion.div>
        </div>

        {/* Carousel container */}
        <div className="relative max-w-[100vw]">
          {/* Mobile floating left button */}
          <AnimatePresence>
            {canScrollLeft && (
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="md:hidden absolute left-2 top-1/2 -translate-y-1/2 z-20 p-2.5 rounded-full shadow-premium bg-white/90 backdrop-blur-sm text-gray-900 border border-gray-100"
                onClick={() => scroll('left')}
              >
                <ChevronLeft size={20} />
              </motion.button>
            )}
          </AnimatePresence>

          <div
            ref={scrollContainerRef}
            className="flex gap-6 overflow-x-auto scrollbar-hide snap-x snap-mandatory px-4 sm:px-6 lg:px-8 pb-12 pt-4"
            style={{ WebkitOverflowScrolling: 'touch', scrollBehavior: 'smooth' }}
          >
            {items.map((item, index) => {
              const isConnected = isIntegrationConnected(item.id);
              return (
                <motion.div
                  key={item.id}
                  className={cn(
                    "flex-shrink-0 snap-center rounded-2xl overflow-hidden card-premium cursor-pointer flex flex-col group transition-all duration-300",
                    isConnected ? "integration-connected" : ""
                  )}
                  style={{ 
                    width: `${cardWidth}px`,
                    backgroundColor: isConnected ? undefined : '#ffffff'
                  }}
                  variants={{
                    hidden: { opacity: 0, x: 50 },
                    visible: { opacity: 1, x: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } }
                  }}
                  whileHover={{ y: -8 }}
                >
                  {/* Item image */}
                  <div className="relative w-full aspect-square bg-gray-100 overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                      sizes={`${cardWidth}px`}
                    />
                    
                    {/* Connected Badge */}
                    {isConnected && (
                      <motion.div
                        className="absolute top-3 right-3 w-8 h-8 bg-green-400 rounded-full flex items-center justify-center shadow-lg"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', stiffness: 300 }}
                      >
                        <Check size={20} className="text-white" />
                      </motion.div>
                    )}

                    {/* Connected status indicator */}
                    {isConnected && (
                      <motion.div
                        className="absolute top-3 left-3 px-3 py-1 rounded-full text-[10px] font-bold text-white bg-gradient-to-r from-green-400 to-emerald-500 uppercase tracking-wider shadow-md"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                      >
                        Connected
                      </motion.div>
                    )}
                  </div>

                  {/* Item content */}
                  <div className="p-5 flex flex-col flex-grow bg-white/50 backdrop-blur-sm">
                    <h3 className="font-bold text-lg mb-2 line-clamp-2 leading-snug tracking-tight text-gray-900">
                      {item.name}
                    </h3>
                    
                    <p className="text-xs text-gray-600 mb-4 flex-grow">
                      {item.description}
                    </p>

                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-full"
                    >
                      <Button
                        onClick={(e) => { e.stopPropagation(); handleConnect(item.id, e); }}
                        className={cn(
                          "w-full h-10 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2",
                          isConnected 
                            ? "bg-gradient-to-r from-green-400 to-emerald-500 text-white shadow-lg"
                            : ""
                        )}
                        style={!isConnected ? { backgroundColor: theme?.primary || '#6366f1', color: '#ffffff' } : {}}
                      >
                        {isConnected ? (
                          <>
                            <Check size={16} />
                            Connected
                          </>
                        ) : (
                          <>
                            <Zap size={16} />
                            Connect
                          </>
                        )}
                      </Button>
                    </motion.div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Mobile floating right button */}
          <AnimatePresence>
            {canScrollRight && (
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="md:hidden absolute right-2 top-1/2 -translate-y-1/2 z-20 p-2.5 rounded-full shadow-premium bg-white/90 backdrop-blur-sm text-gray-900 border border-gray-100"
                onClick={() => scroll('right')}
              >
                <ChevronRight size={20} />
              </motion.button>
            )}
          </AnimatePresence>

          {/* Custom Progress Bar */}
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-48 h-1.5 bg-gray-200 rounded-full overflow-hidden">
            <motion.div 
              className="h-full rounded-full"
              style={{ backgroundColor: theme?.primary || '#6366f1' }}
              initial={{ width: '0%' }}
              animate={{ width: `${Math.max(10, scrollProgress * 100)}%` }}
              transition={{ ease: "easeOut" }}
            />
          </div>
        </div>
      </motion.section>
    );
  }
);

DynamicCollection.displayName = 'DynamicCollection';
