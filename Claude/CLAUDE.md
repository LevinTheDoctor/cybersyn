# Projekt Cybersyn – Wissensdatenbank für Claude

Diese Datei liegt in `/Claude/` und dient als schnelle Orientierung für zukünftige Erweiterungen.
Hier stehen alle Konventionen, Datenmodelle und Muster, die im Projekt verwendet werden.

---

## Zweck der App

Interaktiver, responsiver Zeitstrahl zum chilenischen Kybernetik-Projekt Cybersyn (1970–1973).
Gehostet via Cloudflare Pages. Keine Backend-Anbindung, rein statisch.

Bildungskontext: Wissenschaftsarbeit. Inhalte nach Eden Medina, „Kybernetischer Revolutionär",
bpb.de (CC BY-NC-ND 3.0 DE) – Quellennennung ist Pflicht.

---

## Tech-Stack

| Was | Womit |
|---|---|
| Framework | React 19 + Vite 8 + TypeScript 6 |
| Styling | Tailwind CSS v4 (`@import "tailwindcss"` in index.css) |
| UI-Komponenten | `@levin-the-doctor/simple-tailwind-ui` |
| Icons | `lucide-react` |
| Build | `npm run dev` / `npm run build` |

**Tailwind v4-Besonderheit:** Kein `tailwind.config.js`. Konfiguration ausschließlich in CSS.
Die UI-Lib braucht `@source "../node_modules/@levin-the-doctor/simple-tailwind-ui/lib";` in
`src/index.css`, damit ihre Klassen generiert werden.

**Dark Mode:** Klasse `dark` auf `<html>` (class-based). Custom-Variant in index.css:
`@custom-variant dark (&:where(.dark, .dark *));`
Umschalter sitzt im Header (Moon/Sun-Icon).

**npm install:** Immer `--legacy-peer-deps` verwenden (`.npmrc` enthält `legacy-peer-deps=true`),
da `react-beautiful-timeline` noch `react@^18` als Peer erwartet, das Projekt aber React 19 nutzt.

---

## Projektstruktur

```
src/
├── App.tsx                        # Root: 5 Tabs, Dark-Mode, highlightedPersonId-Navigation
├── main.tsx                       # Einstiegspunkt
├── index.css                      # Tailwind v4 + @source für UI-Lib
│
├── types/
│   └── timeline.ts                # TimelineEvent (+ personRefs), Person, Tag, GlossarEintrag
│
├── data/
│   ├── events.ts                  # 10 Zeitstrahl-Ereignisse (kurzText + text + bild + personRefs)
│   ├── personen.ts                # PERSONEN, GEGENSPIELER, ORGANISATIONEN, GLOSSAR
│   └── images.ts                  # Vite-Imports aller Bilder aus src/assets/images/
│
├── components/
│   ├── CybersynTimeline.tsx       # Zeitstrahl (desktop horizontal / mobil vertikal)
│   ├── EventCard.tsx              # Karte im Zeitstrahl (kurzText, line-clamp-3, klickbar)
│   ├── EventDetailModal.tsx       # Modal mit Ereignis-Text + Bild + Personen-Chips
│   ├── FilterBar.tsx              # Tag-Filter-Leiste mit Toast-Feedback
│   ├── PersonCard.tsx             # Personen-/Organisations-Karte mit Bild + highlighted-Prop
│   ├── PersonenTabView.tsx        # Tab "Personen": Schlüsselfiguren + Gegenspieler
│   ├── BegriffeView.tsx           # Tab "Begriffe": Orgs + Komponenten + Glossar
│   ├── MaterialienView.tsx        # Tab "Materialien": zwei Allende-Reden (marxists.org)
│   ├── QuellenView.tsx            # Tab "Quellen": YouTube-Embeds + Artikellinks
│   └── DatenschutzModal.tsx       # DSGVO-Datenschutztext, öffnet aus Footer
│
├── utils/
│   └── colors.ts                  # farbeFuerTag() → CSS-Farbe, badgeColorFuerTag() → BadgeColor
│
└── assets/
    └── images/                    # Alle historischen Bilder (PNG)
        ├── SalvdorAllende.png
        ├── StraffordBeer.png
        ├── FernandoFlores.png
        ├── NorbertWeiner.png
        ├── CorforLogo.png
        ├── CyberSynOperatiosnRoom.png
        └── 119Sturz.png           # Bild vom Militärputsch 11.9.1973
```

---

## Tab-Struktur (App.tsx)

| Tab-ID | Label | Icon | Komponente |
| --- | --- | --- | --- |
| `timeline` | Zeitstrahl | Clock | `CybersynTimeline` + `FilterBar` |
| `personen` | Personen | Users | `PersonenTabView` |
| `begriffe` | Begriffe | BookOpen | `BegriffeView` |
| `materialien` | Materialien | FileText | `MaterialienView` |
| `quellen` | Quellen | ExternalLink | `QuellenView` |

---

## Datenmodell

### TimelineEvent (`src/types/timeline.ts`)

```ts
interface TimelineEvent {
  id: string;           // slug, z.B. "1970-wahl-allendes"
  datum: string;        // Anzeigedatum
  titel: string;
  kurzText: string;     // 1–2 Sätze für die Karte im Zeitstrahl
  text: string;         // Volltext für das Detail-Modal
  tag: Tag;
  bild?: string;        // URL aus Vite-Import (optional)
  personRefs?: string[]; // IDs aus PERSONEN/GEGENSPIELER für Chips im Modal
}

type Tag = 'Politik' | 'Idee' | 'Aufbau' | 'Technik' | 'Krise' | 'Ende';
```

