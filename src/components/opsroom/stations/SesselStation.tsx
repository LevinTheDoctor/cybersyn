import { useState } from 'react';

const DETAILS = [
  {
    id: 'tasten',
    nr: 1,
    titel: 'Tastenfeld',
    text: 'Große geometrische Tasten in der Armlehne steuerten die Wandscreens. Bewusst keine Tastatur: Das System sollte ohne Schreibmaschinen-Ausbildung bedienbar sein — und keine Trennung zwischen „Bedienern“ und „Entscheidern“ erzeugen.',
  },
  {
    id: 'ablage',
    nr: 2,
    titel: 'Aschenbecher & Glas-Ablage',
    text: 'In der anderen Armlehne: Aschenbecher und eine Mulde für das Whiskyglas. Der Raum war als Ort für lange Diskussionen entworfen — Kybernetik traf auf chilenische Gesprächskultur.',
  },
  {
    id: 'fuss',
    nr: 3,
    titel: 'Drehfuß',
    text: 'Die Sessel waren drehbar und im Kreis angeordnet — niemand saß am Kopfende. Sieben Plätze, weil Beer kleine Gruppen für entscheidungsfähiger hielt als große Gremien.',
  },
] as const;

/** Der Tulip-Sessel im Detail: drei anklickbare Punkte erklären das Design */
export function SesselStation() {
  const [aktiv, setAktiv] = useState<(typeof DETAILS)[number]['id']>('tasten');
  const detail = DETAILS.find((d) => d.id === aktiv)!;

  return (
    <div className="grid gap-4 sm:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
      <div className="rounded-2xl bg-[#2e2620] p-4">
        <svg viewBox="0 0 300 320" className="mx-auto w-full max-w-[260px]" role="img" aria-label="Fiberglas-Sessel des Opsroom">
          <ellipse cx={150} cy={296} rx={70} ry={12} fill="#1b1511" opacity={0.5} />
          {/* Schale */}
          <path
            d="M 60 110 Q 60 52 150 52 Q 240 52 240 110 L 226 180 Q 150 214 74 180 Z"
            fill="#efe7da"
          />
          {/* Armlehnen */}
          <path d="M 60 110 Q 46 150 74 180 L 92 168 Q 74 144 82 116 Z" fill="#e4dac9" />
          <path d="M 240 110 Q 254 150 226 180 L 208 168 Q 226 144 218 116 Z" fill="#e4dac9" />
          {/* Tastenfeld in der rechten Armlehne */}
          <g>
            <rect x={210} y={122} width={26} height={40} rx={5} fill="#c96f35" />
            <rect x={215} y={128} width={7} height={7} fill="#2e2620" />
            <circle cx={228} cy={131} r={4} fill="#2e2620" />
            <rect x={215} y={142} width={7} height={7} fill="#e23b2e" />
            <polygon points="228,141 233,149 223,149" fill="#2e2620" />
          </g>
          {/* Aschenbecher links */}
          <ellipse cx={78} cy={140} rx={9} ry={5} fill="#2e2620" />
          {/* Fuß */}
          <rect x={143} y={210} width={14} height={60} fill="#e4dac9" />
          <ellipse cx={150} cy={280} rx={52} ry={14} fill="#efe7da" />

          {DETAILS.map((d) => {
            const pos: Record<string, [number, number]> = {
              tasten: [223, 108],
              ablage: [70, 122],
              fuss: [150, 246],
            };
            const [cx, cy] = pos[d.id];
            const istAktiv = aktiv === d.id;
            return (
              <g
                key={d.id}
                role="button"
                tabIndex={0}
                aria-label={`${d.titel} erklären`}
                onClick={() => setAktiv(d.id)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setAktiv(d.id);
                  }
                }}
                className="cursor-pointer outline-none"
              >
                <circle
                  cx={cx}
                  cy={cy}
                  r={13}
                  fill={istAktiv ? 'var(--color-signal)' : '#2e2620'}
                  stroke="var(--color-signal)"
                  strokeWidth={2}
                />
                <text
                  x={cx}
                  y={cy + 4.5}
                  fontSize={13}
                  textAnchor="middle"
                  fill={istAktiv ? '#26201b' : '#efe7da'}
                  className="font-mono"
                >
                  {d.nr}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      <div className="space-y-3">
        <div className="flex flex-wrap gap-2">
          {DETAILS.map((d) => (
            <button
              key={d.id}
              type="button"
              onClick={() => setAktiv(d.id)}
              aria-pressed={aktiv === d.id}
              className={`rounded-lg border px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.15em] transition-colors ${
                aktiv === d.id
                  ? 'border-signal bg-signal text-walnuss'
                  : 'border-tinte/25 text-tinte/60 hover:border-signal hover:text-signal dark:border-fiberglas/25 dark:text-fiberglas/60'
              }`}
            >
              {d.nr} · {d.titel}
            </button>
          ))}
        </div>
        <p className="text-sm leading-relaxed text-tinte/80 dark:text-fiberglas/80">{detail.text}</p>
      </div>
    </div>
  );
}
