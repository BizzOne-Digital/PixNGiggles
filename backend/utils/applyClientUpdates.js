import dotenv from 'dotenv';
import mongoose from 'mongoose';
import connectDB from '../config/db.js';
import Gallery from '../models/Gallery.js';
import Testimonial from '../models/Testimonial.js';
import Service from '../models/Service.js';
import SiteSettings from '../models/SiteSettings.js';
import { galleryImages, REMOVED_PHOTO_IDS, photo, img } from './contentData.js';

dotenv.config();

const applyClientUpdates = async () => {
  await connectDB();

  console.log('Applying client content updates...');

  const testimonialResult = await Testimonial.deleteMany({});
  console.log(`Removed ${testimonialResult.deletedCount} sample testimonials`);

  const removedGallery = await Gallery.deleteMany({
    $or: REMOVED_PHOTO_IDS.flatMap((id) => [
      { 'image.url': { $regex: id } },
      { 'image.secureUrl': { $regex: id } },
    ]),
  });
  console.log(`Removed ${removedGallery.deletedCount} flagged gallery images`);

  await Gallery.deleteMany({});
  await Gallery.insertMany(
    galleryImages.map((g, i) => ({
      title: g.title,
      altText: g.altText,
      category: g.category,
      image: img(g.url),
      displayOrder: i,
      isFeatured: g.featured,
    }))
  );
  console.log(`Gallery refreshed with ${galleryImages.length} diverse images`);

  await Service.updateMany(
    { 'image.url': { $regex: '1519741497674' } },
    { $set: { image: img(photo('photo-1606800052052-08fe0c8d8b44')) } }
  );

  const settings = await SiteSettings.findOne();
  if (settings) {
    settings.socialLinks = {
      ...settings.socialLinks,
      facebook: settings.socialLinks?.facebook || 'https://facebook.com/pixngiggles',
      instagram: settings.socialLinks?.instagram || 'https://instagram.com/pixngiggles',
      whatsapp: settings.socialLinks?.whatsapp || 'https://wa.me/18177517818',
    };
    if (settings.hero?.images?.length) {
      settings.hero.images = settings.hero.images.filter(
        (image) => !REMOVED_PHOTO_IDS.some((id) => (image.url || '').includes(id))
      );
      if (settings.hero.images.length === 0) {
        settings.hero.images = [
          img(photo('photo-1492684223066-81342ee5ff30')),
          img(photo('photo-1529156069898-49953e39b3ac')),
        ];
      }
    }
    await settings.save();
    console.log('Updated site settings (social links + hero images)');
  }

  console.log('Client updates applied successfully!');
  await mongoose.connection.close();
  process.exit(0);
};

applyClientUpdates().catch((err) => {
  console.error('Update error:', err);
  process.exit(1);
});
