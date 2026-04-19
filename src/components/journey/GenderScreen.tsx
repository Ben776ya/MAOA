// src/components/journey/GenderScreen.tsx
interface GenderScreenProps {
  onSelect: (gender: 'her' | 'him') => void;
}

function FemaleSilhouette() {
  // Elegant model silhouette — hourglass figure, narrow waist, wider hips, long legs
  const path = `
    M100 14 C116 14, 122 24, 122 36 C122 48, 116 54, 112 58
    C109 62, 108 64, 108 70 C110 74, 126 80, 132 86
    C138 92, 137 104, 134 116 C132 126, 128 136, 124 144
    C118 158, 115 168, 113 178 C111 188, 112 196, 116 206
    C124 218, 134 226, 137 236 C140 246, 138 256, 132 268
    C126 284, 122 302, 118 322 C116 338, 114 356, 113 374
    C112 392, 110 412, 108 432 C107 444, 108 452, 110 458
    C112 462, 116 466, 116 468 L100 470 L84 468
    C84 466, 88 462, 90 458 C92 452, 93 444, 92 432
    C90 412, 88 392, 87 374 C86 356, 84 338, 82 322
    C78 302, 74 284, 68 268 C62 256, 60 246, 63 236
    C66 226, 76 218, 84 206 C88 196, 89 188, 87 178
    C85 168, 82 158, 76 144 C72 136, 68 126, 66 116
    C63 104, 62 92, 68 86 C74 80, 90 74, 92 70
    C92 64, 91 62, 88 58 C84 54, 78 48, 78 36
    C78 24, 84 14, 100 14 Z`;

  return (
    <svg
      viewBox="0 0 200 500"
      className="absolute top-[10px] left-1/2 -translate-x-1/2 h-[78%]"
      fill="none"
    >
      <defs>
        <linearGradient id="silhouetteFillF" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--gold)" stopOpacity="0.07" />
          <stop offset="100%" stopColor="var(--gold)" stopOpacity="0.02" />
        </linearGradient>
      </defs>
      <path d={path} fill="url(#silhouetteFillF)" stroke="none" />
      <path d={path} stroke="var(--gold)" strokeWidth="1.2" opacity="0.55" />
    </svg>
  );
}

function MaleSilhouette() {
  // Athletic male silhouette — broad shoulders, V-taper, straight legs
  const path = `
    M100 14 C118 14, 122 24, 122 36 C122 46, 118 52, 114 56
    C112 60, 110 62, 110 68 C112 72, 130 78, 138 86
    C144 92, 142 106, 138 118 C136 128, 134 136, 130 144
    C126 154, 124 164, 122 174 C120 184, 120 194, 122 204
    C126 214, 128 222, 128 232 C128 242, 126 252, 124 262
    C120 282, 118 304, 116 326 C114 344, 114 362, 112 380
    C110 398, 110 416, 108 434 C108 446, 110 454, 112 460
    C114 464, 118 468, 116 470 L100 472 L84 470
    C82 468, 86 464, 88 460 C90 454, 92 446, 92 434
    C90 416, 90 398, 88 380 C86 362, 86 344, 84 326
    C82 304, 80 282, 76 262 C74 252, 72 242, 72 232
    C72 222, 74 214, 78 204 C80 194, 80 184, 78 174
    C76 164, 74 154, 70 144 C66 136, 64 128, 62 118
    C58 106, 56 92, 62 86 C70 78, 88 72, 90 68
    C90 62, 88 60, 86 56 C82 52, 78 46, 78 36
    C78 24, 82 14, 100 14 Z`;

  return (
    <svg
      viewBox="0 0 200 500"
      className="absolute top-[10px] left-1/2 -translate-x-1/2 h-[78%]"
      fill="none"
    >
      <defs>
        <linearGradient id="silhouetteFillM" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--gold)" stopOpacity="0.07" />
          <stop offset="100%" stopColor="var(--gold)" stopOpacity="0.02" />
        </linearGradient>
      </defs>
      <path d={path} fill="url(#silhouetteFillM)" stroke="none" />
      <path d={path} stroke="var(--gold)" strokeWidth="1.2" opacity="0.55" />
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
