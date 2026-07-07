import { useRef, useState } from 'react';
import type { KeyboardEvent, PointerEvent } from 'react';

interface Magnet {
  id: string;
  label: string;
  form: 'kreis' | 'quadrat' | 'dreieck';
  farbe: string;
  x: number;
  y: number;
}

const START_MAGNETE: Magnet[] = [
  { id: 'kupfer', label: 'KUPFER', form: 'kreis', farbe: '#d96c2c', x: 8, y: 12 },
  { id: 'textil', label: 'TEXTIL', form: 'quadrat', farbe: '#efe7da', x: 40, y: 20 },
  { id: 'energie', label: 'ENERGIE', form: 'dreieck', farbe: '#d9a13b', x: 70, y: 14 },
  { id: 'transport', label: 'TRANSPORT', form: 'quadrat', farbe: '#8fc1b5', x: 15, y: 62 },
  { id: 'haefen', label: 'HAEFEN', form: 'kreis', farbe: '#8fc1b5', x: 48, y: 68 },
  { id: 'banken', label: 'BANKEN', form: 'dreieck', farbe: '#e23b2e', x: 76, y: 60 },
];

/**
 * Die Magnetwand zum Anfassen: Symbole für Wirtschaftskomponenten lassen
 * sich frei verschieben (Maus/Touch, per Tastatur mit den Pfeiltasten).
 * Positionen in Prozent, damit die Wand responsiv bleibt.
 */
export function MagnetwandStation() {
  const [magnete, setMagnete] = useState(START_MAGNETE);
  const wandRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<{ id: string; dx: number; dy: number } | null>(null);

  function bewege(id: string, xPct: number, yPct: number) {
    setMagnete((alte) =>
      alte.map((m) =>
        m.id === id
          ? { ...m, x: Math.min(88, Math.max(0, xPct)), y: Math.min(82, Math.max(0, yPct)) }
          : m,
      ),
    );
  }

  function handlePointerDown(e: PointerEvent<HTMLButtonElement>, m: Magnet) {
    const wand = wandRef.current;
    if (!wand) return;
    const rect = wand.getBoundingClientRect();
    dragRef.current = {
      id: m.id,
      dx: ((e.clientX - rect.left) / rect.width) * 100 - m.x,
      dy: ((e.clientY - rect.top) / rect.height) * 100 - m.y,
    };
    e.currentTarget.setPointerCapture(e.pointerId);
  }

  function handlePointerMove(e: PointerEvent<HTMLButtonElement>) {
    const drag = dragRef.current;
    const wand = wandRef.current;
    if (!drag || !wand) return;
    const rect = wand.getBoundingClientRect();
    bewege(
      drag.id,
      ((e.clientX - rect.left) / rect.width) * 100 - drag.dx,
      ((e.clientY - rect.top) / rect.height) * 100 - drag.dy,
    );
  }

  function handleKeyDown(e: KeyboardEvent<HTMLButtonElement>, m: Magnet) {
    const schritt = 3;
    const richtungen: Record<string, [number, number]> = {
      ArrowLeft: [-schritt, 0],
      ArrowRight: [schritt, 0],
      ArrowUp: [0, -schritt],
      ArrowDown: [0, schritt],
    };
    const delta = richtungen[e.key];
    if (delta) {
      e.preventDefault();
      bewege(m.id, m.x + delta[0], m.y + delta[1]);
    }
  }

  return (
    <div className="space-y-4">
      <div
        ref={wandRef}
        className="relative h-72 touch-none overflow-hidden rounded-2xl bg-[#6b5a44] shadow-inner"
      >
        <p className="pointer-events-none absolute left-3 top-2 font-mono text-[10px] uppercase tracking-[0.2em] text-fiberglas/40">
          Stoffbespannte Metallwand
        </p>
        {magnete.map((m) => (
          <button
            key={m.id}
            type="button"
            aria-label={`Magnet ${m.label} verschieben (Pfeiltasten)`}
            onPointerDown={(e) => handlePointerDown(e, m)}
            onPointerMove={handlePointerMove}
            onPointerUp={() => (dragRef.current = null)}
            onKeyDown={(e) => handleKeyDown(e, m)}
            className="absolute flex cursor-grab flex-col items-center gap-1 rounded p-1 outline-none focus-visible:ring-2 focus-visible:ring-signal active:cursor-grabbing"
            style={{ left: `${m.x}%`, top: `${m.y}%` }}
          >
            {m.form === 'kreis' && (
              <span className="block h-9 w-9 rounded-full shadow-md" style={{ backgroundColor: m.farbe }} aria-hidden="true" />
            )}
            {m.form === 'quadrat' && (
              <span className="block h-9 w-9 shadow-md" style={{ backgroundColor: m.farbe }} aria-hidden="true" />
            )}
            {m.form === 'dreieck' && (
              <span
                className="block border-b-[32px] border-l-[18px] border-r-[18px] border-l-transparent border-r-transparent drop-shadow-md"
                style={{ borderBottomColor: m.farbe }}
                aria-hidden="true"
              />
            )}
            <span className="font-mono text-[10px] tracking-[0.15em] text-fiberglas/80">{m.label}</span>
          </button>
        ))}
      </div>

      <div className="flex items-center justify-between gap-4">
        <p className="text-sm text-tinte/70 dark:text-fiberglas/70">
          Probier es aus: Stecke die Wirtschaft um, wie es die Runde 1972 beim Diskutieren tat.
        </p>
        <button
          type="button"
          onClick={() => setMagnete(START_MAGNETE)}
          className="shrink-0 rounded-lg border border-tinte/25 px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.15em] text-tinte/60 transition-colors hover:border-signal hover:text-signal dark:border-fiberglas/25 dark:text-fiberglas/60"
        >
          Zurücksetzen
        </button>
      </div>
    </div>
  );
}
