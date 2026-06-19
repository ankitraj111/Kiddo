'use client';

import React, { useMemo, useEffect, useState } from 'react';
import { ThemeContext } from './context';
import { SDUIScreen, Campaign, SDUIComponentProps } from './types';
import { useSDUIStore } from './store';
import { buildRegistry } from './registry';

export const SDUIRenderer: React.FC<{ campaign: Campaign; screenId?: string }> = React.memo(
  ({ campaign, screenId }) => {
    const [themeValue, setThemeValue] = useState(campaign.theme);
    const setActiveCampaign = useSDUIStore((s) => s.setActiveCampaign);
    const setActiveTheme = useSDUIStore((s) => s.setActiveTheme);
    
    // Memoize the registry to prevent rebuilding on every render
    const registry = useMemo(() => buildRegistry(), []);

    useEffect(() => {
      setActiveCampaign(campaign);
      setActiveTheme(campaign.theme);
      setThemeValue(campaign.theme);
    }, [campaign, setActiveCampaign, setActiveTheme]);

    const screen: SDUIScreen | undefined = screenId
      ? campaign.screens.find((s) => s.id === screenId)
      : campaign.screens[0];

    if (!screen) {
      return (
        <div className="flex items-center justify-center min-h-[50vh]">
          <p className="text-xl font-medium text-gray-500">Screen not found</p>
        </div>
      );
    }

    return (
      <ThemeContext.Provider value={{ theme: themeValue, setTheme: setThemeValue }}>
        <div
          className="w-full min-h-screen transition-colors duration-700 ease-in-out relative overflow-hidden"
          style={{
            backgroundColor: campaign.theme.background,
            color: campaign.theme.text,
          }}
        >
          {/* Subtle animated background mesh based on primary theme color */}
          <div 
            className="absolute inset-0 opacity-[0.03] pointer-events-none transition-colors duration-700"
            style={{
              backgroundImage: `radial-gradient(circle at 50% 0%, ${campaign.theme.primary} 0%, transparent 50%), radial-gradient(circle at 100% 100%, ${campaign.theme.secondary} 0%, transparent 50%)`
            }}
          />

          {/* Components container */}
          <div className="relative max-w-[1400px] mx-auto pt-6 pb-20 md:pt-10 md:pb-24 flex flex-col gap-12 md:gap-20">
            {screen.components.map((component) => {
              const ComponentClass = registry[component.componentType];

              if (!ComponentClass) {
                return (
                  <div
                    key={component.id}
                    className="p-8 mx-4 sm:mx-6 lg:mx-8 bg-red-50/80 backdrop-blur-sm border border-red-200 rounded-2xl"
                  >
                    <p className="text-red-800 font-bold">
                      Component Error: {component.componentType} not found
                    </p>
                    <p className="text-red-600 text-sm mt-2 font-medium">
                      Check the component registry and ensure this component is registered.
                    </p>
                  </div>
                );
              }

              return (
                <div key={component.id} className="w-full">
                  <React.Suspense
                    fallback={
                      <div className="mx-4 sm:mx-6 lg:mx-8 h-96 bg-gray-100/50 rounded-3xl animate-pulse" />
                    }
                  >
                    <ComponentClass {...(component as SDUIComponentProps)} />
                  </React.Suspense>
                </div>
              );
            })}
          </div>
        </div>
      </ThemeContext.Provider>
    );
  }
);

SDUIRenderer.displayName = 'SDUIRenderer';
