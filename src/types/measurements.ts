export interface Measurement {
  cabinet: Cabinet;
  drivers: Driver[];
  frequency: Frequency;
  impedance: Impedance;
}

export interface Cabinet {
  uid: string;
  brandName: string;
  productName: string;
  enclosureType: string;
  weight: number;
  dimension: string;
  manufacturingYear: number;
  description: string;
  ownerUid: string;
}

export interface Driver {
  uid: string;
  brandName: string;
  productName: string;
  driverType: string;
  manufacturingYear: number;
  nominalDiameter: number;
  nominalImpedance: number;
  continuousPowerHandling: number;
  cabinetUid: string;
}

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

export interface Impedance {
  uid: string;
  source: string;
  pistonDiameter: string;
  resonanceFrequency: string;
  dcResistance: string;
  acResistance: string;
  mechanicalDamping: string;
  electricalDamping: string;
  totalDamping: string;
  equivalenceCompliance: string;
  voiceCoilInductance: string;
  efficiency: string;
  sensitivity: string;
  coneMass: string;
  suspensionCompliance: string;
  forceFactor: string;
  kR: string;
  xR: string;
  kI: string;
  xI: string;
  cabinetUid: string;
  frequencies: number[];
  impedances: number[];
  phases: number[];
}
