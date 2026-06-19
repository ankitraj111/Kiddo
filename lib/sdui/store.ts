import { create } from 'zustand';
import {
  CartItem,
  Product,
  SDUIAppState,
  Campaign,
  CampaignTheme,
  SDUIAction,
} from './types';

/**
 * SDUI App Store using Zustand
 * Manages cart, overlays, campaigns, and themes with minimal re-renders
 */

interface SDUIStore extends SDUIAppState {
  // Cart actions
  addToCart: (product: Product, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getCartItemCount: () => number;

  // Overlay actions
  openOverlay: (overlayId: string) => void;
  closeOverlay: (overlayId: string) => void;
  closeAllOverlays: () => void;
  isOverlayOpen: (overlayId: string) => boolean;

  // Campaign actions
  setActiveCampaign: (campaign: Campaign) => void;
  setActiveTheme: (theme: CampaignTheme) => void;

  // Integration actions
  toggleIntegration: (integrationId: string) => void;
  isIntegrationConnected: (integrationId: string) => boolean;
  getConnectedIntegrationCount: () => number;

  // Console actions
  openConsole: () => void;
  closeConsole: () => void;
  toggleConsole: () => void;

  // Server node actions
  toggleServerNode: (nodeId: string) => void;
  isServerNodeActive: (nodeId: string) => boolean;
  getActiveServerNodeCount: () => number;

  // Action dispatcher
  dispatch: (action: SDUIAction) => void;
}

export const useSDUIStore = create<SDUIStore>((set, get) => ({
  // Initial state
  cart: [],
  openOverlays: new Set<string>(),
  activeCampaign: null,
  activeTheme: null,
  connectedIntegrations: new Set<string>(),
  isConsoleOpen: false,
  activeServerNodes: new Set<string>(),

  // Cart actions with isolated updates
  addToCart: (product: Product, quantity: number) =>
    set((state) => {
      const existingItem = state.cart.find(
        (item) => item.productId === product.id
      );

      if (existingItem) {
        return {
          cart: state.cart.map((item) =>
            item.productId === product.id
              ? { ...item, quantity: item.quantity + quantity }
              : item
          ),
        };
      }

      return {
        cart: [
          ...state.cart,
          {
            productId: product.id,
            quantity,
            product,
          },
        ],
      };
    }),

  removeFromCart: (productId: string) =>
    set((state) => ({
      cart: state.cart.filter((item) => item.productId !== productId),
    })),

  clearCart: () => set({ cart: [] }),

  getCartTotal: () => {
    const state = get();
    return state.cart.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );
  },

  getCartItemCount: () => {
    const state = get();
    return state.cart.reduce((count, item) => count + item.quantity, 0);
  },

  // Overlay actions with isolated updates
  openOverlay: (overlayId: string) =>
    set((state) => {
      const newOverlays = new Set(state.openOverlays);
      newOverlays.add(overlayId);
      return { openOverlays: newOverlays };
    }),

  closeOverlay: (overlayId: string) =>
    set((state) => {
      const newOverlays = new Set(state.openOverlays);
      newOverlays.delete(overlayId);
      return { openOverlays: newOverlays };
    }),

  closeAllOverlays: () => set({ openOverlays: new Set<string>() }),

  isOverlayOpen: (overlayId: string) => {
    const state = get();
    return state.openOverlays.has(overlayId);
  },

  // Campaign actions
  setActiveCampaign: (campaign: Campaign) =>
    set({ activeCampaign: campaign }),

  setActiveTheme: (theme: CampaignTheme) =>
    set({ activeTheme: theme }),

  // Integration actions
  toggleIntegration: (integrationId: string) =>
    set((state) => {
      const newIntegrations = new Set(state.connectedIntegrations);
      if (newIntegrations.has(integrationId)) {
        newIntegrations.delete(integrationId);
      } else {
        newIntegrations.add(integrationId);
      }
      return { connectedIntegrations: newIntegrations };
    }),

  isIntegrationConnected: (integrationId: string) => {
    const state = get();
    return state.connectedIntegrations.has(integrationId);
  },

  getConnectedIntegrationCount: () => {
    const state = get();
    return state.connectedIntegrations.size;
  },

  // Console actions
  openConsole: () => set({ isConsoleOpen: true }),
  closeConsole: () => set({ isConsoleOpen: false }),
  toggleConsole: () => set((state) => ({ isConsoleOpen: !state.isConsoleOpen })),

  // Server node actions
  toggleServerNode: (nodeId: string) =>
    set((state) => {
      const newNodes = new Set(state.activeServerNodes);
      if (newNodes.has(nodeId)) {
        newNodes.delete(nodeId);
      } else {
        newNodes.add(nodeId);
      }
      return { activeServerNodes: newNodes };
    }),

  isServerNodeActive: (nodeId: string) => {
    const state = get();
    return state.activeServerNodes.has(nodeId);
  },

  getActiveServerNodeCount: () => {
    const state = get();
    return state.activeServerNodes.size;
  },

  // Action dispatcher - handles all SDUI actions
  dispatch: (action: SDUIAction) => {
    switch (action.type) {
      case 'CART_ADD': {
        // Note: In a real app, you'd fetch the product from an API
        // This is a placeholder - the product should come from the component
        const dummyProduct: Product = {
          id: action.payload.productId,
          name: 'Product',
          description: 'A product',
          price: 0,
          image: '',
        };
        get().addToCart(dummyProduct, action.payload.quantity);
        break;
      }

      case 'CART_REMOVE': {
        get().removeFromCart(action.payload.productId);
        break;
      }

      case 'OVERLAY_OPEN': {
        get().openOverlay(action.payload.overlayId);
        break;
      }

      case 'OVERLAY_CLOSE': {
        get().closeOverlay(action.payload.overlayId);
        break;
      }

      case 'CAMPAIGN_SWITCH': {
        console.log(
          `[SDUI] Campaign switch requested: ${action.payload.campaignId}`
        );
        break;
      }

      case 'THEME_TOGGLE': {
        console.log(
          `[SDUI] Theme toggle requested: ${action.payload.themeName}`
        );
        break;
      }

      case 'NAVIGATE': {
        console.log(
          `[SDUI] Navigation requested: ${action.payload.destination}`
        );
        break;
      }

      case 'INTEGRATION_TOGGLE': {
        get().toggleIntegration(action.payload.integrationId);
        break;
      }

      case 'SERVER_NODE_TOGGLE': {
        get().toggleServerNode(action.payload.nodeId);
        break;
      }

      case 'CONSOLE_OPEN': {
        get().openConsole();
        break;
      }

      case 'CONSOLE_CLOSE': {
        get().closeConsole();
        break;
      }

      default: {
        const _exhaustive: never = action;
        console.warn('[SDUI] Unknown action type:', _exhaustive);
      }
    }
  },
}));

