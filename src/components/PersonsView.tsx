import { PersonCard } from './PersonCard';
import { PERSONEN, ORGANISATIONEN } from '../data/personen';

const CYBERSYN_KOMPONENTEN = [
  { id: 'cybernet', name: 'Cybernet', rolle: 'Telex-Netzwerk', beschreibung: 'Datenkommunikation in nahezu Echtzeit zwischen Santiago und den Staatsbetrieben. Basis: 400 ungenutzte Fernschreiber (Telex) aus den 1960er Jahren, bereitgestellt von ENTEL. Reichte von Arica bis Punta Arenas.' },
  { id: 'cyberstride', name: 'Cyberstride', rolle: 'Statistiksoftware', beschreibung: 'Erkannte Abweichungen in Produktionsdaten via Bayesscher Statistik und sagte Trends vorher. Entwickelt gemeinsam von Arthur Andersen (London, Prototyp) und dem chilenischen Team (dauerhafte Version).' },
  { id: 'simulator', name: 'Wirtschaftssimulator', rolle: 'Planungswerkzeug', beschreibung: '„Versuchslabor" für langfristige Wirtschaftsstrategien. Ermöglichte es, Szenarien durchzuspielen, bevor Entscheidungen getroffen wurden.' },
  { id: 'opsroom', name: 'Operations Room (Opsroom)', rolle: 'Kontrollraum', beschreibung: 'Das symbolische Herzstück von Cybersyn. Menschzentriertes Designkonzept, das für die damalige Zeit wegweisend war. Allende besuchte den Prototyp persönlich Ende 1972.' },
];

export function PersonsView() {
  return (
    <div className="space-y-10">
      <section>
        <h2 className="text-xl font-semibold mb-4 text-zinc-900 dark:text-zinc-100">Schlüsselfiguren</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
          {PERSONEN.map((person) => (
            <PersonCard key={person.id} person={person} badgeLabel="Person" />
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-4 text-zinc-900 dark:text-zinc-100">Beteiligte Organisationen</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
          {ORGANISATIONEN.map((org) => (
            <PersonCard key={org.id} person={org} badgeLabel="Organisation" />
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-4 text-zinc-900 dark:text-zinc-100">Die vier Komponenten von Cybersyn</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
          {CYBERSYN_KOMPONENTEN.map((k) => (
            <PersonCard key={k.id} person={k} badgeLabel="Komponente" />
          ))}
        </div>
      </section>
    </div>
  );
}
