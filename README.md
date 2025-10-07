# YC Construction - New Build Garden Assessment Widget

An elegant, mobile-first assessment tool that helps new homeowners understand their garden needs and connects them with YC Construction via WhatsApp.

## Features

- 🎨 **Branded Design** - Matches YC Construction's visual identity perfectly
- 📱 **Mobile-First** - Optimized for smartphone users (98% of traffic)
- ⚡ **Fast & Lightweight** - <100kb gzipped bundle
- 💬 **WhatsApp Integration** - Direct lead capture with pre-filled messages
- 📊 **Smart Scoring** - Intelligent assessment algorithm
- 🎯 **High Conversion** - Designed to qualify leads effectively

## Tech Stack

- **React 18** + **TypeScript** - Type-safe component development
- **Vite** - Lightning-fast build tool
- **Tailwind CSS** - Utility-first styling with custom YC theme
- **Framer Motion** - Smooth, professional animations
- **Zustand** - Lightweight state management

## Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
src/
├── components/          # React components
│   ├── HeroScreen.tsx  # Landing screen
│   ├── QuestionCard.tsx # Question flow
│   ├── ResultsScreen.tsx # Results + WhatsApp CTA
│   └── ProgressBar.tsx  # Progress indicator
├── data/               # Static data
│   ├── questions.ts    # Assessment questions
│   └── packages.ts     # Service packages
├── store/              # State management
│   └── assessmentStore.ts # Zustand store
├── utils/              # Utilities
│   └── scoring.ts      # Scoring algorithm
├── types.ts            # TypeScript types
├── App.tsx             # Main app component
└── main.tsx            # Entry point
```

## Embedding on WordPress

### Option 1: Direct Script Tag

Add to your page or post:

```html
<div id="yc-garden-assessment"></div>
<script src="https://your-cdn.com/yc-widget.js"></script>
```

### Option 2: WordPress Plugin (Coming Soon)

Install the YC Garden Widget plugin from WordPress admin.

## Configuration

You can customize the widget by setting a global config:

```html
<script>
  window.ycGardenConfig = {
    primaryColor: '#0066cc',    // YC Blue
    accentColor: '#c9a961',     // YC Gold
    phone: '07553035444',       // WhatsApp number
    email: 'marketing@ycconstructionltd.co.uk'
  };
</script>
```

## Analytics Integration

### Meta Pixel Events

The widget automatically tracks these events:

```javascript
// Widget loaded
fbq('track', 'ViewContent', {content_name: 'Garden Assessment'});

// Started assessment
fbq('track', 'Lead', {content_category: 'Assessment Started'});

// Completed assessment
fbq('track', 'CompleteRegistration', {value: 1.00, currency: 'GBP'});

// Clicked WhatsApp
fbq('track', 'Contact', {content_name: 'WhatsApp Click'});

// Hot lead (budget >£30k + timeline <3 months)
fbq('trackCustom', 'HotLead', {...});
```

## Scoring Algorithm

**Starting Score:** 10/10

**Deductions:**
- Waterlogging/drainage: -2.0
- Privacy issues: -1.5
- Looks unfinished: -2.0
- Safety concerns: -1.5
- Wasted space: -1.0
- Just turf (<6 months): -1.5
- No landscaping: -2.5

**Score Interpretation:**
- **8-10:** Finishing Touches → Essential Upgrade (£10k-£20k)
- **6-7.9:** Quick Wins → Premium Enhancement (£20k-£35k)
- **4-5.9:** Blank Canvas → Complete Transformation (£35k-£50k)
- **0-3.9:** Urgent → Comprehensive Build (£50k+)

## WhatsApp Message Format

Pre-filled message includes:
- Assessment score
- Identified problems
- Budget range
- Timeline
- Postcode (optional)

Example:
```
Hi! I just completed the garden assessment.

My Score: 6.5/10
Issues: Poor drainage, Lack of privacy
Budget: £20k-£35k
Timeline: ASAP (next 3 months)
Postcode: WF9 4EA

Here's a photo of my garden:
```

## Development

### Local Development

```bash
npm run dev
```

Visit http://localhost:5173

### Building for Production

```bash
npm run build
```

Output will be in `dist/` directory.

### Type Checking

```bash
npx tsc --noEmit
```

## Performance

- **Initial Load:** <2 seconds
- **Time to Interactive:** <3 seconds
- **Bundle Size:** <100kb gzipped
- **Lighthouse Score:** 90+ (target)

## Browser Support

- Chrome/Edge: Last 2 versions
- Safari: Last 2 versions (iOS 14+)
- Firefox: Last 2 versions

## License

Proprietary - © 2025 YC Construction Ltd

## Support

For technical issues or questions:
- Email: dev@yc-construction.com
- Phone: 07553 035444

## Roadmap

### Phase 1 (Current)
- ✅ Core assessment flow
- ✅ WhatsApp integration
- ✅ Mobile-first design
- ✅ YC branding

### Phase 2 (Next 4 weeks)
- [ ] Email capture option
- [ ] A/B testing framework
- [ ] Enhanced analytics
- [ ] CRM integration

### Phase 3 (Future)
- [ ] Photo upload feature
- [ ] AI-powered recommendations
- [ ] White-label version
- [ ] WordPress plugin
