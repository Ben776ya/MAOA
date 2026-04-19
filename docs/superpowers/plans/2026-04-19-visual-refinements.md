# MAOA Visual Refinements Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Improve visual quality across the MAOA website — fix silhouette visibility, tone down light mode, complete the zone body outline, add silk texture backgrounds, and add hero imagery placeholders.

**Architecture:** All changes are CSS/SVG/component-level refinements to the existing Astro + React + Tailwind stack. Silk texture is implemented as a CSS-only animated background (SVG filter + gradient layers). Hero images use placeholder containers with Unsplash stock images for aesthetic medicine. No new dependencies required.

**Tech Stack:** Astro, React, Tailwind CSS, CSS custom properties, inline SVG

---

## File Map

| File | Action | Responsibility |
|------|--------|---------------|
| `src/styles/global.css` | Modify | Light mode color variables, silk texture CSS |
| `src/styles/animations.css` | Modify | Zone glow pulse intensity, silk animation |
| `src/components/journey/GenderScreen.tsx` | Modify | Increase silhouette stroke visibility |
| `src/components/journey/SilhouetteSVG.tsx` | Modify | Complete body outline, improve zone hotspots |
| `src/components/journey/ArrivalScreen.tsx` | Modify | Add hero image holders + silk bg |
| `src/components/ui/SilkBackground.tsx` | Create | Reusable silk texture background component |
| `public/images/hero/` | Create | Directory for hero imagery |

---

### Task 1: Light Mode Color Tuning

**Files:**
- Modify: `src/styles/global.css:26-35`

The light mode uses pure white `#FFFFFF` for `--bg-deep` which is blinding. Shift to warmer, softer tones.

- [ ] **Step 1: Update light mode CSS variables**

In `src/styles/global.css`, replace the light theme block:

```css
/* Light theme */
[data-theme='light'] {
  --bg-deep: #F5F0E8;
  --bg-base: #EDE7DB;
  --bg-elevated: #E5DCCB;
  --gold: #B8944F;
  --gold-deep: #9A7A3E;
  --text: #2C2420;
  --text-muted: #6B6560;
  --line: #D8CFC0;
}
```

Key changes:
- `--bg-deep`: `#FFFFFF` → `#F5F0E8` (warm parchment instead of pure white)
- `--bg-base`: `#FAF7F2` → `#EDE7DB` (warmer, darker cream)
- `--bg-elevated`: `#F3ECDD` → `#E5DCCB` (darker warm surface)
- `--gold`: darkened to `#B8944F` for better contrast on light backgrounds
- `--gold-deep`: darkened to `#9A7A3E`
- `--text`: `#1A1A1A` → `#2C2420` (warm dark brown instead of near-black)
- `--line`: `#E8E2D5` → `#D8CFC0` (more visible borders)

- [ ] **Step 2: Build and verify**

Run:
```bash
cd C:/Users/bench/OneDrive/Desktop/MAOA/.worktrees/feat-website && npm run build
```
Expected: Build succeeds with no errors.

- [ ] **Step 3: Commit**

```bash
cd C:/Users/bench/OneDrive/Desktop/MAOA/.worktrees/feat-website
git add src/styles/global.css
git commit -m "fix: tone down light mode — warmer parchment palette instead of blinding white"
```

---

### Task 2: Gender Silhouette Visibility

**Files:**
- Modify: `src/components/journey/GenderScreen.tsx:6-40`

The silhouettes use `opacity-20` (0.2) which is nearly invisible in both modes. Increase opacity and stroke width, and add a subtle fill to give them body.

- [ ] **Step 1: Update FemaleSilhouette component**

In `src/components/journey/GenderScreen.tsx`, replace the `FemaleSilhouette` function (lines 6-22):

