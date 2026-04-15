# MAOA Website Polish — Design Specification

**Goal:** Elevate the MVP website from functional to luxury-grade across 6 areas: gender screen, placeholder images, silhouette interactivity, trust layer visual separation, treatment cards, and gold accent usage.

**Scope:** Visual/CSS/component changes only. No new pages, no data model changes, no backend changes.

**Branch:** `feat/website` worktree at `.worktrees/feat-website`

---

## 1. Gender Screen — Clear Sex Silhouettes

**File:** `src/components/journey/GenderScreen.tsx`

Replace the empty gradient panels with clearly recognizable female and male gold SVG silhouettes.

**Female silhouette (Elle panel):**
- Full-body standing figure with defined curves, flowing hair, defined waist
- Gold stroke (`var(--gold)`), stroke-width 1.2, 20% opacity
- Centered in the panel, ~78% of panel height
- Italic "Elle" text below

**Male silhouette (Lui panel):**
- Full-body standing figure with broader shoulders, angular build, shorter hair
- Same gold stroke treatment, 20% opacity
- Non-italic "Lui" text below

**Shared behavior:**
- Panels keep existing gradient backgrounds (deep vs elevated for subtle contrast)
- Gold decorative line above text expands from 32px to 64px on hover (existing)
- Gold overlay on hover remains at 5% (existing)
- SVG paths defined inline in the component (no external files)

---

## 2. Placeholder Images — Elegant Abstract

**Files:** `ProfessorBio.tsx`, `ClinicShowcase.tsx`, `TeamGrid.tsx`, `RecommendationScreen.tsx`

Replace all text-based placeholders ("Portrait", "Photo", feature labels at 20% opacity) with styled abstract placeholders that feel intentional.

**Treatment per component:**

### ProfessorBio portrait (aspect-[3/4])
- Angled gradient background: `bg-elevated/30` to `bg-deep/60` (keep existing)
- Add: concentric gold circle pattern (3 circles, stroke-only, ~8% opacity)
- Add: small user-silhouette SVG icon centered, 10% opacity
- Add: shimmer animation overlay

### ClinicShowcase feature images (aspect-video)
- Gradient background from `bg-base` to `bg-elevated`
- Add: parallel diagonal gold lines pattern (~6% opacity)
- Add: small contextual SVG icon per feature (scalpel for Bloc Opératoire, armchair for Salle de Consultation, bed for Suite de Récupération), 12% opacity
- Add: shimmer animation overlay

### TeamGrid member photos (aspect-square)
- Keep existing gradient
- Add: single gold circle (portrait frame hint), stroke-only, 10% opacity
- Add: small user SVG icon, 10% opacity
- Add: shimmer animation overlay

### Treatment card image areas (aspect-[4/3])
- Remove faint category text
- Add: gradient from `bg-elevated` to `bg-base`
- Add: category-specific gold SVG icon (see Section 5)
- Add: category name as gold pill badge below icon

**Shimmer animation:** Already defined in `animations.css` as `.shimmer` class. Apply as a pseudo-element overlay so it doesn't interfere with content.

---

## 3. Silhouette Screen — Soft Glow Hotspots

**File:** `src/components/journey/SilhouetteSVG.tsx`

Replace invisible rect hitboxes with always-visible radial gold glows.

**Desktop behavior:**
- Each zone gets a radial gradient circle centered on the zone, ~15% opacity gold
- On hover: glow intensifies to 30% opacity, existing label + dashed connector line appears
- Subtle pulse animation on idle glows (2.5s cycle, opacity oscillates between 12% and 18%)

**Mobile behavior:**
- Glows always visible at 15% opacity
- Zone labels always visible as small gold text positioned beside each glow (since no hover on touch)
- On tap: glow intensifies, zone is selected (navigates to zone detail)

**Implementation:**
- Replace `<rect>` hitboxes with `<circle>` elements using `fill="url(#zoneGlow)"` radial gradient
- Add SVG `<defs>` for the radial gradient pattern
- Add CSS animation for the pulse effect
- Use a media query or `@media (hover: none)` to detect touch devices and show labels by default

**Zone positions** (circle centers — derived from existing rect centers):
- hair: cx=100, cy=19
- eyes: cx=100, cy=43
- lips: cx=100, cy=62
- neck: cx=100, cy=83
- chest: cx=100, cy=127
- abdomen: cx=100, cy=185
- hips: cx=100, cy=230
- thighs: cx=100, cy=288

---

## 4. Trust Layer — Gold Accent Bands + Varied Layouts

### Gold divider between sections

**File:** New shared component or inline in `RecommendationScreen.tsx`

