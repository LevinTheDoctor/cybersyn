import { useState } from 'react';
import { NETZ_KNOTEN } from '../../data/system';

/**
 * Stilisierte Karte des Telex-Netzes entlang Chiles (~5.152 km).
 * Der Streik-Modus zeigt, wie das Netz im Oktober 1972 zur
 * Krisenkoordination umfunktioniert wurde.
 */
export function ChileNetzMap() {
  const [streik, setStreik] = useState(false);

  const hub = NETZ_KNOTEN.find((k) => k.hub)!;
  const linienFarbe = streik ? 'var(--color-signal)' : 'var(--color-phosphor)';

  return (
    <div className="grid gap-4 sm:grid-cols-[minmax(0,240px)_minmax(0,1fr)]">
      <svg
        viewBox="0 0 260 840"
        className="mx-auto h-[480px] w-auto sm:h-[560px]"
        role="img"
        aria-label="Karte Chiles mit Telex-Knoten von Arica bis Punta Arenas"
      >
        {/* Stilisierte Landmasse: Spine als breiter Strich statt Polygon */}
        <path
          d="M 118 30
             C 100 150, 88 280, 92 400
             C 96 520, 100 600, 112 660
             C 124 720, 140 760, 158 790"
          fill="none"
          stroke="var(--color-bezel)"
          strokeWidth={52}
          strokeLinecap="round"
        />

        {/* Telex-Verbindungen zum Hub Santiago */}
        {NETZ_KNOTEN.filter((k) => !k.hub).map((k) => (
          <line
            key={k.id}
            x1={k.x}
            y1={k.y}
            x2={hub.x}
            y2={hub.y}
            stroke={linienFarbe}
            strokeWidth={streik ? 2.5 : 1.5}
            strokeDasharray="6 6"
            className="animate-flow"
            style={streik ? { animationDuration: '0.5s' } : undefined}
            opacity={0.8}
          />
        ))}

        {/* Knoten */}
        {NETZ_KNOTEN.map((k) => (
          <g key={k.id}>
            <circle
              cx={k.x}
              cy={k.y}
              r={k.hub ? 10 : 5.5}
              fill={k.hub ? 'var(--color-signal)' : linienFarbe}
              className={streik && !k.hub ? 'animate-blink' : undefined}
            />
            {k.hub && (
              <circle cx={k.x} cy={k.y} r={16} fill="none" stroke="var(--color-signal)" strokeWidth={1.5} opacity={0.5} />
            )}
            <text
              x={k.x + (k.hub ? 22 : 14)}
              y={k.y + 4}
              fontSize={13}
              fill="currentColor"
              className="font-mono text-tinte/70 dark:text-fiberglas/70"
              letterSpacing={0.5}
            >
              {k.name}
            </text>
          </g>
        ))}

        {/* Distanz-Klammer */}
        <line x1={232} y1={50} x2={232} y2={790} stroke="currentColor" strokeWidth={1} opacity={0.3} className="text-tinte dark:text-fiberglas" />
        <text x={244} y={430} fontSize={12} fill="currentColor" letterSpacing={2} className="font-mono text-tinte/60 dark:text-fiberglas/60" transform="rotate(90 244 430)">
          ≈ 5.152 KM
        </text>
      </svg>

      <div className="space-y-3 self-center">
        <button
          type="button"
          onClick={() => setStreik((s) => !s)}
          aria-pressed={streik}
          className={`rounded-lg border px-4 py-2 font-mono text-xs uppercase tracking-[0.15em] transition-colors ${
            streik
              ? 'border-algedonik bg-algedonik text-fiberglas'
              : 'border-signal text-signal hover:bg-signal hover:text-walnuss'
          }`}
        >
          {streik ? 'Streik beenden' : 'Oktoberstreik 1972 simulieren'}
        </button>

        {streik ? (
          <div className="space-y-2 rounded-xl border border-algedonik/40 bg-algedonik/10 px-4 py-3">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-algedonik">
              Krisenmodus · ≈ 2.000 Nachrichten / Tag
            </p>
            <p className="text-sm leading-relaxed text-tinte/80 dark:text-fiberglas/80">
              Oktober 1972: Tausende Lastwagenbesitzer streiken, um das Land lahmzulegen. Die
              Regierung funktioniert das Telex-Netz zur Krisenzentrale um — welche Straße ist frei,
              wo fehlt Treibstoff, welcher Betrieb braucht Rohstoffe? Das Netz hilft, die Versorgung
              aufrechtzuerhalten, und macht Cybersyn über Nacht politisch sichtbar.
            </p>
          </div>
        ) : (
          <p className="max-w-md text-sm leading-relaxed text-tinte/80 dark:text-fiberglas/80">
            Im Normalbetrieb melden die Betriebe einmal täglich ihre Kennzahlen über das
            Telex-Netz nach Santiago. Die Hardware: 400 eingelagerte Fernschreiber aus den
            1960ern — einfache Technik, die in Monaten statt Jahren einsatzbereit war.
          </p>
        )}
      </div>
    </div>
  );
}
