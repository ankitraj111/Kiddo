import { createContext, useContext } from 'react';
import { CampaignTheme } from './types';

/**
 * SDUI Theme Context
 * Provides campaign theme to all components without prop drilling
 */

interface ThemeContextType {
  theme: CampaignTheme | null;
  setTheme: (theme: CampaignTheme) => void;
}

export const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined
);

/**
 * Hook to use theme context in components
 * Throws if used outside of ThemeProvider
 */
export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error(
      'useTheme must be used within a ThemeProvider. ' +
        'Ensure ThemeProvider wraps your component tree.'
    );
  }
  return context;
};

/**
 * Safe hook that returns null if context is not available
 */
export const useThemeSafe = (): ThemeContextType | null => {
  return useContext(ThemeContext) || null;
};

/**
 * Helper to get CSS variable value for theme property
 */
export const getThemeVar = (
  theme: CampaignTheme,
  property: keyof CampaignTheme
): string => {
  const value = theme[property];
  if (typeof value === 'string' && value.startsWith('#')) {
    return value;
  }
  return String(value);
};

/**
 * Convert theme to CSS variables object
 */
export const themeToCSSVars = (
  theme: CampaignTheme
): Record<string, string> => ({
  '--sdui-primary': theme.primary,
  '--sdui-secondary': theme.secondary,
  '--sdui-accent': theme.accent,
  '--sdui-background': theme.background,
  '--sdui-text': theme.text,
});
