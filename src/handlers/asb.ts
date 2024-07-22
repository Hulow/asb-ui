import { config } from '../config/config';

export interface AsbAxiosConfig {
  url: string;
  authorization: string;
}

export const asbHandler = async (endpoint: string) => {
  const response = await fetch(endpoint, {
    headers: {
      Authorization: config.asbKeyUrl,
    },
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error('Failed to get cabinets');
  }

  return await response.json();
};
