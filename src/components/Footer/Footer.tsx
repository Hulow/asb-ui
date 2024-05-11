import './Footer.css';
import { CustomLink } from '../Link/Link';

export function Footer() {
  return (
    <div className='footer layout'>
      <div className='asb-ui'>
        <CustomLink
          href='https://github.com/Hulow/asb-web-app'
          children={<h3>ASB UI</h3>}
          target={true}
        />
      </div>
      <div className='asb-app'>
        <CustomLink
          href='https://github.com/Hulow/asb-app'
          children={<h3>ASB APP</h3>}
          target={true}
        />
      </div>
      <div className='email'>
        <h3>victor@asb.com</h3>
      </div>
    </div>
  );
}
