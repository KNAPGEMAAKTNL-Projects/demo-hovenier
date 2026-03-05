# Redesign: Local Hovenier Demo Website

## Context

The current site is styled as a luxury editorial hovenier brand ("De Oude Stad Hoveniers") with cinematic heroes, serif typography, and muted earth tones. This doesn't resonate with the target audience: local hoveniers looking for new customers who want a modern, helpful, local-feeling website.

The site is a B2B demo — shown to hoveniers to sell them on getting a similar website built by KnapGemaakt.nl.

## Goals

- Shift from luxury brand to modern local business that generates leads
- Make it obvious this is a demo built by KnapGemaakt.nl
- Mobile-first experience (hoveniers will view on phone)
- Demonstrate lead-generation features: easy contact, social proof, clear services

## New Brand

**Name:** Groenrijk Hoveniers
**Tagline:** "Uw tuin, onze passie"
**Region:** Betuwe / Rivierenland

## Design System

### Color Palette
- Primary green: `#2E7D32` (fresh, alive — not dark forest)
- Light green: `#4CAF50` (for accents, badges)
- Accent orange: `#E8853D` (friendly, stands out on green)
- Background white: `#FFFFFF`
- Section gray: `#F5F5F5`
- Text dark: `#1A1A1A`
- Gold (stars): `#F59E0B`

### Typography
- Headings + body: bold friendly sans-serif (Plus Jakarta Sans or Inter)
- No serif fonts — too editorial for local vibe

### Visual Style
- Clean white/gray backgrounds, no grain textures
- Subtle shadows and rounded corners on cards
- Bright, sunny garden photos (not dark/cinematic)
- Simple line icons for services
- No editorial numbering (01/02/03)

## Page Designs

### All Pages: Demo Banner
- Fixed at very top (~36px), dark background (`#1A1A1A`)
- Text: "Dit is een demo-website - Ook zo'n website? Neem contact op met KnapGemaakt.nl"
- "KnapGemaakt.nl" is an orange accent link
- Always visible above navbar

### All Pages: Navbar
- White background, sticky on scroll with subtle shadow
- Left: Groenrijk Hoveniers logo/text
- Center/right: Diensten, Projecten, Over Ons, Contact
- Far right: phone number as green button ("Bel ons: 06-1234 5678")
- Mobile: hamburger menu + phone icon always visible

### All Pages: Sticky Mobile CTA
- Phone + WhatsApp floating buttons at bottom-right (md:hidden)
- Styled in green/orange palette

### All Pages: Footer
- Dark charcoal (`#1A1A1A`) background
- 4 columns (mobile: stacked):
  1. Brand: logo + 1-line description + social icons
  2. Pagina's: Diensten, Projecten, Over Ons, Contact
  3. Contact: Phone, email, WhatsApp, werkgebied
  4. Werkgebied (SEO placeholders): Culemborg, Tiel, Geldermalsen, Buren, Beusichem, Leerdam, Neerrijnen
- Bottom bar: "(c) 2026 Groenrijk Hoveniers" left, "Website door KnapGemaakt.nl" right

---

### Homepage

#### Hero (split layout)
- Left side:
  - Green badge/pill: "Hovenier in de Betuwe"
  - Headline: "Een mooie tuin begint bij een goede hovenier"
  - Subtext: "Van tuinontwerp tot onderhoud. Wij maken van uw tuin een plek om van te genieten."
  - Two CTAs: "Gratis Offerte Aanvragen" (green) + "Bekijk Onze Projecten" (outline)
  - Trust signals below CTAs: Google stars (4.8 - 47 reviews), 15+ jaar ervaring, VHG Gecertificeerd
- Right side: Bright, sunny garden photo with rounded corners
- Mobile: stacked (content top, image below), CTAs full-width

#### Services Overview
- Light gray background (`#F5F5F5`)
- 3 white cards with shadow + border-radius
- Each: green line icon, bold title, 2-3 line description, "Meer info" link
- Services: Tuinontwerp, Tuinaanleg, Tuinonderhoud
- Subtle hover: card lifts (shadow increase)
- Mobile: cards stack full-width

#### Social Proof / Reviews
- White background
- Label: "Wat onze klanten zeggen"
- Heading: "Beoordeeld met een 4.8 uit 47 reviews" + 5 gold stars + Google logo
- 3 review cards (light gray bg, rounded):
  - Stars + time ago
  - 2-3 line Dutch review quote
  - Name + location (e.g. "Marieke V. - Culemborg")
- "Bekijk alle reviews op Google" link
- Mobile: horizontal snap-scroll carousel

#### Featured Project
- Full-width garden photo with slight dark gradient overlay
- Centered content: "Uitgelicht Project" label, project title, one-liner, "Bekijk dit project" button
- Below: 2-3 thumbnail previews + "Bekijk alle projecten" link
- Mobile: thumbnails as horizontal scroll row

#### CTA Band
- Green background (`#2E7D32`)
- Heading: "Klaar voor een nieuwe tuin?"
- Subtext: "Vraag vrijblijvend een offerte aan of bel ons direct."
- Two buttons: "Offerte Aanvragen" (white) + "Bel Direct" (white outline + phone icon)
- Mobile: buttons stack full-width

---

### Diensten Page
- Page header: green background, "Onze Diensten" title
- 3 service sections stacked, alternating image left/right
- Each: image + feature list with checkmarks (practical, what's included)
- CTA band at bottom

### Projecten Page
- Grid of project cards (2 cols desktop, 1 mobile)
- White cards with shadow: bright photo, title, location, description
- Tags visible by default (no hover-dependent content)
- CTA band at bottom

### Project Detail Page
- Hero image with project title overlay
- Details sidebar: location, year, services used
- Photo gallery grid
- "Ook zo'n tuin?" CTA

### Over Ons Page
- Friendly introduction section
- Values: 3 cards (Vakmanschap, Persoonlijk, Duurzaam)
- Team/personal photo
- CTA band

### Contact Page
- Split: contact info left (phone, email, WhatsApp prominent), form right
- Werkgebied with town names
- Simplified form: naam, telefoon, email, bericht (no dropdown, no address)

## Tech Stack (unchanged)
- Astro + React + Tailwind CSS v4 + Framer Motion
- Cloudflare deployment
- Resend for email
- Astro Image for optimization
