import mongoose from 'mongoose';

const imageSchema = {
  publicId: { type: String, default: '' },
  url: { type: String, default: '' },
  secureUrl: { type: String, default: '' },
};

const boothSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    manufacturer: { type: String, default: '' },
    features: [{ type: String }],
    image: imageSchema,
    displayOrder: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
    isPremium: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model('Booth', boothSchema);
