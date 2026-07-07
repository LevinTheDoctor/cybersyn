import { useContext } from 'react';
import { quelleById, zitat } from '../../data/quellen';
import { QuellenNavContext } from '../../context/quellenNav';

interface QuelleRefProps {
  quelleId: string;
}

/** Zitations-Chip wie „[Medina 2011]“ — Klick springt zum Literaturverzeichnis */
export function QuelleRef({ quelleId }: Readonly<QuelleRefProps>) {
  const geheZuQuelle = useContext(QuellenNavContext);
  const quelle = quelleById(quelleId);
  if (!quelle) return null;

  return (
    <button
      type="button"
      onClick={() => geheZuQuelle(quelleId)}
      title={zitat(quelle)}
      className="inline-flex items-center rounded border border-tinte/20 px-1.5 py-0.5 font-mono text-[11px] text-tinte/60 transition-colors hover:border-signal hover:text-signal dark:border-fiberglas/25 dark:text-fiberglas/60 dark:hover:border-signal dark:hover:text-signal"
    >
      [{quelle.kurz}]
    </button>
  );
}

/** Fußzeile „Quellen: [Medina 2011] [Vehlken 2022]“ unter Diagrammen und Stationen */
export function QuellenZeile({ quellenIds }: Readonly<{ quellenIds: string[] }>) {
  if (quellenIds.length === 0) return null;
  return (
    <p className="flex flex-wrap items-center gap-1.5 pt-2">
      <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-tinte/40 dark:text-fiberglas/40">
        Quellen:
      </span>
      {quellenIds.map((id) => (
        <QuelleRef key={id} quelleId={id} />
      ))}
    </p>
  );
}
