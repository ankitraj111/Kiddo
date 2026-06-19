'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Image from 'next/image';
import { ProductGrid2x2Props, Product } from '../types';
import { useDispatch, useActiveTheme, useServerNodes } from '../store';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Check, Tag, Code, TrendingUp, Globe, Server } from 'lucide-react';
import { cn } from '@/lib/utils';
import confetti from 'canvas-confetti';

// AI Copilot Card with typing animation
const AICopilotCard: React.FC<{ product: Product; theme: any }> = ({ product, theme }) => {
  const [displayedCode, setDisplayedCode] = useState('');
  const codeSnippet = 'const deploy = async () => {\n  await build();\n  await test();\n  return launch();\n}';

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index < codeSnippet.length) {
        setDisplayedCode(codeSnippet.substring(0, index + 1));
        index++;
      } else {
        setDisplayedCode('');
        index = 0;
      }
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      className="rounded-2xl overflow-hidden card-premium flex flex-col h-full bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border border-indigo-300/20"
      variants={{
        hidden: { opacity: 0, y: 40, scale: 0.95 },
        visible: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring', stiffness: 300, damping: 24 } }
      }}
      whileHover={{ y: -8, scale: 1.02 }}
    >
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex items-center gap-3 mb-4">
          <Code className="w-5 h-5" style={{ color: theme?.primary || '#6366f1' }} />
          <h3 className="text-2xl font-bold text-gray-900">{product.name}</h3>
        </div>
        
        <p className="text-sm text-gray-600 mb-6 flex-grow">{product.description}</p>
        
        {/* Terminal Window */}
        <div className="bg-black/80 rounded-xl p-4 mb-4 font-mono text-sm text-green-400 min-h-32 flex flex-col justify-center terminal-code">
          <div className="text-xs text-gray-500 mb-2">$ ai-copilot --generate</div>
          <div className="leading-relaxed whitespace-pre-wrap">
            {displayedCode}
            <span className="animate-pulse">|</span>
          </div>
        </div>

        <Button
          className="w-full h-10 rounded-lg font-semibold transition-all duration-300"
          style={{ backgroundColor: theme?.primary || '#6366f1', color: '#ffffff' }}
        >
          Try Copilot
        </Button>
      </div>
    </motion.div>
  );
};

