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
