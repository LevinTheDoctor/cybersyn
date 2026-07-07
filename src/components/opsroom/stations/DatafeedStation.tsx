import { useState } from 'react';

/**
 * Simulation der Datafeed-Wand: Vier nachempfundene „Dias“ (handgezeichnet
 * und projiziert, wie 1972) — umgeschaltet mit den großen geometrischen
 * Tasten aus der Sessel-Armlehne.
 */

const DIAS = [
  { id: 0, titel: 'DIA 01 · PRODUKTIONSKAPAZITAET' },
  { id: 1, titel: 'DIA 02 · FLUSSDIAGRAMM VERSTAATLICHTER BETRIEB' },
  { id: 2, titel: 'DIA 03 · FABRIK (FOTO-DIA)' },
  { id: 3, titel: 'DIA 04 · CYBERSTRIDE-TREND MIT ABWEICHUNG' },
] as const;

export function DatafeedStation() {
  const [dia, setDia] = useState(0);

  return (
    <div className="space-y-4">
      {/* Screen im Fiberglas-Gehäuse */}
      <div className="rounded-2xl bg-[#c96f35] p-3 shadow-inner">
        <div className="overflow-hidden rounded-lg bg-[#14100d]">
          <p className="border-b border-fiberglas/15 px-4 py-2 font-mono text-[11px] uppercase tracking-[0.2em] text-fiberglas/60">
            {DIAS[dia].titel}
          </p>
          <svg viewBox="0 0 460 240" className="w-full" role="img" aria-label={DIAS[dia].titel}>
            {dia === 0 && (
              <g className="font-mono">
                {(
                  [
                    ['KUPFER', 150, 105],
                    ['TEXTIL', 95, 150],
                    ['ZEMENT', 120, 130],
                    ['NAHRUNG', 80, 165],
                  ] as const
                ).map(([name, ist, potenzial], i) => {
                  const y = 40 + i * 46;
                  return (
                    <g key={name}>
                      <text x={20} y={y + 14} fontSize={12} fill="#efe7da" letterSpacing={1.5}>
                        {name}
                      </text>
                      <rect x={120} y={y} width={potenzial * 1.7} height={18} fill="none" stroke="#efe7da" strokeWidth={1.5} strokeDasharray="4 3" />
                      <rect x={120} y={y} width={ist * 1.7} height={18} fill="#d96c2c" />
                    </g>
                  );
                })}
                <text x={120} y={30} fontSize={10} fill="#d96c2c" letterSpacing={1.5}>■ IST</text>
                <text x={175} y={30} fontSize={10} fill="#efe7da" letterSpacing={1.5}>▢ POTENZIAL (OHNE EINHEIT, WIE 1972)</text>
              </g>
            )}
            {dia === 1 && (
              <g className="font-mono" fontSize={11}>
                {(
                  [
                    ['ROHSTOFFE', 24, 100],
                    ['FERTIGUNG', 144, 100],
                    ['LAGER', 264, 100],
                    ['VERTEILUNG', 360, 100],
                  ] as const
                ).map(([name, x, y]) => (
                  <g key={name}>
                    <rect x={x} y={y} width={86} height={40} fill="none" stroke="#8fc1b5" strokeWidth={2} />
                    <text x={x + 43} y={y + 24} fill="#efe7da" textAnchor="middle" letterSpacing={1}>
                      {name}
                    </text>
                  </g>
                ))}
                {[110, 230, 350].map((x) => (
                  <g key={x} stroke="#efe7da" strokeWidth={2}>
                    <line x1={x} y1={120} x2={x + 32} y2={120} />
                    <polygon points={`${x + 32},120 ${x + 24},115 ${x + 24},125`} fill="#efe7da" />
                  </g>
                ))}
                <rect x={144} y={30} width={86} height={32} fill="none" stroke="#d96c2c" strokeWidth={2} />
                <text x={187} y={50} fill="#d96c2c" textAnchor="middle" letterSpacing={1}>ENERGIE</text>
                <line x1={187} y1={62} x2={187} y2={98} stroke="#d96c2c" strokeWidth={2} strokeDasharray="4 3" />
                <rect x={24} y={180} width={120} height={32} fill="none" stroke="#d96c2c" strokeWidth={2} />
                <text x={84} y={200} fill="#d96c2c" textAnchor="middle" letterSpacing={1}>ARBEITSKRAFT</text>
                <line x1={144} y1={196} x2={187} y2={142} stroke="#d96c2c" strokeWidth={2} strokeDasharray="4 3" />
              </g>
            )}
            {dia === 2 && (
              <g>
                <rect x={0} y={0} width={460} height={240} fill="#1d1712" />
                {/* Fabrik-Piktogramm im Stil der INTEC-Grafiken */}
                <polygon points="90,180 90,110 150,140 150,110 210,140 210,110 270,140 270,180" fill="#efe7da" />
                <rect x={280} y={80} width={22} height={100} fill="#efe7da" />
                <circle cx={310} cy={62} r={10} fill="none" stroke="#efe7da" strokeWidth={2} opacity={0.7} />
                <circle cx={326} cy={46} r={13} fill="none" stroke="#efe7da" strokeWidth={2} opacity={0.45} />
                <rect x={90} y={180} width={240} height={10} fill="#d96c2c" />
                <text x={90} y={215} fontSize={12} fill="#efe7da" letterSpacing={2} className="font-mono">
                  TEXTILWERK EX-YARUR, SANTIAGO
                </text>
              </g>
            )}
            {dia === 3 && (
              <g className="font-mono">
                <line x1={30} y1={200} x2={430} y2={200} stroke="#efe7da" strokeWidth={1.5} />
                <line x1={30} y1={200} x2={30} y2={30} stroke="#efe7da" strokeWidth={1.5} />
                <polyline
                  points="30,140 80,132 130,138 180,125 230,130 280,118 330,124 380,168"
                  stroke="#8fc1b5"
                  strokeWidth={2.5}
                  fill="none"
                />
                <circle cx={380} cy={168} r={7} fill="#e23b2e" />
                <text x={300} y={188} fontSize={11} fill="#e23b2e" letterSpacing={1}>
                  ABWEICHUNG ERKANNT
                </text>
                <text x={40} y={50} fontSize={10} fill="#efe7da" opacity={0.7} letterSpacing={1}>
                  PRODUKTION / TAG (BAYES-FILTER, CYBERSTRIDE)
                </text>
              </g>
            )}
          </svg>
        </div>
      </div>

      {/* Armlehnen-Tasten */}
      <div className="rounded-2xl bg-tinte/5 px-4 py-3 dark:bg-black/25">
        <p className="mb-2 font-mono text-[11px] uppercase tracking-[0.2em] text-tinte/50 dark:text-fiberglas/50">
          Armlehnen-Tasten — Dia wählen
        </p>
        <div className="flex items-center gap-3">
          {DIAS.map((d, i) => (
            <button
              key={d.id}
              type="button"
              aria-label={d.titel}
              aria-pressed={dia === i}
              onClick={() => setDia(i)}
              className={`flex h-12 w-14 items-center justify-center rounded-lg border-b-4 transition-all active:translate-y-0.5 active:border-b-2 ${
                dia === i
                  ? 'border-signal/50 bg-signal text-walnuss'
                  : 'border-tinte/30 bg-fiberglas text-tinte hover:bg-fiberglas/80 dark:border-black/50'
              }`}
            >
              {i === 0 && <span className="block h-4 w-4 bg-current" aria-hidden="true" />}
              {i === 1 && <span className="block h-4 w-4 rounded-full bg-current" aria-hidden="true" />}
              {i === 2 && (
                <span
                  className="block border-b-[14px] border-l-8 border-r-8 border-b-current border-l-transparent border-r-transparent"
                  aria-hidden="true"
                />
              )}
              {i === 3 && <span className="block h-2 w-6 bg-current" aria-hidden="true" />}
            </button>
          ))}
        </div>
        <p className="mt-3 text-sm text-tinte/70 dark:text-fiberglas/70">
          Große geometrische Tasten statt Tastatur: Jede Form stand für eine Bildschirm-Funktion,
          bedienbar ohne Schreibmaschinen-Ausbildung.
        </p>
      </div>
    </div>
  );
}
