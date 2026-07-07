import { createContext } from 'react';

/**
 * Navigation zu Quellen von überall aus (Diagramme, Opsroom-Stationen,
 * Modals): App.tsx stellt geheZuQuelle bereit — analog zur bestehenden
 * Personen-Verlinkung, nur ohne Prop-Drilling durch alle Ebenen.
 */
export const QuellenNavContext = createContext<(quelleId: string) => void>(() => {});
