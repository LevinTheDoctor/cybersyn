import { useState, useEffect } from 'react';
import { ToastProvider, Tabs, TabPanel, Button } from '@levin-the-doctor/simple-tailwind-ui';
import { Clock, Users, Moon, Sun } from 'lucide-react';
import { CybersynTimeline } from './components/CybersynTimeline';
import { FilterBar } from './components/FilterBar';
import { PersonsView } from './components/PersonsView';
import { DatenschutzModal } from './components/DatenschutzModal';
import type { Tag } from './types/timeline';

const TAB_ITEMS = [
  { id: 'timeline', label: 'Zeitstrahl', icon: Clock },
  { id: 'personen', label: 'Personen & Begriffe', icon: Users },
] as const;

function AppContent() {
  const [activeTab, setActiveTab] = useState('timeline');
  const [activeFilter, setActiveFilter] = useState<Tag | null>(null);
  const [darkMode, setDarkMode] = useState(false);
  const [datenschutzOpen, setDatenschutzOpen] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-900 transition-colors flex flex-col">
      <header className="border-b border-zinc-200 dark:border-zinc-700 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
              Projekt Cybersyn
            </h1>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              Chile 1970–1973 · Kybernetik im Dienst des Sozialismus
            </p>
          </div>
          <Button
            variant="ghost"
            color="neutral"
            size="sm"
            icon={darkMode ? Sun : Moon}
            iconPosition="only"
            onClick={() => setDarkMode((d) => !d)}
            aria-label={darkMode ? 'Hellen Modus aktivieren' : 'Dunklen Modus aktivieren'}
          />
        </div>
      </header>

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-6">
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
              <CybersynTimeline activeFilter={activeFilter} />
            </div>
          </TabPanel>
          <TabPanel id="personen">
            <div className="mt-6">
              <PersonsView />
            </div>
          </TabPanel>
        </Tabs>
      </main>

      <footer className="border-t border-zinc-200 dark:border-zinc-700 px-6 py-4 mt-auto">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-zinc-400 dark:text-zinc-500">
          <p>Inhalte nach: Eden Medina, „Kybernetischer Revolutionär", bpb.de (CC BY-NC-ND 3.0 DE)</p>
          <button
            onClick={() => setDatenschutzOpen(true)}
            className="underline hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors"
          >
            Datenschutz
          </button>
        </div>
      </footer>

      <DatenschutzModal open={datenschutzOpen} onClose={() => setDatenschutzOpen(false)} />
    </div>
  );
}

export default function App() {
  return (
    <ToastProvider>
      <AppContent />
    </ToastProvider>
  );
}
