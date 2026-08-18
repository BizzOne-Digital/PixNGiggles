import Testimonial from '../models/Testimonial.js';
import { asyncHandler } from '../utils/helpers.js';
import { uploadToCloudinary, deleteFromCloudinary } from '../services/cloudinaryService.js';

export const getTestimonials = asyncHandler(async (req, res) => {
  const isAdmin = req.query.admin === 'true';
  const filter = isAdmin ? {} : { isActive: true };
  const testimonials = await Testimonial.find(filter).sort({ displayOrder: 1 });
  res.json({ success: true, data: testimonials });
});

export const getTestimonial = asyncHandler(async (req, res) => {
  const testimonial = await Testimonial.findById(req.params.id);
  if (!testimonial) {
    res.status(404);
    throw new Error('Testimonial not found');
  }
  res.json({ success: true, data: testimonial });
});

export const createTestimonial = asyncHandler(async (req, res) => {
  const data = { ...req.body };
  if (data.isActive !== undefined) data.isActive = data.isActive === 'true' || data.isActive === true;
  if (data.rating) data.rating = Number(data.rating);

  if (req.file) {
    data.image = await uploadToCloudinary(req.file.buffer, 'pixngiggles/testimonials');
  }

  const testimonial = await Testimonial.create(data);
  res.status(201).json({ success: true, data: testimonial });
});

export const updateTestimonial = asyncHandler(async (req, res) => {
  const testimonial = await Testimonial.findById(req.params.id);
  if (!testimonial) {
    res.status(404);
    throw new Error('Testimonial not found');
  }

  const data = { ...req.body };
  if (data.isActive !== undefined) data.isActive = data.isActive === 'true' || data.isActive === true;
  if (data.rating) data.rating = Number(data.rating);

  if (req.file) {
    if (testimonial.image?.publicId) await deleteFromCloudinary(testimonial.image.publicId);
    data.image = await uploadToCloudinary(req.file.buffer, 'pixngiggles/testimonials');
  }

  const updated = await Testimonial.findByIdAndUpdate(req.params.id, data, { new: true, runValidators: true });
  res.json({ success: true, data: updated });
});

export const deleteTestimonial = asyncHandler(async (req, res) => {
  const testimonial = await Testimonial.findById(req.params.id);
  if (!testimonial) {
    res.status(404);
    throw new Error('Testimonial not found');
  }
  if (testimonial.image?.publicId) await deleteFromCloudinary(testimonial.image.publicId);
  await testimonial.deleteOne();
  res.json({ success: true, message: 'Testimonial deleted' });
});
