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
