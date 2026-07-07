import type { TimelineEvent } from '../types/timeline';
import { TagChip } from './ui/TagChip';

interface EventCardProps {
  event: TimelineEvent;
  onClick?: () => void;
}

export function EventCard({ event, onClick }: EventCardProps) {
  return (
    <div
      onClick={onClick}
      className={`rounded-xl border border-tinte/15 bg-papier px-4 py-3 shadow-sm dark:border-bezel dark:bg-panel ${
        onClick ? 'cursor-pointer transition-transform hover:scale-[1.02]' : ''
      }`}
    >
      <h3 className="mb-2 font-bold leading-snug text-tinte dark:text-fiberglas">{event.titel}</h3>
      <TagChip tag={event.tag} />
      {event.bild && (
        <img
          src={event.bild}
          alt={event.titel}
          className="mt-2 max-h-32 w-full rounded-md object-cover"
        />
      )}
      <p className="mt-2 line-clamp-3 text-sm text-tinte/70 dark:text-fiberglas/70">
        {event.kurzText}
      </p>
    </div>
  );
}
