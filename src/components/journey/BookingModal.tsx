// src/components/journey/BookingModal.tsx
import { useState } from 'react';
import { submitLead } from '../../lib/supabase';
import type { JourneyState } from '../../types';

interface BookingModalProps {
  state: JourneyState;
  treatmentIds: string[];
  onClose: () => void;
  onComplete: () => void;
}

export default function BookingModal({ state, treatmentIds, onClose, onComplete }: BookingModalProps) {
  const [name, setName] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [contact, setContact] = useState('whatsapp');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !whatsapp.trim()) {
      setError('Veuillez remplir tous les champs.');
      return;
    }

    setSubmitting(true);
    setError('');

    const success = await submitLead({
      name: name.trim(),
      whatsapp: whatsapp.trim(),
      preferred_contact: contact,
      gender: state.gender,
      path: state.path,
      zone: state.zone,
      age: state.age,
      concern: state.concern,
      recommendations: treatmentIds,
    });

    if (success) {
      onComplete();
    } else {
      setError('Une erreur est survenue. Veuillez réessayer.');
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-bg-deep/80 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-md bg-bg-base border border-line animate-fade-in-up">
        {/* Gold top accent */}
        <div className="h-0.5 bg-gradient-to-r from-gold-deep to-gold" />

        <div className="p-8">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-text-muted hover:text-text transition-colors"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>

          <p className="text-gold-deep text-[10px] tracking-[4px] uppercase mb-3">
            Consultation
          </p>
          <h3 className="font-heading text-2xl text-text mb-2">
            Réservez votre rendez-vous
          </h3>
          <p className="text-text-muted text-sm mb-8">
            Nous vous contacterons dans les 24h pour planifier votre consultation.
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="text-[10px] tracking-[2px] uppercase text-text-muted mb-2 block">
                Nom complet
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Votre nom"
                className="w-full bg-bg-deep border border-line px-4 py-3 text-text text-sm font-light placeholder:text-text-muted/50 focus:outline-none focus:border-gold transition-colors"
              />
            </div>

            <div>
              <label className="text-[10px] tracking-[2px] uppercase text-text-muted mb-2 block">
                WhatsApp / Téléphone
              </label>
              <input
                type="tel"
                value={whatsapp}
                onChange={(e) => setWhatsapp(e.target.value)}
                placeholder="+212 6XX XXX XXX"
                className="w-full bg-bg-deep border border-line px-4 py-3 text-text text-sm font-light placeholder:text-text-muted/50 focus:outline-none focus:border-gold transition-colors"
              />
            </div>

            <div>
              <label className="text-[10px] tracking-[2px] uppercase text-text-muted mb-2 block">
                Contact préféré
              </label>
              <div className="flex gap-3">
                {['whatsapp', 'phone', 'email'].map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => setContact(opt)}
                    className={`flex-1 py-2 text-xs border transition-all duration-200 ${
                      contact === opt
                        ? 'border-gold text-gold bg-gold/10'
                        : 'border-line text-text-muted hover:border-gold/30'
                    }`}
                  >
                    {opt === 'whatsapp' ? 'WhatsApp' : opt === 'phone' ? 'Téléphone' : 'Email'}
                  </button>
                ))}
              </div>
            </div>

            {error && (
              <p className="text-red-400 text-xs">{error}</p>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-4 bg-bg-deep border border-line text-[11px] tracking-[3px] uppercase text-text transition-all duration-300 hover:bg-gradient-to-br hover:from-gold-deep hover:to-gold hover:text-bg-deep hover:border-gold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitting ? 'Envoi en cours...' : 'Confirmer →'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
