// src/components/journey/SilhouetteSVG.tsx
import { useState, useEffect } from 'react';

interface SilhouetteSVGProps {
  gender: 'her' | 'him';
  onSelectZone: (zone: string) => void;
}

interface ZoneSpot {
  id: string;
  label: string;
  cx: number;
  cy: number;
  r: number;
  labelX: number;
  labelY: number;
  side: 'left' | 'right';
}

const zones: ZoneSpot[] = [
  { id: 'hair', label: 'Cheveux', cx: 100, cy: 22, r: 16, labelX: 155, labelY: 22, side: 'right' },
  { id: 'eyes', label: 'Regard', cx: 100, cy: 45, r: 11, labelX: 40, labelY: 45, side: 'left' },
  { id: 'lips', label: 'Lèvres', cx: 100, cy: 63, r: 9, labelX: 155, labelY: 63, side: 'right' },
  { id: 'neck', label: 'Cou', cx: 100, cy: 82, r: 10, labelX: 40, labelY: 82, side: 'left' },
  { id: 'chest', label: 'Poitrine', cx: 100, cy: 130, r: 30, labelX: 170, labelY: 130, side: 'right' },
  { id: 'abdomen', label: 'Ventre', cx: 100, cy: 195, r: 28, labelX: 170, labelY: 195, side: 'right' },
  { id: 'hips', label: 'Hanches', cx: 100, cy: 245, r: 24, labelX: 25, labelY: 245, side: 'left' },
  { id: 'thighs', label: 'Cuisses', cx: 100, cy: 320, r: 30, labelX: 170, labelY: 320, side: 'right' },
];

export default function SilhouetteSVG({ gender, onSelectZone }: SilhouetteSVGProps) {
  const [hoveredZone, setHoveredZone] = useState<string | null>(null);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    setIsTouchDevice(window.matchMedia('(hover: none)').matches);
  }, []);

  const imgSrc = gender === 'her'
    ? '/images/silhouette-female.png'
    : '/images/silhouette-male.png';

  return (
    <div className="relative w-full max-w-xs mx-auto" style={{ aspectRatio: '220 / 480' }}>
      {/* Silhouette image as background visual */}
      <img
        src={imgSrc}
        alt=""
        className="absolute inset-0 w-full h-full object-contain silhouette-img"
        style={{ opacity: 0.35 }}
      />

      {/* SVG overlay for interactive zone circles */}
      <svg
        viewBox="0 0 220 480"
        className="absolute inset-0 w-full h-full"
        fill="none"
      >
        <defs>
          <radialGradient id="zoneGlow">
            <stop offset="0%" stopColor="var(--gold)" stopOpacity="0.5" />
            <stop offset="50%" stopColor="var(--gold)" stopOpacity="0.2" />
            <stop offset="100%" stopColor="var(--gold)" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="zoneGlowHover">
            <stop offset="0%" stopColor="var(--gold)" stopOpacity="0.8" />
            <stop offset="50%" stopColor="var(--gold)" stopOpacity="0.3" />
            <stop offset="100%" stopColor="var(--gold)" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Zone hotspots and labels */}
        {zones.map((zone) => {
          const isHovered = hoveredZone === zone.id;
          const showLabel = true;

          const connectorStartX = zone.side === 'right'
            ? zone.cx + zone.r
            : zone.cx - zone.r;
          const connectorEndX = zone.side === 'right'
            ? zone.labelX - 5
            : zone.labelX + 30;
          const textAnchor = zone.side === 'right' ? 'start' : 'end';
          const textX = zone.side === 'right' ? zone.labelX : zone.labelX + 25;

          return (
            <g key={zone.id} style={{ cursor: 'pointer' }}>
              <circle
                cx={zone.cx}
                cy={zone.cy}
                r={zone.r}
                fill={isHovered ? 'url(#zoneGlowHover)' : 'url(#zoneGlow)'}
                className={isHovered ? '' : 'zone-glow'}
                onMouseEnter={() => setHoveredZone(zone.id)}
                onMouseLeave={() => setHoveredZone(null)}
                onClick={() => onSelectZone(zone.id)}
              />

              <circle
                cx={zone.cx}
                cy={zone.cy}
                r={zone.r}
                fill="none"
                stroke="var(--gold)"
                strokeWidth="0.5"
                opacity={isHovered ? 0.6 : 0.25}
                style={{ pointerEvents: 'none' }}
              />

              {showLabel && (
                <>
                  <line
                    x1={connectorStartX}
                    y1={zone.cy}
                    x2={connectorEndX}
                    y2={zone.labelY}
                    stroke="var(--gold)"
                    strokeWidth="0.5"
                    strokeDasharray="2 2"
                    opacity={isHovered ? 0.8 : 0.35}
                    style={{ pointerEvents: 'none' }}
                  />
                  <text
                    x={textX}
                    y={zone.labelY + 4}
                    fill="var(--gold)"
                    fontSize={isHovered ? '10' : '8'}
                    fontFamily="Inter, sans-serif"
                    letterSpacing="2"
                    textAnchor={textAnchor}
                    opacity={isHovered ? 1 : 0.55}
                    style={{ textTransform: 'uppercase', pointerEvents: 'none' }}
                  >
                    {zone.label}
                  </text>
                </>
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
}
