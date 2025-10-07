# YC Construction Widget - Deployment Guide

## Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

## Production Deployment

### Option 1: Netlify (Recommended)

1. **Push to GitHub**
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/your-username/yc-widget.git
git push -u origin main
```

2. **Deploy to Netlify**
- Go to [netlify.com](https://netlify.com)
- Click "Add new site" → "Import an existing project"
- Connect your GitHub repository
- Build settings:
  - Build command: `npm run build`
  - Publish directory: `dist`
- Click "Deploy site"

3. **Custom Domain (Optional)**
- Go to Site settings → Domain management
- Add custom domain: `widget.ycconstructionltd.co.uk`
- Update DNS records as instructed

### Option 2: Vercel

1. **Install Vercel CLI**
```bash
npm install -g vercel
```

2. **Deploy**
```bash
vercel
```

3. **Production Deployment**
```bash
vercel --prod
```

### Option 3: Traditional Hosting (cPanel/FTP)

1. **Build the project**
```bash
npm run build
```

2. **Upload files**
- Upload entire `dist/` folder to your web server
- Ensure the root directory contains `index.html`

3. **Update embed.js**
- Edit `public/embed.js`
- Change `cdnBase` to your hosting URL
- Re-upload

## WordPress Integration

### Method 1: Elementor/Page Builder

1. Add an **HTML widget** to your page
2. Insert this code:

```html
<div id="yc-garden-assessment" style="width: 100%; min-height: 600px;"></div>
<script>
  window.ycGardenConfig = {
    phone: '07553035444',
    email: 'marketing@ycconstructionltd.co.uk'
  };
</script>
<script src="https://widget.ycconstructionltd.co.uk/embed.js" defer></script>
```

### Method 2: Shortcode (functions.php)

Add to your theme's `functions.php`:

```php
<?php
function yc_garden_widget_shortcode() {
    ob_start();
    ?>
    <div id="yc-garden-assessment" style="width: 100%; min-height: 600px;"></div>
    <script>
      window.ycGardenConfig = {
        phone: '07553035444',
        email: 'marketing@ycconstructionltd.co.uk'
      };
    </script>
    <script src="https://widget.ycconstructionltd.co.uk/embed.js" defer></script>
    <?php
    return ob_get_clean();
}
add_shortcode('yc_garden_widget', 'yc_garden_widget_shortcode');
?>
```

Use in any page or post: `[yc_garden_widget]`

### Method 3: Full Page Template

1. Create new page template: `template-garden-assessment.php`

```php
<?php
/*
Template Name: Garden Assessment
*/
get_header(); ?>

<div id="yc-garden-assessment" style="width: 100%; min-height: 100vh;"></div>
<script>
  window.ycGardenConfig = {
    phone: '07553035444',
    email: 'marketing@ycconstructionltd.co.uk'
  };
</script>
<script src="https://widget.ycconstructionltd.co.uk/embed.js" defer></script>

<?php get_footer(); ?>
```

2. Create new page in WordPress
3. Select "Garden Assessment" template
4. Publish

## Environment Variables (Optional)

Create `.env` file:

```env
VITE_PHONE=07553035444
VITE_ALT_PHONE=07309576548
VITE_EMAIL=marketing@ycconstructionltd.co.uk
VITE_WHATSAPP_NUMBER=447553035444
```

Update `src/utils/scoring.ts` to use these:

```typescript
const phoneNumber = import.meta.env.VITE_WHATSAPP_NUMBER || '447553035444';
const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
```

## Analytics Setup

### Meta Pixel

Add to your WordPress header (before `</head>`):

```html
<!-- Meta Pixel Code -->
<script>
!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', 'YOUR_PIXEL_ID');
fbq('track', 'PageView');
</script>
<!-- End Meta Pixel Code -->
```

### Google Analytics 4

Add to your WordPress header:

```html
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

## Performance Optimization

### 1. Image Optimization

If you add images later, use WebP format:

```bash
# Install sharp for image processing
npm install sharp

# Convert images to WebP
npx sharp input.jpg -o output.webp
```

### 2. CDN Setup (Cloudflare)

1. Sign up at [cloudflare.com](https://cloudflare.com)
2. Add your domain
3. Update nameservers
4. Enable:
   - Auto Minify (JS, CSS, HTML)
   - Brotli compression
   - HTTP/3
   - Rocket Loader

### 3. Preload Critical Resources

Add to `index.html` `<head>`:

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="dns-prefetch" href="https://api.whatsapp.com">
```

## Testing

### Local Testing

```bash
# Development server
npm run dev

# Production build test
npm run build && npm run preview
```

### Mobile Testing

1. **Using ngrok** (expose local server):
```bash
npx ngrok http 5173
```

2. **Using your phone**:
- Connect to same WiFi
- Visit: `http://YOUR_LOCAL_IP:5173`

### Browser Testing

Test on:
- ✅ Chrome (Desktop & Mobile)
- ✅ Safari (Desktop & iOS)
- ✅ Firefox
- ✅ Edge

## Security

### Content Security Policy

Add to hosting headers:

```
Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline' https://wa.me; connect-src 'self' https://wa.me; img-src 'self' data: https:; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com;
```

### HTTPS

Always use HTTPS in production. Most hosting providers (Netlify, Vercel) provide free SSL certificates.

## Monitoring

### Uptime Monitoring

Use [UptimeRobot](https://uptimerobot.com) (free):
- Monitor: `https://widget.ycconstructionltd.co.uk`
- Check interval: 5 minutes
- Alert via email/SMS if down

### Error Tracking

Add [Sentry](https://sentry.io):

```bash
npm install @sentry/react
```

Update `src/main.tsx`:

```typescript
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "YOUR_SENTRY_DSN",
  environment: import.meta.env.MODE,
});
```

## Troubleshooting

### Widget Not Loading

1. Check browser console for errors
2. Verify `embed.js` URL is accessible
3. Check if container `#yc-garden-assessment` exists
4. Verify CORS headers if using custom domain

### WhatsApp Not Opening

1. Verify phone number format: `447553035444` (country code + number)
2. Test WhatsApp URL manually: `https://wa.me/447553035444?text=Test`
3. Check browser popup blocker

### Styling Issues

If widget styles conflict with WordPress theme:
- Shadow DOM should prevent this
- If issues persist, increase specificity in Tailwind config

## Backup & Rollback

### Backup

```bash
# Create backup
git tag -a v1.0.0 -m "Production release v1.0.0"
git push origin v1.0.0
```

### Rollback

```bash
# List versions
git tag

# Rollback to previous version
git checkout v1.0.0
npm run build

# Re-deploy
```

## Support

For deployment issues, contact:
- Email: dev@yc-construction.com
- Phone: 07553 035444
- Emergency: 07309 576548

## Checklist

Before going live:

- [ ] Update phone numbers in config
- [ ] Update WhatsApp number
- [ ] Test on mobile devices
- [ ] Verify Meta Pixel tracking
- [ ] Test WhatsApp integration
- [ ] Check page load speed (<3s)
- [ ] Verify HTTPS enabled
- [ ] Set up uptime monitoring
- [ ] Create backup/tag
- [ ] Document custom domain
- [ ] Train YC Construction team on leads
