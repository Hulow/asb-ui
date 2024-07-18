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

async function fetchData(): Promise<{
  cabinets: CabinetOverview[];
  pictureMetadata: PictureMetadata | null;
}> {
  try {
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

    const cabinets = await cabinetsResponse.json();
    const cloudinaryData: CloudinaryResponse = await cloudinaryResponse.json();

    const pictureMetadata = mapPicture(cloudinaryData);

    return { cabinets, pictureMetadata };
  } catch (error) {
    console.error('Error fetching data:', error);
    return { cabinets: [], pictureMetadata: null };
  }
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

const Home = async () => {
  const { cabinets, pictureMetadata } = await fetchData();

  if (!cabinets.length || !pictureMetadata) {
    return <div>Failed to load data</div>;
  }

  return <HomePage cabinets={cabinets} pictureMetadata={pictureMetadata} />;
};

export default Home;
