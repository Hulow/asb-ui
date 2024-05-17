import './Footer.css';
import texts from '../../data/texts.json';
import { CustomLink } from '../Link/Link';

export function Footer() {
  return (
    <div className='footer layout'>
      <div className='asb-ui'>
        <CustomLink
          href={texts.asbUiUrl}
          children={<h4>{texts.asbUi}</h4>}
          target={true}
        />
      </div>
      <div className='asb-app'>
        <CustomLink
          href={texts.asbAppUrl}
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
