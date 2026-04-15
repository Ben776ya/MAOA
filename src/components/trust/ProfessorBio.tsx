// src/components/trust/ProfessorBio.tsx
export default function ProfessorBio() {
  return (
    <section className="py-20 px-6">
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="aspect-[3/4] bg-bg-base border border-line relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-bg-elevated/30 to-bg-deep/60" />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-gold/20 text-[10px] tracking-[3px] uppercase">Portrait</span>
          </div>
        </div>
        <div>
          <p className="text-gold-deep text-[10px] tracking-[4px] uppercase mb-4">Le praticien</p>
          <h2 className="font-heading text-3xl sm:text-4xl font-light text-text mb-6">Professeur Boukind</h2>
          <div className="w-12 h-px bg-gold mb-6" />
          <p className="text-text-muted text-sm font-light leading-relaxed mb-4">
            Professeur agrégé en chirurgie plastique, reconstructrice et esthétique,
            le Pr. Boukind exerce depuis plus de 25 ans au service de la beauté naturelle.
          </p>
          <p className="text-text-muted text-sm font-light leading-relaxed mb-6">
            Sa philosophie : chaque visage est une œuvre, chaque geste chirurgical
            est un acte artistique. Membre de sociétés savantes internationales,
            il allie expertise technique et sensibilité esthétique pour des résultats
            qui respectent l'identité de chaque patient.
          </p>
          <div className="space-y-2">
            <p className="text-[10px] tracking-[2px] uppercase text-gold">✦ Professeur Agrégé — Chirurgie Plastique</p>
            <p className="text-[10px] tracking-[2px] uppercase text-gold">✦ 25+ ans d'expérience</p>
            <p className="text-[10px] tracking-[2px] uppercase text-gold">✦ Membre SOFCPRE & ISAPS</p>
          </div>
        </div>
      </div>
    </section>
  );
}
