interface Config {
  asbBaseUrl: string;
  asbKeyUrl: string;
  endpoints: {
    cabinets: string;
  };
}

export const config: Config = {
  asbBaseUrl: process.env.ASB_BASE_URL ?? 'http://localhost:8000',
  asbKeyUrl: process.env.ASB_KEY_URL ?? 'asb',
  endpoints: {
    cabinets: '/api/cabinets',
  },
};
