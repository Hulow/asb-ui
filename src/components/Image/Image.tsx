'use client';
import Image from 'next/image';
import { config } from '../../config/config';

export function CustomImage({ src }: { src: string }) {
  return (
    <Image
      src={`https://res.cloudinary.com/${config.cloudinary.name}/image/upload/${src}`}
      width={350}
      height={500}
      alt='Speaker'
    />
  );
}
