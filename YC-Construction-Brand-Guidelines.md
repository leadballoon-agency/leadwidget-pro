# YC Construction Ltd - Brand Guidelines & Widget Design System

## Executive Summary

YC Construction is a family-run, award-winning landscaping company (Landscaper of the Year 2024) serving West and South Yorkshire. Their brand communicates **premium quality with approachable warmth** - expert craftsmanship delivered with personal care.

---

## 1. Brand Identity

### Company Positioning
- **Heritage:** 20+ years experience, family-run values
- **Authority:** Award-winning (Landscaper of the Year 2024)
- **Service Area:** West Yorkshire, South Yorkshire, surrounding areas
- **Specialization:** Garden design, landscaping, driveways, patios, interiors
- **Key Differentiator:** Premium quality with personal touch

### Target Audience (Primary: New Build Homeowners)
- **Demographics:**
  - Age: 28-45
  - Income: £40k-£80k household
  - Property: New build homes (£250k-£500k)
  - Location: Yorkshire suburbs/commuter towns

- **Psychographics:**
  - Value quality and expertise
  - Want to add value to their property
  - Frustrated with "unfinished" builder gardens
  - Seeking trusted, reliable contractors
  - Aspirational about outdoor living

---

## 2. Visual Identity

### Color Palette

**Primary Colors:**
```
Deep Charcoal/Navy (Headers, Text)
- HEX: #1a1a2e
- RGB: 26, 26, 46
- Usage: Primary text, navigation, headings

Warm Off-White (Backgrounds)
- HEX: #f8f6f3
- RGB: 248, 246, 243
- Usage: Main backgrounds, cards, sections

Bright Blue (Primary CTA)
- HEX: #0066cc
- RGB: 0, 102, 204
- Usage: Primary buttons, links, call-to-action elements
```

**Accent Colors:**
```
Golden Copper (Awards, Premium Highlights)
- HEX: #c9a961
- RGB: 201, 169, 97
- Usage: Award badges, premium callouts, icons

Deep Forest Green (Natural/Garden Context)
- HEX: #2d5016
- RGB: 45, 80, 22
- Usage: Success states, garden-specific elements

Warm Gray (Supporting)
- HEX: #6b6b6b
- RGB: 107, 107, 107
- Usage: Secondary text, borders, subtle elements
```

**Semantic Colors:**
```
Success: #2d5016 (Forest Green)
Warning: #d4825c (Terracotta)
Error: #c94141
Info: #0066cc (Blue)
```

### Typography

**Headings:**
- **Font:** Sans-serif (Inter/Montserrat/Open Sans)
- **Weight:** Semi-bold (600) for H1-H2, Medium (500) for H3-H6
- **Style:** Clean, modern, highly legible
- **Letter Spacing:** Slight spacing for H1 (+0.02em)

**Body Text:**
- **Font:** Same sans-serif family as headings
- **Weight:** Regular (400)
- **Line Height:** 1.6-1.7 for readability
- **Size:** 16px base (1rem)

**Scale:**
```
H1: 2.5rem (40px) - Mobile: 2rem (32px)
H2: 2rem (32px) - Mobile: 1.75rem (28px)
H3: 1.5rem (24px) - Mobile: 1.375rem (22px)
H4: 1.25rem (20px)
Body: 1rem (16px)
Small: 0.875rem (14px)
```

### Imagery Style

**Photography Guidelines:**
- **Lighting:** Natural daylight, golden hour preferred
- **Composition:** Clean, uncluttered, showcase craftsmanship
- **Before/After:** Side-by-side or swipe comparisons
- **Focus:** Material quality, finished details, transformation impact
- **Authenticity:** Real projects only (no stock imagery)
- **People:** Occasional inclusion of satisfied homeowners in natural settings

**Image Treatment:**
- No heavy filters
- Slight warmth adjustment acceptable
- High resolution, sharp focus
- Natural color saturation

---

## 3. Brand Voice & Messaging

### Tone of Voice

**Warm & Personal** (Not corporate)
- "Let's make garden magic"
- "We'd love to help you build it"
- Family-run, approachable language

**Expert & Confident** (Not arrogant)
- "Award-winning landscape designers"
- "20+ years experience"
- Factual authority without boasting

**Aspirational & Emotional** (Not sales-heavy)
- "Coming home to calm"
- "A space that enhances your lifestyle"
- Focus on feelings and lifestyle benefits

### Key Messaging

**Value Propositions:**
1. Award-winning expertise (Landscaper of the Year 2024)
2. 20+ years of proven quality
3. Family-run, personal service
4. Complete outdoor design services
5. Free consultations with 3D designs

**Pain Points Addressed:**
- New build gardens looking "unfinished"
- Poor drainage issues
- Lack of privacy
- Lost property value
- Unreliable contractors

---

## 4. Widget Design System

### Design Principles

1. **Mobile-First:** Optimized for smartphone users
2. **Minimal & Clean:** No clutter, generous white space
3. **Trustworthy:** Professional without being cold
4. **Engaging:** Interactive, satisfying to use
5. **Fast:** Quick load times, smooth animations

### UI Components

