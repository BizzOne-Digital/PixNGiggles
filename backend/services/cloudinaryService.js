import { cloudinary } from '../config/cloudinary.js';
import streamifier from 'streamifier';

export const uploadToCloudinary = (buffer, folder = 'pixngiggles') => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { folder, resource_type: 'image' },
      (error, result) => {
        if (error) return reject(error);
        resolve({
          publicId: result.public_id,
          url: result.url,
          secureUrl: result.secure_url,
        });
      }
    );
    streamifier.createReadStream(buffer).pipe(uploadStream);
  });
};

export const deleteFromCloudinary = async (publicId) => {
  if (!publicId) return null;
  try {
    return await cloudinary.uploader.destroy(publicId);
  } catch (error) {
    console.error('Cloudinary delete error:', error.message);
    return null;
  }
};

export const getOptimizedUrl = (publicId, options = {}) => {
  if (!publicId) return '';
  const { width = 800, height, crop = 'fill', quality = 'auto' } = options;
  return cloudinary.url(publicId, {
    width,
    height,
    crop,
    quality,
    fetch_format: 'auto',
  });
};
