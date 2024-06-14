interface Config {
  asbBaseUrl: string;
  asbKeyUrl: string;
  endpoints: {
    cabinets: string;
    measurements: string;
  };
}

export const config: Config = {
  asbBaseUrl: process.env.ASB_BASE_URL!,
  asbKeyUrl: process.env.ASB_KEY_URL!,
  endpoints: {
    cabinets: '/api/cabinets',
    measurements: '/api/measurement',
  },
};
