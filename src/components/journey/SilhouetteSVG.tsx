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
  { id: 'hair', label: 'Cheveux', cx: 100, cy: 22, r: 12, labelX: 155, labelY: 22, side: 'right' },
  { id: 'eyes', label: 'Regard', cx: 100, cy: 42, r: 8, labelX: 40, labelY: 42, side: 'left' },
  { id: 'nose', label: 'Nez', cx: 100, cy: 54, r: 7, labelX: 155, labelY: 54, side: 'right' },
  { id: 'lips', label: 'Lèvres', cx: 100, cy: 65, r: 7, labelX: 40, labelY: 65, side: 'left' },
  { id: 'neck', label: 'Cou', cx: 100, cy: 82, r: 8, labelX: 155, labelY: 82, side: 'right' },
  { id: 'chest', label: 'Poitrine', cx: 100, cy: 130, r: 18, labelX: 170, labelY: 130, side: 'right' },
  { id: 'abdomen', label: 'Ventre', cx: 100, cy: 195, r: 16, labelX: 170, labelY: 195, side: 'right' },
  { id: 'hips', label: 'Hanches', cx: 100, cy: 245, r: 15, labelX: 170, labelY: 245, side: 'right' },
  { id: 'thighs', label: 'Cuisses', cx: 100, cy: 320, r: 18, labelX: 170, labelY: 320, side: 'right' },
];

// Traced from reference — female with hair, arms, hands (scaled to 220x480 viewBox)
const FEMALE_ZONE = `M95.0 19.2 C91.1,20.2 87.1,22.2 83.9,25.2 C80.7,28.2 78.0,31.1 75.8,37.3 C73.6,43.5 73.1,55.0 70.8,62.6 C68.4,70.2 62.2,80.9 61.7,82.7 C61.2,84.5 66.5,74.4 67.7,73.6 C68.9,72.8 69.7,73.2 68.7,77.7 C67.7,82.2 64.4,95.2 61.7,100.9 C59.0,106.6 54.3,101.9 52.6,112.0 C50.9,122.1 52.8,149.3 51.6,161.4 C50.4,173.5 47.3,173.4 45.6,184.5 C43.9,195.6 43.4,215.3 41.5,227.9 C39.6,240.5 35.3,253.5 34.5,260.2 C33.7,266.9 35.0,265.8 36.5,268.2 C38.0,270.6 41.3,273.1 43.5,274.3 C45.7,275.5 49.2,276.2 49.6,275.3 C50.0,274.4 46.1,276.3 45.6,269.2 C45.1,262.1 43.6,247.0 46.6,232.9 C49.6,218.8 60.5,197.6 63.7,184.5 C66.9,171.4 64.9,159.8 65.7,154.3 C66.5,148.8 67.4,146.6 68.7,151.3 C70.0,156.0 75.0,172.2 73.8,182.5 C72.6,192.8 64.6,201.5 61.7,212.8 C58.8,224.1 57.1,240.7 56.6,250.1 C56.1,259.5 56.2,257.3 58.7,269.2 C61.2,281.1 69.6,303.9 71.8,321.7 C74.0,339.5 69.8,359.0 71.8,376.1 C73.8,393.2 81.9,413.6 83.9,424.5 C85.9,435.4 85.2,436.0 83.9,441.6 C82.6,447.2 74.1,454.6 75.8,457.8 C77.5,461.0 90.6,461.1 94.0,460.8 C97.4,460.5 96.0,474.3 96.0,455.8 C96.0,437.3 93.8,370.1 94.0,349.9 C94.2,329.7 96.5,350.4 97.0,334.8 C97.5,319.2 96.0,269.4 97.0,256.1 C98.0,242.8 101.7,254.9 103.0,255.1 C104.3,255.3 104.8,243.7 105.0,257.1 C105.2,270.6 103.6,320.0 104.0,335.8 C104.4,351.6 107.3,331.6 107.1,351.9 C106.9,372.2 103.4,439.6 103.0,457.8 C102.6,476.0 103.0,460.3 105.0,460.8 C107.0,461.3 112.1,461.5 115.1,460.8 C118.1,460.1 123.2,460.2 123.2,456.8 C123.2,453.4 116.4,445.5 115.1,440.6 C113.8,435.7 112.9,438.1 115.1,427.5 C117.3,416.9 125.8,394.9 128.2,377.1 C130.5,359.3 126.5,340.5 129.2,320.7 C131.9,300.9 141.9,272.2 144.4,258.1 C146.9,244.0 145.1,243.6 144.4,236.0 C143.7,228.4 143.0,221.7 140.3,212.8 C137.6,203.9 129.2,192.9 128.2,182.5 C127.2,172.1 132.6,150.3 134.3,150.3 C136.0,150.3 135.0,168.6 138.3,182.5 C141.6,196.4 152.0,224.1 154.4,234.0 C156.8,243.9 152.4,236.3 152.4,242.0 C152.4,247.7 154.9,262.8 154.4,268.2 C153.9,273.6 149.4,273.3 149.4,274.3 C149.4,275.3 152.2,275.3 154.4,274.3 C156.6,273.3 160.6,271.6 162.5,268.2 C164.4,264.8 166.0,260.6 165.5,254.1 C165.0,247.6 160.8,239.5 159.5,228.9 C158.2,218.3 159.0,202.0 157.5,190.6 C156.0,179.2 151.8,173.7 150.4,160.4 C149.0,147.1 151.2,121.0 149.4,110.9 C147.6,100.8 142.0,106.1 139.3,99.9 C136.6,93.7 133.1,76.1 133.3,73.6 C133.5,71.1 140.6,86.2 140.3,84.7 C140.0,83.2 134.0,73.0 131.3,64.6 C128.6,56.2 127.1,41.4 124.2,34.3 C121.3,27.2 117.0,24.7 114.1,22.2 C111.2,19.7 110.3,19.7 107.1,19.2 C103.9,18.7 98.9,18.2 95.0,19.2 Z`;

