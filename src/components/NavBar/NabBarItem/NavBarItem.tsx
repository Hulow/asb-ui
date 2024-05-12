import { useState } from 'react';
import './NavBarItem.css';

export function NavBarItem({
  eventName,
  onEvent,
}: {
  eventName: string;
  onEvent: any;
}) {
  const [isActive, setIsActive] = useState(false);
  return (
    <div
      className='nav-bar-item flex-center component'
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
