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

const Home = async () => {
  const [cabinets, pictureMetadata] = await Promise.all([
    getCabinets(),
    getPicture(),
  ]);

  return <HomePage cabinets={cabinets} pictureMetadata={pictureMetadata} />;
};

export default Home;

async function getCabinets(): Promise<CabinetOverview[]> {
  const cabinetsResponse = await fetch(
    `${config.asbBaseUrl}${config.endpoints.cabinets}`,
    {
      headers: {
        Authorization: config.asbKeyUrl,
      },
    }
  );

  if (!cabinetsResponse.ok) {
    throw new Error('Failed to get cabinets');
  }

  return await cabinetsResponse.json();
}

async function getPicture(): Promise<PictureMetadata> {
  const cloudinaryResponse = await fetch(
    `${config.cloudinary.apiUrl}?public_ids=chamber%2Froom`,
    {
      headers: {
        Authorization: Buffer.from(
          `${config.cloudinary.apiKey}:${config.cloudinary.apiSecret}`
        ).toString('base64'),
      },
    }
  );
  if (!cloudinaryResponse.ok) {
    throw new Error('Failed to fetch cloudinary metadata');
  }

  const cloudinaryData: CloudinaryResponse = await cloudinaryResponse.json();

  return mapPicture(cloudinaryData);
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

function gcd(a: number, b: number): number {
  return b === 0 ? a : gcd(b, a % b);
}

function calculateAspectRatio(width: number, height: number): string {
  const divisor = gcd(width, height);
  const aspectRatioWidth = width / divisor;
  const aspectRatioHeight = height / divisor;
  return `${aspectRatioWidth}:${aspectRatioHeight}`;
}
