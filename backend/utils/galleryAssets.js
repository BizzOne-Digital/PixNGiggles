export const img = (url) => ({ publicId: '', url, secureUrl: url });

/** Client-provided gallery images (hosted in frontend/public/images/gallery) */
export const localGalleryImages = [
  {
    title: 'Bridal Celebration',
    category: 'Weddings',
    altText: 'Bridal party celebrating with photo booth props',
    path: '/images/gallery/bridal-celebration.jpg',
    featured: true,
  },
  {
    title: 'Birthday Celebration',
    category: 'Birthdays',
    altText: 'Friends celebrating a birthday with photo booth props',
    path: '/images/gallery/birthday-celebration.jpg',
    featured: true,
  },
  {
    title: 'Graduation Caps',
    category: 'Graduations',
    altText: 'Diverse graduates celebrating and throwing caps',
    path: '/images/gallery/graduation-caps.jpg',
    featured: true,
  },
  {
    title: 'Graduation Props',
    category: 'Graduations',
    altText: 'Graduates posing with fun photo booth props',
    path: '/images/gallery/graduation-props.jpg',
    featured: false,
  },
  {
    title: 'Booth Kiosk Setup',
    category: 'Booth Setups',
    altText: 'Premium photo booth kiosk with props and ring light',
    path: '/images/gallery/booth-kiosk-setup.jpg',
    featured: true,
  },
  {
    title: 'Ring Light Booth at Event',
    category: 'Booth Setups',
    altText: 'Ring light photo booth in action at a live event',
    path: '/images/gallery/booth-ring-light-party.jpg',
    featured: false,
  },
];
