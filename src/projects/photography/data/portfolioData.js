const weddingImg = 'https://images.unsplash.com/photo-1519741497674-611481863552?w=400&h=300&fit=crop';
const productImg = 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=400&h=300&fit=crop';
const portraitImg = 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&h=300&fit=crop';

const portfolioData = [
  { id:1, name:'Wedding Cinematic Film', description:'4K cinematic highlight reel, drone shots, same-day edit, teaser & full film.', price:'₹3,50,000', category:'wedding', image:weddingImg },
  { id:2, name:'Candid Wedding Photography', description:'Two photographers, 1500+ edited photos, pre-wedding shoot, premium album.', price:'₹2,00,000', category:'wedding', image:weddingImg },
  { id:3, name:'Pre-Wedding Shoot', description:'Destination shoot — Jaipur, Udaipur, or Goa. 2 outfit changes, 100 edited photos.', price:'₹75,000', category:'wedding', image:weddingImg },
  { id:4, name:'Product Photography', description:'E-commerce ready shots — white background, lifestyle, 360° spins, flat lays.', price:'₹2,500/product', category:'commercial', image:productImg },
  { id:5, name:'Corporate Headshots', description:'Professional headshots for LinkedIn, websites, annual reports. Studio or on-location.', price:'₹5,000/person', category:'commercial', image:portraitImg },
  { id:6, name:'Food & Restaurant', description:'Menu photography, ambience shots, Zomato/Swiggy-ready images, reels content.', price:'₹35,000', category:'commercial', image:productImg },
  { id:7, name:'Maternity & Newborn', description:'Artistic maternity and newborn portraits with props, soft lighting, and premium prints.', price:'₹25,000', category:'personal', image:portraitImg },
  { id:8, name:'Birthday & Events', description:'Candid + posed coverage for birthdays, anniversaries, ring ceremonies, and house parties.', price:'₹18,000', category:'personal', image:weddingImg },
];
export const portfolioCategories = [
  { id:'all', label:'All Work' }, { id:'wedding', label:'Wedding' }, { id:'commercial', label:'Commercial' }, { id:'personal', label:'Personal' },
];
export default portfolioData;
