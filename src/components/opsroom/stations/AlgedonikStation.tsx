import { useState } from 'react';

/**
 * Simulation der algedonischen Alarme: Je größer die Abweichung im Betrieb,
 * desto schneller blinken die Lampen — und ab einem Schwellwert eskaliert
 * die Meldung an die nächsthöhere Ebene.
 */
export function AlgedonikStation() {
  const [abweichung, setAbweichung] = useState(20);

  const stufe = abweichung < 40 ? 0 : abweichung < 75 ? 1 : 2;
  const blinkDauer = stufe === 0 ? 0 : Math.max(0.25, 1.8 - abweichung / 60);

  const status = [
    'NORMALBETRIEB — KEINE MELDUNG',
    'ABWEICHUNG — BETRIEB LOEST SELBST',
    'ALARM ESKALIERT AN CORFO / REGIERUNG',
  ][stufe];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-center gap-8 rounded-2xl bg-[#2e2620] px-6 py-8">
        {[0, 1].map((panel) => {
          const an = stufe === 2 || (stufe === 1 && panel === 0);
          return (
            <div key={panel} className="flex flex-col items-center gap-2">
              <span
                className="block h-14 w-14 rounded-full"
                style={{
                  backgroundColor: 'var(--color-algedonik)',
                  opacity: an ? 1 : 0.15,
                  boxShadow: an ? '0 0 24px rgba(226, 59, 46, 0.7)' : 'none',
                  animation: an && blinkDauer > 0 ? `blink ${blinkDauer}s steps(2, start) infinite` : 'none',
                }}
                aria-hidden="true"
              />
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-fiberglas/50">
                {panel === 0 ? 'Betrieb' : 'Ebene CORFO'}
              </span>
            </div>
          );
        })}
        <p
          className={`font-mono text-xs uppercase tracking-[0.15em] ${
            stufe === 2 ? 'text-algedonik' : stufe === 1 ? 'text-signal' : 'text-phosphor'
          }`}
          role="status"
        >
          {status}
        </p>
      </div>

      <div>
        <label htmlFor="abweichung" className="mb-1 block font-mono text-[11px] uppercase tracking-[0.2em] text-tinte/50 dark:text-fiberglas/50">
          Abweichung im Betrieb simulieren (z. B. Fehltage, Materialmangel)
        </label>
        <input
          id="abweichung"
          type="range"
          min={0}
          max={100}
          value={abweichung}
          onChange={(e) => setAbweichung(Number(e.target.value))}
          className="w-full accent-signal"
        />
        <p className="mt-2 text-sm text-tinte/70 dark:text-fiberglas/70">
          So funktionierte die Eskalation: Cyberstride meldete nur <em>dass</em> etwas aus dem Ruder
          läuft, nicht jedes Detail. Der Betrieb behielt Zeit, selbst zu reagieren — erst danach
          leuchtete die Lampe eine Ebene höher.
        </p>
      </div>
    </div>
  );
}
