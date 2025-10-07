import { createContext, useContext, ReactNode, useEffect, useState } from 'react';
import { ClientConfig, getActiveClientConfig } from '../config/clients';

interface ClientContextType {
  client: ClientConfig;
  isLoading: boolean;
}

const ClientContext = createContext<ClientContextType | undefined>(undefined);

export function ClientProvider({ children }: { children: ReactNode }) {
  const [client, setClient] = useState<ClientConfig | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Get client config based on URL
    const config = getActiveClientConfig();
    setClient(config);
    setIsLoading(false);

    // Apply branding to CSS variables
    if (config) {
      applyBranding(config);
    }
  }, []);

  if (isLoading || !client) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <ClientContext.Provider value={{ client, isLoading }}>
      {children}
    </ClientContext.Provider>
  );
}

export function useClient() {
  const context = useContext(ClientContext);
  if (context === undefined) {
    throw new Error('useClient must be used within a ClientProvider');
  }
  return context;
}

// Apply client branding to CSS variables
function applyBranding(config: ClientConfig) {
  const root = document.documentElement;

  root.style.setProperty('--color-primary', config.branding.primaryColor);
  root.style.setProperty('--color-accent', config.branding.accentColor);
  root.style.setProperty('--color-charcoal', config.branding.charcoalColor);
  root.style.setProperty('--color-cream', config.branding.creamColor);
  root.style.setProperty('--color-gray', config.branding.grayColor);

  // Update document title
  document.title = `Garden Assessment | ${config.branding.companyName}`;
}
