'use client';

import './page.css';
import { useEffect, useState } from 'react';
import { config } from '../../../config/config';
import {
  Cabinet,
  Driver,
  Frequency,
  Impedance,
  Measurement,
} from '../../../types/measurements';
import texts from '../../../data/texts.json';
import { Picture } from '../../../components/Picture/Picture';
import { Chart, ChartProps } from '../../../components/Chart/Chart';
import { Settings, SettingsProp } from '../../../components/Settings/Settings';
import { Property, Speakers } from '../../../components/Speakers/Speakers';

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

  const frequencyChart: ChartProps = {
    labels: measurements.frequency.frequencies,
    datasets: [
      {
        label: 'SPL',
        title: 'SPL',
        data: measurements.frequency.spls,
        borderColor: 'rgb(240, 40, 5)',
        yAxisID: 'y1',
        position: 'left',
        unity: 'Db',
        yMin: 50,
        yMax: 90,
      },
    ],
  };

  const impedanceChart: ChartProps = {
    labels: measurements.impedance.frequencies,
    datasets: [
      {
        label: 'Ohms',
        title: 'Impedance',
        data: measurements.impedance.impedances,
        borderColor: 'blue',
        yAxisID: 'y1',
        position: 'left',
        unity: 'Ω',
        yMin: 0,
        yMax: 160,
      },
      {
        label: 'Phase',
        title: 'Phase',
        data: measurements.impedance.phases,
        borderColor: 'red',
        yAxisID: 'y2',
        position: 'right',
        unity: '°',
        yMin: -80,
        yMax: 80,
      },
    ],
  };
  const cabinetProperties = getCabinetProperties(measurements.cabinet);
  const frequencySettings = getFrequencySettings(measurements.frequency);
  const impedanceSettings = getImpedanceSettings(measurements.impedance);

  return (
    <main className='measurement flex-column-center'>
      <div className='measurement-title flex-center'>
        <div className="measurement-title-item"></div>
        <div className="measurement-title-item flex-center"><h1>{texts.measurements}</h1></div>
        <div className="measurement-title-item flex-center">hey</div>
                
      </div>
      <div className='flex-center'>
        <Picture height={350} width={500} src='cabinets/test_picture' />
        <Speakers title={texts.cabinet} props={cabinetProperties} />
        {measurements.drivers.map((driver, index) => {
          const driverProperties = getDriverProperties(driver);

          return (
            <Speakers
              title={texts.driver}
              props={driverProperties}
              key={index}
            />
          );
        })}
      </div>

      <div className='measurement-sub-title item'>
        <h1>{texts.frequencyResponse}</h1>
      </div>
      <Chart props={frequencyChart} />
      <Settings props={frequencySettings} />

      <div className='measurement-sub-title item'>
        <h1>{texts.impedanceResponse}</h1>
      </div>
      <Chart props={impedanceChart} />
      <Settings props={impedanceSettings} />
    </main>
  );
}

function getCabinetProperties(cabinet: Cabinet): Property[] {
  return [
    {
      name: texts.cabinetProps.productName,
      value: cabinet.productName,
    },
    {
      name: texts.cabinetProps.type,
      value: cabinet.enclosureType,
    },
    {
      name: texts.cabinetProps.dimension,
      value: cabinet.dimension,
    },
    {
      name: texts.cabinetProps.manufacturingYear,
      value: cabinet.manufacturingYear,
    },
    {
      name: texts.cabinetProps.weight,
      value: `${cabinet.weight} Kg`,
    },
  ];
}

function getDriverProperties(driver: Driver): Property[] {
  return [
    {
      name: texts.driverProps.brandName,
      value: driver.brandName,
    },
    {
      name: texts.driverProps.productName,
      value: driver.productName,
    },
    {
      name: texts.driverProps.type,
      value: driver.driverType,
    },
    {
      name: texts.driverProps.continuousPowerHandling,
      value: `${driver.continuousPowerHandling} W`,
    },
    {
      name: texts.driverProps.diameter,
      value: `${driver.nominalDiameter} Inches`,
    },
    {
      name: texts.driverProps.impedance,
      value: `${driver.nominalImpedance} Ohms`,
    },
    {
      name: texts.driverProps.manufacturingYear,
      value: driver.manufacturingYear,
    },
  ];
}

