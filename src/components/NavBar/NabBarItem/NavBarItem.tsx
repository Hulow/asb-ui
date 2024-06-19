import { useState } from 'react';
import '../../../styles/components/navbar-item.scss';

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

  const activeClassName = isActive ? 'active' : '';

  return (
    <div
      className={`nav-bar-item flex-center interaction ${activeClassName}`}
      onClick={() => reactOnEvent(eventName)}
    >
      <p>{eventName}</p>
    </div>
  );

  function reactOnEvent(eventName: string): void {
    setIsActive(!isActive);
    onEvent({ name: eventName, state: !isActive });
  }
}
