import Image from 'next/image';

import styles from '../../styles/components/picture.module.scss';
import { PictureMetadata } from '../../app/page';

export function CustomPicture({ pictureMetadata }: { pictureMetadata: PictureMetadata }) {
  return (
    <Image
      className={styles['picture']}
      src={pictureMetadata.url}
      width={350}
      height={500}
      alt='prop'
      priority={true}
    />
  );
}
