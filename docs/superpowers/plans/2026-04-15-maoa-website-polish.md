# MAOA Website Polish — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Elevate the MAOA luxury aesthetic clinic website from functional MVP to polished luxury-grade across 6 visual areas — all CSS/component changes, no backend or data model changes.

**Architecture:** Edit existing React/Astro components in the `feat/website` worktree. Add inline SVGs for silhouettes and icons. Add CSS animations for glow effects. No new dependencies needed.

**Tech Stack:** React 19, Astro 5, TailwindCSS 3, CSS custom properties, inline SVG

**Working directory:** `C:\Users\bench\OneDrive\Desktop\MAOA\.worktrees\feat-website`

---

## File Map

### Modified files (by task)

| Task | Files Modified |
|------|---------------|
| 1 | `src/components/journey/GenderScreen.tsx` |
| 2 | `src/styles/animations.css`, `src/components/journey/SilhouetteSVG.tsx` |
| 3 | `src/components/trust/ProfessorBio.tsx` |
| 4 | `src/components/trust/ClinicShowcase.tsx` |
| 5 | `src/components/trust/TeamGrid.tsx` |
| 6 | `src/components/journey/RecommendationScreen.tsx` |
| 7 | `src/components/trust/Testimonials.tsx` |
| 8 | `src/components/trust/MedicalTourism.tsx` |
| 9 | `src/components/journey/RecommendationScreen.tsx` (gold dividers between trust sections) |
| 10 | `src/components/journey/ArrivalScreen.tsx`, `src/components/journey/JourneyApp.tsx`, `src/components/ui/WhatsAppButton.astro` |

---

### Task 1: Gender Screen — Clear Sex Silhouettes

**Files:**
- Modify: `src/components/journey/GenderScreen.tsx`

- [ ] **Step 1: Replace GenderScreen with silhouette panels**

Rewrite the component with detailed female/male SVG body silhouettes centered in each panel. The SVGs use gold stroke at 20% opacity.

