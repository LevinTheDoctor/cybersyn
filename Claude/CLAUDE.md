# Projekt Cybersyn – Wissensdatenbank für Claude

Diese Datei liegt in `/Claude/` und dient als schnelle Orientierung für zukünftige Erweiterungen.
Hier stehen alle Konventionen, Datenmodelle und Muster, die im Projekt verwendet werden.

---

## Zweck der App

Interaktive Wissensseite zum chilenischen Kybernetik-Projekt Cybersyn (1970–1973): Zeitstrahl,
begehbarer Opsroom-Nachbau, System-Diagramme, Personen, Materialien und Literaturverzeichnis.
Gehostet via Cloudflare Pages. Keine Backend-Anbindung, rein statisch.

Bildungskontext: Wissenschaftsarbeit. Inhalte nach Eden Medina, „Kybernetischer Revolutionär",
bpb.de (CC BY-NC-ND 3.0 DE) – Quellennennung ist Pflicht. Levin nutzt die Seite als persönliche
Wissenssammlung: **alle Inhalte leben in `src/data/` und sind ohne Komponenten-Änderungen erweiterbar.**

---

## Tech-Stack

| Was | Womit |
|---|---|
| Framework | React 19 + Vite 8 + TypeScript 6 |
| Styling | Tailwind CSS v4 (`@import "tailwindcss"` in index.css, Design-Tokens via `@theme`) |
| UI-Komponenten | `@levin-the-doctor/simple-tailwind-ui` (nur noch Modal/Tabs/Toast) + eigene Panels |
| Fonts | `@fontsource-variable/chivo` (Display/Body), `@fontsource/ibm-plex-mono` (Daten/Captions) — selbst gehostet, DSGVO-konform |
| Icons | `lucide-react` |
| Build | `npm run dev` / `npm run build` / `npm run lint` |

**Tailwind v4-Besonderheit:** Kein `tailwind.config.js`. Konfiguration ausschließlich in CSS.
Die UI-Lib braucht `@source "../node_modules/@levin-the-doctor/simple-tailwind-ui/lib";` in
`src/index.css`, damit ihre Klassen generiert werden.

**npm install:** Immer `--legacy-peer-deps` verwenden (`.npmrc` enthält `legacy-peer-deps=true`).

---

## Design-System („Opsroom-Identität“)

Definiert als `@theme`-Tokens in `src/index.css` — abgeleitet vom echten Opsroom von 1972
(Gui Bonsiepe / INTEC): Holzwände, Fiberglas-Sessel, Signal-Orange, algedonisches Alarmrot.

| Token | Tailwind-Klasse | Hex | Verwendung |
|---|---|---|---|
| `--color-walnuss` | `bg-walnuss` | `#26201b` | Dark-Hintergrund (Holzwände) |
| `--color-panel` | `bg-panel` | `#393028` | Dark-Panelflächen |
| `--color-bezel` | `border-bezel` | `#4a4036` | Dark-Rahmen |
| `--color-fiberglas` | `bg-fiberglas` | `#efe7da` | Light-Hintergrund, Dark-Textfarbe |
| `--color-papier` | `bg-papier` | `#fbf7ee` | Light-Panelflächen |
| `--color-tinte` | `text-tinte` | `#2b241d` | Light-Textfarbe |
| `--color-signal` | `text-signal` | `#d96c2c` | Orange-Akzent, aktive Elemente |
| `--color-algedonik` | `text-algedonik` | `#e23b2e` | Nur Alarme/Krise |
| `--color-phosphor` | `text-phosphor` | `#8fc1b5` | „Live-Daten“, Screens |

**Typografie:** Chivo (`font-sans`, Standard) für alles; IBM Plex Mono (`font-mono`) für Daten,
Datumsangaben, Panel-Labels (versal + `tracking-[0.2em]`), Ticker, Zitationen.

**Modi:** Dark = Standard („Opsroom“), Light = „Archiv“. Toggle im Header, gemerkt in
`localStorage['cybersyn-modus']`. Klasse `dark` auf `<html>` (class-based, Custom-Variant in index.css).

**Animationen** (`@theme`-Keyframes): `animate-ticker` (Laufband), `animate-blink` (Alarmlampen),
`animate-flow` (SVG-Datenpulse via stroke-dashoffset), `animate-einblenden` (Stations-Zoom).
`prefers-reduced-motion` stoppt global alle Animationen (Regel am Ende von index.css).

---

## Projektstruktur

