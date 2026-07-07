import type { KeyboardEvent, ReactNode } from 'react';
import { OPSROOM_STATIONEN } from '../../data/opsroom';

interface OpsroomPanoramaProps {
  aktiveStation: string | null;
  onStationClick: (id: string) => void;
}

/**
 * Stilisierte Innenansicht des hexagonalen Opsroom (Blick von der Tür):
 * fünf sichtbare Wandsegmente + die sieben Sessel, alle als fokussierbare
 * Hotspots. Die Zeichnung folgt Fotos des Prototyps von 1972.
 */
export function OpsroomPanorama({ aktiveStation, onStationClick }: Readonly<OpsroomPanoramaProps>) {
  return (
    <svg
      viewBox="0 0 1000 520"
      role="img"
      aria-label="Innenansicht des Opsroom mit sechs anklickbaren Stationen"
      className="w-full select-none rounded-xl border border-tinte/15 dark:border-bezel"
    >
      <defs>
        <linearGradient id="teppich" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#8f441f" />
          <stop offset="1" stopColor="#b0562b" />
        </linearGradient>
        <linearGradient id="holz" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#57432f" />
          <stop offset="1" stopColor="#463424" />
        </linearGradient>
      </defs>

      {/* Decke */}
      <polygon points="0,0 1000,0 1000,30 880,52 650,70 350,70 120,52 0,30" fill="#1b1511" />
      {[240, 380, 500, 620, 760].map((x) => (
        <circle key={x} cx={x} cy={38} r={4} fill="#efe7da" opacity={0.55} />
      ))}
      <text x={16} y={20} fontSize={12} fill="#efe7da" opacity={0.5} className="font-mono uppercase" letterSpacing={3}>
        Opsroom · Santiago de Chile · 1972
      </text>

      {/* Wände (Holz) */}
      <polygon points="0,30 120,52 120,368 0,400" fill="url(#holz)" />
      <polygon points="120,52 350,70 350,340 120,368" fill="url(#holz)" />
      <polygon points="350,70 650,70 650,340 350,340" fill="#5a4636" />
      <polygon points="650,70 880,52 880,368 650,340" fill="url(#holz)" />
      <polygon points="880,52 1000,30 1000,400 880,368" fill="url(#holz)" />
      {/* Wandkanten */}
      {[
        '120,52 120,368',
        '350,70 350,340',
        '650,70 650,340',
        '880,52 880,368',
      ].map((p) => (
        <polyline key={p} points={p} stroke="#2b2118" strokeWidth={3} fill="none" />
      ))}

      {/* Boden (Teppich) */}
      <polygon points="0,400 120,368 350,340 650,340 880,368 1000,400 1000,520 0,520" fill="url(#teppich)" />

      {/* ── Station: Magnetwand (Wand ganz links) ── */}
      <Hotspot
        id="magnetwand"
        label="Magnetwand"
        aktiv={aktiveStation === 'magnetwand'}
        onActivate={onStationClick}
        outline="4,58 116,76 116,362 4,392"
        labelPos={[12, 386]}
      >
        <polygon points="12,84 108,98 108,330 12,352" fill="#6b5a44" />
        <line x1={30} y1={150} x2={80} y2={190} stroke="#efe7da" strokeWidth={1.5} opacity={0.5} />
        <line x1={80} y1={190} x2={45} y2={260} stroke="#efe7da" strokeWidth={1.5} opacity={0.5} />
        <circle cx={30} cy={150} r={9} fill="#d96c2c" />
        <rect x={71} y={181} width={18} height={18} fill="#efe7da" />
        <polygon points="45,250 55,270 35,270" fill="#8fc1b5" />
        <circle cx={75} cy={300} r={7} fill="#e23b2e" />
        <rect x={25} y={215} width={14} height={14} fill="#d9a13b" />
      </Hotspot>

      {/* ── Station: VSM-Wand (links der Mitte) ── */}
      <Hotspot
        id="vsm"
        label="VSM"
        aktiv={aktiveStation === 'vsm'}
        onActivate={onStationClick}
        outline="128,82 342,96 342,334 128,360"
        labelPos={[136, 352]}
      >
        <rect x={150} y={110} width={172} height={200} rx={8} fill="#2e2620" />
        {/* Beers Diagramm: Operationen (Kreise) ↔ Management (Quadrate) */}
        {[
          [190, 150, 250, 145],
          [190, 210, 250, 205],
          [190, 270, 250, 265],
        ].map(([cx, cy, rx, ry]) => (
          <g key={cy}>
            <line x1={cx} y1={cy} x2={rx + 12} y2={ry + 12} stroke="#8fc1b5" strokeWidth={1.5} opacity={0.7} />
            <circle cx={cx} cy={cy} r={16} fill="none" stroke="#efe7da" strokeWidth={2} />
            <rect x={rx} y={ry} width={24} height={24} fill="none" stroke="#d96c2c" strokeWidth={2} />
          </g>
        ))}
        <line x1={190} y1={166} x2={190} y2={194} stroke="#efe7da" strokeWidth={1.5} opacity={0.6} />
        <line x1={190} y1={226} x2={190} y2={254} stroke="#efe7da" strokeWidth={1.5} opacity={0.6} />
      </Hotspot>

      {/* ── Station: Datafeed (Hauptwand, Mitte) ── */}
      <Hotspot
        id="datafeed"
        label="Datafeed"
        aktiv={aktiveStation === 'datafeed'}
        onActivate={onStationClick}
        outline="356,76 644,76 644,334 356,334"
        labelPos={[364, 326]}
      >
        {/* Steuerbildschirm */}
        <rect x={395} y={92} width={210} height={36} rx={6} fill="#c96f35" />
        <rect x={402} y={98} width={196} height={24} rx={4} fill="#14100d" />
        {[412, 452, 492, 532, 572].map((x) => (
          <rect key={x} x={x} y={104} width={22} height={12} fill="#8fc1b5" opacity={0.6} />
        ))}
        {/* Vier Datafeed-Screens in Fiberglas-Gehäusen */}
        {(
          [
            [385, 145],
            [505, 145],
            [385, 243],
            [505, 243],
          ] as const
        ).map(([x, y], i) => (
          <g key={i}>
            <rect x={x} y={y} width={110} height={82} rx={12} fill="#c96f35" />
            <rect x={x + 8} y={y + 8} width={94} height={66} rx={6} fill="#14100d" />
            {i === 0 && (
              <g fill="#efe7da">
                <rect x={x + 18} y={y + 42} width={12} height={24} />
                <rect x={x + 38} y={y + 28} width={12} height={38} />
                <rect x={x + 58} y={y + 50} width={12} height={16} />
                <rect x={x + 78} y={y + 34} width={12} height={32} opacity={0.5} />
              </g>
            )}
            {i === 1 && (
              <g stroke="#8fc1b5" strokeWidth={2} fill="none">
                <rect x={x + 16} y={y + 20} width={20} height={14} />
                <rect x={x + 58} y={y + 20} width={20} height={14} />
                <rect x={x + 37} y={y + 48} width={20} height={14} />
                <line x1={x + 36} y1={y + 27} x2={x + 58} y2={y + 27} />
                <line x1={x + 47} y1={y + 34} x2={x + 47} y2={y + 48} />
              </g>
            )}
            {i === 2 && (
              <polyline
                points={`${x + 14},${y + 56} ${x + 34},${y + 40} ${x + 54},${y + 48} ${x + 74},${y + 24} ${x + 90},${y + 30}`}
                stroke="#d96c2c"
                strokeWidth={2.5}
                fill="none"
              />
            )}
            {i === 3 && (
              <g fill="#efe7da" opacity={0.8}>
                <polygon points={`${x + 20},${y + 58} ${x + 20},${y + 34} ${x + 34},${y + 42} ${x + 34},${y + 34} ${x + 48},${y + 42} ${x + 48},${y + 58}`} />
                <rect x={x + 52} y={y + 26} width={6} height={32} />
                <rect x={x + 64} y={y + 40} width={22} height={18} />
              </g>
            )}
          </g>
        ))}
      </Hotspot>

      {/* ── Station: Algedonische Alarme (rechts der Mitte) ── */}
      <Hotspot
        id="algedonik"
        label="Algedonik"
        aktiv={aktiveStation === 'algedonik'}
        onActivate={onStationClick}
        outline="658,82 872,96 872,360 658,334"
        labelPos={[666, 352]}
      >
        {[680, 780].map((x, panel) => (
          <g key={x}>
            <rect x={x} y={112} width={72} height={196} rx={8} fill="#2e2620" />
            {[142, 186, 230, 274].map((y, i) => (
              <circle
                key={y}
                cx={x + 36}
                cy={y}
                r={11}
                fill="#e23b2e"
                opacity={panel === 0 && i === 1 ? 1 : 0.25}
                className={panel === 0 && i === 1 ? 'animate-blink' : undefined}
              />
            ))}
          </g>
        ))}
      </Hotspot>

      {/* ── Station: Futuro / CHECO (Wand ganz rechts) ── */}
      <Hotspot
        id="futuro"
        label="Futuro"
        aktiv={aktiveStation === 'futuro'}
        onActivate={onStationClick}
        outline="884,58 996,76 996,392 884,362"
        labelPos={[890, 386]}
      >
        <polygon points="892,86 988,100 988,300 892,318" fill="#14100d" />
        <polyline
          points="900,270 920,240 938,252 958,205 978,215"
          stroke="#8fc1b5"
          strokeWidth={2.5}
          fill="none"
        />
        <polyline
          points="900,250 925,215 950,185 978,150"
          stroke="#d96c2c"
          strokeWidth={2}
          strokeDasharray="5 4"
          fill="none"
        />
      </Hotspot>

      {/* ── Station: Die sieben Sessel ── */}
      <Hotspot
        id="sessel"
        label="7 Sessel"
        aktiv={aktiveStation === 'sessel'}
        onActivate={onStationClick}
        outline="230,380 770,380 800,505 200,505"
        labelPos={[228, 502]}
      >
        {(
          [
            [280, 428, 0.9],
            [352, 450, 1.0],
            [428, 464, 1.1],
            [505, 468, 1.15],
            [582, 462, 1.1],
            [655, 446, 1.0],
            [725, 424, 0.9],
          ] as const
        ).map(([x, y, s]) => (
          <g key={x} transform={`translate(${x}, ${y}) scale(${s})`}>
            <ellipse cx={0} cy={26} rx={13} ry={3.5} fill="#1b1511" opacity={0.35} />
            <path
              d="M -17 -12 Q -17 -26 0 -26 Q 17 -26 17 -12 L 13 2 Q 0 8 -13 2 Z"
              fill="#efe7da"
            />
            <rect x={-2.5} y={4} width={5} height={16} fill="#e4dac9" />
            <ellipse cx={0} cy={22} rx={11} ry={3.5} fill="#e4dac9" />
            {/* Tastenfeld in der Armlehne */}
            <rect x={6} y={-14} width={7} height={5} rx={1} fill="#d96c2c" />
          </g>
        ))}
      </Hotspot>
    </svg>
  );
}

