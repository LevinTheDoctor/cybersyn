import type { ComponentType } from 'react';
import { DatafeedStation } from './DatafeedStation';
import { AlgedonikStation } from './AlgedonikStation';
import { VsmStation } from './VsmStation';
import { FuturoStation } from './FuturoStation';
import { MagnetwandStation } from './MagnetwandStation';
import { SesselStation } from './SesselStation';

export interface StationProps {
  onGeheZuSystem?: () => void;
}

/**
 * Registry: Stations-ID (src/data/opsroom.ts) → interaktive Komponente.
 * Neue Station: Datensatz ergänzen + Komponente hier eintragen.
 */
export const STATION_KOMPONENTEN: Record<string, ComponentType<StationProps>> = {
  datafeed: DatafeedStation,
  algedonik: AlgedonikStation,
  vsm: VsmStation,
  futuro: FuturoStation,
  magnetwand: MagnetwandStation,
  sessel: SesselStation,
};
