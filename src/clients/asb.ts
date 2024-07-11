import axios from 'axios';
import { config } from '../config/config';

export interface AsbAxiosConfig {
  url: string;
  authorization: string;
}

const client = (config: AsbAxiosConfig) => {
  return axios.create({
    baseURL: config.url,
    headers: {
      'Content-Type': 'application/json',
      Authorization: config.authorization,
    },
  });
};

export const asbClient = client({
  url: config.asbBaseUrl,
  authorization: config.asbKeyUrl,
});
