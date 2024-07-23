'use client';
import '../../styles/components/measurement.scss';
import React from 'react';
import { Settings, SettingsProp } from '../Settings/Settings';
import { Measurement } from '../../types/measurement';
import texts from '../../data/texts.json';
import { Frequency } from '../../types/frequency';
import { Impedance } from '../../types/impedance';
import { FrequencyChart } from '../Chart/FrequencyChart';
import { ImpedanceChart } from '../Chart/ImpedanceChart';
import { ChartProps } from '../../types/graph';
import { Driver } from '../../types/driver';

interface MeasurementsProps {
  measurements: Measurement;
}

export const Measurements: React.FC<MeasurementsProps> = ({ measurements }) => {
  const frequencyChart: ChartProps = {
    labels: measurements.frequency.frequencies,
    xMin: measurements.frequency.lowestFrequency,
    xMax: measurements.frequency.highestFrequency,
    datasets: [
      {
        label: 'SPL',
        title: 'SPL',
        data: measurements.frequency.spls,
        borderColor: 'rgb(240, 40, 5)',
        yAxisID: 'y1',
        position: 'left',
        unity: 'Db',
        yMin: measurements.frequency.lowestSpl,
        yMax: measurements.frequency.highestSpl,
      },
    ],
  };

  const impedanceChartsAndSettings: {
    chart: ChartProps;
    settings: SettingsProp[];
  }[] = [];

  for (const impedance of measurements.impedances) {
    const driver = getDriver(measurements.drivers, impedance.driverUid);
    const chart: ChartProps = {
      labels: impedance.frequencies,
      xMin: impedance.lowestFrequency,
      xMax: impedance.highestFrequency,
      driverType: driver.driverType,
      driverName: driver.productName,
      datasets: [
        {
          label: 'Ohms',
          title: 'Impedance',
          data: impedance.impedances,
          borderColor: 'blue',
          yAxisID: 'y1',
          position: 'left',
          unity: 'Ω',
          yMin: impedance.lowestImpedance,
          yMax: impedance.highestImpedance,
        },
        {
          label: 'Phase',
          title: 'Phase',
          data: impedance.phases,
          borderColor: 'red',
          yAxisID: 'y2',
          position: 'right',
          unity: '°',
          yMin: -179,
          yMax: 179,
        },
      ],
    };

    const settings = getImpedanceSettings(impedance);
    impedanceChartsAndSettings.push({ chart, settings });
  }

  const isThereMoreThanOneImpedance = impedanceChartsAndSettings.length > 1;

  const frequencySettings = getFrequencySettings(measurements.frequency);

  return (
    <div className='flex-col-center charts'>
      <div className='title item'>
        <p>{texts.frequencyResponse}</p>
      </div>
      <FrequencyChart props={frequencyChart} />
      <Settings props={frequencySettings} />
      {impedanceChartsAndSettings.map(({ chart, settings }, index) => (
        <div key={index} className='flex-col-center'>
          <div className='title item'>
            <p>
              {texts.impedanceResponse}
              {isThereMoreThanOneImpedance
                ? ` from ${chart.driverType} ${chart.driverName}`
                : null}
            </p>
          </div>
          <ImpedanceChart props={chart} />
          <Settings props={settings} />
        </div>
      ))}
    </div>
  );
};

function getDriver(drivers: Driver[], driverUid: string): Driver {
  return drivers.find((driver) => driver.uid === driverUid) as Driver;
}

function getFrequencySettings(frequency: Frequency): SettingsProp[] {
  return [
    { name: <h1>{texts.frequencySettings.title}</h1> },
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
      value: <p>{mapImpedance(impedance.resonanceFrequency)} Hz</p>,
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
  ];
}

function mapImpedance(data: string): string {
  const dataToArray = data.split(' ');
  return dataToArray.length > 1 ? dataToArray.join(' - ') : data;
}
