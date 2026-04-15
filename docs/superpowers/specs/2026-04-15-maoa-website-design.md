# MAOA Website — Design Specification

## Overview

Production website for Medical Art of Aesthetics (MAOA) — Professor Boukind's luxury aesthetic clinic in Casablanca. The site is a lead-generation machine disguised as an art experience. Users go through an immersive journey that silently captures their preferences (gender, body zone or age, concerns) through beautiful interactions, then delivers personalized treatment recommendations and a minimal booking form.

**Core identity:** "Art in Aesthetic Medicine" — the website itself is a curated art piece.

---

## Architecture

**Hybrid Astro site** with two user-facing layers sharing a common foundation:

### The Journey (SPA)
A single-page interactive experience built as a React island inside Astro. Cinematic transitions between screens, zero page reloads. This is the homepage (`/`). Covers the full conversion funnel:

1. **Arrival** — Full-screen hero, brand statement, "Begin" CTA
2. **Gender** — Split-screen Elle/Lui panels, click to select and advance
3. **Path Choice** — Two cards: "I know what I want" (→ Zone) / "Guide me" (→ Age)
4. **Zone Path:** Silhouette (gold line-art anatomical illustration, 8 clickable zones) → Zone Detail (before/after, video, 3 progressive questions)
5. **Age Path:** Life Stage (5 photo cards, 20s–60s) → Concern (3 cards: visible signs, radiance, silhouette)
6. **Recommendations** — Loading moment, then 3 treatment cards from JSON mapping, personalized headline
7. **Trust Layer** — Scrollable continuation below recommendations (still inside the React island): Professor bio, clinic, team, testimonials, medical tourism
8. **Booking Modal** — Name + WhatsApp + preferred contact → Supabase
9. **Thank You** — Personalized confirmation, FAQ accordion, social links

### Static Pages (Phase 2)
SEO-optimized Astro pages with individual URLs, generated from data files:
- `/interventions/[slug]` — One page per treatment (800-1200 words)
- `/equipe` — Medical team
- `/tourisme-medical` — International patients
- Additional SEO landing pages

### Shared Foundation
- **Design system** — Tailwind-based component library with dark/light theme support
- **Treatment data** — JSON files with zone/age/concern → treatment mappings
- **Theme engine** — CSS custom properties toggled via `data-theme` attribute
- **Supabase client** — Form submission and lead storage

---

## Tech Stack

| Layer | Choice | Rationale |
|-------|--------|-----------|
| Framework | Astro | Static-first, HTML-like authoring, React islands for interactivity, excellent SEO |
| Styling | TailwindCSS | Utility-first, matches prototype approach, easy theming via CSS vars |
| Journey UI | React (Astro island) | Component-based screens with state management for the SPA flow |
| Data | JSON/Markdown files | Treatments change rarely, version-controlled, no CMS overhead |
| Backend | Supabase | Form submissions, lead storage, ready for CRM phase |
| Hosting | Vercel | One-click deploys, preview URLs, edge CDN, separate client account |
| WhatsApp | Click-to-chat link + API | Direct messaging button, lead notifications |

---

## Design System

### Color Tokens

**Dark mode (default):**

| Token | Value | Usage |
|-------|-------|-------|
| `--bg-deep` | `#0D0D0D` | Page background |
| `--bg-base` | `#1A1A1A` | Card backgrounds |
| `--bg-elevated` | `#2A2A2A` | Elevated surfaces |
| `--gold` | `#C9A87C` | Primary accent |
| `--gold-deep` | `#A8895D` | Secondary accent, labels |
| `--text` | `#FAF7F2` | Primary text (cream) |
| `--text-muted` | `#A09993` | Secondary text |
| `--line` | `#333333` | Borders, dividers |

**Light mode:** Background and text swap. Gold tokens stay identical.

| Token | Value | Usage |
|-------|-------|-------|
| `--bg-deep` | `#FFFFFF` | Page background |
| `--bg-base` | `#FAF7F2` | Card backgrounds |
| `--bg-elevated` | `#F3ECDD` | Elevated surfaces |
| `--gold` | `#C9A87C` | Primary accent (same) |
| `--gold-deep` | `#A8895D` | Secondary accent (same) |
| `--text` | `#1A1A1A` | Primary text (charcoal) |
| `--text-muted` | `#6B6560` | Secondary text |
| `--line` | `#E8E2D5` | Borders, dividers |

### Typography

| Role | Font | Weight | Usage |
|------|------|--------|-------|
| Headings | Cormorant Garamond | 300, 400 | Statements, screen titles, treatment names |
| Body | Inter | 200, 300, 400 | Descriptions, UI text, form labels |
| Labels | Inter uppercase | 400 | Navigation, categories, step indicators |

### Components

- **Ghost Button** — Border-only, fill animation on hover, uppercase tracking
- **Accent Button** — Solid dark/gradient gold on hover, for primary CTAs
- **Treatment Card** — Image, title, description, quick facts, gold top-line on hover
- **Answer Card** — Left gold accent bar on hover, numbered, click to select
- **Path Card** — Centered content, subtle background shift on hover
- **Booking Modal** — Backdrop blur, centered card with gold top accent line
- **Theme Toggle** — Sun/moon icon in navigation

### Silhouette
- Gold line-art anatomical illustration style (medical-editorial aesthetic)
- Separate male and female versions, selected based on gender choice
- 8 clickable zones: Hair, Eyes, Lips, Neck, Chest, Abdomen, Hips, Thighs
- Hover: zone fills with translucent gold, gold stroke appears
- SVG-based for crispness at any resolution

---

## Data Model

### treatments.json

