'use client';

import './page.css';
import { useEffect, useState } from 'react';
import { config } from '../../../config/config';
import { Driver, Measurement } from '../../../types/measurements';
import texts from '../../../data/texts.json';
import { Picture } from '../../../components/Picture/Picture';
import { Chart, ChartProps } from '../../../components/Chart/Chart';

interface Params {
  params: {
    cabinetUid: string;
  };
}

interface Properties {
  name: string;
  value: string | number;
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

  const cabinetProperties = (): Properties[] => [
    {
      name: 'Name',
      value: measurements.cabinet.productName,
    },
    {
      name: 'Enclosure',
      value: measurements.cabinet.enclosureType,
    },
    {
      name: 'Dimension',
      value: measurements?.cabinet.dimension,
    },
    {
      name: 'Year',
      value: measurements?.cabinet.manufacturingYear,
    },
    {
      name: 'Weight',
      value: `${measurements?.cabinet.weight} Kg`,
    },
  ];

  const driverProperties = (driver: Driver): Properties[] => {
    return [
      {
        name: 'Manufacturer',
        value: driver.brandName,
      },
      {
        name: 'Product',
        value: driver.productName,
      },
      {
        name: 'Type',
        value: driver.driverType,
      },
      {
        name: 'RMS',
        value: `${driver.continuousPowerHandling} W`,
      },
      {
        name: 'Diameter',
        value: `${driver.nominalDiameter} Inches`,
      },
      {
        name: 'Impedance',
        value: `${driver.nominalImpedance} Ohms`,
      },
      {
        name: 'Year',
        value: driver.manufacturingYear,
      },
    ];
  };

  return (
    <main className='measurement flex-column-center'>
      <h1>{texts.measurements}</h1>
      <div className='flex-center'>
        <Picture height={400} width={500} src='cld-sample-5' />
        <div className='speaker-props flex-column-center component'>
          <h1>Cabinet</h1>
          <div className='speaker-items'>
            {cabinetProperties().map((property) => {
              return (
                <div className='flex-row'>
                  <div className='speaker item'>
                    <p>{property.name}</p>
                  </div>
                  <div className='speaker item'>
                    <p>{property.value}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        {measurements?.drivers.map((driver, index) => {
          return (
            <div
              className='speaker-props flex-column-center component'
              key={index}
            >
              <h1>Driver</h1>
              <div className='speaker-items'>
                {driverProperties(driver).map((driverProp) => {
                  return (
                    <div className='flex-row'>
                      <div className='speaker item'>
                        <p>{driverProp.name}</p>
                      </div>
                      <div className='speaker item'>
                        <p>{driverProp.value}</p>
                      </div>
                    </div>
                  );
                })}
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
        <div className='item horizontal-padding component flex-center'>
          <h1>Settings</h1>
        </div>
        <div className='item horizontal-padding component'>
          <p>Audio Interface</p>
          <p>{measurements.frequency.source}</p>
        </div>
        <div className='item horizontal-padding component'>
          <p>Measured at</p>
          <p>{measurements.frequency.measuredAt}</p>
        </div>
        <div className='item horizontal-padding component'>
          <p>Measured by</p>
          <p>{measurements.frequency.measuredBy}</p>
        </div>
        <div className='item horizontal-padding component'>
          <p>Smoothing</p>
          <p>{measurements.frequency.smoothing}</p>
        </div>
        <div className='item horizontal-padding component'>
          <p>Weightings</p>
          <p>{measurements.frequency.frequencyWeightings}</p>
        </div>
        <div className='item horizontal-padding component'>
          <p>Sweep length</p>
          <p>{measurements.frequency.sweepLength}</p>
        </div>
        <div className='item horizontal-padding component'>
          <p>Target</p>
          <p>{measurements.frequency.targetLevel}</p>
        </div>
        <div className='item horizontal-padding component note'>
          <p>Note</p>
          <p>{measurements.frequency.note}</p>
        </div>
      </div>
      <h1>Impedance Response</h1>
      <div className='chart'>
        <Chart props={impedanceChart} />
      </div>
      <div className='settings flex-row'>
        <div className='item horizontal-padding component flex-center'>
          <h1>TS Parameters</h1>
        </div>
        <div className='item horizontal-padding component'>
          <p>Measured by</p>
          <p>{measurements.impedance.source}</p>
        </div>
        <div className='item horizontal-padding component'>
          <p>F(s)</p>
          <p>{measurements.impedance.resonanceFrequency} Hz</p>
        </div>
        <div className='item horizontal-padding component'>
          <p>AC Res.</p>
          <p>{measurements.impedance.acResistance} Ohms</p>
        </div>
        <div className='item horizontal-padding component'>
          <p>DC Res.</p>
          <p>{measurements.impedance.dcResistance}</p>
        </div>
        <div className='item horizontal-padding component'>
          <p>Q(ts)</p>
          <p>{measurements.impedance.totalDamping}</p>
        </div>
        <div className='item horizontal-padding component'>
          <p>Q(es)</p>
          <p>{measurements.impedance.electricalDamping}</p>
        </div>
        <div className='item horizontal-padding component'>
          <p>Q(ms)</p>
          <p>{measurements.impedance.mechanicalDamping}</p>
        </div>
        <div className='item horizontal-padding component'>
          <p>V(as)</p>
          <p>{measurements.impedance.equivalenceCompliance} L</p>
        </div>
        <div className='item horizontal-padding component'>
          <p>C(ms)</p>
          <p>{measurements.impedance.suspensionCompliance} mm/N</p>
        </div>
        <div className='item horizontal-padding component'>
          <p>Cone Mass</p>
          <p>{measurements.impedance.coneMass} g</p>
        </div>

        <div className='item horizontal-padding component'>
          <p>Efficiency</p>
          <p>{measurements.impedance.efficiency} %</p>
        </div>

        <div className='item horizontal-padding component'>
          <p>BL</p>
          <p>{measurements.impedance.forceFactor}</p>
        </div>

        <div className='item horizontal-padding component'>
          <p>Piston</p>
          <p>⌀ {measurements.impedance.pistonDiameter} mm</p>
        </div>

        <div className='item horizontal-padding component'>
          <p>SPL</p>
          <p>{measurements.impedance.sensitivity} 1W/1M</p>
        </div>

        <div className='item horizontal-padding component'>
          <p>L(e)</p>
          <p>{measurements.impedance.voiceCoilInductance} mH</p>
        </div>
      </div>
    </main>
  );
}
