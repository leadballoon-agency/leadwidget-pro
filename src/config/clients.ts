// Client configuration database
// In production, this will be moved to Supabase

export interface ClientConfig {
  id: string;
  name: string;
  sector: 'gardens' | 'kitchens' | 'bathrooms' | 'extensions' | 'driveways';
  branding: {
    primaryColor: string;
    accentColor: string;
    charcoalColor: string;
    creamColor: string;
    grayColor: string;
    logo?: string;
    companyName: string;
    tagline?: string;
    award?: string;
  };
  contact: {
    whatsapp: string;
    email?: string;
    phone?: string;
  };
  tracking: {
    metaPixelId?: string;
    googleAnalyticsId?: string;
  };
  customization?: {
    heroHeadline?: string;
    heroSubheadline?: string;
    ctaText?: string;
  };
}

// Client configurations
export const clients: Record<string, ClientConfig> = {
  'yc-construction': {
    id: 'yc-construction',
    name: 'YC Construction Ltd',
    sector: 'gardens',
    branding: {
      primaryColor: '#0066cc',
      accentColor: '#c9a961',
      charcoalColor: '#1a1a2e',
      creamColor: '#f8f6f0',
      grayColor: '#6b7280',
      companyName: 'YC Construction',
      award: 'Landscaper of the Year 2024',
    },
    contact: {
      whatsapp: '447553035444',
      email: 'marketing@ycconstructionltd.co.uk',
    },
    tracking: {
      // Add Meta Pixel ID when available
      metaPixelId: undefined,
      googleAnalyticsId: undefined,
    },
    customization: {
      heroHeadline: 'Is Your New Build Garden\nCosting You £20k?',
      heroSubheadline: 'Find out what your garden really needs and what it could be worth.',
      ctaText: 'Start Assessment',
    },
  },
  // Add more clients here as they onboard
  'demo-client': {
    id: 'demo-client',
    name: 'Demo Landscaping Ltd',
    sector: 'gardens',
    branding: {
      primaryColor: '#10b981',
      accentColor: '#f59e0b',
      charcoalColor: '#1f2937',
      creamColor: '#f9fafb',
      grayColor: '#6b7280',
      companyName: 'Demo Landscaping',
      award: 'Award-Winning Service',
    },
    contact: {
      whatsapp: '447700000000',
    },
    tracking: {},
    customization: {
      heroHeadline: 'Transform Your Garden\nIn Just 60 Seconds',
      heroSubheadline: 'Get a personalized garden assessment and discover what your space could become.',
      ctaText: 'Start Free Assessment',
    },
  },
};

// Get client configuration by ID
export function getClientConfig(clientId: string): ClientConfig | null {
  return clients[clientId] || null;
}

// Get client configuration from URL path
export function getClientFromPath(): ClientConfig | null {
  const path = window.location.pathname;

  console.log('[ClientConfig] Path:', path);

  // Match patterns like /gardens/yc-construction or /yc-construction
  const match = path.match(/\/(?:gardens|kitchens|bathrooms|extensions|driveways)\/([^/]+)/);

  if (match) {
    const clientId = match[1];
    console.log('[ClientConfig] Matched client ID:', clientId);
    const config = getClientConfig(clientId);
    console.log('[ClientConfig] Found config:', config?.name || 'NOT FOUND');
    return config;
  }

  // Fallback: try first segment
  const segments = path.split('/').filter(Boolean);
  console.log('[ClientConfig] Segments:', segments);
  if (segments.length > 0) {
    const config = getClientConfig(segments[0]);
    console.log('[ClientConfig] Fallback config:', config?.name || 'NOT FOUND');
    return config;
  }

  console.log('[ClientConfig] No client found, returning null');
  return null;
}

// Default client (for root path)
export const DEFAULT_CLIENT = 'yc-construction';

// Get active client config with fallback to default
export function getActiveClientConfig(): ClientConfig {
  const clientFromPath = getClientFromPath();

  if (clientFromPath) {
    return clientFromPath;
  }

  // Fallback to default client
  return clients[DEFAULT_CLIENT];
}
