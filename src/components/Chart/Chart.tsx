import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  LogarithmicScale,
} from 'chart.js';
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  LogarithmicScale
);

interface ChartProps {
  labels: number[];
  datasets: DataSet[];
}

export interface DataSet {
  label: string;
  data: number[];
  bordelColor: string;
}

export function Chart(props: ChartProps) {
  return (
    <Line
      data={{
        labels: props.labels,
        datasets: props.datasets,
      }}
      options={{
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            bounds: 'ticks',
            display: true,
            type: 'logarithmic',
            min: 20,
            max: 20000,
            ticks: {
              color: 'grey',
              callback: (val) => {
                if (val === 1000) return val / 1000 + ' KHz';
                if (val === 5000) return val / 1000 + ' KHz';
                if (val === 10000) return val / 1000 + ' KHz';
                return val + ' Hz';
              },
              autoSkip: true,
              maxTicksLimit: 8,
            },
            grid: {
              color: '#343235',
            },
          },
          y: {
            display: true,
            type: 'linear',
            min: -100,
            max: 200,
            ticks: {
              color: 'grey',
              callback: (val) => val,
            },
            grid: {
              color: '#343235',
            },
          },
        },
        animation: false,
      }}
    />
  );
}