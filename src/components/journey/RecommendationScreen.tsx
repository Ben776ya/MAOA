// src/components/journey/RecommendationScreen.tsx
import { useState, useEffect } from 'react';
import type { Treatment } from '../../types';
import { getZoneRecommendations, getAgeRecommendations } from '../../lib/recommend';
import ProfessorBio from '../trust/ProfessorBio';
import ClinicShowcase from '../trust/ClinicShowcase';
import TeamGrid from '../trust/TeamGrid';
import Testimonials from '../trust/Testimonials';
import MedicalTourism from '../trust/MedicalTourism';

interface RecommendationScreenProps {
  gender: 'her' | 'him';
  path: 'zone' | 'age';
  zone: string | null;
  age: string | null;
  concern: string | null;
  onBook: () => void;
}

export default function RecommendationScreen({
  gender, path, zone, age, concern, onBook,
}: RecommendationScreenProps) {
  const [treatments, setTreatments] = useState<Treatment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      const results = path === 'zone'
        ? getZoneRecommendations(zone!, gender)
        : getAgeRecommendations(age!, concern!, gender);
      setTreatments(results);
      setLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, [gender, path, zone, age, concern]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6">
        <div className="w-16 h-px bg-gold animate-gold-pulse mb-8" />
        <p className="font-heading text-2xl text-text animate-fade-in">
          Analyse en cours...
        </p>
        <p className="text-text-muted text-sm mt-3">
          Nous préparons vos recommandations personnalisées
        </p>
      </div>
    );
  }

  const headline = path === 'zone'
    ? `Nos recommandations pour votre zone`
    : `Soins recommandés pour vous`;

  return (
    <>
      <div className="min-h-screen px-6 py-20">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="w-12 h-px bg-gold mx-auto mb-6" />
            <p className="text-gold-deep text-[10px] tracking-[4px] uppercase mb-4">
              Vos recommandations
            </p>
            <h2 className="font-heading text-3xl sm:text-4xl font-light text-text">
              {headline}
            </h2>
          </div>

          {/* Treatment cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12 stagger-children">
            {treatments.map((treatment) => (
              <div
                key={treatment.id}
                className="group bg-bg-base border border-line overflow-hidden transition-all duration-300 hover:border-gold/50"
              >
                <div className="aspect-[4/3] bg-bg-elevated relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-bg-base/50" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-gold/30 text-[10px] tracking-[3px] uppercase">
                      {treatment.category}
                    </span>
                  </div>
                  <div className="absolute top-0 left-0 right-0 h-0.5 bg-gold transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                </div>
                <div className="p-6">
                  <h3 className="font-heading text-xl text-text mb-2">{treatment.name}</h3>
                  <p className="text-text-muted text-sm font-light leading-relaxed mb-4">{treatment.description}</p>
                  <div className="space-y-2 pt-4 border-t border-line">
                    <div className="flex justify-between text-xs">
                      <span className="text-text-muted">Durée</span>
                      <span className="text-text">{treatment.duration}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-text-muted">Séances</span>
                      <span className="text-text">{treatment.sessions}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-text-muted">Résultats</span>
                      <span className="text-text">{treatment.results}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="text-center">
            <p className="text-text-muted text-sm mb-6">
              Ces recommandations sont indicatives. Une consultation permettra d'affiner votre plan personnalisé.
            </p>
            <button
              onClick={onBook}
              className="px-12 py-4 bg-bg-deep text-text border border-line text-[11px] tracking-[3px] uppercase transition-all duration-300 hover:bg-gradient-to-br hover:from-gold-deep hover:to-gold hover:text-bg-deep hover:border-gold"
            >
              Réserver ma consultation →
            </button>
          </div>
        </div>
      </div>

      {/* Trust Layer */}
      <ProfessorBio />
      <ClinicShowcase />
      <TeamGrid />
      <Testimonials />
      <MedicalTourism />

      {/* Final CTA */}
      <section className="py-20 px-6 text-center">
        <div className="w-12 h-px bg-gold mx-auto mb-8" />
        <h2 className="font-heading text-3xl font-light text-text mb-6">
          Prêt à commencer ?
        </h2>
        <button
          onClick={onBook}
          className="px-12 py-4 bg-bg-deep text-text border border-line text-[11px] tracking-[3px] uppercase transition-all duration-300 hover:bg-gradient-to-br hover:from-gold-deep hover:to-gold hover:text-bg-deep hover:border-gold"
        >
          Réserver ma consultation →
        </button>
      </section>
    </>
  );
}
