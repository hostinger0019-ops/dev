import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { LuArrowUpRight } from 'react-icons/lu';
import { useCursor } from '../context/CursorContext';
import SplitText from './SplitText';
import './Portfolio.css';

const ease = [0.4, 0, 0, 1];

const projects = [
  { title: 'E-Commerce', brand: 'Zestora', description: 'Online stores that convert visitors into customers.', tag: 'E-Commerce', gradient: 'portfolio-gradient-1', slug: '/ecommerce', image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop', category: 'all' },
  { title: 'Real Estate', brand: 'PrimeState', description: 'Property platforms with listings & virtual tours.', tag: 'Real Estate', gradient: 'portfolio-gradient-2', slug: '/realestate', image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&h=400&fit=crop', category: 'all' },
  { title: 'Restaurant', brand: 'Ember & Oak', description: 'Digital menus, online ordering & reservations.', tag: 'Restaurant', gradient: 'portfolio-gradient-3', slug: '/restaurant', image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&h=400&fit=crop', category: 'all' },
  { title: 'Salon & Beauty', brand: 'Glowra', description: 'Appointment booking & service showcases.', tag: 'Salon', gradient: 'portfolio-gradient-4', slug: '/salon', image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=600&h=400&fit=crop', category: 'all' },
  { title: 'Dental Clinic', brand: 'SmileCraft', description: 'Patient booking, treatment showcases & trust-building.', tag: 'Dental', gradient: 'portfolio-gradient-5', slug: '/dental', image: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=600&h=400&fit=crop', category: 'all' },
  { title: 'Wedding', brand: 'Shaadify', description: 'Wedding planning, packages & vendor showcases.', tag: 'Wedding', gradient: 'portfolio-gradient-6', slug: '/wedding', image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=600&h=400&fit=crop', category: 'all' },
  { title: 'Gym & Fitness', brand: 'FitForge', description: 'Membership plans, class schedules & trainer profiles.', tag: 'Gym', gradient: 'portfolio-gradient-7', slug: '/gym', image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&h=400&fit=crop', category: 'all' },
  { title: 'Law Firm', brand: 'LegalEdge', description: 'Practice areas, attorney profiles & consultations.', tag: 'Law Firm', gradient: 'portfolio-gradient-8', slug: '/lawfirm', image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&h=400&fit=crop', category: 'all' },
  { title: 'Education', brand: 'TopRank', description: 'Course catalogs, enrollment & learning platforms.', tag: 'Education', gradient: 'portfolio-gradient-9', slug: '/education', image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=600&h=400&fit=crop', category: 'all' },
  { title: 'Travel Agency', brand: 'WanderBharat', description: 'Trip packages, booking & destination guides.', tag: 'Travel', gradient: 'portfolio-gradient-10', slug: '/travel', image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=600&h=400&fit=crop', category: 'all' },
  { title: 'Photography', brand: 'LensKraft', description: 'Portfolio galleries, shoot booking & pricing.', tag: 'Photography', gradient: 'portfolio-gradient-11', slug: '/photography', image: 'https://images.unsplash.com/photo-1554048612-b6a482bc67e5?w=600&h=400&fit=crop', category: 'all' },
  { title: 'Interior Design', brand: 'DesignNest', description: 'Project showcases, consultation & 3D renders.', tag: 'Interior', gradient: 'portfolio-gradient-12', slug: '/interiordesign', image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=600&h=400&fit=crop', category: 'all' },
  { title: 'Hotel & Resort', brand: 'StayVista', description: 'Room booking, experiences & guest services.', tag: 'Hotel', gradient: 'portfolio-gradient-13', slug: '/hotel', image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&h=400&fit=crop', category: 'all' },
  { title: 'Car Dealership', brand: 'AutoBharat', description: 'Inventory showcase, test drive booking & EMI tools.', tag: 'Automotive', gradient: 'portfolio-gradient-14', slug: '/cardealership', image: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=600&h=400&fit=crop', category: 'all' },
  { title: 'Bakery & Café', brand: 'SweetCrust', description: 'Menu showcase, custom orders & online delivery.', tag: 'Bakery', gradient: 'portfolio-gradient-15', slug: '/bakery', image: 'https://images.unsplash.com/photo-1517433670267-08bbd4be890f?w=600&h=400&fit=crop', category: 'all' },
];

const INITIAL_SHOW = 6;

const cardReveal = {
  hidden: { clipPath: 'inset(100% 0 0 0)', opacity: 0 },
  visible: {
    clipPath: 'inset(0% 0 0 0)',
    opacity: 1,
    transition: { duration: 0.8, ease },
  },
};

export default function Portfolio() {
  const { setCursorHovered, setCursorLabel } = useCursor();
  const [showAll, setShowAll] = useState(false);
  const displayed = showAll ? projects : projects.slice(0, INITIAL_SHOW);

  return (
    <section className="portfolio section" id="portfolio">
      <div className="container">
        <motion.div
          className="portfolio-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease }}
        >
          <span className="section-label">Our Work</span>
          <SplitText
            text="What We Build"
            as="h2"
            className="section-title"
            variant="slideUp"
            center
            stagger={0.06}
          />
          <p className="section-subtitle" style={{ margin: '0 auto' }}>
            {projects.length} premium industry demos — click to explore live.
          </p>
        </motion.div>

        <div className="portfolio-grid">
          <AnimatePresence mode="popLayout">
            {displayed.map((project, index) => (
              <motion.div
                key={project.slug}
                className="portfolio-card"
                variants={cardReveal}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-40px' }}
                transition={{ delay: index * 0.04 }}
                layout
                onMouseEnter={() => { setCursorHovered(true); setCursorLabel('View'); }}
                onMouseLeave={() => { setCursorHovered(false); setCursorLabel(''); }}
              >
                <Link to={project.slug} style={{ position: 'absolute', inset: 0, zIndex: 3 }} aria-label={`View ${project.title}`} />
                <div className="portfolio-card-image">
                  <img src={project.image} alt={project.title} loading="lazy" />
                </div>
                <div className={`portfolio-card-gradient ${project.gradient}`} />
                <div className="portfolio-card-overlay">
                  <span className="portfolio-card-tag">{project.tag}</span>
                  <h3 className="portfolio-card-title">{project.brand}</h3>
                  <p className="portfolio-card-desc">{project.description}</p>
                  <span className="portfolio-card-link">
                    View Project <LuArrowUpRight />
                  </span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {!showAll && (
          <motion.div
            className="portfolio-showmore"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <button className="portfolio-showmore-btn" onClick={() => setShowAll(true)}>
              View All {projects.length} Projects <LuArrowUpRight />
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
}
