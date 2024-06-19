import styles from '../../styles/components/logo.module.scss';

import Image from 'next/image';

interface props {
  route: string;
  alt: string;
}

export function Logo(props: props) {
  return (
    <div className='flex-column-center'>
      <Image
        priority
        className={styles['logo-image']}
        src={props.route}
        width={800}
        height={600}
        alt={props.alt}
      />
    </div>
  );
}
