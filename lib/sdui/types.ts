// ============================================================================
// SDUI Core Types - Server-Driven UI System
// ============================================================================

/**
 * Base props that all SDUI components receive
 */
export interface SDUIComponentProps {
  id: string;
  componentType: string;
  props: Record<string, unknown>;
  onAction?: (action: SDUIAction) => void;
}

/**
 * Discriminated union for actions dispatched from SDUI components
 */
export type SDUIAction =
  | { type: 'CART_ADD'; payload: { productId: string; quantity: number } }
  | { type: 'CART_REMOVE'; payload: { productId: string } }
  | { type: 'OVERLAY_OPEN'; payload: { overlayId: string } }
  | { type: 'OVERLAY_CLOSE'; payload: { overlayId: string } }
  | { type: 'NAVIGATE'; payload: { destination: string } }
  | { type: 'CAMPAIGN_SWITCH'; payload: { campaignId: string } }
  | { type: 'THEME_TOGGLE'; payload: { themeName: string } }
  | { type: 'INTEGRATION_TOGGLE'; payload: { integrationId: string } }
  | { type: 'VOLUME_CHANGE'; payload: { volume: number } }
  | { type: 'BILLING_TOGGLE'; payload: { isYearly: boolean } }
  | { type: 'SERVER_NODE_TOGGLE'; payload: { nodeId: string } }
  | { type: 'CONSOLE_OPEN'; payload: {} }
  | { type: 'CONSOLE_CLOSE'; payload: {} };

/**
 * Product type for display in product grids
 */
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  badge?: string;
}

/**
 * Banner hero component payload
 */
export interface BannerHeroProps extends SDUIComponentProps {
  props: {
    title: string;
    subtitle: string;
    backgroundImage: string;
    primaryButtonText: string;
    primaryButtonAction: SDUIAction;
    secondaryButtonText?: string;
    secondaryButtonAction?: SDUIAction;
    overlayOpacity: number;
    textAlignment: 'left' | 'center' | 'right';
  };
}

/**
 * Product grid (2 columns) component payload
 */
export interface ProductGrid2x2Props extends SDUIComponentProps {
  props: {
    title: string;
    products: Product[];
    onProductClick: (productId: string) => void;
  };
}

/**
 * Dynamic collection (carousel) component payload
 */
export interface DynamicCollectionProps extends SDUIComponentProps {
  props: {
    title: string;
    items: Product[];
    scrollDirection: 'horizontal' | 'vertical';
    itemWidth: number;
  };
}

/**
 * Full screen overlay component payload
 */
export interface FullScreenOverlayProps extends SDUIComponentProps {
  props: {
    title: string;
    content: string;
    imageUrl?: string;
    actionButtons: Array<{
      text: string;
      action: SDUIAction;
      variant: 'primary' | 'secondary';
    }>;
    closeAction?: SDUIAction;
    animationType: 'slideUp' | 'fadeIn' | 'scaleDown';
  };
}

/**
 * SDUI Screen - represents a complete page layout
 */
export interface SDUIScreen {
  id: string;
  campaignId: string;
  components: Array<
    | BannerHeroProps
    | ProductGrid2x2Props
    | DynamicCollectionProps
    | FullScreenOverlayProps
  >;
}

/**
 * Campaign with theme and screens
 */
export interface Campaign {
  id: string;
  name: string;
  description: string;
  theme: CampaignTheme;
  screens: SDUIScreen[];
  startDate: string;
  endDate: string;
}

/**
 * Theme configuration for a campaign
 */
export interface CampaignTheme {
  name: string;
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  text: string;
  animationSpeed: 'slow' | 'normal' | 'fast';
  colorScheme: 'light' | 'dark';
}

/**
 * Cart item type
 */
export interface CartItem {
  productId: string;
  quantity: number;
  product: Product;
}

/**
 * Application state for SDUI renderer
 */
export interface SDUIAppState {
  cart: CartItem[];
  openOverlays: Set<string>;
  activeCampaign: Campaign | null;
  activeTheme: CampaignTheme | null;
  connectedIntegrations: Set<string>;
  isConsoleOpen: boolean;
  activeServerNodes: Set<string>;
}

/**
 * Component registry type - maps component types to their implementations
 */
export type ComponentRegistry = Record<
  string,
  React.ComponentType<SDUIComponentProps>
>;
