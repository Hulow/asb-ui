interface Config {
  asbBaseUrl: string;
  asbKeyUrl: string;
  env: string;
  endpoints: {
    cabinets: string;
    measurements: string;
  };
  cloudinary: {
    name: string;
  };
}

export const config: Config = {
  asbBaseUrl: process.env.ASB_BASE_URL!,
  asbKeyUrl: process.env.ASB_KEY_URL!,
  env: process.env.NODE_ENV!,
  endpoints: {
    cabinets: '/api/cabinets',
    measurements: '/api/measurement',
  },
  cloudinary: {
    name: process.env.CLOUDINARY_CLOUD_NAME!,
  },
};
