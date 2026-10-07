import Contact from '../models/Contact.js';
import { asyncHandler } from '../utils/helpers.js';
import { sendContactNotification } from '../services/emailService.js';

export const createContact = asyncHandler(async (req, res) => {
  const contact = await Contact.create(req.body);
  let emailDebug;
  try {
    emailDebug = await sendContactNotification(contact);
  } catch (err) {
    console.error('Contact email notification failed', err);
    emailDebug = { error: err.message };
  }
  const payload = { success: true, data: contact, message: 'Message sent successfully' };
  if (req.query.debug === 'true') payload.emailDebug = emailDebug;
  res.status(201).json(payload);
});

export const getContacts = asyncHandler(async (req, res) => {
  const { isRead } = req.query;
  const filter = {};
  if (isRead !== undefined) filter.isRead = isRead === 'true';

  const contacts = await Contact.find(filter).sort({ createdAt: -1 });
  res.json({ success: true, data: contacts });
});

export const getContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error('Contact inquiry not found');
  }
  res.json({ success: true, data: contact });
});

export const updateContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!contact) {
    res.status(404);
    throw new Error('Contact inquiry not found');
  }
  res.json({ success: true, data: contact });
});

export const deleteContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findByIdAndDelete(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error('Contact inquiry not found');
  }
  res.json({ success: true, message: 'Contact inquiry deleted' });
});

export const getContactStats = asyncHandler(async (req, res) => {
  const total = await Contact.countDocuments();
  const unread = await Contact.countDocuments({ isRead: false });
  res.json({ success: true, data: { total, unread } });
});
