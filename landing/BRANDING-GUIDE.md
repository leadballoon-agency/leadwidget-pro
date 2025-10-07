# LeadWidget Pro - Brand Identity Guide

## Brand Positioning

**What We Do:**
Premium engagement widgets that train Meta's Andromeda AI to find high-quality customers.

**Who We Serve:**
Construction, landscaping, and trade businesses spending £2k-10k/month on Meta ads.

**Value Proposition:**
We build the tools that teach Meta's AI what your best customers look like. Lower CPL, higher quality leads, zero campaign management complexity.

---

## Visual Identity

### Color Palette

**Primary Colors:**

**Slate (Background & Text)**
- Slate 950: `#020617` - Primary background
- Slate 900: `#0f172a` - Secondary background
- Slate 800: `#1e293b` - Card backgrounds
- Slate 700: `#334155` - Borders
- Slate 600: `#475569` - Muted text
- Slate 500: `#64748b` - Secondary text
- Slate 400: `#94a3b8` - Tertiary text
- Slate 300: `#cbd5e1` - Light borders
- Slate 200: `#e2e8f0` - Very light backgrounds
- Slate 100: `#f1f5f9` - Near white
- Slate 50: `#f8fafc` - White background alternative

**Cyan (Primary Accent)**
- Cyan 500: `#06b6d4` - Primary CTA, links, highlights
- Cyan 400: `#22d3ee` - Hover states
- Cyan 600: `#0891b2` - Pressed states
- Cyan 300: `#67e8f9` - Light accents
- Cyan 50: `#ecfeff` - Background tints

**Teal (Secondary Accent)**
- Teal 500: `#14b8a6` - Secondary CTAs, badges
- Teal 400: `#2dd4bf` - Hover states
- Teal 600: `#0d9488` - Pressed states

**Supporting Colors:**

**Success (Green)**
- Emerald 500: `#10b981` - Success states, checkmarks
- Emerald 50: `#ecfdf5` - Success backgrounds

**Warning (Amber)**
- Amber 500: `#f59e0b` - Warning states
- Amber 50: `#fffbeb` - Warning backgrounds

**Error (Rose)**
- Rose 500: `#f43f5e` - Error states
- Rose 50: `#fff1f2` - Error backgrounds

---

## Typography

### Font Family

**Primary Font: Inter**
```
font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', sans-serif;
```

**Why Inter:**
- Modern, clean, tech-forward
- Excellent readability at all sizes
- Professional yet approachable
- Variable font with precise weight control

### Font Weights

- **Light (300):** Large hero text, subtle emphasis
- **Regular (400):** Body text, paragraphs
- **Medium (500):** Subheadings, emphasis
- **Semibold (600):** Section headings, cards
- **Bold (700):** Hero headlines, primary CTAs
- **Extrabold (800):** Impact text (use sparingly)

### Type Scale

**Hero Section:**
- Headline: 4.5rem (72px) / Line height: 1.1 / Weight: 800
- Subheadline: 1.5rem (24px) / Line height: 1.6 / Weight: 400

**Section Headings:**
- H2: 3rem (48px) / Line height: 1.2 / Weight: 700
- H3: 2rem (32px) / Line height: 1.3 / Weight: 600
- H4: 1.5rem (24px) / Line height: 1.4 / Weight: 600

**Body Text:**
- Large: 1.25rem (20px) / Line height: 1.6 / Weight: 400
- Regular: 1rem (16px) / Line height: 1.6 / Weight: 400
- Small: 0.875rem (14px) / Line height: 1.5 / Weight: 400
- Tiny: 0.75rem (12px) / Line height: 1.4 / Weight: 500

---

## Layout System

### Grid

**Container Widths:**
- Max width: 1280px (xl)
- Content width: 1024px (lg)
- Narrow width: 768px (md)

**Spacing Scale:**
```
0   → 0
1   → 0.25rem (4px)
2   → 0.5rem (8px)
3   → 0.75rem (12px)
4   → 1rem (16px)
6   → 1.5rem (24px)
8   → 2rem (32px)
12  → 3rem (48px)
16  → 4rem (64px)
20  → 5rem (80px)
24  → 6rem (96px)
32  → 8rem (128px)
```

### Section Spacing

- Section padding (mobile): 4rem (64px) vertical
- Section padding (desktop): 6rem (96px) vertical
- Element spacing: 2rem (32px) between major elements

---

## Components

### Buttons

**Primary CTA:**
```css
background: linear-gradient(135deg, #06b6d4 0%, #0891b2 100%);
padding: 1rem 2rem;
border-radius: 0.75rem;
font-weight: 600;
font-size: 1.125rem;
box-shadow: 0 10px 25px -5px rgba(6, 182, 212, 0.4);
transition: all 0.3s ease;
```

**Hover State:**
```css
transform: translateY(-2px);
box-shadow: 0 15px 30px -5px rgba(6, 182, 212, 0.5);
```

**Secondary Button:**
```css
background: transparent;
border: 2px solid #475569;
color: #e2e8f0;
```

### Cards

**Default Card:**
```css
background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
border: 1px solid #334155;
border-radius: 1rem;
padding: 2rem;
box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
```

**Hover State:**
```css
border-color: #06b6d4;
transform: translateY(-4px);
box-shadow: 0 8px 30px rgba(6, 182, 212, 0.2);
```

### Badges

**Feature Badge:**
```css
background: linear-gradient(135deg, #14b8a6 0%, #0d9488 100%);
color: white;
padding: 0.5rem 1rem;
border-radius: 9999px;
font-size: 0.875rem;
font-weight: 600;
```

