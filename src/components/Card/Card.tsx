import { MappedCabinet } from '../../types/MappedCabinet';
import { CustomLink } from '../Link/Link';
import './Card.css';

export const Card = ({ cabinetContent }: { cabinetContent: MappedCabinet }) => {
  return (
    <CustomLink
      href={`cabinets/measurement/${cabinetContent.cabinet.uid}`}
      children={<CabinetCard cabinetContent={cabinetContent} />}
    />
  );
};

const CabinetCard = ({ cabinetContent }: { cabinetContent: MappedCabinet }) => {
  const { cabinet, drivers } = cabinetContent;
  return (
    <div className='card component'>
      <CardItem children={<h1>{cabinet.productName}</h1>} />
      <CardItem children={<h2>{cabinet.enclosureType}</h2>} />
      <CardItem
        customClassName='card-sub-items'
        children={drivers.map((driver: any, index: number) => {
          return (
            <CardItem
              key={index}
              children={
                <h3>
                  {driver.brandName} - {driver.productName}
                </h3>
              }
            />
          );
        })}
      />
    </div>
  );
};

const CardItem = ({
  children,
  customClassName,
}: {
  children: React.ReactNode;
  customClassName?: string;
}) => {
  const className = 'card-item';
  const customClassNames = customClassName
    ? className + customClassName
    : className;
  return <div className={customClassNames}>{children}</div>;
};
