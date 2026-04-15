// src/components/trust/ProfessorBio.tsx
export default function ProfessorBio() {
  return (
    <section className="py-20 px-6">
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="aspect-[3/4] bg-bg-base border border-line relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-bg-elevated/30 to-bg-deep/60" />
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 300 400" fill="none">
            <circle cx="150" cy="180" r="80" stroke="var(--gold)" strokeWidth="0.5" opacity="0.08" />
            <circle cx="150" cy="180" r="55" stroke="var(--gold)" strokeWidth="0.5" opacity="0.08" />
            <circle cx="150" cy="180" r="30" stroke="var(--gold)" strokeWidth="0.5" opacity="0.08" />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="1" opacity="0.1">
              <circle cx="12" cy="8" r="4" />
              <path d="M4 21v-1a6 6 0 0 1 6-6h4a6 6 0 0 1 6 6v1" />
            </svg>
          </div>
          <div className="absolute inset-0 shimmer opacity-30 pointer-events-none" />
        </div>
        <div>
          <p className="text-gold-deep text-[10px] tracking-[4px] uppercase mb-4">Le praticien</p>
          <h2 className="font-heading text-3xl sm:text-4xl font-light text-text mb-6">Professeur Boukind</h2>
          <div className="w-16 h-px bg-gradient-to-r from-gold-deep to-gold mb-6" />
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
