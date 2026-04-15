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
}

const zones: ZoneSpot[] = [
  { id: 'hair', label: 'Cheveux', cx: 100, cy: 19, r: 18, labelX: 150, labelY: 20 },
  { id: 'eyes', label: 'Regard', cx: 100, cy: 43, r: 12, labelX: 150, labelY: 44 },
  { id: 'lips', label: 'Lèvres', cx: 100, cy: 62, r: 10, labelX: 150, labelY: 62 },
  { id: 'neck', label: 'Cou', cx: 100, cy: 83, r: 12, labelX: 150, labelY: 83 },
  { id: 'chest', label: 'Poitrine', cx: 100, cy: 127, r: 28, labelX: 165, labelY: 127 },
  { id: 'abdomen', label: 'Ventre', cx: 100, cy: 185, r: 28, labelX: 165, labelY: 185 },
  { id: 'hips', label: 'Hanches', cx: 100, cy: 230, r: 22, labelX: 165, labelY: 230 },
  { id: 'thighs', label: 'Cuisses', cx: 100, cy: 288, r: 30, labelX: 165, labelY: 288 },
];

export default function SilhouetteSVG({ gender, onSelectZone }: SilhouetteSVGProps) {
  const [hoveredZone, setHoveredZone] = useState<string | null>(null);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    setIsTouchDevice(window.matchMedia('(hover: none)').matches);
  }, []);

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
      <defs>
        <radialGradient id="zoneGlow">
          <stop offset="0%" stopColor="var(--gold)" stopOpacity="0.4" />
          <stop offset="70%" stopColor="var(--gold)" stopOpacity="0.1" />
          <stop offset="100%" stopColor="var(--gold)" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="zoneGlowHover">
          <stop offset="0%" stopColor="var(--gold)" stopOpacity="0.6" />
          <stop offset="60%" stopColor="var(--gold)" stopOpacity="0.2" />
          <stop offset="100%" stopColor="var(--gold)" stopOpacity="0" />
        </radialGradient>
      </defs>

      <path
        d={outlinePath}
        stroke="var(--gold)"
        strokeWidth="1"
        opacity="0.6"
        className="draw-line"
      />

      {zones.map((zone) => {
        const isHovered = hoveredZone === zone.id;
        const showLabel = isHovered || isTouchDevice;
        return (
          <g key={zone.id}>
            <circle
              cx={zone.cx}
              cy={zone.cy}
              r={zone.r}
              fill={isHovered ? 'url(#zoneGlowHover)' : 'url(#zoneGlow)'}
              className={isHovered ? '' : 'zone-glow'}
              style={isHovered ? { opacity: 0.3 } : undefined}
              cursor="pointer"
              onMouseEnter={() => setHoveredZone(zone.id)}
              onMouseLeave={() => setHoveredZone(null)}
              onClick={() => onSelectZone(zone.id)}
            />
            {showLabel && (
              <>
                <line
                  x1={zone.cx + zone.r}
                  y1={zone.cy}
                  x2={zone.labelX - 5}
                  y2={zone.labelY}
                  stroke="var(--gold)"
                  strokeWidth="0.5"
                  strokeDasharray="2 2"
                  opacity={isTouchDevice && !isHovered ? 0.4 : 0.8}
                />
                <text
                  x={zone.labelX}
                  y={zone.labelY + 4}
                  fill="var(--gold)"
                  fontSize={isTouchDevice && !isHovered ? '8' : '10'}
                  fontFamily="Inter, sans-serif"
                  letterSpacing="2"
                  opacity={isTouchDevice && !isHovered ? 0.5 : 1}
                  style={{ textTransform: 'uppercase' }}
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
