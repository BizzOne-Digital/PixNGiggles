export const img = (url) => ({ publicId: '', url, secureUrl: url });

export const photo = (id, w = 1200) =>
  `https://images.unsplash.com/${id}?w=${w}&q=85&auto=format&fit=crop`;

export const REMOVED_PHOTO_IDS = ['1519741497674', '1464366400600'];

export const galleryImages = [
  {
    title: 'Wedding Reception',
    category: 'Weddings',
    altText: 'Couple celebrating at a wedding reception',
    url: photo('photo-1606800052052-08fe0c8d8b44'),
    featured: true,
  },
  {
    title: 'Wedding Celebration',
    category: 'Weddings',
    altText: 'Wedding guests celebrating together',
    url: photo('photo-1522673606160-8d871fb09e8f'),
    featured: false,
  },
  {
    title: 'Quinceañera Celebration',
    category: 'Quinceañeras',
    altText: 'Quinceañera celebration with family and friends',
    url: photo('photo-1598387181032-a4860f008fcd'),
    featured: true,
  },
  {
    title: 'Quinceañera Party',
    category: 'Quinceañeras',
    altText: 'Colorful quinceañera event moment',
    url: photo('photo-1511795409834-ef04bbd61622'),
    featured: false,
  },
  {
    title: 'Teen Birthday Party',
    category: 'Birthdays',
    altText: 'Teen birthday party celebration ages 10 to 14',
    url: photo('photo-1464349095432-e9a21285b5f3'),
    featured: true,
  },
  {
    title: 'Birthday Celebration',
    category: 'Birthdays',
    altText: 'Diverse group enjoying a birthday party',
    url: photo('photo-1530103862676-de8c9debad1d'),
    featured: false,
  },
  {
    title: 'Friends at an Event',
    category: 'Birthdays',
    altText: 'Friends of diverse backgrounds celebrating together',
    url: photo('photo-1529156069898-49953e39b3ac'),
    featured: false,
  },
  {
    title: 'Graduation Day',
    category: 'Graduations',
    altText: 'Graduation celebration photo booth moment',
    url: photo('photo-1523050854058-8df90110c9f1'),
    featured: false,
  },
  {
    title: 'Corporate Event',
    category: 'Corporate Events',
    altText: 'Corporate event with diverse attendees',
    url: photo('photo-1540575467063-178a50c2df87'),
    featured: true,
  },
  {
    title: 'Team Celebration',
    category: 'Corporate Events',
    altText: 'Professional team event celebration',
    url: photo('photo-1511578314322-379afb476865'),
    featured: false,
  },
  {
    title: 'Booth Setup',
    category: 'Booth Setups',
    altText: 'Premium photo booth setup at an event',
    url: photo('photo-1492684223066-81342ee5ff30'),
    featured: false,
  },
  {
    title: 'Custom Backdrop',
    category: 'Custom Backdrops',
    altText: 'Custom themed backdrop at a celebration',
    url: photo('photo-1470229722913-7c0e2dbbafd3'),
    featured: false,
  },
];
