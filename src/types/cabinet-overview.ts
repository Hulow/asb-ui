import { Cabinet } from './cabinet';
import { Driver } from './driver';

export interface CabinetOverview {
  cabinet: Cabinet;
  owner: Owner;
  drivers: Driver[];
}
