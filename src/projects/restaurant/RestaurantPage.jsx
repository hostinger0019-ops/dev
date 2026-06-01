import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LuArrowLeft, LuChevronDown,
  LuMapPin, LuPhone, LuMail,
  LuInstagram, LuFacebook, LuStar,
} from 'react-icons/lu';
import menuData, { categories } from './data/menuData';
import heroBg from './images/hero-bg.png';
import interior1 from './images/interior-1.png';
import interior2 from './images/interior-2.png';
import food1 from './images/food-1.png';
import food2 from './images/food-2.png';
import food3 from './images/food-3.png';
import food4 from './images/food-4.png';
import food5 from './images/food-5.png';
import food6 from './images/food-6.png';
import food7 from './images/food-7.png';
import food8 from './images/food-8.png';
import './RestaurantPage.css';

const ease = [0.4, 0, 0, 1];

const reviews = [
  { text: '"The Mutton Galouti melted on my tongue like butter. Ember & Oak has brought Lucknowi royalty to New Delhi. Absolutely phenomenal."', author: 'Rashmi Kapoor', role: 'Food Critic — Times Foodie' },
  { text: '"From the Dal Makhani to the Shahi Tukda, every dish was a masterpiece. The ambiance, the service — everything was world-class."', author: 'Vikram Malhotra', role: 'Zomato Gold Reviewer' },
  { text: '"We celebrated our anniversary here and it was magical. The Raan-E-Sikandari is a must-try. We\'ll keep coming back!"', author: 'Ananya & Rohan Mehta', role: 'Regular Guests' },
];

const galleryImages = [interior1, food2, food5, food7, interior2, food4, food1, food8];

const hours = [
  { day: 'Monday — Thursday', time: '12:00 PM — 11:00 PM' },
  { day: 'Friday — Saturday', time: '12:00 PM — 12:00 AM' },
  { day: 'Sunday', time: '11:00 AM — 11:00 PM' },
];

const navLinks = [
  { label: 'Menu', href: '#rst-menu' },
  { label: 'Reserve', href: '#rst-reservation' },
  { label: 'Gallery', href: '#rst-gallery' },
  { label: 'Find Us', href: '#rst-location' },
];

