import { Card, Badge } from '@levin-the-doctor/simple-tailwind-ui';
import type { TimelineEvent } from '../types/timeline';
import { badgeColorFuerTag } from '../utils/colors';

interface EventCardProps {
  event: TimelineEvent;
  onClick?: () => void;
}

export function EventCard({ event, onClick }: EventCardProps) {
  return (
    <div
      onClick={onClick}
      className={onClick ? 'cursor-pointer transition-transform hover:scale-[1.02]' : ''}
    >
      <Card title={event.titel} variant="elevated" size="sm">
        <Badge color={badgeColorFuerTag(event.tag)} variant="subtle">
          {event.tag}
        </Badge>
        {event.bild && (
          <img
            src={event.bild}
            alt={event.titel}
            className="mt-2 w-full rounded-md object-cover max-h-32"
          />
        )}
        <p className="mt-2 text-sm text-zinc-700 dark:text-zinc-300 line-clamp-3">
          {event.kurzText}
        </p>
      </Card>
    </div>
  );
}
