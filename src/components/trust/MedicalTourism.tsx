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
          <p className="text-text-muted text-sm max-w-lg mx-auto">
            Casablanca est une destination de référence pour la chirurgie esthétique.
            Nous accompagnons nos patients internationaux à chaque étape.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step) => (
            <div key={step.num} className="p-6 border border-line bg-bg-base">
              <span className="font-heading text-2xl text-gold italic">{step.num}</span>
              <h3 className="font-heading text-base text-text mt-3 mb-2">{step.title}</h3>
              <p className="text-text-muted text-xs font-light leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
