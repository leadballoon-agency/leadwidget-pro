# Vercel Deployment Guide

## Quick Deploy to Vercel

### Step 1: Create GitHub Repository

```bash
# Create a new repository on GitHub (github.com/new)
# Repository name: yc-construction-widget
# Description: Premium engagement widget platform
# Visibility: Private (recommended)

# Then push your local repository:
git remote add origin https://github.com/YOUR_USERNAME/yc-construction-widget.git
git branch -M main
git push -u origin main
```

### Step 2: Connect to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click "Add New Project"
3. Import your GitHub repository: `yc-construction-widget`
4. Configure project:
   - **Framework Preset:** Vite
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
   - **Install Command:** `npm install`

5. Click "Deploy"

### Step 3: Configure Custom Domain (Optional)

1. Go to Project Settings → Domains
2. Add your domain: `widgets.yourdomain.com`
3. Add DNS record to your domain provider:
   ```
   Type: CNAME
   Name: widgets
   Value: cname.vercel-dns.com
   ```

### Step 4: Environment Variables (If Needed)

In Vercel dashboard → Settings → Environment Variables:

```
VITE_META_PIXEL_ID=your_pixel_id
VITE_ANALYTICS_ID=your_analytics_id
```

## Automatic Deployments

Every push to `main` branch will automatically deploy to production.

Preview deployments are created for all pull requests.

## Vercel CLI (Optional)

Install Vercel CLI for local development:

```bash
npm install -g vercel

# Login
vercel login

# Link project
vercel link

# Deploy preview
vercel

# Deploy to production
vercel --prod
```

## Performance Optimization

Vercel automatically provides:
- ✅ Global CDN
- ✅ Edge caching
- ✅ Automatic compression (Brotli/Gzip)
- ✅ Image optimization
- ✅ SSL certificates
- ✅ DDoS protection

## Monitoring

### Analytics

View in Vercel dashboard:
- Page views
- Load times
- Core Web Vitals
- Geographic distribution

### Logs

Real-time function logs available in:
Dashboard → Deployments → [Select deployment] → Logs

## Rollback

If a deployment has issues:
1. Go to Deployments
2. Find previous working deployment
3. Click "⋯" → "Promote to Production"

## Cost

**Free Tier Includes:**
- 100GB bandwidth/month
- 6,000 build minutes/month
- Unlimited projects
- Automatic SSL
- Edge network

**Pro Tier ($20/month):**
- 1TB bandwidth/month
- Password protection
- Advanced analytics
- Team collaboration

## Support

- [Vercel Documentation](https://vercel.com/docs)
- [Vite on Vercel](https://vercel.com/docs/frameworks/vite)
- [Community Discord](https://vercel.com/discord)
