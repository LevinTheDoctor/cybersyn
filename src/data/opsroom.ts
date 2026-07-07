/**
 * Die sechs Stationen des Opsroom-Nachbaus.
 * Neue Station hinzufügen: Eintrag ergänzen und in
 * src/components/opsroom/stations/index.ts eine Komponente registrieren.
 */
export interface OpsroomStation {
  id: string;
  name: string;
  /** Kurzbeschreibung fürs Panorama und die Stations-Kopfzeile */
  kurz: string;
  /** Historische Einordnung, wird im Stations-Detail angezeigt */
  text: string;
  quellenRefs: string[];
}

export const OPSROOM_STATIONEN: OpsroomStation[] = [
  {
    id: 'datafeed',
    name: 'Datafeed-Wand',
    kurz: 'Vier Screens in Fiberglas-Gehäusen zeigten Produktionsdaten, Flussdiagramme und Fabrikfotos.',
    text:
      'Die Hauptwand des Raums: vier Anzeigeflächen in geformten Fiberglas-Gehäusen, darüber ein Steuerbildschirm. Zu sehen waren Produktionskapazitäten, Flussdiagramme und Fabrikfotos. Der Trick dahinter: Es gab keine Computergrafik. Jedes „Display“ war ein von Hand gezeichnetes, fotografiertes Dia, das per Projektor von hinten eingeblendet wurde. Umgeschaltet wurde mit den großen Tasten in den Armlehnen der Sessel.',
    quellenRefs: ['medina-2011', 'vehlken-2022'],
  },
  {
    id: 'algedonik',
    name: 'Algedonische Alarme',
    kurz: 'Rote Warnlampen, die umso schneller blinkten, je dringender ein Problem wurde.',
    text:
      '„Algedonisch“ – aus dem Griechischen algos (Schmerz) und hedone (Freude): Signale, die nur melden, ob es einem Betrieb gut oder schlecht geht, ohne Details. Zwei Anzeigen zeigten rote Lampen, die mit steigender Dringlichkeit schneller blinkten. Entscheidend war die Eskalationslogik: Ein Betrieb bekam zuerst selbst Zeit, sein Problem zu lösen. Erst wenn ihm das nicht gelang, wanderte der Alarm eine Ebene höher – Dezentralisierung war eingebaut, keine Überwachung von oben.',
    quellenRefs: ['medina-2011', 'espejo-2022'],
  },
  {
    id: 'vsm',
    name: 'VSM-Wand',
    kurz: 'Beers Viable System Model als ständige Erinnerung an die kybernetischen Prinzipien.',
    text:
      'An einer Wand hing Stafford Beers Viable System Model (VSM) – das theoretische Rückgrat von Cybersyn. Es beschreibt, wie jedes lebensfähige System aus fünf Teilsystemen besteht, von den operativen Einheiten (System 1) bis zur obersten Politik (System 5). Die Wand sollte die Runde im Raum daran erinnern, nach welchen Prinzipien entschieden werden sollte: so viel Autonomie wie möglich, so viel Koordination wie nötig.',
    quellenRefs: ['espejo-2022', 'medina-2011'],
  },
  {
    id: 'futuro',
    name: 'Futuro (CHECO)',
    kurz: 'Der Wirtschaftssimulator: Zukunftsszenarien der chilenischen Ökonomie durchspielen.',
    text:
      'CHECO stand für „CHilean ECOnomy“ – im Team hieß die Wand schlicht „Futuro“, Zukunft. Hier sollten Simulationen der chilenischen Wirtschaft laufen: Was passiert, wenn wir mehr investieren? Was, wenn der Kupferpreis fällt? Das Modell wurde mit der Simulationssprache DYNAMO entwickelt, kam aber nie über Prototypen hinaus – die Datenlage war zu dünn und die Zeit zu kurz. Der Simulator blieb das unvollendetste Teilprojekt von Cybersyn.',
    quellenRefs: ['medina-2011'],
  },
  {
    id: 'magnetwand',
    name: 'Magnetwand',
    kurz: 'Mit Stoff bezogene Metallwand mit verschiebbaren Symbolen für Wirtschaftskomponenten.',
    text:
      'Die unscheinbarste Wand war ein Werkzeug zum Denken: eine mit Stoff bezogene Metallfläche, auf der magnetische Symbole für Komponenten der Wirtschaft saßen. Wer diskutierte, konnte die Teile umstecken, Verbindungen neu legen und Hypothesen sichtbar machen – ein analoges Modellierwerkzeug mitten im „Computer-Raum“. Auch das war Programm: Der Opsroom sollte Gespräche unterstützen, nicht ersetzen.',
    quellenRefs: ['medina-2011'],
  },
  {
    id: 'sessel',
    name: 'Die sieben Sessel',
    kurz: 'Drehbare Fiberglas-Sessel mit großen Tasten in der Armlehne – bewusst ohne Tastatur.',
    text:
      'Sieben drehbare Fiberglas-Sessel im Kreis, entworfen von der Designgruppe um Gui Bonsiepe am staatlichen Institut INTEC. Sieben, weil Beer kleine Gruppen für die besten Entscheidungen hielt. In den Armlehnen: große geometrische Tasten statt einer Tastatur – ganz bewusst, damit auch Menschen ohne Schreibmaschinen-Ausbildung das System bedienen konnten und keine Sekretärskultur entstand. Dazu gehörten ein Aschenbecher und eine Ablage für das Whiskyglas: Der Raum war zum Diskutieren gebaut.',
    quellenRefs: ['medina-2011', 'vehlken-2022'],
  },
];

export function stationById(id: string): OpsroomStation | undefined {
  return OPSROOM_STATIONEN.find((s) => s.id === id);
}
