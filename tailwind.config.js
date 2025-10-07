/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Dynamic client branding (uses CSS variables)
        brand: {
          primary: 'var(--color-primary, #0066cc)',
          accent: 'var(--color-accent, #c9a961)',
          charcoal: 'var(--color-charcoal, #1a1a2e)',
          cream: 'var(--color-cream, #f8f6f3)',
          gray: 'var(--color-gray, #6b6b6b)',
        },
        // YC Construction Brand Colors (legacy support)
        yc: {
          charcoal: '#1a1a2e',
          cream: '#f8f6f3',
          blue: '#0066cc',
          gold: '#c9a961',
          green: '#2d5016',
          gray: '#6b6b6b',
          terracotta: '#d4825c',
        },
        whatsapp: '#25D366',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      boxShadow: {
        'yc-card': '0 2px 8px rgba(0,0,0,0.06)',
        'yc-button': '0 4px 12px rgba(37,211,102,0.3)',
      },
      borderRadius: {
        'yc': '12px',
        'yc-button': '8px',
      },
    },
  },
  plugins: [],
}
