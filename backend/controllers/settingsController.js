import SiteSettings from '../models/SiteSettings.js';
import { asyncHandler } from '../utils/helpers.js';
import { uploadToCloudinary, deleteFromCloudinary } from '../services/cloudinaryService.js';

export const getSettings = asyncHandler(async (req, res) => {
  let settings = await SiteSettings.findOne();
  if (!settings) {
    settings = await SiteSettings.create({});
  }
  res.json({ success: true, data: settings });
});

export const updateSettings = asyncHandler(async (req, res) => {
  let settings = await SiteSettings.findOne();
  if (!settings) {
    settings = await SiteSettings.create({});
  }

  const data = { ...req.body };

  if (data.socialLinks) {
    try {
      data.socialLinks = typeof data.socialLinks === 'string' ? JSON.parse(data.socialLinks) : data.socialLinks;
    } catch {
      /* keep existing */
    }
  }
  if (data.hero) {
    try {
      data.hero = typeof data.hero === 'string' ? JSON.parse(data.hero) : data.hero;
    } catch {
      /* keep existing */
    }
  }
  if (data.footer) {
    try {
      data.footer = typeof data.footer === 'string' ? JSON.parse(data.footer) : data.footer;
    } catch {
      /* keep existing */
    }
  }
  if (data.businessHours) {
    try {
      data.businessHours = typeof data.businessHours === 'string' ? JSON.parse(data.businessHours) : data.businessHours;
    } catch {
      /* keep existing */
    }
  }
  if (data.seo) {
    try {
      data.seo = typeof data.seo === 'string' ? JSON.parse(data.seo) : data.seo;
    } catch {
      /* keep existing */
    }
  }

  const updated = await SiteSettings.findByIdAndUpdate(settings._id, data, { new: true, runValidators: true });
  res.json({ success: true, data: updated });
});

export const uploadSettingsImage = asyncHandler(async (req, res) => {
  let settings = await SiteSettings.findOne();
  if (!settings) settings = await SiteSettings.create({});

  const { field, index } = req.body;
  if (!req.file) {
    res.status(400);
    throw new Error('Image file is required');
  }

  const folder = `pixngiggles/settings/${field || 'general'}`;
  const imageData = await uploadToCloudinary(req.file.buffer, folder);

  if (field === 'logo') {
    if (settings.logo?.publicId) await deleteFromCloudinary(settings.logo.publicId);
    settings.logo = imageData;
  } else if (field === 'favicon') {
    if (settings.favicon?.publicId) await deleteFromCloudinary(settings.favicon.publicId);
    settings.favicon = imageData;
  } else if (field === 'heroImage') {
    const idx = parseInt(index, 10) || 0;
    if (settings.hero.images[idx]?.publicId) await deleteFromCloudinary(settings.hero.images[idx].publicId);
    if (!settings.hero.images[idx]) settings.hero.images[idx] = imageData;
    else settings.hero.images[idx] = imageData;
  } else if (field === 'ogImage') {
    if (settings.seo?.ogImage?.publicId) await deleteFromCloudinary(settings.seo.ogImage.publicId);
    settings.seo.ogImage = imageData;
  }

  await settings.save();
  res.json({ success: true, data: settings, message: 'Image uploaded' });
});

export const getDashboardStats = asyncHandler(async (req, res) => {
  const Booking = (await import('../models/Booking.js')).default;
  const Contact = (await import('../models/Contact.js')).default;
  const Gallery = (await import('../models/Gallery.js')).default;
  const Service = (await import('../models/Service.js')).default;

  const totalLeads = await Booking.countDocuments();
  const newLeads = await Booking.countDocuments({ status: 'New' });
  const bookedLeads = await Booking.countDocuments({ status: 'Booked' });
  const contactInquiries = await Contact.countDocuments();
  const unreadContacts = await Contact.countDocuments({ isRead: false });
  const totalGallery = await Gallery.countDocuments();
  const totalServices = await Service.countDocuments();
  const recentBookings = await Booking.find().sort({ createdAt: -1 }).limit(5);
  const recentContacts = await Contact.find().sort({ createdAt: -1 }).limit(5);

  res.json({
    success: true,
    data: {
      totalLeads,
      newLeads,
      bookedLeads,
      contactInquiries,
      unreadContacts,
      totalGallery,
      totalServices,
      recentBookings,
      recentContacts,
    },
  });
});
