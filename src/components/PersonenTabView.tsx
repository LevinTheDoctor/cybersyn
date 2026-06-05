import { PersonCard } from './PersonCard';
import { PERSONEN, GEGENSPIELER } from '../data/personen';

interface PersonenTabViewProps {
  highlightedPersonId?: string | null;
}

export function PersonenTabView({ highlightedPersonId }: Readonly<PersonenTabViewProps>) {
  return (
    <div className="space-y-10">
      <section>
        <h2 className="text-xl font-semibold mb-4 text-zinc-900 dark:text-zinc-100">Schlüsselfiguren</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {PERSONEN.map((person) => (
            <PersonCard
              key={person.id}
              person={person}
              badgeLabel="Person"
              highlighted={highlightedPersonId === person.id}
            />
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-1 text-zinc-900 dark:text-zinc-100">Gegenspieler</h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-4">
          US-Akteure, die aktiv gegen Allendes Regierung arbeiteten
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {GEGENSPIELER.map((person) => (
            <PersonCard
              key={person.id}
              person={person}
              badgeLabel="Gegenspieler"
              highlighted={highlightedPersonId === person.id}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
