import dotenv from 'dotenv';
import mongoose from 'mongoose';
import connectDB from '../config/db.js';
import Gallery from '../models/Gallery.js';
import { img } from './contentData.js';
import { localGalleryImages } from './galleryAssets.js';

dotenv.config();

const importLocalGallery = async () => {
  await connectDB();

  console.log('Importing client gallery images...');

  const cleared = await Gallery.deleteMany({});
  console.log(`Cleared ${cleared.deletedCount} existing gallery entries`);

  await Gallery.insertMany(
    localGalleryImages.map((g, i) => ({
      title: g.title,
      altText: g.altText,
      category: g.category,
      image: img(g.path),
      displayOrder: i,
      isFeatured: g.featured,
    }))
  );

  console.log(`Added ${localGalleryImages.length} gallery images`);
  console.log('Done! Redeploy frontend so /public/images/gallery files are live.');

  await mongoose.connection.close();
  process.exit(0);
};

importLocalGallery().catch((err) => {
  console.error('Import error:', err);
  process.exit(1);
});
