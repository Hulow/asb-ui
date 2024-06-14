import './page.css';
import { config } from '../../../config/config';
import texts from '../../../data/texts.json';
import { Button } from '../../../components/Button/Button';
import { CustomLink } from '../../../components/Link/Link';
import { Measurements } from '../../../components/Measurement/Measurement';
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

  return (
    <main className='measurement flex-column-center'>
      <div className='measurement-header flex-center'>
        <div className='measurement-header-item'></div>
        <div className='measurement-header-item flex-center'>
          <h1>{texts.measurements}</h1>
        </div>
        <div className='measurement-header-item'>
          <div className='measurement-header-button'>
            <Button>
              <CustomLink href={'/'}>
                <h3>BACK</h3>
              </CustomLink>
            </Button>
          </div>
        </div>
      </div>
      <Measurements measurements={measurements} />
    </main>
  );
}

}
