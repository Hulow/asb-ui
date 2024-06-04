interface Config {
  asbBaseUrl: string;
  asbKeyUrl: string;
  endpoints: {
    cabinets: string;
    measurements: string;
  };
}

export const config: Config = {
  asbBaseUrl: process.env.NEXT_PUBLIC_ASB_BASE_URL as string,
  asbKeyUrl: process.env.NEXT_PUBLIC_ASB_KEY_URL as string,
  endpoints: {
    cabinets: '/api/cabinets',
    measurements: '/api/measurement',
  },
};

console.log(config);