```json
{
  "id": "skin-boosters",
  "name": "Skin Boosters",
  "category": "injectable",
  "description": "A subtle infusion that restores hydration and natural luminosity from within.",
  "duration": "30 min",
  "sessions": "1 session",
  "results": "Results in 2 weeks",
  "image": "/images/treatments/skin-boosters.jpg",
  "zones": ["face", "neck"],
  "gender": ["her", "him"],
  "tags": ["radiance", "hydration", "glow"]
}
```

- `category`: `injectable` | `medium-surgery` | `heavy-surgery` (aligns with commission tiers)
- `zones`: which body zones this treatment applies to
- `gender`: applicable genders (most are both)
- `tags`: unused in MVP, ready for scoring system upgrade

### recommendations.json

```json
{
  "zone_rules": [
    {
      "zone": "eyes",
      "gender": "her",
      "default": ["blepharoplasty", "botox-light", "under-eye-filler"]
    }
  ],
  "age_rules": [
    {
      "age": "30s",
      "concern": "radiance",
      "gender": "her",
      "treatments": ["skin-boosters", "mesotherapy", "hydrafacial"]
    }
  ]
}
```

**Upgrade path:** When switching to scoring, `recommend.ts` changes from direct lookup to: calculate tag overlap between user selections and treatment tags, return top 3 by score. Same data files, new logic function.

### team.json

```json
{
  "name": "Dr. Amrani",
  "title": "Aesthetic Medicine",
  "image": "/images/team/dr-amrani.jpg"
}
```

### testimonials.json

```json
{
  "quote": "I look like myself. Just rested.",
  "name": "Sophie",
  "age": 52,
  "city": "Paris"
}
```

---

## Project Structure

```
maoa/
├── src/
│   ├── components/
│   │   ├── journey/          # SPA screens (React)
│   │   │   ├── JourneyApp.tsx
│   │   │   ├── ArrivalScreen.tsx
│   │   │   ├── GenderScreen.tsx
│   │   │   ├── PathScreen.tsx
│   │   │   ├── SilhouetteScreen.tsx
│   │   │   ├── ZoneDetailScreen.tsx
│   │   │   ├── LifeStageScreen.tsx
│   │   │   ├── ConcernScreen.tsx
│   │   │   ├── RecommendationScreen.tsx
│   │   │   ├── BookingModal.tsx
│   │   │   └── ThankYouScreen.tsx
│   │   ├── trust/            # Trust layer (React — rendered inside journey)
│   │   │   ├── ProfessorBio.tsx
│   │   │   ├── ClinicShowcase.tsx
│   │   │   ├── TeamGrid.tsx
│   │   │   ├── Testimonials.tsx
│   │   │   └── MedicalTourism.tsx
│   │   └── ui/               # Design system
│   │       ├── Button.astro
│   │       ├── Card.astro
│   │       ├── ThemeToggle.tsx
│   │       ├── Navigation.astro
│   │       ├── SilhouetteSVG.tsx
│   │       └── WhatsAppButton.astro
│   ├── data/                 # JSON treatment database
│   │   ├── treatments.json
│   │   ├── zones.json
│   │   ├── recommendations.json
│   │   ├── team.json
│   │   └── testimonials.json
│   ├── layouts/
│   │   └── BaseLayout.astro
│   ├── pages/
│   │   └── index.astro       # Hosts the Journey island
│   ├── styles/
│   │   ├── global.css        # Theme variables, base styles
│   │   └── animations.css    # Transitions, screen fades
│   └── lib/
│       ├── recommend.ts      # Mapping logic
│       └── supabase.ts       # Form submission client
├── public/
│   ├── images/
│   │   ├── silhouette-female.svg
│   │   ├── silhouette-male.svg
│   │   └── treatments/
│   └── fonts/
├── astro.config.mjs
├── tailwind.config.mjs
└── package.json
```

---

## MVP Scope (Phase 1)

### Included
- Full journey flow (all 9 screens) as React SPA island
- Dark mode (default) + light mode with theme toggle
- Gold line-art silhouettes (male + female)
- Treatment data in JSON with simple mapping recommendations
- Lead capture form → Supabase
- WhatsApp click-to-chat button
- Trust layer (Professor Boukind, team, clinic, testimonials, medical tourism)
- Mobile-responsive design
- French language only
- Placeholder content: aesthetic medicine stock photos, realistic mock treatment data

### Phase 2 (future)
- Multilingual support (EN/AR/ES)
- Dedicated SEO intervention pages (`/interventions/[slug]`)
- Additional form types (pre-consultation, medical tourism)
- Blog / content marketing
- Analytics & conversion tracking
- Recommendation scoring system upgrade

---

## Content Strategy (MVP)

All content is placeholder but on-brand:
- **Treatment images:** Aesthetic medicine stock photography (Unsplash/Pexels — procedures, clinics, skincare)
- **Treatment descriptions:** Realistic medical-aesthetic copy reflecting actual services
- **Team photos:** Professional medical portrait stock
- **Testimonials:** Realistic fictional reviews from target demographics (local + international)
- **Clinic photos:** Premium medical facility interiors

Real content will be swapped in when the clinic provides assets.

---

## Key Design Principles

1. **Medicine as art** — Every screen, transition, and interaction should feel curated
2. **No traditional forms until the end** — Data captured through beautiful interactions
3. **Gold is the DNA** — Constant across themes, the thread connecting every element
4. **Trust through authority** — Professor credentials, team qualifications, patient stories
5. **Luxury through restraint** — Whitespace, slow animations, editorial typography
6. **Mobile-first** — The journey must be flawless on phones (primary device for target market)
