import Image from 'next/image';

import { config } from '../../config/config';
import styles from '../../styles/components/picture.module.scss';

export function CustomPicture({ src }: { src: string }) {
  return (
    <Image
      className={styles['picture']}
      src={`https://res.cloudinary.com/${config.cloudinary.name}/image/upload/${src}`}
      width={350}
      height={500}
      alt='prop'
      priority={true}
    />
  );
}
