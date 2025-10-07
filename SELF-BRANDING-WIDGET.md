# Self-Branding Widget Setup

## Overview

The LeadWidget Pro landing page now includes an intelligent self-branding widget that automatically extracts brand colors, logo, company name, and contact information from a user's website.

## How It Works

1. **User enters their website URL** (e.g., "mylandscaping.com")
2. **Vercel serverless function** calls Firecrawl API to scrape the site
3. **Extract branding data**:
   - Primary & secondary brand colors
   - Company logo
   - Company name
   - WhatsApp number
   - Email address
   - Phone number
4. **Widget rebrands instantly** with user's colors
5. **Continue qualification** with personalized widget
6. **Show preview** with their branding applied

## Setup Instructions

### 1. Get Firecrawl API Key

1. Go to [https://firecrawl.dev](https://firecrawl.dev)
2. Sign up for an account
3. Get your API key from the dashboard
4. Pricing: Pay-as-you-go (affordable for most use cases)

### 2. Add API Key to Vercel

**Option A: Via Vercel Dashboard**
1. Go to your Vercel project
2. Settings → Environment Variables
3. Add variable:
   - Name: `FIRECRAWL_API_KEY`
   - Value: `your_api_key_here`
   - Environments: Production, Preview, Development
4. Save

**Option B: Via Vercel CLI**
```bash
vercel env add FIRECRAWL_API_KEY
# Paste your API key when prompted
# Select: Production, Preview, Development
```

### 3. Redeploy

After adding the environment variable, redeploy:

```bash
git add .
git commit -m "Add self-branding widget with Firecrawl"
git push origin main
```

Vercel will auto-deploy with the new API key.

### 4. Test It

1. Visit your landing page
2. Wait 3 seconds for widget to appear
3. Click "Is LeadWidget Pro Right for You?"
4. Enter a website URL (try: `ycconstructionltd.co.uk`)
5. Click "Create My Branded Widget"
6. Watch the widget rebrand with their colors!

## API Endpoint

### `/api/scrape-website`

**Request:**
```json
POST /api/scrape-website
{
  "url": "mylandscaping.com"
}
```

**Response:**
```json
{
  "success": true,
  "url": "https://mylandscaping.com",
  "data": {
    "companyName": "My Landscaping Ltd",
    "logo": "https://mylandscaping.com/logo.png",
    "primaryColor": "#0066cc",
    "secondaryColor": "#c9a961",
    "whatsapp": "447553035444",
    "email": "info@mylandscaping.com",
    "phone": "07553035444"
  }
}
```

## Features

### Extracted Data

- **Company Name**: From `<title>`, meta tags, or main heading
- **Logo**: From header images, favicon, or og:image
- **Primary Color**: Extracted from CSS, inline styles, and images
- **Secondary Color**: Second most common color
- **WhatsApp**: From wa.me links or contact sections
- **Email**: From mailto: links or contact pages
- **Phone**: From tel: links or formatted phone numbers

### Smart Detection

The API uses multiple fallback strategies:
- Regex patterns for contact info
- CSS color extraction
- Common HTML patterns (logo classes, IDs)
- Meta tag parsing

## Cost Estimation

**Firecrawl Pricing** (as of October 2025):
- ~$0.01 - $0.05 per scrape (depending on page complexity)
- First 100 scrapes/month often free
- Budget ~$10-20/month for moderate traffic

**For 1000 widget interactions:**
- Cost: $10-50/month
- Value: Potential to convert 10-20 clients at £499/month = £4,990-£9,980/month
- **ROI: 100-500x**

## Troubleshooting

### Widget shows "Failed to analyze website"

**Check:**
1. Is `FIRECRAWL_API_KEY` set in Vercel?
2. Did you redeploy after setting the key?
3. Is the website URL valid and accessible?
4. Check Vercel logs for errors

**View logs:**
```bash
vercel logs
```

### Colors not extracted correctly

Some websites use:
- CSS variables (harder to extract)
- Images for colors (requires visual analysis)
- Dynamic color loading (JavaScript)

**Fallback**: Default colors will be used.

### WhatsApp/Email not found

Some sites:
- Hide contact info behind forms
- Use JavaScript to load contact details
- Obfuscate email addresses

**Fallback**: Widget will show generic CTA without prefilled contact.

## Future Enhancements

Potential improvements:
1. **Screenshot analysis** - Extract colors from visual layout
2. **Logo upload** - Allow manual logo upload if not found
3. **Color picker** - Let user adjust colors if extraction is wrong
4. **CRM integration** - Auto-save leads to database
5. **Email automation** - Send branded widget demo via email

## Technical Architecture

```
Landing Page (HTML/JS)
  ↓ (POST /api/scrape-website)
Vercel Serverless Function
  ↓ (Firecrawl API)
Website Scraping
  ↓
Brand Data Extraction
  ↓
Return JSON
  ↓
Widget Rebrands Instantly
```

## Security

- ✅ API key stored securely in Vercel environment variables
- ✅ Never exposed to frontend/browser
- ✅ Rate limiting on Vercel edge functions
- ✅ Input validation for URLs
- ✅ CORS properly configured

---

**Status**: Ready for production
**Last Updated**: October 7, 2025
**Version**: 1.0.0
