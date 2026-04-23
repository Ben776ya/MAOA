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
          <p className="text-gold-deep text-[10px] tracking-[4px] uppercase mb-4">Tourisme Médical</p>
          <h2 className="font-heading text-3xl sm:text-4xl font-light text-text mb-4">Venir de loin, être entre de bonnes mains</h2>
          <div className="w-16 h-px bg-gradient-to-r from-gold-deep to-gold mx-auto mb-4" />
          <p className="text-text-muted text-sm max-w-lg mx-auto">
            Casablanca est une destination de référence pour la chirurgie esthétique.
            Nous accompagnons nos patients internationaux à chaque étape.
          </p>
        </div>
        <div className="relative">
          {/* Horizontal connector line — hidden on mobile (stacked layout) */}
          <div
            className="hidden lg:block absolute left-0 right-0 h-px bg-gold/20"
            style={{ top: '24px' }}
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step) => (
              <div key={step.num} className="p-6 border border-line bg-bg-base relative">
                {/* Step number with gold circle background */}
                <div className="relative inline-flex items-center justify-center w-12 h-12 mb-3">
                  <div className="absolute inset-0 rounded-full border border-gold/30 bg-bg-base" />
                  <span className="relative font-heading text-2xl text-gold italic">{step.num}</span>
                </div>
                <h3 className="font-heading text-base text-text mt-1 mb-2">{step.title}</h3>
                <p className="text-text-muted text-xs font-light leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
