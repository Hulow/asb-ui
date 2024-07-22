import { HomePage } from '../components/Home/Home';
import { config } from '../config/config';
import { asbHandler } from '../handlers/asb';
import { PictureMetadata, cloudinaryHandler } from '../handlers/cloudinary';

export default async function Home() {
  const cabinets = await asbHandler(
    `${config.asbBaseUrl}${config.endpoints.cabinets}`
  );
  const pictureMetadata: PictureMetadata = await cloudinaryHandler(
    `${config.cloudinary.apiUrl}?public_ids=chamber%2Froom`
  );

  if (!cabinets.length || !pictureMetadata) {
    return <div>Web Application in maintenance</div>;
  }

  return <HomePage cabinets={cabinets} pictureMetadata={pictureMetadata} />;
}
