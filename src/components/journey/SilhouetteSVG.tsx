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

  // Elegant female model silhouette — hourglass, narrow waist, wider hips, long legs
  const femaleOutline = `
    M100 4 C116 4, 120 14, 120 26 C120 40, 116 48, 112 54
    C109 58, 107 62, 106 68 C106 72, 124 80, 130 90
    C136 98, 136 110, 132 122 C130 132, 127 140, 124 148
    C118 162, 115 172, 112 182 C110 192, 112 202, 118 214
    C126 226, 136 234, 138 244 C140 254, 136 264, 130 276
    C124 294, 120 312, 118 330 C116 346, 114 362, 113 378
    C112 394, 110 412, 108 430 C107 442, 108 450, 112 456
    C114 460, 116 462, 112 464 L100 466 L88 464
    C84 462, 86 460, 88 456 C92 450, 93 442, 92 430
    C90 412, 88 394, 87 378 C86 362, 84 346, 82 330
    C80 312, 76 294, 70 276 C64 264, 60 254, 62 244
    C64 234, 74 226, 82 214 C88 202, 90 192, 88 182
    C85 172, 82 162, 76 148 C73 140, 70 132, 68 122
    C64 110, 64 98, 70 90 C76 80, 94 72, 94 68
    C93 62, 91 58, 88 54 C84 48, 80 40, 80 26
    C80 14, 84 4, 100 4 Z`;

  // Athletic male silhouette — broad shoulders, V-taper, proportional legs
  const maleOutline = `
    M100 4 C116 4, 120 14, 120 26 C120 38, 118 46, 114 52
    C112 56, 110 60, 110 66 C110 70, 130 78, 138 88
    C144 96, 142 110, 138 122 C136 132, 132 140, 128 148
    C124 160, 122 170, 120 180 C118 190, 118 200, 122 210
    C128 222, 130 232, 130 242 C130 252, 128 262, 124 274
    C120 292, 118 312, 116 330 C114 346, 114 362, 112 378
    C110 396, 110 414, 108 432 C108 444, 110 452, 114 458
    C116 462, 118 464, 114 466 L100 468 L86 466
    C82 464, 84 462, 86 458 C90 452, 92 444, 92 432
    C90 414, 90 396, 88 378 C86 362, 86 346, 84 330
    C82 312, 80 292, 76 274 C72 262, 70 252, 70 242
    C70 232, 72 222, 78 210 C82 200, 82 190, 80 180
    C78 170, 76 160, 72 148 C68 140, 64 132, 62 122
    C58 110, 56 96, 62 88 C70 78, 90 70, 90 66
    C90 60, 88 56, 86 52 C82 46, 80 38, 80 26
    C80 14, 84 4, 100 4 Z`;

  const outlinePath = gender === 'her' ? femaleOutline : maleOutline;

  return (
    <svg viewBox="0 0 220 480" className="w-full max-w-xs mx-auto" fill="none">
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
        <linearGradient id="bodyFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--gold)" stopOpacity="0.06" />
          <stop offset="50%" stopColor="var(--gold)" stopOpacity="0.03" />
          <stop offset="100%" stopColor="var(--gold)" stopOpacity="0.06" />
        </linearGradient>
      </defs>

      {/* Body fill — subtle shading inside the silhouette */}
      <path
        d={outlinePath}
        fill="url(#bodyFill)"
        stroke="none"
      />

      {/* Body outline — visible gold stroke */}
      <path
        d={outlinePath}
        stroke="var(--gold)"
        strokeWidth="1.2"
        opacity="0.7"
        className="draw-line"
      />

      {/* Zone hotspots and labels */}
      {zones.map((zone) => {
        const isHovered = hoveredZone === zone.id;
        const showLabel = true; // Always show labels for clarity

        // Connector line endpoints
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
            {/* Clickable zone circle */}
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

            {/* Zone ring border */}
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

            {/* Connector line and label */}
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
  );
}
