const hatchImg = 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=400&h=300&fit=crop';
const suvImg = 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=400&h=300&fit=crop';
const evImg = 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=400&h=300&fit=crop';
const sedanImg = 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400&h=300&fit=crop';

const carData = [
  { id:1, name:'Maruti Suzuki Swift', description:'India\'s favourite hatchback. 1.2L DualJet, AMT/Manual, 23.2 kmpl. Colours: Red, Blue, White.', price:'₹6.49 Lac', emi:'₹9,499/mo', category:'hatchback', image:hatchImg },
  { id:2, name:'Hyundai Creta', description:'Best-selling compact SUV. 1.5L Turbo, panoramic sunroof, ADAS, 10.25" touchscreen.', price:'₹11.49 Lac', emi:'₹16,999/mo', category:'suv', image:suvImg },
  { id:3, name:'Tata Nexon EV', description:'India\'s #1 electric SUV. 40.5 kWh battery, 465 km range, fast charging, connected car tech.', price:'₹14.99 Lac', emi:'₹21,499/mo', category:'electric', image:evImg },
  { id:4, name:'Mahindra XUV700', description:'Feature-loaded SUV. 2.0L mStallion Turbo, ADAS Level 2, flush door handles, Sony audio.', price:'₹13.99 Lac', emi:'₹19,999/mo', category:'suv', image:suvImg },
  { id:5, name:'Maruti Suzuki Brezza', description:'Urban compact SUV. 1.5L K-Series, CNG option, 6-speed AT, HUD, 360° camera.', price:'₹8.29 Lac', emi:'₹11,999/mo', category:'suv', image:suvImg },
  { id:6, name:'Tata Punch', description:'Micro SUV with 5-star NCAP safety. 1.2L Revotron, terrain modes, harrier-inspired design.', price:'₹6.13 Lac', emi:'₹8,999/mo', category:'hatchback', image:hatchImg },
  { id:7, name:'MG ZS EV', description:'Premium electric SUV. 50.3 kWh battery, 461 km range, i-SMART connected tech, ADAS.', price:'₹18.98 Lac', emi:'₹27,499/mo', category:'electric', image:evImg },
  { id:8, name:'Honda City Hybrid', description:'Premium sedan. 1.5L e:HEV, 26.5 kmpl, ADAS, LaneWatch camera, connected car features.', price:'₹19.50 Lac', emi:'₹28,499/mo', category:'sedan', image:sedanImg },
];
export const carCategories = [{id:'all',label:'All Cars'},{id:'hatchback',label:'Hatchback'},{id:'suv',label:'SUV'},{id:'sedan',label:'Sedan'},{id:'electric',label:'Electric'}];
export default carData;
