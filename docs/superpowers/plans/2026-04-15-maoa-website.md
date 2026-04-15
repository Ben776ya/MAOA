# MAOA Website — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the MAOA luxury aesthetic clinic website MVP — an immersive React SPA journey inside Astro that captures user preferences through beautiful interactions and delivers personalized treatment recommendations, with Supabase lead capture and Vercel deployment.

**Architecture:** Hybrid Astro site with a React island (`client:only="react"`) as the homepage journey. The React island manages all 9 screens, trust layer, and booking modal via a `useReducer` state machine. Static Astro shell provides SEO, theming, and navigation. TailwindCSS with CSS custom properties for dark/light theme support.

**Tech Stack:** Astro 5, React 19, TailwindCSS 3, TypeScript, Vitest, Supabase (form submissions), Vercel (hosting), @fontsource (self-hosted fonts)

---

## File Map

### New files (by task)

| Task | Files Created |
|------|--------------|
| 1 | `package.json`, `astro.config.mjs`, `tailwind.config.mjs`, `tsconfig.json`, `.env.example` |
| 2 | `src/styles/global.css`, `src/styles/animations.css` |
| 3 | `src/types.ts` |
| 4 | `src/data/treatments.json`, `src/data/zones.json`, `src/data/recommendations.json`, `src/data/team.json`, `src/data/testimonials.json` |
| 5 | `src/lib/recommend.ts`, `src/lib/recommend.test.ts` |
| 6 | `src/layouts/BaseLayout.astro`, `src/pages/index.astro`, `src/components/ui/Navigation.astro`, `src/components/ui/ThemeToggle.tsx` |
| 7 | `src/components/ui/Button.tsx`, `src/components/ui/Card.tsx` |
| 8 | `src/components/journey/JourneyApp.tsx` |
| 9 | `src/components/journey/ArrivalScreen.tsx` |
| 10 | `src/components/journey/GenderScreen.tsx` |
| 11 | `src/components/journey/PathScreen.tsx` |
| 12 | `src/components/journey/SilhouetteSVG.tsx`, `src/components/journey/SilhouetteScreen.tsx` |
| 13 | `src/components/journey/ZoneDetailScreen.tsx` |
| 14 | `src/components/journey/LifeStageScreen.tsx`, `src/components/journey/ConcernScreen.tsx` |
| 15 | `src/components/journey/RecommendationScreen.tsx` |
| 16 | `src/components/trust/ProfessorBio.tsx`, `src/components/trust/ClinicShowcase.tsx`, `src/components/trust/TeamGrid.tsx`, `src/components/trust/Testimonials.tsx`, `src/components/trust/MedicalTourism.tsx` |
| 17 | `src/components/journey/BookingModal.tsx`, `src/lib/supabase.ts` |
| 18 | `src/components/journey/ThankYouScreen.tsx`, `src/components/ui/WhatsAppButton.astro` |

---

### Task 1: Project Scaffolding & Dependencies

**Files:**
- Create: `package.json`
- Create: `astro.config.mjs`
- Create: `tailwind.config.mjs`
- Create: `tsconfig.json`
- Create: `.env.example`

- [ ] **Step 1: Initialize package.json**

```json
{
  "name": "maoa",
  "type": "module",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "astro dev",
    "build": "astro build",
    "preview": "astro preview",
    "test": "vitest run",
    "test:watch": "vitest"
  }
}
```

Save to `package.json`.

- [ ] **Step 2: Install dependencies**

Run:
```bash
npm install astro @astrojs/react @astrojs/tailwind react react-dom tailwindcss @supabase/supabase-js
npm install -D @types/react @types/react-dom typescript vitest
npm install @fontsource/cormorant-garamond @fontsource/inter
```

Expected: `node_modules/` created, `package-lock.json` generated.

- [ ] **Step 3: Create Astro config**

```js
// astro.config.mjs
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  integrations: [react(), tailwind()],
  output: 'static',
});
```

- [ ] **Step 4: Create Tailwind config**

```js
// tailwind.config.mjs
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'bg-deep': 'var(--bg-deep)',
        'bg-base': 'var(--bg-base)',
        'bg-elevated': 'var(--bg-elevated)',
        gold: 'var(--gold)',
        'gold-deep': 'var(--gold-deep)',
        text: 'var(--text)',
        'text-muted': 'var(--text-muted)',
        line: 'var(--line)',
      },
      fontFamily: {
        heading: ['Cormorant Garamond', 'Georgia', 'serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease forwards',
        'fade-in-up': 'fadeInUp 0.6s ease forwards',
        'fade-in-slow': 'fadeIn 1.2s ease forwards',
        'gold-pulse': 'goldPulse 2s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        fadeInUp: {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        goldPulse: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.6' },
        },
      },
    },
  },
  plugins: [],
};
```

- [ ] **Step 5: Create TypeScript config**

```json
{
  "extends": "astro/tsconfigs/strict",
  "compilerOptions": {
    "jsx": "react-jsx",
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  }
}
```

Save to `tsconfig.json`.

- [ ] **Step 6: Create .env.example**

```
PUBLIC_SUPABASE_URL=
PUBLIC_SUPABASE_ANON_KEY=
PUBLIC_WHATSAPP_NUMBER=212XXXXXXXXX
```

- [ ] **Step 7: Create directory structure**

Run:
```bash
mkdir -p src/components/journey src/components/trust src/components/ui src/data src/layouts src/pages src/styles src/lib public/images/treatments public/images/team public/images/clinic
```

- [ ] **Step 8: Verify Astro runs**