interface HotspotProps {
  id: string;
  label: string;
  aktiv: boolean;
  onActivate: (id: string) => void;
  /** Punkte des Overlay-Polygons (Klick-/Fokusfläche) */
  outline: string;
  labelPos: [number, number];
  children: ReactNode;
}

function Hotspot({ id, label, aktiv, onActivate, outline, labelPos, children }: Readonly<HotspotProps>) {
  const station = OPSROOM_STATIONEN.find((s) => s.id === id);

  function handleKey(e: KeyboardEvent<SVGGElement>) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onActivate(id);
    }
  }

  return (
    <g
      role="button"
      tabIndex={0}
      aria-label={`${station?.name ?? label} ansehen`}
      onClick={() => onActivate(id)}
      onKeyDown={handleKey}
      className="group cursor-pointer outline-none"
    >
      {children}
      <polygon
        points={outline}
        fill="var(--color-signal)"
        fillOpacity={0.12}
        stroke="var(--color-signal)"
        strokeWidth={2}
        className={`transition-opacity ${aktiv ? 'opacity-100' : 'opacity-0 group-hover:opacity-100 group-focus:opacity-100'}`}
      />
      <text
        x={labelPos[0]}
        y={labelPos[1]}
        fontSize={13}
        fill="#efe7da"
        letterSpacing={2.5}
        className="font-mono uppercase"
        opacity={0.75}
      >
        {label}
      </text>
    </g>
  );
}
