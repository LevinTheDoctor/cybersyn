import { Modal } from '@levin-the-doctor/simple-tailwind-ui';

interface DatenschutzModalProps {
  open: boolean;
  onClose: () => void;
}

export function DatenschutzModal({ open, onClose }: DatenschutzModalProps) {
  return (
    <Modal open={open} onClose={onClose} title="Datenschutzerklärung" size="lg">
      <div className="max-h-[60vh] overflow-y-auto pr-2 space-y-5 text-sm text-zinc-700 dark:text-zinc-300">
        <p>
          Diese Dokumentationsseite wird über Cloudflare Pages gehostet. Beim Aufruf der Seite
          werden technische Daten durch Cloudflare verarbeitet.
        </p>

        <section className="space-y-1">
          <h3 className="font-semibold text-zinc-900 dark:text-zinc-100">Verantwortlicher</h3>
          <p>Levin Rüßmann · levin13c@gmail.com</p>
        </section>

        <section className="space-y-2">
          <h3 className="font-semibold text-zinc-900 dark:text-zinc-100">Cloudflare (Hosting &amp; CDN)</h3>
          <p>
            Cloudflare, Inc., 101 Townsend St., San Francisco, CA 94107, USA, verarbeitet beim
            Besuch dieser Seite automatisch folgende Daten zur Auslieferung der Inhalte und zum
            Schutz vor Missbrauch:
          </p>
          <ul className="list-disc list-inside space-y-1 pl-2">
            <li>IP-Adresse des anfragenden Geräts</li>
            <li>Browsertyp, Betriebssystem, Referrer-URL</li>
            <li>Datum, Uhrzeit und aufgerufene URL</li>
          </ul>
          <p>
            Diese Daten werden von Cloudflare für Routing, DDoS-Schutz und
            Performance-Optimierung verarbeitet. Cloudflare kann dabei Cloudflare Workers
            einsetzen, um Anfragen serverseitig zu verarbeiten.
          </p>
          <p>
            Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an einer
            sicheren und performanten Bereitstellung der Website). Eine Weitergabe dieser Daten
            an uns erfolgt nicht.
          </p>
          <p>
            Datenschutzerklärung von Cloudflare:{' '}
            <a
              href="https://www.cloudflare.com/privacypolicy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-600 dark:text-indigo-400 underline hover:no-underline"
            >
              cloudflare.com/privacypolicy
            </a>
          </p>
        </section>

        <section className="space-y-1">
          <h3 className="font-semibold text-zinc-900 dark:text-zinc-100">Cookies &amp; Tracking</h3>
          <p>
            Diese Seite setzt selbst keine Cookies und verwendet kein Tracking oder
            Analyse-Tools. Cloudflare kann technisch notwendige Cookies setzen (z.&nbsp;B. für
            Bot-Erkennung).
          </p>
        </section>

        <section className="space-y-1">
          <h3 className="font-semibold text-zinc-900 dark:text-zinc-100">Ihre Rechte</h3>
          <p>
            Sie haben das Recht auf Auskunft, Berichtigung, Löschung sowie Einschränkung der
            Verarbeitung Ihrer personenbezogenen Daten. Anfragen richten Sie bitte an{' '}
            <a
              href="mailto:levin13c@gmail.com"
              className="text-indigo-600 dark:text-indigo-400 underline hover:no-underline"
            >
              levin13c@gmail.com
            </a>
            .
          </p>
        </section>
      </div>
    </Modal>
  );
}
