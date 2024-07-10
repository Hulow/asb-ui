import axios from 'axios';
import { config } from '../config/config';

interface AxiosConfig {
  url: string;
  authorization: string;
}

export const client = (config: AxiosConfig) => {
  return axios.create({
    baseURL: config.url,
    headers: {
      'Content-Type': 'application/json',
      Authorization: config.authorization,
    },
  });
};
