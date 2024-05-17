import './Speakers.css';

export interface Property {
  name: string;
  value: string | number;
}

export function Speakers({
  title,
  props,
}: {
  title: string;
  props: Property[];
}) {
  return (
    <div className='speakers-props flex-column-center component'>
      <h2>{title}</h2>
      <div className='speaker-props'>
        {props.map((prop, index) => {
          return <Speaker prop={prop} key={index} />;
        })}
      </div>
    </div>
  );
}

export function Speaker({ prop }: { prop: Property }) {
  return (
    <div className='flex-row'>
      <div className='speaker'>
        <p>{prop.name}</p>
      </div>
      <div className='speaker'>
        <p>{prop.value}</p>
      </div>
    </div>
  );
}
