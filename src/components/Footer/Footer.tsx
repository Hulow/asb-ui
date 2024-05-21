import './Footer.css';
import texts from '../../data/texts.json';
import { CustomLink } from '../Link/Link';

export function Footer() {
  return (
    <div className='footer layout'>
      <div className='asb-ui'>
        <CustomLink href={texts.asbUiUrl} target={true}>
          <h4>{texts.asbUi}</h4>
        </CustomLink>
      </div>
      <div className='asb-app'>
        <CustomLink href={texts.asbAppUrl} target={true}>
          <h4>{texts.asbApp}</h4>
        </CustomLink>
      </div>
      <div className='email'>
        <h4>{texts.emailAddress}</h4>
      </div>
    </div>
  );
}
