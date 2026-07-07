import { useEffect, useRef } from 'react';
import type { Person } from '../types/timeline';

interface PersonCardProps {
  person: Person;
  badgeLabel?: string;
  highlighted?: boolean;
}

export function PersonCard({ person, badgeLabel, highlighted }: Readonly<PersonCardProps>) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (highlighted && ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [highlighted]);

  return (
    <div
      id={`person-${person.id}`}
      ref={ref}
      className={`rounded-xl border bg-papier px-5 py-4 shadow-sm transition-all dark:bg-panel ${
        highlighted ? 'border-signal ring-2 ring-signal' : 'border-tinte/15 dark:border-bezel'
      }`}
    >
      {badgeLabel && (
        <span className="mb-2 inline-block rounded border border-tinte/15 px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.15em] text-tinte/50 dark:border-fiberglas/20 dark:text-fiberglas/50">
          {badgeLabel}
        </span>
      )}
      <div className="flex gap-4">
        {person.bild && (
          <img
            src={person.bild}
            alt={person.name}
            className="h-20 w-20 flex-shrink-0 rounded-lg object-cover"
          />
        )}
        <div className="flex min-w-0 flex-col gap-1.5">
          <h3 className="font-bold text-tinte dark:text-fiberglas">{person.name}</h3>
          <p className="font-mono text-xs uppercase tracking-[0.1em] text-signal">{person.rolle}</p>
          <p className="text-sm leading-relaxed text-tinte/70 dark:text-fiberglas/70">
            {person.beschreibung}
          </p>
        </div>
      </div>
    </div>
  );
}
