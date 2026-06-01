import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LuArrowLeft, LuChevronDown,
  LuMapPin, LuPhone, LuMail,
  LuInstagram, LuFacebook, LuStar,
} from 'react-icons/lu';
import packageData, { packageCategories } from './data/packageData';
import heroBg from './images/hero-bg.png';
import './WeddingPage.css';

const ease = [0.4, 0, 0, 1];

const testimonials = [
  { text: '"Shaadify turned our dream wedding into reality. The mandap decor in Udaipur was out of a fairy tale. Every guest was mesmerised!"', author: 'Nisha & Karan Mehra', role: 'Destination Wedding, Udaipur' },
  { text: '"From mehndi to vidaai, everything was perfectly planned. The food was exceptional and the coordination was flawless."', author: 'Sakshi & Aditya Kapoor', role: 'Grand Wedding, Delhi' },
  { text: '"We had a tight budget but Shaadify made it feel royal. The Silver Package gave us everything we dreamed of. Highly recommended!"', author: 'Deepika & Rahul Jain', role: 'Budget Wedding, Jaipur' },
];

const navLinks = [
  { label: 'Services', href: '#wd-services' },
  { label: 'Inquire', href: '#wd-inquiry' },
  { label: 'Reviews', href: '#wd-testimonials' },
];

