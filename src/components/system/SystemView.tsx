import { Panel } from '../ui/Panel';
import { QuellenZeile } from '../ui/QuelleRef';
import { SystemFlowDiagram } from './SystemFlowDiagram';
import { VsmDiagram } from './VsmDiagram';
import { ChileNetzMap } from './ChileNetzMap';
import { BegriffeView } from '../BegriffeView';

/** System-Tab: die drei Diagramme, darunter Organisationen, Komponenten und Glossar */
export function SystemView() {
  return (
    <div className="space-y-6">
      <Panel label="Signalweg der Daten" lampe="phosphor">
        <SystemFlowDiagram />
      </Panel>

      <Panel label="Das Denkmodell: Viable System Model">
        <VsmDiagram />
        <QuellenZeile quellenIds={['espejo-2022', 'medina-2011']} />
      </Panel>

      <Panel label="Cybernet: Das Telex-Netz">
        <ChileNetzMap />
        <QuellenZeile quellenIds={['medina-2011', 'medina-bpb-2023']} />
      </Panel>

      <BegriffeView />
    </div>
  );
}
