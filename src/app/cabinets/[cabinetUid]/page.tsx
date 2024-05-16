'use client';

import './page.css';
import { useEffect, useState } from 'react';
import { config } from '../../../config/config';
import { Measurement } from '../../../types/measurements';
import texts from '../../../data/texts.json';
import { Picture } from '../../../components/Picture/Picture';
import { Chart, ChartProps } from '../../../components/Chart/Chart';

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

  if (!measurements) {
    return <div></div>;
  }

  const frequencyChat: ChartProps = {
    labels: measurements?.frequency.frequencies,
    datasets: [
      {
        label: 'SPL',
        data: measurements.frequency.spls,
        borderColor: 'orange',
      },
    ],
    yMin: 50,
    yMax: 90,
  };

  const impedanceChart: ChartProps = {
    labels: measurements.impedance.frequencies,
    datasets: [
      {
        label: 'Ohms',
        data: measurements.impedance.impedances,
        borderColor: 'blue',
      },
      {
        label: 'Phase',
        data: measurements.impedance.phases,
        borderColor: 'red',
      },
    ],
    yMin: -100,
    yMax: 200,
  };

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
        {measurements?.drivers.map((driver, index) => {
          return (
            <div
              className='speaker-overview flex-column-center component'
              key={index}
            >
              <h1>Driver</h1>
              <div className='speaker-items'>
                <div className='speaker-item'>
                  <div className='speaker-sub-item'>
                    <p>Manufacturer</p>
                  </div>
                  <div className='speaker-sub-item'>
                    <p>{driver.brandName}</p>
                  </div>
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
      <h1>Frequency Response</h1>
      <div className='chart'>
        <Chart props={frequencyChat} />
      </div>
      <div className='settings flex-row'>
        <div className='settings-item component flex-center'>
          <h1>Settings</h1>
        </div>
        <div className='settings-item component'>
          <p>Audio Interface</p>
          <p>{measurements.frequency.source}</p>
        </div>
        <div className='settings-item component'>
          <p>Measured at</p>
          <p>{measurements.frequency.measuredAt}</p>
        </div>
        <div className='settings-item component'>
          <p>Measured by</p>
          <p>{measurements.frequency.measuredBy}</p>
        </div>
        <div className='settings-item component'>
          <p>Smoothing</p>
          <p>{measurements.frequency.smoothing}</p>
        </div>
        <div className='settings-item component'>
          <p>Weightings</p>
          <p>{measurements.frequency.frequencyWeightings}</p>
        </div>
        <div className='settings-item component'>
          <p>Sweep length</p>
          <p>{measurements.frequency.sweepLength}</p>
        </div>
        <div className='settings-item component'>
          <p>Target</p>
          <p>{measurements.frequency.targetLevel}</p>
        </div>
        <div className='settings-item component note'>
          <p>Note</p>
          <p>{measurements.frequency.note}</p>
        </div>
      </div>
      <h1>Impedance Response</h1>
      <div className='chart'>
        <Chart props={impedanceChart} />
      </div>
      <div className='settings flex-row'>
        <div className='settings-item component flex-center'>
          <h1>TS Parameters</h1>
        </div>
        <div className='settings-item component'>
          <p>Measured by</p>
          <p>{measurements.impedance.source}</p>
        </div>
        <div className='settings-item component'>
          <p>F(s)</p>
          <p>{measurements.impedance.resonanceFrequency} Hertz</p>
        </div>
        <div className='settings-item component'>
          <p>AC Res.</p>
          <p>{measurements.impedance.acResistance} Ohms</p>
        </div>
        <div className='settings-item component'>
          <p>DC Res.</p>
          <p>{measurements.impedance.dcResistance}</p>
        </div>
        <div className='settings-item component'>
          <p>Q(ts)</p>
          <p>{measurements.impedance.totalDamping}</p>
        </div>
        <div className='settings-item component'>
          <p>Q(es)</p>
          <p>{measurements.impedance.electricalDamping}</p>
        </div>
        <div className='settings-item component'>
          <p>Q(ms)</p>
          <p>{measurements.impedance.mechanicalDamping}</p>
        </div>
        <div className='settings-item component'>
          <p>V(as)</p>
          <p>{measurements.impedance.equivalenceCompliance} L</p>
        </div>
        <div className='settings-item component'>
          <p>C(ms)</p>
          <p>{measurements.impedance.suspensionCompliance} mm/N</p>
        </div>
        <div className='settings-item component'>
          <p>Cone Mass</p>
          <p>{measurements.impedance.coneMass} g</p>
        </div>

        <div className='settings-item component'>
          <p>Efficiency</p>
          <p>{measurements.impedance.efficiency} %</p>
        </div>

        <div className='settings-item component'>
          <p>BL</p>
          <p>{measurements.impedance.forceFactor}</p>
        </div>

        <div className='settings-item component'>
          <p>Piston</p>
          <p>⌀ {measurements.impedance.pistonDiameter} mm</p>
        </div>

        <div className='settings-item component'>
          <p>SPL</p>
          <p>{measurements.impedance.sensitivity} 1W/1M</p>
        </div>

        <div className='settings-item component'>
          <p>L(e)</p>
          <p>{measurements.impedance.voiceCoilInductance} mH</p>
        </div>
      </div>
    </main>
  );
}
