import Service from '../models/Service.js';
import { asyncHandler, slugify, parseJSONField } from '../utils/helpers.js';
import { uploadToCloudinary, deleteFromCloudinary } from '../services/cloudinaryService.js';

export const getServices = asyncHandler(async (req, res) => {
  const isAdmin = req.query.admin === 'true';
  const filter = isAdmin ? {} : { isActive: true };
  const services = await Service.find(filter).sort({ displayOrder: 1 });
  res.json({ success: true, data: services });
});

export const getService = asyncHandler(async (req, res) => {
  const service = await Service.findById(req.params.id);
  if (!service) {
    res.status(404);
    throw new Error('Service not found');
  }
  res.json({ success: true, data: service });
});

export const createService = asyncHandler(async (req, res) => {
  const data = { ...req.body };
  data.features = parseJSONField(data.features);
  if (!data.slug) data.slug = slugify(data.title);

  if (req.file) {
    data.image = await uploadToCloudinary(req.file.buffer, 'pixngiggles/services');
  }

  const service = await Service.create(data);
  res.status(201).json({ success: true, data: service });
});

export const updateService = asyncHandler(async (req, res) => {
  const service = await Service.findById(req.params.id);
  if (!service) {
    res.status(404);
    throw new Error('Service not found');
  }

  const data = { ...req.body };
  if (data.features) data.features = parseJSONField(data.features);
  if (data.isActive !== undefined) data.isActive = data.isActive === 'true' || data.isActive === true;

  if (req.file) {
    if (service.image?.publicId) await deleteFromCloudinary(service.image.publicId);
    data.image = await uploadToCloudinary(req.file.buffer, 'pixngiggles/services');
  }

  const updated = await Service.findByIdAndUpdate(req.params.id, data, { new: true, runValidators: true });
  res.json({ success: true, data: updated });
});

export const deleteService = asyncHandler(async (req, res) => {
  const service = await Service.findById(req.params.id);
  if (!service) {
    res.status(404);
    throw new Error('Service not found');
  }
  if (service.image?.publicId) await deleteFromCloudinary(service.image.publicId);
  await service.deleteOne();
  res.json({ success: true, message: 'Service deleted' });
});

export const reorderServices = asyncHandler(async (req, res) => {
  const { items } = req.body;
  const updates = items.map((item) =>
    Service.findByIdAndUpdate(item.id, { displayOrder: item.displayOrder })
  );
  await Promise.all(updates);
  res.json({ success: true, message: 'Services reordered' });
});
