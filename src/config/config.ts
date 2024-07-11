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
    apiUrl: string;
    apiKey: string;
    apiSecret: string;
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
    apiUrl: `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/resources/image/upload`,
    apiKey: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY!,
    apiSecret: process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET!,
  },
};
