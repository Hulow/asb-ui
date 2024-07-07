import { Tick } from 'chart.js';

export interface ChartProps {
  labels: number[];
  xMin: number;
  xMax: number;
  datasets: DataSet[];
  driverType?: string;
  driverName?: string;
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

export interface ScalesAxeProps {
  type: 'linear' | 'logarithmic';
  min?: number;
  max?: number;
  position: 'right' | 'left' | undefined;
  title: AxeTitle;
  tick: AxeTick;
  grid: boolean;
}

export interface AxeTitle {
  display: boolean;
  text: string;
}

export interface AxeTick {
  maxTicksLimit: number;
  callback: (
    tickValue: string | number,
    index: number,
    ticks: Tick[]
  ) => string;
}

export interface CssProperties {
  tick: number;
  borderWidth: number;
}
