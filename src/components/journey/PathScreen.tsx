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
