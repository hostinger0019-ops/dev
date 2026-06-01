import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LuArrowLeft, LuChevronDown, LuClock,
  LuMapPin, LuPhone, LuMail,
  LuInstagram, LuFacebook, LuStar,
} from 'react-icons/lu';
import treatmentData, { treatmentCategories } from './data/treatmentData';
import './DentalPage.css';
const heroBg = 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=1600&h=900&fit=crop';

const ease = [0.4, 0, 0, 1];

const testimonials = [
  { text: '"Dr. Mehra and her team made my root canal completely painless. I was so scared, but the experience was smooth and professional. Highly recommended!"', author: 'Amit Verma', role: 'Patient, Lajpat Nagar' },
  { text: '"Got Invisalign from SmileCraft and the results are amazing. My smile has completely transformed in just 8 months. Worth every rupee!"', author: 'Riya Saxena', role: 'Invisalign Patient, South Delhi' },
  { text: '"My kids love coming here. The clinic is so clean and the doctors are incredibly gentle. Best pediatric dental care in Delhi."', author: 'Pooja & Sanjay Bhatt', role: 'Parents of 2, Green Park' },
];

const hours = [
  { day: 'Monday — Friday', time: '9:00 AM — 8:00 PM' },
  { day: 'Saturday', time: '9:00 AM — 5:00 PM' },
  { day: 'Sunday', time: '10:00 AM — 2:00 PM (Emergency Only)' },
];

const navLinks = [
  { label: 'Treatments', href: '#dn-treatments' },
  { label: 'Book Now', href: '#dn-booking' },
  { label: 'Find Us', href: '#dn-location' },
];

