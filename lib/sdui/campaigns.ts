import { Campaign } from './types';

/**
 * Premium SaaS Platform Campaign Definitions
 * Three distinct SaaS products with interactive features
 */

export const devFlowAICampaign: Campaign = {
  id: 'devflow-ai-platform',
  name: 'DevFlow AI',
  description: 'AI-Powered Development Platform',
  startDate: '2024-01-01',
  endDate: '2025-12-31',
  theme: {
    name: 'DevFlow AI - Cyber Dark',
    primary: '#6366f1', // Deep indigo
    secondary: '#8b5cf6', // Purple
    accent: '#a78bfa', // Light purple
    background: '#0f172a', // Dark slate
    text: '#f1f5f9', // Light text
    animationSpeed: 'normal',
    colorScheme: 'dark',
  },
  screens: [
    {
      id: 'devflow-home',
      campaignId: 'devflow-ai-platform',
      components: [
        {
          id: 'devflow-hero',
          componentType: 'BannerHero',
          props: {
            title: 'Automate Coding, Elevate Engineering',
            subtitle: 'Ship faster with AI-powered code generation, instant deployments, and intelligent code search. The future of development is here.',
            backgroundImage:
              'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&h=600&fit=crop',
            primaryButtonText: 'Start Free Trial',
            primaryButtonAction: {
              type: 'OVERLAY_OPEN',
              payload: { overlayId: 'devflow-pricing' },
            },
            secondaryButtonText: 'View Demo',
            secondaryButtonAction: {
              type: 'NAVIGATE',
              payload: { destination: '/demo' },
            },
            overlayOpacity: 0.7,
            textAlignment: 'left',
          },
        },
        {
          id: 'devflow-features',
          componentType: 'ProductGrid2x2',
          props: {
            title: 'Enterprise-Grade Features',
            products: [
              {
                id: 'ai-copilot',
                name: 'AI Co-Pilot',
                description: 'Intelligent code completion and generation powered by advanced AI models',
                price: 0,
                image:
                  'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=500&h=500&fit=crop',
                badge: 'AI-Powered',
              },
              {
                id: 'instant-deploy',
                name: 'Instant Deploy',
                description: 'Push to production in seconds with zero-config CI/CD pipelines',
                price: 0,
                image:
                  'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=500&h=500&fit=crop',
                badge: 'Live',
              },
              {
                id: 'code-search',
                name: 'Semantic Search',
                description: 'Find any code, file, or function across your entire codebase instantly',
                price: 0,
                image:
                  'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=500&h=500&fit=crop',
                badge: 'Smart',
              },
              {
                id: 'team-insights',
                name: 'Team Insights',
                description: 'Real-time analytics and performance metrics for your engineering team',
                price: 0,
                image:
                  'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&h=500&fit=crop',
                badge: 'Analytics',
              },
            ],
            onProductClick: (productId: string) => {
              console.log('Feature clicked:', productId);
            },
          },
        },
        {
          id: 'devflow-integrations',
          componentType: 'DynamicCollection',
          props: {
            title: 'Seamless Integrations',
            items: [
              {
                id: 'github',
                name: 'GitHub',
                description: 'Connect your repositories',
                price: 0,
                image:
                  'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=400&h=400&fit=crop',
              },
              {
                id: 'slack',
                name: 'Slack',
                description: 'Team notifications',
                price: 0,
                image:
                  'https://images.unsplash.com/photo-1611606063065-ee7946f0787a?w=400&h=400&fit=crop',
              },
              {
                id: 'vercel',
                name: 'Vercel',
                description: 'Automated deployments',
                price: 0,
                image:
                  'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=400&fit=crop',
              },
              {
                id: 'discord',
                name: 'Discord',
                description: 'Community integration',
                price: 0,
                image:
                  'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=400&h=400&fit=crop',
              },
              {
                id: 'aws',
                name: 'AWS',
                description: 'Cloud infrastructure',
                price: 0,
                image:
                  'https://images.unsplash.com/photo-1523474253046-8cd2748b5fd2?w=400&h=400&fit=crop',
              },
            ],
            scrollDirection: 'horizontal',
            itemWidth: 220,
          },
        },
        {
          id: 'devflow-pricing',
          componentType: 'FullScreenOverlay',
          props: {
            title: 'Choose Your Plan',
            content:
              'Scale your development workflow with flexible pricing.\n\n✓ 14-day free trial\n✓ No credit card required\n✓ Cancel anytime',
            imageUrl:
              'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop',
            actionButtons: [
              {
                text: 'Start Free Trial',
                action: {
                  type: 'NAVIGATE',
                  payload: { destination: '/signup' },
                },
                variant: 'primary',
              },
              {
                text: 'View Pricing',
                action: {
                  type: 'OVERLAY_CLOSE',
                  payload: { overlayId: 'devflow-pricing' },
                },
                variant: 'secondary',
              },
            ],
            closeAction: {
              type: 'OVERLAY_CLOSE',
              payload: { overlayId: 'devflow-pricing' },
            },
            animationType: 'slideUp',
          },
        },
      ],
    },
  ],
};

