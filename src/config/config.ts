import getConfig from 'next/config';
import dotenv from 'dotenv';
dotenv.config();

interface Config {
  asbBaseUrl: string;
  asbKeyUrl: string;
  endpoints: {
    cabinets: string;
    measurements: string;
  };
}

const { nextConfig } = getConfig();

export const config: Config = {
  asbBaseUrl: nextConfig.asbBaseUrl,
  asbKeyUrl: nextConfig.asbKeyUrl,
  endpoints: {
    cabinets: '/api/cabinets',
    measurements: '/api/measurement',
  },
};

console.log(config);