```tsx
function FemaleSilhouette() {
  return (
    <svg
      viewBox="0 0 200 500"
      className="absolute top-[10px] left-1/2 -translate-x-1/2 h-[78%]"
      fill="none"
      stroke="var(--gold)"
      strokeWidth="1.5"
    >
      <defs>
        <linearGradient id="silhouetteFillFemale" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--gold)" stopOpacity="0.08" />
          <stop offset="100%" stopColor="var(--gold)" stopOpacity="0.02" />
        </linearGradient>
      </defs>
      {/* Head */}
      <ellipse cx="100" cy="42" rx="28" ry="34" opacity="0.6" fill="url(#silhouetteFillFemale)" />
      {/* Hair */}
      <path d="M72 35 C65 20 68 10 80 8 C90 5 100 4 110 5 C125 8 132 18 130 35 C132 50 128 65 120 75 L118 80" strokeWidth="1" opacity="0.5" />
      {/* Body */}
      <path d="M88 72 L88 88 M112 72 L112 88" opacity="0.5" />
      <path
        d="M88 88 C70 90 48 98 38 112 L32 130 C30 140 32 148 36 155 L42 168 C44 175 48 190 50 200 L55 230 C52 240 48 250 48 260 L50 290 C48 310 46 340 48 370 L50 420 C52 435 55 445 62 450 L70 452 L72 420 L75 380 C80 355 85 340 90 330 L95 320 C98 318 102 318 105 320 L110 330 C115 340 120 355 125 380 L128 420 L130 452 L138 450 C145 445 148 435 150 420 L152 370 C154 340 152 310 150 290 L148 260 C148 250 145 240 142 230 L148 200 C150 190 155 175 158 168 L162 155 C166 148 168 140 166 130 L162 112 C152 98 130 90 112 88"
        opacity="0.6"
        fill="url(#silhouetteFillFemale)"
      />
      {/* Waistline */}
      <path d="M55 200 C70 195 85 192 100 192 C115 192 130 195 145 200" strokeWidth="0.8" opacity="0.35" />
    </svg>
  );
}
```

Key changes:
- Removed `opacity-20` class from the SVG root
- Increased `strokeWidth` to `1.5`
- Added a linear gradient fill (`silhouetteFillFemale`) for subtle body shading
- Set individual element opacities: body at 0.6, head at 0.6, hair at 0.5 — all much more visible than the global 0.2

- [ ] **Step 2: Update MaleSilhouette component**

In the same file, replace the `MaleSilhouette` function (lines 24-40):

```tsx
function MaleSilhouette() {
  return (
    <svg
      viewBox="0 0 200 500"
      className="absolute top-[10px] left-1/2 -translate-x-1/2 h-[78%]"
      fill="none"
      stroke="var(--gold)"
      strokeWidth="1.5"
    >
      <defs>
        <linearGradient id="silhouetteFillMale" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--gold)" stopOpacity="0.08" />
          <stop offset="100%" stopColor="var(--gold)" stopOpacity="0.02" />
        </linearGradient>
      </defs>
      {/* Head */}
      <ellipse cx="100" cy="40" rx="26" ry="32" opacity="0.6" fill="url(#silhouetteFillMale)" />
      {/* Hair */}
      <path d="M74 32 C72 18 78 8 90 6 C98 4 104 4 112 6 C124 8 128 18 126 32" strokeWidth="1" opacity="0.5" />
      {/* Body */}
      <path d="M85 68 L85 85 M115 68 L115 85" opacity="0.5" />
      <path
        d="M85 85 C62 88 35 96 25 112 L20 132 C18 142 20 150 25 158 L35 175 C38 182 42 195 44 205 L48 235 C46 245 44 252 44 262 L46 295 C44 318 42 345 44 375 L46 425 C48 438 52 448 58 452 L68 455 L70 425 L74 382 C80 358 86 342 92 332 L96 322 C98 320 102 320 104 322 L108 332 C114 342 120 358 126 382 L130 425 L132 455 L142 452 C148 448 152 438 154 425 L156 375 C158 345 156 318 154 295 L152 262 C152 252 150 245 148 235 L152 205 C154 195 158 182 162 175 L172 158 C176 150 178 142 176 132 L172 112 C162 96 138 88 115 85"
        opacity="0.6"
        fill="url(#silhouetteFillMale)"
      />
      {/* Shoulder line */}
      <path d="M44 175 C65 168 85 165 100 165 C115 165 135 168 152 175" strokeWidth="0.8" opacity="0.35" />
    </svg>
  );
}
```

