// src/components/journey/SilhouetteScreen.tsx
import SilhouetteSVG from './SilhouetteSVG';

interface SilhouetteScreenProps {
  gender: 'her' | 'him';
  onSelectZone: (zone: string) => void;
}

export default function SilhouetteScreen({ gender, onSelectZone }: SilhouetteScreenProps) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-20">
      <p className="text-gold-deep text-[10px] tracking-[4px] uppercase mb-4 font-body">
        Votre zone
      </p>
      <h2 className="font-heading text-3xl sm:text-4xl font-light text-text mb-2 text-center">
        Quelle zone souhaitez-vous améliorer ?
      </h2>
      <p className="text-text-muted text-sm mb-10 text-center">
        Survolez et cliquez sur la zone qui vous intéresse
      </p>

      <div className="w-full max-w-md">
        <SilhouetteSVG gender={gender} onSelectZone={onSelectZone} />
      </div>
    </div>
  );
}
