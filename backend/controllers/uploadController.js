import { asyncHandler } from '../utils/helpers.js';
import { uploadToCloudinary } from '../services/cloudinaryService.js';

export const uploadImage = asyncHandler(async (req, res) => {
  if (!req.file) {
    res.status(400);
    throw new Error('Image file is required');
  }

  const folder = req.body.folder || 'pixngiggles/uploads';
  const image = await uploadToCloudinary(req.file.buffer, folder);

  res.json({ success: true, data: image });
});

export const uploadMultipleImages = asyncHandler(async (req, res) => {
  if (!req.files || req.files.length === 0) {
    res.status(400);
    throw new Error('At least one image is required');
  }

  const folder = req.body.folder || 'pixngiggles/uploads';
  const images = [];

  for (const file of req.files) {
    const image = await uploadToCloudinary(file.buffer, folder);
    images.push(image);
  }

  res.json({ success: true, data: images });
});
