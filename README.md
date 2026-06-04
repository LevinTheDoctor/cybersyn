# Projekt Cybersyn – Interaktiver Zeitstrahl

Responsiver Zeitstrahl zum chilenischen Kybernetik-Projekt **Cybersyn** (1970–1973) unter Salvador Allende.

- **Desktop:** horizontaler Zeitstrahl
- **Mobil (< 768 px):** vertikaler Zeitstrahl
- Filter nach Kategorie (Politik, Idee, Aufbau, Technik, Krise, Ende)
- Personen- und Organisations-Übersicht
- Dark Mode (Umschalter oben rechts)

## Tech-Stack

- React 19 + Vite + TypeScript
- Tailwind CSS v4
- [`@levin-the-doctor/simple-tailwind-ui`](https://www.npmjs.com/package/@levin-the-doctor/simple-tailwind-ui) (Card, Badge, Button, Tabs, Toast)
- [`react-beautiful-timeline`](https://www.npmjs.com/package/react-beautiful-timeline)
- lucide-react

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