```tsx
// src/components/journey/GenderScreen.tsx
interface GenderScreenProps {
  onSelect: (gender: 'her' | 'him') => void;
}

function FemaleSilhouette() {
  return (
    <svg
      viewBox="0 0 200 500"
      className="absolute top-[10px] left-1/2 -translate-x-1/2 h-[78%] opacity-20"
      fill="none"
      stroke="var(--gold)"
      strokeWidth="1.2"
    >
      {/* Head */}
      <ellipse cx="100" cy="42" rx="28" ry="34" />
      {/* Hair flowing */}
      <path d="M72 35 C65 20 68 10 80 8 C90 5 100 4 110 5 C125 8 132 18 130 35 C132 50 128 65 120 75 L118 80" strokeWidth="0.8" />
      {/* Neck */}
      <path d="M88 72 L88 88 M112 72 L112 88" />
      {/* Shoulders & torso — feminine curves */}
      <path d="M88 88 C70 90 48 98 38 112 L32 130 C30 140 32 148 36 155 L42 168 C44 175 48 190 50 200 L55 230 C52 240 48 250 48 260 L50 290 C48 310 46 340 48 370 L50 420 C52 435 55 445 62 450 L70 452 L72 420 L75 380 C80 355 85 340 90 330 L95 320 C98 318 102 318 105 320 L110 330 C115 340 120 355 125 380 L128 420 L130 452 L138 450 C145 445 148 435 150 420 L152 370 C154 340 152 310 150 290 L148 260 C148 250 145 240 142 230 L148 200 C150 190 155 175 158 168 L162 155 C166 148 168 140 166 130 L162 112 C152 98 130 90 112 88" />
      {/* Waist definition */}
      <path d="M55 200 C70 195 85 192 100 192 C115 192 130 195 145 200" strokeWidth="0.6" opacity="0.5" />
    </svg>
  );
}

function MaleSilhouette() {
  return (
    <svg
      viewBox="0 0 200 500"
      className="absolute top-[10px] left-1/2 -translate-x-1/2 h-[78%] opacity-20"
      fill="none"
      stroke="var(--gold)"
      strokeWidth="1.2"
    >
      {/* Head */}
      <ellipse cx="100" cy="40" rx="26" ry="32" />
      {/* Short hair */}
      <path d="M74 32 C72 18 78 8 90 6 C98 4 104 4 112 6 C124 8 128 18 126 32" strokeWidth="0.8" />
      {/* Neck — thicker */}
      <path d="M85 68 L85 85 M115 68 L115 85" />
      {/* Shoulders & torso — masculine build */}
      <path d="M85 85 C62 88 35 96 25 112 L20 132 C18 142 20 150 25 158 L35 175 C38 182 42 195 44 205 L48 235 C46 245 44 252 44 262 L46 295 C44 318 42 345 44 375 L46 425 C48 438 52 448 58 452 L68 455 L70 425 L74 382 C80 358 86 342 92 332 L96 322 C98 320 102 320 104 322 L108 332 C114 342 120 358 126 382 L130 425 L132 455 L142 452 C148 448 152 438 154 425 L156 375 C158 345 156 318 154 295 L152 262 C152 252 150 245 148 235 L152 205 C154 195 158 182 162 175 L172 158 C176 150 178 142 176 132 L172 112 C162 96 138 88 115 85" />
      {/* Chest line */}
      <path d="M44 175 C65 168 85 165 100 165 C115 165 135 168 152 175" strokeWidth="0.6" opacity="0.5" />
    </svg>
  );
}

export default function GenderScreen({ onSelect }: GenderScreenProps) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6">
      <p className="text-gold-deep text-[10px] tracking-[4px] uppercase mb-4 font-body">
        Première étape
      </p>
      <h2 className="font-heading text-3xl sm:text-5xl font-light text-text mb-12 text-center">
        Pour qui est cette visite ?
      </h2>

      <div className="grid grid-cols-2 gap-4 sm:gap-8 w-full max-w-2xl">
        {/* Elle */}
        <button
          onClick={() => onSelect('her')}
          className="group relative aspect-[3/4] sm:aspect-[2/3] bg-bg-base border border-line overflow-hidden transition-all duration-500 hover:border-gold/50"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-bg-elevated/50 to-bg-deep/80" />
          <FemaleSilhouette />
          <div className="absolute inset-0 flex flex-col items-center justify-end pb-8 sm:pb-12">
            <div className="w-8 h-px bg-gold mb-4 transition-all duration-300 group-hover:w-16" />
            <span className="font-heading text-2xl sm:text-4xl font-light text-text italic">
              Elle
            </span>
            <span className="text-[10px] tracking-[3px] uppercase text-text-muted mt-2">
              Femme
            </span>
          </div>
          <div className="absolute inset-0 bg-gold/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </button>

        {/* Lui */}
        <button
          onClick={() => onSelect('him')}
          className="group relative aspect-[3/4] sm:aspect-[2/3] bg-bg-base border border-line overflow-hidden transition-all duration-500 hover:border-gold/50"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-bg-elevated/50 to-bg-deep/80" />
          <MaleSilhouette />
          <div className="absolute inset-0 flex flex-col items-center justify-end pb-8 sm:pb-12">
            <div className="w-8 h-px bg-gold mb-4 transition-all duration-300 group-hover:w-16" />
            <span className="font-heading text-2xl sm:text-4xl font-light text-text">
              Lui
            </span>
            <span className="text-[10px] tracking-[3px] uppercase text-text-muted mt-2">
              Homme
            </span>
          </div>
          <div className="absolute inset-0 bg-gold/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </button>
      </div>
    </div>
  );
}
```

Save to `src/components/journey/GenderScreen.tsx`.

- [ ] **Step 2: Verify the build**

Run:
```bash
npm run build
```

Expected: Build succeeds with no errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/journey/GenderScreen.tsx
git commit -m "polish: add clear female/male silhouettes to gender screen"
```

---

### Task 2: Silhouette Screen — Soft Glow Hotspots

**Files:**
- Modify: `src/styles/animations.css`
- Modify: `src/components/journey/SilhouetteSVG.tsx`

- [ ] **Step 1: Add zone glow pulse animation to animations.css**

Append to the end of `src/styles/animations.css`:

```css
/* Zone glow pulse */
.zone-glow {
  animation: zonePulse 2.5s ease-in-out infinite;
}

@keyframes zonePulse {
  0%, 100% { opacity: 0.12; }
  50% { opacity: 0.18; }
}

/* Mobile: always show zone labels */
@media (hover: none) {
  .zone-label-hover-only {
    display: block !important;
  }
}
```

- [ ] **Step 2: Rewrite SilhouetteSVG with radial glow circles**

Replace the entire file `src/components/journey/SilhouetteSVG.tsx`:

```tsx
// src/components/journey/SilhouetteSVG.tsx
import { useState, useEffect } from 'react';

interface SilhouetteSVGProps {
  gender: 'her' | 'him';
  onSelectZone: (zone: string) => void;
}

interface ZoneSpot {
  id: string;
  label: string;
  cx: number;
  cy: number;
  r: number;
  labelX: number;
  labelY: number;
}

