import { PersonCard } from './PersonCard';
import { PERSONEN, GEGENSPIELER } from '../data/personen';

interface PersonenTabViewProps {
  highlightedPersonId?: string | null;
}

export function PersonenTabView({ highlightedPersonId }: Readonly<PersonenTabViewProps>) {
  return (
    <div className="space-y-10">
      <section>
        <h2 className="mb-4 text-xl font-bold tracking-tight text-tinte dark:text-fiberglas">Schlüsselfiguren</h2>
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
        <h2 className="mb-1 text-xl font-bold tracking-tight text-tinte dark:text-fiberglas">Gegenspieler</h2>
        <p className="mb-4 text-sm text-tinte/60 dark:text-fiberglas/60">
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
