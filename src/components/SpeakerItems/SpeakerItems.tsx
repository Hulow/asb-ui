import '../../styles/components/speaker-items.scss';

export interface Property {
  name: string;
  value: string | number;
}

export function SpeakerItems({
  title,
  props,
}: {
  title: string;
  props: Property[];
}) {
  return (
    <div className='speaker item'>
      <p>{title}</p>
      <div className='props'>
        {props.map((prop, index) => {
          return <Item prop={prop} key={index} />;
        })}
      </div>
    </div>
  );
}

export function Item({ prop }: { prop: Property }) {
  return (
    <div className='color-transition flex-row'>
      <div className='prop'>
        <p>{prop.name}</p>
      </div>
      <div className='prop'>
        <p>{prop.value}</p>
      </div>
    </div>
  );
}
