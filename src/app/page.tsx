import { HomePage } from '../components/Home/Home';
import { config } from '../config/config';
import { asbHandler } from '../handlers/asb';
import { cloudinaryHandler } from '../handlers/cloudinary';

export default async function Home() {
  const asbEndpoint = `${config.asbBaseUrl}${config.endpoints.cabinets}`;
  const cloudinaryEndpoint = `${config.cloudinary.apiUrl}?public_ids=chamber%2Froom`;
  const [cabinets, pictureMetadata] = await Promise.all([
    await asbHandler(asbEndpoint),
    await cloudinaryHandler(cloudinaryEndpoint),
  ]);

  if (!cabinets.length || !pictureMetadata) {
    return <div>Web Application in maintenance</div>;
  }

  return <HomePage cabinets={cabinets} pictureMetadata={pictureMetadata} />;
}
