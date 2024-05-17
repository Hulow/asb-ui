import { Cabinet, Driver } from '../../types/measurements';
import './Speaker.css';

interface Property {
  name: string;
  value: string | number;
}

export function Speakers({
  title,
  props,
}: {
  title: string;
  props: Property[];
}) {
  return (
    <div className='speakers-props flex-column-center component'>
      <h1>{title}</h1>
      <div className='speaker-props'>
        {props.map((prop) => {
          return <Speaker prop={prop} />;
        })}
      </div>
    </div>
  );
}

export function Speaker({ prop }: { prop: Property }) {
  return (
    <div className='flex-row'>
      <div className='speaker item'>
        <p>{prop.name}</p>
      </div>
      <div className='speaker item'>
        <p>{prop.value}</p>
      </div>
    </div>
  );
}

export function getCabinetProperties(cabinet: Cabinet): Property[] {
  return [
    {
      name: 'Name',
      value: cabinet.productName,
    },
    {
      name: 'Enclosure',
      value: cabinet.enclosureType,
    },
    {
      name: 'Dimension',
      value: cabinet.dimension,
    },
    {
      name: 'Year',
      value: cabinet.manufacturingYear,
    },
    {
      name: 'Weight',
      value: `${cabinet.weight} Kg`,
    },
  ];
}

export function getDriverProperties(driver: Driver): Property[] {
  return [
    {
      name: 'Manufacturer',
      value: driver.brandName,
    },
    {
      name: 'Product',
      value: driver.productName,
    },
    {
      name: 'Type',
      value: driver.driverType,
    },
    {
      name: 'RMS',
      value: `${driver.continuousPowerHandling} W`,
    },
    {
      name: 'Diameter',
      value: `${driver.nominalDiameter} Inches`,
    },
    {
      name: 'Impedance',
      value: `${driver.nominalImpedance} Ohms`,
    },
    {
      name: 'Year',
      value: driver.manufacturingYear,
    },
  ];
}
