const generalImg = 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=400&h=300&fit=crop';
const orthodonticsImg = 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=400&h=300&fit=crop';
const cosmeticImg = 'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?w=400&h=300&fit=crop';
const surgeryImg = 'https://images.unsplash.com/photo-1629909615184-74f495363b67?w=400&h=300&fit=crop';

const treatmentData = [
  // General
  { id: 1, name: 'Dental Check-up & Cleaning', description: 'Complete oral examination, scaling, polishing, and fluoride treatment.', price: '₹800', duration: '30 min', category: 'general', image: generalImg },
  { id: 2, name: 'Teeth Whitening', description: 'Professional LED teeth whitening — up to 8 shades brighter in one session.', price: '₹6,999', duration: '45 min', category: 'general', image: generalImg },
  { id: 3, name: 'Dental Filling', description: 'Tooth-coloured composite resin filling for cavities and chipped teeth.', price: '₹1,200', duration: '30 min', category: 'general', image: generalImg },

  // Orthodontics
  { id: 4, name: 'Metal Braces', description: 'Traditional stainless-steel braces for teeth alignment. Includes follow-ups.', price: '₹25,000', duration: '12-18 months', category: 'orthodontics', image: orthodonticsImg },
  { id: 5, name: 'Ceramic Braces', description: 'Tooth-coloured ceramic braces for discreet orthodontic treatment.', price: '₹35,000', duration: '12-18 months', category: 'orthodontics', image: orthodonticsImg },
  { id: 6, name: 'Invisalign Aligners', description: 'Clear invisible aligners — custom-made, removable, and comfortable.', price: '₹1,50,000', duration: '6-12 months', category: 'orthodontics', image: orthodonticsImg },

  // Cosmetic
  { id: 7, name: 'Dental Veneers', description: 'Ultra-thin porcelain veneers for a perfect Hollywood smile. Per tooth.', price: '₹8,000', duration: '2 visits', category: 'cosmetic', image: cosmeticImg },
  { id: 8, name: 'Smile Makeover', description: 'Complete smile transformation — veneers, whitening, gum contouring.', price: '₹75,000', duration: '4-6 visits', category: 'cosmetic', image: cosmeticImg },
  { id: 9, name: 'Gum Contouring', description: 'Laser gum reshaping for a balanced, aesthetic gum line.', price: '₹5,000', duration: '45 min', category: 'cosmetic', image: cosmeticImg },

  // Surgery
  { id: 10, name: 'Dental Implant', description: 'Titanium implant with ceramic crown — permanent tooth replacement.', price: '₹30,000', duration: '3-4 months', category: 'surgery', image: surgeryImg },
  { id: 11, name: 'Root Canal Treatment', description: 'Painless RCT with latest rotary endodontics and ceramic crown.', price: '₹5,500', duration: '2 visits', category: 'surgery', image: surgeryImg },
  { id: 12, name: 'Wisdom Tooth Extraction', description: 'Safe surgical extraction of impacted wisdom teeth under local anesthesia.', price: '₹3,500', duration: '45 min', category: 'surgery', image: surgeryImg },
];

export const treatmentCategories = [
  { id: 'all', label: 'All Treatments' },
  { id: 'general', label: 'General' },
  { id: 'orthodontics', label: 'Orthodontics' },
  { id: 'cosmetic', label: 'Cosmetic' },
  { id: 'surgery', label: 'Surgery' },
];

export default treatmentData;
