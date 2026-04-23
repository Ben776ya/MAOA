// src/components/ui/SilkBackground.tsx
interface SilkBackgroundProps {
  className?: string;
}

export default function SilkBackground({ className = '' }: SilkBackgroundProps) {
  return (
    <div
      className={`absolute inset-0 overflow-hidden ${className}`}
      aria-hidden="true"
      style={{ pointerEvents: 'none' }}
    >
      {/* Wave layer 1 — large flowing S-curves */}
      <div className="silk-wave-1 absolute" style={{ inset: '-20%', filter: 'blur(60px)' }}>
        <svg viewBox="0 0 1200 800" preserveAspectRatio="none" className="w-full h-full">
          <path
            className="silk-wave-path"
            d="M0 650 C200 550, 400 700, 600 580 C800 460, 1000 600, 1200 520"
            stroke="var(--gold)"
            strokeWidth="100"
            fill="none"
            opacity="0.08"
          />
          <path
            className="silk-wave-path"
            d="M0 300 C200 200, 450 380, 650 270 C850 160, 1050 320, 1200 250"
            stroke="var(--gold)"
            strokeWidth="80"
            fill="none"
            opacity="0.06"
          />
        </svg>
      </div>

      {/* Wave layer 2 — offset, slower drift */}
      <div className="silk-wave-2 absolute" style={{ inset: '-15%', filter: 'blur(80px)' }}>
        <svg viewBox="0 0 1200 800" preserveAspectRatio="none" className="w-full h-full">
          <path
            className="silk-wave-path"
            d="M0 480 C250 380, 500 540, 750 420 C1000 300, 1150 440, 1200 390"
            stroke="var(--gold)"
            strokeWidth="140"
            fill="none"
            opacity="0.06"
          />
          <path
            className="silk-wave-path"
            d="M0 150 C300 80, 500 220, 800 140 C1000 80, 1100 180, 1200 130"
            stroke="var(--gold)"
            strokeWidth="60"
            fill="none"
            opacity="0.04"
          />
        </svg>
      </div>
    </div>
  );
}
