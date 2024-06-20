import { CabinetOverview } from '../../types/cabinet-overview';
import { CustomLink } from '../Link/Link';
import '../../styles/components/card.scss';

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
      <div className='card-title'>
        <p>{cabinet.productName}</p>
      </div>
      <div className='card-item'>
        <p>{cabinet.enclosureType}</p>
      </div>
      <div className='card-item'>
        {drivers.map((driver: any, index: number) => {
          return (
            <div className='card-sub-item' key={index}>
              <p>
                {driver.brandName} - {driver.productName}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
