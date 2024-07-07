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
} from 'chart.js';
import {
  ChartProps,
  CssProperties,
  DataSet,
  ScalesAxeProps,
} from '../../types/graph';
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  LogarithmicScale
);

export function FrequencyChart({ props }: { props: ChartProps }) {
  const [cssProperties, setCssProperties] = useState({
    tick: 8,
    borderWidth: 2,
  });
  useEffect(() => {
    const handleResize = () => {
      setCssProperties(getCSSProperties());
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const data = mapDataset(props, cssProperties);
  const options = mapOptions(props, cssProperties);
  return (
    <div className='chart'>
      <Line data={data} options={options} />
    </div>
  );
}

function getCSSProperties(): CssProperties {
  const rootStyles = getComputedStyle(document.documentElement);
  return {
    tick: parseFloat(rootStyles.getPropertyValue('--chart-tick-font-size')),
    borderWidth: parseFloat(
      rootStyles.getPropertyValue('--chart-border-width')
    ),
  };
}

function mapDataset(
  props: ChartProps,
  cssProperties: CssProperties
): ChartData<'line'> {
  return {
    labels: props.labels,
    datasets: props.datasets.map((dataset: DataSet) => {
      return {
        label: dataset.label,
        data: dataset.data,
        borderColor: dataset.borderColor,
        borderWidth: cssProperties.borderWidth,
        yAxisID: dataset.yAxisID,
      };
    }),
  };
}

function mapOptions(
  props: ChartProps,
  cssProperties: CssProperties
): ChartOptions<'line'> {
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
    min: props.datasets[0].yMin - 1,
    max: props.datasets[0].yMax + 1,
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

  return {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: mapScalesAxe(horizontalScalesAxeProps, cssProperties),
      y1: mapScalesAxe(verticalScalesAxeProps, cssProperties),
    },
    animation: false,
    plugins: {
      tooltip: {
        mode: 'nearest',
        intersect: false,
      },
    },
    hover: {
      mode: 'nearest',
      intersect: false,
    },
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
  cssProperties: CssProperties
): ScaleOptionsByType<'linear' | 'logarithmic'> {
  return {
    display: true,
    type: props.type,
    min: props.min,
    max: props.max,
    position: props.position,
    title: {
      display: false,
      padding: 10,
    },
    ticks: {
      color: '#51F502',
      autoSkip: true,
      maxTicksLimit: props.tick.maxTicksLimit,
      font: {
        size: cssProperties.tick,
      },
      callback: props.tick.callback,
    },
    grid: {
      display: props.grid,
      color: '#343235',
    },
  } as ScaleOptionsByType<'linear' | 'logarithmic'>;
}
