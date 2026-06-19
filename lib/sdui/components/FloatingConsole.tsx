'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useConsole, useIntegrations, useServerNodes } from '../store';
import { useActiveTheme } from '../store';
import { Button } from '@/components/ui/button';
import { Terminal, X, Send, Info } from 'lucide-react';
import { cn } from '@/lib/utils';

const consoleResponses: Record<string, string> = {
  '/features': '✓ AI Copilot\n✓ Instant Deploy\n✓ Semantic Search\n✓ Team Insights\n✓ Global CDN\n✓ Server Management',
  '/deploy': '🚀 Deployment initiated...\n✓ Build successful\n✓ Tests passed\n✓ Pushing to production\n✓ Live in 2.3s\nStatus: DEPLOYED',
  '/help': 'Available Commands:\n/features - View all features\n/deploy - Start deployment\n/status - System status\n/docs - Open documentation\n/support - Get help',
  '/status': '✓ API Status: Operational\n✓ Uptime: 99.99%\n✓ Response Time: 45ms\n✓ Active Users: 1,234\n✓ Requests/sec: 8,542',
  '/docs': '📚 Documentation\nVisit: https://docs.example.com\n→ API Reference\n→ Guides & Tutorials\n→ Best Practices\n→ FAQ',
};

interface ConsoleMessage {
  type: 'user' | 'system';
  content: string;
  timestamp: Date;
}

export const FloatingConsole: React.FC = () => {
  const [isMounted, setIsMounted] = React.useState(false);
  const { isConsoleOpen, toggleConsole, closeConsole } = useConsole();
  const { getConnectedIntegrationCount } = useIntegrations();
  const { getActiveServerNodeCount } = useServerNodes();
  const theme = useActiveTheme();
  const [messages, setMessages] = useState<ConsoleMessage[]>([
    {
      type: 'system',
      content: '> DevFlow AI Console initialized\n> Type /help for available commands',
      timestamp: new Date(),
    }
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Ensure component is mounted before rendering interactive elements
  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Focus input when console opens
  useEffect(() => {
    if (isConsoleOpen && isMounted) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isConsoleOpen]);

  const handleSubmit = (command: string = input.trim()) => {
    if (!command) return;

    // Add user message
    setMessages(prev => [...prev, {
      type: 'user',
      content: `$ ${command}`,
      timestamp: new Date(),
    }]);

    setInput('');

    // Simulate delay for response
    setTimeout(() => {
      const response = consoleResponses[command] || 
        `Unknown command: ${command}\nType /help for available commands`;
      
      setMessages(prev => [...prev, {
        type: 'system',
        content: response,
        timestamp: new Date(),
      }]);
    }, 300);
  };

  const commandChips = ['/features', '/deploy', '/status', '/help'];
  const connectedCount = getConnectedIntegrationCount();
  const activeServers = getActiveServerNodeCount();

  if (!isMounted) return null;

  return (
    <>
      {/* Floating Button */}
      <motion.button
        onClick={toggleConsole}
        className="fixed bottom-8 right-8 z-50 p-4 rounded-full shadow-lg border-2 transition-all duration-300 hover:scale-110 active:scale-95"
        style={{
          backgroundColor: theme?.primary || '#6366f1',
          borderColor: theme?.secondary || '#10b981',
          color: '#ffffff'
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <div className="relative flex items-center justify-center">
          <Terminal size={24} />
          <motion.div
            className="absolute w-3 h-3 bg-green-400 rounded-full -top-1 -right-1"
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </motion.button>

      {/* Console Drawer */}
      <AnimatePresence>
        {isConsoleOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black/40 backdrop-blur-md z-40 md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeConsole}
            />

            {/* Console Panel */}
            <motion.div
              className="fixed bottom-0 md:bottom-8 right-0 md:right-8 z-50 w-full md:w-[500px] h-[70vh] md:h-[600px] rounded-t-3xl md:rounded-3xl overflow-hidden shadow-premium-lg flex flex-col"
              style={{ backgroundColor: '#0b0f19', borderTop: `2px solid ${theme?.secondary || '#10b981'}` }}
              initial={{ y: '100%', opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: '100%', opacity: 0 }}
              transition={{ type: 'spring', damping: 28, stiffness: 300 }}
            >
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-white/10 bg-black/40">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse"></div>
                  <span className="font-mono font-bold text-green-400">DevFlow Console</span>
                </div>
                <button
                  onClick={closeConsole}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                >
                  <X size={20} className="text-gray-400" />
                </button>
              </div>

              {/* Status Info */}
              <div className="px-4 pt-4 pb-2 flex gap-4 text-xs font-mono">
                <div className="flex items-center gap-1 text-blue-400">
                  <Info size={14} />
                  Integrations: {connectedCount}
                </div>
                <div className="flex items-center gap-1 text-cyan-400">
                  <Info size={14} />
                  Servers: {activeServers}
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 font-mono text-sm scrollbar-hide">
                {messages.map((msg, idx) => (
                  <motion.div
                    key={idx}
                    className={cn(
                      'whitespace-pre-wrap break-words',
                      msg.type === 'user' ? 'text-white' : 'text-green-400'
                    )}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    {msg.content}
                  </motion.div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              {/* Command Chips */}
              {!input && messages.length > 1 && (
                <motion.div
                  className="px-4 py-3 border-t border-white/10 flex flex-wrap gap-2"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  {commandChips.map((chip) => (
                    <button
                      key={chip}
                      onClick={() => {
                        setInput(chip);
                        setTimeout(() => inputRef.current?.focus(), 0);
                      }}
                      className="command-chip text-xs hover:bg-green-500/20 transition-all duration-200"
                    >
                      {chip}
                    </button>
                  ))}
                </motion.div>
              )}

              {/* Input */}
              <div className="px-4 py-4 border-t border-white/10 flex items-center gap-2 bg-black/20">
                <span className="text-green-400 font-mono">$</span>
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      handleSubmit();
                    }
                  }}
                  placeholder="Type command..."
                  className="flex-1 bg-transparent text-white font-mono text-sm outline-none placeholder-gray-600"
                />
                <motion.button
                  onClick={() => handleSubmit()}
                  disabled={!input.trim()}
                  className="p-2 hover:bg-green-500/20 rounded-lg transition-colors disabled:opacity-50"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Send size={16} className="text-green-400" />
                </motion.button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

FloatingConsole.displayName = 'FloatingConsole';
