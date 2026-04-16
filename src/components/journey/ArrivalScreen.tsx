// src/components/journey/ArrivalScreen.tsx
interface ArrivalScreenProps {
  onBegin: () => void;
}

export default function ArrivalScreen({ onBegin }: ArrivalScreenProps) {
  return (
    <div className="min-h-screen flex items-center justify-center text-center px-6">
      <div className="max-w-2xl">
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
