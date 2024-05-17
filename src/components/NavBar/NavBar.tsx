import './NavBar.css';
import texts from '../../data/texts.json';
import { NavBarItem } from './NabBarItem/NavBarItem';
import { useState } from 'react';

export interface OnEvent {
  name: string;
  state: boolean;
}

export function NavBar({ onEvent }: { onEvent: any }) {
  const [activeEventName, setActiveEventName] = useState<undefined | string>(
    undefined
  );
  return (
    <div className='nav-bar'>
      <NavBarItem
        onEvent={reactOnEvent}
        eventName={texts.about}
        activeEventName={activeEventName}
      />
      <NavBarItem
        onEvent={reactOnEvent}
        eventName={texts.projectOverview}
        activeEventName={activeEventName}
      />
      <NavBarItem
        onEvent={reactOnEvent}
        eventName={texts.measurements}
        activeEventName={activeEventName}
      />
    </div>
  );

  function reactOnEvent(event: OnEvent): void {
    setActiveEventName(event.name);
    onEvent(event);
  }
}
