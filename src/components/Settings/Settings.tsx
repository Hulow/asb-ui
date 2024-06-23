import '../../styles/components/settings.scss';

export interface SettingsProp {
  name: React.ReactNode;
  value?: React.ReactNode;
}

export function Settings({ props }: { props: SettingsProp[] }) {
  return (
    <div className='settings'>
      {props.map((prop, index) => {
        return <Setting prop={prop} key={index} />;
      })}
    </div>
  );
}

export function Setting({ prop }: { prop: SettingsProp }) {
  return (
    <div className='setting color-transition'>
      {prop.name} {prop.value}
    </div>
  );
}
