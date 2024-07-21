import axios from 'axios';
import { config } from '../config/config';

export interface CloudinaryAxiosConfig {
  url: string;
  authorization: string;
}

const token = `Basic ${Buffer.from(config.cloudinary.apiKey + ':' + config.cloudinary.apiSecret).toString('base64')}`;

const client = (configs: CloudinaryAxiosConfig) => {
  return axios.create({
    baseURL: configs.url,
    headers: {
      'Content-Type': 'application/json',
      Authorization: configs.authorization,
    },
  });
};

export const cloudinaryClient = client({
  url: config.cloudinary.apiUrl,
  authorization: token,
});
