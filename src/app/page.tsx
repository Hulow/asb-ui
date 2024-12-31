import path from 'path';
import { HomePage } from '../components/Home/Home';
import { config } from '../config/config';
import { asbHandler } from '../handlers/asb';
import sizeOf from 'image-size';
import texts from '../data/texts.json';
import NewHome from './newPage';

const isUsingNewApp = process.env.USE_NEW_APP === 'true';

export type PictureMetadata = {
  url: string;
  width: number;
  height: number;
  ratio: string;
  photographer?: string;
};

export interface PictureDimension {
  width?: number;
  height?: number;
  type?: string;
  orientation?: number;
}

export default async function Home() {
  if (isUsingNewApp) {
    return <NewHome />;
  }
  const asbEndpoint = `${config.asbBaseUrl}${config.endpoints.cabinets}`;
  const cabinets = await asbHandler(asbEndpoint);
  const roomMetadata = getPictureMetadata('/anechoic_chamber.jpg');
  const roomWithDoorMetadata = getPictureMetadata('/anechoic_chamber_door.jpg');
  const roomWithWallsMetadata = getPictureMetadata(
    '/anechoic_chamber_walls.jpg'
  );

  const picturesMetadata = {
    roomMetadata,
    roomWithDoorMetadata,
    roomWithWallsMetadata,
  };

  if (!cabinets.length) {
    return <div>{texts.appDown}</div>;
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
    photographer: texts.photographer,
  };
}
