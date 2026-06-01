const roomImg = 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=400&h=300&fit=crop';
const villaImg = 'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=400&h=300&fit=crop';
const spaImg = 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=400&h=300&fit=crop';
const dinnerImg = 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=300&fit=crop';
const adventureImg = 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=400&h=300&fit=crop';
const heritageImg = 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=400&h=300&fit=crop';

const roomData = [
  { id:1, name:'Deluxe Room', description:'Spacious 350 sq.ft room with king bed, city view, minibar, and complimentary breakfast.', price:'₹5,499/night', category:'rooms', image:roomImg },
  { id:2, name:'Premium Suite', description:'550 sq.ft suite with living area, balcony, rain shower, Nespresso machine, and lounge access.', price:'₹9,999/night', category:'rooms', image:roomImg },
  { id:3, name:'Presidential Suite', description:'1200 sq.ft luxury suite with private pool, butler service, panoramic views, and dining room.', price:'₹25,000/night', category:'rooms', image:roomImg },
  { id:4, name:'Pool Villa', description:'Private 2-bedroom villa with infinity pool, outdoor shower, kitchenette, and garden.', price:'₹35,000/night', category:'villas', image:villaImg },
  { id:5, name:'Ayurvedic Spa Package', description:'90-min full body massage, Shirodhara, herbal steam, and wellness consultation.', price:'₹4,500', category:'experiences', image:spaImg },
  { id:6, name:'Candlelight Dinner', description:'Private beachside/poolside dinner with 5-course menu, wine pairing, live music.', price:'₹8,000/couple', category:'experiences', image:dinnerImg },
  { id:7, name:'Heritage Walk & Tour', description:'Guided tour of local heritage sites, temples, and markets with traditional lunch.', price:'₹2,500/person', category:'experiences', image:heritageImg },
  { id:8, name:'Adventure Package', description:'Trekking, kayaking, cycling, and campfire — perfect for groups and corporates.', price:'₹6,000/person', category:'experiences', image:adventureImg },
];
export const roomCategories = [{id:'all',label:'All'},{id:'rooms',label:'Rooms'},{id:'villas',label:'Villas'},{id:'experiences',label:'Experiences'}];
export default roomData;
