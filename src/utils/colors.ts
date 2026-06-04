import type { Tag } from '../types/timeline';

const TAG_FARBEN: Record<Tag, string> = {
  Politik: '#3B82F6',
  Idee: '#A855F7',
  Aufbau: '#22C55E',
  Technik: '#F59E0B',
  Krise: '#EF4444',
  Ende: '#6B7280',
};

export function farbeFuerTag(tag: Tag): string {
  return TAG_FARBEN[tag];
}

type BadgeColor = 'neutral' | 'info' | 'success' | 'warning' | 'error';

const TAG_BADGE_FARBEN: Record<Tag, BadgeColor> = {
  Politik: 'info',
  Idee: 'neutral',
  Aufbau: 'success',
  Technik: 'warning',
  Krise: 'error',
  Ende: 'neutral',
};

export function badgeColorFuerTag(tag: Tag): BadgeColor {
  return TAG_BADGE_FARBEN[tag];
}
