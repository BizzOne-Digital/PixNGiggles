import FAQ from '../models/FAQ.js';
import { asyncHandler } from '../utils/helpers.js';

export const getFAQs = asyncHandler(async (req, res) => {
  const isAdmin = req.query.admin === 'true';
  const filter = isAdmin ? {} : { isActive: true };
  const faqs = await FAQ.find(filter).sort({ displayOrder: 1 });
  res.json({ success: true, data: faqs });
});

export const getFAQ = asyncHandler(async (req, res) => {
  const faq = await FAQ.findById(req.params.id);
  if (!faq) {
    res.status(404);
    throw new Error('FAQ not found');
  }
  res.json({ success: true, data: faq });
});

export const createFAQ = asyncHandler(async (req, res) => {
  const data = { ...req.body };
  if (data.isActive !== undefined) data.isActive = data.isActive === 'true' || data.isActive === true;
  const faq = await FAQ.create(data);
  res.status(201).json({ success: true, data: faq });
});

export const updateFAQ = asyncHandler(async (req, res) => {
  const data = { ...req.body };
  if (data.isActive !== undefined) data.isActive = data.isActive === 'true' || data.isActive === true;
  const faq = await FAQ.findByIdAndUpdate(req.params.id, data, { new: true, runValidators: true });
  if (!faq) {
    res.status(404);
    throw new Error('FAQ not found');
  }
  res.json({ success: true, data: faq });
});

export const deleteFAQ = asyncHandler(async (req, res) => {
  const faq = await FAQ.findByIdAndDelete(req.params.id);
  if (!faq) {
    res.status(404);
    throw new Error('FAQ not found');
  }
  res.json({ success: true, message: 'FAQ deleted' });
});
