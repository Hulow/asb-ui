import axios from 'axios';
import { config } from '../config/config';

export interface AsbAxiosConfig {
  url: string;
  authorization: string;
}

const handler = (configs: AsbAxiosConfig) => {
  return axios.create({
    baseURL: configs.url,
    headers: {
      'Content-Type': 'application/json',
      Authorization: configs.authorization,
    },
  });
};

export const asbHandler = handler({
  url: config.asbBaseUrl,
  authorization: config.asbKeyUrl,
});
