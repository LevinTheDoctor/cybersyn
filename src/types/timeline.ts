export interface TimelineEvent {
  id: string;
  datum: string;
  titel: string;
  kurzText: string;
  text: string;
  tag: Tag;
  bild?: string;
  personRefs?: string[];
}

export interface GlossarEintrag {
  id: string;
  term: string;
  definition: string;
}

export type Tag = 'Politik' | 'Idee' | 'Aufbau' | 'Technik' | 'Krise' | 'Ende';

export interface Person {
  id: string;
  name: string;
  rolle: string;
  beschreibung: string;
  bild?: string;
}