export default function WeddingPage() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [showToast, setShowToast] = useState(false);
  const [formData, setFormData] = useState({
    bride: '', groom: '', phone: '', email: '', date: '', guests: '', budget: '', city: '', notes: '',
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

  const filteredPackages = activeFilter === 'all'
    ? packageData
    : packageData.filter((p) => p.category === activeFilter);

  const handleFormChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setShowToast(true);
    setFormData({ bride: '', groom: '', phone: '', email: '', date: '', guests: '', budget: '', city: '', notes: '' });
    setTimeout(() => setShowToast(false), 3000);
  };

  return (
    <div className="wd-page">
      <Link to="/" className="wd-back-badge">
        <LuArrowLeft size={14} /> Back to Tarik
      </Link>

      {/* Navbar */}
      <nav className={`wd-navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="wd-navbar-logo" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          Shaadi<span>fy</span>
        </div>
        <div className="wd-nav-links">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} onClick={(e) => handleNavClick(e, link.href)}>{link.label}</a>
          ))}
          <a href="#wd-inquiry" className="wd-cta-btn" onClick={(e) => handleNavClick(e, '#wd-inquiry')}>
            Plan My Wedding
          </a>
        </div>
        <div className={`wd-mobile-toggle ${mobileOpen ? 'active' : ''}`} onClick={() => setMobileOpen(!mobileOpen)} role="button" aria-label="Toggle menu" tabIndex={0}>
          <span /><span /><span />
        </div>
      </nav>

      <div className={`wd-mobile-menu ${mobileOpen ? 'open' : ''}`}>
        {navLinks.map((link) => (
          <a key={link.href} href={link.href} onClick={(e) => handleNavClick(e, link.href)}>{link.label}</a>
        ))}
        <a href="#wd-inquiry" className="wd-cta-btn" onClick={(e) => handleNavClick(e, '#wd-inquiry')}>Plan My Wedding</a>
      </div>

      {/* Hero */}
      <section className="wd-hero">
        <div className="wd-hero-bg">
          <img src={heroBg} alt="Shaadify — Indian wedding planner" />
        </div>
        <div className="wd-hero-overlay" />
        <motion.div className="wd-hero-content" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease, delay: 0.2 }}>
          <div className="wd-hero-badge">✦ India&apos;s Premier Wedding Planners ✦</div>
          <h1 className="wd-hero-title">
            Shaadi<span className="wd-hero-title-accent">fy</span>
          </h1>
          <p className="wd-hero-tagline">
            From intimate ceremonies to grand celebrations — we craft unforgettable Indian weddings across Udaipur, Jaipur, Goa, and beyond.
          </p>
          <div className="wd-hero-buttons">
            <a href="#wd-inquiry" className="wd-cta-btn" onClick={(e) => handleNavClick(e, '#wd-inquiry')}>
              Plan My Wedding
            </a>
            <a href="#wd-services" className="wd-btn-outline" onClick={(e) => handleNavClick(e, '#wd-services')}>
              View Packages
            </a>
          </div>
        </motion.div>
        <div className="wd-hero-scroll">Scroll <LuChevronDown /></div>
      </section>

      {/* Stats */}
      <motion.section className="wd-stats" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.6, ease }}>
        <div className="wd-stats-grid">
          {[{ n: '500+', l: 'Weddings Planned' }, { n: '12+', l: 'Cities Covered' }, { n: '4.9★', l: 'Google Rating' }, { n: '₹200 Cr+', l: 'Celebrations Managed' }].map((s, i) => (
            <div key={i} className="wd-stat-item">
              <div className="wd-stat-number">{s.n}</div>
              <div className="wd-stat-label">{s.l}</div>
            </div>
          ))}
        </div>
      </motion.section>

      {/* Services */}
      <section className="wd-services" id="wd-services">
        <motion.div className="wd-services-header" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.6, ease }}>
          <div className="wd-section-label">Our Services</div>
          <h2 className="wd-section-title">Wedding Packages</h2>
        </motion.div>

        <div className="wd-filter-tabs">
          {packageCategories.map((t) => (
            <button key={t.id} className={`wd-filter-tab ${activeFilter === t.id ? 'active' : ''}`} onClick={() => setActiveFilter(t.id)}>
              {t.label}
            </button>
          ))}
        </div>

        <motion.div className="wd-service-grid" layout>
          <AnimatePresence mode="popLayout">
            {filteredPackages.map((pkg) => (
              <motion.div key={pkg.id} className="wd-service-card" layout initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.3, ease }}>
                <div className="wd-service-img">
                  <img src={pkg.image} alt={pkg.name} />
                </div>
                <div className="wd-service-info">
                  <div className="wd-service-name">{pkg.name}</div>
                  <p className="wd-service-desc">{pkg.description}</p>
                  <div className="wd-service-bottom">
                    <span className="wd-service-price">{pkg.price}</span>
                    <button className="wd-service-book" onClick={() => { document.querySelector('#wd-inquiry')?.scrollIntoView({ behavior: 'smooth' }); }}>
                      Inquire
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </section>

      {/* Inquiry Form */}
      <section className="wd-inquiry" id="wd-inquiry">
        <motion.div className="wd-inquiry-header" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.6, ease }}>
          <div className="wd-section-label">Start Planning</div>
          <h2 className="wd-section-title">Tell Us About Your Dream Wedding</h2>
        </motion.div>

        <motion.form className="wd-form" onSubmit={handleFormSubmit} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-40px' }} transition={{ duration: 0.6, ease, delay: 0.1 }}>
          <div className="wd-form-group">
            <label className="wd-form-label">Bride&apos;s Name</label>
            <input className="wd-input" type="text" name="bride" placeholder="Bride's name" value={formData.bride} onChange={handleFormChange} required />
          </div>
          <div className="wd-form-group">
            <label className="wd-form-label">Groom&apos;s Name</label>
            <input className="wd-input" type="text" name="groom" placeholder="Groom's name" value={formData.groom} onChange={handleFormChange} required />
          </div>
          <div className="wd-form-group">
            <label className="wd-form-label">Phone</label>
            <input className="wd-input" type="tel" name="phone" placeholder="+91 98XXX XXXXX" value={formData.phone} onChange={handleFormChange} required />
          </div>
          <div className="wd-form-group">
            <label className="wd-form-label">Email</label>
            <input className="wd-input" type="email" name="email" placeholder="you@email.com" value={formData.email} onChange={handleFormChange} required />
          </div>
          <div className="wd-form-group">
            <label className="wd-form-label">Wedding Date</label>
            <input className="wd-input" type="date" name="date" value={formData.date} onChange={handleFormChange} required />
          </div>
          <div className="wd-form-group">
            <label className="wd-form-label">Expected Guests</label>
            <select className="wd-select" name="guests" value={formData.guests} onChange={handleFormChange} required>
              <option value="">Select</option>
              <option value="100-200">100 — 200</option>
              <option value="200-500">200 — 500</option>
              <option value="500-1000">500 — 1,000</option>
              <option value="1000+">1,000+</option>
            </select>
          </div>
          <div className="wd-form-group">
            <label className="wd-form-label">Budget Range</label>
            <select className="wd-select" name="budget" value={formData.budget} onChange={handleFormChange} required>
              <option value="">Select Budget</option>
              <option value="10-20l">₹10 — 20 Lac</option>
              <option value="20-50l">₹20 — 50 Lac</option>
              <option value="50l-1cr">₹50 Lac — 1 Cr</option>
              <option value="1-3cr">₹1 — 3 Cr</option>
              <option value="3cr+">₹3 Cr+</option>
            </select>
          </div>
          <div className="wd-form-group">
            <label className="wd-form-label">Preferred City</label>
            <select className="wd-select" name="city" value={formData.city} onChange={handleFormChange} required>
              <option value="">Select City</option>
              <option value="udaipur">Udaipur</option>
              <option value="jaipur">Jaipur</option>
              <option value="goa">Goa</option>
              <option value="delhi">New Delhi</option>
              <option value="mumbai">Mumbai</option>
              <option value="jodhpur">Jodhpur</option>
              <option value="shimla">Shimla / Manali</option>
              <option value="kerala">Kerala</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div className="wd-form-group full-width">
            <label className="wd-form-label">Tell Us More</label>
            <textarea className="wd-textarea" name="notes" placeholder="Wedding theme, special ceremonies (haldi, sangeet, mehndi), dietary preferences, etc." value={formData.notes} onChange={handleFormChange} />
          </div>
          <div className="wd-form-submit">
            <button type="submit" className="wd-cta-btn">Submit Inquiry</button>
          </div>
        </motion.form>
      </section>

      {/* Testimonials */}
      <section className="wd-testimonials" id="wd-testimonials">
        <motion.div className="wd-testimonials-header" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.6, ease }}>
          <div className="wd-section-label">Love Stories</div>
          <h2 className="wd-section-title">Happy Couples</h2>
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div key={currentTestimonial} className="wd-testimonial-card" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.4, ease }}>
            <div className="wd-testimonial-stars">{[...Array(5)].map((_, i) => <LuStar key={i} />)}</div>
            <p className="wd-testimonial-text">{testimonials[currentTestimonial].text}</p>
            <div className="wd-testimonial-author">{testimonials[currentTestimonial].author}</div>
            <div className="wd-testimonial-role">{testimonials[currentTestimonial].role}</div>
          </motion.div>
        </AnimatePresence>

        <div className="wd-testimonial-dots">
          {testimonials.map((_, i) => (
            <button key={i} className={`wd-testimonial-dot ${i === currentTestimonial ? 'active' : ''}`} onClick={() => setCurrentTestimonial(i)} aria-label={`Review ${i + 1}`} />
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="wd-footer">
        <div className="wd-footer-inner">
          <div className="wd-footer-logo">Shaadi<span>fy</span></div>
          <div className="wd-footer-copy">© 2026 Shaadify Wedding Planners, New Delhi | contact@shaadify.in | +91 98100 12345</div>
          <div className="wd-footer-socials">
            <a href="#" className="wd-footer-social" aria-label="Instagram"><LuInstagram /></a>
            <a href="#" className="wd-footer-social" aria-label="Facebook"><LuFacebook /></a>
          </div>
        </div>
      </footer>

      {/* Toast */}
      <AnimatePresence>
        {showToast && (
          <motion.div className="wd-toast" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} transition={{ duration: 0.3 }}>
            ✓ Inquiry received! Our wedding coordinator will call you within 24 hours.
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
