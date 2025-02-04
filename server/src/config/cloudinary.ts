import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.PHOTOS_CLOUD_NAME,
  api_key: process.env.PHOTOS_API_KEY,
  api_secret: process.env.PHOTOS_API_SECRET
});

export default cloudinary;