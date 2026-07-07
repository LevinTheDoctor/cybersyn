import { TICKER_MELDUNGEN } from '../../data/ticker';

/**
 * Schmaler Laufband-Streifen im Header — historische Meldungen im
 * Fernschreiber-Stil. Rein dekorativ (alle Fakten stehen im Zeitstrahl),
 * daher aria-hidden; bei prefers-reduced-motion steht das Band still.
 */
export function TelexTicker() {
  const band = TICKER_MELDUNGEN.join('  ///  ') + '  ///  ';

  return (
    <div
      aria-hidden="true"
      className="overflow-hidden border-y border-tinte/10 bg-tinte/[0.04] dark:border-bezel dark:bg-black/20"
    >
      <div className="flex w-max animate-ticker whitespace-nowrap py-1.5 motion-reduce:animate-none">
        {[0, 1].map((i) => (
          <span
            key={i}
            className="pr-8 font-mono text-[11px] uppercase tracking-[0.15em] text-tinte/50 dark:text-phosphor/60"
          >
            {band}
          </span>
        ))}
      </div>
    </div>
  );
}
