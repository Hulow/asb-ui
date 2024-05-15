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
      crop={{
        type: 'auto',
        source: true,
      }}
      alt={''}
      radius={15}
      priority={true}
    />
  );
}
