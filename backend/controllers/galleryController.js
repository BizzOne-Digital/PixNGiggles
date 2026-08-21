import Gallery from '../models/Gallery.js';
import { asyncHandler } from '../utils/helpers.js';
import { uploadToCloudinary, deleteFromCloudinary } from '../services/cloudinaryService.js';

export const getGallery = asyncHandler(async (req, res) => {
  const { category, featured, admin } = req.query;
  const filter = admin === 'true' ? {} : { isActive: true };
  if (category && category !== 'All') filter.category = category;
  if (featured === 'true') filter.isFeatured = true;

  const images = await Gallery.find(filter).sort({ displayOrder: 1, createdAt: -1 });
  res.json({ success: true, data: images });
});

export const getGalleryItem = asyncHandler(async (req, res) => {
  const item = await Gallery.findById(req.params.id);
  if (!item) {
    res.status(404);
    throw new Error('Gallery item not found');
  }
  res.json({ success: true, data: item });
});

export const createGalleryItem = asyncHandler(async (req, res) => {
  const data = { ...req.body };
  if (data.isFeatured !== undefined) data.isFeatured = data.isFeatured === 'true' || data.isFeatured === true;
  if (data.isActive !== undefined) data.isActive = data.isActive === 'true' || data.isActive === true;

  if (req.file) {
    data.image = await uploadToCloudinary(req.file.buffer, 'pixngiggles/gallery');
  } else {
    res.status(400);
    throw new Error('Image is required');
  }

  const item = await Gallery.create(data);
  res.status(201).json({ success: true, data: item });
});

export const createMultipleGalleryItems = asyncHandler(async (req, res) => {
  if (!req.files || req.files.length === 0) {
    res.status(400);
    throw new Error('At least one image is required');
  }

  const { category = 'Weddings', altText = '' } = req.body;
  const items = [];

  for (const file of req.files) {
    const image = await uploadToCloudinary(file.buffer, 'pixngiggles/gallery');
    const item = await Gallery.create({
      title: file.originalname.replace(/\.[^/.]+$/, ''),
      altText: altText || 'PixNGiggles event photo',
      category,
      image,
    });
    items.push(item);
  }

  res.status(201).json({ success: true, data: items, message: `${items.length} images uploaded` });
});

export const updateGalleryItem = asyncHandler(async (req, res) => {
  const item = await Gallery.findById(req.params.id);
  if (!item) {
    res.status(404);
    throw new Error('Gallery item not found');
  }

  const data = { ...req.body };
  if (data.isFeatured !== undefined) data.isFeatured = data.isFeatured === 'true' || data.isFeatured === true;
  if (data.isActive !== undefined) data.isActive = data.isActive === 'true' || data.isActive === true;

  if (req.file) {
    if (item.image?.publicId) await deleteFromCloudinary(item.image.publicId);
    data.image = await uploadToCloudinary(req.file.buffer, 'pixngiggles/gallery');
  }

  const updated = await Gallery.findByIdAndUpdate(req.params.id, data, { new: true, runValidators: true });
  res.json({ success: true, data: updated });
});

export const deleteGalleryItem = asyncHandler(async (req, res) => {
  const item = await Gallery.findById(req.params.id);
  if (!item) {
    res.status(404);
    throw new Error('Gallery item not found');
  }
  if (item.image?.publicId) await deleteFromCloudinary(item.image.publicId);
  await item.deleteOne();
  res.json({ success: true, message: 'Gallery item deleted' });
});

export const reorderGallery = asyncHandler(async (req, res) => {
  const { items } = req.body;
  const updates = items.map((item) =>
    Gallery.findByIdAndUpdate(item.id, { displayOrder: item.displayOrder })
  );
  await Promise.all(updates);
  res.json({ success: true, message: 'Gallery reordered' });
});

export const getGalleryStats = asyncHandler(async (req, res) => {
  const total = await Gallery.countDocuments();
  res.json({ success: true, data: { total } });
});
