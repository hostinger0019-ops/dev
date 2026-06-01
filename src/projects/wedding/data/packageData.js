import service1 from '../images/service-1.png';
import service2 from '../images/service-2.png';
import service3 from '../images/service-3.png';
import service4 from '../images/service-4.png';

const packageData = [
  // Decor
  { id: 1, name: 'Royal Mandap Decor', description: 'Grand floral mandap with marigold, roses, and LED lighting for the pheras.', price: '₹2,50,000', category: 'decor', image: service1 },
  { id: 2, name: 'Sangeet Stage Setup', description: 'Bollywood-themed stage with LED screen, DJ booth, fog machines, and dance floor.', price: '₹1,75,000', category: 'decor', image: service1 },
  { id: 3, name: 'Mehndi Garden Decor', description: 'Vibrant Rajasthani-style setup with colourful drapes, jhoolas, and phulkari cushions.', price: '₹1,20,000', category: 'decor', image: service1 },

  // Catering
  { id: 4, name: 'Premium Veg Thali', description: 'Multi-cuisine vegetarian spread — Mughlai, South Indian, Rajasthani, Chinese. 500+ pax.', price: '₹1,800/plate', category: 'catering', image: service2 },
  { id: 5, name: 'Non-Veg Royal Feast', description: 'Tandoori, Biryani, Kebabs, live counters, 10+ dessert options. 500+ pax.', price: '₹2,200/plate', category: 'catering', image: service2 },
  { id: 6, name: 'Cocktail & Mocktail Bar', description: 'Professional bartenders, signature cocktails, mocktails, and chaat counter.', price: '₹75,000', category: 'catering', image: service2 },

  // Photography
  { id: 7, name: 'Cinematic Wedding Film', description: '4K cinematic highlight reel, full ceremony coverage, drone shots, teaser trailer.', price: '₹3,50,000', category: 'photography', image: service3 },
  { id: 8, name: 'Candid Photography', description: 'Two photographers, 1000+ edited photos, pre-wedding shoot, and premium album.', price: '₹2,50,000', category: 'photography', image: service3 },
  { id: 9, name: 'Pre-Wedding Shoot', description: 'Destination pre-wedding shoot with 2 outfit changes, 100 edited photos, and reel.', price: '₹80,000', category: 'photography', image: service3 },

  // Full Packages
  { id: 10, name: 'Silver Package', description: 'Venue, basic decor, catering (300 pax), photography, DJ, and coordination.', price: '₹15,00,000', category: 'packages', image: service4 },
  { id: 11, name: 'Gold Package', description: 'Premium venue, royal decor, multi-cuisine catering (500 pax), cinematic video, mehndi + sangeet.', price: '₹35,00,000', category: 'packages', image: service4 },
  { id: 12, name: 'Platinum Destination', description: 'Destination wedding (Udaipur/Jaipur/Goa), 3-day celebration, luxury stay, all inclusive.', price: '₹1,00,00,000', category: 'packages', image: service4 },
];

export const packageCategories = [
  { id: 'all', label: 'All Services' },
  { id: 'decor', label: 'Decor' },
  { id: 'catering', label: 'Catering' },
  { id: 'photography', label: 'Photo & Film' },
  { id: 'packages', label: 'Full Packages' },
];

export default packageData;
