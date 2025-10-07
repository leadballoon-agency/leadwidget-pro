// Vercel Serverless Function to scrape website and extract branding
// Uses Firecrawl API to extract colors, logo, contact info

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { url } = req.body;

  // Validate URL
  if (!url) {
    return res.status(400).json({ error: 'URL is required' });
  }

  // Validate URL format
  let websiteUrl = url;
  if (!websiteUrl.startsWith('http://') && !websiteUrl.startsWith('https://')) {
    websiteUrl = 'https://' + websiteUrl;
  }

  try {
    // Call Firecrawl API
    const firecrawlApiKey = process.env.FIRECRAWL_API_KEY;

    if (!firecrawlApiKey) {
      console.error('FIRECRAWL_API_KEY not found in environment variables');
      return res.status(500).json({ error: 'API key not configured' });
    }

    // Use Firecrawl scrape endpoint with extraction
    const firecrawlResponse = await fetch('https://api.firecrawl.dev/v1/scrape', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${firecrawlApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        url: websiteUrl,
        formats: ['html', 'markdown'],
        onlyMainContent: false,
        waitFor: 2000,
        actions: [
          {
            type: 'wait',
            milliseconds: 2000
          }
        ]
      }),
    });

    if (!firecrawlResponse.ok) {
      const errorText = await firecrawlResponse.text();
      console.error('Firecrawl API error:', errorText);
      return res.status(500).json({
        error: 'Failed to fetch website',
        details: errorText
      });
    }

    const firecrawlData = await firecrawlResponse.json();

    // Extract data from the scraped content
    const extractedData = extractBrandingData(firecrawlData);

    return res.status(200).json({
      success: true,
      url: websiteUrl,
      data: extractedData,
    });

  } catch (error) {
    console.error('Scraping error:', error);
    return res.status(500).json({
      error: 'Failed to scrape website',
      message: error.message
    });
  }
}

// Extract branding data from Firecrawl response
function extractBrandingData(firecrawlData) {
  const { data } = firecrawlData;

  const html = data?.html || '';
  const markdown = data?.markdown || '';
  const metadata = data?.metadata || {};

  const result = {
    companyName: null,
    logo: null,
    primaryColor: null,
    secondaryColor: null,
    whatsapp: null,
    email: null,
    phone: null,
    sector: null,
  };

  // Extract company name from title or metadata
  result.companyName =
    metadata?.title?.split('|')[0]?.split('-')[0]?.split('–')[0]?.trim() ||
    metadata?.ogTitle?.split('|')[0]?.split('-')[0]?.trim() ||
    'Your Company';

  // Extract logo
  result.logo =
    metadata?.ogImage ||
    metadata?.image ||
    extractLogoFromHtml(html);

  // Extract colors from HTML/CSS
  const colors = extractColorsFromHtml(html);
  result.primaryColor = colors.primary;
  result.secondaryColor = colors.secondary;

  // Extract contact info
  result.whatsapp = extractWhatsApp(html, markdown);
  result.email = extractEmail(html, markdown);
  result.phone = extractPhone(html, markdown);

  // Detect sector from content
  result.sector = detectSector(html, markdown, metadata);

  return result;
}

// Detect business sector from website content
function detectSector(html, markdown, metadata) {
  const content = (html + markdown + (metadata?.description || '')).toLowerCase();

  const sectors = {
    gardens: ['garden', 'landscaping', 'landscape', 'outdoor', 'lawn', 'patio', 'decking'],
    kitchens: ['kitchen', 'worktop', 'cabinet', 'appliance'],
    bathrooms: ['bathroom', 'shower', 'bath', 'wet room', 'ensuite'],
    extensions: ['extension', 'building', 'construction', 'renovation', 'loft conversion'],
    driveways: ['driveway', 'paving', 'tarmac', 'resin', 'block paving']
  };

  let maxScore = 0;
  let detectedSector = 'gardens'; // Default

  for (const [sector, keywords] of Object.entries(sectors)) {
    let score = 0;
    for (const keyword of keywords) {
      const regex = new RegExp(`\\b${keyword}\\b`, 'gi');
      const matches = content.match(regex);
      score += matches ? matches.length : 0;
    }

    if (score > maxScore) {
      maxScore = score;
      detectedSector = sector;
    }
  }

  return detectedSector;
}

