import prop1 from '../images/prop-1.png';
import prop2 from '../images/prop-2.png';
import prop3 from '../images/prop-3.png';
import prop4 from '../images/prop-4.png';
import prop5 from '../images/prop-5.png';

const propertyData = [
  { id: 1, title: 'Emerald Heights Villa', location: 'Vasant Vihar, New Delhi', price: '₹12.5 Cr', type: 'villa', beds: 5, baths: 6, area: '6,500 sq.ft', image: prop1, featured: true, tag: 'Premium' },
  { id: 2, title: 'Sky Lounge Penthouse', location: 'Bandra West, Mumbai', price: '₹8.9 Cr', type: 'penthouse', beds: 4, baths: 4, area: '4,200 sq.ft', image: prop2, featured: true, tag: 'New Launch' },
  { id: 3, title: 'Panorama Residences', location: 'Whitefield, Bengaluru', price: '₹1.85 Cr', type: 'apartment', beds: 3, baths: 3, area: '2,100 sq.ft', image: prop3, featured: false, tag: 'Ready to Move' },
  { id: 4, title: 'Heritage Farmhouse Estate', location: 'Chattarpur, New Delhi', price: '₹18 Cr', type: 'farmhouse', beds: 7, baths: 8, area: '12,000 sq.ft', image: prop4, featured: false, tag: 'Exclusive' },
  { id: 5, title: 'The Crest Apartments', location: 'Jubilee Hills, Hyderabad', price: '₹2.4 Cr', type: 'apartment', beds: 3, baths: 3, area: '2,450 sq.ft', image: prop5, featured: false, tag: 'RERA Approved' },
  { id: 6, title: 'Royal Orchid Villa', location: 'Koregaon Park, Pune', price: '₹6.5 Cr', type: 'villa', beds: 4, baths: 5, area: '5,200 sq.ft', image: prop1, featured: false, tag: 'Premium' },
  { id: 7, title: 'Azure Tower Penthouse', location: 'Golf Course Road, Gurugram', price: '₹7.2 Cr', type: 'penthouse', beds: 4, baths: 4, area: '3,800 sq.ft', image: prop2, featured: false, tag: 'New Launch' },
  { id: 8, title: 'Sunrise Greens', location: 'Sector 150, Noida', price: '₹95 Lac', type: 'apartment', beds: 2, baths: 2, area: '1,250 sq.ft', image: prop3, featured: false, tag: 'Under Construction' },
];

export const propertyTypes = [
  { id: 'all', label: 'All Properties' },
  { id: 'villa', label: 'Villas' },
  { id: 'penthouse', label: 'Penthouses' },
  { id: 'apartment', label: 'Apartments' },
  { id: 'farmhouse', label: 'Farmhouses' },
];

export default propertyData;
