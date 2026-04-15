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
        <p className="text-gold-deep text-[10px] tracking-[4px] uppercase mb-4">La clinique</p>
        <h2 className="font-heading text-3xl sm:text-4xl font-light text-text mb-4">Un cadre d'exception</h2>
        <p className="text-text-muted text-sm max-w-lg mx-auto">
          Au cœur de Casablanca, notre clinique allie technologie de pointe
          et atmosphère apaisante pour une expérience haut de gamme.
        </p>
      </div>
      <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6">
        {features.map((feature) => (
          <div key={feature.label} className="text-center p-8 border border-line bg-bg-deep">
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
