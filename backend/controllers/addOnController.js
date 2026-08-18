import AddOn from '../models/AddOn.js';
import { asyncHandler } from '../utils/helpers.js';
import { uploadToCloudinary, deleteFromCloudinary } from '../services/cloudinaryService.js';

export const getAddOns = asyncHandler(async (req, res) => {
  const isAdmin = req.query.admin === 'true';
  const filter = isAdmin ? {} : { isActive: true };
  const addons = await AddOn.find(filter).sort({ displayOrder: 1 });
  res.json({ success: true, data: addons });
});

export const getAddOn = asyncHandler(async (req, res) => {
  const addon = await AddOn.findById(req.params.id);
  if (!addon) {
    res.status(404);
    throw new Error('Add-on not found');
  }
  res.json({ success: true, data: addon });
});

export const createAddOn = asyncHandler(async (req, res) => {
  const data = { ...req.body };
  if (data.isActive !== undefined) data.isActive = data.isActive === 'true' || data.isActive === true;

  if (req.file) {
    data.image = await uploadToCloudinary(req.file.buffer, 'pixngiggles/addons');
  }

  const addon = await AddOn.create(data);
  res.status(201).json({ success: true, data: addon });
});

export const updateAddOn = asyncHandler(async (req, res) => {
  const addon = await AddOn.findById(req.params.id);
  if (!addon) {
    res.status(404);
    throw new Error('Add-on not found');
  }

  const data = { ...req.body };
  if (data.isActive !== undefined) data.isActive = data.isActive === 'true' || data.isActive === true;

  if (req.file) {
    if (addon.image?.publicId) await deleteFromCloudinary(addon.image.publicId);
    data.image = await uploadToCloudinary(req.file.buffer, 'pixngiggles/addons');
  }

  const updated = await AddOn.findByIdAndUpdate(req.params.id, data, { new: true, runValidators: true });
  res.json({ success: true, data: updated });
});

export const deleteAddOn = asyncHandler(async (req, res) => {
  const addon = await AddOn.findById(req.params.id);
  if (!addon) {
    res.status(404);
    throw new Error('Add-on not found');
  }
  if (addon.image?.publicId) await deleteFromCloudinary(addon.image.publicId);
  await addon.deleteOne();
  res.json({ success: true, message: 'Add-on deleted' });
});

export const reorderAddOns = asyncHandler(async (req, res) => {
  const { items } = req.body;
  const updates = items.map((item) =>
    AddOn.findByIdAndUpdate(item.id, { displayOrder: item.displayOrder })
  );
  await Promise.all(updates);
  res.json({ success: true, message: 'Add-ons reordered' });
});
