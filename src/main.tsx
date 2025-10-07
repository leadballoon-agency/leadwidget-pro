import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { ClientProvider } from './context/ClientContext.tsx'
import { createPreviewConfig, storePreviewConfig } from './config/clients.ts'
import './index.css'

// Listen for preview config from parent window
window.addEventListener('message', (event) => {
  // Security: check origin
  if (event.origin !== window.location.origin) return;

  if (event.data.type === 'PREVIEW_CONFIG') {
    console.log('[Preview] Received config:', event.data.config);

    // Create full client config from scraped data
    const previewConfig = createPreviewConfig(event.data.config);

    // Store in sessionStorage for ClientContext to pick up
    storePreviewConfig(previewConfig);

    // Reload to apply new config
    window.location.reload();
  }
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ClientProvider>
      <App />
    </ClientProvider>
  </React.StrictMode>,
)
