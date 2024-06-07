interface Config {
  asbBaseUrl: string;
  asbKeyUrl: string;
  endpoints: {
    cabinets: string;
    measurements: string;
  };
}

export const config: Config = {
  asbBaseUrl: process.env.NEXT_PUBLIC_ASB_BASE_URL!,
  asbKeyUrl: process.env.NEXT_PUBLIC_ASB_KEY_URL!,
  endpoints: {
    cabinets: '/api/cabinets',
    measurements: '/api/measurement',
  },
};
