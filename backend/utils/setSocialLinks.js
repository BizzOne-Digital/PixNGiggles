import dotenv from 'dotenv';
import mongoose from 'mongoose';
import connectDB from '../config/db.js';
import SiteSettings from '../models/SiteSettings.js';

dotenv.config();

const SOCIAL_LINKS = {
  facebook: 'https://www.facebook.com/share/1CPKe9cZUN/',
  instagram: 'https://www.instagram.com/pixngiggles_',
  whatsapp: 'https://wa.me/18177517818',
};

const setSocialLinks = async () => {
  await connectDB();

  const settings = await SiteSettings.findOne();
  if (!settings) {
    console.log('No settings document found');
    await mongoose.connection.close();
    process.exit(1);
  }

  settings.socialLinks = {
    ...settings.socialLinks,
    ...SOCIAL_LINKS,
  };
  await settings.save();

  console.log('Social links updated:');
  console.log('  Facebook:', SOCIAL_LINKS.facebook);
  console.log('  Instagram:', SOCIAL_LINKS.instagram);
  console.log('  WhatsApp:', SOCIAL_LINKS.whatsapp);

  await mongoose.connection.close();
  process.exit(0);
};

setSocialLinks().catch((err) => {
  console.error(err);
  process.exit(1);
});
