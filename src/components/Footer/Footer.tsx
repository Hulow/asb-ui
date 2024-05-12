import './Footer.css';
import texts from '../../data/texts.json';
import { CustomLink } from '../Link/Link';

export function Footer() {
  return (
    <div className='footer layout'>
      <div className='asb-ui'>
        <CustomLink
          href='https://github.com/Hulow/asb-ui'
          children={<h3>{texts.asbUi}</h3>}
          target={true}
        />
      </div>
      <div className='asb-app'>
        <CustomLink
          href='https://github.com/Hulow/asb-app'
          children={<h3>{texts.asbApp}</h3>}
          target={true}
        />
      </div>
      <div className='email'>
        <h3>{texts.emailAddress}</h3>
      </div>
    </div>
  );
}
