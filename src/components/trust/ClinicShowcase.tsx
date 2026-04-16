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
