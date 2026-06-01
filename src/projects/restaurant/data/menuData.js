import food1 from '../images/food-1.png';
import food2 from '../images/food-2.png';
import food3 from '../images/food-3.png';
import food4 from '../images/food-4.png';
import food5 from '../images/food-5.png';
import food6 from '../images/food-6.png';
import food7 from '../images/food-7.png';
import food8 from '../images/food-8.png';

const menuData = [
  // Starters
  { id: 1, name: 'Paneer Tikka', description: 'Chargrilled cottage cheese marinated in hung curd, Kashmiri chilli, and aromatic spices.', price: '₹395', category: 'starters', image: food5 },
  { id: 2, name: 'Chicken Seekh Kebab', description: 'Hand-minced chicken with fresh herbs, green chilli, and ginger, cooked in clay tandoor.', price: '₹445', category: 'starters', image: food8 },
  { id: 3, name: 'Dahi Ke Kebab', description: 'Melt-in-mouth hung curd patties with cashew, raisins, and a hint of saffron.', price: '₹350', category: 'starters', image: food1 },
  { id: 4, name: 'Mutton Galouti Kebab', description: 'Lucknowi-style melt-on-tongue lamb kebabs with 150 spices, served on ulte tawa paratha.', price: '₹595', category: 'starters', image: food3 },

  // Mains
  { id: 5, name: 'Dal Makhani', description: 'Slow-cooked black lentils simmered overnight with butter, cream, and tomato masala.', price: '₹445', category: 'mains', image: food2 },
  { id: 6, name: 'Murgh Makhani', description: 'Signature butter chicken — tandoori chicken in rich tomato-cashew gravy with kasuri methi.', price: '₹545', category: 'mains', image: food3 },
  { id: 7, name: 'Paneer Lababdar', description: 'Cottage cheese in a velvety tomato-onion gravy with cream, cashew paste, and fresh spices.', price: '₹495', category: 'mains', image: food1 },
  { id: 8, name: 'Raan-E-Sikandari', description: 'Whole leg of lamb marinated for 48 hours in royal spices, slow-roasted in tandoor. Serves 2.', price: '₹1,895', category: 'mains', image: food4 },

  // Desserts
  { id: 9, name: 'Gulab Jamun', description: 'Golden milk-solid dumplings soaked in warm rose and cardamom sugar syrup, served with rabdi.', price: '₹295', category: 'desserts', image: food6 },
  { id: 10, name: 'Rasmalai', description: 'Soft paneer discs in chilled saffron-infused thickened milk with pistachios and almonds.', price: '₹325', category: 'desserts', image: food6 },
  { id: 11, name: 'Phirni', description: 'Mughlai-style ground rice pudding set in earthen bowls with saffron, rose, and silver leaf.', price: '₹275', category: 'desserts', image: food6 },
  { id: 12, name: 'Shahi Tukda', description: 'Fried bread slices layered with thickened rabdi, dry fruits, saffron, and edible silver.', price: '₹350', category: 'desserts', image: food6 },

  // Drinks
  { id: 13, name: 'Masala Chai', description: 'Hand-pounded ginger, cardamom, and cinnamon brewed in Assam tea with whole milk.', price: '₹195', category: 'drinks', image: food7 },
  { id: 14, name: 'Thandai', description: 'Chilled milk with almonds, fennel seeds, rose petals, saffron, and black pepper.', price: '₹275', category: 'drinks', image: food7 },
  { id: 15, name: 'Mango Lassi', description: 'Creamy yoghurt blended with Alphonso mango pulp, cardamom, and a touch of honey.', price: '₹225', category: 'drinks', image: food7 },
  { id: 16, name: 'Rose Sharbat', description: 'Chilled rose water, basil seeds, fresh lime, and rock sugar — a Mughlai classic.', price: '₹195', category: 'drinks', image: food7 },
];

export const categories = [
  { id: 'all', label: 'All' },
  { id: 'starters', label: 'Starters' },
  { id: 'mains', label: 'Mains' },
  { id: 'desserts', label: 'Desserts' },
  { id: 'drinks', label: 'Drinks' },
];

export default menuData;
