import service1 from '../images/service-1.png';
import service2 from '../images/service-2.png';
import service3 from '../images/service-3.png';
import service4 from '../images/service-4.png';

const serviceData = [
  // Hair
  { id: 1, name: 'Haircut & Styling', description: 'Precision cut, blow-dry, and styling by senior stylists.', price: '₹799', duration: '45 min', category: 'hair', image: service1 },
  { id: 2, name: 'Hair Colour & Highlights', description: 'Global colour, balayage, or highlights using L\'Oréal Professionnel products.', price: '₹2,999', duration: '90 min', category: 'hair', image: service1 },
  { id: 3, name: 'Keratin Treatment', description: 'Brazilian keratin smoothing for frizz-free, silky hair lasting 3-4 months.', price: '₹5,499', duration: '120 min', category: 'hair', image: service1 },
  { id: 4, name: 'Hair Spa & Treatment', description: 'Deep conditioning scalp treatment with hot oil massage and steam therapy.', price: '₹1,499', duration: '60 min', category: 'hair', image: service1 },

  // Skin
  { id: 5, name: 'Gold Facial', description: 'Luxury 24K gold facial with anti-aging serum, collagen mask, and LED therapy.', price: '₹2,499', duration: '75 min', category: 'skin', image: service2 },
  { id: 6, name: 'Hydra Facial', description: 'Deep cleansing, exfoliation, extraction, and hydration in one session.', price: '₹3,499', duration: '60 min', category: 'skin', image: service2 },
  { id: 7, name: 'De-Tan Treatment', description: 'Full body de-tan with papaya extract, aloe vera, and vitamin C infusion.', price: '₹1,799', duration: '45 min', category: 'skin', image: service2 },
  { id: 8, name: 'Clean-up & Glow', description: 'Express cleanup with steam, extraction, mask, and sunscreen finish.', price: '₹999', duration: '30 min', category: 'skin', image: service2 },

  // Nails
  { id: 9, name: 'Gel Manicure', description: 'OPI gel polish manicure with cuticle care, hand massage, and nail art.', price: '₹1,299', duration: '50 min', category: 'nails', image: service3 },
  { id: 10, name: 'Spa Pedicure', description: 'Luxury foot spa with scrub, mask, massage, and polish of your choice.', price: '₹1,499', duration: '60 min', category: 'nails', image: service3 },
  { id: 11, name: 'Nail Extensions', description: 'Acrylic or gel nail extensions with custom nail art designs.', price: '₹2,999', duration: '90 min', category: 'nails', image: service3 },

  // Bridal
  { id: 12, name: 'Bridal Makeup Package', description: 'HD airbrush makeup, hairstyling, draping, and jewellery setting for the bride.', price: '₹25,000', duration: '3 hrs', category: 'bridal', image: service4 },
  { id: 13, name: 'Mehndi & Pre-Bridal', description: 'Complete pre-bridal package — facials, waxing, threading, and mehndi session.', price: '₹12,999', duration: '5 hrs', category: 'bridal', image: service4 },
  { id: 14, name: 'Engagement Look', description: 'Party makeup, hairstyling, and draping for engagement or sangeet ceremony.', price: '₹8,999', duration: '2 hrs', category: 'bridal', image: service4 },
];

export const serviceCategories = [
  { id: 'all', label: 'All Services' },
  { id: 'hair', label: 'Hair' },
  { id: 'skin', label: 'Skin & Facial' },
  { id: 'nails', label: 'Nails' },
  { id: 'bridal', label: 'Bridal' },
];

export default serviceData;
