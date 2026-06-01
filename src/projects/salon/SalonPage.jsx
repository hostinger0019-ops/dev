import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LuArrowLeft, LuChevronDown, LuClock,
  LuMapPin, LuPhone, LuMail,
  LuInstagram, LuFacebook, LuStar,
} from 'react-icons/lu';
import serviceData, { serviceCategories } from './data/serviceData';
import heroBg from './images/hero-bg.png';
import './SalonPage.css';

const ease = [0.4, 0, 0, 1];

const testimonials = [
  { text: '"Glowra gave me the most stunning bridal look! My mehndi and makeup were absolutely flawless. Every guest complimented me."', author: 'Priya Malhotra', role: 'Bride, South Delhi' },
  { text: '"I\'ve been coming here for 2 years now. The keratin treatment is life-changing and Ritu ma\'am is the best stylist in town!"', author: 'Sneha Joshi', role: 'Regular Client, Noida' },
  { text: '"The gold facial and spa pedicure combo is my go-to self-care ritual. Luxurious experience at such reasonable prices."', author: 'Kavya Sharma', role: 'Google Review ★★★★★' },
];

const hours = [
  { day: 'Monday — Friday', time: '10:00 AM — 8:00 PM' },
  { day: 'Saturday', time: '9:00 AM — 9:00 PM' },
  { day: 'Sunday', time: '10:00 AM — 6:00 PM' },
];

const navLinks = [
  { label: 'Services', href: '#sl-services' },
  { label: 'Book Now', href: '#sl-booking' },
  { label: 'Find Us', href: '#sl-location' },
];

