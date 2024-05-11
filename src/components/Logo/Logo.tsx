import Image from 'next/image';

interface props {
  route: string;
  width: number;
  height: number;
  alt: string;
}

export function Logo(props: props) {
  return (
    <div className='logo-container'>
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
