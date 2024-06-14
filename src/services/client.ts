import axios from 'axios';
import { config } from '../config/config';

export const client = axios.create({
  baseURL: config.asbBaseUrl,
  headers: {
    'Content-Type': 'application/json',
    Authorization: config.asbKeyUrl,
  },
});