#### **Progress Bar**
```
Height: 4px
Background: #e0e0e0
Fill: #0066cc (Blue)
Border Radius: 2px
Animation: Smooth width transition (300ms ease)
```

#### **Question Cards**
```
Background: #ffffff
Border: 1px solid #e8e8e8
Border Radius: 12px
Shadow: 0 2px 8px rgba(0,0,0,0.06)
Padding: 24px
Margin: 16px
```

#### **Option Buttons**
```
Background: #ffffff
Border: 2px solid #e0e0e0
Border Radius: 8px
Padding: 16px 20px
Min Height: 56px (touch-friendly)
Hover: Border color #0066cc
Active: Background #f0f7ff, Border #0066cc
```

#### **Primary CTA (WhatsApp)**
```
Background: #25D366 (WhatsApp Green)
Color: #ffffff
Height: 56px
Border Radius: 12px
Font Size: 18px
Font Weight: 600
Shadow: 0 4px 12px rgba(37,211,102,0.3)
Hover: Slightly darker green
Active: Scale 0.98
```

#### **Icons**
```
Style: Line icons (Feather/Heroicons style)
Stroke Width: 2px
Size: 24px standard, 32px for emphasis
Color: Inherits from context or #6b6b6b
```

### Animation Guidelines

**Timing:**
- Page transitions: 300ms ease-in-out
- Button hover: 150ms ease
- Loading states: 400ms ease
- Success states: 500ms ease

**Types:**
- Fade in/out for content changes
- Slide up for modals/cards
- Scale for button interactions
- Smooth progress bar fills

---

## 5. Widget User Flow

### Screen Structure

**1. Hero/Entry Screen**
```
- Full viewport hero image (garden transformation)
- Headline: "Is Your New Build Garden Costing You £20k?"
- Subhead: "60-second assessment"
- CTA: "Start Assessment" button
- Progress: 0/8
```

**2-9. Question Screens** (8 questions total)
```
- Progress bar at top
- Question text (large, clear)
- Visual options (images + text)
- Skip option
- Back navigation
```

**10. Results Screen**
```
- Score display (visual gauge)
- Problem summary cards
- Recommended solution
- Social proof (awards, reviews)
- WhatsApp CTA (prominent)
- "Send us a photo" messaging
```

### Question Set

1. **Move-in timeline** (Qualification)
   - "How long ago did you move in?"
   - Options: Less than 6 months / 6-12 months / 1-2 years / 2+ years

2. **Current garden state** (Context)
   - "What did the builder leave you with?"
   - Options: Just turf/grass / Basic patio slab / Gravel and fence / Literally nothing

3. **Biggest problems** (Pain points - multi-select)
   - "What's your biggest problem right now?"
   - Options: Waterlogging/poor drainage / Overlooked by neighbors / Unsafe/uneven for kids / Looks unfinished/cheap / Wasted space

4. **Dream use case** (Aspiration)
   - "What would transform how you use your home?"
   - Options: Outdoor dining area / Safe play space for children / Low-maintenance sanctuary / Home office/garden room space / Property value boost

5. **Garden size** (Scoping)
   - "Garden size estimate?"
   - Options: Small (up to 50m²) / Medium (50-100m²) / Large (100m²+) / Not sure

6. **Timeline to start** (Urgency)
   - "When are you looking to start?"
   - Options: ASAP (next 3 months) / Planning ahead (3-6 months) / Researching (6-12 months) / Just exploring

7. **Budget range** (Qualification)
   - "What's your ideal investment range?"
   - Options: £10k-£20k / £20k-£35k / £35k-£50k / £50k+

8. **Postcode** (Location + social proof)
   - "Your postcode?"
   - Text input field

---

## 6. Scoring Algorithm

### Score Calculation (Out of 10)

**Starting Score: 10**

**Deductions:**
- Waterlogging problem: -2.0 points
- Overlooked by neighbors: -1.5 points
- Looks unfinished: -2.0 points
- Unsafe/uneven: -1.5 points
- Wasted space: -1.0 point
- Just turf (< 6 months): -1.5 points
- Just turf (6-12 months): -1.0 point
- Literally nothing: -2.5 points

**Score Interpretation:**
- **8-10:** "Finishing Touches Needed" → Essential Upgrade Package (£10k-£20k)
- **6-7.9:** "Quick Wins Available" → Premium Enhancement Package (£20k-£35k)
- **4-5.9:** "Blank Canvas" → Complete Transformation Package (£35k-£50k)
- **0-3.9:** "Urgent Attention Required" → Comprehensive Build Package (£50k+)

### Risk Assessment

**Drainage Risk:**
- High: Waterlogging selected + Move-in < 12 months + Just turf
- Medium: Waterlogging selected OR Move-in < 12 months
- Low: Neither condition

**Privacy Score:**
- Low: "Overlooked by neighbors" selected
- Medium: Not selected but small garden
- High: Not a concern

**Value Gap Estimate:**
- Based on budget range selected × 1.5
- Example: £20k-£35k budget = £30k-£52k value add

---

## 7. Technical Specifications

### Responsive Breakpoints
```
Mobile: 320px - 767px (primary focus)
Tablet: 768px - 1023px
Desktop: 1024px+
```

