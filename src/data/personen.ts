import type { Person } from '../types/timeline';
import { allendeImg, beerImg, floresImg, wienerImg, corfoImg } from './images';

export const PERSONEN: Person[] = [
  {
    id: 'salvador-allende',
    name: 'Salvador Allende',
    rolle: 'Präsident von Chile (ab 1970)',
    beschreibung:
      'Erster demokratisch gewählter sozialistischer Präsident Chiles. Verfolgte den „chilenischen Weg zum Sozialismus" – einen sozialistischen Wandel mit friedlichen, demokratischen Mitteln. Starb am 11. September 1973 während des Militärputsches.',
    bild: allendeImg,
  },
  {
    id: 'stafford-beer',
    name: 'Stafford Beer',
    rolle: 'Britischer Kybernetiker, fachlicher Kopf von Cybersyn',
    beschreibung:
      'Pionier der Managementkybernetik. Wollte Unternehmen und Staat befähigen, sich schnell an Veränderungen anzupassen. Suchte ein Gleichgewicht zwischen zentraler und dezentraler Kontrolle. Entwarf die Idee einer „Freiheitsmaschine", aus der später der Operations Room wurde. Sprach von „Werkzeugen des Volkes".',
    bild: beerImg,
  },
  {
    id: 'fernando-flores',
    name: 'Fernando Flores',
    rolle: 'Chilenischer Ingenieur, später Generalsekretär der Regierung',
    beschreibung:
      'Holte Beer mit 28 Jahren nach Chile und stieß das Projekt an. Erkannte nach dem Oktoberstreik 1972 die politischen Grenzen der Technik. Wurde im August 1973 mit nur 30 Jahren Generalsekretär der Regierung.',
    bild: floresImg,
  },
  {
    id: 'norbert-wiener',
    name: 'Norbert Wiener',
    rolle: 'Mathematiker am MIT (theoretischer Hintergrund)',
    beschreibung:
      'Prägte 1948 die bekannte Definition der Kybernetik als Wissenschaft der „Regelung und Nachrichtenübertragung im Lebewesen und in der Maschine". Liefert den theoretischen Hintergrund für Cybersyn, war aber nicht am Projekt beteiligt.',
    bild: wienerImg,
  },
];

export const ORGANISATIONEN: Person[] = [
  {
    id: 'corfo',
    name: 'CORFO',
    rolle: 'Corporación de Fomento de la Producción',
    beschreibung:
      'Chilenische Wirtschaftsförderungsbehörde, zuständig für die Verstaatlichung der Wirtschaft. Hier arbeitete Fernando Flores, der das Projekt anstieß.',
    bild: corfoImg,
  },
  {
    id: 'ecom',
    name: 'ECOM',
    rolle: 'Empresa de Computación e Informática de Chile',
    beschreibung:
      'Das nationale Computerzentrum Chiles. Besaß nur vier Großrechner – einer davon wurde für Cybersyn bereitgestellt.',
  },
  {
    id: 'entel',
    name: 'ENTEL',
    rolle: 'Nationales Telekommunikationsunternehmen',
    beschreibung:
      'Stellte 400 ungenutzte Fernschreiber (Telex) aus den 1960er Jahren bereit. Diese bildeten die technische Basis für das Netzwerk Cybernet.',
  },
  {
    id: 'arthur-andersen',
    name: 'Arthur Andersen (London)',
    rolle: 'Unternehmensberatung',
    beschreibung:
      'Programmierte die vorläufige Cyberstride-Software als Machbarkeitsnachweis, während das chilenische Team die dauerhafte Version entwickelte.',
  },
];
