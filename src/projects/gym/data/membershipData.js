const strengthImg = 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&h=300&fit=crop';
const cardioImg = 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400&h=300&fit=crop';
const yogaImg = 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=300&fit=crop';
const combatImg = 'https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?w=400&h=300&fit=crop';

const classData = [
  // Strength
  { id: 1, name: 'Powerlifting', description: 'Heavy compound lifts — squat, bench, deadlift with certified powerlifting coaches.', duration: '60 min', trainer: 'Coach Vikram', schedule: 'Mon, Wed, Fri — 6 AM', category: 'strength', image: strengthImg },
  { id: 2, name: 'Functional Training', description: 'Full-body strength & mobility using kettlebells, battle ropes, TRX, and plyometrics.', duration: '45 min', trainer: 'Coach Priya', schedule: 'Tue, Thu, Sat — 7 AM', category: 'strength', image: strengthImg },
  { id: 3, name: 'Bodybuilding', description: 'Hypertrophy-focused training with progressive overload. Split routines for all levels.', duration: '75 min', trainer: 'Coach Arjun', schedule: 'Mon — Sat, 5 PM', category: 'strength', image: strengthImg },

  // Cardio
  { id: 4, name: 'Spinning / Indoor Cycling', description: 'High-energy indoor cycling with beats, intervals, and hill climbs. Burns 500+ calories.', duration: '45 min', trainer: 'Coach Meera', schedule: 'Mon — Fri, 6:30 AM', category: 'cardio', image: cardioImg },
  { id: 5, name: 'Zumba Dance Fitness', description: 'Bollywood & Latin dance workout — fun, high-energy, and great for all fitness levels.', duration: '50 min', trainer: 'Coach Neha', schedule: 'Tue, Thu, Sat — 7 PM', category: 'cardio', image: cardioImg },
  { id: 6, name: 'HIIT Circuit', description: '30-second intervals of burpees, box jumps, sprints, and core work. Maximum fat burn.', duration: '30 min', trainer: 'Coach Rohan', schedule: 'Mon, Wed, Fri — 7:30 AM', category: 'cardio', image: cardioImg },

  // Yoga
  { id: 7, name: 'Power Yoga', description: 'Dynamic vinyasa flow combining strength, flexibility, and breathwork.', duration: '60 min', trainer: 'Guru Ananya', schedule: 'Mon — Sat, 6 AM', category: 'yoga', image: yogaImg },
  { id: 8, name: 'Meditation & Pranayama', description: 'Guided meditation, breathing techniques, and mindfulness for stress relief.', duration: '30 min', trainer: 'Guru Ananya', schedule: 'Daily, 7 AM', category: 'yoga', image: yogaImg },

  // Combat
  { id: 9, name: 'Kickboxing', description: 'Muay Thai inspired kickboxing — punches, kicks, knee strikes, and heavy bag work.', duration: '60 min', trainer: 'Coach Sameer', schedule: 'Mon, Wed, Fri — 6 PM', category: 'combat', image: combatImg },
  { id: 10, name: 'MMA Conditioning', description: 'Mixed martial arts conditioning — grappling drills, striking combos, and core work.', duration: '60 min', trainer: 'Coach Sameer', schedule: 'Tue, Thu — 6 PM', category: 'combat', image: combatImg },
];

export const classCategories = [
  { id: 'all', label: 'All Classes' },
  { id: 'strength', label: 'Strength' },
  { id: 'cardio', label: 'Cardio' },
  { id: 'yoga', label: 'Yoga' },
  { id: 'combat', label: 'Combat' },
];

export const membershipPlans = [
  { id: 1, name: 'Starter', price: '₹1,499', period: '/month', features: ['Gym floor access', 'Locker room', 'Basic fitness assessment', '1 group class/week'], popular: false },
  { id: 2, name: 'Pro', price: '₹2,999', period: '/month', features: ['Unlimited gym access', 'All group classes', 'Personal trainer (2x/month)', 'Nutrition guidance', 'Sauna & steam'], popular: true },
  { id: 3, name: 'Elite', price: '₹4,999', period: '/month', features: ['24/7 gym access', 'Unlimited classes', 'Dedicated personal trainer', 'Custom diet plan', 'Spa & recovery zone', 'Guest passes (2/month)'], popular: false },
  { id: 4, name: 'Annual Pro', price: '₹24,999', period: '/year', features: ['Everything in Pro', '2 months FREE', 'Body composition analysis', 'Priority booking', 'Merchandise kit'], popular: false },
];

export default classData;
