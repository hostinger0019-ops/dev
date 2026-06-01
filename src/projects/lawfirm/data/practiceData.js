import service1 from '../images/service-1.png';
import service2 from '../images/service-2.png';
import service3 from '../images/service-3.png';

const practiceData = [
  { id: 1, name: 'Corporate & Commercial Law', description: 'Mergers & acquisitions, joint ventures, FDI compliance, SEBI regulations, and corporate governance.', category: 'corporate', image: service1 },
  { id: 2, name: 'Intellectual Property', description: 'Trademark registration, patent filing, copyright protection, and IP litigation across India.', category: 'corporate', image: service1 },
  { id: 3, name: 'Real Estate & Property Law', description: 'RERA disputes, title verification, property registration, builder-buyer agreements, and land acquisition.', category: 'civil', image: service2 },
  { id: 4, name: 'Family & Matrimonial Law', description: 'Divorce, child custody, alimony, domestic violence, and Hindu/Muslim personal law matters.', category: 'civil', image: service2 },
  { id: 5, name: 'Criminal Defence', description: 'Bail applications, FIR quashing, white-collar crimes, cybercrime, and trial representation in all courts.', category: 'criminal', image: service3 },
  { id: 6, name: 'Tax & GST Advisory', description: 'Income tax disputes, GST compliance, tax planning for HNIs, and representation before ITAT.', category: 'corporate', image: service1 },
  { id: 7, name: 'Employment & Labour Law', description: 'Employee disputes, wrongful termination, POSH compliance, PF/ESI matters, and industrial disputes.', category: 'civil', image: service2 },
  { id: 8, name: 'Consumer Protection', description: 'Filing complaints under Consumer Protection Act 2019, product liability, and e-commerce disputes.', category: 'civil', image: service2 },
];

export const practiceCategories = [
  { id: 'all', label: 'All Areas' },
  { id: 'corporate', label: 'Corporate' },
  { id: 'civil', label: 'Civil' },
  { id: 'criminal', label: 'Criminal' },
];

export const attorneys = [
  { name: 'Adv. Rajesh Khanna', role: 'Managing Partner', exp: '25+ years', speciality: 'Corporate Law & M&A' },
  { name: 'Adv. Priya Nair', role: 'Senior Partner', exp: '18+ years', speciality: 'Family Law & Mediation' },
  { name: 'Adv. Sameer Malhotra', role: 'Partner', exp: '15+ years', speciality: 'Criminal Defence' },
  { name: 'Adv. Kavita Sharma', role: 'Associate Partner', exp: '12+ years', speciality: 'Real Estate & RERA' },
];

export default practiceData;
