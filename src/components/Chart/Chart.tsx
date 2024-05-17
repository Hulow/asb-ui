import './Chart.css';
import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  LogarithmicScale,
  ChartOptions,
  ChartData,
  ScaleOptionsByType,
  Tick,
} from 'chart.js';
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  LogarithmicScale
);

export interface ChartProps {
  labels: number[];
  datasets: DataSet[];
}

export interface DataSet {
  label: string;
  title: string;
  data: number[];
  borderColor: string;
  yAxisID: string;
  position: string;
  unity: string;
  yMin: number;
  yMax: number;
}

interface ScalesAxeProps {
  type: 'linear' | 'logarithmic';
  min: number;
  max: number;
  position: 'right' | 'left' | undefined;
  title: AxeTitle;
  tick: AxeTick;
  grid: boolean;
}

interface AxeTitle {
  display: boolean;
  text: string;
}

interface AxeTick {
  maxTicksLimit: number;
  callback: (
    tickValue: string | number,
    index: number,
    ticks: Tick[]
  ) => string;
}

export function Chart({ props }: { props: ChartProps }) {
  const data = mapDataset(props);
  const options = mapOptions(props);
  return (
    <div className='chart'>
      <Line data={data} options={options} />
    </div>
  );
}

function mapDataset(props: ChartProps): ChartData<'line'> {
  return {
    labels: props.labels,
    datasets: props.datasets.map((dataset: DataSet) => {
      return {
        label: dataset.label,
        data: dataset.data,
        borderColor: dataset.borderColor,
        yAxisID: dataset.yAxisID,
      };
    }),
  };
}

function mapOptions(props: ChartProps): ChartOptions<'line'> {
  const datasetContainsPhase = props.datasets.length === 2;
  const horizontalScalesAxeProps: ScalesAxeProps = {
    type: 'logarithmic',
    min: 20,
    max: 20000,
    position: undefined,
    title: {
      display: false,
      text: 'Frequency',
    },
    tick: {
      maxTicksLimit: 8,
      callback: (val) => {
        return mapFrequencyValue(val);
      },
    },
    grid: true,
  };

  const verticalScalesAxeProps: ScalesAxeProps = {
    type: 'linear',
    min: props.datasets[0].yMin,
    max: props.datasets[0].yMax,
    position: 'left',
    title: {
      display: true,
      text: props.datasets[0].title,
    },
    tick: {
      maxTicksLimit: 15,
      callback: (value, index, ticks) => {
        return value + ' ' + props.datasets[0].unity;
      },
    },
    grid: true,
  };

  const y2 = datasetContainsPhase
    ? {
        y2: mapScalesAxe({
          type: 'linear',
          min: props.datasets[1].yMin,
          max: props.datasets[1].yMax,
          position: 'right',
          title: {
            display: true,
            text: props.datasets[1].title,
          },
          tick: {
            maxTicksLimit: 5,
            callback: (value, index, ticks) => {
              return value + ' ' + props.datasets[1].unity;
            },
          },
          grid: false,
        }),
      }
    : null;

  return {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: mapScalesAxe(horizontalScalesAxeProps),
      y1: mapScalesAxe(verticalScalesAxeProps),
      ...y2,
    },
    animation: false,
  };
}

function mapFrequencyValue(val: string | number) {
  if (val === 1000) return val / 1000 + ' KHz';
  if (val === 5000) return val / 1000 + ' KHz';
  if (val === 10000) return val / 1000 + ' KHz';
  return val + ' Hz';
}

function mapScalesAxe(
  props: ScalesAxeProps
): ScaleOptionsByType<'linear' | 'logarithmic'> {
  return {
    display: true,
    type: props.type,
    min: props.min,
    max: props.max,
    position: props.position,
    title: {
      display: props.title.display,
      text: props.title.text,
      align: 'center',
      color: '#51F502',
      font: {
        size: 20,
      },
      padding: 10,
    },
    ticks: {
      color: '#51F502',
      autoSkip: true,
      maxTicksLimit: props.tick.maxTicksLimit,
      font: {
        size: 14,
      },
      callback: props.tick.callback,
    },
    grid: {
      display: props.grid,
      color: '#343235',
    },
  } as ScaleOptionsByType<'linear' | 'logarithmic'>;
}
