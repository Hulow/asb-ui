'use client';
import Image from 'next/image';
import styles from '../../styles/components/image.module.scss';
import { config } from '../../config/config';

export function CustomImage({ src }: { src: string }) {
  return (
    <Image
      className={styles['image']}
      src={`https://res.cloudinary.com/${config.cloudinary.name}/image/upload/${src}`}
      width={350}
      height={500}
      alt='prop'
      priority={true}
    />
  );
}
