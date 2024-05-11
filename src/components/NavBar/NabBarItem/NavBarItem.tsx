import './NavBarItem.css'

export function NavBarItem({
  eventName,
  onEvent,
}: {
  eventName: string;
  onEvent: any;
}) {
  return (
    <div className='nav-bar-item flex-center component' onClick={() => onEvent(eventName)}>
      <h1>{eventName}</h1>
    </div>
  );
}
