const livingImg = 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=400&h=300&fit=crop';
const kitchenImg = 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop';
const officeImg = 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=300&fit=crop';
const renderImg = 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&h=300&fit=crop';

const designData = [
  { id:1, name:'Living Room Makeover', description:'Complete living room redesign — furniture layout, colour palette, lighting, and décor styling.', price:'₹2,50,000', category:'residential', image:livingImg },
  { id:2, name:'Modular Kitchen Design', description:'Custom modular kitchen with Hettich/Hafele hardware, granite countertops, and chimney integration.', price:'₹3,50,000', category:'residential', image:kitchenImg },
  { id:3, name:'Master Bedroom Suite', description:'Wardrobe, bed design, false ceiling with cove lighting, accent walls, and dressing area.', price:'₹2,00,000', category:'residential', image:livingImg },
  { id:4, name:'Full Home Interiors (2BHK)', description:'End-to-end 2BHK interior — all rooms, kitchen, bathrooms, electrical, and furnishing.', price:'₹8,00,000', category:'residential', image:renderImg },
  { id:5, name:'Corporate Office Design', description:'Workstations, cabins, conference room, reception area, pantry — ergonomic & modern.', price:'₹1,200/sq.ft', category:'commercial', image:officeImg },
  { id:6, name:'Retail Store / Showroom', description:'Brand-aligned retail interior with display units, lighting, signage, and customer flow design.', price:'₹1,500/sq.ft', category:'commercial', image:officeImg },
  { id:7, name:'Restaurant & Café Interiors', description:'Theme-based restaurant design — seating layout, bar counter, Instagrammable corners, ambience.', price:'₹1,800/sq.ft', category:'commercial', image:kitchenImg },
  { id:8, name:'3D Visualization Only', description:'Photorealistic 3D renders of your space before execution. Unlimited revisions.', price:'₹15,000/room', category:'consultation', image:renderImg },
];
export const designCategories = [
  { id:'all', label:'All Services' }, { id:'residential', label:'Residential' }, { id:'commercial', label:'Commercial' }, { id:'consultation', label:'Consultation' },
];
export default designData;