// Traced from reference — athletic male, broad shoulders, arms (scaled to 220x480 viewBox)
const MALE_ZONE = `M96.5 19.2 C92.2,19.7 88.2,22.0 85.6,25.1 C83.0,28.2 81.2,34.0 80.7,38.0 C80.2,42.0 82.9,45.9 82.7,48.9 C82.5,51.9 78.9,52.0 79.7,55.8 C80.5,59.6 86.4,66.9 87.6,71.7 C88.8,76.5 90.2,80.2 86.6,84.5 C83.0,88.8 72.4,94.1 65.8,97.4 C59.2,100.7 51.3,101.3 47.0,104.4 C42.7,107.5 41.2,111.2 40.1,116.2 C39.0,121.2 40.9,128.8 40.1,134.1 C39.3,139.4 35.9,142.8 35.1,147.9 C34.3,153.0 36.2,157.1 35.1,164.7 C34.0,172.3 29.4,177.3 28.2,193.5 C27.0,209.7 27.0,248.4 28.2,261.8 C29.4,275.2 32.0,271.1 35.1,273.7 C38.2,276.3 46.7,279.4 47.0,277.6 C47.3,275.8 38.2,266.1 37.1,262.8 C36.0,259.5 39.1,257.3 40.1,257.8 C41.1,258.3 42.0,264.0 43.1,265.7 C44.2,267.3 46.7,270.5 47.0,267.7 C47.3,264.9 46.3,253.5 45.0,248.9 C43.7,244.3 40.1,242.6 39.1,240.0 C38.1,237.4 37.4,239.4 39.1,233.1 C40.8,226.8 47.0,211.3 49.0,202.4 C51.0,193.5 49.5,187.7 51.0,179.6 C52.5,171.5 55.6,156.4 57.9,153.9 C60.2,151.4 63.7,158.4 64.9,164.7 C66.1,171.0 64.4,185.7 64.9,191.5 C65.4,197.3 68.3,195.0 67.8,199.4 C67.3,203.8 63.9,207.5 61.9,218.2 C59.9,228.9 56.7,250.9 55.9,263.8 C55.1,276.7 55.9,286.5 56.9,295.4 C57.9,304.3 61.1,309.1 61.9,317.2 C62.7,325.3 62.6,334.4 61.9,344.0 C61.2,353.6 57.2,361.2 57.9,374.7 C58.6,388.2 65.3,414.0 65.8,425.2 C66.3,436.4 63.4,437.7 60.9,442.0 C58.4,446.3 52.8,448.6 51.0,450.9 C49.2,453.2 49.7,454.5 50.0,455.8 C50.3,457.1 50.7,458.0 53.0,458.8 C55.3,459.6 59.4,462.6 63.9,460.8 C68.4,459.0 77.2,457.3 79.7,447.9 C82.2,438.5 77.7,416.4 78.7,404.4 C79.7,392.3 84.8,385.2 85.6,375.6 C86.4,366.0 83.0,354.5 83.7,346.9 C84.4,339.3 88.3,337.0 89.6,330.1 C90.9,323.2 89.4,316.0 91.6,305.3 C93.8,294.6 99.0,265.8 102.5,265.7 C106.0,265.5 110.3,293.5 112.4,304.4 C114.5,315.3 113.8,323.8 115.3,331.1 C116.8,338.4 120.5,339.5 121.3,347.9 C122.1,356.3 119.3,371.2 120.3,381.6 C121.3,392.0 126.4,399.4 127.2,410.3 C128.0,421.2 123.6,438.6 125.2,446.9 C126.8,455.2 134.4,457.5 137.1,459.8 C139.8,462.1 138.1,461.5 141.1,460.8 C144.1,460.1 154.5,458.9 155.0,455.8 C155.5,452.7 146.8,447.1 144.1,442.0 C141.4,436.9 138.8,435.3 139.1,425.2 C139.4,415.1 145.5,399.9 146.0,381.6 C146.5,363.3 142.2,327.5 142.1,315.3 C142.0,303.1 144.1,314.4 145.1,308.3 C146.1,302.2 147.8,289.0 148.0,278.6 C148.2,268.2 148.0,258.6 146.0,245.9 C144.0,233.2 137.6,214.8 136.1,202.4 C134.6,190.0 136.1,179.1 137.1,171.7 C138.1,164.3 140.6,160.3 142.1,157.8 C143.6,155.3 144.5,153.8 146.0,156.8 C147.5,159.8 149.8,168.2 151.0,175.6 C152.2,183.0 151.4,192.0 153.0,201.4 C154.6,210.8 160.7,224.5 160.9,232.1 C161.1,239.7 155.6,241.3 154.0,246.9 C152.4,252.5 150.8,262.7 151.0,265.7 C151.2,268.7 153.8,266.4 155.0,264.8 C156.2,263.2 156.9,256.5 157.9,255.8 C158.9,255.1 161.9,257.3 160.9,260.8 C159.9,264.3 151.3,274.8 152.0,276.6 C152.7,278.4 161.8,274.3 164.9,271.7 C168.0,269.1 169.6,276.2 170.8,260.8 C172.0,245.4 172.3,195.1 171.8,179.6 C171.3,164.1 168.6,173.5 167.8,167.7 C167.0,161.9 167.8,150.8 166.8,144.9 C165.8,139.0 162.9,137.5 161.9,132.1 C160.9,126.7 162.4,117.2 160.9,112.3 C159.4,107.4 156.5,104.7 153.0,102.4 C149.5,100.1 146.4,101.5 140.1,98.4 C133.8,95.3 119.3,89.2 115.3,83.6 C111.3,78.0 115.1,69.2 116.3,64.7 C117.5,60.2 121.8,59.4 122.3,56.8 C122.8,54.2 119.6,52.8 119.3,48.9 C119.0,45.0 121.6,37.6 120.3,33.1 C119.0,28.6 115.4,24.5 111.4,22.2 C107.4,19.9 100.8,18.7 96.5,19.2 Z`;

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
