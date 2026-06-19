'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Image from 'next/image';
import { FullScreenOverlayProps } from '../types';
import { useDispatch, useActiveTheme, useOverlayState } from '../store';
import { Button } from '@/components/ui/button';
import { X, Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import confetti from 'canvas-confetti';

export const FullScreenOverlay: React.FC<FullScreenOverlayProps> = React.memo(
  ({
    id,
    props: {
      title,
      content,
      imageUrl,
      actionButtons,
      closeAction,
      animationType,
    },
    onAction,
  }) => {
    const dispatch = useDispatch();
    const theme = useActiveTheme();
    const isOpen = useOverlayState(id);
    const [isYearly, setIsYearly] = useState(false);
    const [volume, setVolume] = useState(500000); // Default 500K requests

    // Prevent body scroll when overlay is open
    useEffect(() => {
      if (isOpen) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
      return () => {
        document.body.style.overflow = '';
      };
    }, [isOpen]);

    const handleClose = () => {
      if (closeAction) {
        onAction?.(closeAction);
        dispatch(closeAction);
      } else {
        dispatch({ type: 'OVERLAY_CLOSE', payload: { overlayId: id } });
      }
    };

    const handleAction = (action: any) => {
      // Fire celebration confetti
      confetti({
        particleCount: 100,
        spread: 100,
        origin: { x: 0.5, y: 0.5 },
        colors: [theme?.primary || '#6366f1', theme?.secondary || '#10b981', '#ff6b6b'],
        disableForReducedMotion: true,
        zIndex: 200
      });

      onAction?.(action);
      dispatch(action);
      setTimeout(() => handleClose(), 500);
    };

    const animationVariants = {
      slideUp: {
        initial: { opacity: 0, y: '100%', scale: 0.9 },
        animate: { opacity: 1, y: 0, scale: 1 },
        exit: { opacity: 0, y: '100%', scale: 0.9 },
      },
      fadeIn: {
        initial: { opacity: 0, scale: 0.95 },
        animate: { opacity: 1, scale: 1 },
        exit: { opacity: 0, scale: 0.95 },
      },
      scaleDown: {
        initial: { opacity: 0, scale: 1.1 },
        animate: { opacity: 1, scale: 1 },
        exit: { opacity: 0, scale: 1.1 },
      },
    };

    const variant = animationVariants[animationType] || animationVariants.slideUp;

    // Pricing calculation
    const basePrices: Record<string, { monthly: number; yearly: number }> = {
      'devflow-ai-platform': { monthly: 99, yearly: 990 },
      'opsgrid-cloud-infra': { monthly: 199, yearly: 1990 },
      'corecrm-enterprise': { monthly: 149, yearly: 1490 },
    };

    const campaignId = id.split('-')[0] + '-' + id.split('-')[1] + (id.includes('pricing') ? '-' + id.split('-')[2] : '');
    const basePricing = basePrices['devflow-ai-platform']; // Default
    
    const monthlyPrice = basePricing.monthly + (volume > 1000000 ? 50 : volume > 500000 ? 25 : 0);
    const yearlyPrice = basePricing.yearly + (volume > 1000000 ? 500 : volume > 500000 ? 250 : 0);
    const displayPrice = isYearly ? yearlyPrice : monthlyPrice;
    const yearlyDiscount = isYearly ? Math.round(((monthlyPrice * 12 - yearlyPrice) / (monthlyPrice * 12)) * 100) : 0;
    const volumeLabel = volume >= 1000000 ? `${(volume / 1000000).toFixed(1)}M` : `${(volume / 1000).toFixed(0)}K`;

    const isPricingOverlay = id.includes('pricing');

    return (
      <AnimatePresence mode="wait">
        {isOpen && (
          <div className="fixed inset-0 z-[100] flex items-end md:items-center justify-center pointer-events-none">
            {/* Glassmorphic Backdrop */}
            <motion.div
              className="absolute inset-0 bg-black/40 backdrop-blur-md pointer-events-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleClose}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
            />

            {/* Modal container */}
            <motion.div
              className="relative w-full md:w-auto md:min-w-[700px] md:max-w-3xl max-h-[95vh] md:max-h-[90vh] rounded-t-3xl md:rounded-3xl shadow-premium-lg overflow-hidden flex flex-col pointer-events-auto bg-white"
              style={{ backgroundColor: theme?.background || '#ffffff' }}
              {...variant}
              transition={{
                type: 'spring',
                damping: 28,
                stiffness: 300,
                mass: 1,
              }}
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-title"
            >
              {/* Image Header - only if not pricing overlay or if imageUrl provided */}
              {imageUrl && !isPricingOverlay && (
                <div className="relative w-full h-56 md:h-72 bg-gray-100 flex-shrink-0">
                  <Image
                    src={imageUrl}
                    alt={title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 700px"
                    priority
                  />
                  <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-white to-transparent" 
                       style={{ backgroundImage: `linear-gradient(to top, ${theme?.background || '#ffffff'} 0%, transparent 100%)` }} />
                </div>
              )}

              {/* Close button */}
              <button
                onClick={handleClose}
                className="absolute top-6 right-6 p-2 rounded-full bg-black/5 hover:bg-black/10 text-gray-600 transition-all duration-300 hover:rotate-90 active:scale-90 z-10"
                aria-label="Close modal"
              >
                <X size={20} strokeWidth={2.5} />
              </button>

              {isPricingOverlay ? (
                // Premium Pricing Content
                <div className="flex-1 overflow-y-auto px-6 md:px-8 pt-8 md:pt-12 pb-6">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="space-y-8"
                  >
                    {/* Title */}
                    <div>
                      <h2 className="text-4xl md:text-5xl font-extrabold font-heading tracking-tight mb-2" style={{ color: '#111827' }}>
                        {title}
                      </h2>
                      <p className="text-lg text-gray-600">
                        {content.split('\n')[0]}
                      </p>
                    </div>

                    {/* Billing Toggle */}
                    <motion.div
                      className="flex items-center justify-center gap-4 p-1 bg-gray-100 rounded-full w-fit mx-auto"
                      whileHover={{ scale: 1.02 }}
                    >
                      <button
                        onClick={() => setIsYearly(false)}
                        className={cn(
                          "px-6 py-3 rounded-full font-bold transition-all duration-300",
                          !isYearly 
                            ? "bg-white text-gray-900 shadow-md" 
                            : "text-gray-600 hover:text-gray-900"
                        )}
                      >
                        Monthly
                      </button>
                      <button
                        onClick={() => setIsYearly(true)}
                        className={cn(
                          "px-6 py-3 rounded-full font-bold transition-all duration-300 relative",
                          isYearly 
                            ? "bg-white text-gray-900 shadow-md" 
                            : "text-gray-600 hover:text-gray-900"
                        )}
                      >
                        Yearly
                        {isYearly && (
                          <motion.span
                            className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gradient-to-r from-green-400 to-emerald-500 text-white text-xs font-bold px-2 py-1 rounded-full whitespace-nowrap"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: 'spring', stiffness: 300 }}
                          >
                            Save {yearlyDiscount}%
                          </motion.span>
                        )}
                      </button>
                    </motion.div>

                    {/* Volume Slider */}
                    <motion.div
                      className="space-y-4"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      <div className="flex items-center justify-between">
                        <label className="text-lg font-bold text-gray-900">Request Volume</label>
                        <div className="text-2xl font-bold" style={{ color: theme?.primary || '#6366f1' }}>
                          {volumeLabel} requests
                        </div>
                      </div>
                      
                      <input
                        type="range"
                        min="10000"
                        max="1000000"
                        step="10000"
                        value={volume}
                        onChange={(e) => setVolume(Number(e.target.value))}
                        className="pricing-slider w-full"
                        style={{ '--sdui-primary': theme?.primary || '#6366f1' } as React.CSSProperties}
                      />

                      <div className="flex justify-between text-xs text-gray-500 font-medium">
                        <span>10K</span>
                        <span>100K</span>
                        <span>500K</span>
                        <span>1M+</span>
                      </div>
                    </motion.div>

                    {/* Pricing Display */}
                    <motion.div
                      className="relative p-8 rounded-2xl border-2 bg-gradient-to-br from-blue-50 to-indigo-50"
                      style={{ borderColor: theme?.primary || '#6366f1' }}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.4 }}
                    >
                      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                        <div>
                          <p className="text-gray-600 text-sm mb-1">Total Price</p>
                          <div className="text-5xl font-extrabold" style={{ color: theme?.primary || '#6366f1' }}>
                            ${displayPrice.toFixed(2)}
                          </div>
                          <p className="text-gray-500 text-sm mt-2">
                            {isYearly ? 'per year' : 'per month'} • {volumeLabel} requests included
                          </p>
                        </div>

                        {/* Features Included */}
                        <div className="space-y-2 text-sm">
                          {[
                            '✓ 24/7 Support',
                            '✓ Auto-scaling',
                            '✓ Analytics Dashboard',
                            '✓ API Access'
                          ].map((feature, i) => (
                            <motion.div
                              key={i}
                              className="flex items-center gap-2 text-gray-700 font-medium"
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.5 + i * 0.05 }}
                            >
                              <Check size={18} style={{ color: theme?.secondary || '#10b981' }} />
                              {feature}
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </motion.div>

                    {/* Benefits List */}
                    <motion.div
                      className="grid grid-cols-2 gap-4"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.6 }}
                    >
                      {['14-day free trial', 'No credit card required', 'Cancel anytime', 'Premium support'].map((benefit, i) => (
                        <div key={i} className="p-4 rounded-xl bg-gray-50 border border-gray-200 text-center">
                          <p className="text-sm font-semibold text-gray-900">{benefit}</p>
                        </div>
                      ))}
                    </motion.div>
                  </motion.div>
                </div>
              ) : (
                // Default Content
                <>
                  <div className={cn(
                    "flex items-start justify-between px-6 pt-6 pb-2 z-10",
                    !imageUrl && "pt-8"
                  )}>
                    <h2
                      id="modal-title"
                      className="text-3xl md:text-4xl font-extrabold font-heading tracking-tight leading-tight pr-8 text-balance"
                      style={{ color: '#111827' }}
                    >
                      {title}
                    </h2>
                  </div>

                  <div className="flex-1 overflow-y-auto px-6 pb-6">
                    <p
                      className="text-lg text-gray-600 leading-relaxed font-medium whitespace-pre-wrap"
                    >
                      {content}
                    </p>
                  </div>
                </>
              )}

              {/* Premium Actions */}
              <div 
                className="p-6 bg-gray-50/80 backdrop-blur-sm border-t border-gray-100 flex flex-col md:flex-row gap-3 md:gap-4 mt-auto"
              >
                {actionButtons.map((button, index) => {
                  const isPrimary = button.variant === 'primary';
                  return (
                    <Button
                      key={index}
                      onClick={() => handleAction(button.action)}
                      className={cn(
                        "flex-1 h-14 text-lg font-bold rounded-2xl transition-all duration-300 active:scale-95",
                        isPrimary 
                          ? "shadow-md hover:shadow-lg hover:-translate-y-0.5" 
                          : "bg-white hover:bg-gray-50 text-gray-900 border-2 border-gray-200"
                      )}
                      style={isPrimary ? {
                        backgroundColor: theme?.primary || '#6366f1',
                        color: '#ffffff',
                      } : {}}
                      variant={isPrimary ? 'default' : 'outline'}
                    >
                      {button.text}
                    </Button>
                  );
                })}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    );
  }
);

FullScreenOverlay.displayName = 'FullScreenOverlay';
