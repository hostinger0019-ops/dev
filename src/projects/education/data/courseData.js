const engImg = 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400&h=300&fit=crop';
const medImg = 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=400&h=300&fit=crop';
const govtImg = 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&h=300&fit=crop';
const schoolImg = 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&h=300&fit=crop';

const courseData = [
  { id: 1, name: 'IIT-JEE Advanced Batch', description: 'Complete Physics, Chemistry & Maths for JEE Main + Advanced. Daily tests, doubt sessions.', price: '₹85,000/yr', duration: '2 Years', students: '5,200+', rating: 4.9, category: 'engineering', image: engImg },
  { id: 2, name: 'NEET UG Crash Course', description: 'Intensive Biology, Physics & Chemistry crash course with NCERT-focused approach.', price: '₹45,000', duration: '6 Months', students: '3,800+', rating: 4.8, category: 'medical', image: medImg },
  { id: 3, name: 'UPSC CSE Foundation', description: 'Prelims + Mains + Interview prep. GS, CSAT, Optional, Essay, and Ethics covered.', price: '₹1,20,000', duration: '18 Months', students: '2,100+', rating: 4.9, category: 'civil', image: govtImg },
  { id: 4, name: 'CA Foundation', description: 'Accounts, Business Law, Maths & Economics as per ICAI syllabus. Mock tests included.', price: '₹35,000', duration: '8 Months', students: '1,500+', rating: 4.7, category: 'commerce', image: govtImg },
  { id: 5, name: 'GATE CSE Preparation', description: 'Computer Science GATE preparation with previous year analysis, test series & mentorship.', price: '₹28,000', duration: '10 Months', students: '900+', rating: 4.8, category: 'engineering', image: engImg },
  { id: 6, name: 'NEET PG Accelerator', description: 'Subject-wise revision, grand tests, and clinical scenario discussions for NEET PG.', price: '₹55,000', duration: '8 Months', students: '700+', rating: 4.8, category: 'medical', image: medImg },
  { id: 7, name: 'SSC CGL Complete', description: 'Tier I & II preparation — Quant, English, Reasoning, GK with daily practice sets.', price: '₹18,000', duration: '6 Months', students: '4,500+', rating: 4.6, category: 'civil', image: govtImg },
  { id: 8, name: 'Class 10 Board Topper', description: 'CBSE/ICSE board preparation — all subjects, sample papers, and weekly assessments.', price: '₹15,000', duration: '10 Months', students: '8,000+', rating: 4.7, category: 'school', image: schoolImg },
];

export const courseCategories = [
  { id: 'all', label: 'All Courses' },
  { id: 'engineering', label: 'Engineering' },
  { id: 'medical', label: 'Medical' },
  { id: 'civil', label: 'Govt. Exams' },
  { id: 'commerce', label: 'Commerce' },
  { id: 'school', label: 'School' },
];

export default courseData;
