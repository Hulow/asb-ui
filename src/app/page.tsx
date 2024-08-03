import path from 'path';
import { HomePage } from '../components/Home/Home';
import { config } from '../config/config';
import { asbHandler } from '../handlers/asb';
import sizeOf from 'image-size';

export type PictureMetadata = {
  url: string;
  width: number;
  height: number;
  ratio: string;
};

export default async function Home() {
  const asbEndpoint = `${config.asbBaseUrl}${config.endpoints.cabinets}`;
  const cabinets = await asbHandler(asbEndpoint);
  const roomMetadata = getPictureMetadata('/anechoic_chamber.jpg');
  const roomWithDoorMetadata = getPictureMetadata('/anechoic_chamber_door.jpg');

  const picturesMetadata = {
    roomMetadata,
    roomWithDoorMetadata,
  };

  if (!cabinets.length) {
    return <div>Web Application in maintenance</div>;
  }

  return <HomePage cabinets={cabinets} picturesMetadata={picturesMetadata} />;
}

function getPictureMetadata(url: string): PictureMetadata {
  const imagesPath = path.resolve(`./public${url}`);
  const dimension = sizeOf(imagesPath);
  return mapPictureDimension(dimension, url);
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