// Real-time Metrics Card with animated chart
const MetricsCard: React.FC<{ product: Product; theme: any }> = ({ product, theme }) => {
  const [dataPoints, setDataPoints] = useState([45, 52, 48, 61, 55, 67, 72]);

  useEffect(() => {
    const interval = setInterval(() => {
      setDataPoints(prev => [
        ...prev.slice(1),
        Math.floor(Math.random() * 100 + 20)
      ]);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const maxValue = Math.max(...dataPoints, 100);
  const barHeight = (value: number) => (value / maxValue) * 100;

  return (
    <motion.div
      className="rounded-2xl overflow-hidden card-premium flex flex-col h-full bg-gradient-to-br from-emerald-500/10 to-teal-500/10 border border-emerald-300/20"
      variants={{
        hidden: { opacity: 0, y: 40, scale: 0.95 },
        visible: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring', stiffness: 300, damping: 24, delay: 0.1 } }
      }}
      whileHover={{ y: -8, scale: 1.02 }}
    >
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex items-center gap-3 mb-4">
          <TrendingUp className="w-5 h-5" style={{ color: theme?.secondary || '#10b981' }} />
          <h3 className="text-2xl font-bold text-gray-900">{product.name}</h3>
        </div>

        <p className="text-sm text-gray-600 mb-6">{product.description}</p>

        {/* Animated Chart */}
        <div className="flex items-end justify-center gap-1.5 h-24 bg-black/30 rounded-lg p-4 mb-4">
          {dataPoints.map((value, idx) => (
            <motion.div
              key={idx}
              className="flex-1 rounded-t-sm"
              style={{ 
                backgroundColor: theme?.secondary || '#10b981',
                height: `${barHeight(value)}%`,
                opacity: 0.6 + (idx / dataPoints.length) * 0.4
              }}
              animate={{ height: `${barHeight(value)}%` }}
              transition={{ duration: 0.3 }}
            />
          ))}
        </div>

        <div className="grid grid-cols-3 gap-2 text-center">
          <div className="bg-black/20 rounded p-2">
            <div className="text-xs text-gray-500">CPU</div>
            <div className="text-sm font-bold text-green-400">78%</div>
          </div>
          <div className="bg-black/20 rounded p-2">
            <div className="text-xs text-gray-500">Memory</div>
            <div className="text-sm font-bold text-green-400">62%</div>
          </div>
          <div className="bg-black/20 rounded p-2">
            <div className="text-xs text-gray-500">Disk</div>
            <div className="text-sm font-bold text-green-400">45%</div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// Global Edge with pinging locations
const GlobalEdgeCard: React.FC<{ product: Product; theme: any }> = ({ product, theme }) => {
  return (
    <motion.div
      className="rounded-2xl overflow-hidden card-premium flex flex-col h-full bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-300/20"
      variants={{
        hidden: { opacity: 0, y: 40, scale: 0.95 },
        visible: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring', stiffness: 300, damping: 24, delay: 0.2 } }
      }}
      whileHover={{ y: -8, scale: 1.02 }}
    >
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex items-center gap-3 mb-4">
          <Globe className="w-5 h-5" style={{ color: theme?.accent || '#06b6d4' }} />
          <h3 className="text-2xl font-bold text-gray-900">{product.name}</h3>
        </div>

        <p className="text-sm text-gray-600 mb-6">{product.description}</p>

        {/* World Map with Pings */}
        <div className="bg-gradient-to-b from-blue-900/20 to-transparent rounded-lg p-4 h-28 relative mb-4 overflow-hidden">
          <svg className="w-full h-full" viewBox="0 0 200 120">
            {/* Simple world outline */}
            <circle cx="50" cy="60" r="3" fill="none" stroke="rgba(100,200,255,0.3)" strokeWidth="1" />
            <circle cx="120" cy="45" r="3" fill="none" stroke="rgba(100,200,255,0.3)" strokeWidth="1" />
            <circle cx="150" cy="70" r="3" fill="none" stroke="rgba(100,200,255,0.3)" strokeWidth="1" />
          </svg>

          {/* Animated ping dots */}
          {[50, 120, 150].map((x, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-cyan-400 rounded-full"
              style={{ left: `${x}px`, top: `60px` }}
            >
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-cyan-400"
                animate={{ scale: [1, 2.5], opacity: [1, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-2 text-xs text-center">
          {['NYC', 'EU', 'APAC'].map((region) => (
            <div key={region} className="bg-black/20 rounded p-1.5">
              <div className="text-xs text-gray-400">{region}</div>
              <div className="font-bold text-cyan-400">✓</div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

// Server Nodes Interactive Card
const ServerNodesCard: React.FC<{ product: Product; theme: any }> = ({ product, theme }) => {
  const { toggleServerNode, isServerNodeActive, getActiveServerNodeCount } = useServerNodes();
  const nodeCount = 6;
  const activeCount = getActiveServerNodeCount();

  const handleNodeClick = (nodeId: string) => {
    toggleServerNode(nodeId);
  };

  return (
    <motion.div
      className="rounded-2xl overflow-hidden card-premium flex flex-col h-full bg-gradient-to-br from-orange-500/10 to-red-500/10 border border-orange-300/20"
      variants={{
        hidden: { opacity: 0, y: 40, scale: 0.95 },
        visible: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring', stiffness: 300, damping: 24, delay: 0.3 } }
      }}
      whileHover={{ y: -8, scale: 1.02 }}
    >
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex items-center gap-3 mb-4">
          <Server className="w-5 h-5" style={{ color: theme?.primary || '#f97316' }} />
          <h3 className="text-2xl font-bold text-gray-900">{product.name}</h3>
        </div>

        <p className="text-sm text-gray-600 mb-6">{product.description}</p>

        {/* Interactive Server Rack */}
        <div className="bg-black/30 rounded-lg p-4 mb-4 space-y-2">
          <div className="grid grid-cols-3 gap-2">
            {Array.from({ length: nodeCount }).map((_, i) => {
              const nodeId = `node-${i}`;
              const isActive = isServerNodeActive(nodeId);
              return (
                <motion.button
                  key={nodeId}
                  onClick={() => handleNodeClick(nodeId)}
                  className={cn(
                    "h-12 rounded-lg font-bold text-xs transition-all duration-300 cursor-pointer",
                    isActive
                      ? "bg-gradient-to-br from-green-400 to-emerald-600 text-white shadow-lg"
                      : "bg-gray-600 text-gray-300 opacity-50 hover:opacity-70"
                  )}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {isActive ? '✓' : '—'}
                </motion.button>
              );
            })}
          </div>
          <div className="text-xs text-gray-400 text-center">
            {activeCount}/{nodeCount} Active • CPU: {Math.floor((activeCount / nodeCount) * 100)}%
          </div>
        </div>

        <Button
          className="w-full h-10 rounded-lg font-semibold transition-all duration-300"
          style={{ backgroundColor: theme?.primary || '#f97316', color: '#ffffff' }}
        >
          Scale Servers
        </Button>
      </div>
    </motion.div>
  );
};

// Default Product Card for fallback
const DefaultProductCard: React.FC<{ product: Product; theme: any }> = ({ product, theme }) => {
  const [isAdded, setIsAdded] = useState(false);
  
  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsAdded(true);
    
    const rect = (e.target as HTMLElement).getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;
    
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { x, y },
      colors: [theme?.primary || '#1e40af', theme?.secondary || '#f59e0b', theme?.accent || '#ff6b6b'],
      disableForReducedMotion: true,
      zIndex: 100
    });

    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <motion.div
      className="group relative rounded-2xl overflow-hidden card-premium cursor-pointer flex flex-col h-full"
      variants={{
        hidden: { opacity: 0, y: 40, scale: 0.95 },
        visible: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring', stiffness: 300, damping: 24 } }
      }}
      whileHover={{ y: -8, scale: 1.02 }}
    >
      <div className="relative w-full aspect-[4/3] bg-gray-100 overflow-hidden">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>

      <div className="p-5 md:p-6 flex flex-col flex-grow z-10 bg-white/50 backdrop-blur-sm">
        <h3 className="text-xl font-bold mb-2 line-clamp-2 font-heading tracking-tight text-gray-900">
          {product.name}
        </h3>

        <p className="text-sm mb-6 line-clamp-2 text-gray-500 font-medium flex-grow">
          {product.description}
        </p>

        <Button
          onClick={handleAdd}
          className={cn(
            "w-full h-10 rounded-lg font-semibold transition-all duration-300",
            isAdded ? "bg-emerald-500 hover:bg-emerald-600 text-white" : ""
          )}
          style={!isAdded ? { backgroundColor: theme?.secondary || '#1f2937', color: '#ffffff' } : {}}
        >
          {isAdded ? 'Added!' : 'Add'}
        </Button>
      </div>
    </motion.div>
  );
};

export const ProductGrid2x2: React.FC<ProductGrid2x2Props> = React.memo(
  ({ id, props: { title, products }, onAction }) => {
    const dispatch = useDispatch();
    const theme = useActiveTheme();

    const handleAddToCart = (product: Product) => {
      const action = {
        type: 'CART_ADD' as const,
        payload: { productId: product.id, quantity: 1 },
      };
      onAction?.(action);
      dispatch(action);
    };

    // Determine which card type to render based on product ID
    const getCardComponent = (product: Product, index: number) => {
      if (product.id === 'ai-copilot') {
        return <AICopilotCard key={product.id} product={product} theme={theme} />;
      } else if (product.id === 'live-metrics') {
        return <MetricsCard key={product.id} product={product} theme={theme} />;
      } else if (product.id === 'edge-cdn') {
        return <GlobalEdgeCard key={product.id} product={product} theme={theme} />;
      } else if (product.id === 'server-clusters') {
        return <ServerNodesCard key={product.id} product={product} theme={theme} />;
      }
      return <DefaultProductCard key={product.id} product={product} theme={theme} />;
    };

    return (
      <motion.section
        id={id}
        className="w-full py-16 md:py-24"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: { staggerChildren: 0.15 }
          }
        }}
      >
        {/* Premium Section header */}
        <div className="flex flex-col items-center justify-center mb-12 text-center">
          <motion.div 
            className="h-1.5 w-12 rounded-full mb-4"
            style={{ backgroundColor: theme?.secondary || '#f59e0b' }}
            variants={{
              hidden: { width: 0, opacity: 0 },
              visible: { width: 48, opacity: 1, transition: { duration: 0.8, ease: "easeOut" } }
            }}
          />
          <motion.h2
            className="text-3xl md:text-5xl font-extrabold text-balance tracking-tight font-heading"
            style={{ color: '#111827' }}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
            }}
          >
            {title}
          </motion.h2>
        </div>

        {/* Product grid - responsive bento */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 max-w-7xl mx-auto px-4">
          {products.map((product, index) => getCardComponent(product, index))}
        </div>
      </motion.section>
    );
  }
);

ProductGrid2x2.displayName = 'ProductGrid2x2';
