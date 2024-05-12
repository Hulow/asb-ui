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
      href={`cabinets/measurement/${cabinetContent.cabinet.uid}`}
      children={<CabinetCard cabinetContent={cabinetContent} />}
    />
  );
};

const CabinetCard = ({
  cabinetContent,
}: {
  cabinetContent: CabinetOverview;
}) => {
  const { cabinet, drivers } = cabinetContent;
  return (
    <div className='card flex-column-center component'>
      <CardItem children={<h1>{cabinet.productName}</h1>} />
      <CardItem children={<h2>{cabinet.enclosureType}</h2>} />
      <CardItem
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

const CardItem = ({ children }: { children: React.ReactNode }) => {
  return <div className='card-item flex-column-center'>{children}</div>;
};