export default function SalonPage() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [showToast, setShowToast] = useState(false);
  const [formData, setFormData] = useState({
    name: '', phone: '', service: '', date: '', time: '', notes: '',
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

  const filteredServices = activeFilter === 'all'
    ? serviceData
    : serviceData.filter((s) => s.category === activeFilter);

  const handleFormChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setShowToast(true);
    setFormData({ name: '', phone: '', service: '', date: '', time: '', notes: '' });
    setTimeout(() => setShowToast(false), 3000);
  };

  return (
    <div className="sl-page">
      <Link to="/" className="sl-back-badge">
        <LuArrowLeft size={14} /> Back to Tarik
      </Link>

      {/* Navbar */}
      <nav className={`sl-navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="sl-navbar-logo" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          Glow<span>ra</span>
        </div>
        <div className="sl-nav-links">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} onClick={(e) => handleNavClick(e, link.href)}>{link.label}</a>
          ))}
          <a href="#sl-booking" className="sl-cta-btn" onClick={(e) => handleNavClick(e, '#sl-booking')}>
            Book Appointment
          </a>
        </div>
        <div className={`sl-mobile-toggle ${mobileOpen ? 'active' : ''}`} onClick={() => setMobileOpen(!mobileOpen)} role="button" aria-label="Toggle menu" tabIndex={0}>
          <span /><span /><span />
        </div>
      </nav>

      <div className={`sl-mobile-menu ${mobileOpen ? 'open' : ''}`}>
        {navLinks.map((link) => (
          <a key={link.href} href={link.href} onClick={(e) => handleNavClick(e, link.href)}>{link.label}</a>
        ))}
        <a href="#sl-booking" className="sl-cta-btn" onClick={(e) => handleNavClick(e, '#sl-booking')}>Book Appointment</a>
      </div>

      {/* Hero */}
      <section className="sl-hero">
        <div className="sl-hero-bg">
          <img src={heroBg} alt="Glowra premium beauty salon" />
        </div>
        <div className="sl-hero-overlay" />
        <motion.div className="sl-hero-content" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease, delay: 0.2 }}>
          <div className="sl-hero-badge">✦ Premium Beauty Salon ✦</div>
          <h1 className="sl-hero-title">
            Glow<span className="sl-hero-title-accent">ra</span>
          </h1>
          <p className="sl-hero-tagline">
            Where beauty meets artistry. From bridal transformations to everyday glow-ups — your radiance starts here.
          </p>
          <div className="sl-hero-buttons">
            <a href="#sl-booking" className="sl-cta-btn" onClick={(e) => handleNavClick(e, '#sl-booking')}>
              Book Appointment
            </a>
            <a href="#sl-services" className="sl-btn-outline" onClick={(e) => handleNavClick(e, '#sl-services')}>
              Our Services
            </a>
          </div>
        </motion.div>
        <div className="sl-hero-scroll">Scroll <LuChevronDown /></div>
      </section>

      {/* Services */}
      <section className="sl-services" id="sl-services">
        <motion.div className="sl-services-header" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.6, ease }}>
          <div className="sl-section-label">Our Services</div>
          <h2 className="sl-section-title">Pamper Yourself</h2>
        </motion.div>

        <div className="sl-filter-tabs">
          {serviceCategories.map((t) => (
            <button key={t.id} className={`sl-filter-tab ${activeFilter === t.id ? 'active' : ''}`} onClick={() => setActiveFilter(t.id)}>
              {t.label}
            </button>
          ))}
        </div>

        <motion.div className="sl-service-grid" layout>
          <AnimatePresence mode="popLayout">
            {filteredServices.map((svc) => (
              <motion.div key={svc.id} className="sl-service-card" layout initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.3, ease }}>
                <div className="sl-service-img">
                  <img src={svc.image} alt={svc.name} />
                </div>
                <div className="sl-service-info">
                  <div className="sl-service-name">{svc.name}</div>
                  <p className="sl-service-desc">{svc.description}</p>
                  <div className="sl-service-bottom">
                    <span className="sl-service-price">{svc.price}</span>
                    <span className="sl-service-duration"><LuClock size={11} /> {svc.duration}</span>
                    <button className="sl-service-book" onClick={() => { document.querySelector('#sl-booking')?.scrollIntoView({ behavior: 'smooth' }); }}>
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
      <section className="sl-booking" id="sl-booking">
        <motion.div className="sl-booking-header" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.6, ease }}>
          <div className="sl-section-label">Book Now</div>
          <h2 className="sl-section-title">Schedule Your Appointment</h2>
        </motion.div>

        <motion.form className="sl-form" onSubmit={handleFormSubmit} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-40px' }} transition={{ duration: 0.6, ease, delay: 0.1 }}>
          <div className="sl-form-group">
            <label className="sl-form-label">Your Name</label>
            <input className="sl-input" type="text" name="name" placeholder="Full name" value={formData.name} onChange={handleFormChange} required />
          </div>
          <div className="sl-form-group">
            <label className="sl-form-label">Phone</label>
            <input className="sl-input" type="tel" name="phone" placeholder="+91 98XXX XXXXX" value={formData.phone} onChange={handleFormChange} required />
          </div>
          <div className="sl-form-group">
            <label className="sl-form-label">Service</label>
            <select className="sl-select" name="service" value={formData.service} onChange={handleFormChange} required>
              <option value="">Select Service</option>
              <option value="haircut">Haircut & Styling</option>
              <option value="colour">Hair Colour & Highlights</option>
              <option value="keratin">Keratin Treatment</option>
              <option value="facial">Gold / Hydra Facial</option>
              <option value="detan">De-Tan Treatment</option>
              <option value="manicure">Gel Manicure</option>
              <option value="pedicure">Spa Pedicure</option>
              <option value="bridal">Bridal Makeup Package</option>
              <option value="mehndi">Mehndi & Pre-Bridal</option>
              <option value="engagement">Engagement Look</option>
            </select>
          </div>
          <div className="sl-form-group">
            <label className="sl-form-label">Preferred Date</label>
            <input className="sl-input" type="date" name="date" value={formData.date} onChange={handleFormChange} required />
          </div>
          <div className="sl-form-group full-width">
            <label className="sl-form-label">Preferred Time</label>
            <select className="sl-select" name="time" value={formData.time} onChange={handleFormChange} required>
              <option value="">Select Time</option>
              <option value="10:00">10:00 AM</option>
              <option value="11:00">11:00 AM</option>
              <option value="12:00">12:00 PM</option>
              <option value="13:00">1:00 PM</option>
              <option value="14:00">2:00 PM</option>
              <option value="15:00">3:00 PM</option>
              <option value="16:00">4:00 PM</option>
              <option value="17:00">5:00 PM</option>
              <option value="18:00">6:00 PM</option>
              <option value="19:00">7:00 PM</option>
            </select>
          </div>
          <div className="sl-form-group full-width">
            <label className="sl-form-label">Special Requests</label>
            <textarea className="sl-textarea" name="notes" placeholder="Any preferences, allergies, or specific stylist request..." value={formData.notes} onChange={handleFormChange} />
          </div>
          <div className="sl-form-submit">
            <button type="submit" className="sl-cta-btn">Confirm Booking</button>
          </div>
        </motion.form>
      </section>

      {/* Testimonials */}
      <section className="sl-testimonials">
        <motion.div className="sl-testimonials-header" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.6, ease }}>
          <div className="sl-section-label">Reviews</div>
          <h2 className="sl-section-title">Our Happy Clients</h2>
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div key={currentTestimonial} className="sl-testimonial-card" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.4, ease }}>
            <div className="sl-testimonial-stars">{[...Array(5)].map((_, i) => <LuStar key={i} />)}</div>
            <p className="sl-testimonial-text">{testimonials[currentTestimonial].text}</p>
            <div className="sl-testimonial-author">{testimonials[currentTestimonial].author}</div>
            <div className="sl-testimonial-role">{testimonials[currentTestimonial].role}</div>
          </motion.div>
        </AnimatePresence>

        <div className="sl-testimonial-dots">
          {testimonials.map((_, i) => (
            <button key={i} className={`sl-testimonial-dot ${i === currentTestimonial ? 'active' : ''}`} onClick={() => setCurrentTestimonial(i)} aria-label={`Review ${i + 1}`} />
          ))}
        </div>
      </section>

      {/* Location */}
      <section className="sl-location" id="sl-location">
        <motion.div className="sl-location-header" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.6, ease }}>
          <div className="sl-section-label">Visit Us</div>
          <h2 className="sl-section-title">Find Glowra</h2>
        </motion.div>

        <div className="sl-location-grid">
          <div className="sl-map-placeholder">
            <iframe
              title="Glowra Salon Location — Hauz Khas, New Delhi"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3504.7036867778025!2d77.19380761508!3d28.54964898244!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce22f7b1a81e7%3A0x97e3b3a5e3bad7e!2sHauz%20Khas%20Village%2C%20New%20Delhi!5e0!3m2!1sen!2sin!4v1234567890"
              width="100%"
              height="100%"
              style={{ border: 0, borderRadius: '12px' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
          <div className="sl-location-info">
            <div>
              <h3 className="sl-hours-title">Salon Hours</h3>
              {hours.map((h, i) => (
                <div key={i} className="sl-hours-row">
                  <span className="sl-hours-day">{h.day}</span>
                  <span className="sl-hours-time">{h.time}</span>
                </div>
              ))}
            </div>
            <div>
              <div className="sl-contact-item" style={{ marginBottom: 12 }}>
                <div className="sl-contact-icon"><LuMapPin /></div>
                <span>2nd Floor, 18 Hauz Khas Village, New Delhi 110016</span>
              </div>
              <div className="sl-contact-item" style={{ marginBottom: 12 }}>
                <div className="sl-contact-icon"><LuPhone /></div>
                <span>+91 99887 76543</span>
              </div>
              <div className="sl-contact-item">
                <div className="sl-contact-icon"><LuMail /></div>
                <span>hello@glowra.in</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="sl-footer">
        <div className="sl-footer-inner">
          <div className="sl-footer-logo">Glow<span>ra</span></div>
          <div className="sl-footer-copy">© 2026 Glowra Beauty Studio, Hauz Khas, New Delhi</div>
          <div className="sl-footer-socials">
            <a href="#" className="sl-footer-social" aria-label="Instagram"><LuInstagram /></a>
            <a href="#" className="sl-footer-social" aria-label="Facebook"><LuFacebook /></a>
          </div>
        </div>
      </footer>

      {/* Toast */}
      <AnimatePresence>
        {showToast && (
          <motion.div className="sl-toast" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} transition={{ duration: 0.3 }}>
            ✓ Appointment booked! We&apos;ll confirm via WhatsApp shortly.
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
