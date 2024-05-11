import './Logo.css';
import Image from 'next/image';

interface props {
  route: string;
  width: number;
  height: number;
  alt: string;
}

export function Logo(props: props) {
  return (
    <div className='logo-container flex-column-center'>
      <Image
        priority
        src={props.route}
        width={props.width}
        height={props.height}
        alt={props.alt}
      />
    </div>
  );
}
