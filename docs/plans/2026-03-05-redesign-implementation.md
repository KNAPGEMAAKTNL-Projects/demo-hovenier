# Redesign Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Redesign the demo-hovenier site from a luxury editorial brand to a modern, friendly, local hovenier demo site that impresses potential B2B clients.

**Architecture:** Full visual redesign — new brand (Groenrijk Hoveniers), new color palette (fresh greens + orange accent), new typography (Plus Jakarta Sans), mobile-first layout. All existing pages are rewritten. New components: DemoBanner, ReviewsSection. Existing components rewritten: Navbar, Footer, Hero, ServicesGrid, TrustBar, StickyCTA, ProjectCard. No structural changes to routing or API.

**Tech Stack:** Astro 5.17.1, React 19, Tailwind CSS v4, Framer Motion 12, lucide-react, @fontsource

**Design doc:** `docs/plans/2026-03-05-redesign-local-hovenier.md`

---

### Task 1: Create feature branch and install new font

**Files:**
- Modify: `package.json`

**Step 1: Create feature branch**

```bash
git checkout -b feature/redesign-local-hovenier
```

**Step 2: Install Plus Jakarta Sans font**

```bash
npm install @fontsource-variable/plus-jakarta-sans
```

**Step 3: Commit**

```bash
git add package.json package-lock.json
git commit -m "chore: add Plus Jakarta Sans font for redesign"
```

---

### Task 2: Update design system (global.css + Layout.astro)

**Files:**
- Modify: `src/styles/global.css` (lines 1-98)
- Modify: `src/layouts/Layout.astro` (lines 1-43)

**Step 1: Rewrite global.css**

Replace the entire `@theme` block with new colors and font. Remove `grain`, `editorial-number`, `rule-accent`, and `clip-organic` utility classes (no longer used in new design). Keep `link-underline` animation. Add new utility for card hover lift.

New theme colors:
```
--color-primary: #2E7D32
--color-primary-light: #4CAF50
--color-accent: #E8853D
--color-gray: #F5F5F5
--color-dark: #1A1A1A
--color-gold: #F59E0B
--font-sans: "Plus Jakarta Sans Variable", sans-serif
```

Remove `--font-serif`, `--color-cream`, `--color-sand`, `--color-sage`, `--color-bark`. Remove the `.grain` CSS class entirely. Remove `.editorial-number`, `.rule-accent`, `.clip-organic`.

**Step 2: Update Layout.astro**

- Replace DM Serif Display + Outfit font imports with Plus Jakarta Sans Variable import
- Remove the `heroNav` prop entirely (no longer needed — navbar is always white)
- Update default description to use "Groenrijk Hoveniers"
- Update favicon reference (keep existing for now)
- Change body classes: remove `font-sans text-dark bg-cream`, use `font-sans antialiased text-dark bg-white`
- Remove `data-hero-nav` attribute from body
- Add `<DemoBanner />` component above `<Navbar />` (created in Task 3)

