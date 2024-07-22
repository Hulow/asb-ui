import { HomePage } from '../components/Home/Home';
import { config } from '../config/config';
import { PictureMetadata, cloudinaryHandler } from '../handlers/cloudinary';
import { CabinetOverview } from '../types/cabinet-overview';

export default async function Home() {
  const cabinets = await getCabinets();
  const pictureMetadata: PictureMetadata = await cloudinaryHandler(
    `${config.cloudinary.apiUrl}?public_ids=chamber%2Froom`
  );

  if (!cabinets.length || !pictureMetadata) {
    return <div>Web Application in maintenance</div>;
  }

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
