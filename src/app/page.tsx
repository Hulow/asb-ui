import path from 'path';
import { HomePage } from '../components/Home/Home';
import { config } from '../config/config';
import { asbHandler } from '../handlers/asb';
import { PictureMetadata } from '../handlers/cloudinary';
import sizeOf from 'image-size';

export default async function Home() {
  const asbEndpoint = `${config.asbBaseUrl}${config.endpoints.cabinets}`;
  const cabinets = await asbHandler(asbEndpoint);
  const pictureMetadata = getPictureMetadata();

  if (!cabinets.length || !pictureMetadata) {
    return <div>Web Application in maintenance</div>;
  }

  return <HomePage cabinets={cabinets} pictureMetadata={pictureMetadata} />;
}

function getPictureMetadata(): PictureMetadata {
  const imagesPath = path.resolve('./public/anechoic_chamber.jpg');
  const dimension = sizeOf(imagesPath);
  return mapPictureDimension(dimension, '/anechoic_chamber.jpg');
}

function mapPictureDimension(
  dimension: PictureDimension,
  url: string
): PictureMetadata {
  return {
    url,
    height: dimension.height!,
    width: dimension.width!,
    ratio: 'string',
  };
}

export interface PictureDimension {
  width?: number;
  height?: number;
  type?: string;
  orientation?: number;
}
