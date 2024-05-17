import './Settings.css';

export interface SettingsProp {
  name: React.ReactNode;
  value?: React.ReactNode;
}

export function Settings({ props }: { props: SettingsProp[] }) {
  return (
    <div className='settings flex-row'>
      {props.map((prop, index) => {
        return <Setting prop={prop} key={index}/>;
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
