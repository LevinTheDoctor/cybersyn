import { useEffect, useRef, useState } from 'react';
import { X } from 'lucide-react';
import { OPSROOM_STATIONEN, stationById } from '../../data/opsroom';
import { OpsroomPanorama } from './OpsroomPanorama';
import { STATION_KOMPONENTEN } from './stations';
import { Panel } from '../ui/Panel';
import { QuellenZeile } from '../ui/QuelleRef';

interface OpsroomViewProps {
  onGeheZuSystem?: () => void;
}

export function OpsroomView({ onGeheZuSystem }: Readonly<OpsroomViewProps>) {
  const [aktiveStation, setAktiveStation] = useState<string | null>(null);
  const detailRef = useRef<HTMLDivElement>(null);

  const station = aktiveStation ? stationById(aktiveStation) : null;
  const StationKomponente = aktiveStation ? STATION_KOMPONENTEN[aktiveStation] : null;

  useEffect(() => {
    if (aktiveStation && detailRef.current) {
      detailRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, [aktiveStation]);

  return (
    <div className="space-y-6">
      <Panel label="Der Raum" lampe="phosphor">
        <p className="max-w-3xl text-sm leading-relaxed text-tinte/80 dark:text-fiberglas/80">
          Ein hexagonaler Raum in Santiago, entworfen 1972–73 von der Designgruppe des staatlichen
          Instituts INTEC unter Gui Bonsiepe: sechs Wände voller Anzeigen, sieben Sessel im Kreis —
          und kein einziger Schreibtisch. Der Prototyp wurde nie in den Regelbetrieb übernommen;
          wenige Tage vor dem Putsch bat Allende noch, ihn in den Präsidentenpalast zu verlegen.
          Klicke auf eine Wand oder die Sessel, um die Station zu erkunden.
        </p>
        <QuellenZeile quellenIds={['medina-2011', 'vehlken-2022']} />
      </Panel>

      {/* Desktop: begehbares Panorama */}
      <div className="hidden md:block">
        <OpsroomPanorama aktiveStation={aktiveStation} onStationClick={setAktiveStation} />
      </div>

      {/* Mobil: Stationen als Liste */}
      <div className="grid gap-3 md:hidden">
        {OPSROOM_STATIONEN.map((s) => (
          <button
            key={s.id}
            type="button"
            onClick={() => setAktiveStation(s.id)}
            aria-pressed={aktiveStation === s.id}
            className={`rounded-xl border px-4 py-3 text-left transition-colors ${
              aktiveStation === s.id
                ? 'border-signal bg-signal/10'
                : 'border-tinte/15 bg-papier hover:border-signal dark:border-bezel dark:bg-panel'
            }`}
          >
            <span className="block font-mono text-[11px] uppercase tracking-[0.2em] text-signal">
              {s.name}
            </span>
            <span className="mt-1 block text-sm text-tinte/70 dark:text-fiberglas/70">{s.kurz}</span>
          </button>
        ))}
      </div>

      {/* Stations-Detail („Zoom“) */}
      {station && StationKomponente && (
        <div ref={detailRef} key={station.id} className="animate-einblenden">
          <Panel label={station.name} lampe={station.id === 'algedonik' ? 'algedonik' : 'signal'}>
            <div className="mb-4 flex items-start justify-between gap-4">
              <p className="max-w-3xl text-sm leading-relaxed text-tinte/80 dark:text-fiberglas/80">
                {station.text}
              </p>
              <button
                type="button"
                onClick={() => setAktiveStation(null)}
                aria-label="Station schließen"
                className="shrink-0 rounded-lg border border-tinte/20 p-1.5 text-tinte/50 transition-colors hover:border-signal hover:text-signal dark:border-fiberglas/25 dark:text-fiberglas/50"
              >
                <X size={16} />
              </button>
            </div>
            <StationKomponente onGeheZuSystem={onGeheZuSystem} />
            <QuellenZeile quellenIds={station.quellenRefs} />
          </Panel>
        </div>
      )}
    </div>
  );
}
