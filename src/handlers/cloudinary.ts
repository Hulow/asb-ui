import { PictureMetadata } from '../app/page';
import { config } from '../config/config';

interface CloudinaryResponse {
  resources: CloudinaryImageDto[];
}
interface CloudinaryImageDto {
  width: number;
  height: number;
  secure_url: string;
}

const token = `Basic ${Buffer.from(config.cloudinary.apiKey + ':' + config.cloudinary.apiSecret).toString('base64')}`;

export const cloudinaryHandler = async (
  endpoint: string
): Promise<PictureMetadata> => {
  const cloudinaryResponse = await fetch(endpoint, {
    headers: {
      Authorization: token,
    },
  });
  if (!cloudinaryResponse.ok) {
    throw new Error('Failed to fetch cloudinary metadata');
  }

  const picture = await cloudinaryResponse.json();
  return mapPicture(picture);
};

function mapPicture(resp: CloudinaryResponse): PictureMetadata {
  const picture = resp.resources[0];
  return {
    url: picture.secure_url,
    width: picture.width,
    height: picture.height,
    ratio: calculateAspectRatio(picture.width, picture.height),
  };
}

function calculateAspectRatio(width: number, height: number): string {
  const divisor = gcd(width, height);
  const aspectRatioWidth = width / divisor;
  const aspectRatioHeight = height / divisor;
  return `${aspectRatioWidth}:${aspectRatioHeight}`;
}

function gcd(a: number, b: number): number {
  return b === 0 ? a : gcd(b, a % b);
}