export const opsGridCloudCampaign: Campaign = {
  id: 'opsgrid-cloud-infra',
  name: 'OpsGrid Cloud',
  description: 'Cloud Infrastructure & Monitoring',
  startDate: '2024-01-01',
  endDate: '2025-12-31',
  theme: {
    name: 'OpsGrid Cloud - Neon Cyber',
    primary: '#10b981', // Emerald green
    secondary: '#06b6d4', // Cyan
    accent: '#14b8a6', // Teal
    background: '#111827', // Dark gray
    text: '#f9fafb', // Light text
    animationSpeed: 'fast',
    colorScheme: 'dark',
  },
  screens: [
    {
      id: 'opsgrid-home',
      campaignId: 'opsgrid-cloud-infra',
      components: [
        {
          id: 'opsgrid-hero',
          componentType: 'BannerHero',
          props: {
            title: 'Observe and Scale Infrastructure Without Friction',
            subtitle: 'Monitor every metric, scale instantly, and deploy globally. Your infrastructure, simplified.',
            backgroundImage:
              'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200&h=600&fit=crop',
            primaryButtonText: 'Get Started',
            primaryButtonAction: {
              type: 'OVERLAY_OPEN',
              payload: { overlayId: 'opsgrid-pricing' },
            },
            secondaryButtonText: 'Live Demo',
            secondaryButtonAction: {
              type: 'NAVIGATE',
              payload: { destination: '/demo' },
            },
            overlayOpacity: 0.75,
            textAlignment: 'center',
          },
        },
        {
          id: 'opsgrid-features',
          componentType: 'ProductGrid2x2',
          props: {
            title: 'Real-Time Infrastructure Control',
            products: [
              {
                id: 'live-metrics',
                name: 'Live CPU Metrics',
                description: 'Monitor CPU, memory, and disk usage across all servers in real-time',
                price: 0,
                image:
                  'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&h=500&fit=crop',
                badge: 'Real-Time',
              },
              {
                id: 'server-clusters',
                name: 'Server Clusters',
                description: 'Manage and scale server clusters with interactive node management',
                price: 0,
                image:
                  'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=500&h=500&fit=crop',
                badge: 'Interactive',
              },
              {
                id: 'edge-cdn',
                name: 'Global Edge CDN',
                description: 'Deploy to 200+ edge locations worldwide with live data flow visualization',
                price: 0,
                image:
                  'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=500&h=500&fit=crop',
                badge: 'Global',
              },
              {
                id: 'distributed-lock',
                name: 'Distributed Lock',
                description: 'Ensure data consistency with distributed locking mechanisms',
                price: 0,
                image:
                  'https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=500&h=500&fit=crop',
                badge: 'Secure',
              },
            ],
            onProductClick: (productId: string) => {
              console.log('Feature clicked:', productId);
            },
          },
        },
        {
          id: 'opsgrid-integrations',
          componentType: 'DynamicCollection',
          props: {
            title: 'Connect Your Stack',
            items: [
              {
                id: 'supabase',
                name: 'Supabase',
                description: 'Database platform',
                price: 0,
                image:
                  'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=400&fit=crop',
              },
              {
                id: 'stripe',
                name: 'Stripe',
                description: 'Payment processing',
                price: 0,
                image:
                  'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&h=400&fit=crop',
              },
              {
                id: 'sentry',
                name: 'Sentry',
                description: 'Error tracking',
                price: 0,
                image:
                  'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=400&fit=crop',
              },
              {
                id: 'datadog',
                name: 'Datadog',
                description: 'Monitoring & analytics',
                price: 0,
                image:
                  'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=400&fit=crop',
              },
              {
                id: 'cloudflare',
                name: 'Cloudflare',
                description: 'CDN & security',
                price: 0,
                image:
                  'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=400&fit=crop',
              },
            ],
            scrollDirection: 'horizontal',
            itemWidth: 220,
          },
        },
        {
          id: 'opsgrid-pricing',
          componentType: 'FullScreenOverlay',
          props: {
            title: 'Enterprise-Ready Pricing',
            content:
              'Start small, scale infinitely.\n\n✓ Pay as you grow\n✓ 99.99% uptime SLA\n✓ 24/7 expert support',
            imageUrl:
              'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&h=400&fit=crop',
            actionButtons: [
              {
                text: 'Start Free Trial',
                action: {
                  type: 'NAVIGATE',
                  payload: { destination: '/signup' },
                },
                variant: 'primary',
              },
              {
                text: 'Contact Sales',
                action: {
                  type: 'OVERLAY_CLOSE',
                  payload: { overlayId: 'opsgrid-pricing' },
                },
                variant: 'secondary',
              },
            ],
            closeAction: {
              type: 'OVERLAY_CLOSE',
              payload: { overlayId: 'opsgrid-pricing' },
            },
            animationType: 'fadeIn',
          },
        },
      ],
    },
  ],
};