function getFrequencySettings(frequency: Frequency): SettingsProp[] {
  return [
    {
      name: <h1>{texts.frequencySettings.title}</h1>,
    },
    {
      name: <h3>{texts.frequencySettings.source}:</h3>,
      value: <p>{frequency.source}</p>,
    },
    {
      name: <h3>{texts.frequencySettings.measuredAt}:</h3>,
      value: <p>{frequency.measuredAt}</p>,
    },
    {
      name: <h3>{texts.frequencySettings.measuredBy}:</h3>,
      value: <p>{frequency.measuredBy}</p>,
    },
    {
      name: <h3>{texts.frequencySettings.smoothing}:</h3>,
      value: <p>{frequency.smoothing}</p>,
    },
    {
      name: <h3>{texts.frequencySettings.weightings}:</h3>,
      value: <p>{frequency.frequencyWeightings}</p>,
    },
    {
      name: <h3>{texts.frequencySettings.sweepLength}:</h3>,
      value: <p>{frequency.sweepLength}</p>,
    },
    {
      name: <h3>{texts.frequencySettings.target}:</h3>,
      value: <p>{frequency.targetLevel}</p>,
    },
    {
      name: <h3>{texts.frequencySettings.note}:</h3>,
      value: <p>{frequency.note}</p>,
    },
  ];
}

function getImpedanceSettings(impedance: Impedance): SettingsProp[] {
  return [
    {
      name: <h1>{texts.impedanceSettings.title}</h1>,
    },
    {
      name: <h3>{texts.impedanceSettings.source}:</h3>,
      value: <p>{impedance.source}</p>,
    },
    {
      name: <h3>{texts.impedanceSettings.resonanceFrequency}:</h3>,
      value: <p>{impedance.resonanceFrequency} Hz</p>,
    },
    {
      name: <h3>{texts.impedanceSettings.acResistance}:</h3>,
      value: <p>{impedance.acResistance} Ohms</p>,
    },
    {
      name: <h3>{texts.impedanceSettings.dcResistance}:</h3>,
      value: <p>{impedance.dcResistance}</p>,
    },
    {
      name: <h3>{texts.impedanceSettings.totalDamping}:</h3>,
      value: <p>{impedance.totalDamping}</p>,
    },
    {
      name: <h3>{texts.impedanceSettings.electricalDamping}:</h3>,
      value: <p>{impedance.electricalDamping}</p>,
    },
    {
      name: <h3>{texts.impedanceSettings.mechanicalDamping}:</h3>,
      value: <p>{impedance.mechanicalDamping}</p>,
    },
    {
      name: <h3>{texts.impedanceSettings.equivalenceCompliance}:</h3>,
      value: <p>{impedance.equivalenceCompliance} L</p>,
    },
    {
      name: <h3>{texts.impedanceSettings.suspensionCompliance}:</h3>,
      value: <p>{impedance.suspensionCompliance} mm/N</p>,
    },
    {
      name: <h3>{texts.impedanceSettings.coneMass}:</h3>,
      value: <p>{impedance.coneMass} g</p>,
    },
    {
      name: <h3>{texts.impedanceSettings.efficiency}:</h3>,
      value: <p>{impedance.efficiency} %</p>,
    },
    {
      name: <h3>{texts.impedanceSettings.forceFactor}:</h3>,
      value: <p>{impedance.forceFactor}</p>,
    },
    {
      name: <h3>{texts.impedanceSettings.pistonDiameter}:</h3>,
      value: <p>⌀ {impedance.pistonDiameter} mm</p>,
    },
    {
      name: <h3>{texts.impedanceSettings.sensitivity}:</h3>,
      value: <p>{impedance.sensitivity} 1W/1M</p>,
    },
    {
      name: <h3>{texts.impedanceSettings.voiceCoilInductance}:</h3>,
      value: <p>{impedance.voiceCoilInductance} mH</p>,
    },
  ];
}