```
src/
├── App.tsx                        # Root: 6 Tabs, Dark-Default, Personen- & Quellen-Navigation
├── main.tsx                       # Einstieg + Font-Imports
├── index.css                      # Tailwind v4, @theme-Tokens, Keyframes, reduced-motion
│
├── context/
│   └── quellenNav.ts              # QuellenNavContext: geheZuQuelle(id) aus App.tsx
│
├── types/
│   └── timeline.ts                # TimelineEvent, Person, Tag, GlossarEintrag, Quelle
│
├── data/                          # ⭐ ALLE INHALTE — hier erweitern
│   ├── events.ts                  # 10 Zeitstrahl-Ereignisse (+ personRefs, quellenRefs)
│   ├── personen.ts                # PERSONEN, GEGENSPIELER, ORGANISATIONEN, GLOSSAR
│   ├── quellen.ts                 # Literaturverzeichnis (aus Zotero-Bib übernommen)
│   ├── opsroom.ts                 # Die 6 Opsroom-Stationen
│   ├── system.ts                  # Diagramm-Inhalte: FLOW_KNOTEN, VSM_EBENEN, NETZ_KNOTEN
│   ├── ticker.ts                  # Telex-Ticker-Meldungen (Header)
│   └── images.ts                  # Vite-Imports aller Bilder
│
├── components/
│   ├── ui/
│   │   ├── Panel.tsx              # Bezel-Card mit Mono-Label + Kontrolllampe
│   │   ├── QuelleRef.tsx          # [Medina 2011]-Chips + QuellenZeile (springen zum Quellen-Tab)
│   │   ├── TagChip.tsx            # Kategorie-Chip mit Farblampe
│   │   └── TelexTicker.tsx        # Laufband im Header
│   ├── opsroom/
│   │   ├── OpsroomView.tsx        # Tab: Intro-Panel + Panorama (Desktop) / Liste (mobil) + Detail
│   │   ├── OpsroomPanorama.tsx    # SVG-Innenansicht des Hexagons, 6 fokussierbare Hotspots
│   │   └── stations/              # index.ts = Registry Stations-ID → Komponente
│   │       ├── DatafeedStation    # 4 „Dias“ + Armlehnen-Tasten
│   │       ├── AlgedonikStation   # Krisen-Slider → Blinkfrequenz + Eskalation
│   │       ├── VsmStation         # Mini-VSM + Link zum System-Tab
│   │       ├── FuturoStation      # CHECO: 2 Regler → Projektion
│   │       ├── MagnetwandStation  # Verschiebbare Magnete (Pointer + Pfeiltasten)
│   │       └── SesselStation      # Tulip-Sessel mit 3 erklärten Hotspots
│   ├── system/
│   │   ├── SystemView.tsx         # Tab: 3 Diagramm-Panels + BegriffeView darunter
│   │   ├── SystemFlowDiagram.tsx  # Datenfluss Betrieb→…→Opsroom→Feedback (animiert, klickbar)
│   │   ├── VsmDiagram.tsx         # Interaktives VSM S1–S5 inkl. algedonischem Kanal
│   │   └── ChileNetzMap.tsx       # Telex-Karte mit Streik-Simulation (Toggle)
│   ├── CybersynTimeline.tsx       # Zeitstrahl (desktop horizontal / mobil vertikal)
│   ├── EventCard.tsx / EventDetailModal.tsx / FilterBar.tsx
│   ├── PersonCard.tsx / PersonenTabView.tsx
│   ├── BegriffeView.tsx           # Orgs + Komponenten + Glossar (im System-Tab eingebettet)
│   ├── MaterialienView.tsx        # Zwei Allende-Reden
│   ├── QuellenView.tsx            # Literaturverzeichnis, Sprungziel der QuelleRef-Chips
│   └── DatenschutzModal.tsx       # DSGVO-Text, öffnet aus Footer
│
├── utils/
│   └── colors.ts                  # farbeFuerTag() — 70er-Palette, immer hier ändern
│
└── assets/images/                 # Historische Bilder (Opsroom-Foto als JPG optimiert)
```

---

## Tab-Struktur (App.tsx)

| Tab-ID | Label | Icon | Komponente |
| --- | --- | --- | --- |
| `timeline` | Zeitstrahl | Clock | `CybersynTimeline` + `FilterBar` |
| `opsroom` | Opsroom | Armchair | `OpsroomView` |
| `system` | System | Network | `SystemView` (Diagramme + `BegriffeView`) |
| `personen` | Personen | Users | `PersonenTabView` |
| `materialien` | Materialien | FileText | `MaterialienView` |
| `quellen` | Quellen | Library | `QuellenView` |

---

## Datenmodell (`src/types/timeline.ts`)

```ts
interface TimelineEvent {
  id: string;            // slug, z.B. "1970-wahl-allendes"
  datum: string;
  titel: string;
  kurzText: string;      // 1–2 Sätze für die Karte
  text: string;          // Volltext fürs Modal
  tag: Tag;
  bild?: string;
  personRefs?: string[]; // IDs aus PERSONEN/GEGENSPIELER
  quellenRefs?: string[]; // IDs aus QUELLEN → Chips im Modal
}

type Tag = 'Politik' | 'Idee' | 'Aufbau' | 'Technik' | 'Krise' | 'Ende';

interface Quelle {
  id: string;            // z.B. "medina-2011"
  typ: 'buch' | 'artikel' | 'online' | 'video';
  kurz: string;          // Chip-Label, z.B. "Medina 2011"
  autor: string; titel: string; jahr: string;
  medium?: string; doi?: string; url?: string;
  embedId?: string;      // YouTube-ID → Video wird im Quellen-Tab eingebettet
  beschreibung?: string;
}
```

