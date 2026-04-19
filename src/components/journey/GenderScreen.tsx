// src/components/journey/GenderScreen.tsx
interface GenderScreenProps {
  onSelect: (gender: 'her' | 'him') => void;
}

// Female model — hourglass, long hair on left side, arms at sides with hands
const FEMALE_PATH = `M100 15 C110 14,116 22,116 34 C116 46,114 52,112 58 L110 64 C112 68,118 72,126 76 C134 80,137 84,137 92 C138 98,136 108,135 120 C134 132,134 144,133 156 C132 168,130 178,129 188 C128 198,128 208,128 218 C128 226,128 232,127 236 C126 240,124 242,122 240 C120 238,120 234,120 228 C121 218,122 206,124 194 C125 182,125 170,125 158 C125 146,124 134,123 124 C122 114,121 104,120 96 C122 100,126 110,128 120 C130 130,130 138,126 148 C122 160,116 174,113 186 C112 194,112 200,114 208 C118 218,128 228,134 238 C138 246,137 254,134 264 C130 278,126 294,122 312 C118 330,116 346,114 362 C112 378,112 394,112 410 C112 426,112 438,114 450 C114 458,114 462,110 464 L108 466 C106 464,104 458,104 450 C104 438,104 424,104 408 C104 392,105 376,106 362 C107 346,108 330,108 314 C108 298,107 282,106 268 C105 256,104 248,103 242 C102 238,101 236,100 236 C99 236,98 238,97 242 C96 248,95 256,94 268 C93 282,92 298,92 314 C92 330,93 346,94 362 C95 376,96 392,96 408 C96 424,96 438,96 450 C96 458,94 464,92 466 L90 464 C86 462,86 458,86 450 C88 438,88 426,88 410 C88 394,88 378,86 362 C84 346,82 330,78 312 C74 294,70 278,66 264 C62 254,62 246,66 238 C72 228,82 218,86 208 C88 200,88 194,87 186 C84 174,78 160,74 148 C70 138,70 130,72 120 C74 110,78 104,80 96 C78 100,76 108,76 118 C76 130,75 142,74 154 C74 166,74 178,76 188 C77 198,78 208,78 218 C78 226,78 232,79 236 C80 240,78 242,76 240 C74 238,72 234,72 228 C72 222,72 216,72 208 C71 198,70 188,68 178 C66 168,65 158,64 146 C63 134,63 122,63 110 C62 98,62 88,63 82 C64 78,68 76,74 74 C66 70,66 60,66 48 C66 36,72 24,82 16 C88 14,94 14,100 15 Z`;

// Athletic male — broad shoulders, V-taper, arms at sides with hands
const MALE_PATH = `M100 15 C110 14,117 22,117 34 C117 46,114 52,112 58 L111 64 C112 68,118 70,128 74 C138 78,146 82,148 90 C150 96,148 106,147 118 C146 130,145 142,144 154 C143 166,142 176,140 186 C138 196,137 206,136 216 C135 224,136 230,136 234 C136 238,137 242,135 244 C133 246,130 244,129 240 C128 236,128 232,129 226 C130 218,131 206,132 194 C133 182,133 170,133 158 C133 146,133 134,132 122 C131 110,130 100,128 94 C127 98,126 106,125 118 C124 132,122 148,120 164 C118 178,118 190,118 200 C118 210,120 218,122 226 C124 236,124 248,122 262 C120 280,118 300,116 318 C114 336,113 352,112 368 C111 384,110 400,110 416 C110 432,110 444,112 452 C114 458,116 462,116 466 L108 468 C106 464,104 458,104 450 C104 436,104 420,104 404 C104 388,106 372,106 356 C107 340,108 322,108 306 C108 290,107 274,106 260 C105 248,104 240,103 236 L100 234 L97 236 C96 240,95 248,94 260 C93 274,92 290,92 306 C92 322,93 340,94 356 C95 372,96 388,96 404 C96 420,96 436,96 450 C96 458,94 464,92 468 L84 466 C84 462,86 458,88 452 C90 444,90 432,90 416 C90 400,89 384,88 368 C87 352,86 336,84 318 C82 300,80 280,78 262 C76 248,76 236,78 226 C80 218,82 210,82 200 C82 190,82 178,80 164 C78 148,76 132,75 118 C74 106,73 98,72 94 C70 100,69 110,68 122 C67 134,67 146,67 158 C67 170,67 182,68 194 C69 206,70 218,70 226 C70 232,72 236,72 240 C71 244,67 246,65 244 C63 242,62 238,63 234 C64 230,64 224,64 216 C63 206,62 196,60 186 C58 176,57 166,56 154 C55 142,54 130,53 118 C52 106,50 96,52 90 C54 82,62 78,72 74 C82 70,88 68,89 64 L88 58 C86 52,83 46,83 34 C83 22,90 14,100 15 Z`;

function FemaleSilhouette() {
  return (
    <svg viewBox="0 0 200 500" className="absolute top-[5%] left-1/2 -translate-x-1/2 h-[82%]" fill="none">
      <defs>
        <linearGradient id="fillF" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--gold)" stopOpacity="0.08" />
          <stop offset="100%" stopColor="var(--gold)" stopOpacity="0.03" />
        </linearGradient>
      </defs>
      <path d={FEMALE_PATH} fill="url(#fillF)" stroke="none" />
      <path d={FEMALE_PATH} stroke="var(--gold)" strokeWidth="1.2" opacity="0.5" />
    </svg>
  );
}

function MaleSilhouette() {
  return (
    <svg viewBox="0 0 200 500" className="absolute top-[5%] left-1/2 -translate-x-1/2 h-[82%]" fill="none">
      <defs>
        <linearGradient id="fillM" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--gold)" stopOpacity="0.08" />
          <stop offset="100%" stopColor="var(--gold)" stopOpacity="0.03" />
        </linearGradient>
      </defs>
      <path d={MALE_PATH} fill="url(#fillM)" stroke="none" />
      <path d={MALE_PATH} stroke="var(--gold)" strokeWidth="1.2" opacity="0.5" />
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
