import { PersonCard } from './PersonCard';
import { ORGANISATIONEN, GLOSSAR } from '../data/personen';

const CYBERSYN_KOMPONENTEN = [
  {
    id: 'cybernet',
    name: 'Cybernet',
    rolle: 'Telex-Netzwerk',
    beschreibung:
      'Datenkommunikation in nahezu Echtzeit zwischen Santiago und den Staatsbetrieben. Basis: 400 ungenutzte Fernschreiber aus den 1960er Jahren, bereitgestellt von ENTEL. Reichte von Arica im Norden bis Punta Arenas im Süden – rund 5.152 km.',
  },
  {
    id: 'cyberstride',
    name: 'Cyberstride',
    rolle: 'Statistiksoftware',
    beschreibung:
      'Erkannte Abweichungen in Produktionsdaten via Bayesscher Statistik und sagte Trends vorher. Entwickelt von Arthur Andersen (London, Prototyp) und dem chilenischen Team (dauerhafte Version).',
  },
  {
    id: 'simulator',
    name: 'Wirtschaftssimulator',
    rolle: 'Planungswerkzeug',
    beschreibung:
      '„Versuchslabor der Regierung" für langfristige Wirtschaftsstrategien. Ermöglichte es, Szenarien durchzuspielen, bevor Entscheidungen getroffen wurden.',
  },
  {
    id: 'opsroom',
    name: 'Operations Room (Opsroom)',
    rolle: 'Kontrollraum',
    beschreibung:
      'Das symbolische Herzstück von Cybersyn. Sieben Sessel im Kreis, Projektionsflächen, Steuerknöpfe in den Armlehnen. Menschzentriertes Designkonzept – für die damalige Zeit wegweisend. Allende besuchte den Prototyp persönlich Ende 1972.',
  },
];

export function BegriffeView() {
  return (
    <div className="space-y-10">
      <section>
        <h2 className="text-xl font-semibold mb-4 text-zinc-900 dark:text-zinc-100">Beteiligte Organisationen</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {ORGANISATIONEN.map((org) => (
            <PersonCard key={org.id} person={org} badgeLabel="Organisation" />
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-4 text-zinc-900 dark:text-zinc-100">Die vier Komponenten von Cybersyn</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {CYBERSYN_KOMPONENTEN.map((k) => (
            <PersonCard key={k.id} person={k} badgeLabel="Komponente" />
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-4 text-zinc-900 dark:text-zinc-100">Glossar</h2>
        <div className="grid grid-cols-1 gap-3">
          {GLOSSAR.map((eintrag) => (
            <div
              key={eintrag.id}
              className="rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-5 py-4"
            >
              <dt className="font-semibold text-zinc-900 dark:text-zinc-100 mb-1">{eintrag.term}</dt>
              <dd className="text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">{eintrag.definition}</dd>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
