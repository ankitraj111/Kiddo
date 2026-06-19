'use client';

import React from 'react';
import { ComponentRegistry, SDUIComponentProps } from './types';

// Component cache for performance
const componentCache: Map<string, React.ComponentType<SDUIComponentProps>> = new Map();

// Error fallback component
export const ErrorFallback = ({ componentType, error }: { componentType: string; error?: string }) => (
  <div className="flex items-center justify-center p-8 bg-red-50 border-2 border-red-200 rounded-lg">
    <div className="text-center">
      <p className="text-sm font-semibold text-red-800">Component Error: {componentType}</p>
      {error && <p className="text-xs text-red-600 mt-2">{error}</p>}
    </div>
  </div>
);

// Lazy component loaders
const lazyComponents = {
  BannerHero: () => import('@/lib/sdui/components/BannerHero').then((m) => m.BannerHero),
  ProductGrid2x2: () => import('@/lib/sdui/components/ProductGrid2x2').then((m) => m.ProductGrid2x2),
  DynamicCollection: () => import('@/lib/sdui/components/DynamicCollection').then((m) => m.DynamicCollection),
  FullScreenOverlay: () => import('@/lib/sdui/components/FullScreenOverlay').then((m) => m.FullScreenOverlay),
} as const;

export const getComponent = async (
  componentType: string
): Promise<React.ComponentType<SDUIComponentProps> | null> => {
  if (componentCache.has(componentType)) {
    return componentCache.get(componentType) || null;
  }

  try {
    if (componentType in lazyComponents) {
      const Component = await lazyComponents[componentType as keyof typeof lazyComponents]();
      if (Component) {
        componentCache.set(componentType, Component);
        return Component;
      }
    }

    console.warn(`[SDUI] Component not found in registry: ${componentType}`);
    return null;
  } catch (error) {
    console.error(`[SDUI] Failed to load component ${componentType}:`, error);
    return null;
  }
};

// Client-side component wrapper
const ClientSideComponent = ({ componentType, props }: { componentType: string; props: SDUIComponentProps }) => {
  const [Component, setComponent] = React.useState<React.ComponentType<SDUIComponentProps> | null>(null);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    let mounted = true;

    const loadComponent = async () => {
      try {
        const Comp = await getComponent(componentType);
        if (mounted) {
          if (Comp) {
            setComponent(() => Comp);
          } else {
            setError(`Component "${componentType}" not found in registry`);
          }
        }
      } catch (err) {
        if (mounted) {
          setError(`Failed to load component: ${String(err)}`);
        }
      }
    };

    loadComponent();

    return () => {
      mounted = false;
    };
  }, [componentType]);

  if (error) {
    return <ErrorFallback componentType={componentType} error={error} />;
  }

  if (!Component) {
    return <div className="h-32 bg-gray-100 rounded animate-pulse" />;
  }

  return <Component {...props} />;
};

export const buildRegistry = (): ComponentRegistry => {
  return {
    BannerHero: (props) => <ClientSideComponent componentType="BannerHero" props={props} />,
    ProductGrid2x2: (props) => <ClientSideComponent componentType="ProductGrid2x2" props={props} />,
    DynamicCollection: (props) => <ClientSideComponent componentType="DynamicCollection" props={props} />,
    FullScreenOverlay: (props) => <ClientSideComponent componentType="FullScreenOverlay" props={props} />,
  };
};
