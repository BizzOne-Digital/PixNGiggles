import Booth from '../models/Booth.js';
import { asyncHandler, slugify, parseJSONField } from '../utils/helpers.js';
import { uploadToCloudinary, deleteFromCloudinary } from '../services/cloudinaryService.js';

export const getBooths = asyncHandler(async (req, res) => {
  const isAdmin = req.query.admin === 'true';
  const filter = isAdmin ? {} : { isActive: true };
  const booths = await Booth.find(filter).sort({ displayOrder: 1 });
  res.json({ success: true, data: booths });
});

export const getBooth = asyncHandler(async (req, res) => {
  const booth = await Booth.findById(req.params.id);
  if (!booth) {
    res.status(404);
    throw new Error('Booth not found');
  }
  res.json({ success: true, data: booth });
});

export const createBooth = asyncHandler(async (req, res) => {
  const data = { ...req.body };
  data.features = parseJSONField(data.features);
  if (!data.slug) data.slug = slugify(data.title);
  if (data.isPremium !== undefined) data.isPremium = data.isPremium === 'true' || data.isPremium === true;
  if (data.isActive !== undefined) data.isActive = data.isActive === 'true' || data.isActive === true;

  if (req.file) {
    data.image = await uploadToCloudinary(req.file.buffer, 'pixngiggles/booths');
  }

  const booth = await Booth.create(data);
  res.status(201).json({ success: true, data: booth });
});

export const updateBooth = asyncHandler(async (req, res) => {
  const booth = await Booth.findById(req.params.id);
  if (!booth) {
    res.status(404);
    throw new Error('Booth not found');
  }

  const data = { ...req.body };
  if (data.features) data.features = parseJSONField(data.features);
  if (data.isPremium !== undefined) data.isPremium = data.isPremium === 'true' || data.isPremium === true;
  if (data.isActive !== undefined) data.isActive = data.isActive === 'true' || data.isActive === true;

  if (req.file) {
    if (booth.image?.publicId) await deleteFromCloudinary(booth.image.publicId);
    data.image = await uploadToCloudinary(req.file.buffer, 'pixngiggles/booths');
  }

  const updated = await Booth.findByIdAndUpdate(req.params.id, data, { new: true, runValidators: true });
  res.json({ success: true, data: updated });
});

export const deleteBooth = asyncHandler(async (req, res) => {
  const booth = await Booth.findById(req.params.id);
  if (!booth) {
    res.status(404);
    throw new Error('Booth not found');
  }
  if (booth.image?.publicId) await deleteFromCloudinary(booth.image.publicId);
  await booth.deleteOne();
  res.json({ success: true, message: 'Booth deleted' });
});

export const reorderBooths = asyncHandler(async (req, res) => {
  const { items } = req.body;
  const updates = items.map((item) =>
    Booth.findByIdAndUpdate(item.id, { displayOrder: item.displayOrder })
  );
  await Promise.all(updates);
  res.json({ success: true, message: 'Booths reordered' });
});
