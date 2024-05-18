import { CldImage } from 'next-cloudinary';

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
    <CldImage
      width={width}
      height={height}
      src={src}
      alt={''}
      radius={150}
      priority={true}
    />
  );
}
