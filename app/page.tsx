'use client';

import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CampaignSelector } from '@/components/CampaignSelector';
import { SDUIRenderer } from '@/lib/sdui/SDUIRenderer';
import { allCampaigns } from '@/lib/sdui/campaigns';
import { FloatingConsole } from '@/lib/sdui/components/FloatingConsole';

export default function Page() {
  const [activeCampaign, setActiveCampaign] = React.useState(allCampaigns[0]);
  const [isMounted, setIsMounted] = React.useState(false);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <main className="w-full min-h-screen bg-background text-foreground overflow-x-hidden selection:bg-primary/20 relative">
      <CampaignSelector
        campaigns={allCampaigns}
        activeCampaign={activeCampaign}
        onSelectCampaign={setActiveCampaign}
      />
      <AnimatePresence mode="wait">
        <motion.div
          key={activeCampaign.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="w-full"
        >
          <SDUIRenderer campaign={activeCampaign} />
        </motion.div>
      </AnimatePresence>
      {isMounted && <FloatingConsole />}
    </main>
  );
}
