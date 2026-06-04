import { Button } from '@levin-the-doctor/simple-tailwind-ui';
import { useToast } from '@levin-the-doctor/simple-tailwind-ui';
import type { Tag } from '../types/timeline';
import { farbeFuerTag } from '../utils/colors';

const ALLE_TAGS: Tag[] = ['Politik', 'Idee', 'Aufbau', 'Technik', 'Krise', 'Ende'];

type ButtonColor = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'neutral';

function buttonColor(tag: Tag): ButtonColor {
  const map: Record<Tag, ButtonColor> = {
    Politik: 'primary',
    Idee: 'secondary',
    Aufbau: 'success',
    Technik: 'warning',
    Krise: 'danger',
    Ende: 'neutral',
  };
  return map[tag];
}

interface FilterBarProps {
  activeFilter: Tag | null;
  onFilterChange: (filter: Tag | null) => void;
}

export function FilterBar({ activeFilter, onFilterChange }: FilterBarProps) {
  const { show } = useToast();

  function handleFilter(tag: Tag | null) {
    onFilterChange(tag);
    if (tag) {
      show(`Filter aktiv: ${tag}`, { type: 'info' });
    } else {
      show('Alle Ereignisse werden angezeigt', { type: 'success' });
    }
  }

  return (
    <div className="flex flex-wrap gap-2 mb-6">
      <Button
        variant={activeFilter === null ? 'solid' : 'outline'}
        color="neutral"
        size="sm"
        onClick={() => handleFilter(null)}
      >
        Alle
      </Button>
      {ALLE_TAGS.map((tag) => (
        <Button
          key={tag}
          variant={activeFilter === tag ? 'solid' : 'outline'}
          color={buttonColor(tag)}
          size="sm"
          onClick={() => handleFilter(tag)}
        >
          <span className="flex items-center gap-1.5">
            {/* Farbpunkt als visuelle Legende */}
            <span
              className="inline-block w-2 h-2 rounded-full flex-shrink-0"
              style={{ backgroundColor: farbeFuerTag(tag) }}
            />
            {tag}
          </span>
        </Button>
      ))}
    </div>
  );
}
