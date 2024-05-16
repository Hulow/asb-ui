import { Cabinet } from '../../types/measurements';
import './Speaker.css';

interface Properties {
  name: string;
  value: string | number;
}

export function Speaker({ props }: { props: Properties }) {
  return (
    <div className='flex-row'>
      <div className='speaker item'>
        <p>{props.name}</p>
      </div>
      <div className='speaker item'>
        <p>{props.value}</p>
      </div>
    </div>
  );
}

export function getCabinetProperties(cabinet: Cabinet): Properties[] {
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