`Person` und `GlossarEintrag` unverändert (Glossar hat jetzt optional `quellenRefs`).

---

## Navigations-Muster

**Personen** (bestehend): Chip im `EventDetailModal` → `onPersonClick` → App setzt
`activeTab='personen'` + `highlightedPersonId` → `PersonCard` scrollt hin, Ring 2,5 s.

**Quellen** (neu, ohne Prop-Drilling): `QuellenNavContext` (`src/context/quellenNav.ts`) stellt
`geheZuQuelle(id)` app-weit bereit. `<QuelleRef quelleId="…"/>` oder
`<QuellenZeile quellenIds={[…]}/>` überall einsetzbar (Diagramme, Stationen, Modals).
Im `EventDetailModal` wird der Context lokal überschrieben, damit sich das Modal vorher schließt.

---

## Farb-Mapping (Tags)

Definiert in `src/utils/colors.ts` (70er-Töne, zur Opsroom-Palette passend). Immer hier ändern.

| Tag | Hex |
|---|---|
| Politik | `#4A7FB5` | Idee | `#8E6FAE` | Aufbau | `#5E8C61` |
| Technik | `#D9A13B` | Krise | `#E23B2E` | Ende | `#7A736A` |

---

## UI-Bibliothek: simple-tailwind-ui

Vollständige Doku in `Claude/simple-tailwind-ui.md`. Wird nur noch für **Modal, Tabs, Toast**
genutzt — Cards/Badges/Buttons sind durch eigene Komponenten (Panel, TagChip, styled buttons) ersetzt.

**Wichtige Gotchas:**
- `<Tabs size="full">` ist Pflicht – ohne `size="full"` setzt die Lib `max-w-md` auf den Container.
- `<TabPanel>` ist ein reines Fragment.
- `<Modal>` hat intern `overflow-hidden`: scrollbare Inhalte mit `overflow-y-auto max-h-[65vh]` wrappen.

---

## Neue Inhalte hinzufügen (⭐ Levins Wissenssammlung)

### Neues Zeitstrahl-Ereignis
1. Eintrag in `src/data/events.ts` nach bestehendem Muster
2. `tag` muss ein `Tag`-Wert sein; `personRefs`/`quellenRefs` optional

### Neue Quelle (Literaturverzeichnis)
1. Eintrag in `src/data/quellen.ts` anlegen (`id` + `kurz` vergeben)
2. Überall referenzieren mit `quellenRefs: ['<id>']` oder `<QuelleRef quelleId="<id>"/>`
3. Videos: `embedId` setzen → wird automatisch im Quellen-Tab eingebettet

### Neue Opsroom-Station
1. Datensatz in `src/data/opsroom.ts` ergänzen
2. Komponente unter `src/components/opsroom/stations/` anlegen
3. In `stations/index.ts` registrieren (`STATION_KOMPONENTEN`)
4. Optional: Hotspot im `OpsroomPanorama.tsx` einzeichnen (mobil erscheint sie automatisch in der Liste)

### Diagramm-Inhalte ändern
- Datenfluss-Knoten: `FLOW_KNOTEN` in `src/data/system.ts`
- VSM-Texte/Chile-Mapping: `VSM_EBENEN`
- Telex-Städte: `NETZ_KNOTEN` (Koordinaten im viewBox 0 0 260 840)

### Ticker-Meldung
1. Zeile in `src/data/ticker.ts` anhängen (Konvention: Versalien, keine Umlaute — Telex-Stil)

### Neue Person / Organisation / Glossar-Wort
Wie bisher in `src/data/personen.ts` (PERSONEN / GEGENSPIELER / ORGANISATIONEN / GLOSSAR).

### Neues Bild
1. Nach `src/assets/images/` legen (Fotos als JPG, Grafiken als PNG/SVG; > 500 KB vorher verkleinern)
2. In `src/data/images.ts` importieren/exportieren, dann als `bild:` referenzieren

### Neuer Tag
1. `src/types/timeline.ts`: Union-Type `Tag` erweitern
2. `src/utils/colors.ts`: `TAG_FARBEN` ergänzen
3. `src/components/FilterBar.tsx`: `ALLE_TAGS`-Array ergänzen

---

## Deployment

Cloudflare Pages. Build-Befehl: `npm run build`, Output-Verzeichnis: `dist`.
Datenschutz-Hinweis im Footer und `DatenschutzModal` sind gesetzlich erforderlich (DSGVO).
Fonts sind selbst gehostet (kein Google-CDN) — wichtig für die Datenschutzerklärung.
