export interface Frequency {
  uid: string;
  measuredBy: string;
  source: string;
  sweepLength: string;
  measuredAt: string;
  frequencyWeightings: string;
  targetLevel: string;
  note: string;
  smoothing: string;
  frequencies: number[];
  spls: number[];
  phases: number[];
  cabinetUid: string;
}
