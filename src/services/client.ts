import axios from 'axios';
import { config } from '../config/config';

interface AxiosConfig {
  url: string;
  authorization: string;
}

const client = (config: AxiosConfig) => {
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
