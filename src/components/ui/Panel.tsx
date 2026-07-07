import type { ReactNode } from 'react';

interface PanelProps {
  /** Label-Leiste in Mono-Versalien, wie auf den Fiberglas-Gehäusen im Opsroom */
  label?: string;
  /** Farbe der kleinen Kontrolllampe neben dem Label */
  lampe?: 'signal' | 'phosphor' | 'algedonik' | 'aus';
  className?: string;
  children: ReactNode;
}

const LAMPEN: Record<NonNullable<PanelProps['lampe']>, string> = {
  signal: 'bg-signal',
  phosphor: 'bg-phosphor',
  algedonik: 'bg-algedonik',
  aus: 'bg-tinte/20 dark:bg-fiberglas/20',
};

export function Panel({ label, lampe = 'signal', className = '', children }: Readonly<PanelProps>) {
  return (
    <section
      className={`rounded-xl border border-tinte/15 bg-papier shadow-sm dark:border-bezel dark:bg-panel ${className}`}
    >
      {label && (
        <div className="flex items-center gap-2 border-b border-tinte/10 px-4 pb-2 pt-3 dark:border-bezel">
          <span className={`h-2 w-2 rounded-[2px] ${LAMPEN[lampe]}`} aria-hidden="true" />
          <span className="font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-tinte/60 dark:text-fiberglas/60">
            {label}
          </span>
        </div>
      )}
      <div className="px-4 py-4">{children}</div>
    </section>
  );
}