**Step 3: Run dev server to verify it still loads (may have visual issues — that's expected)**

```bash
npm run dev
```

**Step 4: Commit**

```bash
git add src/styles/global.css src/layouts/Layout.astro
git commit -m "feat: update design system — new colors, fonts, remove luxury styles"
```

---

### Task 3: Create DemoBanner component

**Files:**
- Create: `src/components/DemoBanner.astro`
- Modify: `src/layouts/Layout.astro`

**Step 1: Create DemoBanner.astro**

A small fixed bar at the very top of the page:
- Height: ~36-40px
- Background: `#1A1A1A` (dark)
- White text, small font (text-xs sm:text-sm)
- Content: "Dit is een demo-website — Ook zo'n website?" + orange link "Neem contact op met KnapGemaakt.nl"
- Link href: `https://knapgemaakt.nl/` target `_blank`
- Centered text, padding x

**Step 2: Add DemoBanner to Layout.astro**

Import and render `<DemoBanner />` as the first element inside `<body>`, before `<Navbar />`.

**Step 3: Commit**

```bash
git add src/components/DemoBanner.astro src/layouts/Layout.astro
git commit -m "feat: add demo banner — signals this is a KnapGemaakt demo"
```

---

### Task 4: Rewrite Navbar

**Files:**
- Modify: `src/components/Navbar.astro` (full rewrite)

**Step 1: Rewrite Navbar.astro**

Key changes from current:
- Remove the logo image import — use text-based logo: "Groenrijk" in primary green bold + "Hoveniers" in regular weight
- Remove `Home` from nav links (logo links to home)
- Remove all `data-state` CSS (no more transparent/scrolled states)
- Simple white background always, add shadow on scroll via JS (`shadow-sm`)
- Remove the decorative bottom line
- Desktop: nav links center/right, phone button far right as green pill/button
- Phone button: green bg, white text, rounded-full, shows "06-1234 5678" on lg, just phone icon on md
- Mobile: hamburger + phone icon visible. Menu overlay uses white bg (not cream)
- Mobile menu: clean sans-serif links (not serif), green CTA button at bottom
- Account for the DemoBanner height above (add `top-9` or similar when positioning fixed header, or make banner + navbar flow together)

The navbar should NOT be transparent on any page. Always white with optional scroll shadow.

**Step 2: Verify on dev server — check mobile hamburger, desktop layout, scroll behavior**

**Step 3: Commit**

```bash
git add src/components/Navbar.astro
git commit -m "feat: rewrite navbar — white bg, text logo, phone button"
```

---

### Task 5: Rewrite Footer

**Files:**
- Modify: `src/components/Footer.astro` (full rewrite)

**Step 1: Rewrite Footer.astro**

Key changes:
- Remove logo image import — use text "Groenrijk Hoveniers" in white
- Remove decorative gradient top border
- Remove `grain` class
- Dark bg (`#1A1A1A`), white/gray text
- 4-column grid (mobile: 2x2 then stacked):
  1. **Brand column:** "Groenrijk Hoveniers" text + tagline "Uw hovenier in de Betuwe. Tuinontwerp, aanleg en onderhoud." + social icons (Facebook, Instagram, LinkedIn as icon buttons)
  2. **Pagina's:** Diensten, Projecten, Over Ons, Contact
  3. **Contact:** Phone, Email, WhatsApp links with lucide icons
  4. **Werkgebied:** Links for Culemborg, Tiel, Geldermalsen, Buren, Beusichem, Leerdam, Neerrijnen (all href="#" for now)
- Bottom bar: "© 2026 Groenrijk Hoveniers" left, "Website door KnapGemaakt.nl" right (with link)

**Step 2: Commit**

```bash
git add src/components/Footer.astro
git commit -m "feat: rewrite footer — 4 columns with werkgebied SEO placeholders"
```

---

### Task 6: Rewrite Hero component

**Files:**
- Modify: `src/components/Hero.astro` (full rewrite)

**Step 1: Rewrite Hero.astro**

Change from full-viewport cinematic to split layout:
- Remove `min-h-screen`, use comfortable padding instead (py-16 md:py-24)
- White/light background (not dark image overlay)
- Two-column grid: content left (lg:col-span-7), image right (lg:col-span-5)
- Left side content:
  - Green pill/badge: "Hovenier in de Betuwe" (bg-primary/10 text-primary rounded-full px-4 py-1 text-sm)
  - Headline: "Een mooie tuin begint bij een goede hovenier" (text-4xl md:text-5xl lg:text-6xl font-bold text-dark)
  - Subtext: "Van tuinontwerp tot onderhoud. Wij maken van uw tuin een plek om van te genieten." (text-lg text-gray-600)
  - Two CTA buttons: "Gratis Offerte Aanvragen" (bg-primary text-white rounded-lg) + "Bekijk Onze Projecten" (border border-dark rounded-lg)
  - Trust signals row: Google stars (★★★★★ 4.8 · 47 reviews) | 15+ jaar ervaring | VHG Gecertificeerd
- Right side: hero-garden.webp image with `rounded-2xl` and `object-cover`
- Mobile: single column, content first, image second, CTAs and trust signals stack
- Keep FadeIn animations but with simpler approach (just opacity + translateY)
- Remove the scroll hint, dark overlay, accent tint — all luxury elements

**Step 2: Verify hero on mobile and desktop**

**Step 3: Commit**

```bash
git add src/components/Hero.astro
git commit -m "feat: rewrite hero — split layout with trust signals"
```

---

### Task 7: Rewrite ServicesGrid as icon cards

**Files:**
- Modify: `src/components/ServicesGrid.astro` (full rewrite)

**Step 1: Rewrite ServicesGrid.astro**

Change from editorial numbered layout to clean icon cards:
- Section bg: `bg-gray` (#F5F5F5), padding py-20 md:py-28
- Section header: "Wat wij doen" label + "Onze Diensten" heading (bold sans-serif, no serif)
- 3-column grid (gap-8), mobile stacks to 1 column
- Each card:
  - White bg, rounded-xl, shadow-sm hover:shadow-md transition, p-8
  - Green icon at top (use lucide-react: Pencil/PenTool for ontwerp, Shovel/Hammer for aanleg, Scissors for onderhoud) — in a rounded green-tinted circle (bg-primary/10 w-12 h-12 flex items-center justify-center rounded-xl)
  - Title: font-bold text-xl text-dark
  - Description: text-gray-600, 2-3 lines
  - "Meer info →" link in primary green at bottom
- Remove editorial numbers, accent lines, serif fonts, border-based layout
- Keep FadeIn animation with staggered delays

**Step 2: Commit**

```bash
git add src/components/ServicesGrid.astro
git commit -m "feat: rewrite services grid — icon cards replacing editorial layout"
```

---

### Task 8: Create ReviewsSection component

**Files:**
- Create: `src/components/ReviewsSection.astro`

**Step 1: Create ReviewsSection.astro**

New component (doesn't exist yet):
- White background, py-20 md:py-28
- Header: small green label "Wat onze klanten zeggen", large heading "Beoordeeld met een 4.8 uit 47 reviews"
- Gold stars row (5 stars using inline SVG, same approach as current TrustBar but gold #F59E0B)
- Google logo/text next to stars for credibility (just text "Google Reviews" with a small icon)
- 3 review cards in a grid (md:grid-cols-3, gap-6):
  - Each card: bg-gray (#F5F5F5), rounded-xl, p-6
  - Top: 5 gold stars + time text ("2 maanden geleden")
  - Middle: review quote in text-dark (realistic Dutch text)
  - Bottom: reviewer name + location ("Marieke V. · Culemborg")
- Realistic review data (hardcoded array):
  1. "Heel blij met onze nieuwe tuin! Het team van Groenrijk heeft precies begrepen wat we wilden. Vakkundig en netjes gewerkt." — Jan de V. · Culemborg
  2. "Van ontwerp tot aanleg alles perfect geregeld. De tuin ziet er prachtig uit, zelfs mooier dan we hadden verwacht." — Marieke S. · Tiel
  3. "Al jaren ons tuinonderhoud bij Groenrijk. Altijd betrouwbaar, flexibel en de tuin ziet er het hele jaar goed uit." — Peter K. · Geldermalsen
- Below cards: centered "Bekijk alle reviews op Google →" link in primary green
- Mobile: cards stack vertically (or horizontal snap-scroll carousel using `overflow-x-auto snap-x snap-mandatory` with `snap-center` on each card, `min-w-[85vw]` per card)

**Step 2: Commit**

```bash
git add src/components/ReviewsSection.astro
git commit -m "feat: add reviews section with Google review cards"
```

---

### Task 9: Rewrite homepage (index.astro)

**Files:**
- Modify: `src/pages/index.astro` (full rewrite)

**Step 1: Rewrite index.astro**

Current structure: Hero → TrustBar → ServicesGrid → Featured Work (50/50 split) → CTA Band

New structure: Hero → ServicesGrid → ReviewsSection → Featured Project → CTA Band

- Remove `heroNav` prop from Layout (no longer exists)
- Remove TrustBar import (trust signals now in Hero)
- Add ReviewsSection import
- Featured Project section (inline, not a separate component):
  - Full-width image (hero-garden.webp or gerealiseerde-tuin.webp) with rounded-2xl, dark gradient overlay
  - Centered overlay content: "Uitgelicht Project" label, "Stadstuin in Culemborg" title, one-liner, white outline button "Bekijk dit project →"
  - Below: row of 2-3 small thumbnail project images with "Bekijk alle projecten →" link
  - Mobile: thumbnails as horizontal scroll
- CTA Band section (inline):
  - bg-primary, rounded-2xl (within max-w-7xl container for visual interest), py-16 text-center text-white
  - Heading: "Klaar voor een nieuwe tuin?"
  - Subtext: "Vraag vrijblijvend een offerte aan of bel ons direct."
  - Two buttons: "Offerte Aanvragen" (white bg, primary text) + "Bel Direct" (white outline + Phone icon)
  - Mobile: buttons stack full-width

**Step 2: Run dev server and test full homepage on mobile and desktop viewport**

**Step 3: Commit**

```bash
git add src/pages/index.astro
git commit -m "feat: rewrite homepage — new section order with reviews"
```

---

### Task 10: Update StickyCTA

**Files:**
- Modify: `src/components/StickyCTA.astro`

**Step 1: Update StickyCTA colors and border radius**

- WhatsApp button: keep `#25D366` bg, add `rounded-full`
- Phone button: change from `bg-accent` to `bg-primary` (#2E7D32), add `rounded-full`
- Both: add `rounded-full` for the new friendly feel
- Keep existing structure (fixed bottom-right, md:hidden, gap-3)

**Step 2: Commit**

```bash
git add src/components/StickyCTA.astro
git commit -m "feat: update sticky CTA — rounded buttons, new green color"
```

---

### Task 11: Rewrite ProjectCard

**Files:**
- Modify: `src/components/ProjectCard.astro` (full rewrite)

**Step 1: Rewrite ProjectCard.astro**

Change from dark overlay hover card to clean white card:
- White bg, rounded-xl, shadow-sm hover:shadow-md transition, overflow-hidden
- Image at top: aspect-[16/10], rounded-t-xl, object-cover (no dark overlay, no zoom on hover)
- Content below image: p-6
  - Category: text-sm text-primary font-medium (always visible)
  - Title: text-xl font-bold text-dark
  - Location or short description: text-gray-600 text-sm
  - Tags: flex wrap, small pills (bg-gray rounded-full px-3 py-1 text-xs text-gray-600) — always visible, not hover-dependent
  - "Bekijk project →" link in primary green, always visible
- Add `description` and `location` to Props interface
- Remove all hover-dependent opacity/translate animations (bad for mobile)

**Step 2: Commit**

```bash
git add src/components/ProjectCard.astro
git commit -m "feat: rewrite project cards — clean white cards, no hover-dependent content"
```

---

### Task 12: Rewrite projecten.astro

**Files:**
- Modify: `src/pages/projecten.astro`

**Step 1: Rewrite projecten.astro**

- Page header: white bg (not cream), "Onze Projecten" in bold sans-serif, green label above
- Update project data array: change brand references from "De Oude Stad" to "Groenrijk"
- Project grid: 2 cols desktop (md:grid-cols-2), 1 col mobile, gap-8
- Use updated ProjectCard component
- CTA band at bottom: same green band as homepage
- Remove serif fonts, accent lines, cream backgrounds

**Step 2: Commit**

```bash
git add src/pages/projecten.astro
git commit -m "feat: rewrite projects page with new card style"
```

---

### Task 13: Rewrite project detail page [slug].astro

**Files:**
- Modify: `src/pages/projecten/[slug].astro`

**Step 1: Rewrite [slug].astro**

- Update all project data: brand references from "De Oude Stad" to "Groenrijk"
- Hero: image with gradient overlay (keep this — it works for detail pages), but lighter gradient
- Remove `grain` class from hero
- Content area: white bg, clean typography (sans-serif throughout)
- Sidebar: white card with rounded-xl and shadow-sm (not bordered box)
- Icon colors: change from accent (terracotta) to primary (green)
- CTA button: bg-primary instead of bg-accent
- "Terug naar overzicht" link in primary green
- Remove all serif font references

**Step 2: Commit**

```bash
git add src/pages/projecten/[slug].astro
git commit -m "feat: rewrite project detail page with new design system"
```

---

### Task 14: Rewrite diensten.astro

**Files:**
- Modify: `src/pages/diensten.astro`

**Step 1: Rewrite diensten.astro**

- Page header: primary green bg, white text, "Onze Diensten" title
- Remove `grain` class from header
- Service sections: alternating image left/right (keep this pattern — it works)
  - Remove the decorative accent-colored offset shadow blocks behind images
  - Images get `rounded-xl` instead
  - Replace serif numbers with clean section numbering or remove entirely
  - Feature lists: use green checkmark icons (Check from lucide-react) in primary color
  - All text in sans-serif
- CTA band at bottom: primary green bg, white buttons
- Remove all cream/sand references

**Step 2: Commit**

```bash
git add src/pages/diensten.astro
git commit -m "feat: rewrite services page — clean layout, green accents"
```

---

### Task 15: Rewrite over-ons.astro

**Files:**
- Modify: `src/pages/over-ons.astro`

**Step 1: Rewrite over-ons.astro**

- Page header: white bg, "Over Ons" title with green label
- Update brand name from "De Oude Stad" to "Groenrijk Hoveniers" in all text
- Update narrative text to match new local/friendly brand voice
- Image band: keep full-width image (rounded edges optional)
- Values section: 3 cards matching services card style (white, rounded-xl, shadow-sm, green icon)
- Remove accent dots, serif fonts, cream backgrounds, grain textures
- CTA band: primary green bg

**Step 2: Commit**

```bash
git add src/pages/over-ons.astro
git commit -m "feat: rewrite about page — new brand voice and card style"
```

---

### Task 16: Rewrite contact.astro

**Files:**
- Modify: `src/pages/contact.astro`

**Step 1: Rewrite contact.astro**

- Remove the hero split section with dark primary bg
- New layout: clean white page
  - Page header: "Contact" title with green label
  - Contact methods row (3 cards): Phone, Email, WhatsApp — each in a white card with rounded-xl, shadow-sm, green icon
  - Below: two-column layout (lg:grid-cols-5)
    - Left (col-span-2): Werkgebied info + "Wat kunt u verwachten?" block
    - Right (col-span-3): Contact form in white card with rounded-xl, shadow, border
  - Simplified form fields: Naam, Telefoon, Email, Bericht (remove Onderwerp dropdown and Adres)
  - Form inputs: rounded-lg borders (not bottom-border-only style)
  - Submit button: bg-primary rounded-lg
  - Keep form handler logic (fetch to /api/send-email/)
  - Update success message styling
- Update all brand references
- Update phone, email to generic demo values

**Step 2: Verify form still submits correctly**

**Step 3: Commit**

```bash
git add src/pages/contact.astro
git commit -m "feat: rewrite contact page — simplified form, card-based contact methods"
```

---

### Task 17: Clean up unused files and references

**Files:**
- Delete: `src/components/TrustBar.astro` (trust signals moved into Hero)
- Modify: `src/pages/index.astro` (remove TrustBar import if not already done)
- Check: no remaining references to old brand "De Oude Stad", old colors (cream, sand, sage, bark), serif font, grain class

**Step 1: Delete TrustBar.astro**

```bash
rm src/components/TrustBar.astro
```

**Step 2: Search for remaining old references**

Search all `.astro` and `.tsx` files for: "De Oude Stad", "cream", "sand", "sage", "bark", "font-serif", "grain", "dm-serif", "editorial"

Fix any remaining references.

**Step 3: Remove unused font packages from imports in Layout.astro**

Make sure `@fontsource/dm-serif-display` and `@fontsource/outfit` are not imported anywhere. They can stay in package.json (no harm) but should not be imported.

**Step 4: Commit**

```bash
git add -A
git commit -m "chore: clean up old brand references and unused components"
```

---

### Task 18: Visual QA and final adjustments (UI/UX Pro Max checklist)

Reference: `design-system/groenrijk-hoveniers/MASTER.md`

**Step 1: Run dev server**

```bash
npm run dev
```

**Step 2: UI/UX Pro Max Pre-Delivery Checklist**

Run through each page (/, /diensten/, /projecten/, /projecten/stadstuin-aan-de-lek/, /over-ons/, /contact/) and verify:

**Visual Quality:**
- [ ] No emojis used as icons (use SVG: Lucide icons)
- [ ] All icons from consistent set (lucide-react)
- [ ] Hover states don't cause layout shift
- [ ] Use theme colors directly (bg-primary) not var() wrappers in Tailwind

**Interaction (CRITICAL):**
- [ ] All clickable elements have `cursor-pointer`
- [ ] All buttons/links min 44x44px touch targets (`min-h-[44px] min-w-[44px]`)
- [ ] Minimum 8px gap between adjacent touch targets (`gap-2` minimum)
- [ ] Hover states with smooth transitions (150-300ms, `transition-colors duration-200`)
- [ ] Form submit button disabled during async operations
- [ ] `touch-action: manipulation` on interactive elements to remove 300ms tap delay

**Accessibility (CRITICAL):**
- [ ] Color contrast 4.5:1 minimum for all text (test primary green on white)
- [ ] Focus states visible for keyboard navigation (focus rings)
- [ ] All images have descriptive alt text
- [ ] aria-labels on icon-only buttons (hamburger, phone, WhatsApp)
- [ ] Form inputs have proper `<label>` elements (not placeholder-only)
- [ ] Tab order matches visual order
- [ ] `prefers-reduced-motion` respected — wrap Framer Motion in reduced motion check

**Layout & Responsive:**
- [ ] Test at 375px, 768px, 1024px, 1440px
- [ ] No horizontal scroll on any viewport
- [ ] Content not hidden behind fixed navbar (account for banner + navbar height)
- [ ] Consistent max-w-7xl containers across pages
- [ ] Readable font size: minimum 16px body text on mobile
- [ ] Line height 1.5-1.75 for body text
- [ ] Line length max 65-75 characters

**Cards & Components (consistency):**
- [ ] All cards use `rounded-2xl shadow-lg p-6` consistently
- [ ] Internal card spacing uses `space-y-4`
- [ ] All buttons use consistent sizing: `px-6 py-3`
- [ ] CTA buttons same style across all pages

**Performance:**
- [ ] All non-hero images use `loading="lazy"`
- [ ] Hero image uses `loading="eager"` + `fetchpriority="high"`
- [ ] WebP images with srcset for responsive sizes
- [ ] Reserve space for images (aspect ratios) to prevent content jumping

**Step 3: Test mobile viewport (375px)**

Check each page specifically for:
- Demo banner readable (text doesn't overflow)
- Navbar: logo, hamburger menu, phone icon all visible
- Sticky CTA buttons visible and tappable
- Contact form works end-to-end
- Footer columns stack properly
- Review cards scroll horizontally

**Step 4: Test desktop viewport (1440px)**

- Demo banner centered
- Navbar: all links visible, phone button with number
- Grids show correct column counts
- No excessive whitespace or cramped sections

**Step 5: Run build to verify no errors**

```bash
npm run build
```

**Step 6: Fix any issues found, commit**

```bash
git add -A
git commit -m "fix: visual QA adjustments per UI/UX Pro Max checklist"
```

---

## Task Dependency Order

```
Task 1 (branch + font)
  → Task 2 (design system)
    → Task 3 (demo banner)
      → Task 4 (navbar)
        → Task 5 (footer)

Task 6 (hero) — depends on Task 2
Task 7 (services grid) — depends on Task 2
Task 8 (reviews section) — depends on Task 2
Task 10 (sticky CTA) — depends on Task 2

Task 9 (homepage) — depends on Tasks 6, 7, 8
Task 11 (project card) — depends on Task 2
Task 12 (projecten) — depends on Task 11
Task 13 (project detail) — depends on Task 2
Task 14 (diensten) — depends on Task 2
Task 15 (over-ons) — depends on Task 2
Task 16 (contact) — depends on Task 2

Task 17 (cleanup) — depends on all above
Task 18 (QA) — depends on Task 17
```

Parallelizable groups after Task 5 completes:
- Group A: Tasks 6, 7, 8, 10, 11 (independent components)
- Group B: Tasks 12, 13, 14, 15, 16 (pages — each only depends on Task 2 + their component)
- Group C: Tasks 17, 18 (sequential, after everything else)
