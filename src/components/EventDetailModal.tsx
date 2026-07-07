import { useContext } from 'react';
import { Modal } from '@levin-the-doctor/simple-tailwind-ui';
import { User } from 'lucide-react';
import type { TimelineEvent } from '../types/timeline';
import { PERSONEN, GEGENSPIELER } from '../data/personen';
import { TagChip } from './ui/TagChip';
import { QuellenZeile } from './ui/QuelleRef';
import { QuellenNavContext } from '../context/quellenNav';

const ALLE_PERSONEN = [...PERSONEN, ...GEGENSPIELER];

interface EventDetailModalProps {
  event: TimelineEvent | null;
  onClose: () => void;
  onPersonClick?: (personId: string) => void;
}

export function EventDetailModal({ event, onClose, onPersonClick }: Readonly<EventDetailModalProps>) {
  const geheZuQuelle = useContext(QuellenNavContext);
  if (!event) return null;

  const refPersons = (event.personRefs ?? [])
    .map((id) => ALLE_PERSONEN.find((p) => p.id === id))
    .filter(Boolean);

  function handlePersonClick(personId: string) {
    onClose();
    onPersonClick?.(personId);
  }

  return (
    <Modal open title={event.titel} size="lg" onClose={onClose}>
      <div className="overflow-y-auto max-h-[65vh] pr-1">
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <TagChip tag={event.tag} />
          <span className="font-mono text-xs uppercase tracking-[0.15em] text-tinte/50 dark:text-fiberglas/50">
            {event.datum}
          </span>
        </div>

        {event.bild && (
          <img
            src={event.bild}
            alt={event.titel}
            className="max-h-72 w-full rounded-lg object-cover"
          />
        )}

        <p className="text-sm leading-relaxed text-tinte/80 dark:text-fiberglas/80">{event.text}</p>

        {refPersons.length > 0 && (
          <div className="border-t border-tinte/10 pt-2 dark:border-bezel">
            <p className="mb-2 font-mono text-[11px] uppercase tracking-[0.2em] text-tinte/40 dark:text-fiberglas/40">
              Beteiligte Personen
            </p>
            <div className="flex flex-wrap gap-2">
              {refPersons.map((person) => (
                <button
                  key={person!.id}
                  onClick={() => handlePersonClick(person!.id)}
                  className="inline-flex cursor-pointer items-center gap-1.5 rounded-full border border-tinte/15 px-3 py-1.5 text-xs font-medium text-tinte/70 transition-colors hover:border-signal hover:text-signal dark:border-fiberglas/20 dark:text-fiberglas/70 dark:hover:border-signal dark:hover:text-signal"
                >
                  <User size={12} />
                  {person!.name}
                </button>
              ))}
            </div>
          </div>
        )}

        {event.quellenRefs && event.quellenRefs.length > 0 && (
          <QuellenNavContext.Provider
            value={(id) => {
              onClose();
              geheZuQuelle(id);
            }}
          >
            <QuellenZeile quellenIds={event.quellenRefs} />
          </QuellenNavContext.Provider>
        )}
      </div>
      </div>
    </Modal>
  );
}
