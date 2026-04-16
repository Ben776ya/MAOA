// src/components/trust/TeamGrid.tsx
import teamData from '../../data/team.json';
import type { TeamMember } from '../../types';

const team = teamData as TeamMember[];

export default function TeamGrid() {
  return (
    <section className="py-20 px-6">
      <div className="max-w-4xl mx-auto text-center mb-12">
        <p className="text-gold-deep text-[10px] tracking-[4px] uppercase mb-4">L'équipe</p>
        <h2 className="font-heading text-3xl sm:text-4xl font-light text-text">Des experts à votre service</h2>
      </div>
      <div className="max-w-4xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-6">
        {team.map((member) => (
          <div key={member.name} className="text-center group">
            <div className="aspect-square bg-bg-base border border-line mb-4 relative overflow-hidden transition-all duration-300 group-hover:border-gold/50">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-bg-deep/50" />
              {/* Gold circle frame hint */}
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 200 200" fill="none">
                <circle cx="100" cy="100" r="60" stroke="var(--gold)" strokeWidth="0.5" opacity="0.1" />
              </svg>
              {/* User icon */}
              <div className="absolute inset-0 flex items-center justify-center">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="1" opacity="0.1">
                  <circle cx="12" cy="8" r="4" />
                  <path d="M4 21v-1a6 6 0 0 1 6-6h4a6 6 0 0 1 6 6v1" />
                </svg>
              </div>
              {/* Shimmer */}
              <div className="absolute inset-0 shimmer opacity-20 pointer-events-none" />
            </div>
            <h3 className="font-heading text-base text-text">{member.name}</h3>
            <p className="text-text-muted text-xs mt-1">{member.title}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
