# Projekt Cybersyn – Interaktive Wissensseite

Seite ist live unter: cybersyn-levin-dev.de

Interaktive Seite zum chilenischen Kybernetik-Projekt **Cybersyn** (1970–1973) unter Salvador
Allende — gestaltet nach dem Vorbild des originalen Operations Room von 1972 (Gui Bonsiepe / INTEC).

## Features

- **Zeitstrahl** — horizontal (Desktop) / vertikal (mobil), Filter nach Kategorie, Detail-Modals
- **Opsroom** — begehbarer SVG-Nachbau des hexagonalen Kontrollraums: 6 anklickbare Stationen
  mit funktionierenden Simulationen (Datafeed-Dias per Armlehnen-Tasten, algedonische Alarme,
  CHECO-Wirtschaftssimulator, Magnetwand zum Verschieben, Tulip-Sessel im Detail)
- **System** — animierte Diagramme: täglicher Datenfluss (Betrieb → Telex → ECOM → Cyberstride →
  Opsroom → Feedback), interaktives Viable System Model, Telex-Netzkarte Chiles mit
  Oktoberstreik-Simulation
- **Personen / Materialien** — Schlüsselfiguren, Gegenspieler, Allendes Reden im Volltext
- **Quellen** — echtes Literaturverzeichnis (aus Zotero übernommen) mit DOI-Links; überall auf
  der Seite verweisen `[Medina 2011]`-Chips direkt auf die Einträge
- **Zwei Modi** — „Opsroom" (dunkel, Standard) und „Archiv" (hell), Telex-Ticker im Header,
  `prefers-reduced-motion` wird respektiert

## Tech-Stack

- React 19 + Vite + TypeScript
- Tailwind CSS v4 (Design-Tokens der Opsroom-Palette via `@theme`)
- Chivo + IBM Plex Mono (selbst gehostet via Fontsource, DSGVO-konform)
- [`@levin-the-doctor/simple-tailwind-ui`](https://www.npmjs.com/package/@levin-the-doctor/simple-tailwind-ui) (Modal, Tabs, Toast)
- lucide-react

Alle Inhalte (Events, Personen, Quellen, Opsroom-Stationen, Diagramm-Knoten, Ticker) liegen als
typisierte Daten in `src/data/` — erweiterbar ohne Komponenten-Änderungen, Anleitung in
`Claude/CLAUDE.md`.

## Starten

```bash
npm install --legacy-peer-deps
npm run dev
```

Öffne anschließend http://localhost:5173.

```bash
npm run build   # Produktions-Build
npm run preview # Build lokal testen
```

## Quellenangabe

Inhaltliche Grundlage: Eden Medina, „Kybernetischer Revolutionär. Das Projekt Cybersyn und Technik im sozialistischen Chile", Bundeszentrale für politische Bildung (bpb.de).
Lizenz: CC BY-NC-ND 3.0 DE – Namensnennung, nicht-kommerziell, keine Bearbeitungen.
Vollständiges Literaturverzeichnis im Quellen-Tab der Seite (`src/data/quellen.ts`).
