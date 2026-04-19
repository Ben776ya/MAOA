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

// Female — hourglass, hair on left, arms with hands, aligned to zone positions
const FEMALE_ZONE = `M100 8 C110 7,116 14,116 26 C116 40,114 50,112 58 L110 68 C112 72,118 78,126 84 C134 88,136 92,136 100 C137 108,135 118,134 128 C134 140,133 150,132 160 C131 170,130 180,128 192 C128 200,128 210,128 220 C128 228,128 234,126 238 C124 242,122 240,120 236 C120 232,120 228,121 220 C122 210,123 200,124 190 C125 178,125 168,124 158 C124 148,123 138,122 128 C121 118,120 108,120 100 C122 104,126 114,128 124 C130 134,130 142,126 152 C122 164,116 178,113 190 C112 200,112 208,114 216 C118 226,128 234,134 244 C138 252,137 260,134 270 C130 284,126 300,122 318 C118 336,116 352,114 368 C112 384,112 400,112 416 C112 432,112 444,114 452 C114 458,114 462,110 464 L108 466 C106 464,104 458,104 452 C104 444,104 432,104 416 C104 400,105 384,106 368 C107 352,108 336,108 318 C108 300,107 284,106 270 C105 260,104 252,103 246 C102 242,101 240,100 240 C99 240,98 242,97 246 C96 252,95 260,94 270 C93 284,92 300,92 318 C92 336,93 352,94 368 C95 384,96 400,96 416 C96 432,96 444,96 452 C96 458,94 464,92 466 L90 464 C86 462,86 458,86 452 C88 444,88 432,88 416 C88 400,88 384,86 368 C84 352,82 336,78 318 C74 300,70 284,66 270 C62 260,62 252,66 244 C72 234,82 226,86 216 C88 208,88 200,87 190 C84 178,78 164,74 152 C70 142,70 134,72 124 C74 114,78 108,80 100 C78 104,76 112,76 122 C76 134,75 148,74 160 C74 170,74 180,76 192 C77 202,78 212,78 222 C78 230,78 236,79 240 C80 244,78 242,76 240 C74 236,72 232,72 228 C72 222,72 216,72 210 C71 202,70 192,68 182 C66 172,65 162,64 150 C63 138,63 126,63 114 C62 102,62 94,63 88 C64 84,68 82,74 80 C66 76,66 64,66 50 C66 36,72 22,82 12 C88 7,94 7,100 8 Z`;

// Athletic male — broad shoulders, V-taper, arms with hands, aligned to zone positions
const MALE_ZONE = `M100 8 C110 7,117 14,117 26 C117 40,114 50,112 58 L111 68 C112 72,120 76,130 80 C140 84,148 88,148 96 C150 102,148 112,147 124 C146 136,145 148,144 160 C143 172,142 182,140 192 C138 202,137 212,136 222 C135 228,136 234,136 238 C136 242,137 246,135 248 C133 250,130 248,129 244 C128 240,128 236,129 230 C130 222,131 212,132 200 C133 188,133 176,133 164 C133 152,133 140,132 128 C131 116,130 106,128 98 C127 102,126 112,125 124 C124 138,122 154,120 170 C118 184,118 196,118 206 C118 216,120 224,122 232 C124 242,124 254,122 268 C120 286,118 306,116 324 C114 342,113 358,112 374 C111 390,110 406,110 422 C110 438,110 450,112 456 C114 460,116 464,116 466 L108 468 C106 466,104 462,104 456 C104 448,104 434,104 420 C104 404,106 388,106 372 C107 356,108 340,108 324 C108 306,107 286,106 268 C105 254,104 246,103 240 L100 238 L97 240 C96 246,95 254,94 268 C93 286,92 306,92 324 C92 340,93 356,94 372 C95 388,96 404,96 420 C96 434,96 448,96 456 C96 462,94 466,92 468 L84 466 C84 464,86 460,88 456 C90 450,90 438,90 422 C90 406,89 390,88 374 C87 358,86 342,84 324 C82 306,80 286,78 268 C76 254,76 242,78 232 C80 224,82 216,82 206 C82 196,82 184,80 170 C78 154,76 138,75 124 C74 112,73 102,72 98 C70 106,69 116,68 128 C67 140,67 152,67 164 C67 176,67 188,68 200 C69 212,70 222,70 230 C70 236,72 240,72 244 C71 248,67 250,65 248 C63 246,62 242,63 238 C64 234,64 228,64 222 C63 212,62 202,60 192 C58 182,57 172,56 160 C55 148,54 136,53 124 C52 112,50 102,52 96 C54 88,62 84,72 80 C82 76,88 72,89 68 L88 58 C86 50,83 40,83 26 C83 14,90 7,100 8 Z`;

export default function SilhouetteSVG({ gender, onSelectZone }: SilhouetteSVGProps) {
  const [hoveredZone, setHoveredZone] = useState<string | null>(null);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    setIsTouchDevice(window.matchMedia('(hover: none)').matches);
  }, []);

  const outlinePath = gender === 'her' ? FEMALE_ZONE : MALE_ZONE;

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

      {/* Body fill */}
      <path d={outlinePath} fill="url(#bodyFill)" stroke="none" />

      {/* Body outline */}
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
          </g>
        );
      })}
    </svg>
  );
}
