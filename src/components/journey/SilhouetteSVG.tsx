// src/components/journey/SilhouetteSVG.tsx
import { useState } from 'react';

interface SilhouetteSVGProps {
  gender: 'her' | 'him';
  onSelectZone: (zone: string) => void;
}

interface ZoneArea {
  id: string;
  label: string;
  x: number;
  y: number;
  width: number;
  height: number;
  labelX: number;
  labelY: number;
}

const zones: ZoneArea[] = [
  { id: 'hair', label: 'Cheveux', x: 72, y: 4, width: 56, height: 30, labelX: 150, labelY: 20 },
  { id: 'eyes', label: 'Regard', x: 78, y: 34, width: 44, height: 18, labelX: 150, labelY: 44 },
  { id: 'lips', label: 'Lèvres', x: 84, y: 55, width: 32, height: 14, labelX: 150, labelY: 62 },
  { id: 'neck', label: 'Cou', x: 82, y: 72, width: 36, height: 22, labelX: 150, labelY: 83 },
  { id: 'chest', label: 'Poitrine', x: 55, y: 100, width: 90, height: 55, labelX: 165, labelY: 127 },
  { id: 'abdomen', label: 'Ventre', x: 60, y: 158, width: 80, height: 55, labelX: 165, labelY: 185 },
  { id: 'hips', label: 'Hanches', x: 50, y: 213, width: 100, height: 35, labelX: 165, labelY: 230 },
  { id: 'thighs', label: 'Cuisses', x: 55, y: 250, width: 90, height: 75, labelX: 165, labelY: 288 },
];

export default function SilhouetteSVG({ gender, onSelectZone }: SilhouetteSVGProps) {
  const [hoveredZone, setHoveredZone] = useState<string | null>(null);

  const outlinePath = gender === 'her'
    ? `M100 8 C80 8 72 20 72 35 C72 50 80 60 85 65 L88 70 C85 72 82 78 82 85
       L82 95 C70 100 55 110 50 130 L48 155 C46 165 50 175 55 180
       L60 215 C55 225 52 240 55 250 L58 290 C56 310 55 330 58 350
       L60 400 L62 430 L75 435 L80 350 L82 300 C90 275 95 260 100 250
       C105 260 110 275 118 300 L120 350 L125 435 L138 430 L140 400
       L142 350 C145 330 144 310 142 290 L145 250 C148 240 145 225 140 215
       L155 180 C160 175 154 165 152 155 L150 130 C145 110 130 100 118 95
       L118 85 C118 78 115 72 112 70 L115 65 C120 60 128 50 128 35
       C128 20 120 8 100 8 Z`
    : `M100 8 C82 8 74 20 74 35 C74 50 82 60 87 65 L89 70 C86 72 83 78 83 85
       L83 95 C68 100 52 115 48 135 L46 160 C44 170 48 178 52 182
       L60 218 C55 228 52 240 55 252 L58 290 C56 312 55 335 58 355
       L60 405 L62 435 L77 438 L80 355 L83 305 C92 278 96 262 100 252
       C104 262 108 278 117 305 L120 355 L123 438 L138 435 L140 405
       L142 355 C145 335 144 312 142 290 L145 252 C148 240 145 228 140 218
       L148 182 C152 178 156 170 154 160 L152 135 C148 115 132 100 117 95
       L117 85 C117 78 114 72 111 70 L113 65 C118 60 126 50 126 35
       C126 20 118 8 100 8 Z`;

  return (
    <svg viewBox="0 0 220 450" className="w-full max-w-xs mx-auto" fill="none">
      {/* Silhouette outline */}
      <path
        d={outlinePath}
        stroke="var(--gold)"
        strokeWidth="1"
        opacity="0.6"
        className="draw-line"
      />

      {/* Clickable zone overlays */}
      {zones.map((zone) => {
        const isHovered = hoveredZone === zone.id;
        return (
          <g key={zone.id}>
            {/* Hitbox */}
            <rect
              x={zone.x}
              y={zone.y}
              width={zone.width}
              height={zone.height}
              rx="4"
              fill={isHovered ? 'var(--gold)' : 'transparent'}
              fillOpacity={isHovered ? 0.15 : 0}
              stroke={isHovered ? 'var(--gold)' : 'transparent'}
              strokeWidth="0.5"
              className="cursor-pointer transition-all duration-300"
              onMouseEnter={() => setHoveredZone(zone.id)}
              onMouseLeave={() => setHoveredZone(null)}
              onClick={() => onSelectZone(zone.id)}
            />
            {/* Label line and text */}
            {isHovered && (
              <>
                <line
                  x1={zone.x + zone.width}
                  y1={zone.y + zone.height / 2}
                  x2={zone.labelX - 5}
                  y2={zone.labelY}
                  stroke="var(--gold)"
                  strokeWidth="0.5"
                  strokeDasharray="2 2"
                />
                <text
                  x={zone.labelX}
                  y={zone.labelY + 4}
                  fill="var(--gold)"
                  fontSize="10"
                  fontFamily="Inter, sans-serif"
                  letterSpacing="2"
                  className="uppercase"
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
