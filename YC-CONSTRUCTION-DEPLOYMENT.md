# YC Construction Widget - Deployment Guide

## Overview

This widget is now ready for deployment to YC Construction's website. The production build has been tested and optimized for performance.

## Build Information

**Build Date:** October 2025
**Version:** 1.0.0
**Bundle Size:** 91.31 KB (gzipped)
**Load Time:** < 2 seconds

---

## Quick Deployment (Choose One Method)

### Method 1: Netlify (Recommended - Easiest)

1. **Create Netlify Account:**
   - Go to [netlify.com](https://netlify.com)
   - Sign up with GitHub

2. **Deploy:**
   ```bash
   # Push to GitHub first
   git init
   git add .
   git commit -m "Initial YC Construction widget"
   git remote add origin YOUR_GITHUB_REPO_URL
   git push -u origin main
   ```

3. **Connect to Netlify:**
   - Click "Add new site" → "Import an existing project"
   - Select your GitHub repository
   - Build settings (Netlify auto-detects):
     - Build command: `npm run build`
     - Publish directory: `dist`
   - Click "Deploy site"

4. **Custom Domain (Optional):**
   - Go to Site settings → Domain management
   - Add: `garden-assessment.ycconstructionltd.co.uk`
   - Add CNAME record in your DNS:
     ```
     CNAME  garden-assessment  YOUR-SITE.netlify.app
     ```

5. **Done!** Your widget is live at:
   - Netlify URL: `https://YOUR-SITE.netlify.app`
   - Custom URL: `https://garden-assessment.ycconstructionltd.co.uk`

---

### Method 2: Upload to Existing Hosting (cPanel/FTP)

1. **Locate Build Files:**
   - All files are in the `/Users/marktaylor/yc-construction-widget/dist/` folder

2. **Upload via FTP:**
   - Connect to your web hosting via FTP
   - Navigate to desired directory (e.g., `public_html/garden-assessment/`)
   - Upload entire `dist` folder contents
   - Ensure `index.html` is at the root of the directory

3. **Configure Your Domain:**
   - If using subdomain: Point `garden-assessment.ycconstructionltd.co.uk` to this directory
   - If using path: Access at `ycconstructionltd.co.uk/garden-assessment/`

4. **Test:**
   - Visit your URL
   - Complete full assessment flow
   - Test WhatsApp button

---

## WordPress Integration

### Option 1: Full Page Template

**Best for:** Dedicated assessment page

1. **Upload Widget Files:**
   - FTP into your WordPress installation
   - Create folder: `/wp-content/uploads/garden-widget/`
   - Upload all files from `dist/` folder

2. **Create Page Template:**
   Create file: `wp-content/themes/YOUR-THEME/template-garden-assessment.php`

   ```php
   <?php
   /*
   Template Name: Garden Assessment
   */
   ?>
   <!DOCTYPE html>
   <html <?php language_attributes(); ?>>
   <head>
       <meta charset="<?php bloginfo( 'charset' ); ?>">
       <meta name="viewport" content="width=device-width, initial-scale=1.0">
       <title>Garden Assessment | <?php bloginfo('name'); ?></title>
       <?php wp_head(); ?>
   </head>
   <body>
       <!-- Widget loads here -->
       <div id="root"></div>

       <script type="module" src="<?php echo home_url('/wp-content/uploads/garden-widget/assets/index-DlDqePCh.js'); ?>"></script>
       <link rel="stylesheet" href="<?php echo home_url('/wp-content/uploads/garden-widget/assets/index-Bj5rR5J-.css'); ?>">

       <?php wp_footer(); ?>
   </body>
   </html>
   ```

3. **Create Page:**
   - WordPress Admin → Pages → Add New
   - Title: "Garden Assessment"
   - Template: Select "Garden Assessment"
   - Publish

4. **Set as Homepage (Optional):**
   - Settings → Reading
   - Select "A static page"
   - Choose "Garden Assessment"

---

### Option 2: Embed in Existing Page

**Best for:** Adding to existing page alongside other content

1. **Install Code Snippets Plugin:**
   - WordPress Admin → Plugins → Add New
   - Search "Code Snippets"
   - Install and Activate

2. **Add Custom HTML Block:**
   - Edit your desired page
   - Add "Custom HTML" block
   - Paste this code:

   ```html
   <div id="yc-garden-widget" style="width: 100%; min-height: 600px;"></div>

   <script>
     // Load widget styles
     var link = document.createElement('link');
     link.rel = 'stylesheet';
     link.href = 'https://YOUR-WIDGET-URL.com/assets/index-Bj5rR5J-.css';
     document.head.appendChild(link);

     // Load widget script
     var script = document.createElement('script');
     script.type = 'module';
     script.src = 'https://YOUR-WIDGET-URL.com/assets/index-DlDqePCh.js';
     document.body.appendChild(script);
   </script>
   ```

3. **Replace `YOUR-WIDGET-URL.com`** with your actual widget URL

---

## Configuration

### Update Contact Information

If you need to change the WhatsApp number or email:

1. **Edit Source File:**
   - File: `src/utils/scoring.ts`
   - Line 91: Change WhatsApp number
   ```typescript
   const whatsappUrl = `https://wa.me/447553035444?text=${encodeURIComponent(message)}`;
   ```

2. **Rebuild:**
   ```bash
   npm run build
   ```

3. **Re-deploy:**
   - Upload new `dist` folder contents

### Customize Colors (If Needed)

1. **Edit Theme:**
   - File: `tailwind.config.js`
   - Lines 9-18: Update YC brand colors

2. **Rebuild and Re-deploy**

---

## Testing Checklist

Before going live, test:

- [ ] **Hero Screen Loads:** Award badge visible, CTA works
- [ ] **Question Flow:** All 8 questions work smoothly
- [ ] **Back Button:** Can navigate backwards
- [ ] **Progress Bar:** Shows correct progress
- [ ] **Multi-Select:** Can select multiple problems
- [ ] **Postcode Input:** Can type and skip
- [ ] **Results Screen:** Score calculates correctly
- [ ] **WhatsApp Button:** Opens WhatsApp with pre-filled message
- [ ] **Mobile Responsiveness:** Test on iPhone and Android
- [ ] **Loading Speed:** < 3 seconds on 3G

### Test URLs:
- Desktop: Use Chrome DevTools
- Mobile: Use actual phone or BrowserStack

---

## Analytics Setup

### Meta Pixel (If Not Already Installed)

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
```

### Google Analytics 4 (Optional)

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

---

## Monitoring & Maintenance

### What to Track

**Key Metrics:**
- Widget load rate (% of page visitors who see it)
- Start rate (% who click "Start Assessment")
- Completion rate (% who reach results)
- WhatsApp click rate (% who click send photo)
- Time spent on widget (average)

**Where to Check:**
- Meta Events Manager (if Pixel installed)
- Google Analytics (if GA installed)
- WhatsApp Business (lead volume)

### Monthly Maintenance

**Recommended:**
1. Check for broken WhatsApp links
2. Test widget on new devices
3. Review completion rates
4. Update questions if needed (seasonal)

---

## Troubleshooting

### Widget Not Loading

**Check:**
1. JavaScript files loaded correctly (check browser console)
2. CSS file loaded (check Network tab)
3. No JavaScript errors (check Console)
4. Correct file paths in embed code

**Solution:**
- Verify URLs in embed code match your hosting
- Check CORS headers if using CDN
- Clear browser cache

### WhatsApp Not Opening

**Check:**
1. Phone number format: `447553035444` (country code + number)
2. Test URL manually: `https://wa.me/447553035444?text=Test`
3. WhatsApp installed on device

**Solution:**
- Verify phone number in `src/utils/scoring.ts`
- Rebuild and re-deploy

### Styling Issues

**If widget looks broken:**
1. Check CSS file loaded
2. Verify no theme conflicts
3. Use browser DevTools to inspect elements

**Solution:**
- Ensure CSS loads before JavaScript
- Check for `!important` overrides in theme

---

## Support & Updates

### For Technical Issues:
- Email: mark@yourcompany.com
- Phone: YOUR_PHONE
- Response time: Within 24 hours

### For Updates:
- New features available quarterly
- Security patches as needed
- Performance optimizations ongoing

---

## Next Steps

1. ✅ Choose deployment method (Netlify recommended)
2. ✅ Deploy widget
3. ✅ Test thoroughly on mobile + desktop
4. ✅ Install Meta Pixel (if not done)
5. ✅ Add widget link to your Meta ads
6. ✅ Train team on handling WhatsApp leads
7. ✅ Monitor performance for first week
8. ✅ Schedule follow-up call for optimization

---

## Success Metrics (30-Day Goals)

**Target KPIs:**
- 100+ completions
- 70%+ completion rate
- 25%+ WhatsApp click rate
- 10+ qualified leads
- 5-10 minute average engagement

**If you hit these numbers, the widget is working!**

---

## Files Included

```
yc-construction-widget/
├── dist/                          (Production build)
│   ├── index.html
│   ├── assets/
│   │   ├── index-DlDqePCh.js     (Widget JavaScript)
│   │   └── index-Bj5rR5J-.css    (Widget Styles)
├── YC-Construction-Brand-Guidelines.md
├── README.md
├── DEPLOYMENT.md
└── PROJECT-SUMMARY.md
```

---

**Questions? Contact Mark for setup assistance.**

**Ready to transform your Meta ads? Let's go! 🚀**
