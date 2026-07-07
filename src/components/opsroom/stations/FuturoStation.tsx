import { useState } from 'react';

/**
 * Simulation der Futuro-/CHECO-Wand: zwei Stellgrößen, eine Projektion.
 * Bewusst grob — als Illustration des Konzepts, nicht als Ökonometrie.
 * Historisch lief CHECO nie zuverlässig; genau das erzählt der Text dazu.
 */
export function FuturoStation() {
  const [investition, setInvestition] = useState(40);
  const [konsum, setKonsum] = useState(50);

  // Spielzeugmodell: Konsum hebt das Startniveau, Investition das Wachstum.
  const wachstum = (investition - 30) * 0.0035 - konsum * 0.0008;
  const start = 100 + konsum * 0.15;
  const jahre = [0, 1, 2, 3, 4, 5, 6];
  const werte = jahre.map((t) => start * Math.pow(1 + wachstum, t));
  const yFuer = (w: number) => 190 - Math.min(180, Math.max(4, (w - 60) * 1.4));
  const punkte = jahre.map((t, i) => `${50 + t * 55},${yFuer(werte[i])}`).join(' ');

  return (
    <div className="space-y-4">
      <div className="rounded-2xl bg-[#14100d] p-4">
        <p className="mb-1 font-mono text-[11px] uppercase tracking-[0.2em] text-fiberglas/50">
          Projektion Produktionsindex 1973–1979
        </p>
        <svg viewBox="0 0 420 210" className="w-full" role="img" aria-label="Simulierte Wirtschaftsprojektion">
          <line x1={40} y1={190} x2={400} y2={190} stroke="#efe7da" strokeWidth={1.5} opacity={0.6} />
          <line x1={40} y1={190} x2={40} y2={16} stroke="#efe7da" strokeWidth={1.5} opacity={0.6} />
          <line x1={40} y1={yFuer(100)} x2={400} y2={yFuer(100)} stroke="#efe7da" strokeWidth={1} strokeDasharray="4 4" opacity={0.3} />
          <text x={44} y={yFuer(100) - 5} fontSize={10} fill="#efe7da" opacity={0.5} className="font-mono">
            INDEX 100 = 1973
          </text>
          {jahre.map((t) => (
            <text key={t} x={50 + t * 55} y={205} fontSize={10} fill="#efe7da" opacity={0.5} textAnchor="middle" className="font-mono">
              {73 + t}
            </text>
          ))}
          <polyline points={punkte} stroke="#8fc1b5" strokeWidth={3} fill="none" />
          {jahre.map((t, i) => (
            <circle key={t} cx={50 + t * 55} cy={yFuer(werte[i])} r={4} fill="#8fc1b5" />
          ))}
          {wachstum < 0 && (
            <text x={230} y={40} fontSize={12} fill="#e23b2e" letterSpacing={2} className="font-mono">
              SZENARIO: SCHRUMPFUNG
            </text>
          )}
        </svg>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="investition" className="mb-1 block font-mono text-[11px] uppercase tracking-[0.2em] text-tinte/50 dark:text-fiberglas/50">
            Investitionsquote
          </label>
          <input
            id="investition"
            type="range"
            min={0}
            max={100}
            value={investition}
            onChange={(e) => setInvestition(Number(e.target.value))}
            className="w-full accent-signal"
          />
        </div>
        <div>
          <label htmlFor="konsum" className="mb-1 block font-mono text-[11px] uppercase tracking-[0.2em] text-tinte/50 dark:text-fiberglas/50">
            Konsumquote
          </label>
          <input
            id="konsum"
            type="range"
            min={0}
            max={100}
            value={konsum}
            onChange={(e) => setKonsum(Number(e.target.value))}
            className="w-full accent-signal"
          />
        </div>
      </div>

      <p className="text-sm text-tinte/70 dark:text-fiberglas/70">
        Genau solche Was-wäre-wenn-Fragen sollte CHECO beantworten: mehr Konsum heute gegen weniger
        Wachstum morgen. Diese Mini-Simulation illustriert nur die Idee — das echte Modell scheiterte
        an fehlenden, verspäteten Daten.
      </p>
    </div>
  );
}
