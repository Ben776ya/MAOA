// src/components/journey/ZoneDetailScreen.tsx
import type { Zone } from '../../types';
import zonesData from '../../data/zones.json';

const zones = zonesData as Zone[];

interface ZoneDetailScreenProps {
  zoneId: string;
  onAnswer: (answer: string) => void;
  onComplete: () => void;
  currentAnswers: string[];
}

export default function ZoneDetailScreen({ zoneId, onAnswer, onComplete, currentAnswers }: ZoneDetailScreenProps) {
  const zone = zones.find((z) => z.id === zoneId);
  if (!zone) return null;

  const currentQuestionIndex = currentAnswers.length;
  const isComplete = currentQuestionIndex >= zone.questions.length;

  if (isComplete) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6">
        <div className="w-12 h-px bg-gold mb-8" />
        <p className="text-gold-deep text-[10px] tracking-[4px] uppercase mb-4">
          {zone.label}
        </p>
        <h2 className="font-heading text-3xl sm:text-4xl font-light text-text mb-6 text-center">
          Merci pour vos réponses
        </h2>
        <p className="text-text-muted text-sm mb-10 text-center max-w-md">
          Nous avons analysé vos besoins. Découvrez nos recommandations personnalisées.
        </p>
        <button
          onClick={onComplete}
          className="px-10 py-4 border border-text/30 text-[11px] tracking-[3px] uppercase text-text hover:bg-text hover:text-bg-deep transition-all duration-300"
        >
          Voir mes recommandations →
        </button>
      </div>
    );
  }

  const question = zone.questions[currentQuestionIndex];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6">
      {/* Progress indicator */}
      <div className="flex gap-2 mb-8">
        {zone.questions.map((_, i) => (
          <div
            key={i}
            className={`h-0.5 w-8 transition-colors duration-300 ${
              i <= currentQuestionIndex ? 'bg-gold' : 'bg-line'
            }`}
          />
        ))}
      </div>

      <p className="text-gold-deep text-[10px] tracking-[4px] uppercase mb-4">
        {zone.label} — Question {currentQuestionIndex + 1}/{zone.questions.length}
      </p>

      <h2 className="font-heading text-2xl sm:text-4xl font-light text-text mb-10 text-center max-w-lg">
        {question.question}
      </h2>

      <div className="w-full max-w-md space-y-3">
        {question.answers.map((answer, i) => (
          <button
            key={i}
            onClick={() => onAnswer(answer)}
            className="w-full text-left flex items-center gap-4 p-5 bg-bg-base border border-line transition-all duration-300 hover:border-gold/50 hover:bg-bg-elevated group"
          >
            <span className="font-heading text-sm text-gold italic opacity-50 group-hover:opacity-100">
              {String(i + 1).padStart(2, '0')}
            </span>
            <span className="text-text text-sm font-light">{answer}</span>
            <span className="ml-auto text-gold opacity-0 group-hover:opacity-100 transition-opacity">
              →
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
