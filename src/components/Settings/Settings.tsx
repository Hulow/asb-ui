import './Settings.css';

export interface SettingsProp {
  name: React.ReactNode;
  value?: React.ReactNode;
}

export function Settings({ props }: { props: SettingsProp }) {
  return (
    <div className='item horizontal-padding component'>
      {props.name} {props.value}
    </div>
  );
}
