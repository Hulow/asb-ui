import { HomePage } from '../components/Home/Home';
import { config } from '../config/config';
import { CabinetOverview } from '../types/cabinet-overview';

interface CloudinaryResponse {
  resources: CloudinaryImageDto[];
}
interface CloudinaryImageDto {
  width: number;
  height: number;
  secure_url: string;
}
export type PictureMetadata = {
  url: string;
  width: number;
  height: number;
  ratio: string;
};

export default async function Home() {
  const cabinets = await getCabinets();
  const cloudinaryData: CloudinaryResponse = await getPictureMetadata();

  if (!cabinets.length || !cloudinaryData.resources) {
    return <div>Web Application in maintenance</div>;
  }

  const pictureMetadata = mapPicture(cloudinaryData);

  return <HomePage cabinets={cabinets} pictureMetadata={pictureMetadata} />;
}

async function getCabinets(): Promise<CabinetOverview[]> {
  const cabinets = await fetch(
    `${config.asbBaseUrl}${config.endpoints.cabinets}`,
    {
      headers: {
        Authorization: config.asbKeyUrl,
      },
      cache: 'no-store',
    }
  );

  if (!cabinets.ok) {
    throw new Error('Failed to get cabinets');
  }

  return await cabinets.json();
}

async function getPictureMetadata(): Promise<CloudinaryResponse> {
  const cloudinaryResponse = await fetch(
    `${config.cloudinary.apiUrl}?public_ids=chamber%2Froom`,
    {
      headers: {
        Authorization: Buffer.from(
          `${config.cloudinary.apiKey}:${config.cloudinary.apiSecret}`
        ).toString('base64'),
      },
      cache: 'no-store',
    }
  );
  if (!cloudinaryResponse.ok) {
    throw new Error('Failed to fetch cloudinary metadata');
  }

  return await cloudinaryResponse.json();
}

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
