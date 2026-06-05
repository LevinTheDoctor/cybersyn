import { ExternalLink } from 'lucide-react';

const ARTIKEL = [
  {
    id: 'bpb-medina',
    titel: 'Die Kybernetische Revolution und das Projekt Cybersyn',
    autor: 'Eden Medina',
    erschienen: 'Bundeszentrale für politische Bildung (bpb), APuZ Chile 2023',
    beschreibung:
      'Wissenschaftlicher Artikel der Historikerin Eden Medina, die das Standardwerk zu Cybersyn verfasst hat. Erklärt den historischen Kontext, die Entwicklung des Projekts und seine Bedeutung im Spannungsfeld von Technologie, Politik und Sozialismus.',
    url: 'https://www.bpb.de/shop/zeitschriften/apuz/chile-2023/539264/die-kybernetische-revolution-und-das-projekt-cybersyn/',
  },
];

const VIDEOS = [
  {
    id: 'wohlstand-fuer-alle',
    titel: 'Wohlstand für alle – Projekt Cybersyn',
    kanal: 'YouTube',
    beschreibung:
      'Dokumentarischer Überblick über das Projekt Cybersyn: Hintergrund, Aufbau und historische Bedeutung des kybernetischen Experiments in Chile.',
    embedId: 'LaDkqLSWHrM',
  },
  {
    id: 'interview-medina',
    titel: 'Interview mit Eden Medina',
    kanal: 'YouTube',
    beschreibung:
      'Eden Medina im Gespräch über ihre Forschung zu Cybersyn, die Geschichte des Projekts und was es heute noch bedeutet.',
    embedId: '6Qrw51WPtkk',
  },
];

export function QuellenView() {
  return (
    <div className="space-y-10">
      <section>
        <h2 className="text-xl font-semibold mb-4 text-zinc-900 dark:text-zinc-100">Artikel</h2>
        <div className="space-y-4">
          {ARTIKEL.map((artikel) => (
            <a
              key={artikel.id}
              href={artikel.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-5 py-4 hover:border-blue-400 dark:hover:border-blue-500 hover:shadow-sm transition-all group"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {artikel.titel}
                  </h3>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">{artikel.autor} · {artikel.erschienen}</p>
                  <p className="text-sm text-zinc-600 dark:text-zinc-300 mt-2 leading-relaxed">
                    {artikel.beschreibung}
                  </p>
                </div>
                <ExternalLink size={16} className="flex-shrink-0 text-zinc-400 group-hover:text-blue-500 mt-1 transition-colors" />
              </div>
            </a>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-4 text-zinc-900 dark:text-zinc-100">Videos</h2>
        <div className="space-y-8">
          {VIDEOS.map((video) => (
            <div key={video.id} className="space-y-3">
              <div>
                <h3 className="font-semibold text-zinc-900 dark:text-zinc-100">{video.titel}</h3>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-0.5">{video.kanal}</p>
                <p className="text-sm text-zinc-600 dark:text-zinc-300 mt-1">{video.beschreibung}</p>
              </div>
              <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                <iframe
                  className="absolute inset-0 w-full h-full rounded-xl"
                  src={`https://www.youtube.com/embed/${video.embedId}`}
                  title={video.titel}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
