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
        {stages.map((stage) => (
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
