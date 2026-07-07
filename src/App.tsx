import { useState, useEffect, useCallback } from 'react';
import { ToastProvider, Tabs, TabPanel } from '@levin-the-doctor/simple-tailwind-ui';
import { Clock, Armchair, Network, Users, FileText, Library, Moon, Sun } from 'lucide-react';
import { CybersynTimeline } from './components/CybersynTimeline';
import { FilterBar } from './components/FilterBar';
import { PersonenTabView } from './components/PersonenTabView';
import { OpsroomView } from './components/opsroom/OpsroomView';
import { SystemView } from './components/system/SystemView';
import { MaterialienView } from './components/MaterialienView';
import { QuellenView } from './components/QuellenView';
import { DatenschutzModal } from './components/DatenschutzModal';
import { TelexTicker } from './components/ui/TelexTicker';
import { QuellenNavContext } from './context/quellenNav';
import type { Tag } from './types/timeline';

const TAB_ITEMS = [
  { id: 'timeline', label: 'Zeitstrahl', icon: Clock },
  { id: 'opsroom', label: 'Opsroom', icon: Armchair },
  { id: 'system', label: 'System', icon: Network },
  { id: 'personen', label: 'Personen', icon: Users },
  { id: 'materialien', label: 'Materialien', icon: FileText },
  { id: 'quellen', label: 'Quellen', icon: Library },
] as const;

const MODUS_KEY = 'cybersyn-modus';

function AppContent() {
  const [activeTab, setActiveTab] = useState('timeline');
  const [activeFilter, setActiveFilter] = useState<Tag | null>(null);
  // Dark („Opsroom“) ist Standard; „Archiv“ wird in localStorage gemerkt
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem(MODUS_KEY) !== 'archiv');
  const [datenschutzOpen, setDatenschutzOpen] = useState(false);
  const [highlightedPersonId, setHighlightedPersonId] = useState<string | null>(null);
  const [highlightedQuelleId, setHighlightedQuelleId] = useState<string | null>(null);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
    localStorage.setItem(MODUS_KEY, darkMode ? 'opsroom' : 'archiv');
  }, [darkMode]);

  const handlePersonClick = useCallback((personId: string) => {
    setActiveTab('personen');
    setHighlightedPersonId(personId);
    const timeout = setTimeout(() => setHighlightedPersonId(null), 2500);
    return () => clearTimeout(timeout);
  }, []);

  const geheZuQuelle = useCallback((quelleId: string) => {
    setActiveTab('quellen');
    setHighlightedQuelleId(quelleId);
    const timeout = setTimeout(() => setHighlightedQuelleId(null), 2500);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <QuellenNavContext.Provider value={geheZuQuelle}>
      <div className="flex min-h-screen flex-col bg-fiberglas text-tinte transition-colors dark:bg-walnuss dark:text-fiberglas">
        <header className="border-b border-tinte/10 dark:border-bezel">
          <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-4">
            <div>
              <h1 className="text-2xl font-black uppercase tracking-[0.06em]">
                Projekt Cybersyn
              </h1>
              <p className="mt-0.5 font-mono text-[11px] uppercase tracking-[0.18em] text-tinte/50 dark:text-phosphor/70">
                Chile 1970–1973 · Kybernetik im Dienst des Sozialismus
              </p>
            </div>
            <button
              type="button"
              onClick={() => setDarkMode((d) => !d)}
              aria-label={darkMode ? 'Archiv-Modus (hell) aktivieren' : 'Opsroom-Modus (dunkel) aktivieren'}
              className="flex shrink-0 items-center gap-2 rounded-lg border border-tinte/20 px-3 py-2 font-mono text-[11px] uppercase tracking-[0.15em] text-tinte/60 transition-colors hover:border-signal hover:text-signal dark:border-fiberglas/25 dark:text-fiberglas/60"
            >
              {darkMode ? <Sun size={14} aria-hidden="true" /> : <Moon size={14} aria-hidden="true" />}
              <span className="hidden sm:inline">{darkMode ? 'Archiv' : 'Opsroom'}</span>
            </button>
          </div>
          <TelexTicker />
        </header>

        <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-6">
          <Tabs
            items={TAB_ITEMS}
            activeId={activeTab}
            onChange={setActiveTab}
            variant="default"
            size="full"
          >
            <TabPanel id="timeline">
              <div className="mt-6">
                <FilterBar activeFilter={activeFilter} onFilterChange={setActiveFilter} />
                <CybersynTimeline activeFilter={activeFilter} onPersonClick={handlePersonClick} />
              </div>
            </TabPanel>

            <TabPanel id="opsroom">
              <div className="mt-6">
                <OpsroomView onGeheZuSystem={() => setActiveTab('system')} />
              </div>
            </TabPanel>

            <TabPanel id="system">
              <div className="mt-6">
                <SystemView />
              </div>
            </TabPanel>

            <TabPanel id="personen">
              <div className="mt-6">
                <PersonenTabView highlightedPersonId={highlightedPersonId} />
              </div>
            </TabPanel>

            <TabPanel id="materialien">
              <div className="mt-6">
                <MaterialienView />
              </div>
            </TabPanel>

            <TabPanel id="quellen">
              <div className="mt-6">
                <QuellenView highlightedQuelleId={highlightedQuelleId} />
              </div>
            </TabPanel>
          </Tabs>
        </main>

        <footer className="mt-auto border-t border-tinte/10 px-6 py-4 dark:border-bezel">
          <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 text-xs text-tinte/50 dark:text-fiberglas/40 sm:flex-row">
            <p>Inhalte nach: Eden Medina, „Kybernetischer Revolutionär", bpb.de (CC BY-NC-ND 3.0 DE)</p>
            <button
              onClick={() => setDatenschutzOpen(true)}
              className="underline transition-colors hover:text-signal"
            >
              Datenschutz
            </button>
          </div>
        </footer>

        <DatenschutzModal open={datenschutzOpen} onClose={() => setDatenschutzOpen(false)} />
      </div>
    </QuellenNavContext.Provider>
  );
}

export default function App() {
  return (
    <ToastProvider>
      <AppContent />
    </ToastProvider>
  );
}