---

## Design Principles

### 1. Clean & Minimal
- Generous whitespace
- Clear visual hierarchy
- No clutter or unnecessary elements
- Let content breathe

### 2. Modern & Tech-Forward
- Subtle gradients
- Smooth animations
- Glass morphism effects (subtle)
- Dark mode aesthetic

### 3. Professional & Trustworthy
- Clean typography
- Consistent spacing
- High-quality visuals
- Clear value propositions

### 4. Conversion-Focused
- Clear CTAs
- Obvious next steps
- Minimal friction
- Trust signals prominent

---

## Visual Effects

### Gradients

**Primary Gradient:**
```css
background: linear-gradient(135deg, #06b6d4 0%, #0891b2 100%);
```

**Background Gradient:**
```css
background: linear-gradient(180deg, #020617 0%, #0f172a 100%);
```

**Card Gradient:**
```css
background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
```

### Shadows

**Card Shadow:**
```css
box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
```

**Elevated Shadow:**
```css
box-shadow: 0 8px 30px rgba(0, 0, 0, 0.4);
```

**Glow Effect (CTA):**
```css
box-shadow: 0 10px 25px -5px rgba(6, 182, 212, 0.4);
```

### Animations

**Fade In:**
```css
animation: fadeIn 0.6s ease-out;
```

**Slide Up:**
```css
animation: slideUp 0.8s ease-out;
```

**Scale On Hover:**
```css
transition: transform 0.3s ease;
transform: scale(1.05);
```

---

## Iconography

**Style:** Outline icons (Heroicons or Lucide)
**Stroke Width:** 2px
**Size Scale:** 16px, 20px, 24px, 32px
**Color:** Inherit from text or use cyan-500 for highlights

**Common Icons:**
- ✓ Checkmark (success, features)
- → Arrow (CTAs, navigation)
- ⚡ Lightning (speed, performance)
- 🎯 Target (precision, accuracy)
- 📊 Chart (analytics, results)
- 🔒 Lock (security, privacy)

---

## Voice & Tone

### Brand Voice

**Professional but Approachable:**
- Clear, direct language
- No jargon (unless necessary)
- Confident but not arrogant
- Helpful, not pushy

**Example Headlines:**
- ✅ "Stop Wasting Money on Meta Ads That Don't Convert"
- ✅ "Your Widget. Their Engagement. Smarter AI."
- ✅ "Train Meta's AI to Find Your Best Customers"
- ❌ "Revolutionary AI-Powered Widget Platform" (too buzzwordy)
- ❌ "The Ultimate Solution for Digital Marketing" (too generic)

### Writing Style

**Headlines:**
- Clear benefit-driven
- 8-12 words maximum
- Active voice
- Specific numbers when possible

**Body Copy:**
- Short sentences (15-20 words)
- Clear paragraphs (3-4 sentences)
- Scannable format
- Bullet points for lists

**CTAs:**
- Action-oriented verbs
- Clear outcome
- No friction
- Examples: "Start Free Trial", "See How It Works", "Get Your Widget"

---

## Brand Assets

### Logo (To Be Designed)

**Primary Logo:**
- Wordmark: "LeadWidget Pro"
- Icon: Stylized widget/chart symbol
- Format: SVG for scalability

**Color Variations:**
- Light version: Cyan gradient
- Dark version: White text
- Monochrome: Single color for specific uses

### Imagery Style

**Photography:**
- High-quality, professional
- People using technology
- Construction/trade environments
- Natural lighting, modern aesthetic

**Graphics:**
- Minimal, clean illustrations
- 2D flat style with subtle depth
- Consistent color palette
- SVG format preferred

---

## Usage Examples

### Hero Section
```
Background: Slate 950 with subtle gradient
Headline: White (Slate 50), 72px, Extrabold
Subheadline: Slate 400, 24px, Regular
CTA: Cyan gradient button with glow effect
Supporting text: Slate 500, 16px
```

### Feature Cards
```
Background: Slate 800 with gradient
Border: Slate 700, hover → Cyan 500
Icon: Cyan 500, 32px
Title: White (Slate 50), 24px, Semibold
Description: Slate 400, 16px, Regular
```

### Pricing Section
```
Background: Slate 900
Card: Slate 800 with border
Popular badge: Teal gradient
Price: White, 48px, Bold
Features: Slate 300 with checkmarks (Emerald 500)
CTA: Cyan gradient button
```

---

## Accessibility

### Contrast Ratios

**Text on Backgrounds:**
- Slate 50 on Slate 950: ✅ AAA (21:1)
- Slate 400 on Slate 950: ✅ AA (7:1)
- Cyan 500 on Slate 950: ✅ AAA (8.5:1)

### Focus States

**All interactive elements:**
```css
focus:outline-none
focus:ring-2
focus:ring-cyan-500
focus:ring-offset-2
focus:ring-offset-slate-950
```

---

## Responsive Breakpoints

```css
sm: 640px   (Mobile landscape)
md: 768px   (Tablet)
lg: 1024px  (Desktop)
xl: 1280px  (Large desktop)
2xl: 1536px (Extra large)
```

**Mobile-First Approach:**
- Design for mobile (375px) first
- Scale up for larger screens
- Hide complexity on mobile
- Progressive enhancement

---

## File Naming Convention

```
component-name.tsx
component-name.module.css
ComponentName.stories.tsx
```

**Assets:**
```
logo-primary.svg
logo-monochrome.svg
icon-feature-name.svg
image-hero-background.jpg
```

---

**Brand Created:** October 2025
**Version:** 1.0.0
**Last Updated:** October 7, 2025
