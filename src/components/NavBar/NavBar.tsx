import './NavBar.css';
import { Button } from '../Button/Button';
import texts from '../../data/texts.json';

export function NavBar() {
  return (
    <div className='nav-bar'>
      <Button
        classNames={['nav-bar-item']}
        children={<h1>{texts.about}</h1>}
      />
      <Button
        classNames={['nav-bar-item']}
        children={<h1>{texts.content}</h1>}
      />
      <Button
        classNames={['nav-bar-item']}
        children={<h1>{texts.measurements}</h1>}
      />
    </div>
  );
}
