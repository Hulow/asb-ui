import { config } from '../config/config';
import { CabinetOverview } from '../types/cabinet-overview';
import { asbClient } from '../clients/asb';
import { HomePage } from '../components/Home/Home';
import { cloudinaryClient } from '../clients/cloudinary';

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

async function asbHandler(endpoint: string): Promise<CabinetOverview[]> {
  const response = await asbClient.get(endpoint);
  return response.data;
}

async function cloudinaryHandler(
  endpoint: string
): Promise<CloudinaryResponse> {
  const response = await cloudinaryClient.get(endpoint);
  return response.data;
}

export default async function Home() {
  const AsbEndpoint = config.endpoints.cabinets;
  const cabinets = await asbHandler(AsbEndpoint);
  const cloudinaryEndpoint = `${config.cloudinary.apiUrl}?public_ids=chamber%2Froom`;

  // const cloudinaryResponse = await cloudinaryHandler(cloudinaryEndpoint);
  // const pictureMetadata = mapPicture(cloudinaryResponse);
  const pictureMetadata = {
    url: 'string',
    width: 2,
    height: 2,
    ratio: 'string',
  };
  return <HomePage cabinets={cabinets} pictureMetadata={pictureMetadata} />;
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
