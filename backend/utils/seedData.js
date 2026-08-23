import dotenv from 'dotenv';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import connectDB from '../config/db.js';
import Admin from '../models/Admin.js';
import Service from '../models/Service.js';
import Booth from '../models/Booth.js';
import AddOn from '../models/AddOn.js';
import Gallery from '../models/Gallery.js';
import FAQ from '../models/FAQ.js';
import SiteSettings from '../models/SiteSettings.js';
import { galleryImages, img, photo } from './contentData.js';

dotenv.config();

const seed = async () => {
  await connectDB();

  console.log('Seeding database...');

  const adminEmail = process.env.ADMIN_EMAIL || 'admin@pixngiggles.com';
  const adminPassword = process.env.ADMIN_PASSWORD || 'Admin123!';
  const existingAdmin = await Admin.findOne({ email: adminEmail });
  if (!existingAdmin) {
    const hashed = await bcrypt.hash(adminPassword, 12);
    await Admin.create({ name: 'Admin', email: adminEmail, password: hashed });
    console.log(`Admin created: ${adminEmail}`);
  }

  const settingsCount = await SiteSettings.countDocuments();
  if (settingsCount === 0) {
    await SiteSettings.create({
      hero: {
        images: [
          img(photo('photo-1492684223066-81342ee5ff30')),
          img(photo('photo-1529156069898-49953e39b3ac')),
        ],
      },
      socialLinks: {
        whatsapp: 'https://wa.me/18177517818',
      },
    });
    console.log('Site settings created');
  }

  if (await Service.countDocuments() === 0) {
    await Service.insertMany([
      {
        title: 'Wedding Photo Booth',
        slug: 'wedding-photo-booth',
        shortDescription: 'Elegant photo booth experiences for your special day.',
        description:
          'Make your wedding unforgettable with our premium photo booth experiences. From intimate rehearsal dinners to grand receptions, PixNGiggles captures every smile, laugh, and candid moment your guests create.',
        features: ['Weddings', 'Receptions', 'Rehearsal Dinners', 'Pre-Wedding Events', 'Custom Overlays', 'Instant Prints'],
        image: img(photo('photo-1606800052052-08fe0c8d8b44')),
        displayOrder: 1,
      },
      {
        title: 'Corporate Event Photo Booth',
        slug: 'corporate-event-photo-booth',
        shortDescription: 'Professional branded experiences for corporate events.',
        description:
          'Elevate your corporate events with branded photo booth experiences that engage attendees and amplify your brand. Perfect for conferences, company celebrations, and client events.',
        features: ['Corporate Events', 'Conferences', 'Company Celebrations', 'Branded Overlays', 'Employee Events', 'Client Events'],
        image: img(photo('photo-1540575467063-178a50c2df87')),
        displayOrder: 2,
      },
      {
        title: 'Birthday & Graduation Photo Booth',
        slug: 'birthday-graduation-photo-booth',
        shortDescription: 'Celebrate milestones with fun, interactive photo experiences.',
        description:
          'From milestone birthdays and quinceañeras to graduation celebrations, our photo booths bring energy and excitement to every party. Guests love the interactive experience and instant keepsakes.',
        features: ['Birthday Parties', 'Quinceañeras', 'Graduation Celebrations', 'Teen Parties', 'Family Celebrations', 'Themed Backdrops'],
        image: img(photo('photo-1464349095432-e9a21285b5f3')),
        displayOrder: 3,
      },
    ]);
    console.log('Services created');
  }

  if (await Booth.countDocuments() === 0) {
    await Booth.insertMany([
      {
        title: 'Cloee Ring Light Photo Booth',
        slug: 'cloee-ring-light-photo-booth',
        manufacturer: 'Photo Booth International',
        description:
          'The Cloee Ring Light Photo Booth combines modern design with versatile functionality. Its signature ring-light aesthetic creates flattering, social-media-ready photos that guests love to share.',
        features: [
          'Modern ring-light design',
          'Digital photos',
          'SMS sharing',
          'QR code sharing',
          'Physical prints',
          'Custom overlays',
          'Custom backdrops',
        ],
        image: img(photo('photo-1492684223066-81342ee5ff30')),
        displayOrder: 1,
        isPremium: false,
      },
      {
        title: 'Mirror X Luxury Photo Booth',
        slug: 'mirror-x-luxury-photo-booth',
        manufacturer: 'Foto Master',
        description:
          'The Mirror X Luxury Photo Booth delivers a premium, full-length interactive mirror experience. Its elegant design and immersive features make it the centerpiece of any upscale event.',
        features: [
          'Premium luxury experience',
          'Full-length interactive mirror',
          'Digital photos',
          'SMS sharing',
          'QR code sharing',
          'Physical prints',
          'Custom overlays',
          'Custom backdrops',
        ],
        image: img(photo('photo-1511578314322-379afb476865')),
        displayOrder: 2,
        isPremium: true,
      },
    ]);
    console.log('Booths created');
  }

  if (await AddOn.countDocuments() === 0) {
    await AddOn.insertMany([
      { name: 'Custom Photo Overlays', description: 'Personalized overlays featuring your event name, date, and custom graphics.', displayOrder: 1 },
      { name: 'AI-Themed Templates', description: 'Cutting-edge AI-powered photo templates that transform your images into unique artistic creations.', displayOrder: 2 },
      { name: 'Green Screen Backgrounds', description: 'Transport your guests anywhere with professional green screen technology and custom backgrounds.', displayOrder: 3 },
      { name: 'Custom Themed Backdrops', description: 'Beautifully designed backdrops tailored to match your event theme and color palette.', displayOrder: 4 },
      { name: 'Personalized Event Designs', description: 'Fully customized event branding from start screen to print templates.', displayOrder: 5 },
      { name: 'Branded Corporate Overlays', description: 'Professional branded overlays featuring your company logo and brand colors.', displayOrder: 6 },
    ]);
    console.log('Add-ons created');
  }

  if (await Gallery.countDocuments() === 0) {
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
    console.log('Gallery created');
  }

  if (await FAQ.countDocuments() === 0) {
    await FAQ.insertMany([
      {
        question: 'How much does a photo booth rental cost?',
        answer: 'Pricing varies based on your event date, duration, booth selection, and add-ons. Contact us for a personalized quote tailored to your event needs.',
        displayOrder: 1,
      },
      {
        question: 'What areas do you serve?',
        answer: 'We proudly serve the Dallas–Fort Worth metroplex and surrounding areas in North Texas. Contact us to confirm availability for your location.',
        displayOrder: 2,
      },
      {
        question: 'How much space is needed for the photo booth?',
        answer: 'Our booths require approximately 8×8 feet of space with access to a standard power outlet. We\'ll confirm exact requirements based on your booth selection.',
        displayOrder: 3,
      },
      {
        question: 'Do guests receive digital copies of their photos?',
        answer: 'Yes! All our booths offer instant digital delivery via SMS, QR code, and email. Physical prints are also available depending on your package.',
        displayOrder: 4,
      },
      {
        question: 'How far in advance should I book?',
        answer: 'We recommend booking 2–3 months in advance for weddings and peak season events. However, we often accommodate last-minute requests when availability allows.',
        displayOrder: 5,
      },
      {
        question: 'Do you provide an attendant?',
        answer: 'Yes, every rental includes a professional attendant who sets up, operates the booth, assists guests, and breaks down at the end of your event.',
        displayOrder: 6,
      },
    ]);
    console.log('FAQs created');
  }

  console.log('Seeding complete!');
  await mongoose.connection.close();
  process.exit(0);
};

seed().catch((err) => {
  console.error('Seed error:', err);
  process.exit(1);
});