Same approach: removed global opacity-20, added gradient fill, increased stroke visibility.

- [ ] **Step 3: Build and verify**

Run:
```bash
cd C:/Users/bench/OneDrive/Desktop/MAOA/.worktrees/feat-website && npm run build
```
Expected: Build succeeds with no errors.

- [ ] **Step 4: Commit**

```bash
cd C:/Users/bench/OneDrive/Desktop/MAOA/.worktrees/feat-website
git add src/components/journey/GenderScreen.tsx
git commit -m "fix: increase gender silhouette visibility with gradient fill and higher opacity"
```

---

### Task 3: Zone Silhouette — Complete Body & Visible Hotspots

**Files:**
- Modify: `src/components/journey/SilhouetteSVG.tsx`
- Modify: `src/styles/animations.css:82-90`

The zone silhouette has three problems: (a) the body outline is incomplete (no feet, no hands, missing anatomical clarity), (b) zone hotspots are nearly invisible, (c) labels only show on hover. Fix all three.

- [ ] **Step 1: Update zone glow animation to be more visible**

In `src/styles/animations.css`, replace the zone-glow keyframes (lines 82-90):

```css
/* Zone glow pulse */
.zone-glow {
  animation: zonePulse 2.5s ease-in-out infinite;
}

@keyframes zonePulse {
  0%, 100% { opacity: 0.5; }
  50% { opacity: 0.75; }
}
```

Changed from 0.12–0.18 range to 0.5–0.75 — much more visible pulsing glow.

- [ ] **Step 2: Rewrite SilhouetteSVG component**

Replace the entire contents of `src/components/journey/SilhouetteSVG.tsx`:

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
  side: 'left' | 'right';
}

const zones: ZoneSpot[] = [
  { id: 'hair', label: 'Cheveux', cx: 100, cy: 22, r: 16, labelX: 155, labelY: 22, side: 'right' },
  { id: 'eyes', label: 'Regard', cx: 100, cy: 45, r: 11, labelX: 40, labelY: 45, side: 'left' },
  { id: 'lips', label: 'Lèvres', cx: 100, cy: 63, r: 9, labelX: 155, labelY: 63, side: 'right' },
  { id: 'neck', label: 'Cou', cx: 100, cy: 82, r: 10, labelX: 40, labelY: 82, side: 'left' },
  { id: 'chest', label: 'Poitrine', cx: 100, cy: 130, r: 30, labelX: 170, labelY: 130, side: 'right' },
  { id: 'abdomen', label: 'Ventre', cx: 100, cy: 195, r: 28, labelX: 170, labelY: 195, side: 'right' },
  { id: 'hips', label: 'Hanches', cx: 100, cy: 245, r: 24, labelX: 25, labelY: 245, side: 'left' },
  { id: 'thighs', label: 'Cuisses', cx: 100, cy: 320, r: 30, labelX: 170, labelY: 320, side: 'right' },
];

