import { Card, Badge } from '@levin-the-doctor/simple-tailwind-ui';
import type { Person } from '../types/timeline';

interface PersonCardProps {
  person: Person;
  badgeLabel?: string;
}

export function PersonCard({ person, badgeLabel }: PersonCardProps) {
  return (
    <Card title={person.name} variant="elevated" size="md">
      <div className="flex gap-4">
        {person.bild && (
          <img
            src={person.bild}
            alt={person.name}
            className="w-20 h-20 rounded-lg object-cover flex-shrink-0"
          />
        )}
        <div className="flex flex-col gap-2 min-w-0">
          {badgeLabel && (
            <Badge color="neutral" variant="subtle">
              {badgeLabel}
            </Badge>
          )}
          <p className="text-sm font-medium text-zinc-600 dark:text-zinc-400">{person.rolle}</p>
          <p className="text-sm text-zinc-700 dark:text-zinc-300">{person.beschreibung}</p>
        </div>
      </div>
    </Card>
  );
}
