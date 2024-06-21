'use client';
import '../../styles/components/measurement.scss';
import React from 'react';
import { Chart, ChartProps } from '../Chart/Chart';
import { Settings, SettingsProp } from '../Settings/Settings';
import { Measurement } from '../../types/measurement';
import texts from '../../data/texts.json';
import { Frequency } from '../../types/frequency';
import { Impedance } from '../../types/impedance';

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
    const chart: ChartProps = {
      labels: impedance.frequencies,
      xMin: impedance.lowestFrequency,
      xMax: impedance.highestFrequency,
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
          yMin: impedance.lowestPhase,
          yMax: impedance.highestPhase,
        },
      ],
    };

    const settings = getImpedanceSettings(impedance);
    impedanceChartsAndSettings.push({ chart, settings });
  }

  const frequencySettings = getFrequencySettings(measurements.frequency);

  return (
    <div className='flex-center'>
      <div className='measurement-sub-title item'>
        <h1>{texts.frequencyResponse}</h1>
      </div>
      <Chart props={frequencyChart} />
      <Settings props={frequencySettings} />
      {impedanceChartsAndSettings.map(({ chart, settings }, index) => (
        <div key={index}>
          <div className='measurement-sub-title item'>
            <h1>{texts.impedanceResponse}</h1>
          </div>
          <Chart props={chart} />
          <Settings props={settings} />
        </div>
      ))}
    </div>
  );
};

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
    { name: <h1>{texts.impedanceSettings.title}</h1> },
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
  ];
}