const zones: ZoneSpot[] = [
  { id: 'hair', label: 'Cheveux', cx: 100, cy: 19, r: 18, labelX: 150, labelY: 20 },
  { id: 'eyes', label: 'Regard', cx: 100, cy: 43, r: 12, labelX: 150, labelY: 44 },
  { id: 'lips', label: 'Lèvres', cx: 100, cy: 62, r: 10, labelX: 150, labelY: 62 },
  { id: 'neck', label: 'Cou', cx: 100, cy: 83, r: 12, labelX: 150, labelY: 83 },
  { id: 'chest', label: 'Poitrine', cx: 100, cy: 127, r: 28, labelX: 165, labelY: 127 },
  { id: 'abdomen', label: 'Ventre', cx: 100, cy: 185, r: 28, labelX: 165, labelY: 185 },
  { id: 'hips', label: 'Hanches', cx: 100, cy: 230, r: 22, labelX: 165, labelY: 230 },
  { id: 'thighs', label: 'Cuisses', cx: 100, cy: 288, r: 30, labelX: 165, labelY: 288 },
];

export default function SilhouetteSVG({ gender, onSelectZone }: SilhouetteSVGProps) {
  const [hoveredZone, setHoveredZone] = useState<string | null>(null);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    setIsTouchDevice(window.matchMedia('(hover: none)').matches);
  }, []);

  const outlinePath = gender === 'her'
    ? `M100 8 C80 8 72 20 72 35 C72 50 80 60 85 65 L88 70 C85 72 82 78 82 85
       L82 95 C70 100 55 110 50 130 L48 155 C46 165 50 175 55 180
       L60 215 C55 225 52 240 55 250 L58 290 C56 310 55 330 58 350
       L60 400 L62 430 L75 435 L80 350 L82 300 C90 275 95 260 100 250
       C105 260 110 275 118 300 L120 350 L125 435 L138 430 L140 400
       L142 350 C145 330 144 310 142 290 L145 250 C148 240 145 225 140 215
       L155 180 C160 175 154 165 152 155 L150 130 C145 110 130 100 118 95
       L118 85 C118 78 115 72 112 70 L115 65 C120 60 128 50 128 35
       C128 20 120 8 100 8 Z`
    : `M100 8 C82 8 74 20 74 35 C74 50 82 60 87 65 L89 70 C86 72 83 78 83 85
       L83 95 C68 100 52 115 48 135 L46 160 C44 170 48 178 52 182
       L60 218 C55 228 52 240 55 252 L58 290 C56 312 55 335 58 355
       L60 405 L62 435 L77 438 L80 355 L83 305 C92 278 96 262 100 252
       C104 262 108 278 117 305 L120 355 L123 438 L138 435 L140 405
       L142 355 C145 335 144 312 142 290 L145 252 C148 240 145 228 140 218
       L148 182 C152 178 156 170 154 160 L152 135 C148 115 132 100 117 95
       L117 85 C117 78 114 72 111 70 L113 65 C118 60 126 50 126 35
       C126 20 118 8 100 8 Z`;

  return (
    <svg viewBox="0 0 220 450" className="w-full max-w-xs mx-auto" fill="none">
      <defs>
        <radialGradient id="zoneGlow">
          <stop offset="0%" stopColor="var(--gold)" stopOpacity="0.4" />
          <stop offset="70%" stopColor="var(--gold)" stopOpacity="0.1" />
          <stop offset="100%" stopColor="var(--gold)" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="zoneGlowHover">
          <stop offset="0%" stopColor="var(--gold)" stopOpacity="0.6" />
          <stop offset="60%" stopColor="var(--gold)" stopOpacity="0.2" />
          <stop offset="100%" stopColor="var(--gold)" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Silhouette outline */}
      <path
        d={outlinePath}
        stroke="var(--gold)"
        strokeWidth="1"
        opacity="0.6"
        className="draw-line"
      />

      {/* Glow hotspots */}
      {zones.map((zone) => {
        const isHovered = hoveredZone === zone.id;
        const showLabel = isHovered || isTouchDevice;
        return (
          <g key={zone.id}>
            {/* Glow circle */}
            <circle
              cx={zone.cx}
              cy={zone.cy}
              r={zone.r}
              fill={isHovered ? 'url(#zoneGlowHover)' : 'url(#zoneGlow)'}
              className={isHovered ? '' : 'zone-glow'}
              style={isHovered ? { opacity: 0.3 } : undefined}
              cursor="pointer"
              onMouseEnter={() => setHoveredZone(zone.id)}
              onMouseLeave={() => setHoveredZone(null)}
              onClick={() => onSelectZone(zone.id)}
            />

            {/* Label with connector line */}
            {showLabel && (
              <>
                <line
                  x1={zone.cx + zone.r}
                  y1={zone.cy}
                  x2={zone.labelX - 5}
                  y2={zone.labelY}
                  stroke="var(--gold)"
                  strokeWidth="0.5"
                  strokeDasharray="2 2"
                  opacity={isTouchDevice && !isHovered ? 0.4 : 0.8}
                />
                <text
                  x={zone.labelX}
                  y={zone.labelY + 4}
                  fill="var(--gold)"
                  fontSize={isTouchDevice && !isHovered ? '8' : '10'}
                  fontFamily="Inter, sans-serif"
                  letterSpacing="2"
                  textTransform="uppercase"
                  opacity={isTouchDevice && !isHovered ? 0.5 : 1}
                  style={{ textTransform: 'uppercase' }}
                >
                  {zone.label}
                </text>
              </>
            )}
          </g>
        );
      })}
    </svg>
  );
}
```

Save to `src/components/journey/SilhouetteSVG.tsx`.

- [ ] **Step 3: Verify the build**

Run:
```bash
npm run build
```

Expected: Build succeeds with no errors.

- [ ] **Step 4: Commit**

```bash
git add src/styles/animations.css src/components/journey/SilhouetteSVG.tsx
git commit -m "polish: add soft glow hotspots to silhouette zones with mobile labels"
```

---

### Task 3: ProfessorBio — Elegant Abstract Placeholder

**Files:**
- Modify: `src/components/trust/ProfessorBio.tsx`

- [ ] **Step 1: Replace ProfessorBio with abstract placeholder and gold accents**

```tsx
// src/components/trust/ProfessorBio.tsx
export default function ProfessorBio() {
  return (
    <section className="py-20 px-6">
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="aspect-[3/4] bg-bg-base border border-line relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-bg-elevated/30 to-bg-deep/60" />
          {/* Concentric gold circles */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 300 400" fill="none">
            <circle cx="150" cy="180" r="80" stroke="var(--gold)" strokeWidth="0.5" opacity="0.08" />
            <circle cx="150" cy="180" r="55" stroke="var(--gold)" strokeWidth="0.5" opacity="0.08" />
            <circle cx="150" cy="180" r="30" stroke="var(--gold)" strokeWidth="0.5" opacity="0.08" />
          </svg>
          {/* User silhouette icon */}
          <div className="absolute inset-0 flex items-center justify-center">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="1" opacity="0.1">
              <circle cx="12" cy="8" r="4" />
              <path d="M4 21v-1a6 6 0 0 1 6-6h4a6 6 0 0 1 6 6v1" />
            </svg>
          </div>
          {/* Shimmer overlay */}
          <div className="absolute inset-0 shimmer opacity-30 pointer-events-none" />
        </div>
        <div>
          <p className="text-gold-deep text-[10px] tracking-[4px] uppercase mb-4">Le praticien</p>
          <h2 className="font-heading text-3xl sm:text-4xl font-light text-text mb-6">Professeur Boukind</h2>
          <div className="w-16 h-px bg-gradient-to-r from-gold-deep to-gold mb-6" />
          <p className="text-text-muted text-sm font-light leading-relaxed mb-4">
            Professeur agrégé en chirurgie plastique, reconstructrice et esthétique,
            le Pr. Boukind exerce depuis plus de 25 ans au service de la beauté naturelle.
          </p>
          <p className="text-text-muted text-sm font-light leading-relaxed mb-6">
            Sa philosophie : chaque visage est une œuvre, chaque geste chirurgical
            est un acte artistique. Membre de sociétés savantes internationales,
            il allie expertise technique et sensibilité esthétique pour des résultats
            qui respectent l'identité de chaque patient.
          </p>
          <div className="space-y-2">
            <p className="text-[10px] tracking-[2px] uppercase text-gold">✦ Professeur Agrégé — Chirurgie Plastique</p>
            <p className="text-[10px] tracking-[2px] uppercase text-gold">✦ 25+ ans d'expérience</p>
            <p className="text-[10px] tracking-[2px] uppercase text-gold">✦ Membre SOFCPRE & ISAPS</p>
          </div>
        </div>
      </div>
    </section>
  );
}
```

Save to `src/components/trust/ProfessorBio.tsx`.

- [ ] **Step 2: Verify the build**

Run:
```bash
npm run build
```

Expected: Build succeeds.

- [ ] **Step 3: Commit**

```bash
git add src/components/trust/ProfessorBio.tsx
git commit -m "polish: add elegant abstract placeholder to professor bio"
```

---

### Task 4: ClinicShowcase — Staggered Layout + Abstract Placeholders

**Files:**
- Modify: `src/components/trust/ClinicShowcase.tsx`

- [ ] **Step 1: Rewrite ClinicShowcase with staggered cards and contextual icons**

```tsx
// src/components/trust/ClinicShowcase.tsx
const features = [
  {
    label: 'Bloc Opératoire',
    description: 'Équipé aux normes internationales',
    offset: 'mt-0',
    icon: (
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="1" opacity="0.12">
        <path d="M12 2v8M8 6h8M5 12h14v8a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-8z" />
      </svg>
    ),
  },
  {
    label: 'Salle de Consultation',
    description: 'Espace confidentiel et chaleureux',
    offset: 'mt-8',
    icon: (
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="1" opacity="0.12">
        <path d="M4 20h16M4 16h16M6 16V8a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8" />
        <path d="M2 20v-2a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v2" />
      </svg>
    ),
  },
  {
    label: 'Suite de Récupération',
    description: 'Confort hôtelier post-intervention',
    offset: 'mt-4',
    icon: (
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="1" opacity="0.12">
        <path d="M3 17h18M3 7v10M21 7v10M7 7h10a4 4 0 0 1 4 4H3a4 4 0 0 1 4-4z" />
        <circle cx="7" cy="7" r="2" />
      </svg>
    ),
  },
];

export default function ClinicShowcase() {
  return (
    <section className="py-20 px-6 bg-bg-base">
      <div className="max-w-4xl mx-auto text-center mb-12">
        <p className="text-gold-deep text-[10px] tracking-[4px] uppercase mb-4">La clinique</p>
        <h2 className="font-heading text-3xl sm:text-4xl font-light text-text mb-4">Un cadre d'exception</h2>
        <div className="w-16 h-px bg-gradient-to-r from-gold-deep to-gold mx-auto mb-4" />
        <p className="text-text-muted text-sm max-w-lg mx-auto">
          Au cœur de Casablanca, notre clinique allie technologie de pointe
          et atmosphère apaisante pour une expérience haut de gamme.
        </p>
      </div>
      <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6">
        {features.map((feature) => (
          <div
            key={feature.label}
            className={`text-center p-8 border border-line bg-bg-deep transition-all duration-300 hover:-translate-y-1 hover:border-gold/30 ${feature.offset}`}
          >
            <div className="aspect-video bg-gradient-to-br from-bg-base to-bg-elevated mb-6 relative overflow-hidden">
              {/* Diagonal gold lines */}
              <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
                <defs>
                  <pattern id={`lines-${feature.label}`} width="20" height="20" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
                    <line x1="0" y1="0" x2="0" y2="20" stroke="var(--gold)" strokeWidth="0.5" opacity="0.06" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill={`url(#lines-${feature.label})`} />
              </svg>
              {/* Contextual icon */}
              <div className="absolute inset-0 flex items-center justify-center">
                {feature.icon}
              </div>
              {/* Shimmer */}
              <div className="absolute inset-0 shimmer opacity-20 pointer-events-none" />
            </div>
            <h3 className="font-heading text-lg text-text mb-2">{feature.label}</h3>
            <p className="text-text-muted text-xs">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
```

Save to `src/components/trust/ClinicShowcase.tsx`.

- [ ] **Step 2: Verify the build**

Run:
```bash
npm run build
```

Expected: Build succeeds.

- [ ] **Step 3: Commit**

```bash
git add src/components/trust/ClinicShowcase.tsx
git commit -m "polish: add staggered layout and abstract placeholders to clinic showcase"
```

---

### Task 5: TeamGrid — Gold Circle Placeholder + Hover Border

**Files:**
- Modify: `src/components/trust/TeamGrid.tsx`

- [ ] **Step 1: Update TeamGrid with gold circle placeholder and stronger hover**

```tsx
// src/components/trust/TeamGrid.tsx
import teamData from '../../data/team.json';
import type { TeamMember } from '../../types';

const team = teamData as TeamMember[];

export default function TeamGrid() {
  return (
    <section className="py-20 px-6">
      <div className="max-w-4xl mx-auto text-center mb-12">
        <p className="text-gold-deep text-[10px] tracking-[4px] uppercase mb-4">L'équipe</p>
        <h2 className="font-heading text-3xl sm:text-4xl font-light text-text">Des experts à votre service</h2>
      </div>
      <div className="max-w-4xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-6">
        {team.map((member) => (
          <div key={member.name} className="text-center group">
            <div className="aspect-square bg-bg-base border border-line mb-4 relative overflow-hidden transition-all duration-300 group-hover:border-gold/50">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-bg-deep/50" />
              {/* Gold circle frame hint */}
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 200 200" fill="none">
                <circle cx="100" cy="100" r="60" stroke="var(--gold)" strokeWidth="0.5" opacity="0.1" />
              </svg>
              {/* User icon */}
              <div className="absolute inset-0 flex items-center justify-center">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="1" opacity="0.1">
                  <circle cx="12" cy="8" r="4" />
                  <path d="M4 21v-1a6 6 0 0 1 6-6h4a6 6 0 0 1 6 6v1" />
                </svg>
              </div>
              {/* Shimmer */}
              <div className="absolute inset-0 shimmer opacity-20 pointer-events-none" />
            </div>
            <h3 className="font-heading text-base text-text">{member.name}</h3>
            <p className="text-text-muted text-xs mt-1">{member.title}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
```

Save to `src/components/trust/TeamGrid.tsx`.

- [ ] **Step 2: Verify the build**

Run:
```bash
npm run build
```

Expected: Build succeeds.

- [ ] **Step 3: Commit**

```bash
git add src/components/trust/TeamGrid.tsx
git commit -m "polish: add gold circle placeholder and stronger hover to team grid"
```

---

### Task 6: Treatment Cards — Gold Icons + Typography

**Files:**
- Modify: `src/components/journey/RecommendationScreen.tsx`

- [ ] **Step 1: Add category icon helper and update treatment cards**

This modifies only the treatment card rendering and adds a `CategoryIcon` function at the top. The rest of the file stays the same.

Add this function before the `RecommendationScreen` component:

```tsx
function CategoryIcon({ category }: { category: string }) {
  const iconClass = "mx-auto mb-3";
  switch (category) {
    case 'injectable':
      return (
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="1.2" className={iconClass}>
          <path d="M18 2l-2 2M9 7l-2 2M15 5l-8 8-3 6 6-3 8-8M7 15l2 2" />
          <path d="M11 9l4 4" />
        </svg>
      );
    case 'medium-surgery':
      return (
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="1.2" className={iconClass}>
          <path d="M5 21L19 7" />
          <path d="M15 3l4 4c1 1 1 3-1 5L9 21" />
        </svg>
      );
    case 'heavy-surgery':
      return (
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="1.2" className={iconClass}>
          <path d="M5 21L19 7" />
          <path d="M15 3l4 4c1 1 1 3-1 5L9 21" />
          <circle cx="19" cy="19" r="3" fill="none" />
          <path d="M19 17.5v3M17.5 19h3" />
        </svg>
      );
    default:
      return (
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="1.2" className={iconClass}>
          <path d="M12 2l3 9h9l-7 5 3 9-8-6-8 6 3-9-7-5h9z" />
        </svg>
      );
  }
}

function categoryLabel(category: string): string {
  switch (category) {
    case 'injectable': return 'Injectable';
    case 'medium-surgery': return 'Chirurgie';
    case 'heavy-surgery': return 'Chirurgie lourde';
    default: return 'Soin';
  }
}
```

Then update the treatment card image area inside the `.map()`. Replace the entire card `<div>` (the one with `key={treatment.id}`) with:

```tsx
<div
  key={treatment.id}
  className="group bg-bg-base border border-line overflow-hidden transition-all duration-300 hover:border-gold/50"
>
  <div className="aspect-[4/3] bg-gradient-to-b from-bg-elevated/50 to-bg-base relative overflow-hidden flex flex-col items-center justify-center">
    <CategoryIcon category={treatment.category} />
    <span className="px-3 py-1 border border-gold/30 text-gold text-[9px] tracking-[2px] uppercase rounded-full">
      {categoryLabel(treatment.category)}
    </span>
    <div className="absolute top-0 left-0 right-0 h-0.5 bg-gold transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
  </div>
  <div className="p-6">
    <h3 className="font-heading text-xl text-text mb-2 tracking-wide">{treatment.name}</h3>
    <p className="text-text-muted text-sm font-light leading-relaxed mb-4">{treatment.description}</p>
    <div className="flex flex-col gap-1.5 pt-4 border-t border-line">
      <div className="flex justify-between text-xs">
        <span className="text-text-muted">Durée</span>
        <span className="text-text">{treatment.duration}</span>
      </div>
      <div className="flex justify-between text-xs">
        <span className="text-text-muted">Séances</span>
        <span className="text-text">{treatment.sessions}</span>
      </div>
      <div className="flex justify-between text-xs">
        <span className="text-text-muted">Résultats</span>
        <span className="text-text">{treatment.results}</span>
      </div>
    </div>
  </div>
</div>
```

- [ ] **Step 2: Also update the recommendation header decorative line**

In the same file, find:
```tsx
<div className="w-12 h-px bg-gold mx-auto mb-6" />
```

Replace with:
```tsx
<div className="w-16 h-px bg-gradient-to-r from-gold-deep to-gold mx-auto mb-6" />
```

And update the CTA button border from `border-line` to `border-gold/30` (there are two CTA buttons in this file). Find both instances of:
```
border border-line text-[11px]
```

Replace each with:
```
border border-gold/30 text-[11px]
```

- [ ] **Step 3: Verify the build**

Run:
```bash
npm run build
```

Expected: Build succeeds.

- [ ] **Step 4: Commit**

```bash
git add src/components/journey/RecommendationScreen.tsx
git commit -m "polish: add gold category icons and typography to treatment cards"
```

---

### Task 7: Testimonials — Left Gold Border + Natural Heights

**Files:**
- Modify: `src/components/trust/Testimonials.tsx`

- [ ] **Step 1: Update Testimonials with left border accent and bigger quote mark**

```tsx
// src/components/trust/Testimonials.tsx
import testimonialsData from '../../data/testimonials.json';
import type { Testimonial } from '../../types';

const testimonials = testimonialsData as Testimonial[];

export default function Testimonials() {
  return (
    <section className="py-20 px-6 bg-bg-base">
      <div className="max-w-4xl mx-auto text-center mb-12">
        <p className="text-gold-deep text-[10px] tracking-[4px] uppercase mb-4">Témoignages</p>
        <h2 className="font-heading text-3xl sm:text-4xl font-light text-text">Ce qu'ils en disent</h2>
      </div>
      <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {testimonials.map((t, i) => (
          <div key={i} className="p-6 border border-line border-l-2 border-l-gold/30 bg-bg-deep">
            <div className="text-gold text-3xl font-heading italic mb-4">"</div>
            <p className="text-text text-sm font-light leading-relaxed mb-6 italic">{t.quote}</p>
            <div className="flex items-center gap-3 pt-4 border-t border-line">
              <div>
                <p className="text-text text-xs font-body">{t.name}, {t.age} ans</p>
                <p className="text-text-muted text-[10px]">{t.city}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
```

Save to `src/components/trust/Testimonials.tsx`.

- [ ] **Step 2: Verify the build**

Run:
```bash
npm run build
```

Expected: Build succeeds.

- [ ] **Step 3: Commit**

```bash
git add src/components/trust/Testimonials.tsx
git commit -m "polish: add left gold border accent and bigger quote marks to testimonials"
```

---

### Task 8: MedicalTourism — Timeline Connector

**Files:**
- Modify: `src/components/trust/MedicalTourism.tsx`

- [ ] **Step 1: Add horizontal gold timeline connecting the steps**

```tsx
// src/components/trust/MedicalTourism.tsx
export default function MedicalTourism() {
  const steps = [
    { num: '01', title: 'Consultation à distance', desc: 'Échange initial par vidéo pour évaluer vos besoins et préparer votre séjour.' },
    { num: '02', title: 'Organisation du séjour', desc: 'Nous coordonnons hébergement, transferts et planning médical.' },
    { num: '03', title: 'Votre intervention', desc: 'Prise en charge complète dans notre clinique à Casablanca.' },
    { num: '04', title: 'Suivi personnalisé', desc: 'Suivi post-opératoire à distance avec votre chirurgien.' },
  ];

  return (
    <section className="py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-gold-deep text-[10px] tracking-[4px] uppercase mb-4">Tourisme Médical</p>
          <h2 className="font-heading text-3xl sm:text-4xl font-light text-text mb-4">Venir de loin, être entre de bonnes mains</h2>
          <div className="w-16 h-px bg-gradient-to-r from-gold-deep to-gold mx-auto mb-4" />
          <p className="text-text-muted text-sm max-w-lg mx-auto">
            Casablanca est une destination de référence pour la chirurgie esthétique.
            Nous accompagnons nos patients internationaux à chaque étape.
          </p>
        </div>
        <div className="relative">
          {/* Horizontal connector line — hidden on mobile (stacked layout) */}
          <div
            className="hidden lg:block absolute left-0 right-0 h-px bg-gold/20"
            style={{ top: '24px' }}
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step) => (
              <div key={step.num} className="p-6 border border-line bg-bg-base relative">
                {/* Step number with gold circle background */}
                <div className="relative inline-flex items-center justify-center w-12 h-12 mb-3">
                  <div className="absolute inset-0 rounded-full border border-gold/30 bg-bg-base" />
                  <span className="relative font-heading text-2xl text-gold italic">{step.num}</span>
                </div>
                <h3 className="font-heading text-base text-text mt-1 mb-2">{step.title}</h3>
                <p className="text-text-muted text-xs font-light leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
```

Save to `src/components/trust/MedicalTourism.tsx`.

- [ ] **Step 2: Verify the build**

Run:
```bash
npm run build
```

Expected: Build succeeds.

- [ ] **Step 3: Commit**

```bash
git add src/components/trust/MedicalTourism.tsx
git commit -m "polish: add timeline connector and gold step circles to medical tourism"
```

---

### Task 9: Gold Dividers Between Trust Sections

**Files:**
- Modify: `src/components/journey/RecommendationScreen.tsx`

- [ ] **Step 1: Add GoldDivider component and insert between trust sections**

Add this function at the top of `RecommendationScreen.tsx` (after the imports, before `CategoryIcon`):

```tsx
function GoldDivider() {
  return (
    <div className="flex items-center justify-center py-0">
      <div className="flex-1 h-px bg-gold/30" style={{ boxShadow: '0 0 20px rgba(201,168,124,0.1)' }} />
      <div className="w-1.5 h-1.5 bg-gold/50 rotate-45 mx-4" />
      <div className="flex-1 h-px bg-gold/30" style={{ boxShadow: '0 0 20px rgba(201,168,124,0.1)' }} />
    </div>
  );
}
```

Then in the JSX, insert `<GoldDivider />` between each trust section. Replace the trust layer block:

```tsx
{/* Trust Layer */}
<ProfessorBio />
<ClinicShowcase />
<TeamGrid />
<Testimonials />
<MedicalTourism />
```

With:

```tsx
{/* Trust Layer */}
<GoldDivider />
<ProfessorBio />
<GoldDivider />
<ClinicShowcase />
<GoldDivider />
<TeamGrid />
<GoldDivider />
<Testimonials />
<GoldDivider />
<MedicalTourism />
<GoldDivider />
```

- [ ] **Step 2: Also update the final CTA decorative line in the same file**

Find the final CTA section's decorative line:
```tsx
<div className="w-12 h-px bg-gold mx-auto mb-8" />
```

Replace with:
```tsx
<div className="w-16 h-px bg-gradient-to-r from-gold-deep to-gold mx-auto mb-8" />
```

- [ ] **Step 3: Verify the build**

Run:
```bash
npm run build
```

Expected: Build succeeds.

- [ ] **Step 4: Commit**

```bash
git add src/components/journey/RecommendationScreen.tsx
git commit -m "polish: add gold diamond dividers between trust layer sections"
```

---

### Task 10: Gold Accent Reinforcement — Cross-Cutting

**Files:**
- Modify: `src/components/journey/ArrivalScreen.tsx`
- Modify: `src/components/journey/JourneyApp.tsx`
- Modify: `src/components/ui/WhatsAppButton.astro`

- [ ] **Step 1: Update ArrivalScreen CTA button border and decorative line**

In `src/components/journey/ArrivalScreen.tsx`, find:
```tsx
<div className="w-12 h-px bg-gold mx-auto mb-8 animate-fade-in" />
```

Replace with:
```tsx
<div className="w-16 h-px bg-gradient-to-r from-gold-deep to-gold mx-auto mb-8 animate-fade-in" />
```

Then find the button's border class:
```tsx
className="inline-flex items-center gap-3 px-10 py-4 border border-text/30 text-[11px]
```

Replace with:
```tsx
className="inline-flex items-center gap-3 px-10 py-4 border border-gold/30 text-[11px]
```

- [ ] **Step 2: Update JourneyApp back button arrow to gold**

In `src/components/journey/JourneyApp.tsx`, find:
```tsx
<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
```

Replace with:
```tsx
<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="1.5">
```

- [ ] **Step 3: Update WhatsApp button with gold ring**

In `src/components/ui/WhatsAppButton.astro`, find:
```
class="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white rounded-full p-4 shadow-lg hover:scale-110 hover:shadow-xl transition-all duration-300"
```

Replace with:
```
class="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white rounded-full p-4 shadow-lg hover:scale-110 hover:shadow-xl transition-all duration-300 ring-2 ring-gold/20 ring-offset-2 ring-offset-bg-deep"
```

- [ ] **Step 4: Verify the build**

Run:
```bash
npm run build
```

Expected: Build succeeds.

- [ ] **Step 5: Commit**

```bash
git add src/components/journey/ArrivalScreen.tsx src/components/journey/JourneyApp.tsx src/components/ui/WhatsAppButton.astro
git commit -m "polish: reinforce gold accents across CTA buttons, back arrow, and WhatsApp ring"
```

---

## Verification

After all 10 tasks, run a final check:

```bash
npm run build && npm run dev
```

Open `http://localhost:4321` and walk through the full journey:
1. Arrival screen — gold border CTA, gradient decorative line
2. Gender screen — visible female/male silhouettes
3. Path choice — unchanged
4. Silhouette — glowing zone hotspots
5. Zone detail — unchanged
6. Recommendations — gold category icons, pill badges, refined typography
7. Trust layer — gold dividers between sections, staggered clinic cards, timeline connector, gold testimonial borders
8. Final CTA — gold border button
9. WhatsApp button — gold ring accent
10. Back button — gold arrow
