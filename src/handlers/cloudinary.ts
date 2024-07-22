import { config } from '../config/config';

const token = `Basic ${Buffer.from(config.cloudinary.apiKey + ':' + config.cloudinary.apiSecret).toString('base64')}`;

export const cloudinaryHandler = async (endpoint: string) => {
  const cloudinaryResponse = await fetch(endpoint, {
    headers: {
      Authorization: token,
    },
  });
  if (!cloudinaryResponse.ok) {
    throw new Error('Failed to fetch cloudinary metadata');
  }

  return await cloudinaryResponse.json();
};
