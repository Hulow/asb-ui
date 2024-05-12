import './NavBar.css';
import texts from '../../data/texts.json';
import { NavBarItem } from './NabBarItem/NavBarItem';

export function NavBar({ onEvent }: { onEvent: any }) {
  return (
    <div className='nav-bar'>
      <NavBarItem onEvent={reactOnEvent} eventName={texts.content} />
      <NavBarItem onEvent={reactOnEvent} eventName={texts.about} />
      <NavBarItem onEvent={reactOnEvent} eventName={texts.measurements} />
    </div>
  );

  function reactOnEvent(event: any): void {
    onEvent(event);
  }
}
