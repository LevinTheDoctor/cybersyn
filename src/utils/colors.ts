import type { Tag } from '../types/timeline';

// 70er-Töne, abgestimmt auf die Opsroom-Palette in index.css
const TAG_FARBEN: Record<Tag, string> = {
  Politik: '#4A7FB5',
  Idee: '#8E6FAE',
  Aufbau: '#5E8C61',
  Technik: '#D9A13B',
  Krise: '#E23B2E',
  Ende: '#7A736A',
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
