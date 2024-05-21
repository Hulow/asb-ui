import { CabinetOverview } from '../../types/cabinet-overview';
import { CustomLink } from '../Link/Link';
import './Card.css';

export const Card = ({
  cabinetContent,
}: {
  cabinetContent: CabinetOverview;
}) => {
  return (
    <CustomLink href={`measurements/${cabinetContent.cabinet.uid}`}>
      <CardContent cabinetContent={cabinetContent} />
    </CustomLink>
  );
};

const CardContent = ({
  cabinetContent,
}: {
  cabinetContent: CabinetOverview;
}) => {
  const { cabinet, drivers } = cabinetContent;
  return (
    <div className='card flex-column-center interaction'>
      <CardTitle>
        <h1>{cabinet.productName}</h1>
      </CardTitle>
      <CardItem>
        <h2>{cabinet.enclosureType}</h2>
      </CardItem>
      <CardItem>
        {drivers.map((driver: any, index: number) => {
          return (
            <CardSubItem key={index}>
              <p>
                {driver.brandName} - {driver.productName}
              </p>
            </CardSubItem>
          );
        })}
      </CardItem>
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
