import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    eventType: {
      type: String,
      required: true,
      enum: ['Wedding', 'Birthday', 'Graduation', 'Corporate Event', 'Conference', 'Private Event', 'Other'],
    },
    eventDate: { type: Date, required: true },
    eventTime: { type: String, required: true },
    venue: { type: String, required: true },
    city: { type: String, required: true },
    guestCount: { type: Number, required: true },
    preferredBooth: {
      type: String,
      enum: ['Cloee Ring Light Booth', 'Mirror X Luxury Booth', 'Not Sure Yet'],
      default: 'Not Sure Yet',
    },
    interestedAddons: [{ type: String }],
    message: { type: String, default: '' },
    hearAboutUs: { type: String, default: '' },
    status: {
      type: String,
      enum: ['New', 'Contacted', 'Follow-Up', 'Quoted', 'Booked', 'Closed', 'Cancelled'],
      default: 'New',
    },
    internalNotes: { type: String, default: '' },
  },
  { timestamps: true }
);

export default mongoose.model('Booking', bookingSchema);
