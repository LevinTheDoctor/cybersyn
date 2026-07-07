import type { Quelle } from '../types/timeline';

/**
 * Literaturverzeichnis — übernommen aus der Zotero-Bibliothek
 * (FOM_Arbeit_Template/literatur/literatur.bib).
 *
 * Neue Quelle hinzufügen: Eintrag anhängen, `id` und `kurz` vergeben.
 * Auf die Quelle verweisen: `quellenRefs: ['<id>']` an Events, Glossar,
 * Opsroom-Stationen oder Diagramm-Knoten hängen.
 */
export const QUELLEN: Quelle[] = [
  {
    id: 'medina-2011',
    typ: 'buch',
    kurz: 'Medina 2011',
    autor: 'Medina, Eden',
    titel: 'Cybernetic Revolutionaries. Technology and Politics in Allende’s Chile',
    jahr: '2011',
    medium: 'MIT Press, Cambridge (MA)',
    beschreibung:
      'Das Standardwerk zu Cybersyn. Medina rekonstruiert das Projekt aus Archiven und Interviews mit Beteiligten – Grundlage fast aller Fakten auf dieser Seite.',
  },
  {
    id: 'medina-bpb-2023',
    typ: 'online',
    kurz: 'Medina 2023',
    autor: 'Medina, Eden',
    titel: 'Die kybernetische Revolution und das Projekt Cybersyn',
    jahr: '2023',
    medium: 'APuZ – Aus Politik und Zeitgeschichte: Chile, Bundeszentrale für politische Bildung',
    url: 'https://www.bpb.de/shop/zeitschriften/apuz/chile-2023/539264/die-kybernetische-revolution-und-das-projekt-cybersyn/',
    beschreibung:
      'Deutschsprachiger Überblicksartikel der Cybersyn-Historikerin. Lizenz CC BY-NC-ND 3.0 DE – Hauptquelle der Texte dieser Seite.',
  },
  {
    id: 'espejo-2022',
    typ: 'artikel',
    kurz: 'Espejo 2022',
    autor: 'Espejo, Raul',
    titel: 'Cybersyn, Big Data, Variety Engineering and Governance',
    jahr: '2022',
    medium: 'AI & Society 37 (3), S. 1163–1177',
    doi: '10.1007/s00146-021-01348-0',
    url: 'https://link.springer.com/10.1007/s00146-021-01348-0',
    beschreibung:
      'Espejo war Operational Director von Cybersyn. Er erklärt das Viable System Model und zieht Linien zu Big Data und heutiger Governance.',
  },
  {
    id: 'vehlken-2022',
    typ: 'artikel',
    kurz: 'Vehlken 2022',
    autor: 'Vehlken, Sebastian',
    titel: 'Operative Communication: Project Cybersyn and the Intersection of Information Design, Interface Design, and Interaction Design',
    jahr: '2022',
    medium: 'AI & Society 37 (3), S. 1131–1152',
    doi: '10.1007/s00146-021-01346-2',
    url: 'https://link.springer.com/10.1007/s00146-021-01346-2',
    beschreibung:
      'Analysiert das Design des Opsroom: Gui Bonsiepe, die Ulmer Schule und die Gestaltung der Schnittstellen zwischen Mensch und Maschine.',
  },
  {
    id: 'munn-magee',
    typ: 'artikel',
    kurz: 'Munn/Magee',
    autor: 'Munn, Luke / Magee, Liam',
    titel: 'Other Worlds: Using AI to Revisit Cybersyn and Rethink Economic Futures',
    jahr: 'o. J.',
    beschreibung:
      'Gedankenexperiment: Mit KI-Sprachmodellen werden Allende und Beer „wiederbelebt“, um alternative Wirtschaftszukünfte zu diskutieren.',
  },
  {
    id: 'postwachstum-2025',
    typ: 'online',
    kurz: 'Postwachstum 2025',
    autor: 'Blog Postwachstum',
    titel: 'Kybernetische demokratische Wirtschaftsplanung',
    jahr: '2025',
    medium: 'postwachstum.de',
    url: 'https://www.postwachstum.de/kybernetische-demokratische-wirtschaftsplanung-20250422',
    beschreibung:
      'Aktuelle Debatte: Was lässt sich aus Cybersyn für demokratische Wirtschaftsplanung heute lernen?',
  },
  {
    id: 'allende-un-1972',
    typ: 'online',
    kurz: 'Allende 1972',
    autor: 'Allende, Salvador',
    titel: 'Speech to the United Nations (Excerpts)',
    jahr: '1972',
    medium: 'marxists.org',
    url: 'https://www.marxists.org/archive/allende/1972/december/04.htm',
    beschreibung:
      'Allendes UN-Rede vom 4. Dezember 1972 gegen die Wirtschaftsblockade – im Materialien-Tab in voller Länge.',
  },
  {
    id: 'radical-data-2025',
    typ: 'video',
    kurz: 'Radical Data 2025',
    autor: 'Radical Data (mit Eden Medina)',
    titel: 'The Room That Tried to Change Everything',
    jahr: '2025',
    medium: 'YouTube',
    url: 'https://www.youtube.com/watch?v=6Qrw51WPtkk',
    embedId: '6Qrw51WPtkk',
    beschreibung:
      'Eden Medina im Gespräch über den Opsroom, seine Entstehung und was von Cybersyn bleibt.',
  },
  {
    id: 'wohlstand-fuer-alle',
    typ: 'video',
    kurz: 'Wohlstand für alle',
    autor: 'Wohlstand für alle',
    titel: 'Projekt Cybersyn',
    jahr: 'o. J.',
    medium: 'YouTube',
    url: 'https://www.youtube.com/watch?v=LaDkqLSWHrM',
    embedId: 'LaDkqLSWHrM',
    beschreibung:
      'Dokumentarischer Überblick: Hintergrund, Aufbau und historische Bedeutung des kybernetischen Experiments in Chile.',
  },
];

export function quelleById(id: string): Quelle | undefined {
  return QUELLEN.find((q) => q.id === id);
}

/** Zitation im Literaturverzeichnis-Format */
export function zitat(q: Quelle): string {
  const teile = [q.autor, `(${q.jahr})`, `${q.titel}.`];
  if (q.medium) teile.push(`${q.medium}.`);
  return teile.join(' ');
}