export default function RestaurantPage() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState('all');
  const [currentReview, setCurrentReview] = useState(0);
  const [showToast, setShowToast] = useState(false);
  const [formData, setFormData] = useState({
    name: '', phone: '', email: '', date: '', time: '', guests: '', notes: '',
  });

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Navbar scroll effect
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Auto-rotate reviews
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentReview((prev) => (prev + 1) % reviews.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  // Body overflow lock for mobile menu
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const handleNavClick = useCallback((e, href) => {
    e.preventDefault();
    setMobileOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  const filteredMenu = activeCategory === 'all'
    ? menuData
    : menuData.filter((item) => item.category === activeCategory);

  const handleFormChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setShowToast(true);
    setFormData({ name: '', phone: '', email: '', date: '', time: '', guests: '', notes: '' });
    setTimeout(() => setShowToast(false), 3000);
  };

  return (
    <div className="rst-page">
      {/* Back to Tarik badge */}
      <Link to="/" className="rst-back-badge">
        <LuArrowLeft size={14} /> Back to Tarik
      </Link>

      {/* Restaurant Navbar */}
      <nav className={`rst-navbar ${scrolled ? 'scrolled' : ''}`}>
        <div
          className="rst-navbar-logo"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          Ember <span>&</span> Oak
        </div>

        <div className="rst-nav-links">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} onClick={(e) => handleNavClick(e, link.href)}>
              {link.label}
            </a>
          ))}
          <a
            href="#rst-reservation"
            className="rst-reserve-btn"
            onClick={(e) => handleNavClick(e, '#rst-reservation')}
          >
            Reserve a Table
          </a>
        </div>

        <div
          className={`rst-mobile-toggle ${mobileOpen ? 'active' : ''}`}
          onClick={() => setMobileOpen(!mobileOpen)}
          role="button"
          aria-label="Toggle menu"
          tabIndex={0}
        >
          <span /><span /><span />
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`rst-mobile-menu ${mobileOpen ? 'open' : ''}`}>
        {navLinks.map((link) => (
          <a key={link.href} href={link.href} onClick={(e) => handleNavClick(e, link.href)}>
            {link.label}
          </a>
        ))}
        <a
          href="#rst-reservation"
          className="rst-reserve-btn"
          onClick={(e) => handleNavClick(e, '#rst-reservation')}
        >
          Reserve a Table
        </a>
      </div>

      {/* Hero */}
      <section className="rst-hero">
        <div className="rst-hero-bg">
          <img src={heroBg} alt="Ember & Oak fine dining restaurant, New Delhi" />
        </div>
        <div className="rst-hero-overlay" />
        <motion.div
          className="rst-hero-content"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease, delay: 0.2 }}
        >
          <div className="rst-hero-badge">✦ Fine Dining Experience ✦</div>
          <h1 className="rst-hero-title">
            Ember <span className="rst-hero-title-accent">&</span> Oak
          </h1>
          <p className="rst-hero-tagline">Where Fire Meets Flavor</p>
          <div className="rst-hero-buttons">
            <a
              href="#rst-reservation"
              className="rst-reserve-btn"
              onClick={(e) => handleNavClick(e, '#rst-reservation')}
            >
              Reserve a Table
            </a>
            <a
              href="#rst-menu"
              className="rst-btn-outline"
              onClick={(e) => handleNavClick(e, '#rst-menu')}
            >
              View Menu
            </a>
          </div>
        </motion.div>
        <div className="rst-hero-scroll">
          Scroll <LuChevronDown />
        </div>
      </section>

      {/* About */}
      <motion.section
        className="rst-about"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.6, ease }}
      >
        <div className="rst-section-label">Our Story</div>
        <h2 className="rst-section-title">A Culinary Journey</h2>
        <p className="rst-about-text">
          Born in the heart of New Delhi from a passion for authentic Indian
          cuisine and warm hospitality, Ember & Oak celebrates the rich
          culinary heritage of India. Our chefs craft each dish using
          locally sourced spices, seasonal ingredients, and age-old recipes
          passed down through generations. Every meal at our table is
          an experience you&apos;ll cherish forever.
        </p>
        <div className="rst-about-stats">
          <div className="rst-about-stat">
            <div className="rst-about-stat-number">15+</div>
            <div className="rst-about-stat-label">Years of Excellence</div>
          </div>
          <div className="rst-about-stat">
            <div className="rst-about-stat-number">200+</div>
            <div className="rst-about-stat-label">Signature Dishes</div>
          </div>
          <div className="rst-about-stat">
            <div className="rst-about-stat-number">4.9★</div>
            <div className="rst-about-stat-label">Guest Rating</div>
          </div>
        </div>
      </motion.section>

      {/* Menu */}
      <section className="rst-menu" id="rst-menu">
        <motion.div
          className="rst-menu-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease }}
        >
          <div className="rst-section-label">The Menu</div>
          <h2 className="rst-section-title">Crafted With Passion</h2>
        </motion.div>

        <div className="rst-menu-tabs">
          {categories.map((cat) => (
            <button
              key={cat.id}
              className={`rst-menu-tab ${activeCategory === cat.id ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat.id)}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <motion.div className="rst-menu-grid" layout>
          <AnimatePresence mode="popLayout">
            {filteredMenu.map((item) => (
              <motion.div
                key={item.id}
                className="rst-menu-card"
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3, ease }}
              >
                <div className="rst-menu-card-img">
                  <img src={item.image} alt={item.name} />
                </div>
                <div className="rst-menu-card-info">
                  <div className="rst-menu-card-top">
                    <span className="rst-menu-card-name">{item.name}</span>
                    <span className="rst-menu-card-price">{item.price}</span>
                  </div>
                  <p className="rst-menu-card-desc">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </section>

      {/* Reservation */}
      <section className="rst-reservation" id="rst-reservation">
        <motion.div
          className="rst-reservation-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease }}
        >
          <div className="rst-section-label">Book a Table</div>
          <h2 className="rst-section-title">Reserve Your Experience</h2>
        </motion.div>

        <motion.form
          className="rst-form"
          onSubmit={handleFormSubmit}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6, ease, delay: 0.1 }}
        >
          <div className="rst-form-group">
            <label className="rst-form-label">Name</label>
            <input className="rst-input" type="text" name="name" placeholder="Your name" value={formData.name} onChange={handleFormChange} required />
          </div>
          <div className="rst-form-group">
            <label className="rst-form-label">Phone</label>
            <input className="rst-input" type="tel" name="phone" placeholder="+91 98XXX XXXXX" value={formData.phone} onChange={handleFormChange} required />
          </div>
          <div className="rst-form-group">
            <label className="rst-form-label">Email</label>
            <input className="rst-input" type="email" name="email" placeholder="you@email.com" value={formData.email} onChange={handleFormChange} required />
          </div>
          <div className="rst-form-group">
            <label className="rst-form-label">Guests</label>
            <select className="rst-select" name="guests" value={formData.guests} onChange={handleFormChange} required>
              <option value="">Select</option>
              <option value="1">1 Guest</option>
              <option value="2">2 Guests</option>
              <option value="3">3 Guests</option>
              <option value="4">4 Guests</option>
              <option value="5">5 Guests</option>
              <option value="6">6+ Guests</option>
            </select>
          </div>
          <div className="rst-form-group">
            <label className="rst-form-label">Date</label>
            <input className="rst-input" type="date" name="date" value={formData.date} onChange={handleFormChange} required />
          </div>
          <div className="rst-form-group">
            <label className="rst-form-label">Time</label>
            <select className="rst-select" name="time" value={formData.time} onChange={handleFormChange} required>
              <option value="">Select</option>
              <option value="12:00">12:00 PM</option>
              <option value="12:30">12:30 PM</option>
              <option value="13:00">1:00 PM</option>
              <option value="13:30">1:30 PM</option>
              <option value="19:00">7:00 PM</option>
              <option value="19:30">7:30 PM</option>
              <option value="20:00">8:00 PM</option>
              <option value="20:30">8:30 PM</option>
              <option value="21:00">9:00 PM</option>
              <option value="21:30">9:30 PM</option>
            </select>
          </div>
          <div className="rst-form-group full-width">
            <label className="rst-form-label">Special Requests</label>
            <textarea className="rst-textarea" name="notes" placeholder="Allergies, celebrations, seating preferences..." value={formData.notes} onChange={handleFormChange} />
          </div>
          <div className="rst-form-submit">
            <button type="submit" className="rst-reserve-btn">Reserve Now</button>
          </div>
        </motion.form>
      </section>

      {/* Gallery */}
      <section className="rst-gallery" id="rst-gallery">
        <motion.div
          className="rst-gallery-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease }}
        >
          <div className="rst-section-label">Gallery</div>
          <h2 className="rst-section-title">A Feast for the Eyes</h2>
        </motion.div>

        <div className="rst-gallery-grid">
          {galleryImages.map((img, i) => (
            <motion.div
              key={i}
              className="rst-gallery-item"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06, duration: 0.5, ease }}
            >
              <img src={img} alt={`Ember & Oak New Delhi gallery ${i + 1}`} />
            </motion.div>
          ))}
        </div>
      </section>

      {/* Reviews */}
      <section className="rst-reviews">
        <motion.div
          className="rst-reviews-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease }}
        >
          <div className="rst-section-label">Reviews</div>
          <h2 className="rst-section-title">What Our Guests Say</h2>
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentReview}
            className="rst-review-card"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4, ease }}
          >
            <div className="rst-review-stars">
              {[...Array(5)].map((_, i) => <LuStar key={i} />)}
            </div>
            <p className="rst-review-text">{reviews[currentReview].text}</p>
            <div className="rst-review-author">{reviews[currentReview].author}</div>
            <div className="rst-review-role">{reviews[currentReview].role}</div>
          </motion.div>
        </AnimatePresence>

        <div className="rst-review-dots">
          {reviews.map((_, i) => (
            <button
              key={i}
              className={`rst-review-dot ${i === currentReview ? 'active' : ''}`}
              onClick={() => setCurrentReview(i)}
              aria-label={`Review ${i + 1}`}
            />
          ))}
        </div>
      </section>

      {/* Location */}
      <section className="rst-location" id="rst-location">
        <motion.div
          className="rst-location-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease }}
        >
          <div className="rst-section-label">Find Us</div>
          <h2 className="rst-section-title">Visit Us in New Delhi</h2>
        </motion.div>

        <div className="rst-location-grid">
          <div className="rst-map-placeholder">
            <iframe
              title="Ember & Oak Location — Connaught Place, New Delhi"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3501.735598892528!2d77.21667731508256!3d28.632900982418!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd37b741d057%3A0xcdee88e47393c3f1!2sConnaught%20Place%2C%20New%20Delhi%2C%20Delhi!5e0!3m2!1sen!2sin!4v1234567890"
              width="100%"
              height="100%"
              style={{ border: 0, borderRadius: '12px' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          <div className="rst-location-info">
            <div className="rst-hours">
              <h3 className="rst-hours-title">Opening Hours</h3>
              {hours.map((h, i) => (
                <div key={i} className="rst-hours-row">
                  <span className="rst-hours-day">{h.day}</span>
                  <span className="rst-hours-time">{h.time}</span>
                </div>
              ))}
            </div>

            <div className="rst-contact-list">
              <div className="rst-contact-item">
                <div className="rst-contact-icon"><LuMapPin /></div>
                <span>42, Block C, Connaught Place, New Delhi 110001</span>
              </div>
              <div className="rst-contact-item">
                <div className="rst-contact-icon"><LuPhone /></div>
                <span>+91 98765 43210</span>
              </div>
              <div className="rst-contact-item">
                <div className="rst-contact-icon"><LuMail /></div>
                <span>hello@emberandoak.com</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="rst-footer">
        <div className="rst-footer-inner">
          <div className="rst-footer-logo">
            Ember <span>&</span> Oak
          </div>
          <div className="rst-footer-copy">© 2026 Ember & Oak, New Delhi. All rights reserved.</div>
          <div className="rst-footer-socials">
            <a href="#" className="rst-footer-social" aria-label="Instagram"><LuInstagram /></a>
            <a href="#" className="rst-footer-social" aria-label="Facebook"><LuFacebook /></a>
          </div>
        </div>
      </footer>

      {/* Toast */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            className="rst-toast"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
          >
            ✓ Reservation confirmed! We&apos;ll see you soon.
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
