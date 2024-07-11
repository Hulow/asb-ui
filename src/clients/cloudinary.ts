import axios from 'axios';
import { config } from '../config/config';

export interface CloudinaryAxiosConfig {
  url: string;
  auth: {
    username: string;
    password: string;
  };
  params: {
    public_ids: string;
  };
}

const token = `Basic ${Buffer.from(config.cloudinary.apiKey + ':' + config.cloudinary.apiSecret).toString('base64')}`;

const client = () => {
  return axios.create({
    baseURL: config.cloudinary.apiUrl,
    headers: {
      // 'Content-Type': 'application/json',
      Authorization: token,
    },
    auth: {
      username: config.cloudinary.apiKey,
      password: config.cloudinary.apiSecret,
    },
  });
};

export const cloudinaryClient = async () => {
  const cloudinaryClient = client();
  try {
    // const response = await cloudinaryClient.get('/resources/image/upload', {
    //   params: {
    //     public_ids: publicId,
    //   },
    // });
    const response = await fetch(
      `${config.cloudinary.apiUrl}/resources/image/upload?public_ids=chamber/room`,
      {
        headers: {
          Authorization: token,
          'Content-Type': 'application/json',
        },
        // params: {
        //   public_ids: publicId,
        // }
      }
    );
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
