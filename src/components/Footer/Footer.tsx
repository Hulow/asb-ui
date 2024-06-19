import '../../styles/components/footer.scss';
import texts from '../../data/texts.json';
import { CustomLink } from '../Link/Link';

export function Footer() {
  return (
    <div className='footer layout'>
      <div className='footer-item'>
        <CustomLink href={texts.asbUiUrl} target={true}>
          <p>{texts.asbUi}</p>
        </CustomLink>
      </div>
      <div className='footer-item'>
        <CustomLink href={texts.asbAppUrl} target={true}>
          <p>{texts.asbApp}</p>
        </CustomLink>
      </div>
      <div className='footer-item'>
        <p>{texts.emailAddress}</p>
      </div>
    </div>
  );
}