Run: `npm run dev`
Expected: Astro dev server starts (will show missing pages warning, that's fine).
Stop the server.

- [ ] **Step 9: Commit**

```bash
git add package.json package-lock.json astro.config.mjs tailwind.config.mjs tsconfig.json .env.example
git commit -m "feat: scaffold Astro project with React, Tailwind, Supabase deps"
```

---

### Task 2: Design System — Theme Variables & Global Styles

**Files:**
- Create: `src/styles/global.css`
- Create: `src/styles/animations.css`

- [ ] **Step 1: Create global.css with theme variables**

```css
/* src/styles/global.css */
@import '@fontsource/cormorant-garamond/300.css';
@import '@fontsource/cormorant-garamond/400.css';
@import '@fontsource/inter/200.css';
@import '@fontsource/inter/300.css';
@import '@fontsource/inter/400.css';

@tailwind base;
@tailwind components;
@tailwind utilities;

/* Dark theme (default) */
:root,
[data-theme='dark'] {
  --bg-deep: #0D0D0D;
  --bg-base: #1A1A1A;
  --bg-elevated: #2A2A2A;
  --gold: #C9A87C;
  --gold-deep: #A8895D;
  --text: #FAF7F2;
  --text-muted: #A09993;
  --line: #333333;
}

/* Light theme */
[data-theme='light'] {
  --bg-deep: #FFFFFF;
  --bg-base: #FAF7F2;
  --bg-elevated: #F3ECDD;
  --gold: #C9A87C;
  --gold-deep: #A8895D;
  --text: #1A1A1A;
  --text-muted: #6B6560;
  --line: #E8E2D5;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  font-family: 'Inter', system-ui, sans-serif;
  font-weight: 300;
  background-color: var(--bg-deep);
  color: var(--text);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  overflow-x: hidden;
}

::selection {
  background-color: var(--gold);
  color: var(--bg-deep);
}

/* Scrollbar styling */
::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-track {
  background: var(--bg-deep);
}

::-webkit-scrollbar-thumb {
  background: var(--gold-deep);
  border-radius: 3px;
}
```

- [ ] **Step 2: Create animations.css**

```css
/* src/styles/animations.css */

/* Screen transition wrapper */
.screen-transition {
  animation: screenEnter 0.6s ease forwards;
}

@keyframes screenEnter {
  from {
    opacity: 0;
    transform: translateY(24px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Staggered children animation */
.stagger-children > * {
  opacity: 0;
  animation: fadeInUp 0.5s ease forwards;
}

.stagger-children > *:nth-child(1) { animation-delay: 0.1s; }
.stagger-children > *:nth-child(2) { animation-delay: 0.2s; }
.stagger-children > *:nth-child(3) { animation-delay: 0.3s; }
.stagger-children > *:nth-child(4) { animation-delay: 0.4s; }
.stagger-children > *:nth-child(5) { animation-delay: 0.5s; }

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(16px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Gold line drawing animation (for silhouette) */
.draw-line {
  stroke-dasharray: 1000;
  stroke-dashoffset: 1000;
  animation: drawLine 2s ease forwards;
}

@keyframes drawLine {
  to {
    stroke-dashoffset: 0;
  }
}

/* Subtle float animation */
.float {
  animation: float 3s ease-in-out infinite;
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-8px); }
}

/* Loading shimmer */
.shimmer {
  background: linear-gradient(
    90deg,
    var(--bg-base) 25%,
    var(--bg-elevated) 50%,
    var(--bg-base) 75%
  );
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
}

@keyframes shimmer {
  from { background-position: 200% 0; }
  to { background-position: -200% 0; }
}
```

- [ ] **Step 3: Commit**

```bash
git add src/styles/global.css src/styles/animations.css
git commit -m "feat: add design system — theme variables, typography, animations"
```

---

### Task 3: TypeScript Types & Interfaces

**Files:**
- Create: `src/types.ts`

- [ ] **Step 1: Create type definitions**

```typescript
// src/types.ts

// --- Data Models ---

export interface Treatment {
  id: string;
  name: string;
  category: 'injectable' | 'medium-surgery' | 'heavy-surgery';
  description: string;
  duration: string;
  sessions: string;
  results: string;
  image: string;
  zones: string[];
  gender: ('her' | 'him')[];
  tags: string[];
}

export interface Zone {
  id: string;
  label: string;
  questions: ZoneQuestion[];
}

export interface ZoneQuestion {
  question: string;
  answers: string[];
}

export interface ZoneRule {
  zone: string;
  gender: 'her' | 'him';
  default: string[];
}

export interface AgeRule {
  age: string;
  concern: string;
  gender: 'her' | 'him';
  treatments: string[];
}

export interface RecommendationData {
  zone_rules: ZoneRule[];
  age_rules: AgeRule[];
}

export interface TeamMember {
  name: string;
  title: string;
  description: string;
  image: string;
}

export interface Testimonial {
  quote: string;
  name: string;
  age: number;
  city: string;
}

// --- Journey State ---

export type Screen =
  | 'arrival'
  | 'gender'
  | 'path'
  | 'silhouette'
  | 'zone-detail'
  | 'life-stage'
  | 'concern'
  | 'recommendations'
  | 'thank-you';

export interface JourneyState {
  screen: Screen;
  history: Screen[];
  gender: 'her' | 'him' | null;
  path: 'zone' | 'age' | null;
  zone: string | null;
  age: string | null;
  concern: string | null;
  zoneAnswers: string[];
  bookingOpen: boolean;
}

export type JourneyAction =
  | { type: 'BEGIN' }
  | { type: 'SELECT_GENDER'; gender: 'her' | 'him' }
  | { type: 'SELECT_PATH'; path: 'zone' | 'age' }
  | { type: 'SELECT_ZONE'; zone: string }
  | { type: 'ANSWER_ZONE_QUESTION'; answer: string }
  | { type: 'COMPLETE_ZONE_DETAIL' }
  | { type: 'SELECT_AGE'; age: string }
  | { type: 'SELECT_CONCERN'; concern: string }
  | { type: 'OPEN_BOOKING' }
  | { type: 'CLOSE_BOOKING' }
  | { type: 'BOOKING_COMPLETE' }
  | { type: 'GO_BACK' };

// --- Supabase ---

export interface LeadData {
  name: string;
  whatsapp: string;
  preferred_contact: string;
  gender: string | null;
  path: string | null;
  zone: string | null;
  age: string | null;
  concern: string | null;
  recommendations: string[];
}
```

- [ ] **Step 2: Commit**

```bash
git add src/types.ts
git commit -m "feat: add TypeScript types for data models and journey state"
```

---

### Task 4: Treatment Data & Recommendation Rules

**Files:**
- Create: `src/data/treatments.json`
- Create: `src/data/zones.json`
- Create: `src/data/recommendations.json`
- Create: `src/data/team.json`
- Create: `src/data/testimonials.json`

- [ ] **Step 1: Create treatments.json**

```json
[
  {
    "id": "botox",
    "name": "Toxine Botulique",
    "category": "injectable",
    "description": "Atténue les rides d'expression avec précision pour un visage détendu et naturel, sans figer les traits.",
    "duration": "20 min",
    "sessions": "1 séance",
    "results": "Résultats en 3-5 jours",
    "image": "/images/treatments/botox.jpg",
    "zones": ["eyes", "face"],
    "gender": ["her", "him"],
    "tags": ["rides", "expression", "front", "pattes-doie"]
  },
  {
    "id": "acide-hyaluronique",
    "name": "Acide Hyaluronique",
    "category": "injectable",
    "description": "Restaure les volumes perdus et redessine les contours du visage avec un résultat subtil et harmonieux.",
    "duration": "30 min",
    "sessions": "1 séance",
    "results": "Résultats immédiats",
    "image": "/images/treatments/filler.jpg",
    "zones": ["face", "lips"],
    "gender": ["her", "him"],
    "tags": ["volume", "contours", "rides", "hydratation"]
  },
  {
    "id": "skin-boosters",
    "name": "Skin Boosters",
    "category": "injectable",
    "description": "Une infusion subtile qui restaure l'hydratation et la luminosité naturelle de la peau de l'intérieur.",
    "duration": "30 min",
    "sessions": "3 séances",
    "results": "Résultats en 2 semaines",
    "image": "/images/treatments/skin-boosters.jpg",
    "zones": ["face", "neck"],
    "gender": ["her", "him"],
    "tags": ["éclat", "hydratation", "luminosité"]
  },
  {
    "id": "mesotherapie",
    "name": "Mésothérapie",
    "category": "injectable",
    "description": "Cocktail de vitamines et minéraux injecté superficiellement pour revitaliser et nourrir la peau en profondeur.",
    "duration": "30 min",
    "sessions": "4 séances",
    "results": "Résultats progressifs",
    "image": "/images/treatments/mesotherapy.jpg",
    "zones": ["face", "hair"],
    "gender": ["her", "him"],
    "tags": ["éclat", "vitalité", "nutrition"]
  },
  {
    "id": "hydrafacial",
    "name": "HydraFacial",
    "category": "injectable",
    "description": "Soin en 3 étapes — nettoyage, exfoliation, hydratation — pour une peau éclatante sans temps d'arrêt.",
    "duration": "45 min",
    "sessions": "1 séance",
    "results": "Résultats immédiats",
    "image": "/images/treatments/hydrafacial.jpg",
    "zones": ["face"],
    "gender": ["her", "him"],
    "tags": ["éclat", "nettoyage", "hydratation"]
  },
  {
    "id": "peeling",
    "name": "Peeling Chimique",
    "category": "injectable",
    "description": "Renouvellement cellulaire contrôlé pour atténuer taches, cicatrices et irrégularités du teint.",
    "duration": "30 min",
    "sessions": "3 séances",
    "results": "Résultats en 1 semaine",
    "image": "/images/treatments/peeling.jpg",
    "zones": ["face"],
    "gender": ["her", "him"],
    "tags": ["teint", "taches", "renouvellement"]
  },
  {
    "id": "blepharoplastie",
    "name": "Blépharoplastie",
    "category": "medium-surgery",
    "description": "Chirurgie des paupières pour un regard reposé et rajeuni, supprimant l'excès cutané et les poches.",
    "duration": "1-2h",
    "sessions": "1 intervention",
    "results": "Résultats en 3 semaines",
    "image": "/images/treatments/blepharoplasty.jpg",
    "zones": ["eyes"],
    "gender": ["her", "him"],
    "tags": ["regard", "paupières", "rajeunissement"]
  },
  {
    "id": "rhinoplastie",
    "name": "Rhinoplastie",
    "category": "heavy-surgery",
    "description": "Remodelage du nez pour une harmonie parfaite avec les traits du visage, résultat naturel garanti.",
    "duration": "2-3h",
    "sessions": "1 intervention",
    "results": "Résultat final en 6 mois",
    "image": "/images/treatments/rhinoplasty.jpg",
    "zones": ["face"],
    "gender": ["her", "him"],
    "tags": ["nez", "harmonie", "profil"]
  },
  {
    "id": "lip-filler",
    "name": "Augmentation des Lèvres",
    "category": "injectable",
    "description": "Redéfinition et volumisation des lèvres pour un sourire naturellement pulpeux et harmonieux.",
    "duration": "20 min",
    "sessions": "1 séance",
    "results": "Résultats immédiats",
    "image": "/images/treatments/lip-filler.jpg",
    "zones": ["lips"],
    "gender": ["her", "him"],
    "tags": ["lèvres", "volume", "contour"]
  },
  {
    "id": "lifting-cervico-facial",
    "name": "Lifting Cervico-Facial",
    "category": "heavy-surgery",
    "description": "Remise en tension des tissus du visage et du cou pour un rajeunissement profond et durable.",
    "duration": "3-4h",
    "sessions": "1 intervention",
    "results": "Résultat final en 3 mois",
    "image": "/images/treatments/facelift.jpg",
    "zones": ["face", "neck"],
    "gender": ["her", "him"],
    "tags": ["rajeunissement", "relâchement", "ovale"]
  },
  {
    "id": "profhilo",
    "name": "Profhilo",
    "category": "injectable",
    "description": "Bio-remodelage cutané par acide hyaluronique ultra-pur pour une peau raffermie et lumineuse.",
    "duration": "20 min",
    "sessions": "2 séances",
    "results": "Résultats en 4 semaines",
    "image": "/images/treatments/profhilo.jpg",
    "zones": ["face", "neck"],
    "gender": ["her", "him"],
    "tags": ["fermeté", "éclat", "bio-remodelage"]
  },
  {
    "id": "augmentation-mammaire",
    "name": "Augmentation Mammaire",
    "category": "heavy-surgery",
    "description": "Pose de prothèses ou lipofilling pour une poitrine harmonieuse adaptée à votre morphologie.",
    "duration": "1-2h",
    "sessions": "1 intervention",
    "results": "Résultat final en 3 mois",
    "image": "/images/treatments/breast-augmentation.jpg",
    "zones": ["chest"],
    "gender": ["her"],
    "tags": ["poitrine", "volume", "silhouette"]
  },
  {
    "id": "lifting-mammaire",
    "name": "Lifting Mammaire",
    "category": "heavy-surgery",
    "description": "Repositionnement de la poitrine pour retrouver galbe et fermeté, avec ou sans prothèses.",
    "duration": "2-3h",
    "sessions": "1 intervention",
    "results": "Résultat final en 3 mois",
    "image": "/images/treatments/breast-lift.jpg",
    "zones": ["chest"],
    "gender": ["her"],
    "tags": ["poitrine", "fermeté", "silhouette"]
  },
  {
    "id": "liposuccion",
    "name": "Liposuccion",
    "category": "medium-surgery",
    "description": "Aspiration ciblée des amas graisseux résistants pour sculpter et affiner la silhouette.",
    "duration": "1-3h",
    "sessions": "1 intervention",
    "results": "Résultat final en 2 mois",
    "image": "/images/treatments/liposuction.jpg",
    "zones": ["abdomen", "hips", "thighs", "chest"],
    "gender": ["her", "him"],
    "tags": ["silhouette", "graisse", "sculpture"]
  },
  {
    "id": "abdominoplastie",
    "name": "Abdominoplastie",
    "category": "heavy-surgery",
    "description": "Remodelage complet de la paroi abdominale : retrait de l'excès cutané et remise en tension musculaire.",
    "duration": "2-4h",
    "sessions": "1 intervention",
    "results": "Résultat final en 3 mois",
    "image": "/images/treatments/tummy-tuck.jpg",
    "zones": ["abdomen"],
    "gender": ["her", "him"],
    "tags": ["ventre", "silhouette", "peau"]
  },
  {
    "id": "prp-capillaire",
    "name": "PRP Capillaire",
    "category": "injectable",
    "description": "Injections de plasma riche en plaquettes pour stimuler la repousse et densifier la chevelure.",
    "duration": "45 min",
    "sessions": "3 séances",
    "results": "Résultats en 3 mois",
    "image": "/images/treatments/prp-hair.jpg",
    "zones": ["hair"],
    "gender": ["her", "him"],
    "tags": ["cheveux", "repousse", "densité"]
  },
  {
    "id": "greffe-cheveux",
    "name": "Greffe de Cheveux",
    "category": "medium-surgery",
    "description": "Transplantation folliculaire FUE pour une chevelure dense et naturelle, résultat définitif.",
    "duration": "4-8h",
    "sessions": "1 intervention",
    "results": "Résultat final en 12 mois",
    "image": "/images/treatments/hair-transplant.jpg",
    "zones": ["hair"],
    "gender": ["her", "him"],
    "tags": ["cheveux", "calvitie", "densité"]
  },
  {
    "id": "fils-tenseurs",
    "name": "Fils Tenseurs",
    "category": "injectable",
    "description": "Fils résorbables positionnés sous la peau pour un effet lifting immédiat sans chirurgie.",
    "duration": "45 min",
    "sessions": "1 séance",
    "results": "Résultats immédiats",
    "image": "/images/treatments/thread-lift.jpg",
    "zones": ["face", "neck"],
    "gender": ["her", "him"],
    "tags": ["lifting", "fermeté", "ovale"]
  },
  {
    "id": "coolsculpting",
    "name": "CoolSculpting",
    "category": "injectable",
    "description": "Cryolipolyse non-invasive pour éliminer les cellules graisseuses par le froid, sans chirurgie.",
    "duration": "45 min",
    "sessions": "1-2 séances",
    "results": "Résultats en 2 mois",
    "image": "/images/treatments/coolsculpting.jpg",
    "zones": ["abdomen", "hips", "thighs"],
    "gender": ["her", "him"],
    "tags": ["silhouette", "graisse", "non-invasif"]
  },
  {
    "id": "microneedling",
    "name": "Microneedling",
    "category": "injectable",
    "description": "Micro-perforations contrôlées stimulant la production naturelle de collagène pour une peau renouvelée.",
    "duration": "30 min",
    "sessions": "3 séances",
    "results": "Résultats en 4 semaines",
    "image": "/images/treatments/microneedling.jpg",
    "zones": ["face", "hair"],
    "gender": ["her", "him"],
    "tags": ["collagène", "renouvellement", "texture"]
  }
]
```

Save to `src/data/treatments.json`.

- [ ] **Step 2: Create zones.json**

```json
[
  {
    "id": "hair",
    "label": "Cheveux",
    "questions": [
      {
        "question": "Quel est votre principal souci capillaire ?",
        "answers": ["Perte de cheveux", "Cheveux clairsemés", "Recul de la ligne frontale"]
      },
      {
        "question": "Depuis combien de temps ?",
        "answers": ["Moins d'un an", "1 à 3 ans", "Plus de 3 ans"]
      },
      {
        "question": "Quel résultat espérez-vous ?",
        "answers": ["Stopper la chute", "Densifier", "Retrouver une chevelure complète"]
      }
    ]
  },
  {
    "id": "eyes",
    "label": "Regard",
    "questions": [
      {
        "question": "Qu'est-ce qui vous gêne le plus ?",
        "answers": ["Paupières tombantes", "Poches sous les yeux", "Rides et pattes d'oie"]
      },
      {
        "question": "Comment décririez-vous votre regard ?",
        "answers": ["Fatigué", "Vieilli", "Asymétrique"]
      },
      {
        "question": "Quel résultat recherchez-vous ?",
        "answers": ["Un regard reposé", "Un regard plus jeune", "Un regard plus ouvert"]
      }
    ]
  },
  {
    "id": "lips",
    "label": "Lèvres",
    "questions": [
      {
        "question": "Qu'aimeriez-vous améliorer ?",
        "answers": ["Volume insuffisant", "Contour flou", "Asymétrie"]
      },
      {
        "question": "Quel style recherchez-vous ?",
        "answers": ["Naturel et subtil", "Pulpeux et défini", "Correction ciblée"]
      },
      {
        "question": "Avez-vous déjà eu des injections ?",
        "answers": ["Non, première fois", "Oui, il y a plus d'un an", "Oui, récemment"]
      }
    ]
  },
  {
    "id": "neck",
    "label": "Cou",
    "questions": [
      {
        "question": "Qu'est-ce qui vous préoccupe ?",
        "answers": ["Relâchement cutané", "Rides et plis", "Double menton"]
      },
      {
        "question": "Depuis quand remarquez-vous ces changements ?",
        "answers": ["Récemment", "Quelques années", "Depuis longtemps"]
      },
      {
        "question": "Quel résultat espérez-vous ?",
        "answers": ["Raffermir la peau", "Redéfinir l'ovale", "Rajeunir l'ensemble"]
      }
    ]
  },
  {
    "id": "chest",
    "label": "Poitrine",
    "questions": [
      {
        "question": "Qu'aimeriez-vous changer ?",
        "answers": ["Volume insuffisant", "Ptôse (affaissement)", "Asymétrie"]
      },
      {
        "question": "Quel résultat recherchez-vous ?",
        "answers": ["Plus de volume", "Plus de fermeté", "Meilleure harmonie"]
      },
      {
        "question": "Avez-vous des contraintes particulières ?",
        "answers": ["Aucune", "Activité sportive intense", "Projet de grossesse"]
      }
    ]
  },
  {
    "id": "abdomen",
    "label": "Ventre",
    "questions": [
      {
        "question": "Qu'est-ce qui vous gêne le plus ?",
        "answers": ["Excès de graisse", "Peau relâchée", "Les deux"]
      },
      {
        "question": "Avez-vous eu des grossesses ou variations de poids ?",
        "answers": ["Non", "Oui, une grossesse", "Oui, plusieurs"]
      },
      {
        "question": "Quel résultat espérez-vous ?",
        "answers": ["Un ventre plus plat", "Une peau raffermie", "Un remodelage complet"]
      }
    ]
  },
  {
    "id": "hips",
    "label": "Hanches",
    "questions": [
      {
        "question": "Qu'aimeriez-vous améliorer ?",
        "answers": ["Amas graisseux localisés", "Manque de galbe", "Culotte de cheval"]
      },
      {
        "question": "Avez-vous essayé d'autres méthodes ?",
        "answers": ["Non", "Sport et régime", "Traitements esthétiques"]
      },
      {
        "question": "Quel résultat recherchez-vous ?",
        "answers": ["Affiner", "Sculpter", "Rééquilibrer la silhouette"]
      }
    ]
  },
  {
    "id": "thighs",
    "label": "Cuisses",
    "questions": [
      {
        "question": "Quelle zone vous préoccupe ?",
        "answers": ["Intérieur des cuisses", "Extérieur des cuisses", "L'ensemble"]
      },
      {
        "question": "Quel est votre souci principal ?",
        "answers": ["Excès de volume", "Cellulite", "Relâchement cutané"]
      },
      {
        "question": "Quel résultat espérez-vous ?",
        "answers": ["Des cuisses affinées", "Une peau plus lisse", "Une silhouette harmonieuse"]
      }
    ]
  }
]
```

Save to `src/data/zones.json`.

- [ ] **Step 3: Create recommendations.json**

```json
{
  "zone_rules": [
    { "zone": "hair", "gender": "her", "default": ["prp-capillaire", "mesotherapie", "microneedling"] },
    { "zone": "hair", "gender": "him", "default": ["greffe-cheveux", "prp-capillaire", "mesotherapie"] },
    { "zone": "eyes", "gender": "her", "default": ["blepharoplastie", "botox", "acide-hyaluronique"] },
    { "zone": "eyes", "gender": "him", "default": ["blepharoplastie", "botox", "skin-boosters"] },
    { "zone": "lips", "gender": "her", "default": ["lip-filler", "acide-hyaluronique", "microneedling"] },
    { "zone": "lips", "gender": "him", "default": ["lip-filler", "acide-hyaluronique", "botox"] },
    { "zone": "neck", "gender": "her", "default": ["profhilo", "fils-tenseurs", "lifting-cervico-facial"] },
    { "zone": "neck", "gender": "him", "default": ["profhilo", "fils-tenseurs", "botox"] },
    { "zone": "chest", "gender": "her", "default": ["augmentation-mammaire", "lifting-mammaire", "liposuccion"] },
    { "zone": "chest", "gender": "him", "default": ["liposuccion", "coolsculpting", "skin-boosters"] },
    { "zone": "abdomen", "gender": "her", "default": ["abdominoplastie", "liposuccion", "coolsculpting"] },
    { "zone": "abdomen", "gender": "him", "default": ["abdominoplastie", "liposuccion", "coolsculpting"] },
    { "zone": "hips", "gender": "her", "default": ["liposuccion", "coolsculpting", "abdominoplastie"] },
    { "zone": "hips", "gender": "him", "default": ["liposuccion", "coolsculpting", "abdominoplastie"] },
    { "zone": "thighs", "gender": "her", "default": ["liposuccion", "coolsculpting", "mesotherapie"] },
    { "zone": "thighs", "gender": "him", "default": ["liposuccion", "coolsculpting", "mesotherapie"] }
  ],
  "age_rules": [
    { "age": "20s", "concern": "signs", "gender": "her", "treatments": ["peeling", "hydrafacial", "microneedling"] },
    { "age": "20s", "concern": "signs", "gender": "him", "treatments": ["peeling", "hydrafacial", "skin-boosters"] },
    { "age": "20s", "concern": "radiance", "gender": "her", "treatments": ["skin-boosters", "hydrafacial", "mesotherapie"] },
    { "age": "20s", "concern": "radiance", "gender": "him", "treatments": ["skin-boosters", "hydrafacial", "mesotherapie"] },
    { "age": "20s", "concern": "silhouette", "gender": "her", "treatments": ["coolsculpting", "liposuccion", "mesotherapie"] },
    { "age": "20s", "concern": "silhouette", "gender": "him", "treatments": ["coolsculpting", "liposuccion", "mesotherapie"] },
    { "age": "30s", "concern": "signs", "gender": "her", "treatments": ["botox", "acide-hyaluronique", "peeling"] },
    { "age": "30s", "concern": "signs", "gender": "him", "treatments": ["botox", "skin-boosters", "peeling"] },
    { "age": "30s", "concern": "radiance", "gender": "her", "treatments": ["skin-boosters", "mesotherapie", "hydrafacial"] },
    { "age": "30s", "concern": "radiance", "gender": "him", "treatments": ["skin-boosters", "mesotherapie", "hydrafacial"] },
    { "age": "30s", "concern": "silhouette", "gender": "her", "treatments": ["liposuccion", "coolsculpting", "abdominoplastie"] },
    { "age": "30s", "concern": "silhouette", "gender": "him", "treatments": ["liposuccion", "coolsculpting", "abdominoplastie"] },
    { "age": "40s", "concern": "signs", "gender": "her", "treatments": ["botox", "acide-hyaluronique", "fils-tenseurs"] },
    { "age": "40s", "concern": "signs", "gender": "him", "treatments": ["botox", "acide-hyaluronique", "profhilo"] },
    { "age": "40s", "concern": "radiance", "gender": "her", "treatments": ["profhilo", "skin-boosters", "mesotherapie"] },
    { "age": "40s", "concern": "radiance", "gender": "him", "treatments": ["profhilo", "skin-boosters", "mesotherapie"] },
    { "age": "40s", "concern": "silhouette", "gender": "her", "treatments": ["liposuccion", "abdominoplastie", "coolsculpting"] },
    { "age": "40s", "concern": "silhouette", "gender": "him", "treatments": ["liposuccion", "abdominoplastie", "coolsculpting"] },
    { "age": "50s", "concern": "signs", "gender": "her", "treatments": ["lifting-cervico-facial", "fils-tenseurs", "botox"] },
    { "age": "50s", "concern": "signs", "gender": "him", "treatments": ["lifting-cervico-facial", "fils-tenseurs", "botox"] },
    { "age": "50s", "concern": "radiance", "gender": "her", "treatments": ["profhilo", "skin-boosters", "fils-tenseurs"] },
    { "age": "50s", "concern": "radiance", "gender": "him", "treatments": ["profhilo", "skin-boosters", "fils-tenseurs"] },
    { "age": "50s", "concern": "silhouette", "gender": "her", "treatments": ["abdominoplastie", "liposuccion", "lifting-mammaire"] },
    { "age": "50s", "concern": "silhouette", "gender": "him", "treatments": ["abdominoplastie", "liposuccion", "coolsculpting"] },
    { "age": "60s", "concern": "signs", "gender": "her", "treatments": ["lifting-cervico-facial", "blepharoplastie", "fils-tenseurs"] },
    { "age": "60s", "concern": "signs", "gender": "him", "treatments": ["lifting-cervico-facial", "blepharoplastie", "fils-tenseurs"] },
    { "age": "60s", "concern": "radiance", "gender": "her", "treatments": ["profhilo", "skin-boosters", "mesotherapie"] },
    { "age": "60s", "concern": "radiance", "gender": "him", "treatments": ["profhilo", "skin-boosters", "mesotherapie"] },
    { "age": "60s", "concern": "silhouette", "gender": "her", "treatments": ["abdominoplastie", "lifting-mammaire", "liposuccion"] },
    { "age": "60s", "concern": "silhouette", "gender": "him", "treatments": ["abdominoplastie", "liposuccion", "coolsculpting"] }
  ]
}
```

Save to `src/data/recommendations.json`.

- [ ] **Step 4: Create team.json**

```json
[
  {
    "name": "Pr. Boukind",
    "title": "Chirurgien Plasticien — Directeur",
    "description": "Professeur agrégé en chirurgie plastique, reconstructrice et esthétique. Plus de 25 ans d'expertise au service de la beauté naturelle.",
    "image": "/images/team/pr-boukind.jpg"
  },
  {
    "name": "Dr. Amrani",
    "title": "Médecine Esthétique",
    "description": "Spécialiste des injections et des techniques de rajeunissement non-invasives. Approche douce et résultats naturels.",
    "image": "/images/team/dr-amrani.jpg"
  },
  {
    "name": "Dr. Benali",
    "title": "Dermatologie Esthétique",
    "description": "Expert en soins de la peau, peelings et traitements laser. Protocoles personnalisés pour chaque type de peau.",
    "image": "/images/team/dr-benali.jpg"
  },
  {
    "name": "Dr. El Fassi",
    "title": "Chirurgie Esthétique",
    "description": "Chirurgien spécialisé en chirurgie du visage et de la silhouette. Précision technique et sens artistique.",
    "image": "/images/team/dr-elfassi.jpg"
  }
]
```

Save to `src/data/team.json`.

- [ ] **Step 5: Create testimonials.json**

```json
[
  {
    "quote": "Je me reconnais. Juste reposée.",
    "name": "Sophie",
    "age": 52,
    "city": "Paris"
  },
  {
    "quote": "Le Professeur Boukind a compris exactement ce que je voulais sans que j'aie besoin de trop expliquer.",
    "name": "Nadia",
    "age": 38,
    "city": "Casablanca"
  },
  {
    "quote": "Un résultat naturel, personne ne sait que j'ai eu quelque chose. C'est exactement ça, l'art.",
    "name": "Isabelle",
    "age": 45,
    "city": "Lyon"
  },
  {
    "quote": "J'ai voyagé depuis Dubaï spécialement. L'expérience entière était exceptionnelle.",
    "name": "Amira",
    "age": 34,
    "city": "Dubaï"
  },
  {
    "quote": "Mes amis me disent que j'ai l'air en forme. Personne ne devine pourquoi.",
    "name": "Karim",
    "age": 47,
    "city": "Rabat"
  },
  {
    "quote": "Du premier rendez-vous jusqu'au suivi, chaque étape était rassurante et professionnelle.",
    "name": "Marie",
    "age": 56,
    "city": "Bruxelles"
  }
]
```

Save to `src/data/testimonials.json`.

- [ ] **Step 6: Commit**

```bash
git add src/data/
git commit -m "feat: add treatment database, recommendation rules, team and testimonials data"
```

---

### Task 5: Recommendation Engine (TDD)

**Files:**
- Create: `src/lib/recommend.test.ts`
- Create: `src/lib/recommend.ts`

- [ ] **Step 1: Write the failing tests**

```typescript
// src/lib/recommend.test.ts
import { describe, it, expect } from 'vitest';
import { getZoneRecommendations, getAgeRecommendations } from './recommend';

describe('getZoneRecommendations', () => {
  it('returns 3 treatments for eyes/her', () => {
    const result = getZoneRecommendations('eyes', 'her');
    expect(result).toHaveLength(3);
    expect(result[0].id).toBe('blepharoplastie');
    expect(result[1].id).toBe('botox');
    expect(result[2].id).toBe('acide-hyaluronique');
  });

  it('returns 3 treatments for hair/him', () => {
    const result = getZoneRecommendations('hair', 'him');
    expect(result).toHaveLength(3);
    expect(result[0].id).toBe('greffe-cheveux');
  });

  it('returns empty array for unknown zone', () => {
    const result = getZoneRecommendations('unknown', 'her');
    expect(result).toEqual([]);
  });

  it('returns different results based on gender', () => {
    const her = getZoneRecommendations('chest', 'her');
    const him = getZoneRecommendations('chest', 'him');
    expect(her[0].id).not.toBe(him[0].id);
  });
});

describe('getAgeRecommendations', () => {
  it('returns 3 treatments for 30s/radiance/her', () => {
    const result = getAgeRecommendations('30s', 'radiance', 'her');
    expect(result).toHaveLength(3);
    expect(result[0].id).toBe('skin-boosters');
    expect(result[1].id).toBe('mesotherapie');
    expect(result[2].id).toBe('hydrafacial');
  });

  it('returns 3 treatments for 50s/signs/him', () => {
    const result = getAgeRecommendations('50s', 'signs', 'him');
    expect(result).toHaveLength(3);
    expect(result[0].id).toBe('lifting-cervico-facial');
  });

  it('returns empty array for unknown combination', () => {
    const result = getAgeRecommendations('unknown', 'unknown', 'her');
    expect(result).toEqual([]);
  });
});
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `npx vitest run src/lib/recommend.test.ts`
Expected: FAIL — `Cannot find module './recommend'`

- [ ] **Step 3: Implement recommend.ts**

```typescript
// src/lib/recommend.ts
import type { Treatment, RecommendationData } from '../types';
import treatmentsData from '../data/treatments.json';
import recommendationsData from '../data/recommendations.json';

const treatments = treatmentsData as Treatment[];
const recommendations = recommendationsData as RecommendationData;

export function getZoneRecommendations(
  zone: string,
  gender: 'her' | 'him'
): Treatment[] {
  const rule = recommendations.zone_rules.find(
    (r) => r.zone === zone && r.gender === gender
  );
  if (!rule) return [];
  return rule.default
    .map((id) => treatments.find((t) => t.id === id))
    .filter((t): t is Treatment => t !== undefined);
}

export function getAgeRecommendations(
  age: string,
  concern: string,
  gender: 'her' | 'him'
): Treatment[] {
  const rule = recommendations.age_rules.find(
    (r) => r.age === age && r.concern === concern && r.gender === gender
  );
  if (!rule) return [];
  return rule.treatments
    .map((id) => treatments.find((t) => t.id === id))
    .filter((t): t is Treatment => t !== undefined);
}
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `npx vitest run src/lib/recommend.test.ts`
Expected: All 6 tests PASS

- [ ] **Step 5: Commit**

```bash
git add src/lib/recommend.ts src/lib/recommend.test.ts
git commit -m "feat: add recommendation engine with zone and age path lookups (TDD)"
```

---

### Task 6: Base Layout, Navigation & Theme Toggle

**Files:**
- Create: `src/layouts/BaseLayout.astro`
- Create: `src/components/ui/Navigation.astro`
- Create: `src/components/ui/ThemeToggle.tsx`
- Create: `src/pages/index.astro` (placeholder)

- [ ] **Step 1: Create ThemeToggle.tsx**

```tsx
// src/components/ui/ThemeToggle.tsx
import { useState, useEffect } from 'react';

export default function ThemeToggle() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  useEffect(() => {
    const stored = localStorage.getItem('maoa-theme') as 'dark' | 'light' | null;
    if (stored) {
      setTheme(stored);
      document.documentElement.setAttribute('data-theme', stored);
    }
  }, []);

  const toggle = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('maoa-theme', next);
  };

  return (
    <button
      onClick={toggle}
      className="p-2 text-text-muted hover:text-gold transition-colors"
      aria-label={theme === 'dark' ? 'Passer en mode clair' : 'Passer en mode sombre'}
    >
      {theme === 'dark' ? (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="12" cy="12" r="5" />
          <line x1="12" y1="1" x2="12" y2="3" />
          <line x1="12" y1="21" x2="12" y2="23" />
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
          <line x1="1" y1="12" x2="3" y2="12" />
          <line x1="21" y1="12" x2="23" y2="12" />
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
        </svg>
      ) : (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      )}
    </button>
  );
}
```

- [ ] **Step 2: Create Navigation.astro**

```astro
---
// src/components/ui/Navigation.astro
import ThemeToggle from './ThemeToggle';
---

<nav class="fixed top-0 left-0 right-0 z-50 bg-bg-deep/80 backdrop-blur-md border-b border-line/50">
  <div class="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
    <a href="/" class="font-heading text-xl text-gold tracking-wide">
      MAOA
    </a>
    <div class="flex items-center gap-4">
      <span class="hidden sm:block text-[10px] tracking-[3px] uppercase text-text-muted font-body">
        Art in Aesthetic Medicine
      </span>
      <ThemeToggle client:load />
    </div>
  </div>
</nav>
```

- [ ] **Step 3: Create BaseLayout.astro**

```astro
---
// src/layouts/BaseLayout.astro
import '../styles/global.css';
import '../styles/animations.css';

interface Props {
  title?: string;
  description?: string;
}

const {
  title = 'MAOA — Art in Aesthetic Medicine',
  description = 'Medical Art of Aesthetics — Professeur Boukind, chirurgie et médecine esthétique à Casablanca'
} = Astro.props;
---

<!DOCTYPE html>
<html lang="fr" data-theme="dark">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="description" content={description} />
  <title>{title}</title>
  <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
</head>
<body class="bg-bg-deep text-text min-h-screen antialiased">
  <slot />
  <script is:inline>
    // Restore theme before paint to prevent flash
    (function() {
      const theme = localStorage.getItem('maoa-theme') || 'dark';
      document.documentElement.setAttribute('data-theme', theme);
    })();
  </script>
</body>
</html>
```

- [ ] **Step 4: Create placeholder index.astro**

```astro
---
// src/pages/index.astro
import BaseLayout from '../layouts/BaseLayout.astro';
import Navigation from '../components/ui/Navigation.astro';
---

<BaseLayout>
  <Navigation />
  <main class="pt-16 min-h-screen flex items-center justify-center">
    <div class="text-center">
      <h1 class="font-heading text-5xl text-gold mb-4">MAOA</h1>
      <p class="text-text-muted text-sm tracking-widest uppercase">Coming Soon</p>
    </div>
  </main>
</BaseLayout>
```

- [ ] **Step 5: Verify in browser**

Run: `npm run dev`
Expected: Page loads at `localhost:4321` with dark background, gold "MAOA" heading, navigation bar with theme toggle. Clicking the toggle switches to light mode. Refresh preserves theme choice.

- [ ] **Step 6: Commit**

```bash
git add src/layouts/BaseLayout.astro src/components/ui/Navigation.astro src/components/ui/ThemeToggle.tsx src/pages/index.astro
git commit -m "feat: add base layout, navigation with theme toggle, placeholder homepage"
```

---

### Task 7: UI Components — Button & Card

**Files:**
- Create: `src/components/ui/Button.tsx`
- Create: `src/components/ui/Card.tsx`

- [ ] **Step 1: Create Button.tsx**

```tsx
// src/components/ui/Button.tsx
import type { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'ghost' | 'accent';
  children: React.ReactNode;
}

export default function Button({ variant = 'ghost', children, className = '', ...props }: ButtonProps) {
  const base = 'inline-flex items-center justify-center px-8 py-4 text-[11px] tracking-[3px] uppercase font-body transition-all duration-300 cursor-pointer';

  const variants = {
    ghost: 'border border-text/30 text-text hover:bg-text hover:text-bg-deep',
    accent: 'bg-bg-deep text-text border border-line hover:bg-gradient-to-br hover:from-gold-deep hover:to-gold hover:text-bg-deep hover:border-gold',
  };

  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
}
```

- [ ] **Step 2: Create Card.tsx**

```tsx
// src/components/ui/Card.tsx
interface CardProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  hoverable?: boolean;
}

export default function Card({ children, onClick, className = '', hoverable = true }: CardProps) {
  return (
    <div
      onClick={onClick}
      className={`
        bg-bg-base border border-line p-6 transition-all duration-300
        ${hoverable ? 'cursor-pointer hover:border-gold/50 hover:bg-bg-elevated' : ''}
        ${onClick ? 'cursor-pointer' : ''}
        ${className}
      `}
    >
      {children}
    </div>
  );
}
```

- [ ] **Step 3: Commit**

```bash
git add src/components/ui/Button.tsx src/components/ui/Card.tsx
git commit -m "feat: add Button and Card UI components"
```

---

### Task 8: Journey Shell — State Machine & Transitions

**Files:**
- Create: `src/components/journey/JourneyApp.tsx`
- Modify: `src/pages/index.astro`

- [ ] **Step 1: Create JourneyApp.tsx with state machine**

```tsx
// src/components/journey/JourneyApp.tsx
import { useReducer, useCallback } from 'react';
import type { JourneyState, JourneyAction, Screen } from '../../types';

const initialState: JourneyState = {
  screen: 'arrival',
  history: [],
  gender: null,
  path: null,
  zone: null,
  age: null,
  concern: null,
  zoneAnswers: [],
  bookingOpen: false,
};

function getBackScreen(state: JourneyState): Screen | null {
  if (state.history.length === 0) return null;
  return state.history[state.history.length - 1];
}

function journeyReducer(state: JourneyState, action: JourneyAction): JourneyState {
  const pushHistory = (nextScreen: Screen): JourneyState => ({
    ...state,
    history: [...state.history, state.screen],
    screen: nextScreen,
  });

  switch (action.type) {
    case 'BEGIN':
      return pushHistory('gender');
    case 'SELECT_GENDER':
      return { ...pushHistory('path'), gender: action.gender };
    case 'SELECT_PATH':
      return {
        ...pushHistory(action.path === 'zone' ? 'silhouette' : 'life-stage'),
        path: action.path,
      };
    case 'SELECT_ZONE':
      return { ...pushHistory('zone-detail'), zone: action.zone };
    case 'ANSWER_ZONE_QUESTION':
      return { ...state, zoneAnswers: [...state.zoneAnswers, action.answer] };
    case 'COMPLETE_ZONE_DETAIL':
      return pushHistory('recommendations');
    case 'SELECT_AGE':
      return { ...pushHistory('concern'), age: action.age };
    case 'SELECT_CONCERN':
      return { ...pushHistory('recommendations'), concern: action.concern };
    case 'OPEN_BOOKING':
      return { ...state, bookingOpen: true };
    case 'CLOSE_BOOKING':
      return { ...state, bookingOpen: false };
    case 'BOOKING_COMPLETE':
      return { ...pushHistory('thank-you'), bookingOpen: false };
    case 'GO_BACK': {
      const prev = getBackScreen(state);
      if (!prev) return state;
      return {
        ...state,
        screen: prev,
        history: state.history.slice(0, -1),
      };
    }
    default:
      return state;
  }
}

export default function JourneyApp() {
  const [state, dispatch] = useReducer(journeyReducer, initialState);

  const goBack = useCallback(() => dispatch({ type: 'GO_BACK' }), []);
  const canGoBack = state.history.length > 0 && state.screen !== 'arrival';

  const renderScreen = () => {
    switch (state.screen) {
      case 'arrival':
        return (
          <div className="min-h-screen flex items-center justify-center text-center px-6">
            <div>
              <p className="text-gold-deep text-[10px] tracking-[4px] uppercase mb-6 font-body">
                Professeur Boukind
              </p>
              <h1 className="font-heading text-4xl sm:text-6xl lg:text-7xl font-light text-text mb-8 leading-tight">
                La beauté,<br />intelligemment révélée.
              </h1>
              <button
                onClick={() => dispatch({ type: 'BEGIN' })}
                className="inline-flex items-center px-10 py-4 border border-text/30 text-[11px] tracking-[3px] uppercase text-text hover:bg-text hover:text-bg-deep transition-all duration-300"
              >
                Commencer le parcours →
              </button>
            </div>
          </div>
        );
      default:
        return (
          <div className="min-h-screen flex items-center justify-center">
            <p className="text-text-muted">Écran: {state.screen}</p>
          </div>
        );
    }
  };

  return (
    <div className="relative">
      {/* Back button */}
      {canGoBack && (
        <button
          onClick={goBack}
          className="fixed top-20 left-6 z-40 text-text-muted hover:text-gold transition-colors text-sm flex items-center gap-2"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          Retour
        </button>
      )}

      {/* Screen with transition */}
      <div key={state.screen} className="screen-transition">
        {renderScreen()}
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Update index.astro to use JourneyApp**

Replace the contents of `src/pages/index.astro`:

```astro
---
// src/pages/index.astro
import BaseLayout from '../layouts/BaseLayout.astro';
import Navigation from '../components/ui/Navigation.astro';
import JourneyApp from '../components/journey/JourneyApp';
---

<BaseLayout>
  <Navigation />
  <JourneyApp client:only="react" />
</BaseLayout>
```

- [ ] **Step 3: Verify in browser**

Run: `npm run dev`
Expected: Arrival screen with "La beauté, intelligemment révélée." heading and "Commencer le parcours" button. Clicking the button transitions to a placeholder screen showing "Écran: gender". Back button appears and works.

- [ ] **Step 4: Commit**

```bash
git add src/components/journey/JourneyApp.tsx src/pages/index.astro
git commit -m "feat: add journey shell with state machine, screen transitions, back navigation"
```

---

### Task 9: Arrival Screen

**Files:**
- Create: `src/components/journey/ArrivalScreen.tsx`
- Modify: `src/components/journey/JourneyApp.tsx`

- [ ] **Step 1: Create ArrivalScreen.tsx**

```tsx
// src/components/journey/ArrivalScreen.tsx
interface ArrivalScreenProps {
  onBegin: () => void;
}

export default function ArrivalScreen({ onBegin }: ArrivalScreenProps) {
  return (
    <div className="min-h-screen flex items-center justify-center text-center px-6">
      <div className="max-w-2xl">
        {/* Gold decorative line */}
        <div className="w-12 h-px bg-gold mx-auto mb-8 animate-fade-in" />

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
            className="inline-flex items-center gap-3 px-10 py-4 border border-text/30 text-[11px] tracking-[3px] uppercase text-text hover:bg-text hover:text-bg-deep transition-all duration-300"
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

- [ ] **Step 2: Wire into JourneyApp.tsx**

In `JourneyApp.tsx`, add the import at the top:

```tsx
import ArrivalScreen from './ArrivalScreen';
```

Replace the `case 'arrival':` block inside `renderScreen()`:

```tsx
      case 'arrival':
        return <ArrivalScreen onBegin={() => dispatch({ type: 'BEGIN' })} />;
```

- [ ] **Step 3: Verify in browser**

Run: `npm run dev`
Expected: Beautiful arrival screen with staggered animations — gold line, subtitle, heading with italic "intelligemment", description, and CTA button. Animations play sequentially. Button transitions to gender screen.

- [ ] **Step 4: Commit**

```bash
git add src/components/journey/ArrivalScreen.tsx src/components/journey/JourneyApp.tsx
git commit -m "feat: add arrival screen with staggered animations and brand statement"
```

---

### Task 10: Gender Screen

**Files:**
- Create: `src/components/journey/GenderScreen.tsx`
- Modify: `src/components/journey/JourneyApp.tsx`

- [ ] **Step 1: Create GenderScreen.tsx**

```tsx
// src/components/journey/GenderScreen.tsx
interface GenderScreenProps {
  onSelect: (gender: 'her' | 'him') => void;
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
          {/* Gradient placeholder for image */}
          <div className="absolute inset-0 bg-gradient-to-b from-bg-elevated/50 to-bg-deep/80" />
          <div className="absolute inset-0 flex flex-col items-center justify-end pb-8 sm:pb-12">
            <div className="w-8 h-px bg-gold mb-4 transition-all duration-300 group-hover:w-16" />
            <span className="font-heading text-2xl sm:text-4xl font-light text-text">
              Elle
            </span>
            <span className="text-[10px] tracking-[3px] uppercase text-text-muted mt-2">
              Femme
            </span>
          </div>
          {/* Gold overlay on hover */}
          <div className="absolute inset-0 bg-gold/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </button>

        {/* Lui */}
        <button
          onClick={() => onSelect('him')}
          className="group relative aspect-[3/4] sm:aspect-[2/3] bg-bg-base border border-line overflow-hidden transition-all duration-500 hover:border-gold/50"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-bg-elevated/50 to-bg-deep/80" />
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

- [ ] **Step 2: Wire into JourneyApp.tsx**

Add import at top of `JourneyApp.tsx`:

```tsx
import GenderScreen from './GenderScreen';
```

Add case in `renderScreen()`:

```tsx
      case 'gender':
        return <GenderScreen onSelect={(gender) => dispatch({ type: 'SELECT_GENDER', gender })} />;
```

- [ ] **Step 3: Verify in browser**

Run: `npm run dev`
Expected: Two tall split panels side by side — "Elle" and "Lui". Hover shows gold overlay and expanding gold line. Clicking either advances to path screen.

- [ ] **Step 4: Commit**

```bash
git add src/components/journey/GenderScreen.tsx src/components/journey/JourneyApp.tsx
git commit -m "feat: add gender selection screen with split-panel Elle/Lui design"
```

---

### Task 11: Path Choice Screen

**Files:**
- Create: `src/components/journey/PathScreen.tsx`
- Modify: `src/components/journey/JourneyApp.tsx`

- [ ] **Step 1: Create PathScreen.tsx**

```tsx
// src/components/journey/PathScreen.tsx
interface PathScreenProps {
  onSelect: (path: 'zone' | 'age') => void;
}

export default function PathScreen({ onSelect }: PathScreenProps) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6">
      <p className="text-gold-deep text-[10px] tracking-[4px] uppercase mb-4 font-body">
        Votre parcours
      </p>
      <h2 className="font-heading text-3xl sm:text-5xl font-light text-text mb-12 text-center">
        Comment souhaitez-vous procéder ?
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-3xl">
        {/* Zone path — "I know what I want" */}
        <button
          onClick={() => onSelect('zone')}
          className="group text-left p-8 sm:p-10 bg-bg-base border border-line transition-all duration-300 hover:border-gold/50 hover:bg-bg-elevated"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="font-heading text-3xl text-gold italic">01</span>
            <div className="flex-1 h-px bg-line group-hover:bg-gold/30 transition-colors" />
          </div>
          <h3 className="font-heading text-xl sm:text-2xl text-text mb-3">
            Je sais ce que je veux
          </h3>
          <p className="text-text-muted text-sm font-light leading-relaxed">
            Choisissez directement la zone de votre corps que vous souhaitez améliorer.
          </p>
          <div className="mt-6 text-gold text-[10px] tracking-[3px] uppercase opacity-0 group-hover:opacity-100 transition-opacity">
            Explorer les zones →
          </div>
        </button>

        {/* Age path — "Guide me" */}
        <button
          onClick={() => onSelect('age')}
          className="group text-left p-8 sm:p-10 bg-bg-base border border-line transition-all duration-300 hover:border-gold/50 hover:bg-bg-elevated"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="font-heading text-3xl text-gold italic">02</span>
            <div className="flex-1 h-px bg-line group-hover:bg-gold/30 transition-colors" />
          </div>
          <h3 className="font-heading text-xl sm:text-2xl text-text mb-3">
            Guidez-moi
          </h3>
          <p className="text-text-muted text-sm font-light leading-relaxed">
            Laissez-nous vous orienter vers les soins les plus adaptés à vos besoins.
          </p>
          <div className="mt-6 text-gold text-[10px] tracking-[3px] uppercase opacity-0 group-hover:opacity-100 transition-opacity">
            Être guidé →
          </div>
        </button>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Wire into JourneyApp.tsx**

Add import:

```tsx
import PathScreen from './PathScreen';
```

Add case:

```tsx
      case 'path':
        return <PathScreen onSelect={(path) => dispatch({ type: 'SELECT_PATH', path })} />;
```

- [ ] **Step 3: Verify in browser**

Run: `npm run dev`
Expected: Two path cards side by side on desktop, stacked on mobile. Gold numbering, descriptions, and hover effects with "Explorer les zones →" / "Être guidé →" appearing on hover.

- [ ] **Step 4: Commit**

```bash
git add src/components/journey/PathScreen.tsx src/components/journey/JourneyApp.tsx
git commit -m "feat: add path choice screen — zone vs guided journey"
```

---

### Task 12: Silhouette SVG & Silhouette Screen

**Files:**
- Create: `src/components/journey/SilhouetteSVG.tsx`
- Create: `src/components/journey/SilhouetteScreen.tsx`
- Modify: `src/components/journey/JourneyApp.tsx`

- [ ] **Step 1: Create SilhouetteSVG.tsx**

```tsx
// src/components/journey/SilhouetteSVG.tsx
import { useState } from 'react';

interface SilhouetteSVGProps {
  gender: 'her' | 'him';
  onSelectZone: (zone: string) => void;
}

interface ZoneArea {
  id: string;
  label: string;
  x: number;
  y: number;
  width: number;
  height: number;
  labelX: number;
  labelY: number;
}

const zones: ZoneArea[] = [
  { id: 'hair', label: 'Cheveux', x: 72, y: 4, width: 56, height: 30, labelX: 150, labelY: 20 },
  { id: 'eyes', label: 'Regard', x: 78, y: 34, width: 44, height: 18, labelX: 150, labelY: 44 },
  { id: 'lips', label: 'Lèvres', x: 84, y: 55, width: 32, height: 14, labelX: 150, labelY: 62 },
  { id: 'neck', label: 'Cou', x: 82, y: 72, width: 36, height: 22, labelX: 150, labelY: 83 },
  { id: 'chest', label: 'Poitrine', x: 55, y: 100, width: 90, height: 55, labelX: 165, labelY: 127 },
  { id: 'abdomen', label: 'Ventre', x: 60, y: 158, width: 80, height: 55, labelX: 165, labelY: 185 },
  { id: 'hips', label: 'Hanches', x: 50, y: 213, width: 100, height: 35, labelX: 165, labelY: 230 },
  { id: 'thighs', label: 'Cuisses', x: 55, y: 250, width: 90, height: 75, labelX: 165, labelY: 288 },
];

export default function SilhouetteSVG({ gender, onSelectZone }: SilhouetteSVGProps) {
  const [hoveredZone, setHoveredZone] = useState<string | null>(null);

  // Simplified silhouette outline — female has curves, male is more angular
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
      {/* Silhouette outline */}
      <path
        d={outlinePath}
        stroke="var(--gold)"
        strokeWidth="1"
        opacity="0.6"
        className="draw-line"
      />

      {/* Clickable zone overlays */}
      {zones.map((zone) => {
        const isHovered = hoveredZone === zone.id;
        return (
          <g key={zone.id}>
            {/* Hitbox */}
            <rect
              x={zone.x}
              y={zone.y}
              width={zone.width}
              height={zone.height}
              rx="4"
              fill={isHovered ? 'var(--gold)' : 'transparent'}
              fillOpacity={isHovered ? 0.15 : 0}
              stroke={isHovered ? 'var(--gold)' : 'transparent'}
              strokeWidth="0.5"
              className="cursor-pointer transition-all duration-300"
              onMouseEnter={() => setHoveredZone(zone.id)}
              onMouseLeave={() => setHoveredZone(null)}
              onClick={() => onSelectZone(zone.id)}
            />
            {/* Label line and text */}
            {isHovered && (
              <>
                <line
                  x1={zone.x + zone.width}
                  y1={zone.y + zone.height / 2}
                  x2={zone.labelX - 5}
                  y2={zone.labelY}
                  stroke="var(--gold)"
                  strokeWidth="0.5"
                  strokeDasharray="2 2"
                />
                <text
                  x={zone.labelX}
                  y={zone.labelY + 4}
                  fill="var(--gold)"
                  fontSize="10"
                  fontFamily="Inter, sans-serif"
                  letterSpacing="2"
                  className="uppercase"
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

- [ ] **Step 2: Create SilhouetteScreen.tsx**

```tsx
// src/components/journey/SilhouetteScreen.tsx
import SilhouetteSVG from './SilhouetteSVG';

interface SilhouetteScreenProps {
  gender: 'her' | 'him';
  onSelectZone: (zone: string) => void;
}

export default function SilhouetteScreen({ gender, onSelectZone }: SilhouetteScreenProps) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-20">
      <p className="text-gold-deep text-[10px] tracking-[4px] uppercase mb-4 font-body">
        Votre zone
      </p>
      <h2 className="font-heading text-3xl sm:text-4xl font-light text-text mb-2 text-center">
        Quelle zone souhaitez-vous améliorer ?
      </h2>
      <p className="text-text-muted text-sm mb-10 text-center">
        Survolez et cliquez sur la zone qui vous intéresse
      </p>

      <div className="w-full max-w-md">
        <SilhouetteSVG gender={gender} onSelectZone={onSelectZone} />
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Wire into JourneyApp.tsx**

Add imports:

```tsx
import SilhouetteScreen from './SilhouetteScreen';
```

Add case:

```tsx
      case 'silhouette':
        return (
          <SilhouetteScreen
            gender={state.gender!}
            onSelectZone={(zone) => dispatch({ type: 'SELECT_ZONE', zone })}
          />
        );
```

- [ ] **Step 4: Verify in browser**

Run: `npm run dev`
Expected: Gold line-art silhouette centered on page. Hovering over body zones shows gold highlight with a dashed line to a label. Clicking a zone transitions to zone-detail screen.

- [ ] **Step 5: Commit**

```bash
git add src/components/journey/SilhouetteSVG.tsx src/components/journey/SilhouetteScreen.tsx src/components/journey/JourneyApp.tsx
git commit -m "feat: add silhouette screen with interactive SVG zone selection"
```

---

### Task 13: Zone Detail Screen

**Files:**
- Create: `src/components/journey/ZoneDetailScreen.tsx`
- Modify: `src/components/journey/JourneyApp.tsx`

- [ ] **Step 1: Create ZoneDetailScreen.tsx**

```tsx
// src/components/journey/ZoneDetailScreen.tsx
import { useState } from 'react';
import type { Zone, ZoneQuestion } from '../../types';
import zonesData from '../../data/zones.json';

const zones = zonesData as Zone[];

interface ZoneDetailScreenProps {
  zoneId: string;
  onAnswer: (answer: string) => void;
  onComplete: () => void;
  currentAnswers: string[];
}

export default function ZoneDetailScreen({ zoneId, onAnswer, onComplete, currentAnswers }: ZoneDetailScreenProps) {
  const zone = zones.find((z) => z.id === zoneId);
  if (!zone) return null;

  const currentQuestionIndex = currentAnswers.length;
  const isComplete = currentQuestionIndex >= zone.questions.length;

  if (isComplete) {
    // Show summary before moving to recommendations
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6">
        <div className="w-12 h-px bg-gold mb-8" />
        <p className="text-gold-deep text-[10px] tracking-[4px] uppercase mb-4">
          {zone.label}
        </p>
        <h2 className="font-heading text-3xl sm:text-4xl font-light text-text mb-6 text-center">
          Merci pour vos réponses
        </h2>
        <p className="text-text-muted text-sm mb-10 text-center max-w-md">
          Nous avons analysé vos besoins. Découvrez nos recommandations personnalisées.
        </p>
        <button
          onClick={onComplete}
          className="px-10 py-4 border border-text/30 text-[11px] tracking-[3px] uppercase text-text hover:bg-text hover:text-bg-deep transition-all duration-300"
        >
          Voir mes recommandations →
        </button>
      </div>
    );
  }

  const question = zone.questions[currentQuestionIndex];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6">
      {/* Progress indicator */}
      <div className="flex gap-2 mb-8">
        {zone.questions.map((_, i) => (
          <div
            key={i}
            className={`h-0.5 w-8 transition-colors duration-300 ${
              i <= currentQuestionIndex ? 'bg-gold' : 'bg-line'
            }`}
          />
        ))}
      </div>

      <p className="text-gold-deep text-[10px] tracking-[4px] uppercase mb-4">
        {zone.label} — Question {currentQuestionIndex + 1}/{zone.questions.length}
      </p>

      <h2 className="font-heading text-2xl sm:text-4xl font-light text-text mb-10 text-center max-w-lg">
        {question.question}
      </h2>

      <div className="w-full max-w-md space-y-3">
        {question.answers.map((answer, i) => (
          <button
            key={i}
            onClick={() => onAnswer(answer)}
            className="w-full text-left flex items-center gap-4 p-5 bg-bg-base border border-line transition-all duration-300 hover:border-gold/50 hover:bg-bg-elevated group"
          >
            <span className="font-heading text-sm text-gold italic opacity-50 group-hover:opacity-100">
              {String(i + 1).padStart(2, '0')}
            </span>
            <span className="text-text text-sm font-light">{answer}</span>
            <span className="ml-auto text-gold opacity-0 group-hover:opacity-100 transition-opacity">
              →
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Wire into JourneyApp.tsx**

Add import:

```tsx
import ZoneDetailScreen from './ZoneDetailScreen';
```

Add case:

```tsx
      case 'zone-detail':
        return (
          <ZoneDetailScreen
            zoneId={state.zone!}
            currentAnswers={state.zoneAnswers}
            onAnswer={(answer) => dispatch({ type: 'ANSWER_ZONE_QUESTION', answer })}
            onComplete={() => dispatch({ type: 'COMPLETE_ZONE_DETAIL' })}
          />
        );
```

- [ ] **Step 3: Verify in browser**

Run: `npm run dev`
Expected: After selecting a zone, 3 progressive questions appear one at a time with numbered answer cards. Gold progress bar advances. After all questions, a summary screen with "Voir mes recommandations" button appears.

- [ ] **Step 4: Commit**

```bash
git add src/components/journey/ZoneDetailScreen.tsx src/components/journey/JourneyApp.tsx
git commit -m "feat: add zone detail screen with progressive questions"
```

---

### Task 14: Life Stage & Concern Screens

**Files:**
- Create: `src/components/journey/LifeStageScreen.tsx`
- Create: `src/components/journey/ConcernScreen.tsx`
- Modify: `src/components/journey/JourneyApp.tsx`

- [ ] **Step 1: Create LifeStageScreen.tsx**

```tsx
// src/components/journey/LifeStageScreen.tsx
interface LifeStageScreenProps {
  onSelect: (age: string) => void;
}

const stages = [
  { id: '20s', label: 'Vingtaine', range: '20 — 29', description: 'Prévenir et sublimer' },
  { id: '30s', label: 'Trentaine', range: '30 — 39', description: 'Préserver et illuminer' },
  { id: '40s', label: 'Quarantaine', range: '40 — 49', description: 'Restaurer et raffermir' },
  { id: '50s', label: 'Cinquantaine', range: '50 — 59', description: 'Rajeunir et revitaliser' },
  { id: '60s', label: 'Soixantaine', range: '60+', description: 'Sublimer et harmoniser' },
];

export default function LifeStageScreen({ onSelect }: LifeStageScreenProps) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-20">
      <p className="text-gold-deep text-[10px] tracking-[4px] uppercase mb-4 font-body">
        Votre moment de vie
      </p>
      <h2 className="font-heading text-3xl sm:text-4xl font-light text-text mb-10 text-center">
        À quelle étape êtes-vous ?
      </h2>

      <div className="w-full max-w-2xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {stages.map((stage, i) => (
          <button
            key={stage.id}
            onClick={() => onSelect(stage.id)}
            className="group text-left p-6 bg-bg-base border border-line transition-all duration-300 hover:border-gold/50 hover:bg-bg-elevated"
          >
            <span className="font-heading text-2xl text-gold italic opacity-50 group-hover:opacity-100 transition-opacity">
              {stage.range}
            </span>
            <h3 className="font-heading text-lg text-text mt-3 mb-1">
              {stage.label}
            </h3>
            <p className="text-text-muted text-xs font-light">
              {stage.description}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Create ConcernScreen.tsx**

```tsx
// src/components/journey/ConcernScreen.tsx
interface ConcernScreenProps {
  onSelect: (concern: string) => void;
}

const concerns = [
  {
    id: 'signs',
    title: 'Les signes du temps',
    description: 'Rides, relâchement, perte de volume — je veux atténuer les marques visibles du vieillissement.',
    icon: '◇',
  },
  {
    id: 'radiance',
    title: 'Mon éclat',
    description: 'Teint terne, peau fatiguée, manque de luminosité — je veux retrouver ma lumière naturelle.',
    icon: '✦',
  },
  {
    id: 'silhouette',
    title: 'Ma silhouette',
    description: 'Zones rebelles, manque de galbe, excès localisés — je veux sculpter et harmoniser mon corps.',
    icon: '○',
  },
];

export default function ConcernScreen({ onSelect }: ConcernScreenProps) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6">
      <p className="text-gold-deep text-[10px] tracking-[4px] uppercase mb-4 font-body">
        Votre préoccupation
      </p>
      <h2 className="font-heading text-3xl sm:text-4xl font-light text-text mb-10 text-center">
        Qu'aimeriez-vous améliorer ?
      </h2>

      <div className="w-full max-w-2xl space-y-4">
        {concerns.map((concern) => (
          <button
            key={concern.id}
            onClick={() => onSelect(concern.id)}
            className="w-full text-left flex items-start gap-6 p-6 sm:p-8 bg-bg-base border border-line transition-all duration-300 hover:border-gold/50 hover:bg-bg-elevated group"
          >
            <span className="text-gold text-2xl mt-1 opacity-50 group-hover:opacity-100 transition-opacity">
              {concern.icon}
            </span>
            <div>
              <h3 className="font-heading text-xl text-text mb-2">
                {concern.title}
              </h3>
              <p className="text-text-muted text-sm font-light leading-relaxed">
                {concern.description}
              </p>
            </div>
            <span className="ml-auto text-gold opacity-0 group-hover:opacity-100 transition-opacity self-center">
              →
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Wire both into JourneyApp.tsx**

Add imports:

```tsx
import LifeStageScreen from './LifeStageScreen';
import ConcernScreen from './ConcernScreen';
```

Add cases:

```tsx
      case 'life-stage':
        return <LifeStageScreen onSelect={(age) => dispatch({ type: 'SELECT_AGE', age })} />;
      case 'concern':
        return <ConcernScreen onSelect={(concern) => dispatch({ type: 'SELECT_CONCERN', concern })} />;
```

- [ ] **Step 4: Verify in browser**

Run: `npm run dev`
Expected: Age path shows 5 life stage cards (20s–60s) in a grid. Selecting one transitions to Concern screen with 3 large cards (signs, radiance, silhouette). Both have gold hover effects.

- [ ] **Step 5: Commit**

```bash
git add src/components/journey/LifeStageScreen.tsx src/components/journey/ConcernScreen.tsx src/components/journey/JourneyApp.tsx
git commit -m "feat: add life stage and concern screens for guided age path"
```

---

### Task 15: Recommendation Screen

**Files:**
- Create: `src/components/journey/RecommendationScreen.tsx`
- Modify: `src/components/journey/JourneyApp.tsx`

- [ ] **Step 1: Create RecommendationScreen.tsx**

```tsx
// src/components/journey/RecommendationScreen.tsx
import { useState, useEffect } from 'react';
import type { Treatment } from '../../types';
import { getZoneRecommendations, getAgeRecommendations } from '../../lib/recommend';

interface RecommendationScreenProps {
  gender: 'her' | 'him';
  path: 'zone' | 'age';
  zone: string | null;
  age: string | null;
  concern: string | null;
  onBook: () => void;
}

export default function RecommendationScreen({
  gender, path, zone, age, concern, onBook,
}: RecommendationScreenProps) {
  const [treatments, setTreatments] = useState<Treatment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate a brief loading moment for dramatic effect
    const timer = setTimeout(() => {
      const results = path === 'zone'
        ? getZoneRecommendations(zone!, gender)
        : getAgeRecommendations(age!, concern!, gender);
      setTreatments(results);
      setLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, [gender, path, zone, age, concern]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6">
        <div className="w-16 h-px bg-gold animate-gold-pulse mb-8" />
        <p className="font-heading text-2xl text-text animate-fade-in">
          Analyse en cours...
        </p>
        <p className="text-text-muted text-sm mt-3">
          Nous préparons vos recommandations personnalisées
        </p>
      </div>
    );
  }

  const headline = path === 'zone'
    ? `Nos recommandations pour votre zone`
    : `Soins recommandés pour vous`;

  return (
    <div className="min-h-screen px-6 py-20">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-12 h-px bg-gold mx-auto mb-6" />
          <p className="text-gold-deep text-[10px] tracking-[4px] uppercase mb-4">
            Vos recommandations
          </p>
          <h2 className="font-heading text-3xl sm:text-4xl font-light text-text">
            {headline}
          </h2>
        </div>

        {/* Treatment cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12 stagger-children">
          {treatments.map((treatment) => (
            <div
              key={treatment.id}
              className="group bg-bg-base border border-line overflow-hidden transition-all duration-300 hover:border-gold/50"
            >
              {/* Image placeholder */}
              <div className="aspect-[4/3] bg-bg-elevated relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-bg-base/50" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-gold/30 text-[10px] tracking-[3px] uppercase">
                    {treatment.category}
                  </span>
                </div>
                {/* Gold top line on hover */}
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-gold transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              </div>

              <div className="p-6">
                <h3 className="font-heading text-xl text-text mb-2">
                  {treatment.name}
                </h3>
                <p className="text-text-muted text-sm font-light leading-relaxed mb-4">
                  {treatment.description}
                </p>

                {/* Quick facts */}
                <div className="space-y-2 pt-4 border-t border-line">
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
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <p className="text-text-muted text-sm mb-6">
            Ces recommandations sont indicatives. Une consultation permettra d'affiner votre plan personnalisé.
          </p>
          <button
            onClick={onBook}
            className="px-12 py-4 bg-bg-deep text-text border border-line text-[11px] tracking-[3px] uppercase transition-all duration-300 hover:bg-gradient-to-br hover:from-gold-deep hover:to-gold hover:text-bg-deep hover:border-gold"
          >
            Réserver ma consultation →
          </button>
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Wire into JourneyApp.tsx**

Add import:

```tsx
import RecommendationScreen from './RecommendationScreen';
```

Add case:

```tsx
      case 'recommendations':
        return (
          <RecommendationScreen
            gender={state.gender!}
            path={state.path!}
            zone={state.zone}
            age={state.age}
            concern={state.concern}
            onBook={() => dispatch({ type: 'OPEN_BOOKING' })}
          />
        );
```

- [ ] **Step 3: Verify in browser**

Run: `npm run dev`
Expected: Brief loading animation (gold pulsing line), then 3 treatment cards appear with staggered animation. Cards show treatment name, description, and quick facts (duration, sessions, results). Gold line appears on card hover. "Réserver ma consultation" CTA at bottom.

- [ ] **Step 4: Commit**

```bash
git add src/components/journey/RecommendationScreen.tsx src/components/journey/JourneyApp.tsx
git commit -m "feat: add recommendation screen with personalized treatment cards"
```

---

### Task 16: Trust Layer Components

**Files:**
- Create: `src/components/trust/ProfessorBio.tsx`
- Create: `src/components/trust/ClinicShowcase.tsx`
- Create: `src/components/trust/TeamGrid.tsx`
- Create: `src/components/trust/Testimonials.tsx`
- Create: `src/components/trust/MedicalTourism.tsx`
- Modify: `src/components/journey/RecommendationScreen.tsx`

- [ ] **Step 1: Create ProfessorBio.tsx**

```tsx
// src/components/trust/ProfessorBio.tsx
export default function ProfessorBio() {
  return (
    <section className="py-20 px-6">
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Image placeholder */}
        <div className="aspect-[3/4] bg-bg-base border border-line relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-bg-elevated/30 to-bg-deep/60" />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-gold/20 text-[10px] tracking-[3px] uppercase">Portrait</span>
          </div>
        </div>

        <div>
          <p className="text-gold-deep text-[10px] tracking-[4px] uppercase mb-4">
            Le praticien
          </p>
          <h2 className="font-heading text-3xl sm:text-4xl font-light text-text mb-6">
            Professeur Boukind
          </h2>
          <div className="w-12 h-px bg-gold mb-6" />
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
            <p className="text-[10px] tracking-[2px] uppercase text-gold">
              ✦ Professeur Agrégé — Chirurgie Plastique
            </p>
            <p className="text-[10px] tracking-[2px] uppercase text-gold">
              ✦ 25+ ans d'expérience
            </p>
            <p className="text-[10px] tracking-[2px] uppercase text-gold">
              ✦ Membre SOFCPRE & ISAPS
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Create ClinicShowcase.tsx**

```tsx
// src/components/trust/ClinicShowcase.tsx
export default function ClinicShowcase() {
  const features = [
    { label: 'Bloc Opératoire', description: 'Équipé aux normes internationales' },
    { label: 'Salle de Consultation', description: 'Espace confidentiel et chaleureux' },
    { label: 'Suite de Récupération', description: 'Confort hôtelier post-intervention' },
  ];

  return (
    <section className="py-20 px-6 bg-bg-base">
      <div className="max-w-4xl mx-auto text-center mb-12">
        <p className="text-gold-deep text-[10px] tracking-[4px] uppercase mb-4">
          La clinique
        </p>
        <h2 className="font-heading text-3xl sm:text-4xl font-light text-text mb-4">
          Un cadre d'exception
        </h2>
        <p className="text-text-muted text-sm max-w-lg mx-auto">
          Au cœur de Casablanca, notre clinique allie technologie de pointe
          et atmosphère apaisante pour une expérience haut de gamme.
        </p>
      </div>

      <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6">
        {features.map((feature) => (
          <div key={feature.label} className="text-center p-8 border border-line bg-bg-deep">
            {/* Image placeholder */}
            <div className="aspect-video bg-bg-elevated mb-6 relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-gold/20 text-[10px] tracking-[2px] uppercase">{feature.label}</span>
              </div>
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

- [ ] **Step 3: Create TeamGrid.tsx**

```tsx
// src/components/trust/TeamGrid.tsx
import teamData from '../../data/team.json';
import type { TeamMember } from '../../types';

const team = teamData as TeamMember[];

export default function TeamGrid() {
  return (
    <section className="py-20 px-6">
      <div className="max-w-4xl mx-auto text-center mb-12">
        <p className="text-gold-deep text-[10px] tracking-[4px] uppercase mb-4">
          L'équipe
        </p>
        <h2 className="font-heading text-3xl sm:text-4xl font-light text-text">
          Des experts à votre service
        </h2>
      </div>

      <div className="max-w-4xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-6">
        {team.map((member) => (
          <div key={member.name} className="text-center group">
            <div className="aspect-square bg-bg-base border border-line mb-4 relative overflow-hidden transition-all duration-300 group-hover:border-gold/50">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-bg-deep/50" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-gold/20 text-[9px] tracking-[2px] uppercase">Photo</span>
              </div>
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

- [ ] **Step 4: Create Testimonials.tsx**

```tsx
// src/components/trust/Testimonials.tsx
import testimonialsData from '../../data/testimonials.json';
import type { Testimonial } from '../../types';

const testimonials = testimonialsData as Testimonial[];

export default function Testimonials() {
  return (
    <section className="py-20 px-6 bg-bg-base">
      <div className="max-w-4xl mx-auto text-center mb-12">
        <p className="text-gold-deep text-[10px] tracking-[4px] uppercase mb-4">
          Témoignages
        </p>
        <h2 className="font-heading text-3xl sm:text-4xl font-light text-text">
          Ce qu'ils en disent
        </h2>
      </div>

      <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {testimonials.map((t, i) => (
          <div key={i} className="p-6 border border-line bg-bg-deep">
            <div className="text-gold text-2xl font-heading italic mb-4">"</div>
            <p className="text-text text-sm font-light leading-relaxed mb-6 italic">
              {t.quote}
            </p>
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

- [ ] **Step 5: Create MedicalTourism.tsx**

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
          <p className="text-gold-deep text-[10px] tracking-[4px] uppercase mb-4">
            Tourisme Médical
          </p>
          <h2 className="font-heading text-3xl sm:text-4xl font-light text-text mb-4">
            Venir de loin, être entre de bonnes mains
          </h2>
          <p className="text-text-muted text-sm max-w-lg mx-auto">
            Casablanca est une destination de référence pour la chirurgie esthétique.
            Nous accompagnons nos patients internationaux à chaque étape.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step) => (
            <div key={step.num} className="p-6 border border-line bg-bg-base">
              <span className="font-heading text-2xl text-gold italic">{step.num}</span>
              <h3 className="font-heading text-base text-text mt-3 mb-2">{step.title}</h3>
              <p className="text-text-muted text-xs font-light leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 6: Add trust layer below recommendations in RecommendationScreen.tsx**

Add imports at the top of `RecommendationScreen.tsx`:

```tsx
import ProfessorBio from '../trust/ProfessorBio';
import ClinicShowcase from '../trust/ClinicShowcase';
import TeamGrid from '../trust/TeamGrid';
import Testimonials from '../trust/Testimonials';
import MedicalTourism from '../trust/MedicalTourism';
```

In the return statement of the loaded state, add the trust layer after the closing `</div>` of `max-w-4xl mx-auto` but before the final closing fragment. Wrap everything in a fragment and append:

Replace the entire return of the non-loading state with:

```tsx
  return (
    <>
      <div className="min-h-screen px-6 py-20">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="w-12 h-px bg-gold mx-auto mb-6" />
            <p className="text-gold-deep text-[10px] tracking-[4px] uppercase mb-4">
              Vos recommandations
            </p>
            <h2 className="font-heading text-3xl sm:text-4xl font-light text-text">
              {headline}
            </h2>
          </div>

          {/* Treatment cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12 stagger-children">
            {treatments.map((treatment) => (
              <div
                key={treatment.id}
                className="group bg-bg-base border border-line overflow-hidden transition-all duration-300 hover:border-gold/50"
              >
                <div className="aspect-[4/3] bg-bg-elevated relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-bg-base/50" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-gold/30 text-[10px] tracking-[3px] uppercase">
                      {treatment.category}
                    </span>
                  </div>
                  <div className="absolute top-0 left-0 right-0 h-0.5 bg-gold transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                </div>
                <div className="p-6">
                  <h3 className="font-heading text-xl text-text mb-2">{treatment.name}</h3>
                  <p className="text-text-muted text-sm font-light leading-relaxed mb-4">{treatment.description}</p>
                  <div className="space-y-2 pt-4 border-t border-line">
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
            ))}
          </div>

          {/* CTA */}
          <div className="text-center">
            <p className="text-text-muted text-sm mb-6">
              Ces recommandations sont indicatives. Une consultation permettra d'affiner votre plan personnalisé.
            </p>
            <button
              onClick={onBook}
              className="px-12 py-4 bg-bg-deep text-text border border-line text-[11px] tracking-[3px] uppercase transition-all duration-300 hover:bg-gradient-to-br hover:from-gold-deep hover:to-gold hover:text-bg-deep hover:border-gold"
            >
              Réserver ma consultation →
            </button>
          </div>
        </div>
      </div>

      {/* Trust Layer — scrollable continuation */}
      <ProfessorBio />
      <ClinicShowcase />
      <TeamGrid />
      <Testimonials />
      <MedicalTourism />

      {/* Final CTA */}
      <section className="py-20 px-6 text-center">
        <div className="w-12 h-px bg-gold mx-auto mb-8" />
        <h2 className="font-heading text-3xl font-light text-text mb-6">
          Prêt à commencer ?
        </h2>
        <button
          onClick={onBook}
          className="px-12 py-4 bg-bg-deep text-text border border-line text-[11px] tracking-[3px] uppercase transition-all duration-300 hover:bg-gradient-to-br hover:from-gold-deep hover:to-gold hover:text-bg-deep hover:border-gold"
        >
          Réserver ma consultation →
        </button>
      </section>
    </>
  );
```

- [ ] **Step 7: Verify in browser**

Run: `npm run dev`
Expected: After recommendations, scrolling down reveals: Professor bio (photo + text side by side), clinic showcase (3 feature cards), team grid (4 members), testimonials (6 quote cards), medical tourism (4-step process), and final CTA.

- [ ] **Step 8: Commit**

```bash
git add src/components/trust/ src/components/journey/RecommendationScreen.tsx
git commit -m "feat: add trust layer — professor bio, clinic, team, testimonials, medical tourism"
```

---

### Task 17: Booking Modal & Supabase Integration

**Files:**
- Create: `src/lib/supabase.ts`
- Create: `src/components/journey/BookingModal.tsx`
- Modify: `src/components/journey/JourneyApp.tsx`

- [ ] **Step 1: Create supabase.ts**

```typescript
// src/lib/supabase.ts
import { createClient } from '@supabase/supabase-js';
import type { LeadData } from '../types';

const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL || '';
const supabaseKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY || '';

export const supabase =
  supabaseUrl && supabaseKey
    ? createClient(supabaseUrl, supabaseKey)
    : null;

export async function submitLead(data: LeadData): Promise<boolean> {
  if (!supabase) {
    console.warn('[MAOA] Supabase not configured — lead logged to console');
    console.log('[MAOA] Lead data:', data);
    return true;
  }

  const { error } = await supabase.from('leads').insert(data);
  if (error) {
    console.error('[MAOA] Failed to submit lead:', error);
    return false;
  }
  return true;
}
```

**Supabase table migration (run in Supabase dashboard when ready):**

```sql
CREATE TABLE leads (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  whatsapp text NOT NULL,
  preferred_contact text DEFAULT 'whatsapp',
  gender text,
  path text,
  zone text,
  age text,
  concern text,
  recommendations text[],
  created_at timestamptz DEFAULT now()
);

ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow anonymous inserts" ON leads
  FOR INSERT TO anon
  WITH CHECK (true);
```

Save this SQL in a comment at the bottom of `supabase.ts` for reference.

- [ ] **Step 2: Create BookingModal.tsx**

```tsx
// src/components/journey/BookingModal.tsx
import { useState } from 'react';
import { submitLead } from '../../lib/supabase';
import type { JourneyState } from '../../types';

interface BookingModalProps {
  state: JourneyState;
  treatmentIds: string[];
  onClose: () => void;
  onComplete: () => void;
}

export default function BookingModal({ state, treatmentIds, onClose, onComplete }: BookingModalProps) {
  const [name, setName] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [contact, setContact] = useState('whatsapp');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !whatsapp.trim()) {
      setError('Veuillez remplir tous les champs.');
      return;
    }

    setSubmitting(true);
    setError('');

    const success = await submitLead({
      name: name.trim(),
      whatsapp: whatsapp.trim(),
      preferred_contact: contact,
      gender: state.gender,
      path: state.path,
      zone: state.zone,
      age: state.age,
      concern: state.concern,
      recommendations: treatmentIds,
    });

    if (success) {
      onComplete();
    } else {
      setError('Une erreur est survenue. Veuillez réessayer.');
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-bg-deep/80 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-md bg-bg-base border border-line animate-fade-in-up">
        {/* Gold top accent */}
        <div className="h-0.5 bg-gradient-to-r from-gold-deep to-gold" />

        <div className="p-8">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-text-muted hover:text-text transition-colors"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>

          <p className="text-gold-deep text-[10px] tracking-[4px] uppercase mb-3">
            Consultation
          </p>
          <h3 className="font-heading text-2xl text-text mb-2">
            Réservez votre rendez-vous
          </h3>
          <p className="text-text-muted text-sm mb-8">
            Nous vous contacterons dans les 24h pour planifier votre consultation.
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="text-[10px] tracking-[2px] uppercase text-text-muted mb-2 block">
                Nom complet
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Votre nom"
                className="w-full bg-bg-deep border border-line px-4 py-3 text-text text-sm font-light placeholder:text-text-muted/50 focus:outline-none focus:border-gold transition-colors"
              />
            </div>

            <div>
              <label className="text-[10px] tracking-[2px] uppercase text-text-muted mb-2 block">
                WhatsApp / Téléphone
              </label>
              <input
                type="tel"
                value={whatsapp}
                onChange={(e) => setWhatsapp(e.target.value)}
                placeholder="+212 6XX XXX XXX"
                className="w-full bg-bg-deep border border-line px-4 py-3 text-text text-sm font-light placeholder:text-text-muted/50 focus:outline-none focus:border-gold transition-colors"
              />
            </div>

            <div>
              <label className="text-[10px] tracking-[2px] uppercase text-text-muted mb-2 block">
                Contact préféré
              </label>
              <div className="flex gap-3">
                {['whatsapp', 'phone', 'email'].map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => setContact(opt)}
                    className={`flex-1 py-2 text-xs border transition-all duration-200 ${
                      contact === opt
                        ? 'border-gold text-gold bg-gold/10'
                        : 'border-line text-text-muted hover:border-gold/30'
                    }`}
                  >
                    {opt === 'whatsapp' ? 'WhatsApp' : opt === 'phone' ? 'Téléphone' : 'Email'}
                  </button>
                ))}
              </div>
            </div>

            {error && (
              <p className="text-red-400 text-xs">{error}</p>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-4 bg-bg-deep border border-line text-[11px] tracking-[3px] uppercase text-text transition-all duration-300 hover:bg-gradient-to-br hover:from-gold-deep hover:to-gold hover:text-bg-deep hover:border-gold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitting ? 'Envoi en cours...' : 'Confirmer →'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Wire booking modal into JourneyApp.tsx**

Add import:

```tsx
import BookingModal from './BookingModal';
```

Add the modal rendering after the screen transition div, inside the main return, before the closing `</div>`:

```tsx
      {/* Booking Modal */}
      {state.bookingOpen && (
        <BookingModal
          state={state}
          treatmentIds={[]}
          onClose={() => dispatch({ type: 'CLOSE_BOOKING' })}
          onComplete={() => dispatch({ type: 'BOOKING_COMPLETE' })}
        />
      )}
```

Note: `treatmentIds` will be populated from the recommendation engine results. For now pass an empty array — we'll connect it in the next step.

To properly pass treatment IDs, add a `recommendations` field to `JourneyState` in `src/types.ts`:

In `src/types.ts`, add to `JourneyState`:

```typescript
export interface JourneyState {
  // ... existing fields ...
  recommendedTreatmentIds: string[];
}
```

Update `initialState` in `JourneyApp.tsx`:

```tsx
const initialState: JourneyState = {
  // ... existing fields ...
  recommendedTreatmentIds: [],
};
```

Then update the `BookingModal` usage to pass `state.recommendedTreatmentIds`.

- [ ] **Step 4: Verify in browser**

Run: `npm run dev`
Expected: Clicking "Réserver ma consultation" opens a centered modal with backdrop blur. Form has name, WhatsApp, and preferred contact fields. Submitting logs to console (Supabase not configured). Close button and backdrop click dismiss the modal.

- [ ] **Step 5: Commit**

```bash
git add src/lib/supabase.ts src/components/journey/BookingModal.tsx src/components/journey/JourneyApp.tsx src/types.ts
git commit -m "feat: add booking modal with Supabase lead capture"
```

---

### Task 18: Thank You Screen, WhatsApp Button & Deployment

**Files:**
- Create: `src/components/journey/ThankYouScreen.tsx`
- Create: `src/components/ui/WhatsAppButton.astro`
- Modify: `src/pages/index.astro`
- Modify: `src/components/journey/JourneyApp.tsx`

- [ ] **Step 1: Create ThankYouScreen.tsx**

```tsx
// src/components/journey/ThankYouScreen.tsx
import { useState } from 'react';

export default function ThankYouScreen() {
  const whatsappNumber = import.meta.env.PUBLIC_WHATSAPP_NUMBER || '212600000000';

  const faqs = [
    {
      q: 'Combien coûte une consultation ?',
      a: 'La première consultation est offerte. Elle permet d\'évaluer vos besoins et de définir un plan personnalisé.',
    },
    {
      q: 'Quand serai-je contacté(e) ?',
      a: 'Notre équipe vous contactera dans les 24 heures suivant votre demande, du lundi au samedi.',
    },
    {
      q: 'Puis-je venir de l\'étranger ?',
      a: 'Absolument. Nous accompagnons nos patients internationaux avec un service dédié : hébergement, transferts, et suivi à distance.',
    },
    {
      q: 'Les résultats sont-ils naturels ?',
      a: 'C\'est notre priorité absolue. Le Pr. Boukind privilégie toujours un résultat harmonieux qui respecte votre identité.',
    },
  ];

  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen px-6 py-20">
      <div className="max-w-2xl mx-auto text-center">
        {/* Confirmation */}
        <div className="mb-16">
          <div className="w-16 h-16 border border-gold rounded-full flex items-center justify-center mx-auto mb-8">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="1.5">
              <path d="M20 6L9 17l-5-5" />
            </svg>
          </div>
          <p className="text-gold-deep text-[10px] tracking-[4px] uppercase mb-4">
            Demande envoyée
          </p>
          <h2 className="font-heading text-3xl sm:text-4xl font-light text-text mb-4">
            Merci pour votre confiance
          </h2>
          <p className="text-text-muted text-sm leading-relaxed">
            Notre équipe vous contactera dans les 24 heures pour planifier votre consultation personnalisée.
          </p>
        </div>

        {/* WhatsApp direct */}
        <div className="mb-16 p-8 border border-line bg-bg-base">
          <p className="text-text text-sm mb-4">Besoin d'une réponse immédiate ?</p>
          <a
            href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent('Bonjour, je souhaite prendre rendez-vous pour une consultation.')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-3 bg-[#25D366] text-white text-[11px] tracking-[2px] uppercase hover:bg-[#20BD5A] transition-colors"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            Écrire sur WhatsApp
          </a>
        </div>

        {/* FAQ Accordion */}
        <div className="text-left">
          <p className="text-gold-deep text-[10px] tracking-[4px] uppercase mb-6 text-center">
            Questions fréquentes
          </p>
          <div className="space-y-2">
            {faqs.map((faq, i) => (
              <div key={i} className="border border-line">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-5 text-left hover:bg-bg-base transition-colors"
                >
                  <span className="text-text text-sm font-light">{faq.q}</span>
                  <span className="text-gold ml-4 transition-transform duration-200" style={{ transform: openFaq === i ? 'rotate(45deg)' : 'rotate(0deg)' }}>
                    +
                  </span>
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-5 animate-fade-in">
                    <p className="text-text-muted text-sm font-light leading-relaxed">
                      {faq.a}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Social / Contact */}
        <div className="mt-16 pt-8 border-t border-line">
          <p className="text-[10px] tracking-[3px] uppercase text-text-muted mb-4">
            Suivez-nous
          </p>
          <div className="flex justify-center gap-6">
            <a href="#" className="text-text-muted hover:text-gold transition-colors text-sm">Instagram</a>
            <a href="#" className="text-text-muted hover:text-gold transition-colors text-sm">Facebook</a>
            <a href="#" className="text-text-muted hover:text-gold transition-colors text-sm">YouTube</a>
          </div>
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Create WhatsAppButton.astro**

```astro
---
// src/components/ui/WhatsAppButton.astro
const whatsappNumber = import.meta.env.PUBLIC_WHATSAPP_NUMBER || '212600000000';
const message = encodeURIComponent('Bonjour, je souhaite prendre rendez-vous pour une consultation.');
---

<a
  href={`https://wa.me/${whatsappNumber}?text=${message}`}
  target="_blank"
  rel="noopener noreferrer"
  class="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white rounded-full p-4 shadow-lg hover:scale-110 hover:shadow-xl transition-all duration-300"
  aria-label="Contacter sur WhatsApp"
>
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
</a>
```

- [ ] **Step 3: Update index.astro with WhatsApp button**

```astro
---
// src/pages/index.astro
import BaseLayout from '../layouts/BaseLayout.astro';
import Navigation from '../components/ui/Navigation.astro';
import WhatsAppButton from '../components/ui/WhatsAppButton.astro';
import JourneyApp from '../components/journey/JourneyApp';
---

<BaseLayout>
  <Navigation />
  <JourneyApp client:only="react" />
  <WhatsAppButton />
</BaseLayout>
```

- [ ] **Step 4: Wire ThankYouScreen into JourneyApp.tsx**

Add import:

```tsx
import ThankYouScreen from './ThankYouScreen';
```

Add case:

```tsx
      case 'thank-you':
        return <ThankYouScreen />;
```

- [ ] **Step 5: Verify full journey in browser**

Run: `npm run dev`
Expected: Complete journey flow works end-to-end:
1. Arrival → click "Commencer"
2. Gender → click "Elle" or "Lui"
3. Path → click "Je sais ce que je veux" or "Guidez-moi"
4. Zone path: Silhouette → Zone Detail (3 questions) → Recommendations
5. Age path: Life Stage → Concern → Recommendations
6. Recommendations + trust layer scrolls below
7. "Réserver" → Booking modal → Submit → Thank You
8. Thank You shows confirmation, WhatsApp link, FAQ accordion, social links
9. Floating WhatsApp button visible on all screens
10. Theme toggle works throughout
11. Back button navigates correctly

- [ ] **Step 6: Build for production**

Run: `npm run build`
Expected: Build completes successfully in `dist/` folder.

- [ ] **Step 7: Commit**

```bash
git add src/components/journey/ThankYouScreen.tsx src/components/ui/WhatsAppButton.astro src/pages/index.astro src/components/journey/JourneyApp.tsx
git commit -m "feat: add thank you screen, WhatsApp button, complete journey flow"
```

- [ ] **Step 8: Deploy to Vercel**

Install Vercel CLI if not present:
```bash
npm install -g vercel
```

Deploy:
```bash
vercel
```

Follow prompts:
- Set up and deploy: Yes
- Scope: select the client's Vercel account
- Link to existing project: No
- Project name: maoa
- Framework: Astro
- Build command: (default)
- Output directory: (default)

Set environment variables in Vercel dashboard:
- `PUBLIC_SUPABASE_URL`
- `PUBLIC_SUPABASE_ANON_KEY`
- `PUBLIC_WHATSAPP_NUMBER`

- [ ] **Step 9: Commit Vercel config if generated**

```bash
git add -A
git commit -m "chore: add Vercel deployment configuration"
```

---

## Self-Review Checklist

After all 18 tasks are complete, verify:

1. **Spec coverage:**
   - [x] All 9 journey screens (Arrival, Gender, Path, Silhouette, Zone Detail, Life Stage, Concern, Recommendations, Thank You)
   - [x] Trust layer (Professor bio, clinic, team, testimonials, medical tourism)
   - [x] Booking modal with Supabase integration
   - [x] Dark/light theme with toggle
   - [x] Gold line-art silhouettes (male + female)
   - [x] Treatment data in JSON with mapping recommendations
   - [x] WhatsApp integration
   - [x] French language only
   - [x] Mobile-responsive design
   - [x] Vercel deployment

2. **Type consistency:** All components use types from `src/types.ts`. Treatment, Zone, JourneyState, LeadData types are consistent across files.

3. **Data flow:** Gender → Path → Zone/Age+Concern → `recommend.ts` → Treatment cards → Booking modal captures all selections → Supabase.

4. **Missing from spec that is deferred to Phase 2:** Multilingual, SEO intervention pages, additional form types, blog, analytics, scoring system upgrade.
