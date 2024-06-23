import '../../../styles/pages/measurement.scss';
import { config } from '../../../config/config';
import texts from '../../../data/texts.json';
import { Measurement } from '../../../types/measurement';
import { Button } from '../../../components/Button/Button';
import { CustomLink } from '../../../components/Link/Link';
import { Measurements } from '../../../components/Measurement/Measurement';
import { asbClient } from '../../../services/client';
import { CustomImage } from '../../../components/Image/Image';
import { Cabinet } from '../../../types/cabinet';
import { Driver } from '../../../types/driver';
import {
  Property,
  SpeakerItems,
} from '../../../components/SpeakerItems/SpeakerItems';

interface Params {
  params: {
    cabinetUid: string;
  };
}

export default async function MeasurementPage({ params }: Params) {
  const endpoint = config.endpoints.measurements;
  const measurements = await getMeasurements(
    `${config.asbBaseUrl}${endpoint}/${params.cabinetUid}`
  );

  const cabinetProps = getCabinetProperties(measurements.cabinet);
  const drivers = measurements.drivers;

  return (
    <main className='measurement flex-col-center'>
      <div className='flex-col-center'>
        <div className='header-item '>
          <p>{texts.measurements}</p>
        </div>
        <div className='header-item btn'>
          <Button>
            <CustomLink href={'/'}>
              <p>BACK</p>
            </CustomLink>
          </Button>
        </div>
      </div>
      <div className='overview'>
        <CustomImage src='cabinets/test_picture' />
        <div className='items'>
          <SpeakerItems title={texts.cabinet} props={cabinetProps} />
          {drivers.map((driver, index) => {
            const driverProps = getDriverProperties(driver);
            return (
              <SpeakerItems
                title={texts.driver}
                props={driverProps}
                key={index}
              />
            );
          })}
        </div>
      </div>
      <Measurements measurements={measurements} />
    </main>
  );
}

async function getMeasurements(endpoint: string): Promise<Measurement> {
  const response = await asbClient.get(endpoint);
  return response.data;
}

function getCabinetProperties(cabinet: Cabinet): Property[] {
  return [
    { name: texts.cabinetProps.productName, value: cabinet.productName },
    { name: texts.cabinetProps.type, value: cabinet.enclosureType },
    { name: texts.cabinetProps.dimension, value: cabinet.dimension },
    { name: texts.cabinetProps.weight, value: `${cabinet.weight} Kg` },
  ];
}

function getDriverProperties(driver: Driver): Property[] {
  return [
    { name: texts.driverProps.brandName, value: driver.brandName },
    { name: texts.driverProps.productName, value: driver.productName },
    { name: texts.driverProps.type, value: driver.driverType },
    {
      name: texts.driverProps.continuousPowerHandling,
      value: `${driver.continuousPowerHandling}W`,
    },
    {
      name: texts.driverProps.diameter,
      value: `${driver.nominalDiameter}″`,
    },
    {
      name: texts.driverProps.impedance,
      value: `${driver.nominalImpedance} Ω`,
    },
  ];
}
