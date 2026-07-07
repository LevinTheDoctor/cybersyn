import { useState } from 'react';
import type { KeyboardEvent } from 'react';
import { VSM_EBENEN } from '../../data/system';

/**
 * Beers Viable System Model, interaktiv: links die operativen Einheiten
 * (S1) mit Koordination (S2), rechts der Management-Stapel (S3–S5),
 * dazu der rote algedonische Kanal, der S5 direkt erreicht.
 */
export function VsmDiagram() {
  const [aktiv, setAktiv] = useState<string>('s1');
  const ebene = VSM_EBENEN.find((e) => e.id === aktiv)!;

  function key(e: KeyboardEvent<SVGGElement>, id: string) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setAktiv(id);
    }
  }

  const boxen = [
    { id: 's5', y: 40 },
    { id: 's4', y: 116 },
    { id: 's3', y: 192 },
  ] as const;
  const kreise = [
    { cy: 170, label: 'Betrieb A' },
    { cy: 258, label: 'Betrieb B' },
    { cy: 346, label: 'Betrieb C' },
  ] as const;

  return (
    <div className="grid gap-4 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]">
      <svg
        viewBox="0 0 560 420"
        className="w-full"
        role="img"
        aria-label="Viable System Model mit den Systemen 1 bis 5"
      >
        {/* Verbindungen S1 → S3 */}
        {kreise.map((k) => (
          <line
            key={k.cy}
            x1={176}
            y1={k.cy}
            x2={310}
            y2={218}
            stroke="#8fc1b5"
            strokeWidth={1.5}
            opacity={0.5}
          />
        ))}
        {/* Vertikale Befehls-/Berichtsachse S3–S5 */}
        <line x1={400} y1={92} x2={400} y2={192} stroke="#efe7da" strokeWidth={1.5} opacity={0.4} />

        {/* Algedonischer Kanal: S1 direkt zu S5 */}
        <path
          d="M 140 380 L 60 380 L 60 66 L 310 66"
          fill="none"
          stroke="var(--color-algedonik)"
          strokeWidth={2}
          strokeDasharray="6 5"
          className="animate-flow"
        />
        <text x={66} y={230} fontSize={11} fill="var(--color-algedonik)" letterSpacing={1.5} className="font-mono uppercase" transform="rotate(-90 66 230)">
          algedonischer Kanal
        </text>

        {/* S1-Kreise */}
        {kreise.map((k) => {
          const istAktiv = aktiv === 's1';
          return (
            <g
              key={k.cy}
              role="button"
              tabIndex={0}
              aria-label="System 1, die Betriebe: Details anzeigen"
              onClick={() => setAktiv('s1')}
              onKeyDown={(e) => key(e, 's1')}
              className="cursor-pointer outline-none"
            >
              <circle
                cx={140}
                cy={k.cy}
                r={38}
                fill={istAktiv ? 'var(--color-signal)' : 'var(--color-panel)'}
                stroke={istAktiv ? 'var(--color-signal)' : '#8fc1b5'}
                strokeWidth={2}
              />
              <text x={140} y={k.cy - 2} fontSize={14} fontWeight={700} textAnchor="middle" fill={istAktiv ? '#26201b' : '#efe7da'}>
                S1
              </text>
              <text x={140} y={k.cy + 15} fontSize={9.5} textAnchor="middle" fill={istAktiv ? '#26201b' : '#8fc1b5'} className="font-mono">
                {k.label}
              </text>
            </g>
          );
        })}

        {/* S2-Koordination */}
        <g
          role="button"
          tabIndex={0}
          aria-label="System 2, Koordination: Details anzeigen"
          onClick={() => setAktiv('s2')}
          onKeyDown={(e) => key(e, 's2')}
          className="cursor-pointer outline-none"
        >
          <rect
            x={216}
            y={296}
            width={110}
            height={48}
            rx={8}
            fill={aktiv === 's2' ? 'var(--color-signal)' : 'var(--color-panel)'}
            stroke={aktiv === 's2' ? 'var(--color-signal)' : 'var(--color-bezel)'}
            strokeWidth={2}
          />
          <text x={271} y={316} fontSize={13} fontWeight={700} textAnchor="middle" fill={aktiv === 's2' ? '#26201b' : '#efe7da'}>
            S2
          </text>
          <text x={271} y={332} fontSize={9.5} textAnchor="middle" fill={aktiv === 's2' ? '#26201b' : '#8fc1b5'} className="font-mono">
            Koordination
          </text>
          {kreise.map((k) => (
            <line key={k.cy} x1={216} y1={320} x2={176} y2={k.cy} stroke="#d9a13b" strokeWidth={1.5} opacity={0.5} />
          ))}
        </g>

        {/* S3–S5-Stapel */}
        {boxen.map((b) => {
          const e = VSM_EBENEN.find((v) => v.id === b.id)!;
          const istAktiv = aktiv === b.id;
          return (
            <g
              key={b.id}
              role="button"
              tabIndex={0}
              aria-label={`${e.name}: Details anzeigen`}
              onClick={() => setAktiv(b.id)}
              onKeyDown={(ev) => key(ev, b.id)}
              className="cursor-pointer outline-none"
            >
              <rect
                x={310}
                y={b.y}
                width={180}
                height={52}
                rx={8}
                fill={istAktiv ? 'var(--color-signal)' : 'var(--color-panel)'}
                stroke={istAktiv ? 'var(--color-signal)' : 'var(--color-bezel)'}
                strokeWidth={2}
              />
              <text x={400} y={b.y + 22} fontSize={13} fontWeight={700} textAnchor="middle" fill={istAktiv ? '#26201b' : '#efe7da'}>
                {e.name.split(' — ')[0]}
              </text>
              <text x={400} y={b.y + 40} fontSize={10} textAnchor="middle" fill={istAktiv ? '#26201b' : '#8fc1b5'} className="font-mono">
                {e.name.split(' — ')[1]}
              </text>
            </g>
          );
        })}

        <text x={140} y={405} fontSize={10.5} fill="#8fc1b5" letterSpacing={1} className="font-mono" opacity={0.8}>
          REKURSION: JEDES S1 IST SELBST EIN GANZES VSM
        </text>
      </svg>

      <div className="rounded-xl bg-tinte/5 px-4 py-3 dark:bg-black/25">
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-signal">{ebene.name}</p>
        <p className="mt-1 font-mono text-xs text-phosphor">{ebene.chile}</p>
        <p className="mt-2 text-sm leading-relaxed text-tinte/80 dark:text-fiberglas/80">{ebene.beschreibung}</p>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {VSM_EBENEN.map((e) => (
            <button
              key={e.id}
              type="button"
              onClick={() => setAktiv(e.id)}
              aria-pressed={aktiv === e.id}
              className={`rounded border px-2 py-1 font-mono text-[11px] uppercase tracking-widest transition-colors ${
                aktiv === e.id
                  ? 'border-signal bg-signal text-walnuss'
                  : 'border-tinte/25 text-tinte/60 hover:border-signal hover:text-signal dark:border-fiberglas/25 dark:text-fiberglas/60'
              }`}
            >
              {e.id.toUpperCase()}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
