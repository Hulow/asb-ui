'use client';
import Image from 'next/image';
import styles from '../../styles/components/image.module.scss';
import { PictureMetadata } from '../../handlers/cloudinary';

export function CustomImage({
  pictureMetadata,
}: {
  pictureMetadata: PictureMetadata;
}) {
  return (
    <Image
      className={styles['image']}
      src={pictureMetadata.url}
      width={350}
      height={500}
      alt='prop'
      priority={true}
    />
  );
}
