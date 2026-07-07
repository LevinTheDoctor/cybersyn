import { useToast } from '@levin-the-doctor/simple-tailwind-ui';
import type { Tag } from '../types/timeline';
import { farbeFuerTag } from '../utils/colors';

const ALLE_TAGS: Tag[] = ['Politik', 'Idee', 'Aufbau', 'Technik', 'Krise', 'Ende'];

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

  const basis =
    'rounded-lg border px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.15em] transition-colors';

  return (
    <div className="mb-6 flex flex-wrap gap-2">
      <button
        type="button"
        onClick={() => handleFilter(null)}
        aria-pressed={activeFilter === null}
        className={`${basis} ${
          activeFilter === null
            ? 'border-tinte bg-tinte text-fiberglas dark:border-fiberglas dark:bg-fiberglas dark:text-walnuss'
            : 'border-tinte/25 text-tinte/60 hover:border-tinte dark:border-fiberglas/25 dark:text-fiberglas/60 dark:hover:border-fiberglas'
        }`}
      >
        Alle
      </button>
      {ALLE_TAGS.map((tag) => {
        const farbe = farbeFuerTag(tag);
        const aktiv = activeFilter === tag;
        return (
          <button
            key={tag}
            type="button"
            onClick={() => handleFilter(tag)}
            aria-pressed={aktiv}
            className={`${basis} flex items-center gap-1.5 ${
              aktiv
                ? 'text-fiberglas'
                : 'border-tinte/25 text-tinte/60 dark:border-fiberglas/25 dark:text-fiberglas/60'
            }`}
            style={
              aktiv
                ? { backgroundColor: farbe, borderColor: farbe }
                : undefined
            }
          >
            <span
              className="inline-block h-2 w-2 flex-shrink-0 rounded-[2px]"
              style={{ backgroundColor: aktiv ? 'currentColor' : farbe }}
              aria-hidden="true"
            />
            {tag}
          </button>
        );
      })}
    </div>
  );
}
