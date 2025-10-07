# Vercel API Key Setup Guide

## Add Firecrawl API Key to Vercel

Your self-branding widget is now deployed to Vercel! To make it work, you need to add the Firecrawl API key as an environment variable.

### Quick Setup (2 minutes)

1. **Go to Vercel Dashboard**
   - Visit: https://vercel.com/dashboard
   - Select your project: `leadwidget-pro`

2. **Navigate to Environment Variables**
   - Click **Settings** tab
   - Click **Environment Variables** in left sidebar

3. **Add the API Key**
   - Variable name: `FIRECRAWL_API_KEY`
   - Value: `fc-c5b245d0e6f94e2588c143f940a353d4`
   - Environments: Select **all three**:
     - ✅ Production
     - ✅ Preview
     - ✅ Development
   - Click **Save**

4. **Redeploy (Important!)**
   - Go to **Deployments** tab
   - Click on the latest deployment
   - Click **⋯** (three dots menu)
   - Select **Redeploy**
   - Check "Use existing Build Cache"
   - Click **Redeploy**

### Verify It Works

After redeployment completes (~2 minutes):

1. Visit your production URL (check Vercel dashboard for URL)
2. Find the "See Your Custom Widget" section
3. Enter a website: `ycconstructionltd.co.uk`
4. Click "Create My Branded Widget"
5. You should see:
   - "Analyzing your website..." loader
   - Widget rebrands with YC Construction colors (blue/gold)
   - Shows extracted contact info

### Troubleshooting

**If you see "Failed to analyze website":**
- Check API key is saved correctly (no extra spaces)
- Verify you redeployed after adding the key
- Check Vercel logs: Dashboard → Your Project → Logs

**Still not working?**
```bash
# Check Vercel logs from CLI
vercel logs --project=leadwidget-pro
```

### Configure leadwidgetpro.com Domain

Once the API key is working:

1. **In Vercel Dashboard:**
   - Settings → Domains
   - Click "Add Domain"
   - Enter: `leadwidgetpro.com`
   - Click "Add"

2. **Follow Vercel's DNS Instructions:**
   - Copy the provided DNS records
   - Add them to your domain registrar (where you bought the domain)
   - Wait 5-60 minutes for DNS propagation

3. **Add www subdomain (optional but recommended):**
   - Click "Add Domain" again
   - Enter: `www.leadwidgetpro.com`
   - Set to redirect to `leadwidgetpro.com`

### Production Checklist

- [ ] API key added to Vercel
- [ ] Redeployment completed
- [ ] Tested self-branding widget works
- [ ] Domain leadwidgetpro.com configured
- [ ] DNS records updated
- [ ] Test landing page at leadwidgetpro.com
- [ ] Verify widget loads correctly
- [ ] Test qualification flow end-to-end

---

**Next Steps After Setup:**
1. Test the widget with 3-5 construction company websites
2. Share with potential customers
3. Monitor conversion rates
4. Iterate based on feedback

**Estimated Setup Time:** 5-10 minutes
