// src/components/journey/ThankYouScreen.tsx
import { useState } from 'react';

export default function ThankYouScreen() {
  const whatsappNumber = import.meta.env.PUBLIC_WHATSAPP_NUMBER || '212600000000';

  const faqs = [
    {
      q: 'Combien coûte une consultation ?',
      a: 'La première consultation est offerte. Elle permet d\'évaluer vos besoins et de définir un plan personnalisé.',
    },
    {
      q: 'Quand serai-je contacté(e) ?',
      a: 'Notre équipe vous contactera dans les 24 heures suivant votre demande, du lundi au samedi.',
    },
    {
      q: 'Puis-je venir de l\'étranger ?',
      a: 'Absolument. Nous accompagnons nos patients internationaux avec un service dédié : hébergement, transferts, et suivi à distance.',
    },
    {
      q: 'Les résultats sont-ils naturels ?',
      a: 'C\'est notre priorité absolue. Le Pr. Boukind privilégie toujours un résultat harmonieux qui respecte votre identité.',
    },
  ];

  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen px-6 py-20">
      <div className="max-w-2xl mx-auto text-center">
        {/* Confirmation */}
        <div className="mb-16">
          <div className="w-16 h-16 border border-gold rounded-full flex items-center justify-center mx-auto mb-8">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="1.5">
              <path d="M20 6L9 17l-5-5" />
            </svg>
          </div>
          <p className="text-gold-deep text-[10px] tracking-[4px] uppercase mb-4">
            Demande envoyée
          </p>
          <h2 className="font-heading text-3xl sm:text-4xl font-light text-text mb-4">
            Merci pour votre confiance
          </h2>
          <p className="text-text-muted text-sm leading-relaxed">
            Notre équipe vous contactera dans les 24 heures pour planifier votre consultation personnalisée.
          </p>
        </div>

        {/* WhatsApp direct */}
        <div className="mb-16 p-8 border border-line bg-bg-base">
          <p className="text-text text-sm mb-4">Besoin d'une réponse immédiate ?</p>
          <a
            href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent('Bonjour, je souhaite prendre rendez-vous pour une consultation.')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-3 bg-[#25D366] text-white text-[11px] tracking-[2px] uppercase hover:bg-[#20BD5A] transition-colors"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            Écrire sur WhatsApp
          </a>
        </div>

        {/* FAQ Accordion */}
        <div className="text-left">
          <p className="text-gold-deep text-[10px] tracking-[4px] uppercase mb-6 text-center">
            Questions fréquentes
          </p>
          <div className="space-y-2">
            {faqs.map((faq, i) => (
              <div key={i} className="border border-line">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-5 text-left hover:bg-bg-base transition-colors"
                >
                  <span className="text-text text-sm font-light">{faq.q}</span>
                  <span className="text-gold ml-4 transition-transform duration-200" style={{ transform: openFaq === i ? 'rotate(45deg)' : 'rotate(0deg)' }}>
                    +
                  </span>
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-5 animate-fade-in">
                    <p className="text-text-muted text-sm font-light leading-relaxed">
                      {faq.a}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Social / Contact */}
        <div className="mt-16 pt-8 border-t border-line">
          <p className="text-[10px] tracking-[3px] uppercase text-text-muted mb-4">
            Suivez-nous
          </p>
          <div className="flex justify-center gap-6">
            <a href="#" className="text-text-muted hover:text-gold transition-colors text-sm">Instagram</a>
            <a href="#" className="text-text-muted hover:text-gold transition-colors text-sm">Facebook</a>
            <a href="#" className="text-text-muted hover:text-gold transition-colors text-sm">YouTube</a>
          </div>
        </div>
      </div>
    </div>
  );
}