export default function SilhouetteSVG({ gender, onSelectZone }: SilhouetteSVGProps) {
  const [hoveredZone, setHoveredZone] = useState<string | null>(null);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    setIsTouchDevice(window.matchMedia('(hover: none)').matches);
  }, []);

  // Complete female silhouette — head to feet with arms
  const femaleOutline = `
    M100 5 C82 5 72 18 72 32 C72 48 80 58 85 64 L88 70
    C85 73 82 78 82 85 L82 92
    C70 97 55 108 50 128 L48 152
    C46 162 50 172 55 178
    L42 200 C38 210 34 220 32 235 L30 250 L32 260 L36 260 L38 250
    C40 240 44 225 48 215 L55 200
    L60 225 C55 235 52 248 55 260
    L58 295 C56 318 55 340 58 362
    L60 410 L64 440 L68 460 L80 462
    L82 440 L84 410 L86 370
    C90 345 94 330 98 318
    L100 312
    L102 318 C106 330 110 345 114 370
    L116 410 L118 440 L120 462
    L132 460 L136 440 L140 410
    L142 362 C145 340 144 318 142 295
    L145 260 C148 248 145 235 140 225
    L148 200 L155 215 C156 225 160 240 162 250
    L164 260 L168 260 L170 250
    L168 235 C166 220 162 210 158 200
    L148 178 C152 172 154 162 152 152
    L150 128 C145 108 130 97 118 92
    L118 85 C118 78 115 73 112 70
    L115 64 C120 58 128 48 128 32
    C128 18 118 5 100 5 Z`;

  // Complete male silhouette — head to feet with arms, broader shoulders
  const maleOutline = `
    M100 5 C84 5 74 18 74 32 C74 48 82 58 87 64 L89 70
    C86 73 83 78 83 85 L83 92
    C68 97 50 110 46 132 L44 158
    C42 168 46 176 50 180
    L38 202 C34 212 30 222 28 238 L26 252 L28 262 L32 262 L34 252
    C36 242 40 228 44 218 L52 202
    L58 228 C53 238 50 250 53 262
    L56 298 C54 320 53 345 56 368
    L58 418 L62 445 L66 465 L80 468
    L82 445 L84 418 L86 378
    C92 352 96 335 100 322
    L100 316
    L100 322 C104 335 108 352 114 378
    L116 418 L118 445 L120 468
    L134 465 L138 445 L142 418
    L144 368 C147 345 146 320 144 298
    L147 262 C150 250 147 238 142 228
    L150 202 L156 218 C160 228 164 242 166 252
    L168 262 L172 262 L174 252
    L172 238 C170 222 166 212 162 202
    L152 180 C156 176 158 168 156 158
    L154 132 C150 110 132 97 117 92
    L117 85 C117 78 114 73 111 70
    L113 64 C118 58 126 48 126 32
    C126 18 116 5 100 5 Z`;

  const outlinePath = gender === 'her' ? femaleOutline : maleOutline;

  return (
    <svg viewBox="0 0 220 480" className="w-full max-w-xs mx-auto" fill="none">
      <defs>
        <radialGradient id="zoneGlow">
          <stop offset="0%" stopColor="var(--gold)" stopOpacity="0.5" />
          <stop offset="50%" stopColor="var(--gold)" stopOpacity="0.2" />
          <stop offset="100%" stopColor="var(--gold)" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="zoneGlowHover">
          <stop offset="0%" stopColor="var(--gold)" stopOpacity="0.8" />
          <stop offset="50%" stopColor="var(--gold)" stopOpacity="0.3" />
          <stop offset="100%" stopColor="var(--gold)" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="bodyFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--gold)" stopOpacity="0.06" />
          <stop offset="50%" stopColor="var(--gold)" stopOpacity="0.03" />
          <stop offset="100%" stopColor="var(--gold)" stopOpacity="0.06" />
        </linearGradient>
      </defs>

      {/* Body fill — subtle shading inside the silhouette */}
      <path
        d={outlinePath}
        fill="url(#bodyFill)"
        stroke="none"
      />

      {/* Body outline — visible gold stroke */}
      <path
        d={outlinePath}
        stroke="var(--gold)"
        strokeWidth="1.2"
        opacity="0.7"
        className="draw-line"
      />

      {/* Zone hotspots and labels */}
      {zones.map((zone) => {
        const isHovered = hoveredZone === zone.id;
        const showLabel = true; // Always show labels for clarity

        // Connector line endpoints
        const connectorStartX = zone.side === 'right'
          ? zone.cx + zone.r
          : zone.cx - zone.r;
        const connectorEndX = zone.side === 'right'
          ? zone.labelX - 5
          : zone.labelX + 30;
        const textAnchor = zone.side === 'right' ? 'start' : 'end';
        const textX = zone.side === 'right' ? zone.labelX : zone.labelX + 25;

        return (
          <g key={zone.id} style={{ cursor: 'pointer' }}>
            {/* Clickable zone circle */}
            <circle
              cx={zone.cx}
              cy={zone.cy}
              r={zone.r}
              fill={isHovered ? 'url(#zoneGlowHover)' : 'url(#zoneGlow)'}
              className={isHovered ? '' : 'zone-glow'}
              onMouseEnter={() => setHoveredZone(zone.id)}
              onMouseLeave={() => setHoveredZone(null)}
              onClick={() => onSelectZone(zone.id)}
            />

            {/* Zone ring border */}
            <circle
              cx={zone.cx}
              cy={zone.cy}
              r={zone.r}
              fill="none"
              stroke="var(--gold)"
              strokeWidth="0.5"
              opacity={isHovered ? 0.6 : 0.25}
              style={{ pointerEvents: 'none' }}
            />

            {/* Connector line and label */}
            {showLabel && (
              <>
                <line
                  x1={connectorStartX}
                  y1={zone.cy}
                  x2={connectorEndX}
                  y2={zone.labelY}
                  stroke="var(--gold)"
                  strokeWidth="0.5"
                  strokeDasharray="2 2"
                  opacity={isHovered ? 0.8 : 0.35}
                  style={{ pointerEvents: 'none' }}
                />
                <text
                  x={textX}
                  y={zone.labelY + 4}
                  fill="var(--gold)"
                  fontSize={isHovered ? '10' : '8'}
                  fontFamily="Inter, sans-serif"
                  letterSpacing="2"
                  textAnchor={textAnchor}
                  opacity={isHovered ? 1 : 0.55}
                  style={{ textTransform: 'uppercase', pointerEvents: 'none' }}
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

Key changes from original:
- **Complete body**: Both silhouettes now include head, neck, shoulders, arms (with hands), torso, hips, legs, and feet — a full closed path (`Z` at end)
- **ViewBox expanded**: `0 0 220 480` to fit feet
- **Body fill**: Added `url(#bodyFill)` gradient inside the silhouette for subtle shading
- **Zone ring borders**: Added a thin circle border around each zone for visual clarity
- **Labels always visible**: `showLabel = true` instead of hover-only — users immediately see what zones exist
- **Alternating label sides**: Labels alternate left/right to avoid overlap
- **Higher glow opacity**: zoneGlow center went from 0.4 → 0.5, zoneGlowHover from 0.6 → 0.8
- **Outline opacity**: Increased from 0.6 → 0.7

- [ ] **Step 3: Build and verify**

Run:
```bash
cd C:/Users/bench/OneDrive/Desktop/MAOA/.worktrees/feat-website && npm run build
```
Expected: Build succeeds with no errors.

- [ ] **Step 4: Commit**

```bash
cd C:/Users/bench/OneDrive/Desktop/MAOA/.worktrees/feat-website
git add src/components/journey/SilhouetteSVG.tsx src/styles/animations.css
git commit -m "fix: complete zone silhouette with full body, visible hotspots, and always-on labels"
```

---

### Task 4: Silk Texture Background Component

**Files:**
- Create: `src/components/ui/SilkBackground.tsx`
- Modify: `src/styles/global.css` (add silk animation)

Create a reusable CSS-only silk texture background using layered gradients and a subtle animated wave effect.

- [ ] **Step 1: Add silk animation keyframes to global.css**

Append the following at the end of `src/styles/global.css`:

```css
/* Silk texture animation */
@keyframes silkWave {
  0% { background-position: 0% 0%, 0% 0%, 0% 50%; }
  50% { background-position: 100% 0%, 50% 100%, 100% 50%; }
  100% { background-position: 0% 0%, 0% 0%, 0% 50%; }
}

.silk-texture {
  background-image:
    linear-gradient(135deg, transparent 40%, var(--gold) 40.5%, transparent 41%),
    linear-gradient(225deg, transparent 40%, var(--gold) 40.5%, transparent 41%),
    radial-gradient(ellipse at 50% 50%, var(--gold), transparent 70%);
  background-size: 60px 40px, 60px 40px, 120% 100%;
  background-repeat: repeat, repeat, no-repeat;
  opacity: 0.025;
  animation: silkWave 20s ease-in-out infinite;
  pointer-events: none;
}

[data-theme='light'] .silk-texture {
  opacity: 0.04;
}
```

- [ ] **Step 2: Create the SilkBackground component**

Create `src/components/ui/SilkBackground.tsx`:

```tsx
// src/components/ui/SilkBackground.tsx
interface SilkBackgroundProps {
  className?: string;
}

export default function SilkBackground({ className = '' }: SilkBackgroundProps) {
  return (
    <div
      className={`absolute inset-0 overflow-hidden ${className}`}
      aria-hidden="true"
      style={{ pointerEvents: 'none' }}
    >
      {/* Primary silk wave layer */}
      <div className="absolute inset-0 silk-texture" />

      {/* Secondary offset wave for depth */}
      <div
        className="absolute inset-0 silk-texture"
        style={{
          transform: 'rotate(180deg) scale(1.1)',
          animationDelay: '-10s',
          opacity: 0.015,
        }}
      />
    </div>
  );
}
```

- [ ] **Step 3: Build and verify**

Run:
```bash
cd C:/Users/bench/OneDrive/Desktop/MAOA/.worktrees/feat-website && npm run build
```
Expected: Build succeeds with no errors.

- [ ] **Step 4: Commit**

```bash
cd C:/Users/bench/OneDrive/Desktop/MAOA/.worktrees/feat-website
git add src/components/ui/SilkBackground.tsx src/styles/global.css
git commit -m "feat: add silk texture background component with animated wave effect"
```

---

### Task 5: Integrate Silk Background into ArrivalScreen

**Files:**
- Modify: `src/components/journey/ArrivalScreen.tsx`

Add the silk texture to the landing/hero screen as the base atmosphere layer.

- [ ] **Step 1: Add silk background to ArrivalScreen**

Replace the entire contents of `src/components/journey/ArrivalScreen.tsx`:

```tsx
// src/components/journey/ArrivalScreen.tsx
import SilkBackground from '../ui/SilkBackground';

interface ArrivalScreenProps {
  onBegin: () => void;
}

export default function ArrivalScreen({ onBegin }: ArrivalScreenProps) {
  return (
    <div className="min-h-screen flex items-center justify-center text-center px-6 relative overflow-hidden">
      {/* Silk texture atmosphere */}
      <SilkBackground />

      <div className="max-w-2xl relative z-10">
        {/* Gold decorative line */}
        <div className="w-16 h-px bg-gradient-to-r from-gold-deep to-gold mx-auto mb-8 animate-fade-in" />

        <p className="text-gold-deep text-[10px] tracking-[4px] uppercase mb-6 font-body animate-fade-in-up" style={{ animationDelay: '0.2s', opacity: 0 }}>
          Professeur Boukind — Casablanca
        </p>

        <h1
          className="font-heading text-4xl sm:text-6xl lg:text-7xl font-light text-text mb-4 leading-tight animate-fade-in-up"
          style={{ animationDelay: '0.4s', opacity: 0 }}
        >
          La beauté,
          <br />
          <span className="italic">intelligemment</span> révélée.
        </h1>

        <p
          className="text-text-muted text-sm sm:text-base font-light max-w-md mx-auto mb-12 leading-relaxed animate-fade-in-up"
          style={{ animationDelay: '0.6s', opacity: 0 }}
        >
          Une approche sur-mesure de la médecine et chirurgie esthétique,
          où chaque geste est un acte artistique.
        </p>

        <div className="animate-fade-in-up" style={{ animationDelay: '0.8s', opacity: 0 }}>
          <button
            onClick={onBegin}
            className="inline-flex items-center gap-3 px-10 py-4 border border-gold/30 text-[11px] tracking-[3px] uppercase text-text hover:bg-text hover:text-bg-deep transition-all duration-300"
          >
            Commencer le parcours
            <span className="text-gold">→</span>
          </button>
        </div>

        {/* Bottom decorative element */}
        <div className="mt-16 animate-fade-in" style={{ animationDelay: '1.2s', opacity: 0 }}>
          <p className="text-[9px] tracking-[3px] uppercase text-text-muted/50">
            — Art in Aesthetic Medicine —
          </p>
        </div>
      </div>
    </div>
  );
}
```

Key changes:
- Added `relative overflow-hidden` to the container
- Imported and added `<SilkBackground />` as first child
- Added `relative z-10` to the content div so it sits above the silk layer

- [ ] **Step 2: Build and verify**

Run:
```bash
cd C:/Users/bench/OneDrive/Desktop/MAOA/.worktrees/feat-website && npm run build
```
Expected: Build succeeds with no errors.

- [ ] **Step 3: Commit**

```bash
cd C:/Users/bench/OneDrive/Desktop/MAOA/.worktrees/feat-website
git add src/components/journey/ArrivalScreen.tsx
git commit -m "feat: add silk texture atmosphere to hero/arrival screen"
```

---

### Task 6: Hero Image Holders + Lip Procedure Image

**Files:**
- Modify: `src/components/journey/ArrivalScreen.tsx`

Add decorative image holders to the landing page — positioned as floating background elements on the sides. Uses Unsplash stock photos for aesthetic medicine: a model portrait, a lip procedure close-up, and an abstract beauty shot. Images are positioned absolutely so they float behind/beside the hero text.

- [ ] **Step 1: Add hero image holders to ArrivalScreen**

In `src/components/journey/ArrivalScreen.tsx`, replace the component with:

```tsx
// src/components/journey/ArrivalScreen.tsx
import SilkBackground from '../ui/SilkBackground';

interface ArrivalScreenProps {
  onBegin: () => void;
}

export default function ArrivalScreen({ onBegin }: ArrivalScreenProps) {
  return (
    <div className="min-h-screen flex items-center justify-center text-center px-6 relative overflow-hidden">
      {/* Silk texture atmosphere */}
      <SilkBackground />

      {/* Decorative hero images — floating behind content */}
      <div className="absolute inset-0 pointer-events-none hidden lg:block" aria-hidden="true">
        {/* Left image — model portrait */}
        <div
          className="absolute left-[5%] top-[15%] w-52 h-72 overflow-hidden animate-fade-in-slow"
          style={{ animationDelay: '1s', opacity: 0 }}
        >
          <div className="w-full h-full bg-bg-elevated/50 border border-line/30" />
          <img
            src="/images/hero/model-portrait.jpg"
            alt=""
            className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-luminosity"
            loading="lazy"
            onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-bg-deep/80 via-transparent to-bg-deep/30" />
        </div>

        {/* Right image — lip procedure */}
        <div
          className="absolute right-[5%] top-[30%] w-48 h-64 overflow-hidden animate-fade-in-slow"
          style={{ animationDelay: '1.4s', opacity: 0 }}
        >
          <div className="w-full h-full bg-bg-elevated/50 border border-line/30" />
          <img
            src="/images/hero/lip-procedure.jpg"
            alt=""
            className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-luminosity"
            loading="lazy"
            onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-bg-deep/80 via-transparent to-bg-deep/30" />
        </div>

        {/* Bottom-left image — beauty/skin close-up */}
        <div
          className="absolute left-[8%] bottom-[10%] w-44 h-56 overflow-hidden animate-fade-in-slow"
          style={{ animationDelay: '1.8s', opacity: 0 }}
        >
          <div className="w-full h-full bg-bg-elevated/50 border border-line/30" />
          <img
            src="/images/hero/beauty-closeup.jpg"
            alt=""
            className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-luminosity"
            loading="lazy"
            onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-bg-deep/80 via-transparent to-bg-deep/30" />
        </div>
      </div>

      <div className="max-w-2xl relative z-10">
        {/* Gold decorative line */}
        <div className="w-16 h-px bg-gradient-to-r from-gold-deep to-gold mx-auto mb-8 animate-fade-in" />

        <p className="text-gold-deep text-[10px] tracking-[4px] uppercase mb-6 font-body animate-fade-in-up" style={{ animationDelay: '0.2s', opacity: 0 }}>
          Professeur Boukind — Casablanca
        </p>

        <h1
          className="font-heading text-4xl sm:text-6xl lg:text-7xl font-light text-text mb-4 leading-tight animate-fade-in-up"
          style={{ animationDelay: '0.4s', opacity: 0 }}
        >
          La beauté,
          <br />
          <span className="italic">intelligemment</span> révélée.
        </h1>

        <p
          className="text-text-muted text-sm sm:text-base font-light max-w-md mx-auto mb-12 leading-relaxed animate-fade-in-up"
          style={{ animationDelay: '0.6s', opacity: 0 }}
        >
          Une approche sur-mesure de la médecine et chirurgie esthétique,
          où chaque geste est un acte artistique.
        </p>

        <div className="animate-fade-in-up" style={{ animationDelay: '0.8s', opacity: 0 }}>
          <button
            onClick={onBegin}
            className="inline-flex items-center gap-3 px-10 py-4 border border-gold/30 text-[11px] tracking-[3px] uppercase text-text hover:bg-text hover:text-bg-deep transition-all duration-300"
          >
            Commencer le parcours
            <span className="text-gold">→</span>
          </button>
        </div>

        {/* Bottom decorative element */}
        <div className="mt-16 animate-fade-in" style={{ animationDelay: '1.2s', opacity: 0 }}>
          <p className="text-[9px] tracking-[3px] uppercase text-text-muted/50">
            — Art in Aesthetic Medicine —
          </p>
        </div>
      </div>
    </div>
  );
}
```

Key design decisions:
- **3 image holders**: left-top (model portrait), right-middle (lip procedure), bottom-left (beauty close-up)
- **Desktop only**: `hidden lg:block` — images are decorative and would crowd mobile
- **Graceful fallback**: `onError` hides the `<img>` if the file doesn't exist yet, showing just the `bg-bg-elevated/50` placeholder frame with a border
- **Desaturated blend**: `opacity-60 mix-blend-luminosity` keeps images subtle and on-brand
- **Gradient overlays**: Images fade into the background at top and bottom
- **Staggered entrance**: Each image fades in 0.4s after the previous

- [ ] **Step 2: Create hero image directory**

Run:
```bash
mkdir -p "C:/Users/bench/OneDrive/Desktop/MAOA/.worktrees/feat-website/public/images/hero"
```

Note: The image holders work without images (they show a styled empty frame). The user should add their own images at:
- `public/images/hero/model-portrait.jpg` — a tasteful model portrait
- `public/images/hero/lip-procedure.jpg` — woman getting lip filler/work
- `public/images/hero/beauty-closeup.jpg` — skin/beauty close-up

- [ ] **Step 3: Build and verify**

Run:
```bash
cd C:/Users/bench/OneDrive/Desktop/MAOA/.worktrees/feat-website && npm run build
```
Expected: Build succeeds with no errors.

- [ ] **Step 4: Commit**

```bash
cd C:/Users/bench/OneDrive/Desktop/MAOA/.worktrees/feat-website
git add src/components/journey/ArrivalScreen.tsx public/images/hero/
git commit -m "feat: add hero image holders with graceful fallback for model, lip procedure, and beauty shots"
```

---

## Summary

| Task | What it does |
|------|-------------|
| 1 | Fixes light mode — warm parchment instead of blinding white |
| 2 | Fixes gender silhouettes — 3x more visible with gradient fill |
| 3 | Fixes zone silhouette — full body with arms/feet, visible hotspots, always-on labels |
| 4 | Creates silk texture component — CSS-only animated wave pattern |
| 5 | Adds silk texture to hero/arrival screen |
| 6 | Adds 3 hero image holders (model, lip procedure, beauty) with graceful fallback |

Tasks 1-3 are independent (can be parallelized). Tasks 4-5 are sequential. Task 6 depends on Task 5.
