import './NavBar.css';
import { Button } from '../Button/Button';
import texts from '../../data/texts.json';
import { NavBarItem } from './NabBarItem/NavBarItem';

export interface EventState {
  item: EventName;
  state: boolean;
}

export enum EventName {
  Station = 'Station',
  Content = 'Content',
  Measurements = 'Measurements'
}

export function NavBar({ onEvent }: { onEvent: any }) {
  return (
    <div className='nav-bar'>
      <NavBarItem onEvent={reactOnEvent} eventName={EventName.Content} />
      <NavBarItem onEvent={reactOnEvent} eventName={EventName.Station} />
      <NavBarItem onEvent={reactOnEvent} eventName={EventName.Measurements} />
    </div>
  );

  function reactOnEvent(event: any) {
    onEvent(event);
  }
}
