import { Modal, Badge } from '@levin-the-doctor/simple-tailwind-ui';
import { User } from 'lucide-react';
import type { TimelineEvent } from '../types/timeline';
import { badgeColorFuerTag } from '../utils/colors';
import { PERSONEN, GEGENSPIELER } from '../data/personen';

const ALLE_PERSONEN = [...PERSONEN, ...GEGENSPIELER];

interface EventDetailModalProps {
  event: TimelineEvent | null;
  onClose: () => void;
  onPersonClick?: (personId: string) => void;
}

export function EventDetailModal({ event, onClose, onPersonClick }: Readonly<EventDetailModalProps>) {
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
          <Badge color={badgeColorFuerTag(event.tag)} variant="subtle">
            {event.tag}
          </Badge>
          <span className="text-sm text-zinc-500 dark:text-zinc-400">{event.datum}</span>
        </div>

        {event.bild && (
          <img
            src={event.bild}
            alt={event.titel}
            className="w-full rounded-lg object-cover max-h-72"
          />
        )}

        <p className="text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">{event.text}</p>

        {refPersons.length > 0 && (
          <div className="pt-2 border-t border-zinc-100 dark:border-zinc-700">
            <p className="text-xs font-medium text-zinc-400 dark:text-zinc-500 mb-2 uppercase tracking-wide">
              Beteiligte Personen
            </p>
            <div className="flex flex-wrap gap-2">
              {refPersons.map((person) => (
                <button
                  key={person!.id}
                  onClick={() => handlePersonClick(person!.id)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-zinc-100 dark:bg-zinc-700 text-zinc-700 dark:text-zinc-200 hover:bg-blue-100 dark:hover:bg-blue-900/40 hover:text-blue-700 dark:hover:text-blue-300 transition-colors cursor-pointer"
                >
                  <User size={12} />
                  {person!.name}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
      </div>
    </Modal>
  );
}
