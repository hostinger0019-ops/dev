const cakeImg = 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=300&fit=crop';
const breadImg = 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&h=300&fit=crop';
const pastryImg = 'https://images.unsplash.com/photo-1555507036-ab1f4038024a?w=400&h=300&fit=crop';
const coffeeImg = 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400&h=300&fit=crop';

const menuData = [
  { id:1, name:'Classic Butterscotch Cake', description:'Moist vanilla sponge with crunchy butterscotch chips and caramel drizzle. Eggless available.', price:'₹599/500g', category:'cakes', image:cakeImg },
  { id:2, name:'Belgian Chocolate Truffle', description:'Rich dark chocolate ganache cake with cocoa dusting. Premium Callebaut chocolate.', price:'₹799/500g', category:'cakes', image:cakeImg },
  { id:3, name:'Red Velvet Cheesecake', description:'Two-layer red velvet with cream cheese frosting and white chocolate curls.', price:'₹899/500g', category:'cakes', image:cakeImg },
  { id:4, name:'Sourdough Bread Loaf', description:'72-hour fermented artisan sourdough with crispy crust and tangy crumb. No preservatives.', price:'₹250', category:'breads', image:breadImg },
  { id:5, name:'Almond Croissant', description:'Flaky, buttery croissant filled with frangipane and topped with toasted almonds.', price:'₹180', category:'pastries', image:pastryImg },
  { id:6, name:'Masala Chai Cookie Box', description:'Box of 12 chai-spiced cookies with cardamom, cinnamon, and ginger. Perfect gifting option.', price:'₹350', category:'pastries', image:pastryImg },
  { id:7, name:'Cold Brew Coffee', description:'24-hour steeped single-origin Coorg coffee. Smooth, bold, and served over ice.', price:'₹220', category:'beverages', image:coffeeImg },
  { id:8, name:'Matcha Latte', description:'Ceremonial grade Japanese matcha with steamed oat milk and a hint of vanilla.', price:'₹280', category:'beverages', image:coffeeImg },
];
export const menuCategories = [{id:'all',label:'All Items'},{id:'cakes',label:'Cakes'},{id:'breads',label:'Breads'},{id:'pastries',label:'Pastries'},{id:'beverages',label:'Beverages'}];
export default menuData;
