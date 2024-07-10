import { config } from '../config/config';
import { client } from './axios';

export const asbClient = client({
  url: config.asbBaseUrl,
  authorization: config.asbKeyUrl,
});
