import { Frequency, Impedance } from '../../types/measurements';
import './Settings.css';

export interface SettingsProp {
  name: React.ReactNode;
  value?: React.ReactNode;
}

export function Settings({ props }: { props: SettingsProp[] }) {
  return (
    <div className='settings flex-row'>
      {props.map((prop) => {
        return <Setting prop={prop} />;
      })}
    </div>
  );
}

export function Setting({ prop }: { prop: SettingsProp }) {
  return (
    <div className='item horizontal-padding component'>
      {prop.name} {prop.value}
    </div>
  );
}

export function getFrequencySettings(frequency: Frequency): SettingsProp[] {
  return [
    {
      name: <h1>Settings</h1>,
    },
    {
      name: <p>Audio Interface</p>,
      value: <p>{frequency.source}</p>,
    },
    {
      name: <p>Measured at</p>,
      value: <p>{frequency.measuredAt}</p>,
    },
    {
      name: <p>Measured by</p>,
      value: <p>{frequency.measuredBy}</p>,
    },
    {
      name: <p>Smoothing</p>,
      value: <p>{frequency.smoothing}</p>,
    },
    {
      name: <p>Weightings</p>,
      value: <p>{frequency.frequencyWeightings}</p>,
    },
    {
      name: <p>Sweep length</p>,
      value: <p>{frequency.sweepLength}</p>,
    },
    {
      name: <p>Target</p>,
      value: <p>{frequency.targetLevel}</p>,
    },
    {
      name: <p>Note</p>,
      value: <p>{frequency.note}</p>,
    },
  ];
}

export function getImpedanceSettings(impedance: Impedance): SettingsProp[] {
  return [
    {
      name: <h1>TS Parameters</h1>,
    },
    {
      name: <p>Measured by</p>,
      value: <p>{impedance.source}</p>,
    },
    {
      name: <p>F(s)</p>,
      value: <p>{impedance.resonanceFrequency} Hz</p>,
    },
    {
      name: <p>AC Res.</p>,
      value: <p>{impedance.acResistance} Ohms</p>,
    },
    {
      name: <p>DC Res.</p>,
      value: <p>{impedance.dcResistance}</p>,
    },
    {
      name: <p>Q(ts)</p>,
      value: <p>{impedance.totalDamping}</p>,
    },
    {
      name: <p>Q(es)</p>,
      value: <p>{impedance.electricalDamping}</p>,
    },
    {
      name: <p>Q(ms)</p>,
      value: <p>{impedance.mechanicalDamping}</p>,
    },
    {
      name: <p>V(as)</p>,
      value: <p>{impedance.equivalenceCompliance} L</p>,
    },
    {
      name: <p>C(ms)</p>,
      value: <p>{impedance.suspensionCompliance} mm/N</p>,
    },
    {
      name: <p>Cone Mass</p>,
      value: <p>{impedance.coneMass} g</p>,
    },
    {
      name: <p>Efficiency</p>,
      value: <p>{impedance.efficiency} %</p>,
    },
    {
      name: <p>BL</p>,
      value: <p>{impedance.forceFactor}</p>,
    },
    {
      name: <p>Piston</p>,
      value: <p>⌀ {impedance.pistonDiameter} mm</p>,
    },
    {
      name: <p>SPL</p>,
      value: <p>{impedance.sensitivity} 1W/1M</p>,
    },
    {
      name: <p>L(e)</p>,
      value: <p>{impedance.voiceCoilInductance} mH</p>,
    },
  ];
}