export const coreCRMEnterpriseCampaign: Campaign = {
  id: 'corecrm-enterprise',
  name: 'CoreCRM Enterprise',
  description: 'Next-Gen Sales & CRM Platform',
  startDate: '2024-01-01',
  endDate: '2025-12-31',
  theme: {
    name: 'CoreCRM Enterprise - Premium Light',
    primary: '#0f172a', // Navy
    secondary: '#f59e0b', // Amber/Gold
    accent: '#3b82f6', // Blue
    background: '#ffffff',
    text: '#1f2937',
    animationSpeed: 'normal',
    colorScheme: 'light',
  },
  screens: [
    {
      id: 'corecrm-home',
      campaignId: 'corecrm-enterprise',
      components: [
        {
          id: 'corecrm-hero',
          componentType: 'BannerHero',
          props: {
            title: 'The Next-Generation Workspace for Modern Sales',
            subtitle: 'Close more deals with AI-powered lead scoring, automated outreach, and visual sales pipelines.',
            backgroundImage:
              'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=1200&h=600&fit=crop',
            primaryButtonText: 'Book a Demo',
            primaryButtonAction: {
              type: 'OVERLAY_OPEN',
              payload: { overlayId: 'corecrm-pricing' },
            },
            secondaryButtonText: 'Learn More',
            secondaryButtonAction: {
              type: 'NAVIGATE',
              payload: { destination: '/features' },
            },
            overlayOpacity: 0.4,
            textAlignment: 'left',
          },
        },
        {
          id: 'corecrm-features',
          componentType: 'ProductGrid2x2',
          props: {
            title: 'Built for High-Performance Teams',
            products: [
              {
                id: 'lead-scoring',
                name: 'AI Lead Scoring',
                description: 'Prioritize leads automatically with machine learning-powered scoring',
                price: 0,
                image:
                  'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&h=500&fit=crop',
                badge: 'AI',
              },
              {
                id: 'team-pipelines',
                name: 'Team Pipelines',
                description: 'Visualize and manage sales pipelines across your entire organization',
                price: 0,
                image:
                  'https://images.unsplash.com/photo-1551434678-e076c223a692?w=500&h=500&fit=crop',
                badge: 'Collaborative',
              },
              {
                id: 'auto-outreach',
                name: 'Automated Outreach',
                description: 'Personalized email sequences that convert leads into customers',
                price: 0,
                image:
                  'https://images.unsplash.com/photo-1596526131083-e8c633c948d2?w=500&h=500&fit=crop',
                badge: 'Automated',
              },
              {
                id: 'visual-reports',
                name: 'Visual Reports',
                description: 'Beautiful, actionable analytics and performance dashboards',
                price: 0,
                image:
                  'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&h=500&fit=crop',
                badge: 'Insights',
              },
            ],
            onProductClick: (productId: string) => {
              console.log('Feature clicked:', productId);
            },
          },
        },
        {
          id: 'corecrm-integrations',
          componentType: 'DynamicCollection',
          props: {
            title: 'Works With Your Favorite Tools',
            items: [
              {
                id: 'notion',
                name: 'Notion',
                description: 'Workspace integration',
                price: 0,
                image:
                  'https://images.unsplash.com/photo-1618761714954-0b8cd0026356?w=400&h=400&fit=crop',
              },
              {
                id: 'hubspot',
                name: 'HubSpot',
                description: 'CRM sync',
                price: 0,
                image:
                  'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=400&fit=crop',
              },
              {
                id: 'slack-crm',
                name: 'Slack',
                description: 'Team communication',
                price: 0,
                image:
                  'https://images.unsplash.com/photo-1611606063065-ee7946f0787a?w=400&h=400&fit=crop',
              },
              {
                id: 'zoom',
                name: 'Zoom',
                description: 'Video meetings',
                price: 0,
                image:
                  'https://images.unsplash.com/photo-1588196749597-9ff075ee6b5b?w=400&h=400&fit=crop',
              },
              {
                id: 'gmail',
                name: 'Gmail',
                description: 'Email integration',
                price: 0,
                image:
                  'https://images.unsplash.com/photo-1596526131083-e8c633c948d2?w=400&h=400&fit=crop',
              },
            ],
            scrollDirection: 'horizontal',
            itemWidth: 220,
          },
        },
        {
          id: 'corecrm-pricing',
          componentType: 'FullScreenOverlay',
          props: {
            title: 'Plans That Grow With You',
            content:
              'From startups to enterprise.\n\n✓ Free 30-day trial\n✓ No contracts\n✓ Premium support included',
            imageUrl:
              'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=600&h=400&fit=crop',
            actionButtons: [
              {
                text: 'Start Free Trial',
                action: {
                  type: 'NAVIGATE',
                  payload: { destination: '/signup' },
                },
                variant: 'primary',
              },
              {
                text: 'Talk to Sales',
                action: {
                  type: 'OVERLAY_CLOSE',
                  payload: { overlayId: 'corecrm-pricing' },
                },
                variant: 'secondary',
              },
            ],
            closeAction: {
              type: 'OVERLAY_CLOSE',
              payload: { overlayId: 'corecrm-pricing' },
            },
            animationType: 'scaleDown',
          },
        },
      ],
    },
  ],
};

/**
 * All available SaaS campaigns
 */
export const allCampaigns: Campaign[] = [
  devFlowAICampaign,
  opsGridCloudCampaign,
  coreCRMEnterpriseCampaign,
];

/**
 * Get campaign by ID
 */
export const getCampaignById = (campaignId: string): Campaign | undefined => {
  return allCampaigns.find((c) => c.id === campaignId);
};

/**
 * Get all campaigns for selection
 */
export const getCampaignList = () => {
  return allCampaigns.map((c) => ({
    id: c.id,
    name: c.name,
    description: c.description,
  }));
};
