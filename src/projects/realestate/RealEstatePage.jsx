import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LuArrowLeft, LuChevronDown,
  LuMapPin, LuPhone, LuMail,
  LuBedDouble, LuBath, LuMaximize2, LuStar,
} from 'react-icons/lu';
import propertyData, { propertyTypes } from './data/propertyData';
import heroBg from './images/hero-bg.png';
import './RealEstatePage.css';

const ease = [0.4, 0, 0, 1];

const testimonials = [
  { text: '"PrimeState helped us find our dream home in Vasant Vihar. The virtual tour feature saved us so much time. Highly recommended!"', author: 'Neha & Arjun Khanna', role: 'Homeowners, New Delhi' },
  { text: '"As an NRI, buying property in India felt daunting. PrimeState made it seamless — from shortlisting to registration, everything was handled."', author: 'Dr. Rajesh Iyer', role: 'Investor, Bengaluru' },
  { text: '"The RERA-verified listings gave us confidence. We invested in a 3BHK in Noida and the process was completely transparent."', author: 'Sunita & Manoj Gupta', role: 'First-time Buyers, Noida' },
];

const navLinks = [
  { label: 'Properties', href: '#re-properties' },
  { label: 'Inquire', href: '#re-inquiry' },
  { label: 'Contact', href: '#re-contact' },
];

