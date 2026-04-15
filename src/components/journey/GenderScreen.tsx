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
      <ellipse cx="100" cy="42" rx="28" ry="34" />
      <path d="M72 35 C65 20 68 10 80 8 C90 5 100 4 110 5 C125 8 132 18 130 35 C132 50 128 65 120 75 L118 80" strokeWidth="0.8" />
      <path d="M88 72 L88 88 M112 72 L112 88" />
      <path d="M88 88 C70 90 48 98 38 112 L32 130 C30 140 32 148 36 155 L42 168 C44 175 48 190 50 200 L55 230 C52 240 48 250 48 260 L50 290 C48 310 46 340 48 370 L50 420 C52 435 55 445 62 450 L70 452 L72 420 L75 380 C80 355 85 340 90 330 L95 320 C98 318 102 318 105 320 L110 330 C115 340 120 355 125 380 L128 420 L130 452 L138 450 C145 445 148 435 150 420 L152 370 C154 340 152 310 150 290 L148 260 C148 250 145 240 142 230 L148 200 C150 190 155 175 158 168 L162 155 C166 148 168 140 166 130 L162 112 C152 98 130 90 112 88" />
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
      <ellipse cx="100" cy="40" rx="26" ry="32" />
      <path d="M74 32 C72 18 78 8 90 6 C98 4 104 4 112 6 C124 8 128 18 126 32" strokeWidth="0.8" />
      <path d="M85 68 L85 85 M115 68 L115 85" />
      <path d="M85 85 C62 88 35 96 25 112 L20 132 C18 142 20 150 25 158 L35 175 C38 182 42 195 44 205 L48 235 C46 245 44 252 44 262 L46 295 C44 318 42 345 44 375 L46 425 C48 438 52 448 58 452 L68 455 L70 425 L74 382 C80 358 86 342 92 332 L96 322 C98 320 102 320 104 322 L108 332 C114 342 120 358 126 382 L130 425 L132 455 L142 452 C148 448 152 438 154 425 L156 375 C158 345 156 318 154 295 L152 262 C152 252 150 245 148 235 L152 205 C154 195 158 182 162 175 L172 158 C176 150 178 142 176 132 L172 112 C162 96 138 88 115 85" />
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
