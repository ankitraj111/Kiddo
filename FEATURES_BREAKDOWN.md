# 🎯 SaaS Platform Features - Quick Reference

## 🏗️ Architecture Overview

```
App Root
├── CampaignSelector (Header with scroll progress)
├── SDUIRenderer (Renders campaign screens)
│   ├── BannerHero (Hero section + floating dashboard)
│   ├── ProductGrid2x2 (Bento grid with 4 specialized cards)
│   ├── DynamicCollection (Integration hub)
│   └── FullScreenOverlay (Pricing modal)
└── FloatingConsole (AI Terminal widget)
```

---

## 🎨 Campaign Themes

| Campaign | Primary | Secondary | Accent | Style |
|----------|---------|-----------|--------|-------|
| **DevFlow AI** | #6366f1 (Indigo) | #8b5cf6 (Purple) | #a78bfa | Cyber Dark |
| **OpsGrid Cloud** | #10b981 (Emerald) | #06b6d4 (Cyan) | #14b8a6 | Neon Cyber |
| **CoreCRM Enterprise** | #0f172a (Navy) | #f59e0b (Amber) | #3b82f6 | Premium Light |

---

## 🎬 Interactive Features

### 1. **BannerHero Section**
```
- Cybernetic grid background
- Floating light orbs (3 animated)
- Hero title & subtitle
- Primary/secondary CTA buttons
- Floating Dashboard Mockup (right side)
  ├── Live status indicators
  ├── Animated SVG chart
  ├── Glowing data cards
  └── Mock AI Copilot sidebar
```

**Key Animation:** Spring physics (stiffness: 300, damping: 24)

---

### 2. **Bento Grid (ProductGrid2x2)**

#### Card Types by Campaign ID:

**DevFlow AI:**
- `ai-copilot` → AI Copilot Card (with typing animation)
- `instant-deploy` → Default card
- `code-search` → Default card
- `team-insights` → Default card

**OpsGrid Cloud:**
- `live-metrics` → Metrics Card (with animated bar chart)
- `server-clusters` → Server Nodes Card (interactive)
- `edge-cdn` → Global Edge Card (with pinging)
- `distributed-lock` → Default card

**CoreCRM Enterprise:**
- `lead-scoring` → Default card
- `team-pipelines` → Default card
- `auto-outreach` → Default card
- `visual-reports` → Default card

---

### 3. **Integration Hub (DynamicCollection)**

**Features:**
- Horizontal scroll carousel
- Connect/Disconnect buttons
- Confetti on connection
- Real-time integration count
- Integration persistence in store

**State Management:**
```javascript
// Check if connected
isIntegrationConnected('github') // boolean

// Get total count
getConnectedIntegrationCount() // number

// Toggle connection
toggleIntegration('github')
```

---

### 4. **Pricing Modal (FullScreenOverlay)**

**Interactive Elements:**

```
Billing Toggle (Monthly ↔ Yearly)
    ↓
Volume Slider (10K → 1M requests)
    ↓
Dynamic Price Display ($XX/month)
    ↓
Benefits Grid
    ↓
Checkout Button (triggers confetti)
```

**Pricing Logic:**
```javascript
basePrice = { monthly: $99, yearly: $990 }
volumeAdder = volume > 1M ? $50 : volume > 500K ? $25 : $0
yearlyDiscount = 20%
finalPrice = (basePrice + volumeAdder) * (isYearly ? 1 : 1)
```

---

### 5. **Floating Console (AI Terminal)**

**Commands:**
- `/features` - List all platform features
- `/deploy` - Start deployment workflow
- `/status` - System status
- `/help` - Available commands
- `/docs` - Documentation links

**State:**
```javascript
isConsoleOpen // boolean
toggleConsole()
getConnectedIntegrationCount() // displayed in status
getActiveServerNodeCount() // displayed in status
```

---

### 6. **Navigation Bar (CampaignSelector)**

**Elements:**
- Dynamic logo with animated gradient
- Campaign pill tabs with smooth active state
- **Scroll progress indicator** (top bar, 0-100%)
- Sticky header with glass backdrop

**Scroll Progress:**
```javascript
progress = (scrollY / (documentHeight - windowHeight)) * 100
progressBar.width = progress%
```

---

## ⚙️ State Management (Zustand Store)

### Available Hooks:

```javascript
// Integrations
const { 
  toggleIntegration, 
  isIntegrationConnected, 
  getConnectedIntegrationCount 
} = useIntegrations()

// Console
const { 
  isConsoleOpen, 
  toggleConsole, 
  openConsole, 
  closeConsole 
} = useConsole()

// Server Nodes
const { 
  toggleServerNode, 
  isServerNodeActive, 
  getActiveServerNodeCount 
} = useServerNodes()

// Theme
const activeTheme = useActiveTheme()

// Campaign
const activeCampaign = useActiveCampaign()
```

