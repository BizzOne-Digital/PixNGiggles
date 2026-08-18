import mongoose from 'mongoose';

const imageSchema = {
  publicId: { type: String, default: '' },
  url: { type: String, default: '' },
  secureUrl: { type: String, default: '' },
};

const addOnSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    image: imageSchema,
    displayOrder: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model('AddOn', addOnSchema);
