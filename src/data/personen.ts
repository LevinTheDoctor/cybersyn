import type { Person, GlossarEintrag } from '../types/timeline';
import { allendeImg, beerImg, floresImg, wienerImg, corfoImg } from './images';

export const PERSONEN: Person[] = [
  {
    id: 'salvador-allende',
    name: 'Salvador Allende',
    rolle: 'Präsident von Chile (ab 1970)',
    beschreibung:
      'Erster demokratisch gewählter sozialistischer Präsident Chiles. Verfolgte den „chilenischen Weg zum Sozialismus" – einen sozialistischen Wandel mit friedlichen, demokratischen Mitteln unter Wahrung der Rechtsstaatlichkeit. Hielt vor der UNO eine Rede gegen die Ausbeutung durch US-Konzerne (über 42 Jahre rund 4 Mrd. Dollar Gewinn bei 30 Mio. Investition). Starb am 11. September 1973 im Präsidentenpalast – nach heutigem Forschungsstand durch Suizid, während das Militär den Palast stürmte.',
    bild: allendeImg,
  },
  {
    id: 'stafford-beer',
    name: 'Stafford Beer',
    rolle: 'Britischer Kybernetiker, fachlicher Kopf von Cybersyn',
    beschreibung:
      'Pionier der Managementkybernetik. Wollte Unternehmen und Staat befähigen, sich schnell an Veränderungen anzupassen. Suchte ein Gleichgewicht zwischen zentraler und dezentraler Kontrolle. Entwarf die Idee einer „Freiheitsmaschine", aus der später der Operations Room wurde. Reagierte auf Flores\' Brief so begeistert, dass er alle anderen Verträge kündigen wollte. Sprach von Cybersyn als „Werkzeugen des Volkes".',
    bild: beerImg,
  },
  {
    id: 'fernando-flores',
    name: 'Fernando Flores',
    rolle: 'Chilenischer Ingenieur, später Generalsekretär der Regierung',
    beschreibung:
      'Holte Beer mit nur 28 Jahren nach Chile und stieß das Projekt an. Er arbeitete in der Behörde CORFO auf der dritthöchsten Position. Erkannte nach dem Oktoberstreik 1972 die politischen Grenzen der Technik: Cybersyn konnte steuernd eingreifen, aber nicht Inflation, Blockade und drohende Gewalt lösen. Wurde im August 1973 mit 30 Jahren Generalsekretär der Regierung. Nach dem Putsch verhaftet.',
    bild: floresImg,
  },
  {
    id: 'norbert-wiener',
    name: 'Norbert Wiener',
    rolle: 'Mathematiker am MIT (theoretischer Hintergrund)',
    beschreibung:
      'Prägte 1948 die bekannte Definition der Kybernetik als Wissenschaft der „Regelung und Nachrichtenübertragung im Lebewesen und in der Maschine". Sein Buch legte die theoretische Grundlage, auf der Beer später aufbaute. Wiener selbst war nicht am Projekt beteiligt.',
    bild: wienerImg,
  },
];

export const GEGENSPIELER: Person[] = [
  {
    id: 'richard-nixon',
    name: 'Richard Nixon',
    rolle: 'US-Präsident (1969–1974)',
    beschreibung:
      'Wollte Allende von der politischen Bühne entfernen. Autorisierte verdeckte Operationen der CIA gegen Chile. Unter Nixon flossen Millionen Dollar in chilenische Oppositionsparteien und -medien, um die Regierung zu destabilisieren.',
  },
  {
    id: 'henry-kissinger',
    name: 'Henry Kissinger',
    rolle: 'US-Außenminister',
    beschreibung:
      'Unterstützte Nixons Kurs aktiv. Koordinierte die US-Politik der unsichtbaren Wirtschaftsblockade und der politischen Destabilisierung Chiles.',
  },
  {
    id: 'john-connally',
    name: 'John Connally',
    rolle: 'US-Finanzminister',
    beschreibung:
      'Teil der US-Politik gegen Chile. Beteiligte sich an der Koordination der Finanzblockade, die internationale Kreditlinien für Chile abschnitt.',
  },
];