export default function DentalPage() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [showToast, setShowToast] = useState(false);
  const [formData, setFormData] = useState({
    name: '', phone: '', treatment: '', date: '', time: '', notes: '',
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

  const filteredTreatments = activeFilter === 'all'
    ? treatmentData
    : treatmentData.filter((t) => t.category === activeFilter);

  const handleFormChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setShowToast(true);
    setFormData({ name: '', phone: '', treatment: '', date: '', time: '', notes: '' });
    setTimeout(() => setShowToast(false), 3000);
  };

  return (
    <div className="dn-page">
      <Link to="/" className="dn-back-badge">
        <LuArrowLeft size={14} /> Back to Tarik
      </Link>

      {/* Navbar */}
      <nav className={`dn-navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="dn-navbar-logo" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          Smile<span>Craft</span>
        </div>
        <div className="dn-nav-links">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} onClick={(e) => handleNavClick(e, link.href)}>{link.label}</a>
          ))}
          <a href="#dn-booking" className="dn-cta-btn" onClick={(e) => handleNavClick(e, '#dn-booking')}>
            Book Appointment
          </a>
        </div>
        <div className={`dn-mobile-toggle ${mobileOpen ? 'active' : ''}`} onClick={() => setMobileOpen(!mobileOpen)} role="button" aria-label="Toggle menu" tabIndex={0}>
          <span /><span /><span />
        </div>
      </nav>

      <div className={`dn-mobile-menu ${mobileOpen ? 'open' : ''}`}>
        {navLinks.map((link) => (
          <a key={link.href} href={link.href} onClick={(e) => handleNavClick(e, link.href)}>{link.label}</a>
        ))}
        <a href="#dn-booking" className="dn-cta-btn" onClick={(e) => handleNavClick(e, '#dn-booking')}>Book Appointment</a>
      </div>

      {/* Hero */}
      <section className="dn-hero">
        <div className="dn-hero-bg">
          <img src={heroBg} alt="SmileCraft Dental Clinic" />
        </div>
        <div className="dn-hero-overlay" />
        <motion.div className="dn-hero-content" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease, delay: 0.2 }}>
          <div className="dn-hero-badge">✦ Advanced Dental Care ✦</div>
          <h1 className="dn-hero-title">
            Smile<span className="dn-hero-title-accent">Craft</span>
          </h1>
          <p className="dn-hero-tagline">
            Your smile deserves the best. Advanced dental treatments with world-class technology and a gentle, caring touch.
          </p>
          <div className="dn-hero-buttons">
            <a href="#dn-booking" className="dn-cta-btn" onClick={(e) => handleNavClick(e, '#dn-booking')}>
              Book Appointment
            </a>
            <a href="#dn-treatments" className="dn-btn-outline" onClick={(e) => handleNavClick(e, '#dn-treatments')}>
              Our Treatments
            </a>
          </div>
        </motion.div>
        <div className="dn-hero-scroll">Scroll <LuChevronDown /></div>
      </section>

      {/* Stats */}
      <motion.section className="dn-stats" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.6, ease }}>
        <div className="dn-stats-grid">
          {[{ n: '15+', l: 'Years Experience' }, { n: '25,000+', l: 'Happy Patients' }, { n: '4.9★', l: 'Google Rating' }, { n: '6', l: 'Expert Dentists' }].map((s, i) => (
            <div key={i} className="dn-stat-item">
              <div className="dn-stat-number">{s.n}</div>
              <div className="dn-stat-label">{s.l}</div>
            </div>
          ))}
        </div>
      </motion.section>

      {/* Treatments */}
      <section className="dn-treatments" id="dn-treatments">
        <motion.div className="dn-treatments-header" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.6, ease }}>
          <div className="dn-section-label">Our Treatments</div>
          <h2 className="dn-section-title">Comprehensive Dental Care</h2>
        </motion.div>

        <div className="dn-filter-tabs">
          {treatmentCategories.map((t) => (
            <button key={t.id} className={`dn-filter-tab ${activeFilter === t.id ? 'active' : ''}`} onClick={() => setActiveFilter(t.id)}>
              {t.label}
            </button>
          ))}
        </div>

        <motion.div className="dn-treatment-grid" layout>
          <AnimatePresence mode="popLayout">
            {filteredTreatments.map((item) => (
              <motion.div key={item.id} className="dn-treatment-card" layout initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.3, ease }}>
                <div className="dn-treatment-img">
                  <img src={item.image} alt={item.name} />
                </div>
                <div className="dn-treatment-info">
                  <div className="dn-treatment-name">{item.name}</div>
                  <p className="dn-treatment-desc">{item.description}</p>
                  <div className="dn-treatment-bottom">
                    <span className="dn-treatment-price">{item.price}</span>
                    <span className="dn-treatment-duration"><LuClock size={11} /> {item.duration}</span>
                    <button className="dn-treatment-book" onClick={() => { document.querySelector('#dn-booking')?.scrollIntoView({ behavior: 'smooth' }); }}>
                      Book
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </section>

      {/* Booking */}
      <section className="dn-booking" id="dn-booking">
        <motion.div className="dn-booking-header" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.6, ease }}>
          <div className="dn-section-label">Appointment</div>
          <h2 className="dn-section-title">Book Your Visit</h2>
        </motion.div>

        <motion.form className="dn-form" onSubmit={handleFormSubmit} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-40px' }} transition={{ duration: 0.6, ease, delay: 0.1 }}>
          <div className="dn-form-group">
            <label className="dn-form-label">Patient Name</label>
            <input className="dn-input" type="text" name="name" placeholder="Full name" value={formData.name} onChange={handleFormChange} required />
          </div>
          <div className="dn-form-group">
            <label className="dn-form-label">Phone</label>
            <input className="dn-input" type="tel" name="phone" placeholder="+91 98XXX XXXXX" value={formData.phone} onChange={handleFormChange} required />
          </div>
          <div className="dn-form-group">
            <label className="dn-form-label">Treatment</label>
            <select className="dn-select" name="treatment" value={formData.treatment} onChange={handleFormChange} required>
              <option value="">Select Treatment</option>
              <option value="checkup">Check-up & Cleaning</option>
              <option value="whitening">Teeth Whitening</option>
              <option value="filling">Dental Filling</option>
              <option value="braces">Braces (Metal / Ceramic)</option>
              <option value="invisalign">Invisalign Aligners</option>
              <option value="veneers">Dental Veneers</option>
              <option value="implant">Dental Implant</option>
              <option value="rct">Root Canal Treatment</option>
              <option value="extraction">Wisdom Tooth Extraction</option>
              <option value="smile">Smile Makeover</option>
              <option value="other">Other / Consultation</option>
            </select>
          </div>
          <div className="dn-form-group">
            <label className="dn-form-label">Preferred Date</label>
            <input className="dn-input" type="date" name="date" value={formData.date} onChange={handleFormChange} required />
          </div>
          <div className="dn-form-group full-width">
            <label className="dn-form-label">Preferred Time</label>
            <select className="dn-select" name="time" value={formData.time} onChange={handleFormChange} required>
              <option value="">Select Time</option>
              <option value="09:00">9:00 AM</option>
              <option value="10:00">10:00 AM</option>
              <option value="11:00">11:00 AM</option>
              <option value="12:00">12:00 PM</option>
              <option value="14:00">2:00 PM</option>
              <option value="15:00">3:00 PM</option>
              <option value="16:00">4:00 PM</option>
              <option value="17:00">5:00 PM</option>
              <option value="18:00">6:00 PM</option>
              <option value="19:00">7:00 PM</option>
            </select>
          </div>
          <div className="dn-form-group full-width">
            <label className="dn-form-label">Additional Notes</label>
            <textarea className="dn-textarea" name="notes" placeholder="Describe your dental concern, any allergies, or medical conditions..." value={formData.notes} onChange={handleFormChange} />
          </div>
          <div className="dn-form-submit">
            <button type="submit" className="dn-cta-btn">Confirm Appointment</button>
          </div>
        </motion.form>
      </section>

      {/* Testimonials */}
      <section className="dn-testimonials">
        <motion.div className="dn-testimonials-header" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.6, ease }}>
          <div className="dn-section-label">Patient Reviews</div>
          <h2 className="dn-section-title">What Our Patients Say</h2>
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div key={currentTestimonial} className="dn-testimonial-card" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.4, ease }}>
            <div className="dn-testimonial-stars">{[...Array(5)].map((_, i) => <LuStar key={i} />)}</div>
            <p className="dn-testimonial-text">{testimonials[currentTestimonial].text}</p>
            <div className="dn-testimonial-author">{testimonials[currentTestimonial].author}</div>
            <div className="dn-testimonial-role">{testimonials[currentTestimonial].role}</div>
          </motion.div>
        </AnimatePresence>

        <div className="dn-testimonial-dots">
          {testimonials.map((_, i) => (
            <button key={i} className={`dn-testimonial-dot ${i === currentTestimonial ? 'active' : ''}`} onClick={() => setCurrentTestimonial(i)} aria-label={`Review ${i + 1}`} />
          ))}
        </div>
      </section>

      {/* Location */}
      <section className="dn-location" id="dn-location">
        <motion.div className="dn-location-header" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.6, ease }}>
          <div className="dn-section-label">Visit Us</div>
          <h2 className="dn-section-title">Find SmileCraft</h2>
        </motion.div>

        <div className="dn-location-grid">
          <div className="dn-map-placeholder">
            <iframe
              title="SmileCraft Dental — Lajpat Nagar, New Delhi"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3503.9!2d77.2373!3d28.5700!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce3e564daac1d%3A0x2c582e340e7bc556!2sLajpat%20Nagar%2C%20New%20Delhi!5e0!3m2!1sen!2sin!4v1234567890"
              width="100%"
              height="100%"
              style={{ border: 0, borderRadius: '12px' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
          <div className="dn-location-info">
            <div>
              <h3 className="dn-hours-title">Clinic Hours</h3>
              {hours.map((h, i) => (
                <div key={i} className="dn-hours-row">
                  <span className="dn-hours-day">{h.day}</span>
                  <span className="dn-hours-time">{h.time}</span>
                </div>
              ))}
            </div>
            <div>
              <div className="dn-contact-item" style={{ marginBottom: 12 }}>
                <div className="dn-contact-icon"><LuMapPin /></div>
                <span>3rd Floor, D-24, Lajpat Nagar II, New Delhi 110024</span>
              </div>
              <div className="dn-contact-item" style={{ marginBottom: 12 }}>
                <div className="dn-contact-icon"><LuPhone /></div>
                <span>+91 11 4567 8900</span>
              </div>
              <div className="dn-contact-item">
                <div className="dn-contact-icon"><LuMail /></div>
                <span>appointments@smilecraft.in</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="dn-footer">
        <div className="dn-footer-inner">
          <div className="dn-footer-logo">Smile<span>Craft</span></div>
          <div className="dn-footer-copy">© 2026 SmileCraft Dental Clinic, Lajpat Nagar, New Delhi | Reg. No: DCI/DEL/2019/5432</div>
          <div className="dn-footer-socials">
            <a href="#" className="dn-footer-social" aria-label="Instagram"><LuInstagram /></a>
            <a href="#" className="dn-footer-social" aria-label="Facebook"><LuFacebook /></a>
          </div>
        </div>
      </footer>

      {/* Toast */}
      <AnimatePresence>
        {showToast && (
          <motion.div className="dn-toast" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} transition={{ duration: 0.3 }}>
            ✓ Appointment booked! We&apos;ll send a confirmation SMS shortly.
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
