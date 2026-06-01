import prod1 from '../images/prod-1.png';
import prod2 from '../images/prod-2.png';
import prod3 from '../images/prod-3.png';
import prod4 from '../images/prod-4.png';
import prod5 from '../images/prod-5.png';
import prod6 from '../images/prod-6.png';

const productData = [
  { id: 1, name: 'Royal Silk Kurta', brand: 'Manyavar', price: '₹4,999', originalPrice: '₹7,499', discount: '33% off', category: 'fashion', rating: 4.6, reviews: 1842, image: prod1, tag: 'Bestseller' },
  { id: 2, name: 'Banarasi Silk Saree', brand: 'Fabindia', price: '₹8,499', originalPrice: '₹12,999', discount: '35% off', category: 'fashion', rating: 4.8, reviews: 3256, image: prod2, tag: 'Premium' },
  { id: 3, name: 'Heritage Chronograph Watch', brand: 'Titan', price: '₹12,995', originalPrice: '₹18,995', discount: '32% off', category: 'accessories', rating: 4.7, reviews: 956, image: prod3, tag: 'New Arrival' },
  { id: 4, name: 'CloudWalk Sneakers', brand: 'Campus', price: '₹2,499', originalPrice: '₹3,999', discount: '38% off', category: 'footwear', rating: 4.4, reviews: 5621, image: prod4, tag: 'Trending' },
  { id: 5, name: 'Artisan Leather Tote', brand: 'Hidesign', price: '₹5,895', originalPrice: '₹8,495', discount: '31% off', category: 'accessories', rating: 4.5, reviews: 724, image: prod5, tag: 'Handcrafted' },
  { id: 6, name: 'Kundan Jhumka Earrings', brand: 'Tanishq', price: '₹24,999', originalPrice: '₹32,500', discount: '23% off', category: 'jewelry', rating: 4.9, reviews: 1103, image: prod6, tag: 'Festive Special' },
  { id: 7, name: 'Embroidered Sherwani', brand: 'Raymond', price: '₹15,999', originalPrice: '₹24,999', discount: '36% off', category: 'fashion', rating: 4.7, reviews: 412, image: prod1, tag: 'Wedding Edit' },
  { id: 8, name: 'Chanderi Cotton Dupatta', brand: 'Biba', price: '₹1,299', originalPrice: '₹1,999', discount: '35% off', category: 'fashion', rating: 4.3, reviews: 2873, image: prod2, tag: 'Under ₹1,500' },
];

export const productCategories = [
  { id: 'all', label: 'All' },
  { id: 'fashion', label: 'Fashion' },
  { id: 'accessories', label: 'Accessories' },
  { id: 'footwear', label: 'Footwear' },
  { id: 'jewelry', label: 'Jewellery' },
];

export default productData;
