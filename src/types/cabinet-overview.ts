export interface CabinetOverview {
  cabinet: Cabinet;
  owner: Owner;
  drivers: Driver[];
}

interface Cabinet {
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

interface Owner {
  firstName: string;
  lastName: string;
  ownername: string;
  email: string;
  phoneNumber: string;
  city: string;
  description: string;
}

interface Driver {
  brandName: string;
  productName: string;
  driverType: string;
  manufacturingYear: number;
  nominalDiameter: number;
  nominalImpedance: number;
  continuousPowerHandling: number;
  cabinetUid: string;
}
