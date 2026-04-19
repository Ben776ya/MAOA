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
      {/* Primary silk wave layer */}
      <div className="absolute inset-0 silk-texture" />

      {/* Secondary offset wave for depth */}
      <div
        className="absolute inset-0 silk-texture"
        style={{
          transform: 'rotate(180deg) scale(1.1)',
          animationDelay: '-10s',
          opacity: 0.015,
        }}
      />
    </div>
  );
}
