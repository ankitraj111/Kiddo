'use client';

import React from 'react';
import { motion } from 'motion/react';
import { Campaign } from '@/lib/sdui/types';
import { cn } from '@/lib/utils';
import { Zap } from 'lucide-react';

interface CampaignSelectorProps {
  campaigns: Campaign[];
  activeCampaign: Campaign;
  onSelectCampaign: (campaign: Campaign) => void;
}

const campaignIcons: Record<string, string> = {
  'devflow-ai-platform': '🚀',
  'opsgrid-cloud-infra': '⚡',
  'corecrm-enterprise': '💼',
};

export const CampaignSelector: React.FC<CampaignSelectorProps> = ({
  campaigns,
  activeCampaign,
  onSelectCampaign,
}) => {
  // Calculate scroll progress
  const [scrollProgress, setScrollProgress] = React.useState(0);

  React.useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = totalHeight > 0 ? (window.scrollY / totalHeight) * 100 : 0;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="w-full glass sticky top-0 z-50 border-b border-gray-200/50 shadow-sm backdrop-blur-md">
      {/* Scroll Progress Bar */}
      <motion.div
        className="absolute top-0 left-0 h-1 bg-gradient-to-r"
        style={{
          backgroundImage: `linear-gradient(90deg, ${activeCampaign.theme.primary}, ${activeCampaign.theme.secondary})`,
          width: `${scrollProgress}%`
        }}
        transition={{ ease: 'easeOut', duration: 0.1 }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Logo and Title */}
          <div className="flex items-center gap-3">
            <motion.div
              className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-md"
              style={{
                backgroundImage: `linear-gradient(135deg, ${activeCampaign.theme.primary} 0%, ${activeCampaign.theme.secondary} 100%)`,
                backgroundSize: '200% 200%',
                backgroundPosition: '0% 50%'
              }}
              animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              <Zap size={20} />
            </motion.div>
            <div>
              <h1 className="text-xl md:text-2xl font-bold font-heading text-gray-900 tracking-tight">
                DevFlow Cloud Console
              </h1>
              <p className="text-xs text-gray-500 font-medium">
                Platform: <span className="text-gray-700 font-semibold">{activeCampaign.name}</span>
              </p>
            </div>
          </div>

          {/* Premium Pill Tabs */}
          <div className="flex bg-gray-100/80 p-1 rounded-full shadow-inner overflow-x-auto w-full md:w-auto scrollbar-hide">
            {campaigns.map((campaign) => {
              const isActive = activeCampaign.id === campaign.id;
              const icon = campaignIcons[campaign.id] || '✨';
              
              return (
                <button
                  key={campaign.id}
                  onClick={() => onSelectCampaign(campaign)}
                  className={cn(
                    "relative px-4 py-2 md:px-5 md:py-2.5 rounded-full text-sm font-semibold transition-colors whitespace-nowrap z-10 flex items-center gap-2",
                    isActive ? "text-white" : "text-gray-600 hover:text-gray-900"
                  )}
                  style={{
                    color: isActive ? '#ffffff' : undefined,
                  }}
                >
                  {isActive && (
                    <motion.div
                      layoutId="active-campaign-tab"
                      className="absolute inset-0 rounded-full shadow-md z-[-1]"
                      style={{ backgroundColor: campaign.theme.primary }}
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span className="text-base">{icon}</span>
                  {campaign.name}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
