import { CabinetOverview } from '../../types/cabinet-overview';
import { CustomLink } from '../Link/Link';
import './Card.css';

export const Card = ({
  cabinetContent,
}: {
  cabinetContent: CabinetOverview;
}) => {
  return (
    <CustomLink
      href={`cabinets/${cabinetContent.cabinet.uid}`}
      children={<CardContent cabinetContent={cabinetContent} />}
    />
  );
};

const CardContent = ({
  cabinetContent,
}: {
  cabinetContent: CabinetOverview;
}) => {
  const { cabinet, drivers } = cabinetContent;
  return (
    <div className='card flex-column-center component'>
      <CardTitle children={<h1>{cabinet.productName}</h1>} />
      <CardItem children={<h2>{cabinet.enclosureType}</h2>} />
      <CardItem
        children={drivers.map((driver: any, index: number) => {
          return (
            <CardSubItem
              key={index}
              children={
                <p>
                  {driver.brandName} - {driver.productName}
                </p>
              }
            />
          );
        })}
      />
    </div>
  );
};

const CardTitle = ({ children }: { children: React.ReactNode }) => {
  return <div className='card-title'>{children}</div>;
};

const CardItem = ({ children }: { children: React.ReactNode }) => {
  return <div className='card-item'>{children}</div>;
};

const CardSubItem = ({ children }: { children: React.ReactNode }) => {
  return <div className='card-sub-item'>{children}</div>;
};
