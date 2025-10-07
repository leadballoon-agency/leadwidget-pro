# Multi-Client Platform Guide

## Overview

The platform now supports unlimited clients on a single deployment. Each client gets their own branded widget with custom colors, messaging, and contact information.

## How It Works

### URL Structure

Clients can access their widget via:
- `https://leadwidget-pro.vercel.app/gardens/CLIENT_ID`
- `https://leadwidget-pro.vercel.app/CLIENT_ID` (fallback)
- `https://leadwidget-pro.vercel.app/` (defaults to yc-construction)

**Examples:**
- YC Construction: `/gardens/yc-construction`
- Demo Client: `/gardens/demo-client`

### Client Configuration

All client configs are in `src/config/clients.ts`:

```typescript
export const clients: Record<string, ClientConfig> = {
  'yc-construction': {
    id: 'yc-construction',
    name: 'YC Construction Ltd',
    sector: 'gardens',
    branding: {
      primaryColor: '#0066cc',      // CTA buttons
      accentColor: '#c9a961',       // Award badge
      charcoalColor: '#1a1a2e',     // Text
      creamColor: '#f8f6f0',        // Background
      grayColor: '#6b7280',         // Secondary text
      companyName: 'YC Construction',
      award: 'Landscaper of the Year 2024',
    },
    contact: {
      whatsapp: '447553035444',     // WhatsApp number
      email: 'marketing@ycconstructionltd.co.uk',
    },
    tracking: {
      metaPixelId: undefined,       // Optional Meta Pixel
      googleAnalyticsId: undefined, // Optional GA4
    },
    customization: {
      heroHeadline: 'Is Your New Build Garden\nCosting You £20k?',
      heroSubheadline: 'Find out what your garden really needs...',
      ctaText: 'Start Assessment',
    },
  },
  // Add more clients here...
};
```

## Adding a New Client

### Step 1: Add Client Config

Edit `src/config/clients.ts`:

```typescript
'new-client-id': {
  id: 'new-client-id',
  name: 'Client Company Name',
  sector: 'gardens',
  branding: {
    primaryColor: '#your-primary-color',
    accentColor: '#your-accent-color',
    charcoalColor: '#1f2937',
    creamColor: '#f9fafb',
    grayColor: '#6b7280',
    companyName: 'Client Name',
    award: 'Award text (optional)',
  },
  contact: {
    whatsapp: '44XXXXXXXXXX',  // E.164 format (country code + number, no spaces)
  },
  tracking: {
    metaPixelId: 'CLIENT_PIXEL_ID',  // Optional
  },
  customization: {
    heroHeadline: 'Custom Headline\nSecond Line',
    heroSubheadline: 'Custom subheadline text',
    ctaText: 'Custom CTA Text',
  },
},
```

### Step 2: Commit and Deploy

```bash
git add src/config/clients.ts
git commit -m "Add new client: Client Name"
git push origin main
```

Vercel will auto-deploy (takes ~2 minutes).

### Step 3: Test

Visit: `https://leadwidget-pro.vercel.app/gardens/new-client-id`

## Dynamic Branding

The platform uses CSS variables for dynamic theming:

```css
--color-primary     → Primary brand color (CTAs, highlights)
--color-accent      → Accent color (badges, secondary elements)
--color-charcoal    → Text color
--color-cream       → Background color
--color-gray        → Secondary text
```

Components use Tailwind classes:
- `bg-brand-primary` → Primary color
- `text-brand-accent` → Accent color
- `bg-brand-cream` → Background

All colors update automatically based on the client config.

## Embed Codes

Each client gets a unique embed code:

### Option 1: Direct iFrame

```html
<iframe
  src="https://leadwidget-pro.vercel.app/gardens/CLIENT_ID"
  width="100%"
  height="800px"
  frameborder="0"
  style="border: none;">
</iframe>
```

### Option 2: JavaScript Embed (Coming Soon)

```html
<div id="garden-widget"></div>
<script src="https://leadwidget-pro.vercel.app/embed.js"></script>
<script>
  GardenWidget.init({
    clientId: 'CLIENT_ID',
    sector: 'gardens'
  });
</script>
```

## Features Per Client

### Automatic:
- ✅ Custom branding (colors, logo, company name)
- ✅ Custom messaging (headlines, CTA text)
- ✅ Client-specific WhatsApp integration
- ✅ Optional Meta Pixel tracking
- ✅ Award badge (if provided)

### Shared:
- Assessment questions (8 questions)
- Scoring algorithm
- Package recommendations
- Results layout

## Testing Different Clients

### Test URLs:

**YC Construction (Blue theme):**
```
https://leadwidget-pro.vercel.app/gardens/yc-construction
```

**Demo Client (Green theme):**
```
https://leadwidget-pro.vercel.app/gardens/demo-client
```

## Client Sectors

Currently supported:
- `gardens` - Garden assessment
- `kitchens` - Kitchen renovation (coming soon)
- `bathrooms` - Bathroom assessment (coming soon)
- `extensions` - Home extensions (coming soon)
- `driveways` - Driveway renovation (coming soon)

## Analytics Tracking

Each client can have:

1. **Your platform pixel** (tracks all widget interactions)
2. **Client's Meta Pixel** (their campaign optimization)
3. **Client's Google Analytics** (optional)

### Dual-Pixel Architecture:

```javascript
// Your analytics (widget performance)
trackWidgetEvent('assessment_started', {
  client_id: 'yc-construction',
  sector: 'gardens'
});

// Client's Meta Pixel (campaign optimization)
fbq('track', 'Lead', {
  content_name: 'Garden Assessment'
});
```

## WhatsApp Integration

Each client's WhatsApp button:
1. Opens WhatsApp with pre-filled message
2. Includes assessment results
3. Client receives lead directly in WhatsApp Business

**Message format:**
```
Hi! I just completed the garden assessment.

My Score: 6.5/10
Issues: Poor drainage, Lack of privacy
Budget: £20k-£35k
Timeline: ASAP (next 3 months)
Postcode: WF9 4EA

Here's a photo of my garden:
```

## Customization Levels

### Level 1: Basic (Current)
- Colors
- Company name
- Award badge
- Headlines
- WhatsApp number

### Level 2: Advanced (Future)
- Custom questions
- Custom scoring logic
- Custom packages
- Custom results layout
- Logo upload

### Level 3: White Label (Future)
- Custom domain per client
- Fully branded experience
- API integration
- CRM sync

## Performance

- **Load time:** < 2 seconds
- **Bundle size:** < 100kb gzipped
- **Global CDN:** Vercel edge network
- **Uptime:** 99.9%

## Client Dashboard (Coming Soon)

Self-service portal where clients can:
1. Customize their widget
2. Update branding
3. View analytics
4. Get embed codes
5. Manage subscription

## Pricing Model

**Per client monthly:**
- Platform access: £499/month
- Hosted on your infrastructure
- Unlimited widget loads
- Analytics included
- Monthly optimization

**Your costs:**
- Vercel hosting: Free tier (or £20/month Pro)
- Supabase: Free tier
- Total: £0-20/month for 100 clients

**Margins: 95%+**

## Support

For technical questions:
- GitHub Issues: https://github.com/leadballoon-agency/leadwidget-pro/issues
- Email: support@yourcompany.com

## Roadmap

**Phase 1:** ✅ Multi-client routing (complete)
**Phase 2:** 🔄 Universal embed script (in progress)
**Phase 3:** Client dashboard
**Phase 4:** Additional sectors (kitchens, bathrooms)
**Phase 5:** Custom domains per client
**Phase 6:** API integration
