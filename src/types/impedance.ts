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