export default function RealEstatePage() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [showToast, setShowToast] = useState(false);
  const [formData, setFormData] = useState({
    name: '', phone: '', email: '', budget: '', propertyType: '', location: '', notes: '',
  });

  useEffect(() => { window.scrollTo(0, 0); }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const handleNavClick = useCallback((e, href) => {
    e.preventDefault();
    setMobileOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  const filteredProperties = activeFilter === 'all'
    ? propertyData
    : propertyData.filter((p) => p.type === activeFilter);

  const handleFormChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setShowToast(true);
    setFormData({ name: '', phone: '', email: '', budget: '', propertyType: '', location: '', notes: '' });
    setTimeout(() => setShowToast(false), 3000);
  };

  return (
    <div className="re-page">
      <Link to="/" className="re-back-badge">
        <LuArrowLeft size={14} /> Back to Tarik
      </Link>

      {/* Navbar */}
      <nav className={`re-navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="re-navbar-logo" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          Prime<span>State</span>
        </div>
        <div className="re-nav-links">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} onClick={(e) => handleNavClick(e, link.href)}>{link.label}</a>
          ))}
          <a href="#re-inquiry" className="re-cta-btn" onClick={(e) => handleNavClick(e, '#re-inquiry')}>
            Get Started
          </a>
        </div>
        <div className={`re-mobile-toggle ${mobileOpen ? 'active' : ''}`} onClick={() => setMobileOpen(!mobileOpen)} role="button" aria-label="Toggle menu" tabIndex={0}>
          <span /><span /><span />
        </div>
      </nav>

      <div className={`re-mobile-menu ${mobileOpen ? 'open' : ''}`}>
        {navLinks.map((link) => (
          <a key={link.href} href={link.href} onClick={(e) => handleNavClick(e, link.href)}>{link.label}</a>
        ))}
        <a href="#re-inquiry" className="re-cta-btn" onClick={(e) => handleNavClick(e, '#re-inquiry')}>Get Started</a>
      </div>

      {/* Hero */}
      <section className="re-hero">
        <div className="re-hero-bg">
          <img src={heroBg} alt="PrimeState luxury properties India" />
        </div>
        <div className="re-hero-overlay" />
        <motion.div className="re-hero-content" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease, delay: 0.2 }}>
          <div className="re-hero-badge">✦ RERA Verified Properties ✦</div>
          <h1 className="re-hero-title">
            Prime<span className="re-hero-title-accent">State</span>
          </h1>
          <p className="re-hero-tagline">
            Find your dream home across India&apos;s most premium locations. Luxury villas, penthouses, and apartments — all RERA verified.
          </p>
          <div className="re-hero-buttons">
            <a href="#re-properties" className="re-cta-btn" onClick={(e) => handleNavClick(e, '#re-properties')}>
              Explore Properties
            </a>
            <a href="#re-inquiry" className="re-btn-outline" onClick={(e) => handleNavClick(e, '#re-inquiry')}>
              Schedule a Visit
            </a>
          </div>
        </motion.div>
        <div className="re-hero-scroll">Scroll <LuChevronDown /></div>
      </section>

      {/* Stats */}
      <motion.section className="re-stats" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.6, ease }}>
        <div className="re-stats-grid">
          {[{ n: '500+', l: 'Properties Listed' }, { n: '₹2,800 Cr', l: 'Worth Sold' }, { n: '1,200+', l: 'Happy Families' }, { n: '15+', l: 'Cities Covered' }].map((s, i) => (
            <div key={i} className="re-stat-item">
              <div className="re-stat-number">{s.n}</div>
              <div className="re-stat-label">{s.l}</div>
            </div>
          ))}
        </div>
      </motion.section>

      {/* Properties */}
      <section className="re-properties" id="re-properties">
        <motion.div className="re-properties-header" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.6, ease }}>
          <div className="re-section-label">Featured Listings</div>
          <h2 className="re-section-title">Premium Properties</h2>
        </motion.div>

        <div className="re-filter-tabs">
          {propertyTypes.map((t) => (
            <button key={t.id} className={`re-filter-tab ${activeFilter === t.id ? 'active' : ''}`} onClick={() => setActiveFilter(t.id)}>
              {t.label}
            </button>
          ))}
        </div>

        <motion.div className="re-property-grid" layout>
          <AnimatePresence mode="popLayout">
            {filteredProperties.map((prop) => (
              <motion.div key={prop.id} className="re-property-card" layout initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.3, ease }}>
                <div className="re-property-img">
                  <img src={prop.image} alt={prop.title} />
                  <span className="re-property-tag">{prop.tag}</span>
                  <span className="re-property-price">{prop.price}</span>
                </div>
                <div className="re-property-info">
                  <h3 className="re-property-title">{prop.title}</h3>
                  <div className="re-property-location"><LuMapPin size={12} /> {prop.location}</div>
                  <div className="re-property-meta">
                    <span className="re-property-meta-item"><LuBedDouble size={13} /> {prop.beds} Beds</span>
                    <span className="re-property-meta-item"><LuBath size={13} /> {prop.baths} Baths</span>
                    <span className="re-property-meta-item"><LuMaximize2 size={13} /> {prop.area}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </section>

      {/* Inquiry Form */}
      <section className="re-inquiry" id="re-inquiry">
        <motion.div className="re-inquiry-header" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.6, ease }}>
          <div className="re-section-label">Get in Touch</div>
          <h2 className="re-section-title">Schedule a Property Visit</h2>
        </motion.div>

        <motion.form className="re-form" onSubmit={handleFormSubmit} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-40px' }} transition={{ duration: 0.6, ease, delay: 0.1 }}>
          <div className="re-form-group">
            <label className="re-form-label">Full Name</label>
            <input className="re-input" type="text" name="name" placeholder="Your name" value={formData.name} onChange={handleFormChange} required />
          </div>
          <div className="re-form-group">
            <label className="re-form-label">Phone</label>
            <input className="re-input" type="tel" name="phone" placeholder="+91 98XXX XXXXX" value={formData.phone} onChange={handleFormChange} required />
          </div>
          <div className="re-form-group">
            <label className="re-form-label">Email</label>
            <input className="re-input" type="email" name="email" placeholder="you@email.com" value={formData.email} onChange={handleFormChange} required />
          </div>
          <div className="re-form-group">
            <label className="re-form-label">Budget</label>
            <select className="re-select" name="budget" value={formData.budget} onChange={handleFormChange} required>
              <option value="">Select Budget</option>
              <option value="50-1cr">₹50 Lac — ₹1 Cr</option>
              <option value="1-3cr">₹1 Cr — ₹3 Cr</option>
              <option value="3-5cr">₹3 Cr — ₹5 Cr</option>
              <option value="5-10cr">₹5 Cr — ₹10 Cr</option>
              <option value="10cr+">₹10 Cr+</option>
            </select>
          </div>
          <div className="re-form-group">
            <label className="re-form-label">Property Type</label>
            <select className="re-select" name="propertyType" value={formData.propertyType} onChange={handleFormChange} required>
              <option value="">Select Type</option>
              <option value="apartment">Apartment / Flat</option>
              <option value="villa">Villa / Independent House</option>
              <option value="penthouse">Penthouse</option>
              <option value="farmhouse">Farmhouse</option>
              <option value="plot">Plot / Land</option>
            </select>
          </div>
          <div className="re-form-group">
            <label className="re-form-label">Preferred City</label>
            <select className="re-select" name="location" value={formData.location} onChange={handleFormChange} required>
              <option value="">Select City</option>
              <option value="delhi">New Delhi</option>
              <option value="mumbai">Mumbai</option>
              <option value="bengaluru">Bengaluru</option>
              <option value="hyderabad">Hyderabad</option>
              <option value="pune">Pune</option>
              <option value="gurugram">Gurugram</option>
              <option value="noida">Noida</option>
              <option value="chennai">Chennai</option>
            </select>
          </div>
          <div className="re-form-group full-width">
            <label className="re-form-label">Additional Requirements</label>
            <textarea className="re-textarea" name="notes" placeholder="Vastu compliant, near metro, gated community, etc." value={formData.notes} onChange={handleFormChange} />
          </div>
          <div className="re-form-submit">
            <button type="submit" className="re-cta-btn">Submit Inquiry</button>
          </div>
        </motion.form>
      </section>

      {/* Testimonials */}
      <section className="re-testimonials">
        <motion.div className="re-testimonials-header" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.6, ease }}>
          <div className="re-section-label">Testimonials</div>
          <h2 className="re-section-title">What Our Clients Say</h2>
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div key={currentTestimonial} className="re-testimonial-card" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.4, ease }}>
            <div className="re-testimonial-stars">{[...Array(5)].map((_, i) => <LuStar key={i} />)}</div>
            <p className="re-testimonial-text">{testimonials[currentTestimonial].text}</p>
            <div className="re-testimonial-author">{testimonials[currentTestimonial].author}</div>
            <div className="re-testimonial-role">{testimonials[currentTestimonial].role}</div>
          </motion.div>
        </AnimatePresence>

        <div className="re-testimonial-dots">
          {testimonials.map((_, i) => (
            <button key={i} className={`re-testimonial-dot ${i === currentTestimonial ? 'active' : ''}`} onClick={() => setCurrentTestimonial(i)} aria-label={`Testimonial ${i + 1}`} />
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="re-footer" id="re-contact">
        <div className="re-footer-inner">
          <div className="re-footer-logo">Prime<span>State</span></div>
          <div className="re-footer-copy">© 2026 PrimeState Realty Pvt. Ltd. | RERA Reg: DLRERA2024000123</div>
          <div className="re-footer-links">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms</a>
          </div>
        </div>
      </footer>

      {/* Toast */}
      <AnimatePresence>
        {showToast && (
          <motion.div className="re-toast" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} transition={{ duration: 0.3 }}>
            ✓ Inquiry submitted! Our team will call you within 24 hours.
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