### Person (`src/types/timeline.ts`)

```ts
interface Person {
  id: string;
  name: string;
  rolle: string;
  beschreibung: string;
  bild?: string;    // URL aus Vite-Import (optional)
}
```

### GlossarEintrag (`src/types/timeline.ts`)

```ts
interface GlossarEintrag {
  id: string;
  term: string;
  definition: string;
}
```

---

## Personen-Navigation (Timeline → Personen-Tab)

Wenn im `EventDetailModal` ein Personen-Chip geklickt wird:

1. Modal schließt sich (`onClose()`)
2. `onPersonClick(personId)` wird nach oben an `App.tsx` weitergegeben
3. `App.tsx` setzt `activeTab = 'personen'` und `highlightedPersonId = personId`
4. `PersonenTabView` gibt `highlighted={highlightedPersonId === person.id}` an `PersonCard` weiter
5. `PersonCard` scrollt via `useEffect` + `ref.scrollIntoView()` zur Karte und zeigt blauem Ring
6. Nach 2,5 Sekunden löscht `App.tsx` das Highlight automatisch

---

## Farb-Mapping (Tags)

Definiert in `src/utils/colors.ts`. Immer hier ändern, nie inline.

| Tag | Dot-Farbe (hex) | Badge-Farbe |
|---|---|---|
| Politik | `#3B82F6` (blau) | `info` |
| Idee | `#A855F7` (lila) | `neutral` |
| Aufbau | `#22C55E` (grün) | `success` |
| Technik | `#F59E0B` (gelb) | `warning` |
| Krise | `#EF4444` (rot) | `error` |
| Ende | `#6B7280` (grau) | `neutral` |

---

## UI-Bibliothek: simple-tailwind-ui

Vollständige Doku in `Claude/simple-tailwind-ui.md`.

**Wichtige Gotchas:**
- `<Tabs size="full">` ist Pflicht – ohne `size="full"` setzt die Lib `max-w-md` (448px) auf
  den gesamten Container und alles wird abgeschnitten.
- `<TabPanel>` ist ein reines Fragment – keine eigenen Styles, keine Overflow-Beschränkung.
- `<Modal>` hat intern `overflow-hidden` **und keinen eigenen Scroll-Container**. Für scrollbare
  Modal-Inhalte den Kindbereich mit `overflow-y-auto max-h-[65vh]` wrappen – nie den Modal
  selbst versuchen zu überschreiben.
- `<Badge>` erhält Text als `children`, nicht als `label`-Prop (abweichend von mancher Doku).

---

## Zeitstrahl-Architektur

### Desktop (≥ md = 768px)
- `hidden md:block` Wrapper
- `overflow-x-auto pt-3 pb-4` Scroll-Container (`pt-3` gibt Dots Platz beim Hover-Scale)
- Inneres Flex-Div: feste Breite `events.length * 260px`
- Horizontale Linie: `absolute top-[7px]` relativ zum inneren Div
- Jede Spalte: `w-[260px]`, `<button type="button">` → Dot → Datum → EventCard von oben nach unten
- Rechts-Fade-Overlay (`pointer-events-none`) zeigt Scrollbarkeit an

### Mobil (< md)
- `md:hidden` Wrapper
- Vertikale Linie links (`absolute left-3`)
- Dots: `<button type="button" aria-label="…">` mit `absolute -left-5`, Datum + Karte rechts

### Klick-Interaktion
- `CybersynTimeline` hält `selectedEvent: TimelineEvent | null`
- Klick öffnet `<EventDetailModal>` mit `onPersonClick`-Callback
- Dot-Hover: `hover:scale-125` mit `transition-transform`

---

## Neue Inhalte hinzufügen

### Neues Zeitstrahl-Ereignis
1. Eintrag in `src/data/events.ts` nach dem Muster der bestehenden Events anlegen
2. `tag` muss ein bestehender `Tag`-Wert sein (sonst TypeScript-Fehler)
3. `kurzText`: 1–2 Sätze für die Karte
4. `text`: vollständiger Absatz für das Modal
5. `bild`: optional – Bild nach `src/assets/images/` kopieren, in `src/data/images.ts`
   importieren und hier referenzieren
6. `personRefs`: optional – Array mit IDs aus `PERSONEN` oder `GEGENSPIELER`

### Neue Person / Organisation

1. `PERSONEN`, `GEGENSPIELER` oder `ORGANISATIONEN` in `src/data/personen.ts` erweitern
2. Bild optional wie oben beschrieben

### Neues Glossar-Wort

1. Eintrag in `GLOSSAR`-Array in `src/data/personen.ts` anlegen

### Neues Bild
1. PNG nach `src/assets/images/` kopieren
2. In `src/data/images.ts` als Named Export importieren:
   ```ts
   import meinBildImg from '../assets/images/MeinBild.png';
   export { meinBildImg };
   ```
3. In `events.ts` oder `personen.ts` als `bild: meinBildImg` verwenden

### Neuen Tag hinzufügen
1. `src/types/timeline.ts`: Union-Type `Tag` erweitern
2. `src/utils/colors.ts`: beide Maps (`TAG_FARBEN`, `TAG_BADGE_FARBEN`) ergänzen
3. `src/components/FilterBar.tsx`: `ALLE_TAGS`-Array und `buttonColor`-Map ergänzen

---

## Deployment

Cloudflare Pages. Build-Befehl: `npm run build`, Output-Verzeichnis: `dist`.
Datenschutz-Hinweis im Footer und `DatenschutzModal` sind gesetzlich erforderlich (DSGVO).
