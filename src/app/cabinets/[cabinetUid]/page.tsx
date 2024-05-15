'use client';

import './page.css';
import { useEffect, useState } from 'react';
import { config } from '../../../config/config';
import { Measurement } from '../../../types/measurements';
import texts from '../../../data/texts.json';
import { Picture } from '../../../components/Picture/Picture';

interface Params {
  params: {
    cabinetUid: string;
  };
}

export default function MeasurementPage({ params }: Params) {
  const endpoint = config.endpoints.measurements;
  const [measurements, setMeasurements] = useState<Measurement | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetch(`${config.asbBaseUrl}${endpoint}/${params.cabinetUid}`, {
      method: 'get',
      headers: { Authorization: config.asbKeyUrl },
      cache: 'no-store',
    })
      .then((data) => data.json())
      .then((data) => {
        setLoading(false);
        setMeasurements(data);
      });
  }, [endpoint]);

  if (loading) {
    return <div></div>;
  }

  return (
    <main className='measurement flex-column-center'>
      <h1>{texts.measurements}</h1>
      <div className='flex-center'>
        <Picture height={400} width={500} src='cld-sample-5' />
        <div className='speaker-overview flex-column-center component'>
          <h1>Cabinet</h1>
          <div className='speaker-items'>
            <div className='speaker-item'>
              <div className='speaker-sub-item'>
                <p>Name</p>
              </div>
              <div className='speaker-sub-item'>
                <p>{measurements?.cabinet.productName}</p>
              </div>
            </div>
            <div className='speaker-item'>
              <div className='speaker-sub-item'>
                <p>Enclosure</p>
              </div>
              <div className='speaker-sub-item'>
                <p>{measurements?.cabinet.enclosureType}</p>
              </div>
            </div>
            <div className='speaker-item'>
              <div className='speaker-sub-item'>
                <p>Dimension</p>
              </div>
              <div className='speaker-sub-item'>
                <p>{measurements?.cabinet.dimension}</p>
              </div>
            </div>
            <div className='speaker-item'>
              <div className='speaker-sub-item'>
                <p>Year</p>
              </div>
              <div className='speaker-sub-item'>
                <p>{measurements?.cabinet.manufacturingYear}</p>
              </div>
            </div>
            <div className='speaker-item'>
              <div className='speaker-sub-item'>
                <p>Weight</p>
              </div>
              <div className='speaker-sub-item'>
                <p>{measurements?.cabinet.weight} Kg</p>
              </div>
            </div>
          </div>
        </div>
        {measurements?.drivers.map((driver) => {
          return (
            <div className='speaker-overview flex-column-center component'>
              <h1>Driver</h1>
              <div className='speaker-items'>
                <div className='speaker-item'>
                  <p>Manufacturer</p>
                  <p>{driver.brandName}</p>
                </div>
                <div className='speaker-item'>
                  <div className='speaker-sub-item'>
                    <p>Product</p>
                  </div>
                  <div className='speaker-sub-item'>
                    <p>{driver.productName}</p>
                  </div>
                </div>
                <div className='speaker-item'>
                  <div className='speaker-sub-item'>
                    <p>Type</p>
                  </div>
                  <div className='speaker-sub-item'>
                    <p>{driver.driverType}</p>
                  </div>
                </div>
                <div className='speaker-item'>
                  <div className='speaker-sub-item'>
                    <p>RMS</p>
                  </div>
                  <div className='speaker-sub-item'>
                    <p>{driver.continuousPowerHandling} W</p>
                  </div>
                </div>
                <div className='speaker-item'>
                  <div className='speaker-sub-item'>
                    <p>Diameter</p>
                  </div>
                  <div className='speaker-sub-item'>
                    <p>{driver.nominalDiameter} Inch</p>
                  </div>
                </div>
                <div className='speaker-item'>
                  <div className='speaker-sub-item'>
                    <p>Impedance</p>
                  </div>
                  <div className='speaker-sub-item'>
                    <p>{driver.nominalImpedance} Ohm</p>
                  </div>
                </div>
                <div className='speaker-item'>
                  <div className='speaker-sub-item'>
                    <p>Year</p>
                  </div>
                  <div className='speaker-sub-item'>
                    <p>{driver.manufacturingYear}</p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="flex-center">
        
      </div>
    </main>
  );
}