Between each trust section, render a full-width gold divider:
- 1px line using `bg-gold` at 30% opacity
- Soft glow halo: `box-shadow: 0 0 20px rgba(201,168,124,0.1)`
- Centered gold diamond motif: a small `4px` gold square rotated 45deg
- Vertical margin: `my-0` (sections already have `py-20`)

### Layout variations per section

**ProfessorBio** — no layout change, already 2-column. Just update placeholder image (Section 2).

**ClinicShowcase** — staggered cards:
- Change from flat 3-column grid to offset positioning
- First card: normal position. Second card: `mt-8` offset. Third card: `mt-4` offset.
- Adds visual rhythm vs the current uniform grid
- Each card gets a subtle `hover:translate-y-[-4px]` lift effect

**TeamGrid** — add gold hover border:
- On hover: border transitions from `border-line` to `border-gold/50`
- Already partially implemented, just strengthen the effect
- No layout change needed

**Testimonials** — varied card heights:
- Remove forced uniform height
- Let quotes flow naturally creating a masonry-like effect
- Enlarge the gold quotation mark (`text-3xl`) and make it `text-gold` at full opacity (currently already gold)
- Add a subtle left gold border accent (`border-l-2 border-gold/30`)

**MedicalTourism** — timeline connector:
- Add a horizontal gold line connecting the 4 step cards
- Line runs behind the cards at the `01`/`02` number level
- Each step number sits on top of the line with a small gold circle background
- Implementation: parent container with `relative` positioning, `::before` pseudo-element for the line

---

## 5. Treatment Cards — Gold Icons + Typography

**File:** `src/components/journey/RecommendationScreen.tsx`

Replace the image area with a gold SVG icon + category badge layout.

**Category icons** (abstract, ~40px, gold stroke — mapped to actual data categories):
- `injectable`: syringe icon
- `medium-surgery`: scalpel icon
- `heavy-surgery`: scalpel with plus/star icon (distinguishes from medium)
- Default/fallback: diamond shape

**Card image area redesign:**
- Center the category SVG icon vertically in the `aspect-[4/3]` area
- Below icon: category name in a pill badge (`px-3 py-1 border border-gold/30 text-gold text-[9px] tracking-[2px] uppercase rounded-full`)
- Background: gradient from `bg-elevated/50` to `bg-base`
- Keep existing gold top line on hover (`scale-x-0` to `scale-x-100`)

**Typography refinements in card body:**
- Treatment name: bump to `text-xl` (already is), add `tracking-wide`
- Description: keep `text-sm`, ensure `leading-relaxed`
- Details section: tighten spacing, use `gap-1.5` instead of `space-y-2`

---

## 6. Gold Accent Reinforcement

Cross-cutting changes to strengthen the luxury gold identity.

### CTA buttons
**Files:** `RecommendationScreen.tsx`, `ArrivalScreen.tsx`
- Default state: change `border-line` to `border-gold/30`
- Existing hover gradient is good, keep as-is

### Section header decorative lines
**All trust components + RecommendationScreen**
- Change `w-12 h-px bg-gold` to `w-16 h-px bg-gradient-to-r from-gold-deep to-gold`
- Slightly longer, gradient instead of flat color

### Back button
**File:** `JourneyApp.tsx`
- Change arrow SVG stroke from `currentColor` (text-muted) to `var(--gold)` on idle
- Text remains muted, arrow is gold accent

### WhatsApp button
**File:** `WhatsAppButton.astro`
- Add `ring-2 ring-gold/20 ring-offset-2 ring-offset-bg-deep` for subtle gold ring around the green circle

---

## Files Modified (Summary)

| File | Changes |
|------|---------|
| `GenderScreen.tsx` | Add female/male SVG silhouettes |
| `SilhouetteSVG.tsx` | Replace rects with radial glow circles, add mobile labels |
| `RecommendationScreen.tsx` | Treatment card icons, gold dividers between trust sections, CTA button border |
| `ProfessorBio.tsx` | Abstract placeholder with gold circles + icon |
| `ClinicShowcase.tsx` | Staggered layout, abstract placeholders with icons |
| `TeamGrid.tsx` | Gold circle placeholder, strengthen hover border |
| `Testimonials.tsx` | Left gold border accent, natural height, bigger quote mark |
| `MedicalTourism.tsx` | Timeline connector line between steps |
| `ArrivalScreen.tsx` | CTA button gold border |
| `JourneyApp.tsx` | Gold back arrow |
| `WhatsAppButton.astro` | Gold ring accent |
| `animations.css` | Zone glow pulse animation |
| `global.css` | No changes needed |
| `tailwind.config.mjs` | No changes needed |

## Out of Scope

- Real photography (will be swapped in later)
- Light theme adjustments (dark mode only for this pass)
- New pages or routes
- Data model or Supabase changes
- Mobile layout restructuring (only mobile touch-zone handling for silhouette)
