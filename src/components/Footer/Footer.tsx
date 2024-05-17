import './Footer.css';
import texts from '../../data/texts.json';
import { CustomLink } from '../Link/Link';

export function Footer() {
  return (
    <div className='footer layout'>
      <div className='asb-ui'>
        <CustomLink
          href='https://github.com/Hulow/asb-ui'
          children={<h4>{texts.asbUi}</h4>}
          target={true}
        />
      </div>
      <div className='asb-app'>
        <CustomLink
          href='https://github.com/Hulow/asb-app'
          children={<h4>{texts.asbApp}</h4>}
          target={true}
        />
      </div>
      <div className='email'>
        <h4>{texts.emailAddress}</h4>
      </div>
    </div>
  );
}