### Performance Targets
```
Initial Load: < 2 seconds
Time to Interactive: < 3 seconds
Lighthouse Score: 90+
Core Web Vitals: All "Good"
Bundle Size: < 100kb gzipped
```

### Browser Support
```
Chrome/Edge: Last 2 versions
Safari: Last 2 versions (iOS 14+)
Firefox: Last 2 versions
```

### Tech Stack
```
Framework: React 18 + TypeScript
Build Tool: Vite
Styling: Tailwind CSS (custom YC theme)
Animation: Framer Motion
State: React Context or Zustand
Embed: Vanilla JS with Shadow DOM
```

---

## 8. WhatsApp Integration

### Pre-filled Message Template
```
Hi! I just completed the garden assessment.

My Score: [X]/10
Issues: [Drainage, Privacy, etc.]
Budget: [£20k-£35k]
Timeline: [ASAP/3-6 months]

Here's a photo of my garden:
```

### Implementation
```javascript
const whatsappUrl = `https://wa.me/447553035444?text=${encodeURIComponent(message)}`;
window.open(whatsappUrl, '_blank');
```

### Contact Details
```
Primary Phone: 07553 035444
Alt Phone: 07309 576548
Email: marketing@ycconstructionltd.co.uk
Response Time: Within 2 hours (Mon-Fri, 9am-6pm)
```

---

## 9. Content Guidelines

### Writing Style

**Do:**
- Use "you" and "your" (conversational)
- Write in short, scannable sentences
- Focus on benefits, not features
- Include specific numbers ("20+ years", "£20k value")
- Ask questions to engage

**Don't:**
- Use industry jargon without explanation
- Write long paragraphs
- Make unsubstantiated claims
- Use clichés ("cutting-edge", "world-class")
- Be overly formal or stiff

### Example Copy

**Good:**
"New build gardens often have hidden drainage issues. We've fixed this problem in 47 local homes—and we'll make sure yours is built to last."

**Avoid:**
"Our cutting-edge drainage solutions leverage industry-leading techniques to provide world-class water management systems."

---

## 10. Embedding Instructions

### WordPress Integration

**Step 1: Add Script to Header**
```html
<script src="https://cdn.yc-garden-widget.com/embed.js" defer></script>
```

**Step 2: Add Container to Page**
```html
<div id="yc-garden-assessment"></div>
```

**Step 3: Optional Configuration**
```html
<script>
  window.ycGardenConfig = {
    primaryColor: '#0066cc',
    accentColor: '#c9a961',
    phone: '07553035444',
    email: 'marketing@ycconstructionltd.co.uk'
  };
</script>
```

---

## 11. Analytics & Tracking

### Key Metrics to Track

**Engagement:**
- Widget load rate
- Start rate (clicked "Start Assessment")
- Completion rate (reached results page)
- Average time on widget
- Question drop-off points

**Conversion:**
- WhatsApp click rate
- Lead capture rate
- Hot lead percentage (budget >£30k + timeline <3 months)
- Cost per qualified lead

**Quality:**
- Lead-to-appointment conversion
- Appointment-to-quote conversion
- Quote-to-win rate

### Event Tracking (Meta Pixel)
```javascript
// Page view
fbq('track', 'ViewContent', {content_name: 'Garden Assessment'});

// Started assessment
fbq('track', 'Lead', {content_category: 'Assessment Started'});

// Reached results
fbq('track', 'CompleteRegistration', {value: 1.00, currency: 'GBP'});

// Clicked WhatsApp
fbq('track', 'Contact', {content_name: 'WhatsApp Click'});

// Custom conversion for hot leads
fbq('trackCustom', 'HotLead', {
  budget: '£30k-£50k',
  timeline: 'ASAP',
  score: 5.5
});
```

---

## 12. Success Criteria

### Phase 1 (MVP - First Month)
- [ ] Widget live on YC Construction website
- [ ] 100+ completions
- [ ] 20%+ WhatsApp click rate
- [ ] 10+ qualified leads generated
- [ ] Positive client feedback

### Phase 2 (Optimization - Months 2-3)
- [ ] A/B test question variations
- [ ] Optimize for mobile (98%+ users)
- [ ] Reduce drop-off rate to <30%
- [ ] Improve lead quality score
- [ ] Add social proof elements

### Phase 3 (Scale - Months 4-6)
- [ ] White-label for other contractors
- [ ] Add email capture option
- [ ] Build lead nurture sequences
- [ ] Integration with CRM
- [ ] ROI tracking dashboard

---

## Appendix: Competitor Analysis

### What Makes YC Construction Different

**vs. Volume Landscapers:**
- Family-run vs. corporate
- Award-winning quality
- Personalized design process
- 3D visualizations included

**vs. Local Handymen:**
- 20+ years established business
- Professional certifications
- Comprehensive insurance
- Full project management

**vs. Premium Designers:**
- More accessible pricing
- Faster turnaround times
- Local knowledge (Yorkshire focus)
- Finance options available

---

**Document Version:** 1.0
**Last Updated:** October 2025
**Contact:** Mark Taylor
