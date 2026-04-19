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

  // Complete female silhouette — head to feet with arms
  const femaleOutline = `
    M100 5 C82 5 72 18 72 32 C72 48 80 58 85 64 L88 70
    C85 73 82 78 82 85 L82 92
    C70 97 55 108 50 128 L48 152
    C46 162 50 172 55 178
    L42 200 C38 210 34 220 32 235 L30 250 L32 260 L36 260 L38 250
    C40 240 44 225 48 215 L55 200
    L60 225 C55 235 52 248 55 260
    L58 295 C56 318 55 340 58 362
    L60 410 L64 440 L68 460 L80 462
    L82 440 L84 410 L86 370
    C90 345 94 330 98 318
    L100 312
    L102 318 C106 330 110 345 114 370
    L116 410 L118 440 L120 462
    L132 460 L136 440 L140 410
    L142 362 C145 340 144 318 142 295
    L145 260 C148 248 145 235 140 225
    L148 200 L155 215 C156 225 160 240 162 250
    L164 260 L168 260 L170 250
    L168 235 C166 220 162 210 158 200
    L148 178 C152 172 154 162 152 152
    L150 128 C145 108 130 97 118 92
    L118 85 C118 78 115 73 112 70
    L115 64 C120 58 128 48 128 32
    C128 18 118 5 100 5 Z`;

  // Complete male silhouette — head to feet with arms, broader shoulders
  const maleOutline = `
    M100 5 C84 5 74 18 74 32 C74 48 82 58 87 64 L89 70
    C86 73 83 78 83 85 L83 92
    C68 97 50 110 46 132 L44 158
    C42 168 46 176 50 180
    L38 202 C34 212 30 222 28 238 L26 252 L28 262 L32 262 L34 252
    C36 242 40 228 44 218 L52 202
    L58 228 C53 238 50 250 53 262
    L56 298 C54 320 53 345 56 368
    L58 418 L62 445 L66 465 L80 468
    L82 445 L84 418 L86 378
    C92 352 96 335 100 322
    L100 316
    L100 322 C104 335 108 352 114 378
    L116 418 L118 445 L120 468
    L134 465 L138 445 L142 418
    L144 368 C147 345 146 320 144 298
    L147 262 C150 250 147 238 142 228
    L150 202 L156 218 C160 228 164 242 166 252
    L168 262 L172 262 L174 252
    L172 238 C170 222 166 212 162 202
    L152 180 C156 176 158 168 156 158
    L154 132 C150 110 132 97 117 92
    L117 85 C117 78 114 73 111 70
    L113 64 C118 58 126 48 126 32
    C126 18 116 5 100 5 Z`;

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
