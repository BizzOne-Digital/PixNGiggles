import mongoose from 'mongoose';

const imageSchema = {
  publicId: { type: String, default: '' },
  url: { type: String, default: '' },
  secureUrl: { type: String, default: '' },
};

const testimonialSchema = new mongoose.Schema(
  {
    customerName: { type: String, required: true },
    eventType: { type: String, default: '' },
    rating: { type: Number, min: 1, max: 5, default: 5 },
    review: { type: String, required: true },
    image: imageSchema,
    isActive: { type: Boolean, default: true },
    displayOrder: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.model('Testimonial', testimonialSchema);