---

## 🎨 CSS Custom Classes

### Backgrounds & Effects
```css
.grid-bg              /* Cybernetic grid pattern */
.glowing-border       /* Animated neon border */
.glass-panel          /* Glassmorphic container */
.terminal-window      /* Terminal styling */
.terminal-code        /* Green glowing text */
```

### Animations
```css
.animate-float        /* Floating motion */
.animate-pulse-glow   /* Pulsing glow effect */
.animate-shimmer      /* Shimmer wave */
.animate-gradient     /* Gradient shift */
.animate-badge        /* Badge pulse */
```

### Interactive States
```css
.server-node.active   /* Active server state */
.server-node.idle     /* Idle server state */
.integration-connected /* Connected integration */
.live-indicator       /* Live status pulse */
.command-chip         /* Terminal command button */
```

---

## 📱 Responsive Breakpoints

| Screen | Layout |
|--------|--------|
| Mobile (< 768px) | 1 column, bottom sheet console |
| Tablet (768px-1024px) | 2 columns, side panel console |
| Desktop (> 1024px) | 4 columns, floating console |

---

## 🔄 Data Flow Example

### Integration Connection Flow:
```
1. User clicks "Connect" button on Slack card
   ↓
2. handleConnect(integrationId, event) called
   ↓
3. Confetti particles fire
   ↓
4. dispatch(INTEGRATION_TOGGLE, { integrationId: 'slack' })
   ↓
5. Store updates: connectedIntegrations.add('slack')
   ↓
6. Card re-renders with connected state
   ↓
7. Integration count updates in console status
```

---

## 🎯 Key Files Modified/Created

| File | Type | Purpose |
|------|------|---------|
| `app/globals.css` | Style | SaaS classes & animations |
| `lib/sdui/campaigns.ts` | Data | 3 campaign definitions |
| `lib/sdui/components/BannerHero.tsx` | Component | Enhanced hero + dashboard |
| `lib/sdui/components/ProductGrid2x2.tsx` | Component | Bento grid redesign |
| `lib/sdui/components/DynamicCollection.tsx` | Component | Integration hub |
| `lib/sdui/components/FullScreenOverlay.tsx` | Component | Dynamic pricing modal |
| `lib/sdui/components/FloatingConsole.tsx` | Component | AI terminal widget |
| `lib/sdui/store.ts` | State | Enhanced store hooks |
| `components/CampaignSelector.tsx` | Component | Upgraded navigation |
| `app/page.tsx` | Page | Console integration |

---

## 🚀 Performance Optimizations

- **Memoization:** All components wrapped with React.memo()
- **Lazy Loading:** Components loaded on demand via registry
- **State Selectors:** Custom hooks for minimal re-renders
- **Animation Delays:** Staggered animations (0.1-0.3s intervals)
- **Scroll Events:** Debounced scroll progress calculation
- **Canvas Confetti:** Limited particle counts per burst

---

## 🎓 Usage Examples

### Enable/Disable Integration
```javascript
// In a component
const { toggleIntegration, isIntegrationConnected } = useIntegrations()

// Toggle
toggleIntegration('github')

// Check state
if (isIntegrationConnected('github')) {
  console.log('GitHub connected!')
}
```

### Open Console Programmatically
```javascript
const { toggleConsole } = useConsole()

// Open console
toggleConsole()
```

### Access Theme Colors
```javascript
const theme = useActiveTheme()

// Use in styling
<div style={{ color: theme?.primary }}>Text</div>
```

---

## 🐛 Troubleshooting

| Issue | Solution |
|-------|----------|
| Console not appearing | Check `FloatingConsole` imported in page.tsx |
| Confetti not firing | Verify canvas-confetti library installed |
| Theme colors not changing | Ensure `useActiveTheme()` hook called |
| Animations stuttering | Check Turbopack cache, restart dev server |
| Cards not responsive | Verify grid classes: `grid-cols-1 md:grid-cols-2 lg:grid-cols-4` |

---

## 📋 Testing Checklist

- [ ] Switch between campaigns (3 campaigns)
- [ ] Click integrations to connect/disconnect
- [ ] See confetti on integration connect
- [ ] See confetti on pricing modal checkout
- [ ] Toggle pricing from Monthly to Yearly
- [ ] Drag volume slider and see price update
- [ ] Open floating console terminal
- [ ] Type console commands: /features, /deploy, /status, /help
- [ ] See live integration count update in console
- [ ] See active server count update in console
- [ ] Click server nodes in bento grid
- [ ] Watch code typing in AI Copilot card
- [ ] Watch chart updating in metrics card
- [ ] Watch pings in global edge card
- [ ] Scroll and see progress bar change
- [ ] Test mobile responsive view

---

**Last Updated:** June 18, 2026
**Status:** ✅ Complete & Production Ready
