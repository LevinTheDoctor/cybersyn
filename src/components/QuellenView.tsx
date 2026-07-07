import { useEffect, useRef } from 'react';
import { Book, FileText, Globe, Video, ExternalLink } from 'lucide-react';
import type { Quelle, QuellenTyp } from '../types/timeline';
import { QUELLEN } from '../data/quellen';

const GRUPPEN: { typ: QuellenTyp; titel: string; icon: typeof Book }[] = [
  { typ: 'buch', titel: 'Bücher', icon: Book },
  { typ: 'artikel', titel: 'Wissenschaftliche Artikel', icon: FileText },
  { typ: 'online', titel: 'Online-Quellen', icon: Globe },
  { typ: 'video', titel: 'Videos', icon: Video },
];

interface QuellenViewProps {
  highlightedQuelleId?: string | null;
}

/** Literaturverzeichnis aus src/data/quellen.ts — Sprungziel der [Quellen-Chips] */
export function QuellenView({ highlightedQuelleId }: Readonly<QuellenViewProps>) {
  return (
    <div className="space-y-10">
      {GRUPPEN.map((gruppe) => {
        const eintraege = QUELLEN.filter((q) => q.typ === gruppe.typ);
        if (eintraege.length === 0) return null;
        return (
          <section key={gruppe.typ}>
            <h2 className="mb-4 flex items-center gap-2 text-xl font-bold tracking-tight text-tinte dark:text-fiberglas">
              <gruppe.icon size={18} className="text-signal" aria-hidden="true" />
              {gruppe.titel}
            </h2>
            <div className="space-y-4">
              {eintraege.map((q) => (
                <QuellenEintrag key={q.id} quelle={q} highlighted={highlightedQuelleId === q.id} />
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}

function QuellenEintrag({ quelle, highlighted }: Readonly<{ quelle: Quelle; highlighted: boolean }>) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (highlighted && ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [highlighted]);

  return (
    <div
      id={`quelle-${quelle.id}`}
      ref={ref}
      className={`rounded-xl border bg-papier px-5 py-4 transition-all dark:bg-panel ${
        highlighted ? 'border-signal ring-2 ring-signal' : 'border-tinte/15 dark:border-bezel'
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-signal">[{quelle.kurz}]</p>
          <p className="mt-1.5 font-mono text-sm leading-relaxed text-tinte dark:text-fiberglas">
            {quelle.autor} ({quelle.jahr}): <em>{quelle.titel}</em>
            {quelle.medium ? `. ${quelle.medium}` : ''}.
          </p>
          {quelle.beschreibung && (
            <p className="mt-2 text-sm leading-relaxed text-tinte/70 dark:text-fiberglas/70">
              {quelle.beschreibung}
            </p>
          )}
          <div className="mt-2 flex flex-wrap gap-3">
            {quelle.doi && (
              <a
                href={`https://doi.org/${quelle.doi}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 font-mono text-xs text-phosphor underline-offset-2 hover:underline"
              >
                DOI: {quelle.doi}
                <ExternalLink size={11} aria-hidden="true" />
              </a>
            )}
            {quelle.url && !quelle.embedId && (
              <a
                href={quelle.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 font-mono text-xs text-phosphor underline-offset-2 hover:underline"
              >
                Zur Quelle
                <ExternalLink size={11} aria-hidden="true" />
              </a>
            )}
          </div>
        </div>
      </div>

      {quelle.embedId && (
        <div className="relative mt-4 w-full" style={{ paddingBottom: '56.25%' }}>
          <iframe
            className="absolute inset-0 h-full w-full rounded-lg"
            src={`https://www.youtube.com/embed/${quelle.embedId}`}
            title={quelle.titel}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      )}
    </div>
  );
}
