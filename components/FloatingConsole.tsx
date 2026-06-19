'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Terminal, X, Send, Cpu, Activity, Zap, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useConsole, useIntegrations, useActiveTheme, useActiveCampaign } from '@/lib/sdui/store';

interface ConsoleMessage {
  id: string;
  type: 'user' | 'system' | 'success' | 'info';
  content: string;
  timestamp: Date;
}

const PRESET_COMMANDS = [
  { label: '/features', description: 'List all features' },
  { label: '/deploy', description: 'Deploy to production' },
  { label: '/status', description: 'System health check' },
  { label: '/help', description: 'Show available commands' },
];

export const FloatingConsole: React.FC = () => {
  const { isConsoleOpen, closeConsole, toggleConsole } = useConsole();
  const { connectedIntegrations, getConnectedIntegrationCount } = useIntegrations();
  const theme = useActiveTheme();
  const campaign = useActiveCampaign();
  
  const [messages, setMessages] = useState<ConsoleMessage[]>([
    {
      id: '1',
      type: 'system',
      content: `Welcome to ${campaign?.name || 'DevFlow'} Console v2.1.0`,
      timestamp: new Date(),
    },
    {
      id: '2',
      type: 'info',
      content: 'Type a command or click a preset below to get started.',
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isConsoleOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isConsoleOpen]);

  const handleCommand = (command: string) => {
    const trimmedCommand = command.trim();
    if (!trimmedCommand) return;

    // Add user message
    const userMessage: ConsoleMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: trimmedCommand,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');

    // Simulate typing delay
    setIsTyping(true);
    setTimeout(() => {
      const response = generateResponse(trimmedCommand);
      setMessages((prev) => [...prev, response]);
      setIsTyping(false);
    }, 800);
  };

  const generateResponse = (command: string): ConsoleMessage => {
    const cmd = command.toLowerCase();
    
    if (cmd === '/features' || cmd.includes('feature')) {
      return {
        id: Date.now().toString(),
        type: 'success',
        content: `✓ AI Co-Pilot: Active\n✓ Instant Deploy: Ready\n✓ Semantic Search: Indexed 1.2M files\n✓ Team Insights: 12 active developers\n\nAll systems operational.`,
        timestamp: new Date(),
      };
    }
    
    if (cmd === '/deploy' || cmd.includes('deploy')) {
      return {
        id: Date.now().toString(),
        type: 'success',
        content: `🚀 Deploying to production...\n✓ Building assets... Done (2.3s)\n✓ Running tests... Passed (1.8s)\n✓ Pushing to CDN... Complete\n\nDeployment successful! Live at: https://app.example.com`,
        timestamp: new Date(),
      };
    }
    
    if (cmd === '/status' || cmd.includes('status') || cmd.includes('health')) {
      const integrationCount = getConnectedIntegrationCount();
      return {
        id: Date.now().toString(),
        type: 'info',
        content: `📊 System Status:\n\nCPU: 23% | Memory: 4.2GB / 16GB\nActive Connections: ${integrationCount}\nUptime: 99.98%\nLatency: 12ms\n\nStatus: All systems operational ✓`,
        timestamp: new Date(),
      };
    }
    
    if (cmd === '/help' || cmd.includes('help')) {
      return {
        id: Date.now().toString(),
        type: 'info',
        content: `Available Commands:\n\n/features - List all platform features\n/deploy - Deploy to production\n/status - Check system health\n/help - Show this help message\n\nTip: Click preset commands below for quick access!`,
        timestamp: new Date(),
      };
    }
    
    // Default response
    return {
      id: Date.now().toString(),
      type: 'system',
      content: `Command "${command}" executed successfully.\n\nTry /help to see available commands.`,
      timestamp: new Date(),
    };
  };

  const handlePresetClick = (command: string) => {
    setInputValue(command);
    handleCommand(command);
  };

  return (
    <>
      {/* Floating Button */}
      <AnimatePresence>
        {!isConsoleOpen && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="fixed bottom-6 right-6 z-50"
          >
            <Button
              onClick={toggleConsole}
              className="relative w-16 h-16 rounded-full shadow-premium-lg hover:shadow-2xl transition-all duration-300 group"
              style={{ backgroundColor: theme?.primary || '#6366f1' }}
            >
              <Terminal className="w-7 h-7 text-white group-hover:scale-110 transition-transform" />
              
              {/* Live ping indicator */}
              <span className="absolute -top-1 -right-1 flex h-4 w-4">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-4 w-4 bg-green-500 border-2 border-white"></span>
              </span>
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Console Drawer */}
      <AnimatePresence>
        {isConsoleOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50"
              onClick={closeConsole}
            />

            {/* Drawer */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed right-0 top-0 bottom-0 w-full md:w-[480px] z-50 flex flex-col terminal-window shadow-2xl"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-black/40">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg" style={{ backgroundColor: `${theme?.primary || '#6366f1'}20` }}>
                    <Terminal className="w-5 h-5" style={{ color: theme?.primary || '#6366f1' }} />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white font-mono">AI Terminal Console</h3>
                    <p className="text-xs text-gray-400">Interactive Sandbox</p>
                  </div>
                </div>
                <button
                  onClick={closeConsole}
                  className="p-2 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Integration Status Dock */}
              <div className="px-6 py-3 border-b border-white/10 bg-black/20">
                <div className="flex items-center gap-3 text-xs">
                  <div className="flex items-center gap-2 text-green-400">
                    <Check className="w-3 h-3" />
                    <span className="font-mono">{getConnectedIntegrationCount()} integrations active</span>
                  </div>
                  <div className="flex items-center gap-2 text-cyan-400">
                    <Activity className="w-3 h-3" />
                    <span className="font-mono">CPU: 23%</span>
                  </div>
                  <div className="flex items-center gap-2 text-purple-400">
                    <Zap className="w-3 h-3 live-indicator" />
                    <span className="font-mono">Live</span>
                  </div>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto px-6 py-4 space-y-3 scrollbar-hide">
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={cn(
                      'flex gap-3 items-start',
                      message.type === 'user' && 'flex-row-reverse'
                    )}
                  >
                    <div
                      className={cn(
                        'p-3 rounded-lg max-w-[85%] font-mono text-sm whitespace-pre-wrap',
                        message.type === 'user' && 'bg-indigo-600/20 text-indigo-200 border border-indigo-500/30',
                        message.type === 'system' && 'bg-gray-800/50 text-gray-300 border border-gray-700/50',
                        message.type === 'success' && 'bg-green-900/20 text-green-200 border border-green-500/30',
                        message.type === 'info' && 'bg-cyan-900/20 text-cyan-200 border border-cyan-500/30'
                      )}
                    >
                      {message.content}
                    </div>
                  </motion.div>
                ))}
                
                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex gap-2 items-center text-gray-400 text-sm font-mono"
                  >
                    <span>Processing</span>
                    <span className="flex gap-1">
                      <span className="w-1 h-1 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0ms' }}></span>
                      <span className="w-1 h-1 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '150ms' }}></span>
                      <span className="w-1 h-1 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '300ms' }}></span>
                    </span>
                  </motion.div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Preset Commands */}
              <div className="px-6 py-3 border-t border-white/10 bg-black/20">
                <p className="text-xs text-gray-400 mb-2 font-mono">Quick Commands:</p>
                <div className="flex flex-wrap gap-2">
                  {PRESET_COMMANDS.map((cmd) => (
                    <button
                      key={cmd.label}
                      onClick={() => handlePresetClick(cmd.label)}
                      className="command-chip"
                      title={cmd.description}
                    >
                      {cmd.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Input */}
              <div className="px-6 py-4 border-t border-white/10 bg-black/40">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleCommand(inputValue);
                  }}
                  className="flex gap-2"
                >
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Type a command..."
                    className="flex-1 px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50"
                  />
                  <Button
                    type="submit"
                    disabled={!inputValue.trim() || isTyping}
                    className="px-4 py-3 rounded-lg"
                    style={{ backgroundColor: theme?.primary || '#6366f1' }}
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </form>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
