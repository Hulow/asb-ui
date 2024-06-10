import { Cabinet } from './cabinet';
import { Driver } from './driver';
import { Frequency } from './frequency';
import { Impedance } from './impedance';

export interface Measurement {
  cabinet: Cabinet;
  drivers: Driver[];
  frequency: Frequency;
  impedance: Impedance;
}