/**
 * Hooks for components to use store with minimal re-renders
 */

// Get entire cart (use sparingly)
export const useCart = () => useSDUIStore((state) => state.cart);

// Get cart-only actions
export const useCartActions = () => {
  const addToCart = useSDUIStore((state) => state.addToCart);
  const removeFromCart = useSDUIStore((state) => state.removeFromCart);
  const clearCart = useSDUIStore((state) => state.clearCart);
  const getCartTotal = useSDUIStore((state) => state.getCartTotal);
  const getCartItemCount = useSDUIStore((state) => state.getCartItemCount);

  return {
    addToCart,
    removeFromCart,
    clearCart,
    getCartTotal,
    getCartItemCount,
  };
};

// Get overlay state for specific overlay
export const useOverlayState = (overlayId: string) =>
  useSDUIStore((state) => state.isOverlayOpen(overlayId));

// Get overlay actions
export const useOverlayActions = () => {
  const openOverlay = useSDUIStore((state) => state.openOverlay);
  const closeOverlay = useSDUIStore((state) => state.closeOverlay);
  const closeAllOverlays = useSDUIStore((state) => state.closeAllOverlays);

  return {
    openOverlay,
    closeOverlay,
    closeAllOverlays,
  };
};

// Get active theme
export const useActiveTheme = () =>
  useSDUIStore((state) => state.activeTheme);

// Get active campaign
export const useActiveCampaign = () =>
  useSDUIStore((state) => state.activeCampaign);

// Get dispatcher
export const useDispatch = () =>
  useSDUIStore((state) => state.dispatch);

// Get integration state
export const useIntegrations = () => {
  const connectedIntegrations = useSDUIStore((state) => state.connectedIntegrations);
  const toggleIntegration = useSDUIStore((state) => state.toggleIntegration);
  const isIntegrationConnected = useSDUIStore((state) => state.isIntegrationConnected);
  const getConnectedIntegrationCount = useSDUIStore((state) => state.getConnectedIntegrationCount);

  return {
    connectedIntegrations,
    toggleIntegration,
    isIntegrationConnected,
    getConnectedIntegrationCount,
  };
};

// Get console state
export const useConsole = () => {
  const isConsoleOpen = useSDUIStore((state) => state.isConsoleOpen);
  const openConsole = useSDUIStore((state) => state.openConsole);
  const closeConsole = useSDUIStore((state) => state.closeConsole);
  const toggleConsole = useSDUIStore((state) => state.toggleConsole);

  return {
    isConsoleOpen,
    openConsole,
    closeConsole,
    toggleConsole,
  };
};

// Get server node state
export const useServerNodes = () => {
  const activeServerNodes = useSDUIStore((state) => state.activeServerNodes);
  const toggleServerNode = useSDUIStore((state) => state.toggleServerNode);
  const isServerNodeActive = useSDUIStore((state) => state.isServerNodeActive);
  const getActiveServerNodeCount = useSDUIStore((state) => state.getActiveServerNodeCount);

  return {
    activeServerNodes,
    toggleServerNode,
    isServerNodeActive,
    getActiveServerNodeCount,
  };
};
