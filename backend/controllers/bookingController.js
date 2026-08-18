import Booking from '../models/Booking.js';
import { asyncHandler } from '../utils/helpers.js';

export const createBooking = asyncHandler(async (req, res) => {
  const booking = await Booking.create(req.body);
  res.status(201).json({ success: true, data: booking, message: 'Booking inquiry submitted successfully' });
});

export const getBookings = asyncHandler(async (req, res) => {
  const { status, eventType, search, sort = 'newest' } = req.query;
  const filter = {};

  if (status) filter.status = status;
  if (eventType) filter.eventType = eventType;
  if (search) {
    filter.$or = [
      { fullName: { $regex: search, $options: 'i' } },
      { email: { $regex: search, $options: 'i' } },
      { phone: { $regex: search, $options: 'i' } },
      { venue: { $regex: search, $options: 'i' } },
    ];
  }

  const sortOption = sort === 'oldest' ? { createdAt: 1 } : { createdAt: -1 };
  const bookings = await Booking.find(filter).sort(sortOption);

  res.json({ success: true, data: bookings });
});

export const getBooking = asyncHandler(async (req, res) => {
  const booking = await Booking.findById(req.params.id);
  if (!booking) {
    res.status(404);
    throw new Error('Booking not found');
  }
  res.json({ success: true, data: booking });
});

export const updateBooking = asyncHandler(async (req, res) => {
  const booking = await Booking.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!booking) {
    res.status(404);
    throw new Error('Booking not found');
  }
  res.json({ success: true, data: booking });
});

export const deleteBooking = asyncHandler(async (req, res) => {
  const booking = await Booking.findByIdAndDelete(req.params.id);
  if (!booking) {
    res.status(404);
    throw new Error('Booking not found');
  }
  res.json({ success: true, message: 'Booking deleted' });
});

export const getBookingStats = asyncHandler(async (req, res) => {
  const total = await Booking.countDocuments();
  const newLeads = await Booking.countDocuments({ status: 'New' });
  const booked = await Booking.countDocuments({ status: 'Booked' });
  const recent = await Booking.find().sort({ createdAt: -1 }).limit(5);

  res.json({
    success: true,
    data: { total, newLeads, booked, recent },
  });
});
