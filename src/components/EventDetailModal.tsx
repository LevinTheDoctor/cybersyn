import { Modal, Badge } from '@levin-the-doctor/simple-tailwind-ui';
import type { TimelineEvent } from '../types/timeline';
import { badgeColorFuerTag } from '../utils/colors';

interface EventDetailModalProps {
  event: TimelineEvent | null;
  onClose: () => void;
}

export function EventDetailModal({ event, onClose }: EventDetailModalProps) {
  if (!event) return null;

  return (
    <Modal open title={event.titel} size="lg" onClose={onClose}>
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
      </div>
    </Modal>
  );
}
