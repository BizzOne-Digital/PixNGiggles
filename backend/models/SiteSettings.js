import mongoose from 'mongoose';

const imageSchema = {
  publicId: { type: String, default: '' },
  url: { type: String, default: '' },
  secureUrl: { type: String, default: '' },
};

const siteSettingsSchema = new mongoose.Schema(
  {
    businessName: { type: String, default: 'PixNGiggles' },
    tagline: { type: String, default: 'Turn Moments Into Memories' },
    phone: { type: String, default: '817-751-7818' },
    email: { type: String, default: 'info@pixngiggles.com' },
    website: { type: String, default: 'pixngiggles.com' },
    serviceArea: { type: String, default: 'Dallas–Fort Worth, TX and surrounding areas' },
    address: { type: String, default: '' },
    logo: imageSchema,
    favicon: imageSchema,
    socialLinks: {
      facebook: { type: String, default: '' },
      instagram: { type: String, default: '' },
      twitter: { type: String, default: '' },
      tiktok: { type: String, default: '' },
      youtube: { type: String, default: '' },
    },
    hero: {
      eyebrow: { type: String, default: "Dallas–Fort Worth's Premier Photo Booth Experience" },
      heading: { type: String, default: 'Turn Moments Into Memories' },
      description: {
        type: String,
        default:
          'Premium photo booth experiences for weddings, parties, graduations, and corporate events across the DFW metroplex.',
      },
      ctaPrimary: { type: String, default: 'Check Availability' },
      ctaSecondary: { type: String, default: 'Book Your Event' },
      ctaTertiary: { type: String, default: 'Explore Our Booths' },
      images: [imageSchema],
    },
    footer: {
      description: {
        type: String,
        default: 'Creating unforgettable photo booth experiences across Dallas–Fort Worth.',
      },
    },
    businessHours: {
      monday: { type: String, default: '9:00 AM – 6:00 PM' },
      tuesday: { type: String, default: '9:00 AM – 6:00 PM' },
      wednesday: { type: String, default: '9:00 AM – 6:00 PM' },
      thursday: { type: String, default: '9:00 AM – 6:00 PM' },
      friday: { type: String, default: '9:00 AM – 6:00 PM' },
      saturday: { type: String, default: '10:00 AM – 4:00 PM' },
      sunday: { type: String, default: 'Closed' },
    },
    seo: {
      defaultTitle: { type: String, default: 'PixNGiggles | Premium Photo Booth Rentals in DFW' },
      defaultDescription: {
        type: String,
        default:
          'PixNGiggles offers premium photo booth rentals for weddings, corporate events, and celebrations in Dallas–Fort Worth, Texas.',
      },
      ogImage: imageSchema,
    },
  },
  { timestamps: true }
);

export default mongoose.model('SiteSettings', siteSettingsSchema);
