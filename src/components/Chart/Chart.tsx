import '../../styles/components/chart.scss';
import React, { useEffect, useState } from 'react';
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
  xMin: number;
  xMax: number;
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

interface FontSize {
  title: number;
  tick: number;
}

export function Chart({ props }: { props: ChartProps }) {
  const [fontSizes, setFontSize] = useState({ title: 1, tick: 8 });
  useEffect(() => {
    const handleResize = () => {
      setFontSize(getFontSizeFromSCSS());
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const data = mapDataset(props);
  const options = mapOptions(props, fontSizes);
  return (
    <div className='chart'>
      <Line data={data} options={options} />
    </div>
  );
}

function getFontSize() {
  const width = window.innerWidth;
  if (width <= 480) return { title: 14, tick: 8 };
  if (width <= 768) return { title: 16, tick: 10 };
  if (width <= 1200) return { title: 18, tick: 12 };
  return { title: 20, tick: 14 };
}

function getFontSizeFromSCSS(): FontSize {
  const rootStyles = getComputedStyle(document.documentElement);
  return {
    title: parseFloat(rootStyles.getPropertyValue('--chart-title-font-size')),
    tick: parseFloat(rootStyles.getPropertyValue('--chart-tick-font-size')),
  };
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

function mapOptions(
  props: ChartProps,
  fontSize: FontSize
): ChartOptions<'line'> {
  const datasetContainsPhase = props.datasets.length === 2;
  const horizontalScalesAxeProps: ScalesAxeProps = {
    type: 'logarithmic',
    min: props.xMin,
    max: props.xMax,
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
    max: props.datasets[0].yMax + 2,
    position: 'left',
    title: {
      display: true,
      text: props.datasets[0].title,
    },
    tick: {
      maxTicksLimit: 15,
      callback: (value, index, ticks) => {
        return (
          String(value).replace(/\..*/, '') + ' ' + props.datasets[0].unity
        );
      },
    },
    grid: true,
  };

  const y2 = datasetContainsPhase
    ? {
        y2: mapScalesAxe(
          {
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
          },
          fontSize
        ),
      }
    : null;

  return {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: mapScalesAxe(horizontalScalesAxeProps, fontSize),
      y1: mapScalesAxe(verticalScalesAxeProps, fontSize),
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
  props: ScalesAxeProps,
  fontSize: FontSize
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
        size: fontSize.title,
      },
      padding: 10,
    },
    ticks: {
      color: '#51F502',
      autoSkip: true,
      maxTicksLimit: props.tick.maxTicksLimit,
      font: {
        size: fontSize.tick,
      },
      callback: props.tick.callback,
    },
    grid: {
      display: props.grid,
      color: '#343235',
    },
  } as ScaleOptionsByType<'linear' | 'logarithmic'>;
}
