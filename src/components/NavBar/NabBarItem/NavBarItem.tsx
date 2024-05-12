import { useState } from 'react';
import './NavBarItem.css';

export function NavBarItem({
  eventName,
  onEvent,
  activeEventName,
}: {
  eventName: string;
  onEvent: any;
  activeEventName?: string;
}) {
  let [isActive, setIsActive] = useState(false);

  if (activeEventName !== eventName) {
    isActive = false;
  }

  return (
    <div
      className='nav-bar-item flex-center'
      onClick={() => reactOnEvent(eventName)}
    >
      <h1>{eventName}</h1>
    </div>
  );

  function reactOnEvent(eventName: string): void {
    setIsActive(!isActive);
    onEvent({ name: eventName, state: !isActive });
  }
}