export const ORGANISATIONEN: Person[] = [
  {
    id: 'corfo',
    name: 'CORFO',
    rolle: 'Corporación de Fomento de la Producción',
    beschreibung:
      'Chilenische Wirtschaftsförderungsbehörde, zuständig für die Verstaatlichung der Wirtschaft. Hier arbeitete Fernando Flores, der das Projekt anstieß. CORFO war auch Empfänger der Alarmmeldungen aus dem Cybersyn-System.',
    bild: corfoImg,
  },
  {
    id: 'ecom',
    name: 'ECOM',
    rolle: 'Empresa de Computación e Informática de Chile',
    beschreibung:
      'Das nationale Computerzentrum Chiles. Besaß nur vier Großrechner – einer davon wurde für Cybersyn bereitgestellt. Fachleute übertrugen hier die Fernschreiberdaten auf Lochkarten und speisten sie in den Rechner ein.',
  },
  {
    id: 'entel',
    name: 'ENTEL',
    rolle: 'Nationales Telekommunikationsunternehmen',
    beschreibung:
      'Stellte 400 ungenutzte Fernschreiber (Telex) aus den 1960er Jahren bereit. Diese bildeten die technische Basis für das Netzwerk Cybernet. Die Technologie war einfach genug, um ohne große Hürden aufgebaut zu werden.',
  },
  {
    id: 'arthur-andersen',
    name: 'Arthur Andersen (London)',
    rolle: 'Unternehmensberatung',
    beschreibung:
      'Programmierte die vorläufige Cyberstride-Software als Machbarkeitsnachweis. Das chilenische Team entwickelte parallel die dauerhafte Version. Die Aufteilung diente der Kosten- und Zeitersparnis.',
  },
  {
    id: 'unidad-popular',
    name: 'Unidad Popular (UP)',
    rolle: 'Regierungsbündnis Allendes',
    beschreibung:
      'Bündnis linker chilenischer Parteien, das Allendes Regierungskoalition bildete. Trotz Minderheit im Parlament setzte die UP viele Reformen durch – darunter die Verstaatlichung des Kupferbergbaus, die von allen Parlamentsfraktionen einstimmig beschlossen wurde.',
  },
];

export const GLOSSAR: GlossarEintrag[] = [
  {
    id: 'kybernetik',
    term: 'Kybernetik',
    definition:
      'Wissenschaft der Steuerung und Kommunikation in Maschinen und Lebewesen, geprägt von Norbert Wiener 1948. Interdisziplinär – verbindet Ingenieurwesen, Biologie und Informatik. Kernidee: Systeme regulieren sich durch Feedback selbst.',
  },
  {
    id: 'managementkybernetik',
    term: 'Managementkybernetik',
    definition:
      'Beers Spezialgebiet: Anwendung kybernetischer Prinzipien auf die Leitung von Organisationen. Ziel war ein adaptives System, das schnell auf Veränderungen reagiert, statt starrer Hierarchie.',
  },
  {
    id: 'feedback',
    term: 'Feedback / Rückkopplung',
    definition:
      'Kernmechanik der Kybernetik: Daten werden laufend mit Sollwerten verglichen, das System darauf basierend angepasst und neu eingespeist. Cybersyn nutzte dieses Prinzip, um Produktionsabweichungen in Echtzeit zu erkennen.',
  },
  {
    id: 'bayessche-statistik',
    term: 'Bayessche Statistik',
    definition:
      'Statistische Methode, die Cyberstride einsetzte. Sie erkennt signifikante Abweichungen in Datenreihen und aktualisiert Wahrscheinlichkeitsschätzungen laufend. Ermöglichte Trendvorhersagen aus wenigen Datenpunkten.',
  },
  {
    id: 'synco',
    term: 'SYNCO',
    definition:
      'Spanischer Name für Cybersyn: „Sistema de Información y Control". Unter diesem Namen war das Projekt in Chile offiziell bekannt.',
  },
  {
    id: 'telex',
    term: 'Telex / Fernschreiber',
    definition:
      'Einfache, robuste Technik zur Text- und Datenübertragung über große Entfernungen. Die 400 ungenutzten ENTEL-Geräte bildeten die technische Basis für Cybernet. Vorteil: einfach genug, dass das Netz ohne große Hürden aufgebaut werden konnte.',
  },
  {
    id: 'interventors',
    term: 'Interventors',
    definition:
      'Staatliche Verwalter in den verstaatlichten Betrieben. Sie meldeten täglich Produktionsdaten per Fernschreiber an das Rechenzentrum ECOM – Kernglied im Datenfluss von Cybersyn.',
  },
  {
    id: 'freiheitsmaschine',
    term: 'Freiheitsmaschine',
    definition:
      'Beers ursprüngliche Bezeichnung für den Operations Room. Ein Werkzeug zur Dezentralisierung von Macht: nicht Kontrolle von oben, sondern Befähigung der Basis durch Informationszugang.',
  },
  {
    id: 'chilenischer-weg',
    term: 'Chilenischer Weg zum Sozialismus',
    definition:
      'Allendes Konzept eines demokratischen Sozialismus: Wandel durch Wahlen und Institutionen statt Revolution. Unterschied sich bewusst vom Modell der Sowjetunion und Kubas. Respekt vor Wahlergebnissen, Rechtsstaatlichkeit, Meinungs- und Pressefreiheit.',
  },
];
