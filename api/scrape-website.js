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

    // Use Firecrawl scrape endpoint with LLM extraction
    const firecrawlResponse = await fetch('https://api.firecrawl.dev/v1/scrape', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${firecrawlApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        url: websiteUrl,
        formats: [
          'html',
          'markdown',
          {
            type: 'extract',
            schema: {
              companyName: {
                type: 'string',
                description: 'The company or business name from the website title or header'
              },
              primaryColor: {
                type: 'string',
                description: 'The primary brand color used on the website (hex code format like #0066cc)'
              },
              secondaryColor: {
                type: 'string',
                description: 'The secondary or accent color used on the website (hex code format)'
              },
              logo: {
                type: 'string',
                description: 'The URL of the company logo image'
              },
              email: {
                type: 'string',
                description: 'The contact email address found on the website'
              },
              phone: {
                type: 'string',
                description: 'The phone number found on the website'
              },
              whatsapp: {
                type: 'string',
                description: 'The WhatsApp number or wa.me link found on the website'
              }
            }
          }
        ],
        onlyMainContent: false,
        waitFor: 2000,
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

  // Get LLM-extracted data (this is the good stuff!)
  const extracted = data?.extract || {};

  // Fallback to manual extraction if needed
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
  };

  // Use LLM-extracted data first, fallback to manual extraction
  result.companyName =
    extracted.companyName ||
    metadata.title?.split('|')[0]?.trim() ||
    metadata.title?.split('-')[0]?.trim() ||
    'Your Company';

  result.logo =
    extracted.logo ||
    metadata.ogImage ||
    extractLogoFromHtml(html);

  result.primaryColor =
    extracted.primaryColor ||
    extractColorsFromHtml(html).primary;

  result.secondaryColor =
    extracted.secondaryColor ||
    extractColorsFromHtml(html).secondary;

  result.whatsapp =
    extracted.whatsapp ||
    extractWhatsApp(html, markdown);

  result.email =
    extracted.email ||
    extractEmail(html, markdown);

  result.phone =
    extracted.phone ||
    extractPhone(html, markdown);

  return result;
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
    primary: '#0066cc',
    secondary: '#c9a961',
  };

  // Extract inline styles and style tags
  const hexColors = html.match(/#[0-9a-f]{6}/gi) || [];
  const rgbColors = html.match(/rgb\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*\)/gi) || [];

  // Get unique colors and pick most common ones
  const allColors = [...new Set([...hexColors, ...rgbColors.map(rgbToHex)])];

  if (allColors.length > 0) {
    colors.primary = allColors[0];
  }
  if (allColors.length > 1) {
    colors.secondary = allColors[1];
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
