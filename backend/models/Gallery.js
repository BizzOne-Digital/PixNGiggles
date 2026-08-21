import mongoose from 'mongoose';

const imageSchema = {
  publicId: { type: String, default: '' },
  url: { type: String, default: '' },
  secureUrl: { type: String, default: '' },
};

const gallerySchema = new mongoose.Schema(
  {
    title: { type: String, default: '' },
    altText: { type: String, default: '' },
    category: {
      type: String,
      enum: ['Weddings', 'Quinceañeras', 'Birthdays', 'Graduations', 'Corporate Events', 'Booth Setups', 'Custom Backdrops', 'All'],
      default: 'All',
    },
    image: imageSchema,
    displayOrder: { type: Number, default: 0 },
    isFeatured: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model('Gallery', gallerySchema);
