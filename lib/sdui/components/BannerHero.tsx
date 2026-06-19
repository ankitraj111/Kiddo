'use client';

import React from 'react';
import { motion } from 'motion/react';
import { BannerHeroProps } from '../types';
import { useDispatch, useActiveTheme } from '../store';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles, TrendingUp, Zap, Code } from 'lucide-react';
import { cn } from '@/lib/utils';

export const BannerHero: React.FC<BannerHeroProps> = React.memo(
  ({
    id,
    props: {
      title,
      subtitle,
      backgroundImage,
      primaryButtonText,
      primaryButtonAction,
      secondaryButtonText,
      secondaryButtonAction,
      overlayOpacity,
      textAlignment,
    },
    onAction,
  }) => {
    const dispatch = useDispatch();
    const theme = useActiveTheme();

    const handlePrimaryClick = () => {
      onAction?.(primaryButtonAction);
      dispatch(primaryButtonAction);
    };

    const handleSecondaryClick = () => {
      if (secondaryButtonAction) {
        onAction?.(secondaryButtonAction);
        dispatch(secondaryButtonAction);
      }
    };

    const alignmentClasses = {
      left: 'items-start text-left',
      center: 'items-center text-center mx-auto',
      right: 'items-end text-right ml-auto',
    };

    const containerVariants = {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: 0.15,
          delayChildren: 0.2,
        },
      },
    };

    const itemVariants = {
      hidden: { opacity: 0, y: 30 },
      visible: {
        opacity: 1,
        y: 0,
        transition: { type: 'spring', stiffness: 300, damping: 24 },
      },
    };

    const isDark = theme?.colorScheme === 'dark';

    return (
      <motion.div
        id={id}
        className="relative w-full min-h-[600px] md:min-h-[700px] overflow-hidden rounded-2xl md:rounded-[2rem] shadow-premium-lg group"
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Animated Cyber Grid Background */}
        <div className={cn(
          "absolute inset-0 cyber-grid",
          isDark ? "grid-bg-dark" : "grid-bg"
        )} style={{ backgroundColor: theme?.background || '#0f172a' }} />

        {/* Radial Glow Mesh */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            background: `radial-gradient(circle at 30% 50%, ${theme?.primary || '#6366f1'}40 0%, transparent 50%)`,
          }}
        />
        <div
          className="absolute inset-0 opacity-20"
          style={{
            background: `radial-gradient(circle at 70% 50%, ${theme?.secondary || '#8b5cf6'}40 0%, transparent 50%)`,
          }}
        />

        {/* Animated Light Orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full blur-3xl"
              style={{
                width: 300 + i * 100,
                height: 300 + i * 100,
                background: i === 0 
                  ? `${theme?.primary || '#6366f1'}30` 
                  : `${theme?.secondary || '#8b5cf6'}30`,
                left: `${20 + i * 30}%`,
                top: `${30 + i * 10}%`,
              }}
              animate={{
                x: [0, 50, 0],
                y: [0, -30, 0],
                scale: [1, 1.1, 1],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{
                duration: 8 + i * 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          ))}
        </div>

        {/* Content Container */}
        <div className="relative h-full flex flex-col justify-center px-6 md:px-16 py-20 w-full max-w-7xl mx-auto z-10">
          <motion.div
            className={cn(
              "flex flex-col max-w-3xl gap-8",
              alignmentClasses[textAlignment]
            )}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Badge */}
            <motion.div variants={itemVariants} className="flex">
              <div className={cn(
                "inline-flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-semibold uppercase tracking-wider animate-float",
                isDark 
                  ? "bg-white/5 border-white/20 text-white/90" 
                  : "bg-black/5 border-black/20 text-black/90"
              )}>
                <Sparkles size={16} style={{ color: theme?.accent || '#a78bfa' }} />
                <span>Next-Gen Platform</span>
              </div>
            </motion.div>

            {/* Title with Gradient */}
            <motion.h1
              className={cn(
                "text-5xl md:text-7xl font-extrabold text-balance tracking-tight font-heading leading-[1.1]",
                isDark ? "text-white" : "text-gray-900"
              )}
              variants={itemVariants}
            >
              {title}
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              className={cn(
                "text-xl md:text-2xl max-w-2xl text-balance leading-relaxed font-medium",
                isDark ? "text-gray-300" : "text-gray-600"
              )}
              variants={itemVariants}
            >
              {subtitle}
            </motion.p>

            {/* Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap gap-4 mt-4"
            >
              <Button
                onClick={handlePrimaryClick}
                className="group relative px-8 py-7 text-lg font-bold rounded-2xl overflow-hidden transition-all duration-300 hover:scale-105 active:scale-95 shadow-premium glow-btn border-0"
                style={{ backgroundColor: theme?.primary || '#6366f1', color: '#ffffff' }}
              >
                <span className="relative z-10 flex items-center gap-2">
                  {primaryButtonText}
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </span>
              </Button>

              {secondaryButtonText && (
                <Button
                  onClick={handleSecondaryClick}
                  variant="outline"
                  className={cn(
                    "px-8 py-7 text-lg font-bold rounded-2xl border-2 backdrop-blur-sm transition-all duration-300 hover:scale-105 active:scale-95",
                    isDark
                      ? "border-white/40 text-white bg-white/10 hover:bg-white/20"
                      : "border-gray-900/40 text-gray-900 bg-white/50 hover:bg-white/80"
                  )}
                >
                  {secondaryButtonText}
                </Button>
              )}
            </motion.div>
          </motion.div>

          {/* Floating Dashboard Mockup Panel */}
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.8, type: 'spring' }}
            className={cn(
              "absolute right-8 md:right-16 top-1/2 -translate-y-1/2 w-[320px] md:w-[420px] glass-panel p-6 rounded-2xl shadow-2xl hidden lg:block",
              textAlignment === 'center' && "hidden"
            )}
          >
            {/* Mock Dashboard Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-400 live-indicator"></div>
                <span className="text-white/80 text-sm font-mono font-semibold">Live Dashboard</span>
              </div>
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-400/50"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-400/50"></div>
                <div className="w-3 h-3 rounded-full bg-green-400/50"></div>
              </div>
            </div>

            {/* Animated Analytics Curve */}
            <div className="relative h-32 mb-4 bg-black/20 rounded-xl p-3 overflow-hidden">
              <svg className="w-full h-full" viewBox="0 0 300 100" preserveAspectRatio="none">
                <motion.path
                  d="M 0,80 Q 50,20 100,40 T 200,30 T 300,50"
                  fill="none"
                  stroke={theme?.primary || '#6366f1'}
                  strokeWidth="3"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 2, ease: 'easeInOut', repeat: Infinity, repeatDelay: 1 }}
                />
                <motion.path
                  d="M 0,60 Q 50,40 100,50 T 200,45 T 300,60"
                  fill="none"
                  stroke={theme?.secondary || '#8b5cf6'}
                  strokeWidth="2"
                  opacity="0.6"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 2, ease: 'easeInOut', repeat: Infinity, repeatDelay: 1, delay: 0.3 }}
                />
              </svg>
              
              {/* Gradient overlay */}
              <div 
                className="absolute inset-x-0 bottom-0 h-1/2 opacity-30"
                style={{
                  background: `linear-gradient(to top, ${theme?.primary || '#6366f1'}, transparent)`
                }}
              />
            </div>

            {/* Glowing Data Cards */}
            <div className="grid grid-cols-2 gap-3">
              <motion.div
                className="bg-gradient-to-br from-indigo-500/20 to-purple-500/20 p-4 rounded-xl border border-indigo-400/30"
                whileHover={{ scale: 1.05 }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="w-4 h-4 text-indigo-400" />
                  <span className="text-xs text-white/60 font-mono">Performance</span>
                </div>
                <div className="text-2xl font-bold text-white font-mono">+127%</div>
              </motion.div>

              <motion.div
                className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 p-4 rounded-xl border border-green-400/30"
                whileHover={{ scale: 1.05 }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <Zap className="w-4 h-4 text-green-400" />
                  <span className="text-xs text-white/60 font-mono">Uptime</span>
                </div>
                <div className="text-2xl font-bold text-white font-mono">99.9%</div>
              </motion.div>
            </div>

            {/* Mock AI Code Sidebar */}
            <div className="mt-4 bg-black/40 rounded-xl p-3 border border-white/10">
              <div className="flex items-center gap-2 mb-2">
                <Code className="w-3 h-3 text-cyan-400" />
                <span className="text-xs text-white/60 font-mono">AI Copilot</span>
              </div>
              <div className="space-y-1">
                <div className="h-2 bg-cyan-500/30 rounded w-3/4"></div>
                <div className="h-2 bg-purple-500/30 rounded w-1/2"></div>
                <div className="h-2 bg-green-500/30 rounded w-2/3"></div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    );
  }
);

BannerHero.displayName = 'BannerHero';
