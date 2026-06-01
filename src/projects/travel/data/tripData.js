const mountainImg = 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop';
const beachImg = 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&h=300&fit=crop';
const heritageImg = 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=400&h=300&fit=crop';

const tripData = [
  { id: 1, name: 'Kashmir Paradise', description: 'Srinagar, Gulmarg, Pahalgam & Sonmarg — Dal Lake shikara, gondola ride, meadows.', price: '₹18,999', duration: '6N/7D', pax: 'Per Person', rating: 4.9, category: 'mountains', image: mountainImg },
  { id: 2, name: 'Manali-Leh Roadtrip', description: 'Epic road trip via Rohtang, Keylong, Sarchu, Pangong Lake & Nubra Valley.', price: '₹24,999', duration: '8N/9D', pax: 'Per Person', rating: 4.8, category: 'mountains', image: mountainImg },
  { id: 3, name: 'Goa Beach Carnival', description: 'North & South Goa, beach parties, water sports, spice plantation, Old Goa churches.', price: '₹12,499', duration: '4N/5D', pax: 'Per Person', rating: 4.7, category: 'beaches', image: beachImg },
  { id: 4, name: 'Andaman Island Escape', description: 'Port Blair, Havelock, Neil Island — scuba diving, Radhanagar Beach, cellular jail.', price: '₹28,999', duration: '5N/6D', pax: 'Per Person', rating: 4.9, category: 'beaches', image: beachImg },
  { id: 5, name: 'Kerala Backwaters', description: 'Munnar tea gardens, Alleppey houseboat, Thekkady spice tour, Kovalam beach.', price: '₹16,999', duration: '5N/6D', pax: 'Per Person', rating: 4.8, category: 'beaches', image: beachImg },
  { id: 6, name: 'Rajasthan Royal Trail', description: 'Jaipur, Udaipur, Jodhpur, Jaisalmer — forts, palaces, desert safari, folk music.', price: '₹22,499', duration: '7N/8D', pax: 'Per Person', rating: 4.9, category: 'heritage', image: heritageImg },
  { id: 7, name: 'Golden Triangle Classic', description: 'Delhi, Agra (Taj Mahal), Jaipur — India\'s most iconic heritage circuit.', price: '₹9,999', duration: '3N/4D', pax: 'Per Person', rating: 4.7, category: 'heritage', image: heritageImg },
  { id: 8, name: 'Northeast Explorer', description: 'Shillong, Cherrapunji, Kaziranga, Tawang — living root bridges, one-horned rhino.', price: '₹26,999', duration: '7N/8D', pax: 'Per Person', rating: 4.8, category: 'mountains', image: mountainImg },
];

export const tripCategories = [
  { id: 'all', label: 'All Packages' },
  { id: 'mountains', label: 'Mountains' },
  { id: 'beaches', label: 'Beaches' },
  { id: 'heritage', label: 'Heritage' },
];

export default tripData;
