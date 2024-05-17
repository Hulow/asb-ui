'use client';

import './page.css';
import { useEffect, useState } from 'react';
import { config } from '../../../config/config';
import { Cabinet, Driver, Measurement } from '../../../types/measurements';
import texts from '../../../data/texts.json';
import { Picture } from '../../../components/Picture/Picture';
import { Chart, ChartProps } from '../../../components/Chart/Chart';
import {
  Settings,
  getFrequencySettings,
  getImpedanceSettings,
} from '../../../components/Settings/Settings';
import {
  Property,
  Speakers,
} from '../../../components/Speakers/Speakers';

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
    labels: measurements.frequency.frequencies,
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
  const cabinetProperties = getCabinetProperties(measurements.cabinet);
  const frequencySettings = getFrequencySettings(measurements.frequency);
  const impedanceSettings = getImpedanceSettings(measurements.impedance);

  return (
    <main className='measurement flex-column-center'>
      <h1>{texts.measurements}</h1>
      <div className='flex-center'>
        <Picture height={400} width={500} src='cld-sample-5' />
        <Speakers title={texts.cabinets} props={cabinetProperties} />
        {measurements.drivers.map((driver) => {
          const driverProperties = getDriverProperties(driver);

          return <Speakers title={texts.cabinets} props={driverProperties} />;
        })}
      </div>

      <h1>{texts.frequencyResponse}</h1>
      <Chart props={frequencyChat} />
      <Settings props={frequencySettings} />

      <h1>{texts.impedanceResponse}</h1>
      <Chart props={impedanceChart} />
      <Settings props={impedanceSettings} />
    </main>
  );
}

function getCabinetProperties(cabinet: Cabinet): Property[] {
  return [
    {
      name: 'Name',
      value: cabinet.productName,
    },
    {
      name: 'Enclosure',
      value: cabinet.enclosureType,
    },
    {
      name: 'Dimension',
      value: cabinet.dimension,
    },
    {
      name: 'Year',
      value: cabinet.manufacturingYear,
    },
    {
      name: 'Weight',
      value: `${cabinet.weight} Kg`,
    },
  ];
}

function getDriverProperties(driver: Driver): Property[] {
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
}

