'use client';

import './page.css';
import { useEffect, useState } from 'react';
import { config } from '../../../config/config';
import { Driver, Measurement } from '../../../types/measurements';
import texts from '../../../data/texts.json';
import { Picture } from '../../../components/Picture/Picture';
import { Chart, ChartProps } from '../../../components/Chart/Chart';
import { Settings, SettingsProp } from '../../../components/Settings/Settings';

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

  const frequencySettings = (): SettingsProp[] => [
    {
      name: <h1>Settings</h1>,
    },
    {
      name: <p>Audio Interface</p>,
      value: <p>{measurements.frequency.source}</p>,
    },
    {
      name: <p>Measured at</p>,
      value: <p>{measurements.frequency.measuredAt}</p>,
    },
    {
      name: <p>Measured by</p>,
      value: <p>{measurements.frequency.measuredBy}</p>,
    },
    {
      name: <p>Smoothing</p>,
      value: <p>{measurements.frequency.smoothing}</p>,
    },
    {
      name: <p>Weightings</p>,
      value: <p>{measurements.frequency.frequencyWeightings}</p>,
    },
    {
      name: <p>Sweep length</p>,
      value: <p>{measurements.frequency.sweepLength}</p>,
    },
    {
      name: <p>Target</p>,
      value: <p>{measurements.frequency.targetLevel}</p>,
    },
    {
      name: <p>Note</p>,
      value: <p>{measurements.frequency.note}</p>,
    },
  ];

  const impedanceSettings = (): SettingsProp[] => [
    {
      name: <h1>TS Parameters</h1>,
    },
    {
      name: <p>Measured by</p>,
      value: <p>{measurements.impedance.source}</p>,
    },
    {
      name: <p>F(s)</p>,
      value: <p>{measurements.impedance.resonanceFrequency} Hz</p>,
    },
    {
      name: <p>AC Res.</p>,
      value: <p>{measurements.impedance.acResistance} Ohms</p>,
    },
    {
      name: <p>DC Res.</p>,
      value: <p>{measurements.impedance.dcResistance}</p>,
    },
    {
      name: <p>Q(ts)</p>,
      value: <p>{measurements.impedance.totalDamping}</p>,
    },
    {
      name: <p>Q(es)</p>,
      value: <p>{measurements.impedance.electricalDamping}</p>,
    },
    {
      name: <p>Q(ms)</p>,
      value: <p>{measurements.impedance.mechanicalDamping}</p>,
    },
    {
      name: <p>V(as)</p>,
      value: <p>{measurements.impedance.equivalenceCompliance} L</p>,
    },
    {
      name: <p>C(ms)</p>,
      value: <p>{measurements.impedance.suspensionCompliance} mm/N</p>,
    },
    {
      name: <p>Cone Mass</p>,
      value: <p>{measurements.impedance.coneMass} g</p>,
    },
    {
      name: <p>Efficiency</p>,
      value: <p>{measurements.impedance.efficiency} %</p>,
    },
    {
      name: <p>BL</p>,
      value: <p>{measurements.impedance.forceFactor}</p>,
    },
    {
      name: <p>Piston</p>,
      value: <p>⌀ {measurements.impedance.pistonDiameter} mm</p>,
    },
    {
      name: <p>SPL</p>,
      value: <p>{measurements.impedance.sensitivity} 1W/1M</p>,
    },
    {
      name: <p>L(e)</p>,
      value: <p>{measurements.impedance.voiceCoilInductance} mH</p>,
    },
  ];
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
        {frequencySettings().map((setting) => {
          return <Settings props={setting} />;
        })}
      </div>

      <h1>Impedance Response</h1>
      <div className='chart'>
        <Chart props={impedanceChart} />
      </div>
      <div className='settings flex-row'>
        {impedanceSettings().map((setting) => {
          return <Settings props={setting} />;
        })}
      </div>
    </main>
  );
}
