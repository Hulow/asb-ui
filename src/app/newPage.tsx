import Image from 'next/image';
import { CustomLink } from '../ components-new/CustomLink/CustomLink';

export default function NewHome() {
  return (
    <>
      <div className='logo'>
        <Image
          priority
          src='/ASB.svg'
          width={800}
          height={600}
          alt='Anechoic Station Berlin'
        />
      </div>
      <div className='menu'>
        <Menu />
      </div>
    </>
  );
}

const Menu = () => {
  return (
    <>
      <CustomLink href={'/about'}>
        <div className='btn'>ABOUT</div>
      </CustomLink>
      <CustomLink href={'/pictures'}>
        <div className='btn'>PICTURES</div>
      </CustomLink>
      <CustomLink href={'/measurements'}>
        <div className='btn'>MEASUREMENTS</div>
      </CustomLink>
    </>
  );
};
