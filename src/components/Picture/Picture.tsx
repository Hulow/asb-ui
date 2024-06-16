'use client';
import Image from 'next/image';
import { config } from '../../config/config';

export function Picture({
  width,
  height,
  src,
}: {
  width: number;
  height: number;
  src: string;
}) {
  return (
    <Image
      src={`https://res.cloudinary.com/${config.cloudinary.name}/image/upload/${src}`}
      width={width}
      height={height}
      alt='Speaker'
    />
  );
}
