// src/components/trust/Testimonials.tsx
import testimonialsData from '../../data/testimonials.json';
import type { Testimonial } from '../../types';

const testimonials = testimonialsData as Testimonial[];

export default function Testimonials() {
  return (
    <section className="py-20 px-6 bg-bg-base">
      <div className="max-w-4xl mx-auto text-center mb-12">
        <p className="text-gold-deep text-[10px] tracking-[4px] uppercase mb-4">Témoignages</p>
        <h2 className="font-heading text-3xl sm:text-4xl font-light text-text">Ce qu'ils en disent</h2>
      </div>
      <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {testimonials.map((t, i) => (
          <div key={i} className="p-6 border border-line border-l-2 border-l-gold/30 bg-bg-deep">
            <div className="text-gold text-3xl font-heading italic mb-4">"</div>
            <p className="text-text text-sm font-light leading-relaxed mb-6 italic">{t.quote}</p>
            <div className="flex items-center gap-3 pt-4 border-t border-line">
              <div>
                <p className="text-text text-xs font-body">{t.name}, {t.age} ans</p>
                <p className="text-text-muted text-[10px]">{t.city}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
