import type { Tag } from '../../types/timeline';
import { farbeFuerTag } from '../../utils/colors';

/** Kategorie-Chip mit Farblampe — ersetzt die generischen Badges im Zeitstrahl */
export function TagChip({ tag }: Readonly<{ tag: Tag }>) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded border border-tinte/15 px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.15em] text-tinte/70 dark:border-fiberglas/20 dark:text-fiberglas/70">
      <span
        className="h-2 w-2 rounded-[2px]"
        style={{ backgroundColor: farbeFuerTag(tag) }}
        aria-hidden="true"
      />
      {tag}
    </span>
  );
}
