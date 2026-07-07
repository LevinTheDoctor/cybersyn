/**
 * Inhalte der System-Diagramme (System & Begriffe-Tab).
 * Neue Knoten/Ebenen/Stationen hier ergänzen — die Diagramm-Komponenten
 * in src/components/system/ lesen alles aus diesen Arrays.
 */

export interface FlowKnoten {
  id: string;
  name: string;
  untertitel: string;
  beschreibung: string;
  quellenRefs: string[];
}

/** Der tägliche Signalweg der Produktionsdaten — Reihenfolge = Datenfluss */
export const FLOW_KNOTEN: FlowKnoten[] = [
  {
    id: 'fabrik',
    name: 'Betrieb',
    untertitel: '~500 Staatsbetriebe',
    beschreibung:
      'In jedem verstaatlichten Betrieb erfassten die Interventors täglich rund 10 Kernindikatoren: Produktion, Rohstoffbestand, Energie, Fehltage. Vorher kamen solche Zahlen mit Monaten Verspätung in Santiago an.',
    quellenRefs: ['medina-2011', 'medina-bpb-2023'],
  },
  {
    id: 'telex',
    name: 'Cybernet',
    untertitel: 'Telex-Netz, 400 Geräte',
    beschreibung:
      'Die Daten liefen über 400 ungenutzte Fernschreiber von ENTEL — bewusst einfache, robuste Technik statt teurer Terminals. Das Netz reichte über ca. 5.152 km von Arica bis Punta Arenas.',
    quellenRefs: ['medina-2011'],
  },
  {
    id: 'ecom',
    name: 'ECOM',
    untertitel: 'IBM 360/50 · Lochkarten',
    beschreibung:
      'Im nationalen Rechenzentrum in Santiago wurden die Telex-Meldungen auf Lochkarten übertragen und in einen der nur vier Großrechner Chiles eingespeist — einen IBM 360/50.',
    quellenRefs: ['medina-2011'],
  },
  {
    id: 'cyberstride',
    name: 'Cyberstride',
    untertitel: 'Bayes-Statistik',
    beschreibung:
      'Die Software verglich jeden Indikator mit seinem Erwartungskorridor (Bayessche Kurzfrist-Prognosen nach Harrison/Stevens). Nur signifikante Abweichungen erzeugten eine Meldung — Filterung statt Datenflut.',
    quellenRefs: ['medina-2011', 'espejo-2022'],
  },
  {
    id: 'opsroom',
    name: 'Opsroom',
    untertitel: 'Entscheidungsraum',
    beschreibung:
      'Ausnahmen und Trends landeten als Dia und algedonisches Signal im Opsroom, wo eine kleine Runde beriet. Der Raum war die menschliche Schnittstelle des Systems — kein Autopilot.',
    quellenRefs: ['medina-2011', 'vehlken-2022'],
  },
  {
    id: 'entscheidung',
    name: 'Entscheidung',
    untertitel: 'zurück an den Betrieb',
    beschreibung:
      'Anweisungen, Ressourcen oder Unterstützung gingen zurück an die Betriebe — die Rückkopplungsschleife schloss sich. Konnte ein Betrieb sein Problem selbst lösen, blieb die Regierung außen vor.',
    quellenRefs: ['medina-2011', 'espejo-2022'],
  },
];

export interface VsmEbene {
  id: string;
  name: string;
  chile: string;
  beschreibung: string;
}

/** Beers Viable System Model, gemappt auf Chile */
export const VSM_EBENEN: VsmEbene[] = [
  {
    id: 's1',
    name: 'System 1 — Operation',
    chile: 'Die Betriebe (Textil, Kupfer, Energie …)',
    beschreibung:
      'Die operativen Einheiten, die die eigentliche Arbeit tun. Im VSM haben sie so viel Autonomie wie möglich — jedes System 1 ist selbst wieder ein vollständiges lebensfähiges System (Rekursion).',
  },
  {
    id: 's2',
    name: 'System 2 — Koordination',
    chile: 'Abstimmung zwischen den Betrieben',
    beschreibung:
      'Dämpft Konflikte und Schwingungen zwischen den operativen Einheiten: gemeinsame Standards, Pläne, Absprachen — damit sich die Betriebe nicht gegenseitig blockieren.',
  },
  {
    id: 's3',
    name: 'System 3 — Steuerung',
    chile: 'CORFO-Operationsleitung, Cyberstride-Berichte',
    beschreibung:
      'Das operative Management des Ganzen: verteilt Ressourcen, überwacht per Ausnahmemeldung (hier docken Cyberstride und die algedonischen Signale an) und verhandelt mit System 1 über Ziele.',
  },
  {
    id: 's4',
    name: 'System 4 — Zukunft',
    chile: 'CHECO / „Futuro“, Planungsstab',
    beschreibung:
      'Blickt nach außen und nach vorn: Umweltbeobachtung, Simulation, Strategie. In Cybersyn sollte der Wirtschaftssimulator CHECO genau diese Rolle spielen.',
  },
  {
    id: 's5',
    name: 'System 5 — Politik',
    chile: 'Regierung Allende',
    beschreibung:
      'Setzt Identität und Grundsatzentscheidungen: Wofür ist das Ganze da? Hier balancierte im Modell die Politik zwischen Gegenwart (S3) und Zukunft (S4).',
  },
];

export interface NetzKnoten {
  id: string;
  name: string;
  /** Position auf der stilisierten Karte (viewBox 0 0 260 840) */
  x: number;
  y: number;
  hub?: boolean;
}

/** Telex-Knoten entlang Chiles — von Arica (Norden) bis Punta Arenas (Süden) */
export const NETZ_KNOTEN: NetzKnoten[] = [
  { id: 'arica', name: 'Arica', x: 120, y: 50 },
  { id: 'antofagasta', name: 'Antofagasta', x: 108, y: 160 },
  { id: 'la-serena', name: 'La Serena', x: 100, y: 280 },
  { id: 'valparaiso', name: 'Valparaíso', x: 92, y: 360 },
  { id: 'santiago', name: 'Santiago · ECOM', x: 106, y: 400, hub: true },
  { id: 'concepcion', name: 'Concepción', x: 96, y: 500 },
  { id: 'temuco', name: 'Temuco', x: 102, y: 560 },
  { id: 'puerto-montt', name: 'Puerto Montt', x: 110, y: 630 },
  { id: 'punta-arenas', name: 'Punta Arenas', x: 150, y: 790 },
];
