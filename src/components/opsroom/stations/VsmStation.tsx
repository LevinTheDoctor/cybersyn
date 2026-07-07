import { ArrowRight } from 'lucide-react';

interface VsmStationProps {
  onGeheZuSystem?: () => void;
}

/** Mini-Ansicht der VSM-Wand mit Verweis auf das volle Diagramm im System-Tab */
export function VsmStation({ onGeheZuSystem }: Readonly<VsmStationProps>) {
  return (
    <div className="space-y-4">
      <div className="rounded-2xl bg-[#2e2620] p-6">
        <svg viewBox="0 0 420 200" className="mx-auto w-full max-w-md" role="img" aria-label="Vereinfachtes Viable System Model">
          {(
            [
              ['S5 POLITIK', 150],
              ['S4 ZUKUNFT', 100],
              ['S3 STEUERUNG', 50],
            ] as const
          ).map(([name, y]) => (
            <g key={name} className="font-mono">
              <rect x={230} y={200 - y - 40} width={150} height={32} fill="none" stroke="#d96c2c" strokeWidth={2} />
              <text x={305} y={200 - y - 19} fontSize={12} fill="#efe7da" textAnchor="middle" letterSpacing={1.5}>
                {name}
              </text>
            </g>
          ))}
          {(
            [
              ['S1', 60],
              ['S1', 140],
            ] as const
          ).map(([name, cy], i) => (
            <g key={i} className="font-mono">
              <circle cx={70} cy={cy} r={30} fill="none" stroke="#8fc1b5" strokeWidth={2} />
              <text x={70} y={cy + 4} fontSize={13} fill="#efe7da" textAnchor="middle" letterSpacing={1}>
                {name}
              </text>
              <line x1={100} y1={cy} x2={230} y2={160 - 24} stroke="#efe7da" strokeWidth={1.5} opacity={0.4} />
            </g>
          ))}
          <text x={40} y={190} fontSize={10} fill="#8fc1b5" letterSpacing={1.5} className="font-mono">
            S1 = BETRIEBE (OPERATIV)
          </text>
        </svg>
      </div>
      <p className="text-sm text-tinte/70 dark:text-fiberglas/70">
        Die Wand zeigte das Modell als ständigen Referenzpunkt: Wer hier saß, sollte in Systemebenen
        denken — nicht in Befehlsketten.
      </p>
      {onGeheZuSystem && (
        <button
          type="button"
          onClick={onGeheZuSystem}
          className="inline-flex items-center gap-2 rounded-lg border border-signal px-3 py-2 font-mono text-xs uppercase tracking-[0.15em] text-signal transition-colors hover:bg-signal hover:text-walnuss"
        >
          Zum vollständigen VSM-Diagramm
          <ArrowRight size={14} />
        </button>
      )}
    </div>
  );
}
