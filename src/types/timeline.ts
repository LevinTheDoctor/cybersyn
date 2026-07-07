export interface TimelineEvent {
  id: string;
  datum: string;
  titel: string;
  kurzText: string;
  text: string;
  tag: Tag;
  bild?: string;
  personRefs?: string[];
  quellenRefs?: string[];
}

export interface GlossarEintrag {
  id: string;
  term: string;
  definition: string;
  quellenRefs?: string[];
}

export type QuellenTyp = 'buch' | 'artikel' | 'online' | 'video';

export interface Quelle {
  id: string;
  typ: QuellenTyp;
  /** Kurzlabel für Zitations-Chips, z. B. "Medina 2011" */
  kurz: string;
  autor: string;
  titel: string;
  jahr: string;
  /** Verlag, Zeitschrift (mit Band/Seiten) oder Plattform */
  medium?: string;
  doi?: string;
  url?: string;
  /** YouTube-ID für eingebettete Videos */
  embedId?: string;
  beschreibung?: string;
}

export type Tag = 'Politik' | 'Idee' | 'Aufbau' | 'Technik' | 'Krise' | 'Ende';

export interface Person {
  id: string;
  name: string;
  rolle: string;
  beschreibung: string;
  bild?: string;
}