// Extract logo URL from HTML
function extractLogoFromHtml(html) {
  // Look for common logo patterns
  const logoPatterns = [
    /<img[^>]*class="[^"]*logo[^"]*"[^>]*src="([^"]+)"/i,
    /<img[^>]*id="[^"]*logo[^"]*"[^>]*src="([^"]+)"/i,
    /<img[^>]*alt="[^"]*logo[^"]*"[^>]*src="([^"]+)"/i,
    /<link[^>]*rel="icon"[^>]*href="([^"]+)"/i,
  ];

  for (const pattern of logoPatterns) {
    const match = html.match(pattern);
    if (match && match[1]) {
      return match[1];
    }
  }

  return null;
}

// Extract colors from HTML/CSS
function extractColorsFromHtml(html) {
  const colors = {
    primary: '#06b6d4', // Default cyan
    secondary: '#0891b2', // Default darker cyan
  };

  // Extract hex colors from HTML
  const hexMatches = html.match(/#([0-9a-f]{6}|[0-9a-f]{3})/gi) || [];

  // Expand 3-digit hex to 6-digit
  const hexColors = hexMatches.map(color => {
    if (color.length === 4) {
      return '#' + color[1] + color[1] + color[2] + color[2] + color[3] + color[3];
    }
    return color;
  });

  // Extract RGB colors
  const rgbMatches = html.match(/rgb\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*\)/gi) || [];
  const rgbColors = rgbMatches.map(rgbToHex);

  // Combine and filter out common colors (white, black, grays)
  const allColors = [...hexColors, ...rgbColors]
    .map(c => c.toLowerCase())
    .filter(c => {
      // Filter out whites, blacks, and grays
      if (c === '#ffffff' || c === '#fff') return false;
      if (c === '#000000' || c === '#000') return false;
      if (c.match(/#([0-9a-f])\1{5}/)) return false; // Pure grays like #333333
      return true;
    });

  // Get unique colors
  const uniqueColors = [...new Set(allColors)];

  // Count occurrences to find most common
  const colorCounts = {};
  allColors.forEach(color => {
    colorCounts[color] = (colorCounts[color] || 0) + 1;
  });

  // Sort by frequency
  const sortedColors = Object.entries(colorCounts)
    .sort((a, b) => b[1] - a[1])
    .map(entry => entry[0]);

  if (sortedColors.length > 0) {
    colors.primary = sortedColors[0];
  }
  if (sortedColors.length > 1) {
    colors.secondary = sortedColors[1];
  }

  return colors;
}

// Extract WhatsApp number
function extractWhatsApp(html, markdown) {
  // Look for wa.me links
  const waMatch = html.match(/wa\.me\/(\d+)/i) || markdown.match(/wa\.me\/(\d+)/i);
  if (waMatch) {
    return waMatch[1];
  }

  // Look for WhatsApp links in href
  const whatsappMatch = html.match(/whatsapp.*?(\d{10,15})/i);
  if (whatsappMatch) {
    return whatsappMatch[1];
  }

  return null;
}

// Extract email address
function extractEmail(html, markdown) {
  // Look for mailto: links
  const mailtoMatch = html.match(/mailto:([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/i);
  if (mailtoMatch) {
    return mailtoMatch[1];
  }

  // Look for email patterns in text
  const emailMatch = (html + markdown).match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/);
  if (emailMatch) {
    return emailMatch[1];
  }

  return null;
}

// Extract phone number
function extractPhone(html, markdown) {
  // Look for tel: links
  const telMatch = html.match(/tel:([+\d\s()-]+)/i);
  if (telMatch) {
    return telMatch[1].replace(/\s/g, '');
  }

  // Look for phone patterns (UK format)
  const phonePatterns = [
    /\+44\s?\d{10}/,
    /0\d{10}/,
    /\d{11}/,
  ];

  for (const pattern of phonePatterns) {
    const match = (html + markdown).match(pattern);
    if (match) {
      return match[0].replace(/\s/g, '');
    }
  }

  return null;
}

// Convert RGB to Hex
function rgbToHex(rgb) {
  const match = rgb.match(/\d+/g);
  if (!match || match.length < 3) return '#000000';

  const r = parseInt(match[0]);
  const g = parseInt(match[1]);
  const b = parseInt(match[2]);

  return '#' + [r, g, b].map(x => {
    const hex = x.toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  }).join('');
}
