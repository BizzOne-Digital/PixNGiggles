import dotenv from 'dotenv';
import mongoose from 'mongoose';
import connectDB from '../config/db.js';
import SiteSettings from '../models/SiteSettings.js';

dotenv.config();

const clearWrongSocialLinks = async () => {
  await connectDB();

  const settings = await SiteSettings.findOne();
  if (!settings) {
    console.log('No settings document found');
    await mongoose.connection.close();
    process.exit(0);
  }

  settings.socialLinks = {
    ...settings.socialLinks,
    facebook: '',
    instagram: '',
  };
  await settings.save();

  console.log('Removed Facebook and Instagram links from site settings');
  console.log('WhatsApp kept:', settings.socialLinks?.whatsapp || '(from phone)');

  await mongoose.connection.close();
  process.exit(0);
};

clearWrongSocialLinks().catch((err) => {
  console.error(err);
  process.exit(1);
});
