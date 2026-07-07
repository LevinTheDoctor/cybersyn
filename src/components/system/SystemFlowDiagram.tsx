import { useState } from 'react';
import type { KeyboardEvent } from 'react';
import { FLOW_KNOTEN } from '../../data/system';
import { QuellenZeile } from '../ui/QuelleRef';

const KNOTEN_BREITE = 132;
const ABSTAND = 158;
const START_X = 24;
const Y = 92;

/**
 * Der tägliche Signalweg der Produktionsdaten als animierte Schleife:
 * Betrieb → Telex → ECOM → Cyberstride → Opsroom → Entscheidung → Betrieb.
 * Klick auf einen Knoten zeigt Details mit Quellen.
 */
export function SystemFlowDiagram() {
  const [aktiv, setAktiv] = useState<string>(FLOW_KNOTEN[0].id);
  const knoten = FLOW_KNOTEN.find((k) => k.id === aktiv)!;

  function handleKey(e: KeyboardEvent<SVGGElement>, id: string) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setAktiv(id);
    }
  }

  return (
    <div className="space-y-4">
      <div className="overflow-x-auto">
        <svg
          viewBox="0 0 1000 250"
          className="min-w-[760px]"
          role="img"
          aria-label="Datenfluss von den Betrieben über Telex, ECOM und Cyberstride in den Opsroom und zurück"
        >
          {/* Vorwärts-Kanten */}
          {FLOW_KNOTEN.slice(0, -1).map((_, i) => {
            const x1 = START_X + i * ABSTAND + KNOTEN_BREITE;
            const x2 = START_X + (i + 1) * ABSTAND;
            return (
              <g key={i}>
                <line
                  x1={x1}
                  y1={Y + 32}
                  x2={x2}
                  y2={Y + 32}
                  stroke="var(--color-phosphor)"
                  strokeWidth={2.5}
                  strokeDasharray="8 6"
                  className="animate-flow"
                />
                <polygon
                  points={`${x2},${Y + 32} ${x2 - 9},${Y + 27} ${x2 - 9},${Y + 37}`}
                  fill="var(--color-phosphor)"
                />
              </g>
            );
          })}

          {/* Feedback-Kante zurück zum Betrieb */}
          <path
            d={`M ${START_X + 5 * ABSTAND + KNOTEN_BREITE / 2} ${Y + 64}
                L ${START_X + 5 * ABSTAND + KNOTEN_BREITE / 2} 210
                L ${START_X + KNOTEN_BREITE / 2} 210
                L ${START_X + KNOTEN_BREITE / 2} ${Y + 70}`}
            fill="none"
            stroke="var(--color-signal)"
            strokeWidth={2.5}
            strokeDasharray="8 6"
            className="animate-flow"
          />
          <polygon
            points={`${START_X + KNOTEN_BREITE / 2},${Y + 66} ${START_X + KNOTEN_BREITE / 2 - 5},${Y + 76} ${START_X + KNOTEN_BREITE / 2 + 5},${Y + 76}`}
            fill="var(--color-signal)"
          />
          <text
            x={500}
            y={230}
            fontSize={12}
            textAnchor="middle"
            fill="var(--color-signal)"
            letterSpacing={2}
            className="font-mono uppercase"
          >
            Feedback: Anweisungen, Ressourcen, Unterstützung
          </text>

          {/* Knoten */}
          {FLOW_KNOTEN.map((k, i) => {
            const x = START_X + i * ABSTAND;
            const istAktiv = k.id === aktiv;
            return (
              <g
                key={k.id}
                role="button"
                tabIndex={0}
                aria-label={`${k.name}: Details anzeigen`}
                onClick={() => setAktiv(k.id)}
                onKeyDown={(e) => handleKey(e, k.id)}
                className="cursor-pointer outline-none"
              >
                <rect
                  x={x}
                  y={Y}
                  width={KNOTEN_BREITE}
                  height={64}
                  rx={10}
                  fill={istAktiv ? 'var(--color-signal)' : 'var(--color-panel)'}
                  stroke={istAktiv ? 'var(--color-signal)' : 'var(--color-bezel)'}
                  strokeWidth={2}
                />
                <text
                  x={x + KNOTEN_BREITE / 2}
                  y={Y + 27}
                  fontSize={15}
                  fontWeight={700}
                  textAnchor="middle"
                  fill={istAktiv ? '#26201b' : '#efe7da'}
                >
                  {k.name}
                </text>
                <text
                  x={x + KNOTEN_BREITE / 2}
                  y={Y + 47}
                  fontSize={10.5}
                  textAnchor="middle"
                  fill={istAktiv ? '#26201b' : '#8fc1b5'}
                  letterSpacing={0.5}
                  className="font-mono"
                >
                  {k.untertitel}
                </text>
              </g>
            );
          })}
          <text x={START_X} y={40} fontSize={12} fill="var(--color-phosphor)" letterSpacing={2} className="font-mono uppercase" opacity={0.8}>
            Täglicher Datenfluss — ein Umlauf statt Monaten Bürokratie
          </text>
        </svg>
      </div>

      <div className="rounded-xl bg-tinte/5 px-4 py-3 dark:bg-black/25">
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-signal">{knoten.name} · {knoten.untertitel}</p>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-tinte/80 dark:text-fiberglas/80">
          {knoten.beschreibung}
        </p>
        <QuellenZeile quellenIds={knoten.quellenRefs} />
      </div>
    </div>
  );
}
